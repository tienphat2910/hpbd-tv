'use client';

import { useEffect, useRef } from 'react';
import Typed from 'typed.js';

interface TypedTextProps {
  name: string;
}

export default function TypedText({ name }: TypedTextProps) {
  const typedElement = useRef<HTMLSpanElement>(null);
  const typedInstance = useRef<Typed | null>(null);

  useEffect(() => {
    if (typedElement.current) {
      typedInstance.current = new Typed(typedElement.current, {
        strings: [
          `Happy Birthday <i>${name}</i>`,
          'Have a wonderful day',
          'Filled with joy and happiness.'
        ],
        typeSpeed: 30,
        backSpeed: 10,
        loop: true
      });
    }

    return () => {
      if (typedInstance.current) {
        typedInstance.current.destroy();
      }
    };
  }, [name]);

  return (
    <div className="text-center text-lg md:text-xl text-[#C4515C] my-4">
      <span ref={typedElement} className="whitespace-pre"></span>
    </div>
  );
}
