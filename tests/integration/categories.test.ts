import supertest from "supertest";
import app from "../../src/app.js";
import categoryRepository from "../../src/repositories/categoryRepository.js";
import categoryFactory from "../factories/categoryFactory.js";
import authFactory from "../factories/authFactory.js";
import dayjs from "dayjs";
import createCategoryFactory from "../factories/createCategoryFactory.js";
import createTaskFactory from "../factories/createTaskFactory.js";
import { Category } from "@prisma/client";
import userRepository from "../../src/repositories/userRepository.js";

describe("Categories tests", () => {
  beforeEach(async () => {
    await categoryRepository.truncate();
  });
  afterAll(async () => {
    await userRepository.truncate();
  });

  it("should return 201 and create a category given a valid category", async () => {
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
  });

  it("should return 200 and all user categories", async () => {
    const { token, userId } = await authFactory();
    const categoriesAmount = 2;
    await createCategoryFactory(userId, categoriesAmount);

    const response = await supertest(app)
      .get("/categories")
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(categoriesAmount);
  });

  it("should return 200 and today tasks", async () => {
    const { token, userId } = await authFactory();
    const categoriesAmount = 2;
    const [category1, category2] = (await createCategoryFactory(
      userId,
      categoriesAmount
    )) as Category[];

    const tomorrowDate = dayjs().add(1, "day").toDate();
    const todayDate = dayjs().toDate();
    await createTaskFactory(
      userId,
      category1.id,
      { id: category1.id },
      { date: tomorrowDate }
    );
    await createTaskFactory(
      userId,
      category2.id,
      { id: category2.id },
      { date: todayDate }
    );

    const response = await supertest(app)
      .get("/categories/today")
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(1);
  });
});
