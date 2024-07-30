import React, { useEffect, useState } from "react";
import { MAX_ITEM_SIZE } from "../../constants/pagenation";
import { usePageNation } from "../../store";
import type { BookmarkResponse, Bookmark } from "@/types/bookmark";
import type { Categories } from "../../constants/categories";

import { BookmarkLi } from "./BookmarkLi";
import { Pagenation } from "./Pagenation";

async function fetchBookmark<T>(
  currentPage: number,
  category?: Categories
): Promise<T | Error> {
  try {
    const res = await fetch(
      `/api?size=${MAX_ITEM_SIZE}&currentPage=${currentPage}&category=${category}`
    );
    return res.json() as T;
  } catch (e) {
    return new Error("bookmark api 에러");
  }
}

export function BookmarkUl({ category }: { category?: Categories }) {
  const { currentPage, setLastPage } = usePageNation();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>();

  useEffect(() => {
    (async () => {
      const res = await fetchBookmark<BookmarkResponse>(currentPage, category);
      if (!(res instanceof Error)) {
        setBookmarks(res.bookmarks);
        setLastPage(res.lastPage);
      }
    })();
  }, [currentPage, category]);
  return (
    <div>
      <ul>
        {bookmarks?.map((bookmark) => (
          <BookmarkLi key={bookmark.id} {...bookmark} />
        ))}
      </ul>
      <Pagenation />
    </div>
  );
}
