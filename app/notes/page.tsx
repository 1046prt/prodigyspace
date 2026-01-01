"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import {
  FileText,
  Plus,
  Search,
  Filter,
  BookOpen,
  Pin,
  Trash2,
  Edit,
  Download,
  Upload,
  Camera,
} from "lucide-react";
import { useState } from "react";
import "@/styles/notes.css";

export default function NotesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Mock data - replace with actual data management
  const notes = [
    {
      id: 1,
      title: "Machine Learning Fundamentals",
      content:
        "Introduction to supervised and unsupervised learning algorithms...",
      category: "Computer Science",
      isPinned: true,
      createdAt: "2024-01-15",
      tags: ["ML", "AI", "Algorithms"],
    },
    {
      id: 2,
      title: "Calculus Notes - Chapter 3",
      content: "Derivatives and their applications in real-world problems...",
      category: "Mathematics",
      isPinned: false,
      createdAt: "2024-01-14",
      tags: ["Calculus", "Derivatives", "Math"],
    },
    {
      id: 3,
      title: "History Essay Draft",
      content: "The impact of the Industrial Revolution on society...",
      category: "History",
      isPinned: false,
      createdAt: "2024-01-13",
      tags: ["Essay", "Industrial Revolution"],
    },
  ];

  const scannedDocs = [
    {
      id: 1,
      title: "Physics Lab Report",
      type: "PDF",
      size: "2.4 MB",
      uploadedAt: "2024-01-15",
    },
    {
      id: 2,
      title: "Chemistry Formulas",
      type: "Image",
      size: "1.2 MB",
      uploadedAt: "2024-01-14",
    },
  ];

  const categories = [
    "all",
    "Computer Science",
    "Mathematics",
    "History",
    "Physics",
    "Chemistry",
  ];

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || note.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="notes">
      <div className="notes-container">
        {/* Header */}
        <div className="notes-header">
          <h1 className="notes-title">Notes & Documents</h1>
          <div className="flex gap-2">
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Note
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Note</DialogTitle>
                  <DialogDescription>
                    Add a new note to your collection
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Input placeholder="Note title..." />
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.slice(1).map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Textarea
                    placeholder="Start writing your note..."
                    className="min-h-[200px]"
                  />
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsAddDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={() => setIsAddDialogOpen(false)}>
                      Create Note
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="notes-search-container">
          <div className="notes-search-row">
            <div className="notes-search-input-container">
              <Search className="notes-search-icon" />
              <Input
                placeholder="Search notes and documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="notes-search-input"
              />
            </div>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="notes-filter-select">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="notes" className="notes-tabs">
          <TabsList className="notes-tabs-list">
            <TabsTrigger value="notes" className="notes-tab-trigger">
              <FileText className="h-4 w-4" />
              Notes ({notes.length})
            </TabsTrigger>
            <TabsTrigger value="documents" className="notes-tab-trigger">
              <BookOpen className="h-4 w-4" />
              Documents ({scannedDocs.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="notes" className="notes-tab-content">
            {filteredNotes.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No notes found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQuery || selectedCategory !== "all"
                      ? "Try adjusting your search or filters"
                      : "Create your first note to get started"}
                  </p>
                  <Button onClick={() => setIsAddDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Note
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredNotes.map((note) => (
                  <Card key={note.id} className="notes-card">
                    <CardHeader className="notes-card-header">
                      <div className="notes-card-title-row">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {note.isPinned && (
                              <Pin className="h-4 w-4 text-primary" />
                            )}
                            <CardTitle className="notes-card-title">
                              {note.title}
                            </CardTitle>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {note.category}
                          </Badge>
                        </div>
                        <div className="notes-card-actions">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                          >
                            <Trash2 className="h-3 w-3 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="notes-card-content">
                      <p className="notes-card-text">{note.content}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {note.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="notes-card-footer">
                        <p className="notes-card-date">
                          Created {note.createdAt}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="documents" className="notes-tab-content">
            {scannedDocs.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No documents yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Upload or scan documents to get started
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Button>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload File
                    </Button>
                    <Button variant="outline">
                      <Camera className="h-4 w-4 mr-2" />
                      Scan Document
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="notes-grid">
                {scannedDocs.map((doc) => (
                  <Card key={doc.id} className="notes-card">
                    <CardHeader className="notes-card-header">
                      <div className="notes-card-title-row">
                        <div className="flex-1">
                          <CardTitle className="notes-card-title">
                            {doc.title}
                          </CardTitle>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {doc.type}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {doc.size}
                            </span>
                          </div>
                        </div>
                        <div className="notes-card-actions">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                          >
                            <Download className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                          >
                            <Trash2 className="h-3 w-3 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="notes-card-content">
                      <div className="notes-card-footer">
                        <p className="notes-card-date">
                          Uploaded {doc.uploadedAt}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
