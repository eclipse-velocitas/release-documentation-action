"use strict";
// Copyright (c) 2022-2023 Contributors to the Eclipse Foundation
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
exports.ParserFactory = void 0;
var ParserFactory = /** @class */ (function () {
    function ParserFactory() {
        this._Parsers = new Map();
    }
    ParserFactory.prototype.RegisterParser = function (Type, Schema, Parser) {
        var Key = Type.toString() + "-" + Schema.toString();
        console.log("Registering parser for: " + Key);
        this._Parsers.set(Key, Parser);
    };
    ParserFactory.prototype.GetParser = function (TestArtifact) {
        var Key = TestArtifact.Type.toString() + "-" + TestArtifact.Schema.toString();
        var Parser;
        if (this._Parsers.has(Key)) {
            console.log("Found parser with key '".concat(Key, "'"));
            Parser = this._Parsers.get(Key);
        }
        else {
            throw "Failed to find parser with key: " + Key;
        }
        return Parser;
    };
    return ParserFactory;
}());
exports.ParserFactory = ParserFactory;
//# sourceMappingURL=ParserFactory.js.map