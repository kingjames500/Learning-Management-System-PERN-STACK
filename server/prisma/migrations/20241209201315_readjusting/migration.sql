/*
  Warnings:

  - You are about to drop the column `userId` on the `CourseProgress` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[courseId]` on the table `CourseProgress` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "CourseProgress" DROP CONSTRAINT "CourseProgress_userId_fkey";

-- DropIndex
DROP INDEX "CourseProgress_userId_courseId_key";

-- AlterTable
ALTER TABLE "CourseProgress" DROP COLUMN "userId";

-- CreateIndex
CREATE UNIQUE INDEX "CourseProgress_courseId_key" ON "CourseProgress"("courseId");
