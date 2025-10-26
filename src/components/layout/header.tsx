"use client";

import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@radix-ui/react-navigation-menu";
import { getAuth, signOut } from "firebase/auth";
import { LogOut, Stethoscope } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/patients", label: "Patients" },
    { href: "/chat", label: "Chat" },
];

export function Header() {
    const router = useRouter();
    const pathname = usePathname();

    const handleSignOut = async () => {
        const auth = getAuth();
        try {
            await signOut(auth);
            router.push("/login");
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    // Check if a nav item is active
    const isActive = (href: string) => {
        if (href === "/dashboard") {
            return pathname === href;
        }
        return pathname.startsWith(href);
    };

    return (
        <header className="w-full sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <Stethoscope className="h-6 w-6 text-blue-700" />
                        <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                            Clinician Patient Portal
                        </h1>
                    </div>
                </div>
                <NavigationMenu>
                    <NavigationMenuList className="flex flex-row gap-16">
                        {navItems.map((item) => (
                            <NavigationMenuItem key={item.href}>
                                <NavigationMenuLink asChild>
                                    <Link
                                        href={item.href}
                                        className={`
                                            text-base font-medium transition-all duration-200
                                            ${isActive(item.href)
                                                ? "text-blue-700 hover:text-blue-900"
                                                : "text-gray-600 hover:text-gray-900"
                                            }
                                        `}
                                    >
                                        {item.label}
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
                <Button
                    variant="outline"
                    onClick={handleSignOut}
                    className="text-white bg-red-400 font-bold"
                >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                </Button>
            </div>
        </header>
    );
}