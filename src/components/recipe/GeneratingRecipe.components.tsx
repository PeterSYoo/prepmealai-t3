import { TypingText } from "./TypingText.components";

export const GeneratingRecipe = () => {
  return (
    <>
      <main className="flex h-screen w-screen items-center justify-center">
        <TypingText
          texts={[
            "Your recipe is in good hands with our trusty AI. It's hard at work making sure everything is just right!",
            "The AI is on a mission to gather all the ingredients you need for your delicious recipe!",
            "Don't worry, the AI hasn't forgotten about you! It's just putting the finishing touches on your recipe.",
            "The AI is cooking up something special just for you - sorry for the wait, but it'll be worth it!",
            "Hang tight while the AI does its thing. Your recipe is almost ready to go, and it's going to be amazing!",
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
