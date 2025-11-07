import { Patient, HealthMetric } from '../types/types';

export const patientsInfo: Patient[] = [
    {
        id: "P1234567",
        name: 'John Smith',
        age: 45,
        gender: 'Male',
        createdAt: '2024-01-15',
        conditions: ['Hypertension', 'Type 2 Diabetes'],
        clinicianId: 'clinician1',
        email: "john.smith@example.com",
    },
    {
        id: "P7654321",
        name: 'Sarah Johnson',
        age: 32,
        gender: 'Female',
        createdAt: '2024-01-10',
        conditions: ['Asthma', 'Allergies'],
        clinicianId: 'clinician1',
        email: "sarah.j@example.com",
    },
    {
        id: "P2345678",
        name: 'Michael Brown',
        age: 58,
        gender: 'Male',
        createdAt: '2024-01-08',
        conditions: ['Arthritis', 'High Cholesterol'],
        clinicianId: 'clinician1',
        email: "brown@example.com",
    },
    {
        id: "P3456789",
        name: 'Emily Chen',
        age: 29,
        gender: 'Female',
        createdAt: '2024-01-20',
        conditions: ['Migraine', 'Anxiety'],
        clinicianId: 'clinician1',
        email: "emily.chen@example.com",
    },
    {
        id: "P4567890",
        name: 'David Wilson',
        age: 67,
        gender: 'Male',
        createdAt: '2024-01-05',
        conditions: ['COPD', 'Heart Disease'],
        clinicianId: 'clinician1',
        email: "d.wilson@example.com",
    },
    {
        id: "P5678901",
        name: 'Maria Garcia',
        age: 38,
        gender: 'Female',
        createdAt: '2024-01-12',
        conditions: ['Thyroid Disorder', 'Osteoporosis'],
        clinicianId: 'clinician1',
        email: "maria.g@example.com",
    },
    {
        id: "P6789012",
        name: 'Robert Taylor',
        age: 52,
        gender: 'Male',
        createdAt: '2024-01-18',
        conditions: ['Sleep Apnea', 'GERD'],
        clinicianId: 'clinician1',
        email: "rtaylor@example.com",
    },
    {
        id: "P7890123",
        name: 'Lisa Anderson',
        age: 41,
        gender: 'Female',
        createdAt: '2024-01-14',
        conditions: ['Fibromyalgia', 'Depression'],
        clinicianId: 'clinician1',
        email: "l.anderson@example.com",
    },
    {
        id: "P8901234",
        name: 'James Miller',
        age: 35,
        gender: 'Male',
        createdAt: '2024-01-22',
        conditions: ['Sports Injury', 'Tendonitis'],
        clinicianId: 'clinician1',
        email: "james.miller@example.com",
    }
];

