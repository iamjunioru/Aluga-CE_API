/*
  Warnings:

  - Made the column `has_wifi` on table `property` required. This step will fail if there are existing NULL values in that column.
  - Made the column `has_tv` on table `property` required. This step will fail if there are existing NULL values in that column.
  - Made the column `has_air_conditioning` on table `property` required. This step will fail if there are existing NULL values in that column.
  - Made the column `has_washing_machine` on table `property` required. This step will fail if there are existing NULL values in that column.
  - Made the column `has_kitchen` on table `property` required. This step will fail if there are existing NULL values in that column.
  - Made the column `has_suite` on table `property` required. This step will fail if there are existing NULL values in that column.
  - Made the column `has_parking_space` on table `property` required. This step will fail if there are existing NULL values in that column.
  - Made the column `has_pool` on table `property` required. This step will fail if there are existing NULL values in that column.
  - Made the column `has_beach_view` on table `property` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `property` MODIFY `has_wifi` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `has_tv` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `has_air_conditioning` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `has_washing_machine` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `has_kitchen` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `has_suite` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `has_parking_space` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `has_pool` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `has_beach_view` BOOLEAN NOT NULL DEFAULT false;
