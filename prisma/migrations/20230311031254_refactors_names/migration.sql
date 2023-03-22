/*
  Warnings:

  - You are about to drop the column `carbs` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `fats` on the `Recipe` table. All the data in the column will be lost.
  - Added the required column `carb` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fat` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "carbs",
DROP COLUMN "fats",
ADD COLUMN     "carb" TEXT NOT NULL,
ADD COLUMN     "fat" TEXT NOT NULL;
