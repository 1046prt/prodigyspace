"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import "@/styles/theme-toggle.css";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by only rendering after component is mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="theme-toggle">
        <Sun className="sun-icon" />
        <Moon className="moon-icon" />
        <span className="sr-only">Toggle theme</span>
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="theme-toggle"
    >
      <Sun className="sun-icon" />
      <Moon className="moon-icon" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
