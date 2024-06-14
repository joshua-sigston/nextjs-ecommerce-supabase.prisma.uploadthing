/*
  Warnings:

  - You are about to drop the column `product` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "product",
ADD COLUMN     "products" TEXT[];

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "orders" INTEGER NOT NULL DEFAULT 0;
