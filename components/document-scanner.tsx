"use client";

import type React from "react";

import { useState, useRef } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Camera, Upload, FileText, Trash2 } from "lucide-react";
import "@/styles/document-scanner.css";
import type { ScanDocument } from "@/types/notes";

interface DocumentScannerProps {
  onSave: (docData: Omit<ScanDocument, "id" | "createdAt">) => void;
  scannedDocs: ScanDocument[];
  onDelete: (id: string) => void;
}

export function DocumentScanner({
  onSave,
  scannedDocs,
  onDelete,
}: DocumentScannerProps) {
  const [docName, setDocName] = useState("");
  const [category, setCategory] = useState<ScanDocument["category"]>("notes");
  const [scannedPages, setScannedPages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newPages: string[] = [];
    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            newPages.push(e.target.result as string);
            if (newPages.length === files.length) {
              setScannedPages([...scannedPages, ...newPages]);
            }
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleSaveDocument = () => {
    if (!docName.trim() || scannedPages.length === 0) return;

    onSave({
      name: docName.trim(),
      pages: scannedPages,
      category,
    });

    // Reset form
    setDocName("");
    setScannedPages([]);
    setCategory("notes");
  };

  const removePage = (index: number) => {
    setScannedPages(scannedPages.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {/* Scanner Interface */}
      <Card className="document-scanner-card">
        <CardHeader className="document-scanner-header">
          <CardTitle className="document-scanner-title">
            <Camera className="scanner-icon h-5 w-5" />
              <Camera className="scanner-icon icon-md" />
            Document Scanner
          </CardTitle>
        </CardHeader>
        <CardContent className="document-scanner-content">
          <div className="document-form-grid">
            <div className="form-group">
              <label className="form-label">Document Name</label>
              <Input
                className="document-name-input"
                value={docName}
                onChange={(e) => setDocName(e.target.value)}
                placeholder="Enter document name..."
              />
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <Select
                value={category}
                onValueChange={(value: ScanDocument["category"]) =>
                  setCategory(value)
                }
              >
                <SelectTrigger className="category-select">
                  <div className="selected-category-wrapper">
                    <span className={`category-pill category-${category}`}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </span>
                  </div>
                </SelectTrigger>
                <SelectContent className="category-dropdown-content">
                  <div className="category-dropdown-label">Document Types</div>
                  <SelectItem
                    value="textbook"
                    className="category-dropdown-item"
                  >
                    <span className="category-pill category-textbook">
                      Textbook
                    </span>
                  </SelectItem>
                  <SelectItem
                    value="handout"
                    className="category-dropdown-item"
                  >
                    <span className="category-pill category-handout">
                      Handout
                    </span>
                  </SelectItem>
                  <SelectItem
                    value="assignment"
                    className="category-dropdown-item"
                  >
                    <span className="category-pill category-assignment">
                      Assignment
                    </span>
                  </SelectItem>
                  <SelectItem value="notes" className="category-dropdown-item">
                    <span className="category-pill category-notes">Notes</span>
                  </SelectItem>
                  <SelectItem value="other" className="category-dropdown-item">
                    <span className="category-pill category-other">Other</span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="upload-buttons">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="upload-button"
            >
              <Upload className="h-4 w-4" />
                <Upload className="icon-sm" />
              Upload Images
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />

            <button type="button" className="upload-button">
              <Camera className="h-4 w-4" />
                <Camera className="icon-sm" />
              Scan Document
            </button>
          </div>

          {scannedPages.length > 0 && (
            <div className="scanned-pages-container">
              <label className="scanned-pages-label">
                Scanned Pages ({scannedPages.length})
              </label>
              <div className="scanned-pages-grid">
                {scannedPages.map((page, index) => (
                  <div key={index} className="page-thumbnail">
                    <Image
                      src={page || "/placeholder.svg"}
                      alt={`Page ${index + 1}`}
                      width={96}
                      height={96}
                      className="thumbnail-image"
                    />
                    <button
                      type="button"
                      className="delete-button"
                      onClick={() => removePage(index)}
                    >
                      <Trash2 className="h-3 w-3" />
                        <Trash2 className="icon-xs" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleSaveDocument}
            disabled={!docName.trim() || scannedPages.length === 0}
            className="save-button"
          >
            <FileText className="h-4 w-4" />
              <FileText className="icon-sm" />
            Save Document
          </button>
        </CardContent>
      </Card>

      {/* Scanned Documents List */}
      <Card className="documents-card">
        <CardHeader className="documents-header">
          <CardTitle className="documents-title">
            Scanned Documents ({scannedDocs.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="documents-content">
          {scannedDocs.length === 0 ? (
            <p className="documents-empty">
              No scanned documents yet. Upload some images to get started!
            </p>
          ) : (
            <div className="documents-grid">
              {scannedDocs.map((doc) => (
                <div key={doc.id} className="document-card">
                  <div className="document-card-content">
                    <div className="document-header">
                      <h3 className="document-title">{doc.name}</h3>
                      <button
                        type="button"
                        onClick={() => onDelete(doc.id)}
                        className="document-delete"
                      >
                        <Trash2 className="h-4 w-4" />
                          <Trash2 className="icon-sm" />
                          <Trash2 className="icon-sm" />
                      </button>
                    </div>
                    <div className="document-meta">
                      <span
                        className={`document-category category-${doc.category}`}
                      >
                        {doc.category}
                      </span>
                      <span className="document-pages">
                        {doc.pages.length}{" "}
                        {doc.pages.length === 1 ? "page" : "pages"}
                      </span>
                    </div>
                    <p className="document-date">
                      {doc.createdAt.toLocaleDateString()}
                    </p>
                    {doc.pages.length > 0 && (
                      <div className="document-preview">
                        <Image
                          src={doc.pages[0] || "/placeholder.svg"}
                          alt="Document preview"
                          width={64}
                          height={64}
                          className="w-full h-80px object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
