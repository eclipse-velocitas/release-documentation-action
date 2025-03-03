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

import * as xml2js from "xml2js";

import { IParseResult } from "./IParseResult";
import { IParser } from "./IParser";
import { ITestArtifact } from "../TestArtifact/ITestArtifact";

export class JUnitParser implements IParser {
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

    const TestOutput = Artifact.Load("junit.xml");
    console.log(TestOutput);
    if (TestOutput === null) {
      throw "Failed to load junit.xml";
    }
    parser.parseString(TestOutput, function (err: any, result: any) {
      if (err) {
        throw "Failed to parse XML with error: " + err;
      }

      let TestSuitesArray: Array<any> = [];
      if (Array.isArray(result.testsuites.testsuite)) {
        TestSuitesArray = result.testsuites.testsuite;
      } else if (result.testsuites.testsuite !== undefined) {
        TestSuitesArray = [result.testsuites.testsuite];
      }

      if (result.testsuites.tests !== undefined) {
        TestResult.TestSuiteName = result.testsuites.name;
        TestResult.Result = {
          Errors: result.testsuites.errors,
          Failures: result.testsuites.failures,
          Tests: result.testsuites.tests,
          Timestamp: result.testsuites.testsuite.timestamp,
          TestSuite: TestSuitesArray,
        };
      }

      if (result.testsuites.tests === undefined) {
        let numTests = 0;
        let numErrors = 0;
        let numFailures = 0;

        for (let i = 0; i < TestSuitesArray.length; ++i) {
          numTests += parseInt(TestSuitesArray[i].tests);
          numErrors += parseInt(TestSuitesArray[i].errors);
          numFailures += parseInt(TestSuitesArray[i].failures);
        }

        TestResult.TestSuiteName =
          result.testsuites.name ?? `Tests for Artifact ${Artifact.CommitHash}`;
        TestResult.Result = {
          Errors: numErrors.toString(),
          Failures: numFailures.toString(),
          Tests: numTests.toString(),
          Timestamp: 0,
          TestSuite: TestSuitesArray,
        };
      }
    });

    TestResult.Result.OriginalOutput = TestOutput;
    return TestResult;
  }
}
