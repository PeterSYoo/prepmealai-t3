import type { UniqueIdentifier } from "@dnd-kit/core";

export interface IRecipe {
  id?: string | UniqueIdentifier;
  name: string;
  dishType: string;
  proteinChoice: string;
  description: string;
  ingredients: string[];
  calories: string;
  protein: string;
  fat: string;
  carb: string;
  prepTime: string;
  cookingTime: string;
  instructions: string[];
  userId?: string;
}
