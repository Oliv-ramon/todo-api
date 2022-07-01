/*
  Warnings:

  - The primary key for the `days` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `date` on the `days` table. All the data in the column will be lost.
  - You are about to drop the `DayTask` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id]` on the table `days` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "DayTask" DROP CONSTRAINT "DayTask_dayId_fkey";

-- DropForeignKey
ALTER TABLE "DayTask" DROP CONSTRAINT "DayTask_taskId_fkey";

-- DropForeignKey
ALTER TABLE "DayTask" DROP CONSTRAINT "DayTask_userId_fkey";

-- DropIndex
DROP INDEX "days_date_key";

-- AlterTable
ALTER TABLE "days" DROP CONSTRAINT "days_pkey",
DROP COLUMN "date",
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "days_id_seq";

-- DropTable
DROP TABLE "DayTask";

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "taskId" INTEGER NOT NULL,
    "weekDayId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "checked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "days_id_key" ON "days"("id");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_weekDayId_fkey" FOREIGN KEY ("weekDayId") REFERENCES "days"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
