import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import bcrypt from "bcrypt";

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
        const exists = await ctx.prisma.user.findFirst({
          where: { email: input.email },
        });

        if (exists) {
          throw {
            code: "CONFLICT",
            message: "User already exists.",
          };
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(input.password, saltRounds);

        const newUser = await ctx.prisma.user.create({
          data: {
            email: input.email,
            password: hashedPassword,
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
          success: false,
          code: "USER_CREATE_FAILED",
          message: "Failed to create user",
        };
      }
    }),
});
