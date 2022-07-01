/*
  Warnings:

  - You are about to drop the column `name` on the `days` table. All the data in the column will be lost.
  - You are about to drop the column `checked` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the `_DayToTask` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `date` to the `days` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_DayToTask" DROP CONSTRAINT "_DayToTask_A_fkey";

-- DropForeignKey
ALTER TABLE "_DayToTask" DROP CONSTRAINT "_DayToTask_B_fkey";

-- AlterTable
ALTER TABLE "days" DROP COLUMN "name",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "checked";

-- DropTable
DROP TABLE "_DayToTask";

-- CreateTable
CREATE TABLE "DayTask" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "dayId" INTEGER NOT NULL,
    "taskId" INTEGER NOT NULL,
    "checked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "DayTask_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DayTask" ADD CONSTRAINT "DayTask_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DayTask" ADD CONSTRAINT "DayTask_dayId_fkey" FOREIGN KEY ("dayId") REFERENCES "days"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DayTask" ADD CONSTRAINT "DayTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
