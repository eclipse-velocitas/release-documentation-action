"use strict";
// Copyright (c) 2022 Robert Bosch GmbH and Microsoft Corporation
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
exports.CoberturaParser = void 0;
var xml2js = __importStar(require("xml2js"));
var CoberturaParser = /** @class */ (function () {
    function CoberturaParser() {
    }
    CoberturaParser.prototype.Parse = function (Artifact) {
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
        var TestOutput = Artifact.Load("cobertura-coverage.xml");
        console.log(TestOutput);
        if (TestOutput === null) {
            throw "Failed to load cobertura-coverage.xml";
        }
        parser.parseString(TestOutput, function (err, result) {
            if (err) {
                throw "Failed to parse XML with error: " + err;
            }
            TestResult.Result = {
                "line-rate": result.coverage["line-rate"],
                OriginalOutput: TestOutput,
            };
        });
        return TestResult;
    };
    return CoberturaParser;
}());
exports.CoberturaParser = CoberturaParser;
//# sourceMappingURL=CoberturaParser.js.map