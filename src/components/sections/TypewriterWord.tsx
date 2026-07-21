import React, { useEffect, useState } from "react";

const words = ["vender más", "ahorrar tiempo", "crecer rápido"];

export default function TypewriterWord() {
  const [wordIndex, setWordIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    const speed = deleting ? 40 : 70;
    const pause = 1400;

    if (!deleting && charCount === current.length) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && charCount === 0) {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
      return;
    }

    const t = setTimeout(() => setCharCount((c) => c + (deleting ? -1 : 1)), speed);
    return () => clearTimeout(t);
  }, [charCount, deleting, wordIndex]);

  return (
    <span className="whitespace-nowrap">
      {words[wordIndex].slice(0, charCount)}
      <span className="text-primary-base">|</span>
    </span>
  );
}
