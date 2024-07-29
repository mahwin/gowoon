import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { BookmarkUl } from "../../components/Bookmark/BookmarkUl";
import { categories, type Categories } from "../../constants/categories";

import { GetServerSideProps } from "next";

interface Props {
  category: Categories;
}

export default function CategoryBookmark({ category }: Props) {
  const router = useRouter();

  const { categoryName }: { categoryName?: Categories } = router.query;

  useEffect(() => {
    if (category) return;
    if (categoryName === undefined || !categories.includes(categoryName)) {
      router.push("/");
    }
  }, [categoryName]);

  return (
    <div className="bg-red-50">
      <BookmarkUl category={category || categoryName} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const { categoryName } = query as { categoryName?: Categories };
  if (
    categoryName === undefined ||
    categories.includes(categoryName) === false
  ) {
    return {
      redirect: {
        destination: "/",
        permanent: false, // 302 리다이렉트
      },
    };
  }

  return {
    props: {
      category: categoryName,
    },
  };
};
