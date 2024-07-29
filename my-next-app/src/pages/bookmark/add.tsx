import React, { useState, useCallback } from "react";
import { useInput } from "../../hooks/useInput";
import { Categories, categories } from "../../constants/categories";

import { z } from "zod";

const bookmarkSchema = z.object({
  url: z.string().url("url 형식이 아닙니다. 'http://'를 포함해주세요."),
  title: z.string().max(30, "title은 30자 이내로 입력해주세요."),
  description: z.string().max(100, "description은 100자 이내로 입력해주세요."),
});

export default function BookmarkAdd() {
  const { value: url, handleChange: handleUrlChange } = useInput();
  const { value: title, handleChange: handleTitleChange } = useInput();
  const { value: description, handleChange: handleDescriptionChange } =
    useInput();

  const resetForm = useCallback(() => {
    handleUrlChange({ currentTarget: { value: "" } } as any);
    handleTitleChange({ currentTarget: { value: "" } } as any);
    handleDescriptionChange({ currentTarget: { value: "" } } as any);
  }, []);

  const [selectedCategory, setSelectedCategory] = useState<Categories>(
    categories[0]
  );

  const [isLoading, setIsLoading] = useState(false);

  const handleSelectChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedCategory(event.target.value as Categories);
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;

    try {
      const bookmark = bookmarkSchema.parse({ url, title, description });

      console.log(bookmark);
      setIsLoading(true);
      const res = await fetch("/api/bookmark", {
        method: "POST",
        body: JSON.stringify({ ...bookmark, category: selectedCategory }),
      });
      if (res.status === 201) {
        alert("북마크가 추가되었습니다.");

        resetForm();
      }
      if (res.status === 401) {
        alert("url이 중복 됐습니다.");
      }
    } catch (e) {
      if (e instanceof z.ZodError) {
        alert(e.errors.map((error) => error.message).join("\n"));
        return;
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="bg-red-400 flex flex-col p-2" onSubmit={handleSubmit}>
      <div className="flex gap-6">
        <div className="w-[300px]">
          <label htmlFor="url">url :</label>
          <input
            className="w-full bg-gray-700 dark:bg-white"
            id="url"
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <div className="w-full">
          <label htmlFor="title">title :</label>
          <input
            className="w-full bg-gray-700 dark:bg-white"
            id="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
      </div>
      <div>
        <label htmlFor="category">category : </label>
        <select
          onChange={handleSelectChange}
          id="category"
          className="bg-gray-700 dark:bg-white"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="h-full ">
        <label htmlFor="description">description :</label>
        <textarea
          className="w-full h-[300px] bg-gray-700 dark:bg-white"
          id="description"
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>
      <div className="w-full flex justify-center align-middle">
        <button type="submit">
          {isLoading ? "...saving" : "Save Bookmark"}
        </button>
      </div>
    </form>
  );
}
