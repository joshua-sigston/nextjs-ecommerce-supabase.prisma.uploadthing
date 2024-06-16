/*
  Warnings:

  - Added the required column `productPrice` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productQuantity` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_product_id_fkey";

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "productPrice" INTEGER NOT NULL,
ADD COLUMN     "productQuantity" INTEGER NOT NULL;
