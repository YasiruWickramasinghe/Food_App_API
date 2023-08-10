/*
  Warnings:

  - You are about to drop the column `food_name` on the `foods` table. All the data in the column will be lost.
  - Added the required column `foodName` to the `foods` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `foods` DROP COLUMN `food_name`,
    ADD COLUMN `foodName` VARCHAR(191) NOT NULL;
