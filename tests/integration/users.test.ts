import supertest from "supertest";
import bcrypt from "bcrypt";
import app from "../../src/app.js";
import userRepository from "../../src/repositories/userRepository.js";
import userFactory from "../factories/userFactory.js";

describe("Users tests", () => {
  beforeEach(async () => {
    await userRepository.truncate();
  });
  afterAll(async () => {
    await userRepository.truncate();
  });

  it("should return 201 and persist a user given a valid user", async () => {
    const user = userFactory();

    const response = await supertest(app).post("/users").send(user);

    const userCreated = await userRepository.getByEmail(user.email);

    expect(response.status).toEqual(201);
    expect(userCreated).not.toEqual(null);
  });

  it("should return 200 and an auth object logging the user, given valid credentials", async () => {
    const user = userFactory();
    await userRepository.insert({
      ...user,
      password: bcrypt.hashSync(user.password, 12),
    });
    delete user.name;

    const response = await supertest(app).post("/users/login").send(user);

    expect(response.status).toEqual(200);
    expect(response.body.token).not.toEqual(undefined);
    expect(response.body.userName).not.toEqual(undefined);
  });
});
