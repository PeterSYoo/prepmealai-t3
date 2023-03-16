import { useEffect, useState } from "react";

export const TypingText = ({ texts }: { texts: string[] }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setDisplayText(texts[currentTextIndex].slice(0, currentIndex + 1));
      currentIndex++;
      if (currentIndex === texts[currentTextIndex].length) {
        clearInterval(interval);
        setIsFadingOut(true);
        setTimeout(() => {
          setCurrentTextIndex((currentTextIndex + 1) % texts.length);
          setIsFadingOut(false);
        }, 3500);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [texts, currentTextIndex]);

  return (
    <p
      className={`bg-black bg-clip-text pb-32 text-2xl font-bold text-transparent ${
        isFadingOut ? "animate-fade-out" : "animate-fade-in"
      }`}
    >
      {displayText}
    </p>
  );
};
