import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const recipeRouter = createTRPCRouter({
  postRecipe: protectedProcedure
    .input(
      z.object({
        // name: z.string(),
        // dishType: z.string(),
        // description: z.string(),
        // ingredients: z.array(z.string()),
        // protein: z.string(),
        // fat: z.string(),
        // carb: z.string(),
        // prepTime: z.string(),
        // cookingTime: z.string(),
        // instructions: z.array(z.record(z.string())),
        // userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const user = ctx.session.user;
        // Create new recipe in recipe table

        const recipe = await ctx.prisma.recipe.create({
          data: {
            name: "Example Recipe",
            dishType: "Main Course",
            description: "This is an example recipe.",
            ingredients: ["ingredient1", "ingredient2", "ingredient3"],
            protein: "10g",
            fat: "5g",
            carb: "15g",
            prepTime: "10 minutes",
            cookingTime: "30 minutes",
            instructions: ["step 1", "step 2", "step 3"],
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
});
