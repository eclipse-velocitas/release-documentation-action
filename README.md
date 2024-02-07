# Release Documentation Render Action

The action `documentation/render` reads all input packages from the `inboxPath` and renders it as markdown to `outboxPath`. Available templates are stored in `templatePath`.

Use the `actions/checkout@v4` action to clone the `release-documentation-action` to a dedicated path, Then appropriate action can be used as shown in below example

```yml
- name: Clone actions repository
  uses: actions/checkout@v4
  with:
    repository: eclipse-velocitas/release-documentation-action
    path: "./.github/actions"
```

Usage

```yml
- name: Render documentation (test-results)
  uses: ./.github/actions/render
  with:
    inboxPath: .vehicleApp/Documentation/Inbox/test-results
    outboxPath: .vehicleApp/Documentation/Outbox
    templatePath: ./.github/actions/templates
```

**Location**
documentation/render

**Inputs**
|Name|Required|Description|Example values|
|-|-|-------------------|---------------|
|inboxPath|false|path containing the packaged input files for the release documentation ||
|outboxPath|false|output path for the rendered release documentation |
|templatePath|false|path to the templates used for release documentation generation|./.github/actions/templates

# Release Documentation Package Action

The action `documentation/package` copies all files from sourcePath to the packagePath under a subfolder name.
It also adds a metadata file to the folder containing name, type and format of the artifacts.

**Location**
documentation/package

Use the `actions/checkout@v4` action to clone the `release-documentation-action` to a dedicated path, Then appropriate action can be used as shown in below example

```yml
- name: Package integration test result files
  uses: ./.github/actions/package
  with:
    name: "IntegrationTest"
    type: "IntegrationTest"
    schema: "JUnit"
    sourcePath: .sdv/tmp/IntegrationTest
    packagePath: .sdv/tmp/Documentation/renderer
```

**Inputs**
|Name|Required|Description|Example values|
|-|-|-------------------|---------------|
|name|true|arbitrary name for the artifact|Unit Test Results Talent X|
|type|true|type of the artifact|UnitTest, IntegrationTest, ContainerScan, ...
|schema|true|format of the files|junit, ...
|sourcePath|true|folder where the action retrieves the raw result files|
|packagePath|true|target path where the results are copied to |

## Contributing

For guidance on setting up a development environment and how to make a contribution to the Velocitas Release Documentation Action, see the [contributing guidelines](./CONTRIBUTING.md).
