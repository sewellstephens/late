# @sewellstephens/plate-serializer-csv

## 37.0.0

### Major Changes

- [#3420](https://github.com/sewellstephens/late/pull/3420) by [@zbeyens](https://github.com/zbeyens) –
  - `createDeserializeCsvPlugin` -> `CsvPlugin`

## 36.5.8

## 36.5.7

## 36.3.8

## 36.3.5

## 36.3.1

## 36.2.0

## 36.0.0

## 35.2.0

## 35.1.0

## 34.0.0

## 33.0.7

## 33.0.2

## 33.0.0

### Patch Changes

- [#3125](https://github.com/sewellstephens/late/pull/3125) by [@zbeyens](https://github.com/zbeyens) –
  - Remove `@sewellstephens/plate-table` dependency.

## 32.0.2

## 32.0.0

## 31.4.1

## 31.4.0

## 31.3.3

## 31.3.2

## 31.3.1

## 31.0.0

### Minor Changes

- [#3040](https://github.com/sewellstephens/late/pull/3040) by [@zbeyens](https://github.com/zbeyens) – Updated minor dependencies

## 30.9.4

## 30.9.3

## 30.9.2

## 30.9.1

## 30.5.3

### Patch Changes

- [`4cbed7159`](https://github.com/sewellstephens/late/commit/4cbed7159d51f7427051686e45bcf2a8899aeede) by [@zbeyens](https://github.com/zbeyens) – Move `@sewellstephens/plate-common` to peerDeps to fix a bug when multiple instances were installed

## 30.4.5

## 30.1.2

## 30.0.1

## 30.0.0

## 29.1.0

## 29.0.1

## 29.0.0

## 28.1.2

## 28.1.1

## 28.0.0

## 27.0.3

## 27.0.2

## 27.0.1

## 27.0.0

## 26.0.5

## 26.0.4

## 26.0.3

## 26.0.2

## 26.0.1

## 26.0.0

## 25.0.1

## 25.0.0

## 24.5.2

## 24.5.0

### Patch Changes

- [#2696](https://github.com/sewellstephens/late/pull/2696) by [@zbeyens](https://github.com/zbeyens) – Fix: Named export 'parse' not found.

## 24.4.2

## 24.4.0

### Minor Changes

- [#2675](https://github.com/sewellstephens/late/pull/2675) by [@zbeyens](https://github.com/zbeyens) – Support slate-react 0.99.0

## 24.3.6

## 24.3.5

## 24.3.2

## 24.3.1

## 24.3.0

## 24.2.0

## 24.0.2

## 24.0.1

## 24.0.0

## 23.7.4

## 23.7.0

## 23.6.1

## 23.6.0

## 23.4.1

## 23.3.1

## 23.3.0

## 23.1.0

## 23.0.1

## 23.0.0

## 22.0.2

## 22.0.1

## 22.0.0

## 21.5.0

## 21.4.3

## 21.4.2

## 21.4.1

## 21.3.4

## 21.3.2

## 21.3.0

## 21.1.5

## 21.1.0

### Minor Changes

- [#2374](https://github.com/sewellstephens/late/pull/2374) by [@12joan](https://github.com/12joan) –
  - Make papaparse options customisable using `parseOptions` plugin option.
    ```ts
      createDeserializeCsvPlugin({
        options: {
          parseOptions: {
            header: false,
          },
        },
      }),
    ```
  - Options can also be passed directly to `deserializeCsv` as follows: `deserializeCsv({ data, headers: true })`.

## 21.0.0

## 20.7.2

## 20.7.0

## 20.6.3

## 20.5.0

## 20.4.0

## 20.3.2

## 20.3.0

## 20.2.0

## 20.1.0

## 20.0.0

## 19.7.0

## 19.5.0

## 19.4.4

## 19.4.2

## 19.3.0

## 19.2.0

## 19.1.1

## 19.1.0

## 19.0.3

## 19.0.1

## 19.0.0

## 18.15.0

## 18.13.0

## 18.11.0

## 18.9.0

## 18.7.0

## 18.6.0

## 18.2.0

## 18.1.2

## 18.1.1

## 17.0.3

## 17.0.2

## 17.0.1

## 17.0.0

## 16.8.0

## 16.6.0

## 16.5.0

## 16.4.2

## 16.3.0

## 16.2.0

## 16.1.0

## 16.0.2

## 16.0.0

## 15.0.3

## 15.0.0

## 14.4.2

## 14.0.2

## 14.0.0

## 13.8.0

## 13.7.0

## 13.6.0

## 13.5.0

## 13.3.0

## 13.2.1

## 13.1.0

## 11.3.1

## 11.3.0

## 11.2.1

## 11.2.0

## 11.1.1

## 11.1.0

## 11.0.6

## 11.0.5

## 11.0.4

## 11.0.3

## 11.0.2

## 11.0.1

## 11.0.0

### Patch Changes

- [#1500](https://github.com/sewellstephens/late/pull/1500) by [@zbeyens](https://github.com/zbeyens) – updated deps:
  ```bash
  "papaparse": "^5.3.2"
  ```

## 10.6.3

## 10.5.3

## 10.5.2

## 10.5.0

## 10.4.2

## 10.4.1

## 10.4.0

## 10.3.0

## 10.2.2

## 10.2.1

## 10.1.2

## 10.1.1

## 10.1.0

## 10.0.0

## 9.3.1

## 9.3.0

## 9.2.1

## 9.2.0

## 9.1.3

## 9.1.1

## 9.0.0

## 8.3.0

## 8.1.0

## 8.0.0

### Major Changes

- [#1234](https://github.com/sewellstephens/late/pull/1234) by [@zbeyens](https://github.com/zbeyens) – Renamed:
  - `createDeserializeCSVPlugin` to `createDeserializeCsvPlugin`
  - `deserializeCSV` to `deserializeCsv`

## 7.0.2

## 7.0.1

## 7.0.0

## 6.4.1

## 6.4.0

## 6.3.0

## 6.2.0

## 6.1.0

## 6.0.0

## 5.3.5

### Patch Changes

- Updated dependencies [[`a6bf8c5e`](https://github.com/sewellstephens/late/commit/a6bf8c5e6897c6ab443e0ac3d69a30befeaddadf)]:
  - @sewellstephens/plate-common@5.3.5
  - @sewellstephens/plate-table@5.3.5
  - @sewellstephens/plate-serializer@5.3.5

## 5.3.4

### Patch Changes

- Updated dependencies [[`f45ed8cf`](https://github.com/sewellstephens/late/commit/f45ed8cff140a604169bfa0d042447a8fd0236ed)]:
  - @sewellstephens/plate-serializer@5.3.4

## 5.3.1

### Patch Changes

- [#1136](https://github.com/sewellstephens/late/pull/1136) [`8aec270f`](https://github.com/sewellstephens/late/commit/8aec270f8b06a3b25b8d7144c2e23b0dc12de118) Thanks [@dylans](https://github.com/dylans)! - allow disabling deserializer by paste target

- Updated dependencies [[`8aec270f`](https://github.com/sewellstephens/late/commit/8aec270f8b06a3b25b8d7144c2e23b0dc12de118)]:
  - @sewellstephens/plate-core@5.3.1
  - @sewellstephens/plate-serializer@5.3.1
  - @sewellstephens/plate-common@5.3.1
  - @sewellstephens/plate-table@5.3.1

## 5.3.0

### Patch Changes

- Updated dependencies [[`7ee21356`](https://github.com/sewellstephens/late/commit/7ee21356f0a4e67e367232b3dbc9957254a0c11e)]:
  - @sewellstephens/plate-core@5.3.0
  - @sewellstephens/plate-common@5.3.0
  - @sewellstephens/plate-table@5.3.0
  - @sewellstephens/plate-serializer@5.3.0

## 5.1.0

### Patch Changes

- Updated dependencies [[`503956fd`](https://github.com/sewellstephens/late/commit/503956fd9f71253249b3ad699b81c1c465351b0a)]:
  - @sewellstephens/plate-common@5.1.0
  - @sewellstephens/plate-table@5.1.0
  - @sewellstephens/plate-serializer@5.1.0

## 4.4.0

### Patch Changes

- Updated dependencies [[`b22c06aa`](https://github.com/sewellstephens/late/commit/b22c06aad1cfed08069dadc7ec39bcbfb1d0af37)]:
  - @sewellstephens/plate-common@4.4.0
  - @sewellstephens/plate-table@4.4.0
  - @sewellstephens/plate-serializer@4.4.0

## 4.3.7

### Patch Changes

- Updated dependencies [[`58f6fb53`](https://github.com/sewellstephens/late/commit/58f6fb53bf45a2e0509f4aca617aa21356952fca)]:
  - @sewellstephens/plate-core@4.3.7
  - @sewellstephens/plate-common@4.3.7
  - @sewellstephens/plate-table@4.3.7
  - @sewellstephens/plate-serializer@4.3.7

## 4.3.0

### Patch Changes

- Updated dependencies [[`6af469cd`](https://github.com/sewellstephens/late/commit/6af469cd5ac310e831eb8a99a71eba73bde62fc6)]:
  - @sewellstephens/plate-core@4.3.0
  - @sewellstephens/plate-common@4.3.0
  - @sewellstephens/plate-table@4.3.0
  - @sewellstephens/plate-serializer@4.3.0

## 3.5.1

### Patch Changes

- Updated dependencies [[`0db393e1`](https://github.com/sewellstephens/late/commit/0db393e1cebec792c89a633cb8929a0786943713)]:
  - @sewellstephens/plate-serializer@3.5.1

## 3.4.0

### Patch Changes

- Updated dependencies [[`f1da7267`](https://github.com/sewellstephens/late/commit/f1da7267d46d94e207f4477f73e42b63736a9085), [`35caf35d`](https://github.com/sewellstephens/late/commit/35caf35d48fff851518648ff66e64a4268dcc97c)]:
  - @sewellstephens/plate-common@3.4.0
  - @sewellstephens/plate-core@3.4.0
  - @sewellstephens/plate-table@3.4.0
  - @sewellstephens/plate-serializer@3.4.0

## 3.2.0

### Minor Changes

- [#995](https://github.com/sewellstephens/late/pull/995) [`58387c6d`](https://github.com/sewellstephens/late/commit/58387c6d34e86be7880999b40a9105b6178f4ce4) Thanks [@dylans](https://github.com/dylans)! - update slate dependencies and peerDependencies to 0.66.\*

### Patch Changes

- [#995](https://github.com/sewellstephens/late/pull/995) [`5eb42cdd`](https://github.com/sewellstephens/late/commit/5eb42cdd47db4fd41936420b86b0bf7df9a8aa09) Thanks [@dylans](https://github.com/dylans)! - update to slate 0.66.x

- Updated dependencies [[`56b2551b`](https://github.com/sewellstephens/late/commit/56b2551b2fa5fab180b3c99551144667f99f7afc), [`3a590663`](https://github.com/sewellstephens/late/commit/3a5906637b008e85a6d907a7492a78fe9961bf34), [`58387c6d`](https://github.com/sewellstephens/late/commit/58387c6d34e86be7880999b40a9105b6178f4ce4), [`5eb42cdd`](https://github.com/sewellstephens/late/commit/5eb42cdd47db4fd41936420b86b0bf7df9a8aa09)]:
  - @sewellstephens/plate-table@3.2.0
  - @sewellstephens/plate-serializer@3.2.0
  - @sewellstephens/plate-common@3.2.0
  - @sewellstephens/plate-core@3.2.0

## 3.1.3

### Patch Changes

- Updated dependencies [[`f6c58134`](https://github.com/sewellstephens/late/commit/f6c581347cc5877b7afa0774ef1ad78ad227564e)]:
  - @sewellstephens/plate-common@3.1.3
  - @sewellstephens/plate-table@3.1.3
  - @sewellstephens/plate-serializer@3.1.3

## 3.1.2

### Patch Changes

- Updated dependencies [[`1244bcb7`](https://github.com/sewellstephens/late/commit/1244bcb748411e6291d635647c2053b115704eb9), [`5651aed7`](https://github.com/sewellstephens/late/commit/5651aed704d69af85e2dd7d6f850e8dcabcd45f4)]:
  - @sewellstephens/plate-table@3.1.2

## 3.0.2

### Patch Changes

- Updated dependencies [[`83aaf31c`](https://github.com/sewellstephens/late/commit/83aaf31c02b24f388d1f178dcd4b80354ddab773)]:
  - @sewellstephens/plate-table@3.0.2

## 2.0.1

### Patch Changes

- Updated dependencies [[`099a86fa`](https://github.com/sewellstephens/late/commit/099a86faede3b3acf7da6842a78e4fab76815073)]:
  - @sewellstephens/plate-table@2.0.1

## 2.0.0

### Patch Changes

- Updated dependencies [[`ec4d5b7b`](https://github.com/sewellstephens/late/commit/ec4d5b7bd01b6fd21ba14a28f782c143d32c7532)]:
  - @sewellstephens/plate-common@2.0.0
  - @sewellstephens/plate-table@2.0.0
  - @sewellstephens/plate-serializer@2.0.0

## 1.1.6

### Patch Changes

- Updated dependencies [[`7d045d8d`](https://github.com/sewellstephens/late/commit/7d045d8db39515d4574c5313cc97287486c5866b)]:
  - @sewellstephens/plate-common@1.1.6
  - @sewellstephens/plate-table@1.1.6
  - @sewellstephens/plate-serializer@1.1.6

## 1.1.5

### Patch Changes

- Updated dependencies [[`f955b72c`](https://github.com/sewellstephens/late/commit/f955b72c0ab97e2e2ca54f17f9f8022f7d0f121b)]:
  - @sewellstephens/plate-table@1.1.5

## 1.1.4

### Patch Changes

- [#907](https://github.com/sewellstephens/late/pull/907) [`decc90d9`](https://github.com/sewellstephens/late/commit/decc90d984170d94ac8dbd0dc487a107d68d296d) Thanks [@dylans](https://github.com/dylans)! - add optional errorTolerance for csv deserializer detection

## 1.1.3

### Patch Changes

- [#900](https://github.com/sewellstephens/late/pull/900) [`c5c73683`](https://github.com/sewellstephens/late/commit/c5c73683eb3b9c9a091fe1fa05113c9176f9b12a) Thanks [@dylans](https://github.com/dylans)! - Make sure there's at least a 2x2 table before treating text as csv

## 1.0.0

### Major Changes

🎉 The **Slate Plugins** project has evolved to **Late** 🎉

To migrate, install `@sewellstephens/plate[-x]` then find and replace all
occurrences of:

- `slate-plugins` to `plate`
- `SlatePlugins` to `Late`
- `SlatePlugin` to `LatePlugin`

## 1.0.0-next.61

> This is the last version of `@sewellstephens/slate-plugins[-x]`, please install
> `@sewellstephens/plate[-x]`.

### Major Changes

- [#869](https://github.com/udecode/slate-plugins/pull/869) [`fd91359d`](https://github.com/udecode/slate-plugins/commit/fd91359dc3722292cee06e0f80ed414934b27572) Thanks [@zbeyens](https://github.com/zbeyens)! - Removed `getFragment` and `insert` option in favor of the new plugin options.

### Patch Changes

- Updated dependencies [[`546ee49b`](https://github.com/udecode/slate-plugins/commit/546ee49b1e22464a8a0c0fad7f254da85bcfde3d), [`7c26cf32`](https://github.com/udecode/slate-plugins/commit/7c26cf32e8b501d531c6d823ab55bf361e228bc3)]:
  - @sewellstephens/slate-plugins-serializer@1.0.0-next.61
  - @sewellstephens/slate-plugins-core@1.0.0-next.61
  - @sewellstephens/slate-plugins-common@1.0.0-next.61
  - @sewellstephens/slate-plugins-table@1.0.0-next.61

## 1.0.0-next.60

### Minor Changes

- [#864](https://github.com/udecode/slate-plugins/pull/864) [`37a52994`](https://github.com/udecode/slate-plugins/commit/37a529945a882adb0222b47a28466dd31286a354) Thanks [@dylans](https://github.com/dylans)! - Refactor insert for deserializers

## 1.0.0-next.59

### Patch Changes

- Updated dependencies [[`3a3eb1b8`](https://github.com/udecode/slate-plugins/commit/3a3eb1b8565789b7ba49e8170479df8245ed5b22)]:
  - @sewellstephens/slate-plugins-common@1.0.0-next.59
  - @sewellstephens/slate-plugins-table@1.0.0-next.59

## 1.0.0-next.58

### Patch Changes

- [#860](https://github.com/udecode/slate-plugins/pull/860) [`db6371c3`](https://github.com/udecode/slate-plugins/commit/db6371c36e389cb03901a119194dd93652134554) Thanks [@dylans](https://github.com/dylans)! - wrap paste deserialization in withoutNormalization block to prevent paste errors

## 1.0.0-next.56

### Patch Changes

- Updated dependencies [[`75b39f18`](https://github.com/udecode/slate-plugins/commit/75b39f18901d38f80847573cd3431ece1d1d4b3d)]:
  - @sewellstephens/slate-plugins-core@1.0.0-next.56
  - @sewellstephens/slate-plugins-common@1.0.0-next.56
  - @sewellstephens/slate-plugins-table@1.0.0-next.56

## 1.0.0-next.55

### Patch Changes

- Updated dependencies [[`abaf4a11`](https://github.com/udecode/slate-plugins/commit/abaf4a11d3b69157983b6cf77b023a6008478a79)]:
  - @sewellstephens/slate-plugins-core@1.0.0-next.55
  - @sewellstephens/slate-plugins-common@1.0.0-next.55
  - @sewellstephens/slate-plugins-table@1.0.0-next.55

## 1.0.0-next.54

### Patch Changes

- Updated dependencies [[`d906095d`](https://github.com/udecode/slate-plugins/commit/d906095d20cf8755a200d254f6c20c510a748f29)]:
  - @sewellstephens/slate-plugins-common@1.0.0-next.54
  - @sewellstephens/slate-plugins-table@1.0.0-next.54

## 1.0.0-next.53

### Patch Changes

- Updated dependencies [[`42360b44`](https://github.com/udecode/slate-plugins/commit/42360b444d6a2959847d5619eda32319e360e3af)]:
  - @sewellstephens/slate-plugins-core@1.0.0-next.53
  - @sewellstephens/slate-plugins-common@1.0.0-next.53
  - @sewellstephens/slate-plugins-table@1.0.0-next.53

## 1.0.0-next.49

### Patch Changes

- [#822](https://github.com/udecode/slate-plugins/pull/822) [`0779802d`](https://github.com/udecode/slate-plugins/commit/0779802d0eab817fcb1e7de21d1e2fcff3d5fd8f) Thanks [@dylans](https://github.com/dylans)! - Add CSV deserializer for paste from CSV
