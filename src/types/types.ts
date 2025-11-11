export type UserRole = 'patient' | 'clinician' | 'admin';

export interface UserProfile {
    uid: string;
    email: string;
    displayName: string | undefined;
    role: UserRole;
    avatar?: string;
    createdAt: Date;
}

export interface NavItem {
    href: string;
    label: string;
    roles: UserRole[];
}

export interface Patient {
    id: string;
    name: string;
    age: number;
    gender: string;
    createdAt: string;
    conditions: string[];
    clinicianId: string;
    email: string;
}

export interface ChatMessage {
    id: string | undefined;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export interface Chats {
    id: string;
    userId: string;
    title: string;
    messages: ChatMessage[];
    lastUpdated: Date;
}

export interface HealthMetric {
    date: string;
    heartRate: number;
    bloodPressure: {
        systolic: number;
        diastolic: number;
    };
    sleep: number;
    steps: number;
}