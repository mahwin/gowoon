import React from "react";
import { Bookmark } from "@/types/bookmark";

type BookmarkLiProps = Bookmark;

export function BookmarkLi({ title, description, url }: BookmarkLiProps) {
  return (
    <li className="p-2 border-2">
      <section>
        <a href="#none">{url}</a>
        <div className="flex gap-4">
          <h2 className="truncate w-[200px]">제목 : {title}</h2>
          <p className="text-base truncate w-full"> 설명 :{description}</p>
        </div>
      </section>
    </li>
  );
}
