-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `Image_property_Id_fkey`;

-- DropForeignKey
ALTER TABLE `reviews` DROP FOREIGN KEY `Reviews_property_Id_fkey`;

-- DropForeignKey
ALTER TABLE `reviews` DROP FOREIGN KEY `Reviews_user_Id_fkey`;

-- AddForeignKey
ALTER TABLE `Reviews` ADD CONSTRAINT `Reviews_user_Id_fkey` FOREIGN KEY (`user_Id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reviews` ADD CONSTRAINT `Reviews_property_Id_fkey` FOREIGN KEY (`property_Id`) REFERENCES `Property`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_property_Id_fkey` FOREIGN KEY (`property_Id`) REFERENCES `Property`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
