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

import { binding, given, then, when } from "cucumber-tsflow";
import { should } from "chai";
import { IParseResult } from "../../../src/Parser/IParseResult";
import { TestArtifactRenderer } from "../../../src/Renderer/TestArtifactRenderer";
import {
  TestArtifactSchemaEnum,
  TestArtifactTypeEnum,
} from "../../../src/TestArtifact/ITestArtifact";
import { ITemplateRepository } from "../../../src/TemplateRepository/ITemplateRepository";
import { IRenderer } from "../../../src/Renderer/IRenderer";

class MockTemplateRepository implements ITemplateRepository {
  private _Content: string;

  constructor(Content: string) {
    this._Content = Content;
  }

  GetTemplate(Result: IParseResult): string {
    if (Result.Schema !== "Cobertura") {
      throw "unexpected schema: " + Result.Schema;
    }
    if (Result.Type !== "CodeCoverage") {
      throw "unexpected type: " + Result.Type;
    }
    return this._Content;
  }
}

@binding()
class CoberturaRendererSteps {
  private _Should: Chai.Should;
  private _ActionResult?: string;
  private _GivenTemplateRespository?: ITemplateRepository;
  private _GivenTestResult?: IParseResult;

  constructor() {
    this._Should = should();
    this._Should.exist(this._Should);
  }

  @given(
    /we mock the template repository with the template 'CodeCoverage-Cobertura\.md' and the following content/,
  )
  public GivenWeMockTheTemplateRepository(Content: string) {
    this._GivenTemplateRespository = new MockTemplateRepository(Content);
  }

  @given(/we have the following test result/)
  public WeHaveTheFollowingTestResult(Content: string) {
    var TestResult: IParseResult;
    TestResult = {
      TestSuiteName: Content,
      CommitHash: "someCommit",
      Schema: TestArtifactSchemaEnum.Cobertura,
      Type: TestArtifactTypeEnum.CodeCoverage,
      Result: {
        "line-rate": "0.5387",
      },
    };
    this._GivenTestResult = TestResult;
  }

  @when(/we call the Renderer/)
  public WhenWeCallTheRender(): void {
    var Renderer: IRenderer = new TestArtifactRenderer(
      this._GivenTemplateRespository!,
    );
    this._ActionResult = Renderer.Render(this._GivenTestResult!);
  }

  @then(/the result should be/)
  public TheResultShouldBe(Content: string): void {
    this._ActionResult?.should.equal(Content);
  }
}

export = CoberturaRendererSteps;
