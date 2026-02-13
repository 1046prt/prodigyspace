"use client";

import React, { useState, useRef } from "react";
import QRCode from "qrcode";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Download, ImageIcon, Link as LinkIcon } from "lucide-react";
import "@/styles/qr-generator.css";

export function QrGenerator() {
  const [mode, setMode] = useState<"text" | "image">("text");
  const [inputValue, setInputValue] = useState("");
  const [size, setSize] = useState(300);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const generateQr = async () => {
    setError(null);
    if (!inputValue) {
      setError("Please enter text or provide an image.");
      return;
    }

    try {
      // limit size for large embedded images
      if (mode === "image" && inputValue.startsWith("data:") && inputValue.length > 1000000) {
        setError("Image is large — consider using a hosted image URL instead.");
        return;
      }

      const dataUrl = await QRCode.toDataURL(inputValue, {
        width: size,
        margin: 2,
      });
      setQrDataUrl(dataUrl);
    } catch {
      setError("Failed to generate QR code. Try shorter text or a smaller image.");
    }
  };

  const handleFile = (file?: File) => {
    setError(null);
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // set the input to data URL so we can encode it into the QR
      setInputValue(result);
      setMode("image");
    };
    reader.onerror = () => setError("Failed to read file.");
    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = "qr-code.png";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <Card className="qr-generator-card">
      <CardHeader>
        <CardTitle className="qr-title">QR Code Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="qr-grid">
          <div className="qr-controls">
            <div className="qr-mode">
              <label className="qr-mode-option">
                <input
                  type="radio"
                  name="mode"
                  checked={mode === "text"}
                  onChange={() => setMode("text")}
                />
                Text / URL
              </label>
              <label className="qr-mode-option">
                <input
                  type="radio"
                  name="mode"
                  checked={mode === "image"}
                  onChange={() => setMode("image")}
                />
                Image (embed)
              </label>
            </div>

            <div className="input-group">
              <Label className="input-label">Enter text or URL</Label>
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={
                  mode === "text"
                    ? "https://example.com or any text"
                    : "Upload an image to embed"
                }
                className="qr-input"
              />
            </div>

            <div className="file-upload">
              <Label className="input-label">Or upload image</Label>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
            </div>

            <div className="size-row">
              <Label className="input-label">Size</Label>
              <input
                type="range"
                min={128}
                max={1024}
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
              />
              <div className="size-value">{size}px</div>
            </div>

            <div className="actions">
              <Button onClick={generateQr}>Generate</Button>
              <Button variant="outline" onClick={() => { setInputValue(""); setQrDataUrl(null); setError(null); }}>
                Clear
              </Button>
              <Button variant="ghost" onClick={handleDownload} disabled={!qrDataUrl}>
                <Download className="h-4 w-4" />
                Download
              </Button>
            </div>

            {error && <div className="qr-error">{error}</div>}
          </div>

          <div className="qr-preview">
            <div className="qr-preview-inner">
              {qrDataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={qrDataUrl} alt="Generated QR code" />
              ) : (
                <div className="qr-placeholder">Preview will appear here</div>
              )}
            </div>
            <div className="hint-row">
              <div className="hint-item">
                <LinkIcon className="hint-icon" /> Encode URLs or short text
              </div>
              <div className="hint-item">
                <ImageIcon className="hint-icon" /> Embedding large images may fail
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default QrGenerator;
