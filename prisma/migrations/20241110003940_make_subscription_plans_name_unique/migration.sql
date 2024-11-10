/*
  Warnings:

  - You are about to drop the column `name` on the `SubscriptionPlan` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[planName]` on the table `SubscriptionPlan` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `planName` to the `SubscriptionPlan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `SubscriptionPlan` DROP COLUMN `name`,
    ADD COLUMN `planName` VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `SubscriptionPlan_planName_key` ON `SubscriptionPlan`(`planName`);
