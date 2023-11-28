"use strict";
// Copyright (c) 2022 Contributors to the Eclipse Foundation
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextParser = void 0;
var TextParser = /** @class */ (function () {
    function TextParser() {
    }
    TextParser.prototype.Parse = function (Artifact) {
        var TestResult;
        TestResult = {
            CommitHash: Artifact.CommitHash,
            Schema: Artifact.Schema,
            Type: Artifact.Type,
            TestSuiteName: "",
            Result: undefined,
        };
        var TestOutput = Artifact.Load("output.log");
        TestResult.Result = {
            OriginalOutput: TestOutput,
        };
        return TestResult;
    };
    return TextParser;
}());
exports.TextParser = TextParser;
//# sourceMappingURL=TextParser.js.map