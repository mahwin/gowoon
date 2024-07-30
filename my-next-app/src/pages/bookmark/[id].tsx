import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Bookmark } from "../../types/bookmark";
import { CATEGORY_CATEGORYID_MAPPER } from "../../constants/categories";
import { GetServerSideProps } from "next";

import { BookmarkForm } from "../../components/Bookmark/BookmarkForm";

type Props = Bookmark;

export default function EditBookmarkPage({
  id,
  url,
  description,
  title,
  categoryId,
}: Props) {
  const router = useRouter();

  const { id: clientGetId } = router.query;

  const [bookmark, setBookmark] = useState<Bookmark>({
    id,
    url,
    description,
    title,
    categoryId,
  });

  useEffect(() => {
    if (clientGetId === undefined) {
      router.push("/");
    }
    if (bookmark.id === undefined) {
      fetch(`http://localhost:3000/api/bookmark/${id}`)
        .then((res) => res.json())
        .then((bookmark) => {
          setBookmark(bookmark);
        })
        .catch((err) => {
          alert(err);
          router.push("/");
        });
    }
  }, [router]);

  return (
    <BookmarkForm
      isEdit={true}
      initUrl={url}
      initTitle={title}
      initDescription={description}
      initCategory={CATEGORY_CATEGORYID_MAPPER[categoryId]}
      canChange={false}
    />
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query as { id?: string };

  const bookmarkRes = await fetch(`http://localhost:3000/api/bookmark/${id}`);

  if (bookmarkRes.status === 200) {
    const bookmark = (await bookmarkRes.json()) as Bookmark;

    return {
      props: {
        ...bookmark,
      },
    };
  }

  return {
    redirect: {
      destination: "/",
      permanent: false, // 302 리다이렉트
    },
  };
};
