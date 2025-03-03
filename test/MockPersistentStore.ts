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

import { IPersistentStore } from "../src/IPersistentStore";

export class MockPersistentStore implements IPersistentStore {
  private _Files: { Name: string; Content: string }[] = [];

  public GetFiles(Filter: string): string[] {
    const keys: string[] = [];
    this._Files.forEach((Entry: { Name: string; Content: string }) => {
      if (Entry.Name.endsWith(Filter)) {
        keys.push(Entry.Name);
      }
    });
    return keys;
  }

  public Load(Name: string): string {
    var Content: string = "";
    var Found: boolean = false;
    this._Files.forEach((Entry: { Name: string; Content: string }) => {
      if (Entry.Name === Name) {
        Content = Entry.Content;
        Found = true;
      }
    });
    if (!Found) {
      throw "Failed to find file '" + Name + "'";
    }
    return Content;
  }

  public Save(Name: string, Content: string): void {
    this._Files.push({
      Name: Name,
      Content: Content,
    });
  }

  public List(): string[] {
    let keys = [];
    for (var Key in this._Files.keys) keys.push(Key);
    return keys;
  }
}
