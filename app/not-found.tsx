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
import Image from "next/image";
import "@/styles/not-found.css";

export default function NotFound() {
  return (
    <div className="container fancyBG">
      <div className="bgBlob bgBlob--one" aria-hidden="true" />
      <div className="bgBlob bgBlob--two" aria-hidden="true" />
      <div className="content">
        <Card className="card glassCard">
          <CardHeader className="cardHeader">
            <div className="mark">
              <Image
                src="/logo.png"
                alt="ProdigySpace Logo"
                className="markIcon"
                width={32}
                height={32}
              />
            </div>
            <div className="hero">
              <span className="errorCode" aria-hidden>
                404
              </span>
              <span className="heroSheen" aria-hidden></span>
            </div>
            <CardTitle className="title gradientText">Page Not Found</CardTitle>
            <CardDescription className="description">
              We couldn&apos;t find what you were looking for. It might have
              been moved, renamed, or never existed.
            </CardDescription>
          </CardHeader>
          <CardContent className="cardContent">
            <div className="quickLinks" aria-label="Popular destinations">
              <Link href="/notes" className="pill">
                Notes
              </Link>
              <Link href="/tasks" className="pill">
                Tasks
              </Link>
              <Link href="/expenses" className="pill">
                Expenses
              </Link>
              <Link href="/todos" className="pill">
                Todos
              </Link>
              <Link href="/wellbeing" className="pill">
                Wellbeing
              </Link>
            </div>
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
