import supertest from "supertest";
import app from "../../src/app.js";
import userRepository from "../../src/repositories/userRepository.js";
import userFactory from "../factories/userFactory.js";

describe("Users tests", () => {
  beforeEach(async () => {
    await userRepository.truncate();
  });

  it("should return 201 and persist a user given a valid user", async () => {
    const user = userFactory();

    const response = await supertest(app).post("/users").send(user);

    const userCreated = await userRepository.getByEmail(user.email);

    expect(response.status).toEqual(201);
    expect(userCreated).not.toEqual(null);
  });
});
