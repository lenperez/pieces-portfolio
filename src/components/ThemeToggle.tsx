import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function resolveTheme(stored: string | null, systemDark: boolean): "dark" | "light" {
  if (stored === "dark" || stored === "light") return stored;
  return systemDark ? "dark" : "light";
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      const d = resolveTheme(localStorage.getItem("theme"), mq.matches) === "dark";
      document.documentElement.classList.toggle("dark", d);
      setDark(d);
    };
    apply();
    const onChange = () => { if (!localStorage.getItem("theme")) apply(); };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  function toggle() {
    const next = !dark;
    localStorage.setItem("theme", next ? "dark" : "light");
    document.documentElement.classList.toggle("dark", next);
    setDark(next);
  }

  return (
    <button type="button" onClick={toggle} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} className={`rounded-full p-2 text-primary transition-colors hover:bg-muted dark:text-foreground ${className}`}>
      {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}
