import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const recipeRouter = createTRPCRouter({
  postRecipe: protectedProcedure
    .input(
      z.object({
        name: z.string().default(""),
        dishType: z.string().default(""),
        proteinChoice: z.string().default(""),
        description: z.string().default(""),
        ingredients: z.array(z.string()).default([]),
        calories: z.string().default(""),
        protein: z.string().default(""),
        fat: z.string().default(""),
        carb: z.string().default(""),
        prepTime: z.string().default(""),
        cookingTime: z.string().default(""),
        instructions: z.array(z.string()).default([]),
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
            proteinChoice: input.proteinChoice,
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
  replaceRecipes: protectedProcedure
    .input(
      z.object({
        recipes: z.array(
          z.object({
            name: z.string(),
            dishType: z.string(),
            proteinChoice: z.string(),
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
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const user = ctx.session.user;

        // Delete all recipes related to user
        const deletedRecipes = await ctx.prisma.recipe.deleteMany({
          where: {
            userId: user.id,
          },
        });

        // If no recipes were deleted, return an error
        if (deletedRecipes.count === 0) {
          throw {
            success: false,
            code: "NO_RECIPES_DELETED",
            message: "No recipes were found for deletion.",
          };
        }

        // Create new recipes after deletion
        const newRecipes = [];

        for (const recipe of input.recipes) {
          const newRecipe = await ctx.prisma.recipe.create({
            data: {
              name: recipe.name,
              dishType: recipe.dishType,
              proteinChoice: recipe.proteinChoice,
              description: recipe.description,
              ingredients: recipe.ingredients,
              calories: recipe.calories,
              protein: recipe.protein,
              fat: recipe.fat,
              carb: recipe.carb,
              prepTime: recipe.prepTime,
              cookingTime: recipe.cookingTime,
              instructions: recipe.instructions,
              userId: user.id,
            },
          });

          newRecipes.push(newRecipe);
        }

        // Return success message
        return {
          success: true,
          message: "Recipes replaced succesfully.",
          newRecipes,
        };
      } catch (error) {
        console.log(error);
        throw {
          success: false,
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to replace recipes.",
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
          success: false,
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete recipe.",
        };
      }
    }),
});