export const healthMetrics: HealthMetric[] = [
    {
        date: '2025-07-31',
        heartRate: 68,
        bloodPressure: { systolic: 119, diastolic: 79 },
        weight: 74.5,
        steps: 10234
    },
    {
        date: '2025-07-30',
        heartRate: 72,
        bloodPressure: { systolic: 121, diastolic: 81 },
        weight: 74.6,
        steps: 8765
    },
    {
        date: '2025-07-29',
        heartRate: 70,
        bloodPressure: { systolic: 118, diastolic: 78 },
        weight: 74.8,
        steps: 9456
    },
    {
        date: '2025-07-28',
        heartRate: 74,
        bloodPressure: { systolic: 122, diastolic: 82 },
        weight: 75.0,
        steps: 7890
    },
    {
        date: '2025-07-27',
        heartRate: 69,
        bloodPressure: { systolic: 117, diastolic: 77 },
        weight: 74.9,
        steps: 11234
    },
    {
        date: '2025-07-26',
        heartRate: 73,
        bloodPressure: { systolic: 123, diastolic: 83 },
        weight: 75.1,
        steps: 15678
    },
    {
        date: '2025-07-25',
        heartRate: 71,
        bloodPressure: { systolic: 120, diastolic: 80 },
        weight: 75.0,
        steps: 8321
    },
    {
        date: '2025-07-24',
        heartRate: 76,
        bloodPressure: { systolic: 124, diastolic: 84 },
        weight: 75.2,
        steps: 7654
    },
    {
        date: '2025-07-23',
        heartRate: 68,
        bloodPressure: { systolic: 119, diastolic: 79 },
        weight: 74.8,
        steps: 9876
    },
    {
        date: '2025-07-22',
        heartRate: 72,
        bloodPressure: { systolic: 121, diastolic: 81 },
        weight: 74.7,
        steps: 8432
    },
    {
        date: '2025-07-21',
        heartRate: 70,
        bloodPressure: { systolic: 118, diastolic: 78 },
        weight: 74.9,
        steps: 9123
    },
    {
        date: '2025-07-20',
        heartRate: 75,
        bloodPressure: { systolic: 122, diastolic: 82 },
        weight: 75.1,
        steps: 7234
    },
    {
        date: '2025-07-19',
        heartRate: 69,
        bloodPressure: { systolic: 117, diastolic: 77 },
        weight: 74.8,
        steps: 13456
    },
    {
        date: '2025-07-18',
        heartRate: 73,
        bloodPressure: { systolic: 123, diastolic: 83 },
        weight: 75.0,
        steps: 8765
    },
    {
        date: '2025-07-17',
        heartRate: 71,
        bloodPressure: { systolic: 120, diastolic: 80 },
        weight: 75.2,
        steps: 7987
    },
    {
        date: '2025-07-16',
        heartRate: 74,
        bloodPressure: { systolic: 119, diastolic: 79 },
        weight: 75.1,
        steps: 8654
    },
    {
        date: '2025-07-15',
        heartRate: 72,
        bloodPressure: { systolic: 120, diastolic: 80 },
        weight: 75,
        steps: 8432
    },
    {
        date: '2025-07-14',
        heartRate: 75,
        bloodPressure: { systolic: 118, diastolic: 78 },
        weight: 75.2,
        steps: 7654
    },
    {
        date: '2025-07-13',
        heartRate: 70,
        bloodPressure: { systolic: 122, diastolic: 82 },
        weight: 74.8,
        steps: 9210
    },
    {
        date: '2025-07-12',
        heartRate: 73,
        bloodPressure: { systolic: 121, diastolic: 81 },
        weight: 74.9,
        steps: 10567
    },
    {
        date: '2025-07-11',
        heartRate: 68,
        bloodPressure: { systolic: 117, diastolic: 77 },
        weight: 75.0,
        steps: 8123
    },
    {
        date: '2025-07-10',
        heartRate: 76,
        bloodPressure: { systolic: 124, diastolic: 84 },
        weight: 75.3,
        steps: 7345
    },
    {
        date: '2025-07-09',
        heartRate: 71,
        bloodPressure: { systolic: 119, diastolic: 79 },
        weight: 75.1,
        steps: 8890
    },
    {
        date: '2025-07-08',
        heartRate: 69,
        bloodPressure: { systolic: 118, diastolic: 78 },
        weight: 74.8,
        steps: 9567
    },
    {
        date: '2025-07-07',
        heartRate: 74,
        bloodPressure: { systolic: 122, diastolic: 82 },
        weight: 75.0,
        steps: 8234
    },
    {
        date: '2025-07-06',
        heartRate: 72,
        bloodPressure: { systolic: 120, diastolic: 80 },
        weight: 74.9,
        steps: 11789
    },
    {
        date: '2025-07-05',
        heartRate: 70,
        bloodPressure: { systolic: 119, diastolic: 79 },
        weight: 74.7,
        steps: 14321
    },
    {
        date: '2025-07-04',
        heartRate: 75,
        bloodPressure: { systolic: 123, diastolic: 83 },
        weight: 75.1,
        steps: 9876
    },
    {
        date: '2025-07-03',
        heartRate: 73,
        bloodPressure: { systolic: 121, diastolic: 81 },
        weight: 75.2,
        steps: 7654
    },
    {
        date: '2025-07-02',
        heartRate: 68,
        bloodPressure: { systolic: 117, diastolic: 77 },
        weight: 74.8,
        steps: 8321
    },
    {
        date: '2025-07-01',
        heartRate: 71,
        bloodPressure: { systolic: 120, diastolic: 80 },
        weight: 75.0,
        steps: 7890
    }
];

export const aiResponses = [
    "Based on your symptoms, I recommend monitoring your blood pressure regularly and consulting with your clinician during your next appointment.",
    "It's important to maintain a balanced diet and regular exercise. Make sure to stay hydrated throughout the day.",
    "The medication should be taken with food to avoid stomach discomfort. If you experience any side effects, contact your clinician immediately.",
    "Your recent lab results show improvement. Continue with your current treatment plan and schedule a follow-up in 4 weeks.",
    "I understand you're experiencing fatigue. Make sure you're getting 7-9 hours of sleep and consider gentle exercises like walking."
];

export const suggestions = [
    "E.g Ask about your health concerns...",
    "E.g How can I improve my sleep?...",
    "E.g What foods boost immunity?...",
    "E.g Explain my blood test results",
    "E.g Tips for managing stress...."
];

