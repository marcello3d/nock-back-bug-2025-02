// Copyright 2025 Descript, Inc
const { back } = require("nock");
const path = require("path");

describe("nock.back", () => {
  back.fixtures = path.join(__dirname, "__nocks__");

  it("should work", async () => {
    const { nockDone } = await back(`test1.json`);
    const response = await fetch("https://api.descript.com");
    await expect(response.text()).resolves.toMatchSnapshot();
    nockDone();
  });

  it("handles parallel requests", async () => {
    const { nockDone } = await back(`test2.json`);
    const responses = await Promise.all([
      fetch("https://api.descript.com"),
      fetch("https://api.descript.com"),
    ]);
    expect(responses.length).toBe(4);
    nockDone();
  });
});
