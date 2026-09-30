// Global shared memory cache for the 120-frame WebP animation sequence
export const TOTAL_FRAMES = 120;

export const frameCache: {
  images: (HTMLImageElement | null)[];
  isFullyLoaded: boolean;
  loadedCount: number;
} = {
  images: new Array(TOTAL_FRAMES + 1).fill(null),
  isFullyLoaded: false,
  loadedCount: 0,
};

export const getFrameUrl = (index: number) => {
  const padded = String(index).padStart(3, "0");
  return `/frames/frame_${padded}.webp`;
};
