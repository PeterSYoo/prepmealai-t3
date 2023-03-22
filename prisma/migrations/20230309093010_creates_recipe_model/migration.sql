-- CreateTable
CREATE TABLE "Recipe" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dishType" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ingredients" TEXT[],
    "protein" TEXT NOT NULL,
    "fats" TEXT NOT NULL,
    "carbs" TEXT NOT NULL,
    "prepTime" TEXT NOT NULL,
    "cookingTime" TEXT NOT NULL,
    "instructions" TEXT[],

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);
