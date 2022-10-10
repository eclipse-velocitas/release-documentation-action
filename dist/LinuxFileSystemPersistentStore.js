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
exports.LinuxFileSystemPersistentStore = void 0;
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var LinuxFileSystemPersistentStore = /** @class */ (function () {
    function LinuxFileSystemPersistentStore(BasePath) {
        // this._BasePath = path.resolve(__dirname, BasePath);
        this._BasePath = BasePath;
    }
    LinuxFileSystemPersistentStore.prototype.GetFiles = function (Filter) {
        var _this = this;
        var FileList = [];
        var FilteredFiles = [];
        console.log("Scanning folder '" + this._BasePath + "' with filter '" + Filter + "'");
        var RootFileList = fs.readdirSync(this._BasePath);
        RootFileList.forEach(function (Entry) {
            var EntryFilename = path.join(_this._BasePath, Entry);
            if (fs.statSync(EntryFilename).isDirectory()) {
                var SubfolderName = Entry;
                var SubfolderFileList = fs.readdirSync(EntryFilename);
                SubfolderFileList.forEach(function (Entry) {
                    FileList.push(path.join(SubfolderName, Entry));
                });
            }
            else {
                FileList.push(Entry);
            }
        });
        FileList.forEach(function (File) {
            if (path.basename(File) === Filter) {
                console.log("Found " + File);
                FilteredFiles.push(File);
            }
        });
        console.log("Found " + FilteredFiles.length + " file(s)");
        return FilteredFiles;
    };
    LinuxFileSystemPersistentStore.prototype.Load = function (Name) {
        var Filename = path.join(this._BasePath, Name);
        var Data = fs.readFileSync(Filename, {
            encoding: "utf8",
            flag: "r",
        });
        return Data;
    };
    LinuxFileSystemPersistentStore.prototype.Save = function (Name, Data) {
        var Filename = path.join(this._BasePath, Name);
        fs.mkdirSync(this._BasePath, { recursive: true });
        fs.writeFileSync(Filename, Data);
        console.log("File written to ".concat(Filename));
    };
    LinuxFileSystemPersistentStore.prototype.List = function (Path) {
        return fs.readdirSync(Path);
    };
    return LinuxFileSystemPersistentStore;
}());
exports.LinuxFileSystemPersistentStore = LinuxFileSystemPersistentStore;
//# sourceMappingURL=LinuxFileSystemPersistentStore.js.map