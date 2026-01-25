"use client";

import { useProdigyStorage, dateTransformers } from "@/lib/storage";
import type { Note, ScanDocument } from "@/types/notes";

export function useNotes() {
  const [notes, setNotes] = useProdigyStorage<Note[]>(
    "notes",
    [],
    dateTransformers,
  );

  const [scannedDocs, setScannedDocs] = useProdigyStorage<ScanDocument[]>(
    "scanned-docs",
    [],
    dateTransformers,
  );

  const addNote = (noteData: Omit<Note, "id" | "createdAt" | "updatedAt">) => {
    const newNote: Note = {
      ...noteData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setNotes([...notes, newNote]);
  };

  const updateNote = (id: string, updates: Partial<Note>) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, ...updates, updatedAt: new Date() } : note,
    );
    setNotes(updatedNotes);
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const addScannedDoc = (docData: Omit<ScanDocument, "id" | "createdAt">) => {
    const newDoc: ScanDocument = {
      ...docData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setScannedDocs([...scannedDocs, newDoc]);
  };

  const deleteScannedDoc = (id: string) => {
    setScannedDocs(scannedDocs.filter((doc) => doc.id !== id));
  };

  return {
    notes,
    scannedDocs,
    addNote,
    updateNote,
    deleteNote,
    addScannedDoc,
    deleteScannedDoc,
  };
}
