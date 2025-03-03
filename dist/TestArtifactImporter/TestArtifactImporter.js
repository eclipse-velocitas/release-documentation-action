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
exports.TestArtifactImporter = void 0;
var TestArtifact_1 = require("../TestArtifact/TestArtifact");
var TestArtifactImporter = /** @class */ (function () {
    function TestArtifactImporter(PersistentStore) {
        this._PersistentStore = PersistentStore;
    }
    TestArtifactImporter.prototype.GetTestArtifacts = function () {
        var _this = this;
        var ArtifactList = [];
        var Definition;
        var Keys = this._PersistentStore.GetFiles("TestArtifact.json");
        Keys.forEach(function (Key) {
            console.log("Adding test result from folder: " + Key);
            try {
                Definition = _this._PersistentStore.Load(Key);
            }
            catch (Error) {
                console.log("Failed to read file '" + Key + "': " + Error);
                throw Error;
            }
            try {
                console.log("Trying to parse: '" + Definition + "'");
                var Object = JSON.parse(Definition);
                var CommitHash = Object.CommitHash;
                var Type = Object.Type;
                var Schema = Object.Schema;
                var LastDelimiterPosition = Key.lastIndexOf("/");
                var Container = Key.substring(0, LastDelimiterPosition);
                ArtifactList.push(new TestArtifact_1.TestArtifact(CommitHash, Type, Schema, Container, _this._PersistentStore));
            }
            catch (Error) {
                console.log("Failed to parse '" + Key + "': " + Error);
                throw Error;
            }
        });
        return ArtifactList;
    };
    return TestArtifactImporter;
}());
exports.TestArtifactImporter = TestArtifactImporter;
//# sourceMappingURL=TestArtifactImporter.js.map