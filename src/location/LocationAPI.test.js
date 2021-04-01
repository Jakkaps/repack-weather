import { locationFromWoeid } from "./LocationAPI";

describe("Tests for getting locations from woeid", () => {
  it("rejects when no data is returned", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ detail: "error" }),
      })
    );

    await expect(locationFromWoeid(12345)).rejects.toEqual(
      "Invalid data received"
    );
  });
});
