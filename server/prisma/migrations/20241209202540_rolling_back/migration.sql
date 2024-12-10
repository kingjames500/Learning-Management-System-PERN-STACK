/*
  Warnings:

  - A unique constraint covering the columns `[userId,courseId]` on the table `CourseProgress` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `CourseProgress` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "CourseProgress_courseId_key";

-- AlterTable
ALTER TABLE "CourseProgress" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CourseProgress_userId_courseId_key" ON "CourseProgress"("userId", "courseId");

-- AddForeignKey
ALTER TABLE "CourseProgress" ADD CONSTRAINT "CourseProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
