-- AlterTable
ALTER TABLE `user` ADD COLUMN `has_property` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `Reviews` (
    `id` VARCHAR(191) NOT NULL,
    `rating` INTEGER NOT NULL,
    `comment` VARCHAR(191) NOT NULL,
    `user_Id` VARCHAR(191) NOT NULL,
    `property_Id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Property` (
    `id` VARCHAR(191) NOT NULL,
    `inscription_number` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `rent_price` VARCHAR(191) NOT NULL,
    `cep` VARCHAR(191) NOT NULL,
    `neighborhood` VARCHAR(191) NOT NULL,
    `street_name` VARCHAR(191) NOT NULL,
    `street_number` VARCHAR(191) NOT NULL,
    `total_occupancy` INTEGER NOT NULL,
    `total_bedrooms` INTEGER NOT NULL,
    `total_bathrooms` INTEGER NOT NULL,
    `has_wifi` BOOLEAN NULL,
    `has_tv` BOOLEAN NULL,
    `has_air_conditioning` BOOLEAN NULL,
    `has_washing_machine` BOOLEAN NULL,
    `has_kitchen` BOOLEAN NULL,
    `has_suite` BOOLEAN NULL,
    `has_parking_space` BOOLEAN NULL,
    `has_pool` BOOLEAN NULL,
    `has_beach_view` BOOLEAN NULL,
    `user_Id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Property_inscription_number_key`(`inscription_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Image` (
    `id` VARCHAR(191) NOT NULL,
    `path` VARCHAR(191) NOT NULL,
    `property_Id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Reviews` ADD CONSTRAINT `Reviews_user_Id_fkey` FOREIGN KEY (`user_Id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reviews` ADD CONSTRAINT `Reviews_property_Id_fkey` FOREIGN KEY (`property_Id`) REFERENCES `Property`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Property` ADD CONSTRAINT `Property_user_Id_fkey` FOREIGN KEY (`user_Id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_property_Id_fkey` FOREIGN KEY (`property_Id`) REFERENCES `Property`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
