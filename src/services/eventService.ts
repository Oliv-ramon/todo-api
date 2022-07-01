import dayjs from "dayjs";
import eventRepository from "../repositories/eventRepository.js";
import { badRequestError, notFoundError } from "../utils/errorUtils.js";
import { formatDate } from "../utils/taskServiceUtils.js";

async function checkOrUncheck(eventId: number) {
  const event = await validateExistense(eventId);

  validateDate(event.date);

  return eventRepository.update(event.id, { checked: !event.checked });
}

async function validateExistense(eventId: number) {
  const event = await eventRepository.getById(eventId);

  if (!event) {
    throw notFoundError("event not found");
  }

  return event;
}

function validateDate(date: Date) {
  const today = formatDate(dayjs().toISOString());
  const isValidDate = dayjs(date).isAfter(today);

  if (!isValidDate) {
    throw badRequestError("this event is in the past");
  }
}

const eventService = {
  checkOrUncheck,
};

export default eventService;
