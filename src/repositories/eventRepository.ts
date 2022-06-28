import { Prisma } from "@prisma/client";
import { prisma } from "../database.js";

export type EventCreateData = Prisma.Without<
  Prisma.EventCreateInput,
  Prisma.EventUncheckedCreateInput
> &
  Prisma.EventUncheckedCreateInput;

export type UpdateEventData = Prisma.EventUpdateInput;

function getById(id: number) {
  return prisma.event.findUnique({ where: { id } });
}

async function insertMany(
  events: EventCreateData[],
  client?: Prisma.TransactionClient
) {
  return (
    client.event.createMany({
      data: events,
    }) ||
    prisma.event.createMany({
      data: events,
    })
  );
}

async function update(id: number, eventUpdateData: UpdateEventData) {
  return prisma.event.update({
    where: { id },
    data: eventUpdateData,
  });
}

const eventRepository = {
  getById,
  insertMany,
  update,
};

export default eventRepository;
