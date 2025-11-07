"use client";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center space-x-2">
        <Sun className="h-4 w-4 text-black" />
        <Switch disabled />
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      {theme === "dark" ? (
        <Moon className="h-4 w-4 text-black" />
      ) : (
        <Sun className="h-4 w-4 text-black" />
      )}
      <Switch
        checked={theme === "dark"}
        onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      />
    </div>
  );
}
