import { TypingText } from "./TypingText.components";

export const GeneratingRecipe = () => {
  return (
    <>
      <main className="flex h-screen w-screen items-center justify-center">
        <TypingText
          texts={[
            "The AI is working on your recipe.",
            "It's gathering all the ingredients for you.",
            "Still generating...",
            "Sorry about the wait it's almost ready.",
            "It's just finalizing the ingredients, don't worry!",
          ]}
        />
      </main>
      <style jsx>{`
        @keyframes typing {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fade-out {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        .animate-fade-in {
          animation-name: fade-in;
          animation-duration: 0.5s;
          animation-fill-mode: forwards;
        }

        .animate-fade-out {
          animation-name: fade-out;
          animation-duration: 0.5s;
          animation-fill-mode: forwards;
        }
      `}</style>
    </>
  );
};
