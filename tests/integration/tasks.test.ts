import supertest from "supertest";
import app from "../../src/app.js";
import categoryRepository from "../../src/repositories/categoryRepository.js";
import categoryFactory from "../factories/categoryFactory.js";
import authFactory from "../factories/authFactory.js";

describe("Tasks tests", () => {
  beforeEach(async () => {
    await categoryRepository.truncate();
  });
  afterAll(async () => {
    await categoryRepository.truncate();
  });

  it("should return 201 and create a task given a valid category", async () => {
    /* 
    const { token, userId } = await authFactory();
    const category = categoryFactory();

    const response = await supertest(app)
      .post("/categories")
      .send(category)
      .set({ Authorization: `Bearer ${token}` });

    const categoryCreated = await categoryRepository.getByNameAndUserId(
      userId,
      category.name
    );

    expect(response.status).toEqual(201);
    expect(categoryCreated).not.toEqual(null);
   */
  });
});
