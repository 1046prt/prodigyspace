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
import { Home, ArrowLeft, Search } from "lucide-react";
import "@/styles/not-found.css";

export default function NotFound() {
  return (
    <div className="container">
      <div className="content">
        <Card className="card">
          <CardHeader className="cardHeader">
            <div className="iconContainer">
              <span className="text-4xl">🤔</span>
            </div>
            <CardTitle className="title">Page Not Found</CardTitle>
            <CardDescription className="description">
              Sorry, we couldn&apos;t find the page you&apos;re looking for. It
              might have been moved or doesn&apos;t exist.
            </CardDescription>
          </CardHeader>
          <CardContent className="cardContent">
            <div className="buttonGrid">
              <Link href="/" className="homeButton">
                <Button className="button" variant="default">
                  <Home className="mr-2 h-4 w-4" />
                  Go Home
                </Button>
              </Link>
              <Link href="/expenses" className="browseButton">
                <Button className="button" variant="outline">
                  <Search className="mr-2 h-4 w-4" />
                  Browse Features
                </Button>
              </Link>
              <Button
                className="backButton"
                variant="ghost"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
