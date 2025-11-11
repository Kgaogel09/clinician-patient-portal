"use client";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <Button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            variant="ghost"
            aria-label="Toggle theme"
        >
            {theme === "dark" ? <Sun className="text-blue-600" /> : <Moon />}
        </Button>
    );
}