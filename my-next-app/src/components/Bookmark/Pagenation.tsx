import { useState, useEffect, useCallback, MouseEvent } from "react";
import { usePageNation } from "../../store";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { PAGENATION_WITHIN_SIZE } from "@/constants/pagenation";

export function Pagenation() {
  const { currentPage, inc, dev, lastPage, setCurrentPage } = usePageNation();
  const [pages, setPages] = useState<number[]>([]);

  useEffect(() => {
    const newPages = [];

    for (
      let i = currentPage - PAGENATION_WITHIN_SIZE;
      i <= currentPage + PAGENATION_WITHIN_SIZE;
      i++
    ) {
      if (i > 0 && i <= lastPage) {
        newPages.push(i);
      }
    }
    setPages(newPages);
  }, [currentPage, lastPage, PAGENATION_WITHIN_SIZE]);

  const handleClickPageNumber = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      setCurrentPage(Number(e.currentTarget.dataset.page || 1));
    },
    [setCurrentPage]
  );

  return (
    <section className="flex justify-center items-center gap-4 h-[50px]">
      <button
        className={`disabled:opacity-50 disabled:cursor-not-allowed`}
        disabled={currentPage === 1}
        onClick={dev}
      >
        <FaArrowLeft />
      </button>
      {pages.map((page) => (
        <button
          onClick={handleClickPageNumber}
          key={page}
          data-page={page}
          className={`cursor-pointer
            ${page === currentPage ? "text-orange-600" : ""} p-2 rounded`}
        >
          {page}
        </button>
      ))}
      <button
        className={`disabled:opacity-50 disabled:cursor-not-allowed`}
        disabled={currentPage === lastPage}
        onClick={inc}
      >
        <FaArrowRight />
      </button>
    </section>
  );
}
