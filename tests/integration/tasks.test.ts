import supertest from "supertest";
import app from "../../src/app.js";
import categoryRepository from "../../src/repositories/categoryRepository.js";
import authFactory from "../factories/authFactory.js";
import taskFactory from "../factories/taskFactory.js";
import taskRepository from "../../src/repositories/taskRepository.js";
import createCategoryFactory from "../factories/createCategoryFactory.js";
import { cleanDb } from "../helpers.js";

describe("Tasks tests", () => {
  beforeEach(async () => {
    await categoryRepository.truncate();
  });
  afterAll(async () => {
    await cleanDb();
  });

  it("should return 201 and create a task given a valid category", async () => {
    const { token, userId } = await authFactory();
    const category = await createCategoryFactory(userId);
    const task = taskFactory({ categoryId: category.id });

    const response = await supertest(app)
      .post("/tasks")
      .send(task)
      .set({ Authorization: `Bearer ${token}` });

    const taskCreated = await taskRepository.getByNameAndUserId(
      task.name,
      userId
    );

    expect(response.status).toEqual(201);
    expect(taskCreated).not.toEqual(null);
  });
});
