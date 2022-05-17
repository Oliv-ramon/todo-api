import { jest } from "@jest/globals";
import userRepository from "../../src/repositories/userRepository.js";
import userService from "../../src/services/userService.js";
import { conflictError } from "../../src/utils/errorUtils.js";
import userFactory from "../factories/userFactory.js";

describe("User Service tests", () => {
  it("should throw a conflic error given a duplicate user", async () => {
    const user = userFactory();

    jest
      .spyOn(userRepository, "getByEmail")
      .mockResolvedValue({ ...user, id: 1 });

    expect(async () => {
      await userService.signUp(user);
    }).rejects.toEqual(conflictError);
  });
});
