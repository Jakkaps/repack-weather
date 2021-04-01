import searchLocation from "./SearchAPI";

describe("Test of SearchAPI", () => {
  it("rejects when no array is received", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ detail: "error" }),
      })
    );

    await expect(searchLocation("Some query")).rejects.toEqual(
      "Invalid data received"
    );
  });

  it("rejects when invalid array data is received", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([{ test: "test" }]),
      })
    );

    await expect(searchLocation("Some query")).rejects.toEqual(
      "Invalid data received"
    );
  });
});
