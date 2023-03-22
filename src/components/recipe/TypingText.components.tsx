import { useEffect, useState } from "react";

export const TypingText = ({ texts }: { texts: string[] }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);
  const [displayText, setDisplayText] = useState<string | undefined>("");

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setDisplayText(texts[currentTextIndex]?.slice(0, currentIndex + 1));
      currentIndex++;
      if (currentIndex === texts[currentTextIndex]?.length) {
        clearInterval(interval);
        setTimeout(() => {
          setCurrentTextIndex((currentTextIndex + 1) % texts.length);
        }, 2500);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [texts, currentTextIndex]);

  return (
    <section className="px-24">
      <p className="bg-black bg-clip-text pb-32 text-2xl font-bold">
        {displayText}
      </p>
    </section>
  );
};
