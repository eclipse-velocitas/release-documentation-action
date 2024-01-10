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

import { ITemplateRepository } from "./ITemplateRepository";
import { IParseResult } from "../Parser/IParseResult";
import { IPersistentStore } from "../IPersistentStore";
import { LinuxFileSystemPersistentStore } from "../LinuxFileSystemPersistentStore";

export class TemplateRepository implements ITemplateRepository {
  private _PersistentStore: IPersistentStore;

  constructor(TemplateFolder: string) {
    this._PersistentStore = new LinuxFileSystemPersistentStore(TemplateFolder);
  }

  public GetTemplate(Result: IParseResult): string {
    const TemplateFilename =
      Result.Type.toString() + "-" + Result.Schema.toString() + ".md";
    const source = this._PersistentStore.Load(TemplateFilename);
    return source;
  }
}
