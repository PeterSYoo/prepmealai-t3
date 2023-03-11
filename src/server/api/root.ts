import { createTRPCRouter } from "~/server/api/trpc";
import { openaiRouter } from "./routers/openai";
import { recipeRouter } from "./routers/recipe";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  openai: openaiRouter,
  recipe: recipeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
