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
    <div className="bookmark-manager-container">
      <Card className="bookmark-manager">
        <CardHeader className="bookmark-header">
          <CardTitle className="bookmark-title-container">
            <Bookmark className="bookmark-icon" />
            <span>Bookmarks</span>
          </CardTitle>
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            size="sm"
            className="bookmark-add-button"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="bookmark-content">
          {showAddForm && (
            <div className="bookmark-form-container">
              <form onSubmit={handleSubmit} className="bookmark-form">
                <div className="bookmark-form-grid">
                  <div className="bookmark-form-group">
                    <Label htmlFor="title" className="bookmark-form-label">
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
                      className="bookmark-form-input"
                    />
                  </div>
                  <div className="bookmark-form-group">
                    <Label htmlFor="url" className="bookmark-form-label">
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
                      className="bookmark-form-input"
                    />
                  </div>
                  <div className="bookmark-form-group">
                    <Label htmlFor="category" className="bookmark-form-label">
                      Category
                    </Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData({ ...formData, category: value })
                      }
                    >
                      <SelectTrigger className="bookmark-form-select">
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
                </div>
                <div className="bookmark-button-group">
                  <Button type="submit" className="bookmark-submit-button">
                    {editingId ? "Update" : "Add"} Bookmark
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    className="bookmark-cancel-button"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          )}

          {allCategories.length > 0 && (
            <div className="bookmark-filter-container">
              <Label className="bookmark-form-label">Filter by Category</Label>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="bookmark-form-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {allCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      <span
                        className={`bookmark-category-pill category-${category}`}
                      >
                        {category}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="bookmark-list-container">
            {displayedBookmarks.length === 0 ? (
              <div className="bookmark-empty-state">
                <Bookmark className="bookmark-empty-icon" />
                <h3 className="bookmark-empty-title">No bookmarks yet</h3>
                <p className="bookmark-empty-description">
                  Add your first bookmark to get started!
                </p>
              </div>
            ) : (
              <div className="bookmark-list">
                {displayedBookmarks.map((bookmark) => (
                  <div key={bookmark.id} className="bookmark-item">
                    <div className="bookmark-item-content">
                      <div className="bookmark-item-header">
                        <h4 className="bookmark-item-title">
                          {bookmark.title}
                        </h4>
                        <span
                          className={`bookmark-category-badge category-${bookmark.category}`}
                        >
                          {bookmark.category}
                        </span>
                      </div>
                      <p className="bookmark-item-url">{bookmark.url}</p>
                    </div>
                    <div className="bookmark-item-actions">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(bookmark.url, "_blank")}
                        className="bookmark-action-button"
                        title="Open bookmark"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(bookmark)}
                        className="bookmark-action-button"
                        title="Edit bookmark"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeBookmark(bookmark.id)}
                        className="bookmark-action-button bookmark-delete-button"
                        title="Delete bookmark"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
