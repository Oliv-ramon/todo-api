import { jest } from "@jest/globals";
import { badRequestError, notFoundError } from "../../src/utils/errorUtils.js";
import eventRepository from "../../src/repositories/eventRepository.js";
import eventService from "../../src/services/eventService.js";
import eventFactory from "../factories/eventFactory.js";
import faker from "@faker-js/faker";

describe("Event Service tests", () => {
  describe("checkOrUncheck tests", () => {
    it("should throw a not found error given an unexistent eventId", async () => {
      const event = eventFactory();

      jest.spyOn(eventRepository, "getById").mockResolvedValueOnce(null);

      await expect(async () => {
        await eventService.checkOrUncheck(event.id);
      }).rejects.toEqual(notFoundError("event not found"));
    });

    it("should throw a bad request error given a date in the past", async () => {
      const event = eventFactory({ date: faker.date.past() });

      jest.spyOn(eventRepository, "getById").mockResolvedValueOnce(event);

      await expect(async () => {
        await eventService.checkOrUncheck(event.id);
      }).rejects.toEqual(badRequestError("this event is in the past"));
    });

    it("should call the repository function with the expected params", async () => {
      const event = eventFactory();
      const expectedParams = [event.id, { checked: !event.checked }];

      jest.spyOn(eventRepository, "getById").mockResolvedValueOnce(event);
      const updateMock = jest
        .spyOn(eventRepository, "update")
        .mockResolvedValueOnce(null);

      await eventService.checkOrUncheck(event.id);
      expect(updateMock).toBeCalledWith(...expectedParams);
    });
  });
});
