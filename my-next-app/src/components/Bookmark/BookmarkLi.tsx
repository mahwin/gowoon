import React from "react";
import { Bookmark } from "@/types/bookmark";

import { FaRegEdit } from "react-icons/fa";
import { RxEnter } from "react-icons/rx";
type BookmarkLiProps = Bookmark;

const ICON_OPTIONS = { size: 20 };

export function BookmarkLi({ id, title, description, url }: BookmarkLiProps) {
  return (
    <li className="p-2 border-b-2" data-id={id}>
      <section>
        <div className="flex justify-between align-middle">
          <p>{url}</p>
          <div className="flex gap-12 cursor-pointer">
            <RxEnter {...ICON_OPTIONS} data-type={"enter"} />
            <FaRegEdit {...ICON_OPTIONS} data-type={"edit"} />
          </div>
        </div>
        <div className="flex gap-4">
          <h2 className="truncate w-[200px]">제목 : {title}</h2>
          <p className="text-base truncate w-full"> 설명 :{description}</p>
        </div>
      </section>
    </li>
  );
}
