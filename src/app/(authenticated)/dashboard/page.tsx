'use client';

import { useAuth } from '@/context/auth';
import { healthMetrics } from '@/data/data';
import PatientDashboard from '@/components/layout/patient-dashboard/patient-dashboard';
import ClinicianDashboard from '@/components/layout/clinician-dashboard/clinician-dashboard';

export default function Dashboard() {
    const { userProfile } = useAuth();
    const latestMetrics = healthMetrics[healthMetrics.length - 1];

    if (!userProfile || !latestMetrics) {
        return <div className="container mx-auto p-4 mt-8">Loading...</div>;
    }

    // Patient Dashboard
    if (userProfile && userProfile?.role === 'patient') {
        return (
            <PatientDashboard />
        );
    }

    // Clinician Dashboard
    return < ClinicianDashboard />
}