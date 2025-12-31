"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  CheckSquare,
  Heart,
  Menu,
  Home,
  Wallet,
  Settings,
  ListTodo,
  GraduationCap,
  X,
  FileText,
  Users,
  BookOpen,
} from "lucide-react";
import { useState, useEffect } from "react";
import "@/styles/navigation.css";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Notes", href: "/notes", icon: FileText },
  { name: "Tasks", href: "/tasks", icon: CheckSquare },
  { name: "Todos", href: "/todos", icon: ListTodo },
  { name: "Attendance", href: "/attendance", icon: GraduationCap },
  { name: "Collaboration", href: "/collaboration", icon: Users },
  { name: "Well-being", href: "/wellbeing", icon: Heart },
  { name: "Expenses", href: "/expenses", icon: Wallet },
  { name: "Utilities", href: "/utilities", icon: Settings },
];

export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <header className="navigation">
      <div className="navigation-container">
        {/* Logo */}
        <Link
          href="/"
          className="navigation-logo"
          aria-label="ProdigySpace Home"
        >
          <div className="navigation-logo-icon">
            <BookOpen className="navigation-logo-svg" />
          </div>
          <span className="navigation-logo-text">ProdigySpace</span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="navigation-desktop"
          role="navigation"
          aria-label="Main navigation"
        >
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`navigation-item ${isActive ? "active" : ""}`}
                aria-current={isActive ? "page" : undefined}
              >
                <item.icon
                  className="navigation-item-icon"
                  aria-hidden="true"
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right side controls */}
        <div className="navigation-right-controls">
          <ThemeToggle />

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="navigation-mobile-trigger"
                onClick={() => setIsOpen(true)}
                aria-label="Open navigation menu"
              >
                <Menu
                  className="navigation-mobile-trigger-icon"
                  aria-hidden="true"
                />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="navigation-sheet"
              forceMount
              aria-label="Navigation menu"
            >
              <div className="navigation-sheet-container">
                <div className="navigation-sheet-header">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="navigation-sheet-close"
                    aria-label="Close navigation menu"
                  >
                    <X
                      className="navigation-sheet-close-icon"
                      aria-hidden="true"
                    />
                  </Button>
                  <h2 className="navigation-sheet-title">Navigation</h2>
                </div>

                <nav
                  className="navigation-sheet-nav"
                  role="navigation"
                  aria-label="Mobile navigation"
                >
                  {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="navigation-sheet-link"
                        aria-current={isActive ? "page" : undefined}
                      >
                        <Button
                          variant={isActive ? "default" : "ghost"}
                          size="sm"
                          className={`navigation-sheet-item ${
                            isActive ? "active" : ""
                          }`}
                        >
                          <item.icon
                            className="navigation-sheet-item-icon"
                            aria-hidden="true"
                          />
                          {item.name}
                        </Button>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
