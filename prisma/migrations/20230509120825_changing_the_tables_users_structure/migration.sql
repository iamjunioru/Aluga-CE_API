/*
  Warnings:

  - Added the required column `phone_number` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `phone_number` VARCHAR(191) NOT NULL;
