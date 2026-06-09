import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // These domains are allowed to serve images in <Image> components.
    // placedog.net and placekitten.com are used for placeholder photos in the gallery.
    // When you add your own photos to public/images/gallery/, you can remove these.
    remotePatterns: [
      { protocol: 'https', hostname: 'placedog.net' },
      { protocol: 'https', hostname: 'placekitten.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
};

export default nextConfig;
