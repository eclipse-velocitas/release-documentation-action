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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateRepository = void 0;
var LinuxFileSystemPersistentStore_1 = require("../LinuxFileSystemPersistentStore");
var TemplateRepository = /** @class */ (function () {
    function TemplateRepository(TemplateFolder) {
        this._PersistentStore = new LinuxFileSystemPersistentStore_1.LinuxFileSystemPersistentStore(TemplateFolder);
    }
    TemplateRepository.prototype.GetTemplate = function (Result) {
        var TemplateFilename = Result.Type.toString() + "-" + Result.Schema.toString() + ".md";
        var source = this._PersistentStore.Load(TemplateFilename);
        return source;
    };
    return TemplateRepository;
}());
exports.TemplateRepository = TemplateRepository;
//# sourceMappingURL=TemplateRepository.js.map