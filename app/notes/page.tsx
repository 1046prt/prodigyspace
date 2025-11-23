"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "@/styles/notes.css";
import "@/styles/note-editor.css";
import "@/styles/sticky-note.css";
import "@/styles/sticky-note-board.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NoteEditor } from "@/components/note-editor";
import { DocumentScanner } from "@/components/document-scanner";
import { useNotes } from "@/hooks/use-notes";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Pin,
  FileText,
  Camera,
} from "lucide-react";
import type { Note } from "@/types/notes";

export default function NotesPage() {
  const {
    notes,
    scannedDocs,
    addNote,
    updateNote,
    deleteNote,
    addScannedDoc,
    deleteScannedDoc,
  } = useNotes();
  const [showEditor, setShowEditor] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | undefined>();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const filteredNotes = notes
    .filter((note) => {
      const matchesSearch =
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesCategory =
        categoryFilter === "all" || note.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

  const handleSaveNote = (
    noteData: Omit<Note, "id" | "createdAt" | "updatedAt">
  ) => {
    if (editingNote) {
      updateNote(editingNote.id, noteData);
    } else {
      addNote(noteData);
    }
    setShowEditor(false);
    setEditingNote(undefined);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setShowEditor(true);
  };

  const handleCancelEdit = () => {
    setShowEditor(false);
    setEditingNote(undefined);
  };

  if (showEditor) {
    return (
      <div className="notes">
        <div className="notes-container">
          <NoteEditor
            note={editingNote}
            onSave={handleSaveNote}
            onCancel={handleCancelEdit}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="notes">
      <div className="notes-container">
        <div className="notes-header">
          <h1 className="notes-title">Notes & Documents</h1>
          <Button className="notes-new-btn" onClick={() => setShowEditor(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Note
          </Button>
        </div>

        <Tabs defaultValue="notes" className="notes-tabs">
          <TabsList className="notes-tabs-list notes-tabs-list-grid-2">
            <TabsTrigger value="notes" className="notes-tab-trigger">
              <FileText className="h-4 w-4" />
              Notes ({notes.length})
            </TabsTrigger>
            <TabsTrigger value="scanner" className="notes-tab-trigger">
              <Camera className="h-4 w-4" />
              Scanner ({scannedDocs.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="notes" className="notes-tab-content">
            {/* Search and Filter */}
            <div className="notes-search-container">
              <div className="notes-search-row">
                <div className="notes-search-input-container">
                  <Search className="notes-search-icon h-4 w-4" />
                  <Input
                    placeholder="Search notes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="notes-search-input"
                  />
                </div>
                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger className="notes-filter-select">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="lecture">Lecture</SelectItem>
                    <SelectItem value="research">Research</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="assignment">Assignment</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Notes Grid */}
            {filteredNotes.length === 0 ? (
              <div className="notes-empty">
                <div className="notes-empty-icon" />
                <h3 className="notes-empty-title">No notes found</h3>
                <p className="notes-empty-text">
                  {searchTerm || categoryFilter !== "all"
                    ? "Try adjusting your search or filter criteria."
                    : "Create your first note to get started!"}
                </p>
                <Button
                  className="notes-new-btn"
                  onClick={() => setShowEditor(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Note
                </Button>
              </div>
            ) : (
              <div className="notes-grid">
                {filteredNotes.map((note) => (
                  <div key={note.id} className="notes-card">
                    <div className="notes-card-header">
                      <div className="notes-card-title-row">
                        <div className="notes-card-title">
                          {note.isPinned && (
                            <Pin className="h-4 w-4 text-yellow-600 fill-yellow-600" />
                          )}
                          <span className="truncate">{note.title}</span>
                        </div>
                        <div className="notes-card-actions">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEditNote(note)}
                            className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteNote(note.id)}
                            className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Badge variant="outline" className="w-fit">
                        {note.category}
                      </Badge>
                    </div>
                    <div className="notes-card-content">
                      <p className="notes-card-text">
                        {note.content || "No content"}
                      </p>
                      {note.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {note.tags.slice(0, 3).map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs font-normal"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {note.tags.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{note.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}
                      <div className="notes-card-footer">
                        <span className="notes-card-date">
                          {new Date(note.updatedAt).toLocaleDateString(
                            undefined,
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="scanner" className="notes-tab-content">
            <DocumentScanner
              onSave={addScannedDoc}
              scannedDocs={scannedDocs}
              onDelete={deleteScannedDoc}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
