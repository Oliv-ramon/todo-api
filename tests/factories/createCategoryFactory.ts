import categoryService from "../../src/services/categoryService";
import categoryFactory from "./categoryFactory";
import createUserFactory from "./createUserFactory";
import userFactory from "./userFactory";

export default async function createCategoryFactory() {
  const user = userFactory();
  const userCreated = await createUserFactory(user);

  const category = categoryFactory({ id: 1 });
  await categoryService.create(category, userCreated.id);

  return category;
}
