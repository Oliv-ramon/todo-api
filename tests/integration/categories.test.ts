import supertest from "supertest";
import app from "../../src/app.js";
import categoryRepository from "../../src/repositories/categoryRepository.js";
import categoryFactory from "../factories/categoryFactory.js";
import authFactory from "../factories/authFactory.js";
import { cleanDb } from "../helpers.js";
import { formatDate } from "../../src/utils/taskServiceUtils.js";
import dayjs from "dayjs";
import { getNextDayDateFormated } from "../../src/utils/taskRepositoryUtils.js";
import createCategoryFactory from "../factories/createCategoryFactory.js";

describe("Categories tests", () => {
  beforeEach(async () => {
    await categoryRepository.truncate();
  });
  afterAll(async () => {
    await cleanDb();
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
  it("should return 200 and today categories", async () => {
    const { token, userId } = await authFactory();

    const todayDate = dayjs();
    const todayInterval = [
      formatDate(todayDate.toISOString()),
      getNextDayDateFormated(todayDate.toDate()),
    ];
    const categories = [
      await createCategoryFactory(userId),
      await createCategoryFactory(userId),
    ];

    const response = await supertest(app)
      .get("/categories/today")
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(categories);
  });
  /*  it("should return 200 and today tasks", async () => {
    const { token, userId } = await authFactory();
    const category = categoryFactory({ userId });

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
  }); */
});
