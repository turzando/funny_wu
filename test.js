const app = require("./app");
const supertest = require("supertest");
const request = supertest(app);

describe("Health Check", () => {
  it("should return status 200 when the app is healthy", async () => {
    const response = await request.get("/health")
    expect(response.status).toBe(200)
    expect(response.text).toEqual('ok')
  })
})