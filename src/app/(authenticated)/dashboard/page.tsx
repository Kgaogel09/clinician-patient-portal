'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PatientsLookupTable } from '@/components/layout/patients-lookup-table/patients-lookup-table';
import { Activity, Bot, Heart, Moon, TrendingUp } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { healthMetrics, patientsInfo } from '@/data/data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import TimeSeriesChart from '@/components/layout/time-series-chart/time-series-chart';

// Generate sample time series data
const generateSampleData = () => {
    const data = [];
    const startDate = new Date('2024-01-01');

    for (let i = 0; i < 30; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);

        data.push({
            date,
            value: Math.random() * 100 + 50 // Random values between 50-150
        });
    }

    return data;
};

export default function Dashboard() {
    const { userProfile, user } = useAuth();
    const latestMetrics = healthMetrics[healthMetrics.length - 1];

    const sampleData = generateSampleData();


    if (userProfile?.role === 'patient') {
        return (
            <div className="container mx-auto p-4 mt-8">
                <h1 className="text-4xl font-bold">Patient Dashboard</h1>
                <p className="text-lg text-gray-600 mb-8">
                    Welcome back, {user?.displayName || ''}! Here is a summary of your health today.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card className="shadow-md border-slate-100">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
                            <Heart className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{latestMetrics.heartRate} bpm</div>
                            <p className="text-xs text-muted-foreground">Normal range</p>
                        </CardContent>
                    </Card>

                    <Card className="shadow-md border-slate-100">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Blood Pressure</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {latestMetrics.bloodPressure.systolic}/{latestMetrics.bloodPressure.diastolic}
                            </div>
                            <p className="text-xs text-muted-foreground">mmHg</p>
                        </CardContent>
                    </Card>

                    <Card className="shadow-md border-slate-100">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Daily Steps</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{latestMetrics.steps.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground">Today</p>
                        </CardContent>
                    </Card>

                    <Card className="shadow-md border-slate-100">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Sleep</CardTitle>
                            <Moon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{latestMetrics.heartRate}h</div>
                            <p className="text-xs text-muted-foreground">Last night</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <Card className="shadow-md border-slate-100 col-span-2">
                        <CardHeader>
                            <CardTitle>Recent Health Trends</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <TimeSeriesChart
                                    data={healthMetrics}
                                    metric="heartRate"
                                    width={800}
                                    height={250}
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="text-white shadow-md border-slate-100 bg-gradient-to-r from-[#1447e6] to-[#5a7cff]">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">	<Bot />
                                AI Assistant</CardTitle>
                        </CardHeader>
                        <CardContent className='flex flex-col gap-4'>
                            <p className="text-sm">Ask for help with clinical tasks like summarizing patient notes, drafting referral letters, finding specific data in a chart, or generating patient education materials.</p>
                            <div className="text-xs">
                                <span className='font-medium'>Note:</span> For informational purposes only. Not a substitute for professional medical advice.
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className='w-full text-base font-medium rounded-full bg-blue-50 border border-blue-200 px-3 py-5 text-blue-600'>
                                <Link href="/chat">Ask Assistant</Link></Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        );
    }

    // Clinician Dashboard
    return (
        <div className="container mx-auto p-4 mt-8">
            <h1 className="text-4xl font-bold">Clinician Dashboard</h1>
            <p className="text-lg text-gray-600 mb-8">
                Welcome back, {user?.displayName || ''}! Here is an overview of your day.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <Card className="shadow-md border-slate-100">
                    <CardHeader>
                        <CardTitle>Active Patients</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{patientsInfo.length}</div>
                        <p className="text-sm text-muted-foreground">+2 this week</p>
                    </CardContent>
                </Card>

                <Card className="shadow-md border-slate-100">
                    <CardHeader>
                        <CardTitle>Appointments Today</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">8</div>
                        <p className="text-sm text-muted-foreground">2 completed</p>
                    </CardContent>
                </Card>

                <Card className="shadow-md border-slate-100">
                    <CardHeader>
                        <CardTitle>Critical Alerts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-red-600">3</div>
                        <p className="text-sm text-muted-foreground">Requires attention</p>
                    </CardContent>
                </Card>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <Card className="shadow-md border-slate-100 col-span-2">
                    <CardHeader>
                        <CardTitle>Recent Patients</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <PatientsLookupTable patients={patientsInfo} isSnapshot={true} maxRows={5} />
                    </CardContent>
                </Card>
                <Card className="text-white shadow-md border-slate-100 bg-gradient-to-r from-[#1447e6] to-[#5a7cff]">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">	<Bot />
                            AI Assistant</CardTitle>
                    </CardHeader>
                    <CardContent className='flex flex-col gap-4'>
                        <p className="text-sm">Ask for help with clinical tasks like summarizing patient notes, drafting referral letters, finding specific data in a chart, or generating patient education materials.</p>
                        <div className="text-xs">
                            <span className='font-medium'>Note:</span> AI-generated content requires clinical review and verification. You are responsible for all decisions and documentation.
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className='w-full text-base font-medium rounded-full bg-blue-50 border border-blue-200 px-3 py-5 text-blue-600'>
                            <Link href="/chat">Ask Assistant</Link></Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}