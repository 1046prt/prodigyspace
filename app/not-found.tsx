"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Home, ArrowLeft } from "lucide-react";
import Image from "next/image";
import "@/styles/not-found.css";

export default function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <Card className="not-found-card">
          <CardHeader className="not-found-header">
            <div className="logo-section">
              <Image
                src="/logo.png"
                alt="ProdigySpace Logo"
                width={40}
                height={40}
                className="logo-image"
              />
            </div>
            <div className="error-section">
              <h1 className="error-code">404</h1>
              <CardTitle className="error-title">Page Not Found</CardTitle>
              <CardDescription className="error-description">
                Sorry, the page you are looking for doesn&apos;t exist. It may
                have been moved or deleted.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="not-found-actions">
            <div className="action-buttons">
              <Link href="/">
                <Button className="primary-button">
                  <Home className="mr-2 h-4 w-4" />
                  Go Home
                </Button>
              </Link>
              <Button
                variant="outline"
                className="secondary-button"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
            </div>

            <div className="quick-links">
              <h3 className="quick-links-title">Or explore these sections:</h3>
              <div className="links-grid">
                <Link href="/notes" className="quick-link">
                  Notes
                </Link>
                <Link href="/tasks" className="quick-link">
                  Tasks
                </Link>
                <Link href="/expenses" className="quick-link">
                  Expenses
                </Link>
                <Link href="/todos" className="quick-link">
                  Todos
                </Link>
                <Link href="/wellbeing" className="quick-link">
                  Wellbeing
                </Link>
                <Link href="/attendance" className="quick-link">
                  Attendance
                </Link>
                <Link href="/alarms" className="quick-link">
                  Alarms
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
