"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ITestArtifact_1 = require("./TestArtifact/ITestArtifact");
var TestArtifactImporter_1 = require("./TestArtifactImporter/TestArtifactImporter");
var TestArtifactRenderer_1 = require("./Renderer/TestArtifactRenderer");
var TemplateRepository_1 = require("./TemplateRepository/TemplateRepository");
var JUnitParser_1 = require("./Parser/JUnitParser");
var LinuxFileSystemPersistentStore_1 = require("./LinuxFileSystemPersistentStore");
var ParserFactory_1 = require("./Parser/ParserFactory");
var guid_typescript_1 = require("guid-typescript");
var TextParser_1 = require("./Parser/TextParser");
var CoberturaParser_1 = require("./Parser/CoberturaParser");
var Core = __importStar(require("@actions/core"));
var inboxPath = Core.getInput("inboxPath")
    ? Core.getInput("inboxPath")
    : "documentation/renderer/inbox";
var templatePath = Core.getInput("templatePath")
    ? Core.getInput("templatePath")
    : "documentation/renderer/templates/";
var outboxPath = Core.getInput("outboxPath")
    ? Core.getInput("outboxPath")
    : "documentation/renderer/outbox";
console.log("Parameter inboxPath is: " + inboxPath);
console.log("Parameter templatePath is: " + templatePath);
console.log("Parameter outboxPath is: " + outboxPath);
var Inbox = new LinuxFileSystemPersistentStore_1.LinuxFileSystemPersistentStore(inboxPath);
var Outbox = new LinuxFileSystemPersistentStore_1.LinuxFileSystemPersistentStore(outboxPath);
var Templates = new TemplateRepository_1.TemplateRepository(templatePath);
Parse(Inbox, Outbox, Templates);
function Parse(Inbox, Outbox, Templates) {
    var Importer = new TestArtifactImporter_1.TestArtifactImporter(Inbox);
    var Renderer = new TestArtifactRenderer_1.TestArtifactRenderer(Templates);
    var Parsers = new ParserFactory_1.ParserFactory();
    Parsers.RegisterParser(ITestArtifact_1.TestArtifactTypeEnum.UnitTest, ITestArtifact_1.TestArtifactSchemaEnum.JUnit, new JUnitParser_1.JUnitParser());
    Parsers.RegisterParser(ITestArtifact_1.TestArtifactTypeEnum.VulnerabilityScan, ITestArtifact_1.TestArtifactSchemaEnum.JUnit, new JUnitParser_1.JUnitParser());
    Parsers.RegisterParser(ITestArtifact_1.TestArtifactTypeEnum.IntegrationTest, ITestArtifact_1.TestArtifactSchemaEnum.Text, new TextParser_1.TextParser());
    Parsers.RegisterParser(ITestArtifact_1.TestArtifactTypeEnum.IntegrationTest, ITestArtifact_1.TestArtifactSchemaEnum.JUnit, new JUnitParser_1.JUnitParser());
    Parsers.RegisterParser(ITestArtifact_1.TestArtifactTypeEnum.CodeCoverage, ITestArtifact_1.TestArtifactSchemaEnum.Cobertura, new CoberturaParser_1.CoberturaParser());
    Importer.GetTestArtifacts().forEach(function (Artifact) {
        var Parser = Parsers.GetParser(Artifact);
        var TestResult = Parser.Parse(Artifact);
        var Documentation = Renderer.Render(TestResult);
        var Filename = Artifact.Type.toString() + "-" + guid_typescript_1.Guid.create() + ".md";
        Outbox.Save(Filename, Documentation);
    });
}
//# sourceMappingURL=action.js.map