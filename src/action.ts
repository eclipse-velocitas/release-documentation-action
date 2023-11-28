// Copyright (c) 2022-2023 Contributors to the Eclipse Foundation
//
// This program and the accompanying materials are made available under the
// terms of the Apache License, Version 2.0 which is available at
// https://www.apache.org/licenses/LICENSE-2.0.
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations
// under the License.
//
// SPDX-License-Identifier: Apache-2.0

import {
  ITestArtifact,
  TestArtifactSchemaEnum,
  TestArtifactTypeEnum,
} from "./TestArtifact/ITestArtifact";
import { TestArtifactImporter } from "./TestArtifactImporter/TestArtifactImporter";
import { ITestArtifactImporter } from "./TestArtifactImporter/ITestArtifactImporter";
import { TestArtifactRenderer } from "./Renderer/TestArtifactRenderer";
import { TemplateRepository } from "./TemplateRepository/TemplateRepository";
import { ITemplateRepository } from "./TemplateRepository/ITemplateRepository";
import { JUnitParser } from "./Parser/JUnitParser";
import { IParseResult } from "./Parser/IParseResult";
import { IPersistentStore } from "./IPersistentStore";
import { LinuxFileSystemPersistentStore } from "./LinuxFileSystemPersistentStore";
import { IParserFactory } from "./Parser/IParserFactory";
import { ParserFactory } from "./Parser/ParserFactory";
import { IRenderer } from "./Renderer/IRenderer";
import { Guid } from "guid-typescript";
import { TextParser } from "./Parser/TextParser";
import { CoberturaParser } from "./Parser/CoberturaParser";
import * as Core from "@actions/core";

const inboxPath = Core.getInput("inboxPath")
  ? Core.getInput("inboxPath")
  : "documentation/renderer/inbox";
const templatePath = Core.getInput("templatePath")
  ? Core.getInput("templatePath")
  : "documentation/renderer/templates/";
const outboxPath = Core.getInput("outboxPath")
  ? Core.getInput("outboxPath")
  : "documentation/renderer/outbox";

console.log("Parameter inboxPath is: " + inboxPath);
console.log("Parameter templatePath is: " + templatePath);
console.log("Parameter outboxPath is: " + outboxPath);

const Inbox: IPersistentStore = new LinuxFileSystemPersistentStore(inboxPath);
const Outbox: IPersistentStore = new LinuxFileSystemPersistentStore(outboxPath);
const Templates: ITemplateRepository = new TemplateRepository(templatePath);

Parse(Inbox, Outbox, Templates);

function Parse(
  Inbox: IPersistentStore,
  Outbox: IPersistentStore,
  Templates: ITemplateRepository,
) {
  const Importer: ITestArtifactImporter = new TestArtifactImporter(Inbox);
  const Renderer: IRenderer = new TestArtifactRenderer(Templates);
  const Parsers: IParserFactory = new ParserFactory();

  Parsers.RegisterParser(
    TestArtifactTypeEnum.UnitTest,
    TestArtifactSchemaEnum.JUnit,
    new JUnitParser(),
  );
  Parsers.RegisterParser(
    TestArtifactTypeEnum.VulnerabilityScan,
    TestArtifactSchemaEnum.JUnit,
    new JUnitParser(),
  );
  Parsers.RegisterParser(
    TestArtifactTypeEnum.IntegrationTest,
    TestArtifactSchemaEnum.Text,
    new TextParser(),
  );
  Parsers.RegisterParser(
    TestArtifactTypeEnum.IntegrationTest,
    TestArtifactSchemaEnum.JUnit,
    new JUnitParser(),
  );
  Parsers.RegisterParser(
    TestArtifactTypeEnum.CodeCoverage,
    TestArtifactSchemaEnum.Cobertura,
    new CoberturaParser(),
  );

  Importer.GetTestArtifacts().forEach((Artifact: ITestArtifact) => {
    const Parser = Parsers.GetParser(Artifact);
    const TestResult: IParseResult = Parser.Parse(Artifact);
    const Documentation = Renderer.Render(TestResult);
    const Filename = Artifact.Type.toString() + "-" + Guid.create() + ".md";
    Outbox.Save(Filename, Documentation);
  });
}
