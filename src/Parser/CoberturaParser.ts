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

import { ITestArtifact } from "../TestArtifact/ITestArtifact";
import { IParser } from "./IParser";
import { IParseResult } from "./IParseResult";
import * as xml2js from "xml2js";

export class CoberturaParser implements IParser {
  public Parse(Artifact: ITestArtifact): IParseResult {
    var TestResult: IParseResult;
    TestResult = {
      CommitHash: Artifact.CommitHash,
      Schema: Artifact.Schema,
      Type: Artifact.Type,
      TestSuiteName: "",
      Result: undefined,
    };

    const parser = new xml2js.Parser({
      mergeAttrs: true,
      explicitArray: false,
    });

    const TestOutput = Artifact.Load("cobertura-coverage.xml");
    console.log(TestOutput);
    if (TestOutput === null) {
      throw "Failed to load cobertura-coverage.xml";
    }
    parser.parseString(TestOutput, function (err: any, result: any) {
      if (err) {
        throw "Failed to parse XML with error: " + err;
      }
      TestResult.Result = {
        "line-rate": result.coverage["line-rate"],
        OriginalOutput: TestOutput,
      };
    });

    return TestResult;
  }
}
