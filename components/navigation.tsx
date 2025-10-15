"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  FileText,
  CheckSquare,
  Users,
  Heart,
  Menu,
  Home,
  Wallet,
  Settings,
  ListTodo,
} from "lucide-react";
import { useState } from "react";
import "@styles/navigation.css";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Notes", href: "/notes", icon: FileText },
  { name: "Tasks", href: "/tasks", icon: CheckSquare },
  { name: "Todos", href: "/todos", icon: ListTodo },
  { name: "Collaboration", href: "/collaboration", icon: Users },
  { name: "Well-being", href: "/wellbeing", icon: Heart },
  { name: "Expenses", href: "/expenses", icon: Wallet },
  { name: "Utilities", href: "/utilities", icon: Settings },
];

export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        {/* Logo */}
        <Link href="/" className="logoLink">
          <div className="logoWrapper">
            <Image
              src="/logo.png"
              alt="ProdigySpace Logo"
              width={24}
              height={24}
              className="logoImage"
            />
          </div>
          <span className="logoText">ProdigySpace</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktopNav">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <Button variant={isActive ? "default" : "ghost"} size="sm">
                  <item.icon className="icon" />
                  {item.name}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="controls">
          <ThemeToggle />

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="mobileTrigger">
                <Menu className="icon" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="sheetContent">
              <div className="sheetContainer">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                    >
                      <Button
                        variant={isActive ? "default" : "ghost"}
                        size="sm"
                        className="navButton"
                      >
                        <item.icon className="icon" />
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
