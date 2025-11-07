"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { NavItem, UserRole } from "@/types/types";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@radix-ui/react-navigation-menu";
import { getAuth, signOut } from "firebase/auth";
import { LogOut, Stethoscope } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { RoleSelector } from "../role-selector/role-selector";
import ThemeToggle from "../toggle-theme/toggle-theme";

const navigationConfig: NavItem[] = [
    { href: "/dashboard", label: "Dashboard", roles: ['patient', 'clinician', 'admin'] },
    { href: "/patients", label: "Patient Lookup", roles: ['clinician', 'admin'] },
    { href: "/chat", label: "AI Assistant", roles: ['patient', 'clinician', 'admin'] },
];

export function Header() {
    const router = useRouter();
    const pathname = usePathname();
    const { userProfile } = useAuth();

    const getNavigationItems = (role: UserRole = 'patient'): NavItem[] => {
        return navigationConfig.filter(item => item.roles.includes(role));
    };

    const handleSignOut = async () => {
        const auth = getAuth();
        try {
            await signOut(auth);
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

    return (
        <header className="w-full sticky top-0 z-50 shadow-sm bg-white dark:bg-red">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <Stethoscope className="h-6 w-6 text-blue-700" />
                        <h1 className="text-xl font-bold">
                            Clinician Patient Portal
                        </h1>
                    </div>
                </div>
                <NavigationMenu>
                    <NavigationMenuList className="flex flex-row gap-16">
                        {getNavigationItems(userProfile?.role || 'patient').map((item) => (
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
                <div className="flex gap-4">
                    <ThemeToggle />
                    {userProfile && (
                        <RoleSelector />
                    )}
                    <Button
                        variant="outline"
                        onClick={handleSignOut}
                        className="text-white bg-red-400 font-bold"
                    >
                        <LogOut className="h-3 w-3" />
                        Logout
                    </Button>
                </div>
            </div>
        </header>
    );
}