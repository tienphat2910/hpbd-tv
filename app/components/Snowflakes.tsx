'use client';

import { useEffect } from 'react';

export default function Snowflakes() {
  useEffect(() => {
    const snowflakes: HTMLDivElement[] = [];
    const numberOfSnowflakes = 50;

    for (let i = 0; i < numberOfSnowflakes; i++) {
      const snowflake = document.createElement('div');
      snowflake.className = 'snowflake';
      snowflake.innerHTML = '❄';
      snowflake.style.left = Math.random() * 100 + '%';
      snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
      snowflake.style.opacity = (Math.random() * 0.5 + 0.3).toString();
      snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';
      snowflake.style.animationDelay = Math.random() * 2 + 's';
      
      document.body.appendChild(snowflake);
      snowflakes.push(snowflake);
    }

    return () => {
      snowflakes.forEach(flake => flake.remove());
    };
  }, []);

  return null;
}
