"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
    User, signOut as firebaseSignOut, createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    sendEmailVerification,
    updateProfile
} from "firebase/auth";
import { auth } from "../lib/firebase";
import { UserProfile, UserRole } from "@/types/types";

interface AuthContextType {
    user: User | null;
    userProfile: UserProfile | null;
    loading: boolean;
    signOut: () => void;
    signUpWithEmail: (
        email: string,
        password: string,
        displayName?: string
    ) => Promise<void>;
    signInWithEmail: (email: string, password: string) => void;
    resetPassword: (email: string) => void;
    updateUserRole: (role: UserRole) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
// localStorage keys
const USER_PROFILE_KEY = 'clinician-portal-user-profile';

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

    // Get user profile from localStorage
    const getUserProfile = (user: User): UserProfile => {
        const baseProfile = {
            uid: user.uid,
            email: user.email!,
            displayName: user.displayName || undefined,
            role: 'patient' as UserRole,
            createdAt: new Date()
        };

        if (typeof window === 'undefined') {
            return baseProfile;
        }

        const stored = localStorage.getItem(USER_PROFILE_KEY);
        if (stored) {
            const profiles = JSON.parse(stored);
            const userProfile = profiles[user.uid];
            if (userProfile) {
                return {
                    ...userProfile,
                    createdAt: new Date(userProfile.createdAt)
                };
            }
        }

        saveUserProfile(baseProfile);
        return baseProfile;
    };

    // Save user profile to localStorage
    const saveUserProfile = (profile: UserProfile) => {
        if (typeof window === 'undefined') return;

        const stored = localStorage.getItem(USER_PROFILE_KEY);
        const profiles = stored ? JSON.parse(stored) : {};
        profiles[profile.uid] = {
            ...profile,
            createdAt: profile.createdAt.toISOString()
        };

        localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profiles));
    };

    // Listen for authentication state changes
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            setUser(user);

            if (user) {
                const profile = getUserProfile(user);
                setUserProfile(profile);
            } else {
                setUserProfile(null);
            }

            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const signOut = () => {
        firebaseSignOut(auth);
    };

    const signUpWithEmail = async (
        email: string,
        password: string,
        displayName?: string
    ) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            if (displayName) {
                await updateProfile(userCredential.user, { displayName });
            }
            await sendEmailVerification(userCredential.user);
        } catch (error) {
            console.error("Sign up error:", error);
            throw error;
        }
    };

    const signInWithEmail = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Sign in error:", error);
            throw error;
        }
    };

    const resetPassword = async (email: string) => {
        await sendPasswordResetEmail(auth, email);
    };

    const updateUserRole = async (role: UserRole) => {
        if (!user || !userProfile) throw new Error("No user logged in");

        if (!['patient', 'clinician', 'admin'].includes(role)) {
            throw new Error("Invalid role");
        }

        const updatedProfile: UserProfile = {
            ...userProfile,
            role
        };

        saveUserProfile(updatedProfile);
        setUserProfile(updatedProfile);
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            signOut,
            userProfile,
            signUpWithEmail,
            signInWithEmail,
            resetPassword,
            updateUserRole,
        }
        }>
            {children}
        </AuthContext.Provider>
    );
};