/*
  Warnings:

  - You are about to drop the column `investment_growth` on the `reports` table. All the data in the column will be lost.
  - Added the required column `month` to the `reports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_investment` to the `reports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `reports` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `reports` DROP COLUMN `investment_growth`,
    ADD COLUMN `month` INTEGER NOT NULL,
    ADD COLUMN `total_investment` INTEGER NOT NULL,
    ADD COLUMN `year` INTEGER NOT NULL;
