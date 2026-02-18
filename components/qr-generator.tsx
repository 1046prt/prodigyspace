"use client";

import React, { useState, useRef } from "react";
import QRCode from "qrcode";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Download, ImageIcon, Link as LinkIcon, QrCode, Copy, RefreshCw, Zap } from "lucide-react";
import "@/styles/qr-generator.css";

export function QrGenerator() {
  const [mode, setMode] = useState<"text" | "image">("text");
  const [inputValue, setInputValue] = useState("");
  const [size, setSize] = useState(300);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [qrSvg, setQrSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [format, setFormat] = useState<"png" | "svg">("png");
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

      if (format === "png") {
        const dataUrl = await QRCode.toDataURL(inputValue, {
          width: size,
          margin: 2,
        });
        setQrSvg(null);
        setQrDataUrl(dataUrl);
      } else {
        const svg = await QRCode.toString(inputValue, {
          type: "svg",
          width: size,
          margin: 2,
        });
        setQrDataUrl(null);
        setQrSvg(svg);
      }
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
    try {
      if (format === "png" && qrDataUrl) {
        const a = document.createElement("a");
        a.href = qrDataUrl;
        a.download = "qr-code.png";
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else if (format === "svg" && qrSvg) {
        const blob = new Blob([qrSvg], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "qr-code.svg";
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      }
    } catch {
      setError("Download failed.");
    }
  };

  const handleCopy = async () => {
    try {
      if (format === "png" && qrDataUrl) {
        await navigator.clipboard.writeText(qrDataUrl);
      } else if (format === "svg" && qrSvg) {
        await navigator.clipboard.writeText(qrSvg);
      }
    } catch {
      setError("Copy failed. Your browser may block clipboard access.");
    }
  };

  return (
    <Card className="qr-generator-card">
      <CardHeader className="qr-header-container">
        <div className="qr-header-content">
          <div className="qr-header-badge">
            <QrCode className="badge-icon" />
            <span>QR Generator</span>
          </div>
          <CardTitle className="qr-title">Generate QR Codes Instantly</CardTitle>
          <p className="qr-subtitle">Create high-quality QR codes for URLs, text, or images. Customize size and format to your needs.</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="qr-grid">
          <div className="qr-controls">
            {/* Mode Selection */}
            <div className="qr-mode-section">
              <h3 className="section-title">Content Type</h3>
              <div className="qr-mode">
                <label className="qr-mode-option">
                  <input
                    type="radio"
                    name="mode"
                    checked={mode === "text"}
                    onChange={() => setMode("text")}
                  />
                  <span className="mode-icon"><LinkIcon className="w-4 h-4" /></span>
                  <span>Text / URL</span>
                </label>
                <label className="qr-mode-option">
                  <input
                    type="radio"
                    name="mode"
                    checked={mode === "image"}
                    onChange={() => setMode("image")}
                  />
                  <span className="mode-icon"><ImageIcon className="w-4 h-4" /></span>
                  <span>Image (embed)</span>
                </label>
              </div>
            </div>

            <div className="input-group">
              <Label className="input-label">
                <span className="label-text">Input</span>
                <span className="label-hint">{mode === "text" ? "URL or text" : "Upload image"}</span>
              </Label>
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={
                  mode === "text"
                    ? "https://example.com or any text..."
                    : "Upload an image to embed..."
                }
                className="qr-input"
              />
            </div>

            <div className="file-upload">
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleFile(e.target.files?.[0])}
                className="file-input-hidden"
              />
              <Button variant="outline" onClick={() => fileRef.current?.click()} className="upload-btn">
                <ImageIcon className="w-4 h-4 mr-2" />
                Upload Image
              </Button>
              <div className="upload-hint">PNG, JPG, SVG • Keep images small</div>
            </div>

            <div className="settings-section">
              <h3 className="section-title">Settings</h3>
              <div className="size-row">
                <div className="format-group">
                  <Label className="input-label">Format</Label>
                  <div className="format-select">
                    <label className="format-option">
                      <input type="radio" name="format" checked={format === "png"} onChange={() => setFormat("png")} /> 
                      <span>PNG</span>
                    </label>
                    <label className="format-option">
                      <input type="radio" name="format" checked={format === "svg"} onChange={() => setFormat("svg")} /> 
                      <span>SVG</span>
                    </label>
                  </div>
                </div>

                <div className="size-control">
                  <div className="size-header">
                    <Label className="input-label">Size</Label>
                    <div className="size-value">{size}px</div>
                  </div>
                  <div className="size-input-row">
                    <input
                      type="range"
                      min={128}
                      max={1024}
                      value={size}
                      onChange={(e) => setSize(Number(e.target.value))}
                      className="size-slider"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="actions">
              <Button onClick={generateQr} className="btn-primary">
                <Zap className="w-4 h-4 mr-2" />
                Generate
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setInputValue("");
                  setQrDataUrl(null);
                  setQrSvg(null);
                  setError(null);
                }}
                className="btn-secondary"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Clear
              </Button>
              <Button variant="outline" onClick={handleCopy} disabled={!qrDataUrl && !qrSvg} className="btn-secondary">
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
              <Button variant="default" onClick={handleDownload} disabled={!qrDataUrl && !qrSvg} className="btn-download">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>

            {error && <div className="qr-error">{error}</div>}
          </div>

          <div className="qr-preview">
            <div className="qr-preview-header">
              <QrCode className="preview-title-icon" />
              <h3 className="preview-title">Preview</h3>
            </div>
            <div className="qr-preview-inner" role="img" aria-label="QR preview">
              {qrDataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={qrDataUrl} alt="Generated QR code" />
              ) : qrSvg ? (
                <div className="qr-svg" dangerouslySetInnerHTML={{ __html: qrSvg }} />
              ) : (
                <div className="qr-placeholder">
                  <QrCode className="placeholder-icon" />
                  <p>Preview will appear here</p>
                </div>
              )}
            </div>
            <div className="hint-row">
              <div className="hint-item">
                <LinkIcon className="hint-icon" /> URLs & text encoded instantly
              </div>
              <div className="hint-item">
                <ImageIcon className="hint-icon" /> Keep images small for best results
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default QrGenerator;
