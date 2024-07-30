import React, { MouseEvent, useEffect, useState, useCallback } from "react";
import { MAX_ITEM_SIZE } from "../../constants/pagenation";
import { usePageNation } from "../../store";
import type { BookmarkResponse, Bookmark } from "@/types/bookmark";
import type { Categories } from "../../constants/categories";

import { getCustomAttributeByElement } from "../../utils";

import { path } from "../../routes/path";

import { BookmarkLi } from "./BookmarkLi";
import { Pagenation } from "./Pagenation";

import { useRouter } from "next/router";

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

  const router = useRouter();

  const handleClickUl = useCallback((e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    if (target.tagName !== "svg") return;

    const li = (e.target as Element).closest("li") as HTMLLIElement;
    const id = getCustomAttributeByElement(li, "id");
    const action = getCustomAttributeByElement(target, "type");
    if (id === null || action === null) return;

    if (action === "edit") {
      router.push(`${path.page.bookmarkEdit}${id}`);
    } else if (action === "enter") {
      router.push(`${path.page.bookmark}${id}`);
    }
  }, []);

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
      <ul onClick={handleClickUl}>
        {bookmarks?.map((bookmark) => (
          <BookmarkLi key={bookmark.id} {...bookmark} />
        ))}
      </ul>
      <Pagenation />
    </div>
  );
}
