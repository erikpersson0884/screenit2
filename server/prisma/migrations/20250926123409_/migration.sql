/*
  Warnings:

  - You are about to drop the column `filePath` on the `Event` table. All the data in the column will be lost.
  - Added the required column `imagePath` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Event" DROP COLUMN "filePath",
ADD COLUMN     "imagePath" TEXT NOT NULL;
