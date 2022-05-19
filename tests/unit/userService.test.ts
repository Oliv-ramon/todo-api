import bcrypt from "bcrypt";
import { jest } from "@jest/globals";
import userRepository from "../../src/repositories/userRepository.js";
import userService from "../../src/services/userService.js";
import {
  conflictError,
  unauthorizedError,
} from "../../src/utils/errorUtils.js";
import userFactory from "../factories/userFactory.js";

describe("User Service tests", () => {
  describe("signUp tests", () => {
    it("should throw a conflic error given a duplicate user", async () => {
      const user = userFactory();

      jest
        .spyOn(userRepository, "getByEmail")
        .mockResolvedValueOnce({ ...user, id: 1 });

      expect(async () => {
        await userService.signUp(user);
      }).rejects.toEqual(conflictError("this user already have an account"));
    });
  });

  describe("login tests", () => {
    it("should throw a unauthorized error given an unexistent user", async () => {
      const user = userFactory();

      jest.spyOn(userRepository, "getByEmail").mockResolvedValueOnce(null);

      expect(async () => {
        await userService.login(user);
      }).rejects.toEqual(unauthorizedError("invalid credentials"));
    });

    it("should throw a unauthorized error given invalid credentials", async () => {
      const user = userFactory();

      jest.spyOn(userRepository, "getByEmail").mockResolvedValueOnce({
        id: 1,
        ...user,
        password: bcrypt.hashSync(user.password, 12),
      });

      expect(async () => {
        user.password = "";
        await userService.login(user);
      }).rejects.toEqual(unauthorizedError("invalid credentials"));
    });
  });
});
