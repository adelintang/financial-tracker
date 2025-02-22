/*
  Warnings:

  - You are about to drop the column `investmentTypeId` on the `investments` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `investments` table. All the data in the column will be lost.
  - You are about to drop the column `expriredIn` on the `otps` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `otps` table. All the data in the column will be lost.
  - You are about to drop the column `investmentGrowth` on the `reports` table. All the data in the column will be lost.
  - You are about to drop the column `totalExpense` on the `reports` table. All the data in the column will be lost.
  - You are about to drop the column `totalIncome` on the `reports` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `reports` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[number]` on the table `otps` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `investment_type_id` to the `investments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `investments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_expense` to the `reports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_income` to the `reports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `reports` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `investments` DROP FOREIGN KEY `investments_investmentTypeId_fkey`;

-- DropForeignKey
ALTER TABLE `investments` DROP FOREIGN KEY `investments_userId_fkey`;

-- DropForeignKey
ALTER TABLE `reports` DROP FOREIGN KEY `reports_userId_fkey`;

-- AlterTable
ALTER TABLE `investments` DROP COLUMN `investmentTypeId`,
    DROP COLUMN `userId`,
    ADD COLUMN `investment_type_id` INTEGER NOT NULL,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `otps` DROP COLUMN `expriredIn`,
    DROP COLUMN `isActive`,
    ADD COLUMN `exprired_in` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `is_active` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `reports` DROP COLUMN `investmentGrowth`,
    DROP COLUMN `totalExpense`,
    DROP COLUMN `totalIncome`,
    DROP COLUMN `userId`,
    ADD COLUMN `investment_growth` INTEGER NULL,
    ADD COLUMN `total_expense` INTEGER NOT NULL,
    ADD COLUMN `total_income` INTEGER NOT NULL,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `otps_number_key` ON `otps`(`number`);

-- AddForeignKey
ALTER TABLE `investments` ADD CONSTRAINT `investments_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `investments` ADD CONSTRAINT `investments_investment_type_id_fkey` FOREIGN KEY (`investment_type_id`) REFERENCES `investment_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reports` ADD CONSTRAINT `reports_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
