"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import "@/styles/header.css";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/expenses", label: "Expenses" },
    { href: "/todos", label: "Tasks" },
    { href: "/notes", label: "Notes" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="header">
      <div className="container">
        {/* Logo and Title */}
        <Link href="/" className="logoContainer">
          <div className="logoIcon">
            <GraduationCap className="menuButtonIcon" />
          </div>
          <span className="logoText">prodigyspace</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktopNav">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="navLink">
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Theme Toggle */}
        <div className="desktopThemeToggle">
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button and Theme Toggle */}
        <div className="mobileControls">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="menuButton"
          >
            {isMenuOpen ? (
              <X className="menuButtonIcon" />
            ) : (
              <Menu className="menuButtonIcon" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="mobileNav">
          <nav className="mobileNavContainer">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="mobileNavLink"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
