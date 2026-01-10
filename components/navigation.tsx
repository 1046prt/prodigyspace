"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  CheckSquare,
  Heart,
  Menu,
  Home,
  Settings,
  ListTodo,
  X,
  FileText,
} from "lucide-react";
import { useState, useEffect } from "react";
import "@/styles/navigation.css";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Notes", href: "/notes", icon: FileText },
  { name: "Tasks", href: "/tasks", icon: CheckSquare },
  { name: "Todos", href: "/todos", icon: ListTodo },
  { name: "Well-being", href: "/wellbeing", icon: Heart },
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

  // Close the sheet if the viewport is resized to desktop to keep hamburger logic scoped to mobile only
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
            <Image
              src="/logo.png"
              alt="ProdigySpace Logo"
              className="navigation-logo-image"
              width={32}
              height={32}
            />
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
                className="navigation-mobile-trigger lg:hidden"
                aria-label="Toggle navigation menu"
              >
                <Menu
                  className={`navigation-mobile-trigger-icon ${
                    isOpen ? "rotate-90" : ""
                  }`}
                  aria-hidden="true"
                />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="navigation-sheet"
              aria-label="Navigation menu"
            >
              <div className="navigation-sheet-container">
                <div className="navigation-sheet-header">
                  <h2 className="navigation-sheet-title">Menu</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="navigation-sheet-close"
                    aria-label="Close navigation menu"
                  >
                    <X
                      className="navigation-sheet-close-icon"
                      aria-hidden="true"
                    />
                  </Button>
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
