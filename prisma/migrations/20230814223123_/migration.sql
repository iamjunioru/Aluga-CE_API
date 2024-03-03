/*
  Warnings:

  - Added the required column `user_name` to the `Reviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `property` MODIFY `description` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `reviews` ADD COLUMN `user_name` VARCHAR(255) NOT NULL DEFAULT 'guest';

