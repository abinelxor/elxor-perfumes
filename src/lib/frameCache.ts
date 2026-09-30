// Global frame cache and loader matching ELXOR frame sequence
export const FRAME_COUNT = 120;
export const TOTAL_FRAMES = FRAME_COUNT;

export const framePath = (i: number) =>
  `/frames/frame_${String(i + 1).padStart(3, "0")}.webp`;

export const getFrameUrl = (index: number) =>
  `/frames/frame_${String(index).padStart(3, "0")}.webp`;

// Generate sparse loading order so scrubbing works as early as possible
export const loadingOrder: number[] = [];
const seen = new Set<number>();
[12, 6, 3, 1].forEach((step) => {
  for (let i = 0; i < FRAME_COUNT; i += step) {
    if (!seen.has(i)) {
      seen.add(i);
      loadingOrder.push(i);
    }
  }
});

export const sparseCount = Math.ceil(FRAME_COUNT / 3);
export const sparseSet = new Set<number>(loadingOrder.slice(0, sparseCount));

export interface FrameStore {
  frames: (HTMLImageElement | null)[];
  loaded: Uint8Array;
  loadedCount: number;
  sparseLoaded: number;
  isSparseReady: boolean;
  isFullyLoaded: boolean;
  subscribers: Set<(ratio: number, index: number) => void>;
  started: boolean;
}

export const frameStore: FrameStore = {
  frames: new Array(FRAME_COUNT).fill(null),
  loaded: new Uint8Array(FRAME_COUNT),
  loadedCount: 0,
  sparseLoaded: 0,
  isSparseReady: false,
  isFullyLoaded: false,
  subscribers: new Set(),
  started: false,
};

export const frameCache = {
  get images() {
    return frameStore.frames;
  },
  get isFullyLoaded() {
    return frameStore.isFullyLoaded;
  },
  set isFullyLoaded(val: boolean) {
    frameStore.isFullyLoaded = val;
  },
  get loadedCount() {
    return frameStore.loadedCount;
  },
  set loadedCount(val: number) {
    frameStore.loadedCount = val;
  },
};

export function getNearestLoaded(targetIndex: number): number {
  const i = Math.max(0, Math.min(FRAME_COUNT - 1, targetIndex));
  if (frameStore.loaded[i]) return i;
  for (let d = 1; d < FRAME_COUNT; d++) {
    if (i - d >= 0 && frameStore.loaded[i - d]) return i - d;
    if (i + d < FRAME_COUNT && frameStore.loaded[i + d]) return i + d;
  }
  return -1;
}

export function startFrameLoading(
  onProgress?: (ratio: number, index: number) => void
) {
  if (onProgress) {
    frameStore.subscribers.add(onProgress);
    if (frameStore.loadedCount > 0) {
      onProgress(frameStore.loadedCount / FRAME_COUNT, 0);
    }
  }

  if (frameStore.started) return;
  frameStore.started = true;

  if (typeof window === "undefined") return;

  let cursor = 0;
  const PARALLEL = 8;

  const loadNext = () => {
    if (cursor >= loadingOrder.length) return;
    const i = loadingOrder[cursor++];
    const img = new Image();
    img.decoding = "async";

    const handleLoaded = () => {
      if (img.naturalWidth) {
        frameStore.frames[i] = img;
        frameStore.loaded[i] = 1;
      }
      frameStore.loadedCount++;
      if (sparseSet.has(i)) {
        frameStore.sparseLoaded++;
        if (frameStore.sparseLoaded >= sparseSet.size) {
          frameStore.isSparseReady = true;
        }
      }
      if (frameStore.loadedCount >= FRAME_COUNT) {
        frameStore.isFullyLoaded = true;
      }
      const ratio = frameStore.loadedCount / FRAME_COUNT;
      frameStore.subscribers.forEach((cb) => cb(ratio, i));
      loadNext();
    };

    img.onload = handleLoaded;
    img.onerror = handleLoaded;
    img.src = framePath(i);
  };

  for (let k = 0; k < PARALLEL; k++) {
    loadNext();
  }
}
