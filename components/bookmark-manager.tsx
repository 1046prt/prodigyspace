"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bookmark, Plus, ExternalLink, Trash2, Edit } from "lucide-react";
import { useBookmarks } from "@/hooks/use-bookmarks";
import "@/styles/bookmark-manager.css";

export function BookmarkManager() {
  const {
    bookmarks,
    addBookmark,
    removeBookmark,
    updateBookmark,
    getBookmarksByCategory,
    getCategories,
  } = useBookmarks();

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    category: "Study",
  });

  const categories = ["Study", "Research", "Tools", "Entertainment", "Other"];
  const allCategories = getCategories();
  const displayedBookmarks =
    selectedCategory === "all"
      ? bookmarks
      : getBookmarksByCategory(selectedCategory);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.url) {
      if (editingId) {
        updateBookmark(editingId, formData);
        setEditingId(null);
      } else {
        addBookmark(formData.title, formData.url, formData.category);
      }
      setFormData({ title: "", url: "", category: "Study" });
      setShowAddForm(false);
    }
  };

  const handleEdit = (bookmark: {
    id: string;
    title: string;
    url: string;
    category: string;
  }) => {
    setFormData({
      title: bookmark.title,
      url: bookmark.url,
      category: bookmark.category,
    });
    setEditingId(bookmark.id);
    setShowAddForm(true);
  };

  const handleCancel = () => {
    setFormData({ title: "", url: "", category: "Study" });
    setEditingId(null);
    setShowAddForm(false);
  };

  return (
    <Card className="bookmarkManager">
      <CardHeader className="header">
        <CardTitle className="titleContainer">
          <Bookmark className="icon text-purple-500" />
          Bookmarks
        </CardTitle>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          size="sm"
          className="addButton"
        >
          <Plus className="icon" />
        </Button>
      </CardHeader>
      <CardContent className="content">
        {showAddForm && (
          <form onSubmit={handleSubmit} className="addForm">
            <div className="formGroup">
              <Label htmlFor="title" className="formLabel">
                Title
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Enter bookmark title"
                required
                className="formInput"
              />
            </div>
            <div className="formGroup">
              <Label htmlFor="url" className="formLabel">
                URL
              </Label>
              <Input
                id="url"
                value={formData.url}
                onChange={(e) =>
                  setFormData({ ...formData, url: e.target.value })
                }
                placeholder="https://example.com"
                required
                className="formInput"
              />
            </div>
            <div className="formGroup">
              <Label htmlFor="category" className="formLabel">
                Category
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger className="formSelect">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="buttonGroup">
              <Button type="submit">
                {editingId ? "Update" : "Add"} Bookmark
              </Button>
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </form>
        )}

        {allCategories.length > 0 && (
          <div className="formGroup categoryFilterContainer">
            <Label className="formLabel">Filter by Category</Label>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="formSelect">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {allCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    <span className={`category-pill category-${category}`}>
                      {category}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="bookmarkListContainer">
          {displayedBookmarks.length === 0 ? (
            <div className="emptyState">
              No bookmarks yet. Add your first bookmark!
            </div>
          ) : (
            displayedBookmarks.map((bookmark) => (
              <div key={bookmark.id} className="bookmarkItem">
                <div className="bookmarkInfo">
                  <div className="bookmarkTitle">{bookmark.title}</div>
                  <div className="bookmarkUrl">{bookmark.url}</div>
                  <div
                    className={`bookmarkCategory category-${bookmark.category}`}
                  >
                    {bookmark.category}
                  </div>
                </div>
                <div className="actionButtons">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(bookmark.url, "_blank")}
                    className="actionButton"
                  >
                    <ExternalLink className="icon" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(bookmark)}
                    className="actionButton"
                  >
                    <Edit className="icon" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeBookmark(bookmark.id)}
                    className="actionButton"
                  >
                    <Trash2 className="icon" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
