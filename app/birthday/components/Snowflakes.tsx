'use client';

import { useEffect } from 'react';

export default function Snowflakes() {
  useEffect(() => {
    // Dynamically import Snowflakes library
    import('magic-snowflakes').then((module) => {
      const Snowflakes = module.default;
      const snowflakes = new Snowflakes({
        color: '#ffffff',
        count: 50,
        minSize: 8,
        maxSize: 18,
        speed: 1,
        wind: true,
        rotation: true,
        zIndex: 9999
      });

      return () => {
        snowflakes.destroy();
      };
    });
  }, []);

  return null;
}
