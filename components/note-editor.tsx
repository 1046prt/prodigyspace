"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save, Tag, Pin, PinOff } from "lucide-react";
import type { Note } from "@/types/notes";
import "@/styles/note-editor.css";

interface NoteEditorProps {
  note?: Note;
  onSave: (noteData: Omit<Note, "id" | "createdAt" | "updatedAt">) => void;
  onCancel: () => void;
}

export function NoteEditor({ note, onSave, onCancel }: NoteEditorProps) {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [category, setCategory] = useState<Note["category"]>(
    note?.category || "personal"
  );
  const [tags, setTags] = useState<string[]>(note?.tags || []);
  const [newTag, setNewTag] = useState("");
  const [isPinned, setIsPinned] = useState(note?.isPinned || false);

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSave = () => {
    if (!title.trim()) return;

    onSave({
      title: title.trim(),
      content: content.trim(),
      category,
      tags,
      isPinned,
    });
  };

  return (
    <Card className="note-editor-card">
      <CardHeader className="card-header">
        <CardTitle>
          <span>{note ? "Edit Note" : "New Note"}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsPinned(!isPinned)}
            className={isPinned ? "pin-button-pinned" : "pin-button-unpinned"}
          >
            {isPinned ? (
              <Pin className="icon-sm" />
            ) : (
              <PinOff className="icon-sm" />
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="form-grid">
          <div className="space-y-2">
            <label className="form-label">Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title..."
            />
          </div>
          <div className="space-y-2">
            <label className="form-label">Category</label>
            <Select
              value={category}
              onValueChange={(value: Note["category"]) => setCategory(value)}
            >
              <SelectTrigger className="select-trigger">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lecture">Lecture</SelectItem>
                <SelectItem value="research">Research</SelectItem>
                <SelectItem value="personal">Personal</SelectItem>
                <SelectItem value="assignment">Assignment</SelectItem>
                <SelectItem value="meeting">Meeting</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="form-label">Content</label>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note here..."
            className="text-area"
          />
        </div>

        <div className="space-y-3">
          <label className="form-label">Tags</label>
          <div className="tags-container">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="tag-badge"
                onClick={() => handleRemoveTag(tag)}
              >
                {tag} ×
              </Badge>
            ))}
          </div>
          <div className="tag-input-container">
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add a tag..."
              onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
              className="tag-input"
            />
            <Button onClick={handleAddTag} variant="outline" size="sm">
              <Tag className="icon-sm" />
            </Button>
          </div>
        </div>

        <div className="button-group">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!title.trim()}>
            <Save className="icon-sm mr-2" />
            Save Note
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
