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

import { IPersistentStore } from "../IPersistentStore";
import {
  ITestArtifact,
  TestArtifactTypeEnum,
  TestArtifactSchemaEnum,
} from "./ITestArtifact";

export class TestArtifact implements ITestArtifact {
  public CommitHash: string;
  public Type: TestArtifactTypeEnum;
  public Schema: TestArtifactSchemaEnum;
  public Container: string;
  readonly PersistentStore: IPersistentStore;

  constructor(
    CommitHash: string,
    Type: TestArtifactTypeEnum,
    Schema: TestArtifactSchemaEnum,
    Container: string,
    PersistentStore: IPersistentStore,
  ) {
    this.CommitHash = CommitHash;
    this.Type = Type;
    this.Schema = Schema;
    this.Container = Container;
    this.PersistentStore = PersistentStore;
  }

  public Load(Name: string): string {
    return this.PersistentStore.Load(this.Container + "/" + Name);
  }
}
