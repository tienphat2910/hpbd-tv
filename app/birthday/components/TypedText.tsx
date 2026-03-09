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
          'Chúc em có một ngày thật tuyệt vời',
          'Ngập tràn niềm vui và hạnh phúc.',
          'Hy vọng tuổi mới của em sẽ rực rỡ và thật đáng nhớ!'
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
