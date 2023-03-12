import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const recipeRouter = createTRPCRouter({
  postRecipe: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        dishType: z.string(),
        description: z.string(),
        ingredients: z.array(z.string()),
        calories: z.string(),
        protein: z.string(),
        fat: z.string(),
        carb: z.string(),
        prepTime: z.string(),
        cookingTime: z.string(),
        instructions: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const user = ctx.session.user;
        // Create new recipe in recipe table

        const recipe = await ctx.prisma.recipe.create({
          data: {
            name: input.name,
            dishType: input.dishType,
            description: input.description,
            ingredients: input.ingredients,
            calories: input.calories,
            protein: input.protein,
            fat: input.fat,
            carb: input.carb,
            prepTime: input.prepTime,
            cookingTime: input.cookingTime,
            instructions: input.instructions,
            userId: user.id,
          },
        });

        // Return success message
        return {
          success: true,
          message: "Recipe saved succesfully to database.",
          recipe,
        };
      } catch (error) {
        console.log(error);
        throw {
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to save recipe to database.",
        };
      }
    }),
  getAllRecipes: protectedProcedure.query(async ({ ctx }) => {
    try {
      const user = ctx.session.user;

      const recipes = await ctx.prisma.recipe.findMany({
        where: {
          userId: user.id,
        },
      });

      if (!recipes) {
        throw {
          code: "NOT_FOUND",
          message: "No recipes to be found.",
        };
      }

      return {
        success: true,
        message: "Recipes fetched succesfully.",
        recipes,
      };
    } catch (error) {
      console.log(error);
      throw {
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch recipes.",
      };
    }
  }),
  testRecipe: protectedProcedure.query(({ ctx }) => {
    try {
      const user = ctx.session.user;

      return {
        success: true,
        message: `userId: ${user.id}`,
      };
    } catch (error) {
      console.log(error);
      throw {
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch.",
      };
    }
  }),
  deleteRecipe: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const recipe = await ctx.prisma.recipe.delete({
          where: { id: input.id },
        });

        // Return success message
        return {
          success: true,
          message: "Recipe deleted succesfully.",
          recipe,
        };
      } catch (error) {
        console.log(error);
        throw {
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete recipe.",
        };
      }
    }),
});
