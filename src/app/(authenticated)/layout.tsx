"use client";

import { Header } from "@/components/layout/header/header";
import { ReactNode } from "react";

interface AuthenticatedLayoutProps {
    children: ReactNode;
}

export default function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
    return (
        <>
            <Header />
            {children}
        </>
    );
}