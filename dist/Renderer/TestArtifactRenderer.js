"use strict";
// Copyright (c) 2022-2024 Contributors to the Eclipse Foundation
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
exports.TestArtifactRenderer = void 0;
var handlebars = __importStar(require("handlebars"));
var TestArtifactRenderer = /** @class */ (function () {
    function TestArtifactRenderer(TemplateRepository) {
        this._TemplateRepository = TemplateRepository;
    }
    TestArtifactRenderer.prototype.Render = function (Result) {
        try {
            var TemplateSource = this._TemplateRepository.GetTemplate(Result);
            var template = handlebars.compile(TemplateSource, { strict: true });
            var result = template(Result);
            console.log(result);
            return result;
        }
        catch (e) {
            console.log("failed to create documentation with error: ".concat(e));
            throw e;
        }
    };
    return TestArtifactRenderer;
}());
exports.TestArtifactRenderer = TestArtifactRenderer;
//# sourceMappingURL=TestArtifactRenderer.js.map