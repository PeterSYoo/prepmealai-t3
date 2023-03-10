import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { env } from "~/env.mjs";

console.log(env.OPENAI_API_KEY);

export const openaiRouter = createTRPCRouter({
  postOpenai: protectedProcedure
    .input(z.object({ content: z.string() }))
    .mutation(async ({ input }) => {
      try {
        const response = await fetch(
          "https://api.openai.com/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${env.OPENAI_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "gpt-3.5-turbo",
              messages: [
                {
                  role: "user",
                  content: input.content,
                },
              ],
            }),
          }
        );

        const data = await response.json();

        return {
          success: true,
          message: "OpenAI generated a recipe in JSON format.",
          data,
        };
      } catch (error) {
        console.log(error);
      }
    }),
  postDemo: protectedProcedure
    .input(z.object({ content: z.string() }))
    .mutation(async ({ input }) => {
      try {
        const response = await fetch(
          "https://api.openai.com/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${env.OPENAI_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "gpt-3.5-turbo",
              messages: [
                {
                  role: "user",
                  content: input.content,
                },
              ],
            }),
          }
        );

        const data = await response.json();

        return {
          success: true,
          message: "OpenAI generated demo object.",
          data,
        };
      } catch (error) {
        console.log(error);
      }
    }),
});
