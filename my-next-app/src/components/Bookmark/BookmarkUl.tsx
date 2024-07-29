import React, { useEffect, useState } from "react";
import { MAX_ITEM_SIZE } from "../../constants/pagenation";
import { usePageNation } from "../../store";
import type { BookmarkResponse, Bookmark } from "@/types/bookmark";
import { BookmarkLi } from "./BookmarkLi";
import { Pagenation } from "./Pagenation";

async function fetchBookmark<T>(currentPage: number): Promise<T | Error> {
  try {
    const res = await fetch(
      `/api?size=${MAX_ITEM_SIZE}&currentPage=${currentPage}`
    );
    return res.json() as T;
  } catch (e) {
    return new Error("bookmark api 에러");
  }
}

export function BookmarkUl() {
  const { currentPage, setLastPage } = usePageNation();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>();

  useEffect(() => {
    (async () => {
      const res = await fetchBookmark<BookmarkResponse>(currentPage);
      console.log(res);
      if (!(res instanceof Error)) {
        setBookmarks(res.bookmarks);
        setLastPage(res.lastPage);
      }
    })();
  }, [currentPage]);
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
