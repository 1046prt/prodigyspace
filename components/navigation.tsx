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
  Wallet,
  Settings,
  ListTodo,
  GraduationCap,
  X,
} from "lucide-react";
import { useState } from "react";
import "@/styles/navigation.css";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Tasks", href: "/tasks", icon: CheckSquare },
  { name: "Todos", href: "/todos", icon: ListTodo },
  { name: "Attendance", href: "/attendance", icon: GraduationCap },
  { name: "Well-being", href: "/wellbeing", icon: Heart },
  { name: "Expenses", href: "/expenses", icon: Wallet },
  { name: "Utilities", href: "/utilities", icon: Settings },
];

export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="navigation">
      <div className="navigation-container">
        {/* Logo */}
        <Link href="/" className="navigation-logo">
          <div className="navigation-logo-icon">
            <Image
              src="/logo.png"
              alt="ProdigySpace Logo"
              width={20}
              height={20}
              className="navigation-logo-image"
            />
          </div>
          <span className="navigation-logo-text">ProdigySpace</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="navigation-desktop">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`navigation-item ${isActive ? "active" : ""}`}
              >
                <item.icon className="navigation-item-icon" />
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
              >
                <Menu className="navigation-mobile-trigger-icon" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="navigation-sheet" forceMount>
              <div className="navigation-sheet-container">
                <div className="navigation-sheet-header">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="navigation-sheet-close"
                  >
                    <X className="navigation-sheet-close-icon" />
                  </Button>
                  <h2 className="navigation-sheet-title">Navigation</h2>
                </div>

                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="navigation-sheet-link"
                    >
                      <Button
                        variant={isActive ? "default" : "ghost"}
                        size="sm"
                        className={`navigation-sheet-item ${
                          isActive ? "active" : ""
                        }`}
                      >
                        <item.icon className="navigation-sheet-item-icon" />
                        {item.name}
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
