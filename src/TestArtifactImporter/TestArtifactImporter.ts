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

import { IPersistentStore } from "../IPersistentStore";
import {
  ITestArtifact,
  TestArtifactSchemaEnum,
  TestArtifactTypeEnum,
} from "../TestArtifact/ITestArtifact";
import { ITestArtifactImporter } from "./ITestArtifactImporter";
import { TestArtifact } from "../TestArtifact/TestArtifact";

export class TestArtifactImporter implements ITestArtifactImporter {
  private _PersistentStore: IPersistentStore;

  constructor(PersistentStore: IPersistentStore) {
    this._PersistentStore = PersistentStore;
  }

  public GetTestArtifacts(): ITestArtifact[] {
    const ArtifactList: ITestArtifact[] = [];
    var Definition: string;

    const Keys = this._PersistentStore.GetFiles("TestArtifact.json");
    Keys.forEach((Key: string) => {
      console.log("Adding test result from folder: " + Key);
      try {
        Definition = this._PersistentStore.Load(Key);
      } catch (Error) {
        console.log("Failed to read file '" + Key + "': " + Error);
        throw Error;
      }
      try {
        console.log("Trying to parse: '" + Definition + "'");
        var Object = JSON.parse(Definition);
        const CommitHash: string = Object.CommitHash;
        const Type: TestArtifactTypeEnum = Object.Type;
        const Schema: TestArtifactSchemaEnum = Object.Schema;
        const LastDelimiterPosition = Key.lastIndexOf("/");
        const Container = Key.substring(0, LastDelimiterPosition);
        ArtifactList.push(
          new TestArtifact(
            CommitHash,
            Type,
            Schema,
            Container,
            this._PersistentStore,
          ),
        );
      } catch (Error) {
        console.log("Failed to parse '" + Key + "': " + Error);
        throw Error;
      }
    });
    return ArtifactList;
  }
}
