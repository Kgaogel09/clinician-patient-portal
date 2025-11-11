import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { patientsInfo } from '@/data/data'
import React from 'react'
import AIAssistantCard from '../ai-assistant-card/ai-assistant-card'
import { PatientsLookupTable } from '../patients-lookup-table/patients-lookup-table'
import { useAuth } from '@/context/auth'

export default function ClinicianDashboard() {
    const { user } = useAuth();
    return (
        <div className="container mx-auto p-4 mt-8">
            <h1 className="text-4xl font-bold">Clinician Dashboard</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Welcome back, {user?.displayName || ''}! Here is an overview of your day.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <Card className="shadow-md border-slate-100 dark:border-slate-700">
                    <CardHeader>
                        <CardTitle>Active Patients</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{patientsInfo.length}</div>
                        <p className="text-sm">+2 this week</p>
                    </CardContent>
                </Card>

                <Card className="shadow-md border-slate-100 dark:border-slate-700">
                    <CardHeader>
                        <CardTitle>Appointments Today</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">8</div>
                        <p className="text-sm">2 completed</p>
                    </CardContent>
                </Card>

                <Card className="shadow-md border-slate-100 dark:border-slate-700">
                    <CardHeader>
                        <CardTitle>Critical Alerts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-red-500 dark:text-red-400">3</div>
                        <p className="text-sm">Requires attention</p>
                    </CardContent>
                </Card>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <Card className="shadow-md border-slate-100 dark:border-slate-700 col-span-2">
                    <CardHeader>
                        <CardTitle>Recent Patients</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <PatientsLookupTable patients={patientsInfo} isSnapshot={true} maxRows={5} />
                    </CardContent>
                </Card>
                <AIAssistantCard userRole='clinician' />
            </div>
        </div>
    )
}
