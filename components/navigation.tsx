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
  GraduationCap,
  X,
} from "lucide-react";
import { useState } from "react";
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
              <Link key={item.name} href={item.href} className={`navigation-item ${isActive ? 'active' : ''}`}>
                <item.icon className="navigation-item-icon" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right side controls */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
          }}
        >
          <ThemeToggle />

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: 'var(--muted)',
                  color: 'var(--foreground)',
                  border: '1px solid var(--border)',
                  transition: 'all var(--transition-default)',
                }}
                className="md:hidden"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--accent)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--muted)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <Menu 
                  style={{
                    width: '1.25rem',
                    height: '1.25rem',
                  }}
                />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="right"
              style={{
                backgroundColor: 'var(--background)',
                borderLeft: '1px solid var(--border)',
                width: '20rem',
                padding: 'var(--space-6)',
              }}
            >
              <div 
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-2)',
                }}
              >
                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 'var(--space-4)',
                    paddingBottom: 'var(--space-4)',
                    borderBottom: '1px solid var(--border)',
                  }}
                >
                  <h2 
                    style={{
                      fontSize: 'var(--text-lg)',
                      fontWeight: 'var(--font-semibold)',
                      color: 'var(--foreground)',
                    }}
                  >
                    Navigation
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    style={{
                      width: '2rem',
                      height: '2rem',
                      padding: 0,
                      borderRadius: 'var(--radius-md)',
                    }}
                  >
                    <X style={{ width: '1rem', height: '1rem' }} />
                  </Button>
                </div>
                
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      style={{
                        textDecoration: 'none',
                      }}
                    >
                      <Button
                        variant={isActive ? "default" : "ghost"}
                        size="sm"
                        style={{
                          width: '100%',
                          justifyContent: 'flex-start',
                          padding: 'var(--space-3) var(--space-4)',
                          borderRadius: 'var(--radius-lg)',
                          fontWeight: 'var(--font-medium)',
                          transition: 'all var(--transition-default)',
                          backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                          color: isActive ? 'var(--primary-foreground)' : 'var(--foreground-secondary)',
                          border: isActive ? 'none' : '1px solid transparent',
                          boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.backgroundColor = 'var(--muted)';
                            e.currentTarget.style.color = 'var(--foreground)';
                            e.currentTarget.style.transform = 'translateX(4px)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = 'var(--foreground-secondary)';
                            e.currentTarget.style.transform = 'translateX(0)';
                          }
                        }}
                      >
                        <item.icon 
                          style={{
                            width: '1.25rem',
                            height: '1.25rem',
                            marginRight: 'var(--space-3)',
                          }}
                        />
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
