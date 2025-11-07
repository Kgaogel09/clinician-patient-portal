"use client";

import { Toggle } from "@/components/ui/toggle";
import { useAuth } from "@/context/auth";
import { UserRole } from "@/types/types";
import { Stethoscope, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function RoleSelector() {
    const { userProfile, updateUserRole } = useAuth();
    const [isUpdating, setIsUpdating] = useState(false);
    const router = useRouter();

    const handleRoleToggle = async (pressed: boolean) => {
        if (!userProfile) return;

        const newRole: UserRole = pressed ? 'clinician' : 'patient';

        setIsUpdating(true);

        router.push('/dashboard');
        try {
            await updateUserRole(newRole);
        } catch (error) {
            console.error("Failed to update role:", error);
        } finally {
            setIsUpdating(false);
        }
    };

    if (!userProfile) return null;

    const isClinician = userProfile.role === 'clinician';

    return (

        <Toggle
            pressed={isClinician}
            disabled={isUpdating}
            onPressedChange={handleRoleToggle}
            aria-label="Toggle bookmark"
            size="sm"
            variant="outline"
            className="data-[state=on]:bg-transparent rounded-full bg-blue-50 border border-blue-200 ml-4 px-3 py-1"
        >
            {isClinician ? <Stethoscope className="h-3 w-3 text-blue-600" /> : <User className="h-3 w-3 text-blue-600" />}
            <span className="text-sm font-medium text-blue-700 capitalize">{isClinician ? 'Clinician' : 'Patient'}</span>

        </Toggle>
    );
}