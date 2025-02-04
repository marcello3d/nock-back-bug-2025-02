# nock.back bug

Install deps (nock and jest):

```shell
npm install
```

Running tests with `NOCK_BACK_MODE=update` fails:

```shell
NOCK_BACK_MODE=update npm test
```

output:

```% NOCK_BACK_MODE=update npm test

> nock-back-bug@1.0.0 test
> jest

 FAIL  ./index.test.js
  nock.back
    ✓ should work (164 ms)
    ✕ handles parallel requests (123 ms)

  ● nock.back › handles parallel requests

    TypeError: Body is unusable: Body has already been read

      15 |   it("handles parallel requests", async () => {
      16 |     const { nockDone } = await back(`test2.json`);
    > 17 |     const responses = await Promise.all([
         |                       ^
      18 |       fetch("https://api.descript.com"),
      19 |       fetch("https://api.descript.com"),
      20 |     ]);

      at _Emitter.<anonymous> (node_modules/nock/lib/recorder.js:265:35)
      at _Emitter.<anonymous> (node_modules/strict-event-emitter/src/Emitter.ts:88:23)
      at emitAsync (node_modules/@mswjs/interceptors/src/utils/emitAsync.ts:23:20)
      at node_modules/@mswjs/interceptors/src/interceptors/fetch/index.ts:155:11
          at async Promise.all (index 1)
      at Object.<anonymous> (index.test.js:17:23)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 passed, 2 total
Snapshots:   1 passed, 1 total
Time:        0.442 s, estimated 1 s
Ran all test suites.
```
