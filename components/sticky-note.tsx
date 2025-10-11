"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import type { StickyNote as StickyNoteType, NoteColor } from "@/types/note";
import { Trash2, Edit, GripVertical, Move } from "lucide-react";
import styles from "@/styles/sticky-note.css";

interface StickyNoteProps {
  note: StickyNoteType;
  onUpdate: (id: string, updates: Partial<StickyNoteType>) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, position: { x: number; y: number }) => void;
  onResize: (id: string, size: { width: number; height: number }) => void;
}

const noteColorClasses: Record<NoteColor, string> = {
  yellow: styles.yellow,
  blue: styles.blue,
  green: styles.green,
  pink: styles.pink,
  purple: styles.purple,
  orange: styles.orange,
};

export function StickyNote({
  note,
  onUpdate,
  onDelete,
  onMove,
  onResize,
}: StickyNoteProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editContent, setEditContent] = useState(note.content);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const noteRef = useRef<HTMLDivElement>(null);

  const handleSave = () => {
    onUpdate(note.id, {
      title: editTitle,
      content: editContent,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(note.title);
    setEditContent(note.content);
    setIsEditing(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (
      e.target === e.currentTarget ||
      (e.target as HTMLElement).classList.contains("drag-handle")
    ) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - note.position.x,
        y: e.clientY - note.position.y,
      });
    }
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: note.size.width,
      height: note.size.height,
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newX = Math.max(0, e.clientX - dragStart.x);
        const newY = Math.max(0, e.clientY - dragStart.y);
        onMove(note.id, { x: newX, y: newY });
      }

      if (isResizing) {
        const deltaX = e.clientX - resizeStart.x;
        const deltaY = e.clientY - resizeStart.y;
        const newWidth = Math.max(200, resizeStart.width + deltaX);
        const newHeight = Math.max(150, resizeStart.height + deltaY);
        onResize(note.id, { width: newWidth, height: newHeight });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    isDragging,
    isResizing,
    dragStart,
    resizeStart,
    note.id,
    onMove,
    onResize,
  ]);

  return (
    <Card
      ref={noteRef}
      className={`${styles.stickyNote} ${noteColorClasses[note.color]} ${
        isDragging ? styles.dragging : ""
      }`}
      style={{
        left: note.position.x,
        top: note.position.y,
        width: note.size.width,
        height: note.size.height,
        minWidth: 200,
        minHeight: 150,
      }}
      onMouseDown={handleMouseDown}
    >
      <div className={styles.noteContent}>
        {/* Header */}
        <div className={`${styles.header} drag-handle`}>
          <div className={styles.dragHandle}>
            <GripVertical className={styles.iconMedium} />
            <Move className={`${styles.iconSmall} ${styles.opacity50}`} />
          </div>
          <div className={styles.actionButtons}>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(!isEditing);
              }}
              className={styles.editButton}
            >
              <Edit className={styles.iconSmall} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(note.id);
              }}
              className={styles.deleteButton}
            >
              <Trash2 className={styles.iconSmall} />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className={styles.contentArea}>
          {isEditing ? (
            <>
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Note title..."
                className={styles.editTitleInput}
                onClick={(e) => e.stopPropagation()}
              />
              <Textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                placeholder="Write your note here..."
                className={styles.editContentTextarea}
                onClick={(e) => e.stopPropagation()}
              />
              <div className={styles.buttonGroup}>
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSave();
                  }}
                  className={styles.saveButton}
                >
                  Save
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCancel();
                  }}
                  className={styles.cancelButton}
                >
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className={styles.noteTitle}>
                {note.title || "Untitled Note"}
              </div>
              <div className={styles.noteText}>
                {note.content || "Click edit to add content..."}
              </div>
            </>
          )}
        </div>

        {/* Resize Handle */}
        <div
          className={styles.resizeHandle}
          onMouseDown={handleResizeMouseDown}
        >
          <div className={styles.resizeIndicator} />
        </div>
      </div>
    </Card>
  );
}
