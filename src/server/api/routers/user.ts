import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  postUser: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const newUser = await ctx.prisma.user.create({
          data: {
            email: input.email,
            password: input.password,
          },
        });

        return {
          success: true,
          message: "User created successfully",
          user: newUser,
        };
      } catch (error) {
        console.log(error);

        throw {
          code: "USER_CREATE_FAILED",
          message: "Failed to create user",
        };
      }
    }),
});
