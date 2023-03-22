/*
  Warnings:

  - Added the required column `calories` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "calories" TEXT NOT NULL;
