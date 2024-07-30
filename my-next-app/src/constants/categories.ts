export const categories = ["book", "animation", "movie", "music"] as const;
export type Categories = (typeof categories)[number];

export const CATEGORY_CATEGORYID_MAPPER = {
  book: 1,
  animation: 2,
  movie: 3,
  music: 4,
  1: "book",
  2: "animation",
  3: "movie",
  4: "music",
} as const;
