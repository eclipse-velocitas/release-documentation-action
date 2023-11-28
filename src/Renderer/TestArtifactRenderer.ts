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

import * as handlebars from "handlebars";
import { ITemplateRepository } from "../TemplateRepository/ITemplateRepository";
import { IParseResult } from "../Parser/IParseResult";
import { IRenderer } from "./IRenderer";

export class TestArtifactRenderer implements IRenderer {
  private _TemplateRepository: ITemplateRepository;

  constructor(TemplateRepository: ITemplateRepository) {
    this._TemplateRepository = TemplateRepository;
  }

  public Render(Result: IParseResult): string {
    try {
      const TemplateSource = this._TemplateRepository.GetTemplate(Result);
      const template = handlebars.compile(TemplateSource, { strict: true });

      const result = template(Result);

      console.log(result);
      return result;
    } catch (e) {
      console.log(`failed to create documentation with error: ${e}`);
      throw e;
    }
  }
}
