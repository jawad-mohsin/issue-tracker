/*
  Warnings:

  - You are about to drop the column `staus` on the `issue` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `issue` DROP COLUMN `staus`,
    ADD COLUMN `status` ENUM('OPEN', 'IN_PROGRESS', 'CLOSED') NOT NULL DEFAULT 'OPEN';
