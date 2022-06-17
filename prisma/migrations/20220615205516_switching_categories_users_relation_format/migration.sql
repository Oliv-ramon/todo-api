/*
  Warnings:

  - You are about to drop the `categoriesUsers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "categoriesUsers" DROP CONSTRAINT "categoriesUsers_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "categoriesUsers" DROP CONSTRAINT "categoriesUsers_userId_fkey";

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "categoriesUsers";

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
