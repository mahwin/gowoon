export const categories = ["book", "animation", "movie", "music"] as const;
export type Categories = (typeof categories)[number];
