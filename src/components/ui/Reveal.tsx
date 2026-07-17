'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

// Wraps content in a fade+rise animation that triggers once the element
// scrolls into view. Mirrors the IntersectionObserver behaviour from
// design-reference/Pet Loft Mtl.dc.html, with a timeout fallback so content
// already above the fold (or if observers are unsupported) never stays stuck
// at opacity 0.
export default function Reveal({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Fallback timer covers browsers without IntersectionObserver and any
    // content that never intersects (e.g. already above the fold on load).
    const fallback = setTimeout(() => setVisible(true), 1200);

    let io: IntersectionObserver | undefined;
    try {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisible(true);
              io?.disconnect();
            }
          });
        },
        { threshold: 0.12 }
      );
      io.observe(node);
    } catch {
      // IntersectionObserver unsupported — the fallback timer above covers it.
    }

    return () => {
      io?.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div ref={ref} className={`reveal ${visible ? 'in' : ''} ${className}`}>
      {children}
    </div>
  );
}
