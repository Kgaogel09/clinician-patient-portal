"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { NavItem, UserRole } from "@/types/types";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@radix-ui/react-navigation-menu";
import { LogOut, Stethoscope } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { RoleSelector } from "../role-selector/role-selector";
import ThemeToggle from "../toggle-theme/toggle-theme";
import { useMemo } from "react";

const navigationConfig: NavItem[] = [
    { href: "/dashboard", label: "Dashboard", roles: ['patient', 'clinician', 'admin'] },
    { href: "/patients", label: "Patient Lookup", roles: ['clinician', 'admin'] },
    { href: "/chat", label: "AI Assistant", roles: ['patient', 'clinician', 'admin'] },
];

export function Header() {
    const router = useRouter();
    const pathname = usePathname();
    const { userProfile, signOut } = useAuth();

    const getNavigationItems = (role: UserRole = 'patient'): NavItem[] => {
        return navigationConfig.filter(item => item.roles.includes(role));
    };

    const handleSignOut = async () => {
        try {
            await signOut(); // Use the signOut from context instead of getAuth()
            router.push("/login");
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const isActive = (href: string) => {
        if (href === "/dashboard") {
            return pathname === href;
        }
        return pathname.startsWith(href);
    };

    const navigationItems = useMemo(() =>
        getNavigationItems(userProfile?.role || 'patient'),
        [userProfile?.role]
    );

    return (
        <header className="w-full sticky top-0 z-50 bg-white/95 dark:bg-gray-900/90 backdrop-blursupports-backdrop-filter:bg-white/60 dark:supports-backdrop-filter:bg-gray-900/40 border-b border-gray-100 dark:border-gray-800 shadow-sm">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <Stethoscope className="h-6 w-6 text-blue-600 dark:text-blue-600" />
                        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                            Clinician Patient Portal
                        </h1>
                    </div>
                </div>
                {navigationItems.length > 0 && (
                    <NavigationMenu>
                        <NavigationMenuList className="flex flex-row gap-8">
                            {navigationItems.map((item) => (
                                <NavigationMenuItem key={item.href}>
                                    <NavigationMenuLink asChild>
                                        <Link
                                            href={item.href}
                                            className={`
                                text-base font-medium transition-all duration-200
                                ${isActive(item.href)
                                                    ? "text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-400"
                                                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
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
                )}
                <div className="flex gap-4">
                    <ThemeToggle />
                    {userProfile && (
                        <RoleSelector />
                    )}
                    <Button
                        onClick={handleSignOut}
                        className="text-white bg-red-400 border-red-400 dark:bg-red-600 dark:border-red-600 font-bold"
                    >
                        <LogOut className="h-3 w-3" />
                        Logout
                    </Button>
                </div>
            </div>
        </header>
    );
}