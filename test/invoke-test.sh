# Copyright (c) 2022 Robert Bosch GmbH and Microsoft Corporation
#
# This program and the accompanying materials are made available under the
# terms of the Apache License, Version 2.0 which is available at
# https://www.apache.org/licenses/LICENSE-2.0.
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
# WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
# License for the specific language governing permissions and limitations
# under the License.
#
# SPDX-License-Identifier: Apache-2.0

clear
./node_modules/.bin/cucumber-js test/cucumber/TestArtifact/**/*.feature --require test/cucumber/TestArtifact/**/*.ts
./node_modules/.bin/cucumber-js test/cucumber/TestArtifactImporter/**/*.feature --require test/cucumber/TestArtifactImporter/**/*.ts
./node_modules/.bin/cucumber-js test/cucumber/CoberturaParser/**/*.feature --require test/cucumber/CoberturaParser/**/*.ts
./node_modules/.bin/cucumber-js test/cucumber/JUnitParser/**/*.feature --require test/cucumber/JUnitParser/**/*.ts
./node_modules/.bin/cucumber-js test/cucumber/TextParser/**/*.feature --require test/cucumber/TextParser/**/*.ts
./node_modules/.bin/cucumber-js test/cucumber/Renderer/**/*.feature --require test/cucumber/Renderer/**/*.ts
