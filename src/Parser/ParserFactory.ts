// Copyright (c) 2022-2025 Contributors to the Eclipse Foundation
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
} from "../TestArtifact/ITestArtifact";

import { IParser } from "./IParser";
import { IParserFactory } from "./IParserFactory";

export class ParserFactory implements IParserFactory {
  private _Parsers: Map<string, IParser> = new Map();
  constructor() {}
  public RegisterParser(
    Type: TestArtifactTypeEnum,
    Schema: TestArtifactSchemaEnum,
    Parser: IParser,
  ): void {
    const Key = Type.toString() + "-" + Schema.toString();
    console.log("Registering parser for: " + Key);
    this._Parsers.set(Key, Parser);
  }

  public GetParser(TestArtifact: ITestArtifact): IParser {
    const Key =
      TestArtifact.Type.toString() + "-" + TestArtifact.Schema.toString();
    var Parser: IParser;
    if (this._Parsers.has(Key)) {
      console.log(`Found parser with key '${Key}'`);
      Parser = this._Parsers.get(Key)!;
    } else {
      throw "Failed to find parser with key: " + Key;
    }
    return Parser;
  }
}
