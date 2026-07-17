// Custom monoline pet icons matching the hand-drawn sketch aesthetic of
// design-reference/Pet Loft Mtl.dc.html. CatIcon reuses that file's inline
// SVG verbatim (its one portable, embedded icon); the others are new icons
// drawn in the same linework style to replace the lucide-react icons used
// for services elsewhere in the site.

import type { SVGProps } from 'react';

type IconProps = Omit<SVGProps<SVGSVGElement>, 'viewBox' | 'fill' | 'stroke'>;

function IconBase({ children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

// Dog Boarding
export function DogFaceIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path strokeWidth={4} d="M28 34 C14 30 8 44 14 58 C18 66 28 68 34 62" />
      <path strokeWidth={4} d="M72 34 C86 30 92 44 86 58 C82 66 72 68 66 62" />
      <path
        strokeWidth={4}
        d="M50 22 C68 22 78 36 78 52 C78 70 65 82 50 82 C35 82 22 70 22 52 C22 36 32 22 50 22 Z"
      />
      <circle cx="40" cy="50" r="3" fill="currentColor" stroke="none" />
      <circle cx="60" cy="50" r="3" fill="currentColor" stroke="none" />
      <path strokeWidth={3.4} d="M42 62 C46 66 54 66 58 62" />
      <ellipse cx="50" cy="58" rx="4" ry="3" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

// Dog Daycare
export function TerrierIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path strokeWidth={4} d="M32 30 L22 12 L40 24 Z" />
      <path strokeWidth={4} d="M68 30 L78 12 L60 24 Z" />
      <path
        strokeWidth={4}
        d="M50 24 C66 24 76 38 76 54 C76 70 64 80 50 80 C36 80 24 70 24 54 C24 38 34 24 50 24 Z"
      />
      <circle cx="40" cy="52" r="3" fill="currentColor" stroke="none" />
      <circle cx="60" cy="52" r="3" fill="currentColor" stroke="none" />
      <path strokeWidth={3} opacity={0.85} d="M36 66 C40 74 60 74 64 66" />
      <path strokeWidth={3} opacity={0.7} d="M40 70 C44 76 56 76 60 70" />
      <ellipse cx="50" cy="60" rx="4" ry="3" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

// Dog Walking
export function WalkingIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="66" cy="16" r="5" strokeWidth={3.4} />
      <path strokeWidth={3} d="M66 21 C70 28 68 36 62 40" />
      <path
        strokeWidth={4}
        d="M20 62 C18 54 24 48 32 48 C34 40 42 34 50 36 C54 30 62 30 66 36 C74 36 80 44 78 52 C84 54 86 62 80 66 C82 72 78 78 70 76 C68 82 58 84 54 78 C48 82 38 80 36 74 C28 76 20 70 20 62 Z"
      />
      <path strokeWidth={3.4} d="M30 74 L26 88" />
      <path strokeWidth={3.4} d="M44 78 L42 90" />
      <path strokeWidth={3.4} d="M64 78 L68 90" />
      <path strokeWidth={3.4} d="M74 70 L82 80" />
      <circle cx="66" cy="40" r="2.4" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

// Cat Boarding — verbatim from design-reference/Pet Loft Mtl.dc.html
export function CatIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path
        strokeWidth={4}
        d="M22 86 C10 78 8 62 18 50 C14 40 18 30 28 27 C24 20 28 12 35 14 C39 15 40 20 38 24 C44 20 52 20 57 25 C58 19 65 16 70 20 C73 24 71 30 66 33 C78 38 86 50 83 64 C81 76 68 86 52 87 C42 88 30 88 22 86 Z"
      />
      <path strokeWidth={3.4} opacity={0.85} d="M30 70 C36 73 42 71 48 74" />
      <path strokeWidth={3.4} opacity={0.85} d="M55 68 C61 71 67 69 73 72" />
      <path strokeWidth={3} opacity={0.7} d="M26 60 C31 63 36 61 41 64" />
      <circle cx="38" cy="45" r="2.6" fill="currentColor" stroke="none" />
      <circle cx="58" cy="43" r="2.6" fill="currentColor" stroke="none" />
      <path strokeWidth={3} d="M15 52 H4 M16 58 H5" />
      <path strokeWidth={3} d="M78 50 H89 M77 56 H88" />
    </IconBase>
  );
}
