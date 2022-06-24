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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestArtifact = void 0;
var TestArtifact = /** @class */ (function () {
    function TestArtifact(CommitHash, Type, Schema, Container, PersistentStore) {
        this.CommitHash = CommitHash;
        this.Type = Type;
        this.Schema = Schema;
        this.Container = Container;
        this.PersistentStore = PersistentStore;
    }
    TestArtifact.prototype.Load = function (Name) {
        return this.PersistentStore.Load(this.Container + "/" + Name);
    };
    return TestArtifact;
}());
exports.TestArtifact = TestArtifact;
//# sourceMappingURL=TestArtifact.js.map