/*
  Warnings:

  - You are about to drop the column `isAvailableForPurchase` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "isAvailableForPurchase",
ADD COLUMN     "isAvailable" BOOLEAN NOT NULL DEFAULT true;
