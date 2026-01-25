"use client";

import { useProdigyStorage, dateTransformers } from "@/lib/storage";
import type { Bookmark } from "@/types/utilities";

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useProdigyStorage<Bookmark[]>(
    "bookmarks",
    [],
    dateTransformers,
  );

  const addBookmark = (title: string, url: string, category: string) => {
    const bookmark: Bookmark = {
      id: Date.now().toString(),
      title,
      url: url.startsWith("http") ? url : `https://${url}`,
      category,
      createdAt: new Date(),
    };
    setBookmarks([...bookmarks, bookmark]);
  };

  const removeBookmark = (id: string) => {
    setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== id));
  };

  const updateBookmark = (id: string, updates: Partial<Bookmark>) => {
    setBookmarks(
      bookmarks.map((bookmark) =>
        bookmark.id === id ? { ...bookmark, ...updates } : bookmark,
      ),
    );
  };

  const getBookmarksByCategory = (category: string) => {
    return bookmarks.filter((bookmark) => bookmark.category === category);
  };

  const getCategories = () => {
    const categories = [
      ...new Set(bookmarks.map((bookmark) => bookmark.category)),
    ];
    return categories.sort();
  };

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    updateBookmark,
    getBookmarksByCategory,
    getCategories,
  };
}
