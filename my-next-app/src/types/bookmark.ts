export type Bookmark = {
  id: number;
  url: string;
  title: string;
  description: string;
  categoryId: number;
};

export type BookmarkResponse = {
  bookmarks: Bookmark[];
  lastPage: number;
};
