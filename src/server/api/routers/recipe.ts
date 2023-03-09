import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const recipeRouter = createTRPCRouter({
  postRecipe: protectedProcedure
    .input(z.object({}))
    .mutation(async ({ ctx, input }) => {
      try {
      } catch (error) {
        console.log(error);
      }
    }),
  getAllRecipes: protectedProcedure.query(async ({ ctx }) => {
    try {
      const recipes = await ctx.prisma.recipe.findMany();

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
    }
  }),
});
