"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import "@/styles/theme-toggle.css";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="theme-toggle"
    >
      <Sun className="sun-icon" />
      <Moon className="moon-icon" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
