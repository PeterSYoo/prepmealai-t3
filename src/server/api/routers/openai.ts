import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { env } from "~/env.mjs";

type ChatCompletion = {
  id: string;
  object: "chat.completion";
  created: number;
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  choices: [
    {
      message: Record<string, unknown>;
      finish_reason: "stop";
      index: number;
    }
  ];
};

// Define the schema for the expected JSON format
const recipeSchema = z.array(
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
);

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

        try {
          const data: ChatCompletion =
            (await response.json()) as ChatCompletion;
          console.log(data);
          // Check if the data matches the expected format
          const parsedData = (await JSON.parse(
            data.choices[0].message.content as string
          )) as Record<string, unknown>;
          recipeSchema.parse(parsedData);
          return {
            success: true,
            message: "OpenAI generated a recipe in JSON format.",
            data,
          };
        } catch (error) {
          console.log(error);
          return {
            success: false,
            message:
              "OpenAI generated data that does not match the expected format.",
            data: null,
          };
        }
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

        const data = (await response.json()) as ChatCompletion;

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
