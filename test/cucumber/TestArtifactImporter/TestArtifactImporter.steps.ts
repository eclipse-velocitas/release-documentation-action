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

import { binding, given, then, when } from "cucumber-tsflow";
import { should } from "chai";
import { IPersistentStore } from "../../../src/IPersistentStore";
import { ITestArtifactImporter } from "../../../src/TestArtifactImporter/ITestArtifactImporter";
import { TestArtifactImporter } from "../../../src/TestArtifactImporter/TestArtifactImporter";
import { MockPersistentStore } from "../../MockPersistentStore";
import { ITestArtifact } from "../../../src/TestArtifact/ITestArtifact";

@binding()
class TestArtifactImporterSteps {
  private _Should: Chai.Should;
  private _GivenPersistentStore?: IPersistentStore;
  private _ActionResult?: ITestArtifact[];

  constructor() {
    this._Should = should();
    this._Should.exist(this._Should);
  }

  @given(/we mock the inbox/)
  public GivenWeMockTheInbox2() {
    this._GivenPersistentStore = new MockPersistentStore();
  }

  @given(
    /we have a file with name '(.*)' and the following content in the inbox/,
  )
  public GivenWeHaveAFileInTheInbox2(Filename: string, Content: string) {
    this._GivenPersistentStore?.Save(Filename, Content);
  }

  @when(/we call GetTestArtifacts/)
  public WhenWeCallGetTestArtifacts() {
    const Importer: ITestArtifactImporter = new TestArtifactImporter(
      this._GivenPersistentStore!,
    );
    this._ActionResult = Importer.GetTestArtifacts();
  }

  @then(/it should return '(.*)' objects/)
  public ThenItShouldReturnNumberObjects(NumberOfObjects: string): void {
    const ExpectedNumber: number = Number.parseInt(NumberOfObjects);
    this._ActionResult!.length.should.equal(ExpectedNumber);
  }

  @then(/the Type of the first object should be '(.*)'/)
  public ThenTheTypeShouldBeFirst(Type: string): void {
    this._ActionResult![0]!.Type.should.equal(Type);
  }

  @then(/the Schema of the first object should be '(.*)'/)
  public ThenTheSchemaShouldBeFirst(Schema: string): void {
    this._ActionResult![0]!.Schema.should.equal(Schema);
  }

  @then(/the Container of the first object should be '(.*)'/)
  public ThenTheContainerHashShouldBeFirst(Container: string): void {
    this._ActionResult![0]!.Container.should.equal(Container);
  }

  @then(/the CommitHash of the first object should be '(.*)'/)
  public ThenTheCommitHashShouldBeFirst(CommitHash: string): void {
    this._ActionResult![0]!.CommitHash.should.equal(CommitHash);
  }

  @then(/the Type of the second object should be '(.*)'/)
  public ThenTheTypeShouldBeSecond(Type: string): void {
    this._ActionResult![1]!.Type.should.equal(Type);
  }

  @then(/the Schema of the second object should be '(.*)'/)
  public ThenTheSchemaShouldBeSecond(Schema: string): void {
    this._ActionResult![1]!.Schema.should.equal(Schema);
  }

  @then(/the Container of the second object should be '(.*)'/)
  public ThenTheContainerHashShouldBeSecond(Container: string): void {
    this._ActionResult![1]!.Container.should.equal(Container);
  }

  @then(/the CommitHash of the second object should be '(.*)'/)
  public ThenTheCommitHashShouldBeSecond(CommitHash: string): void {
    this._ActionResult![1]!.CommitHash.should.equal(CommitHash);
  }
}

export = TestArtifactImporterSteps;
