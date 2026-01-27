import { StatCard, EmptyState } from "@/components/ui-elements";
("use client");

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useStickyNotes } from "@/hooks/use-sticky-notes";
import { StickyNote } from "@/components/sticky-note";
import type { NoteColor } from "@/types/note";
import { Plus, StickyNoteIcon, Palette, RotateCcw } from "lucide-react";
import "@/styles/sticky-note-board.css";

const colorOptions: { value: NoteColor; label: string; class: string }[] = [
  { value: "yellow", label: "Yellow", class: styles.yellow },
  { value: "blue", label: "Blue", class: styles.blue },
  { value: "green", label: "Green", class: styles.green },
  { value: "pink", label: "Pink", class: styles.pink },
  { value: "purple", label: "Purple", class: styles.purple },
  { value: "orange", label: "Orange", class: styles.orange },
];

export function StickyNotesBoard() {
  const {
    notes,
    loading,
    addNote,
    updateNote,
    deleteNote,
    moveNote,
    resizeNote,
    getNotesStats,
  } = useStickyNotes();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<NoteColor>("yellow");

  const stats = getNotesStats();

  const handleAddNote = () => {
    // Find a good position for the new note
    const baseX = 50 + ((notes.length * 20) % 300);
    const baseY = 50 + ((notes.length * 20) % 200);

    addNote({
      title: "",
      content: "",
      color: selectedColor,
      position: { x: baseX, y: baseY },
      size: { width: 250, height: 200 },
    });
    setIsAddDialogOpen(false);
  };

  const resetLayout = () => {
    notes.forEach((note, index) => {
      const x = 50 + (index % 4) * 270;
      const y = 50 + Math.floor(index / 4) * 220;
      moveNote(note.id, { x, y });
    });
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="boardContainer">
      {/* Header */}
      <div className="headerSection">
        <div className="headerText">
          <h2 className="title">Sticky Notes</h2>
          <p className="description">
            Quick notes and reminders for your thoughts
          </p>
        </div>
        <div className="headerActions">
          <Button
            onClick={resetLayout}
            variant="outline"
            size="sm"
            className="resetButton"
          >
            <RotateCcw className="iconSmall" />
            Reset Layout
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="addButton">
                <Plus className="iconSmall" />
                Add Note
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Sticky Note</DialogTitle>
                <DialogDescription>
                  Choose a color for your new note
                </DialogDescription>
              </DialogHeader>
              <div className="dialogContent">
                <div>
                  <label className="dialogLabel">Color</label>
                  <Select
                    value={selectedColor}
                    onValueChange={(value: NoteColor) =>
                      setSelectedColor(value)
                    }
                  >
                    <SelectTrigger className="wFull">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {colorOptions.map((color) => (
                        <SelectItem key={color.value} value={color.value}>
                          <div className="colorOption">
                            <div className="colorSwatch ${color.class}" />
                            {color.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleAddNote} className="createButton">
                  Create Note
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="statsGrid">
        <StatCard
          title="Total Notes"
          value={stats.total}
          description="Sticky notes created"
          icon={StickyNoteIcon}
        />
        <StatCard
          title="Color Distribution"
          value={""}
          description={
            <div className="colorDistribution">
              {colorOptions.map((color) => {
                const count = stats.colorBreakdown[color.value];
                if (count === 0) return null;
                return (
                  <Badge
                    key={color.value}
                    variant="outline"
                    className="colorBadge"
                  >
                    <div className={`colorDot ${color.class}`} />
                    {count}
                  </Badge>
                );
              })}
            </div>
          }
          icon={Palette}
        />
      </div>

      {/* Notes Board */}
      <Card className="notesBoard">
        <CardHeader className="boardHeader">
          <CardTitle>Notes Board</CardTitle>
          <CardDescription>
            Drag notes around to organize them. Click and drag from the corners
            to resize.
          </CardDescription>
        </CardHeader>
        <CardContent className="boardContent">
          {notes.length === 0 ? (
            <EmptyState
              icon={StickyNoteIcon}
              title="No notes yet"
              description="Create your first sticky note to start organizing your thoughts and reminders."
            />
          ) : (
            <div className="notesContainer">
              {notes.map((note) => (
                <StickyNote
                  key={note.id}
                  note={note}
                  onUpdate={updateNote}
                  onDelete={deleteNote}
                  onMove={moveNote}
                  onResize={resizeNote}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>How to Use Sticky Notes</CardTitle>
        </CardHeader>
        <CardContent className="instructionsCard">
          <div className="instructionsGrid">
            <div className="instructionItem">
              <div className="instructionNumber">1</div>
              <div className="instructionContent">
                <h4 className="instructionTitle">Create & Edit</h4>
                <p className="instructionDescription">
                  Add new notes and click the edit button to add content.
                </p>
              </div>
            </div>
            <div className="instructionItem">
              <div className="instructionNumber">2</div>
              <div className="instructionContent">
                <h4 className="instructionTitle">Drag & Drop</h4>
                <p className="instructionDescription">
                  Click and drag notes to move them around the board.
                </p>
              </div>
            </div>
            <div className="instructionItem">
              <div className="instructionNumber">3</div>
              <div className="instructionContent">
                <h4 className="instructionTitle">Resize</h4>
                <p className="instructionDescription">
                  Drag from the bottom-right corner to resize notes.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
