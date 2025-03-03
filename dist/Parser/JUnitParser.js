"use strict";
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
exports.JUnitParser = void 0;
var xml2js = __importStar(require("xml2js"));
var JUnitParser = /** @class */ (function () {
    function JUnitParser() {
    }
    JUnitParser.prototype.Parse = function (Artifact) {
        var TestResult;
        TestResult = {
            CommitHash: Artifact.CommitHash,
            Schema: Artifact.Schema,
            Type: Artifact.Type,
            TestSuiteName: "",
            Result: undefined,
        };
        var parser = new xml2js.Parser({
            mergeAttrs: true,
            explicitArray: false,
        });
        var TestOutput = Artifact.Load("junit.xml");
        console.log(TestOutput);
        if (TestOutput === null) {
            throw "Failed to load junit.xml";
        }
        parser.parseString(TestOutput, function (err, result) {
            var _a;
            if (err) {
                throw "Failed to parse XML with error: " + err;
            }
            var TestSuitesArray = [];
            if (Array.isArray(result.testsuites.testsuite)) {
                TestSuitesArray = result.testsuites.testsuite;
            }
            else if (result.testsuites.testsuite !== undefined) {
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
                var numTests = 0;
                var numErrors = 0;
                var numFailures = 0;
                for (var i = 0; i < TestSuitesArray.length; ++i) {
                    numTests += parseInt(TestSuitesArray[i].tests);
                    numErrors += parseInt(TestSuitesArray[i].errors);
                    numFailures += parseInt(TestSuitesArray[i].failures);
                }
                TestResult.TestSuiteName =
                    (_a = result.testsuites.name) !== null && _a !== void 0 ? _a : "Tests for Artifact ".concat(Artifact.CommitHash);
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
    };
    return JUnitParser;
}());
exports.JUnitParser = JUnitParser;
//# sourceMappingURL=JUnitParser.js.map