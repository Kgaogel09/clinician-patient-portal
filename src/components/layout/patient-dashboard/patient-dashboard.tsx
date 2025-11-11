import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { healthMetrics } from '@/data/data'
import { Heart, TrendingUp, Moon, Activity } from 'lucide-react'
import React from 'react'
import AIAssistantCard from '../ai-assistant-card/ai-assistant-card'
import TimeSeriesChart from '../time-series-chart/time-series-chart'
import { useAuth } from '@/context/auth'


export default function PatientDashboard() {
    const { user } = useAuth();
    const latestMetrics = healthMetrics[healthMetrics.length - 1];

    return (
        <div className="container mx-auto p-4 mt-8">
            <h1 className="text-4xl font-bold">Patient Dashboard</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Welcome back, {user?.displayName || ''}! Here is a summary of your health today.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="shadow-md border-slate-100 dark:border-slate-700">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
                        <Heart className="h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{latestMetrics.heartRate} bpm</div>
                        <p className="text-xs">Normal range</p>
                    </CardContent>
                </Card>

                <Card className="shadow-md border-slate-100 dark:border-slate-700">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Blood Pressure</CardTitle>
                        <Activity className="h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {latestMetrics.bloodPressure.systolic}/{latestMetrics.bloodPressure.diastolic}
                        </div>
                        <p className="text-xs">mmHg</p>
                    </CardContent>
                </Card>

                <Card className="shadow-md border-slate-100 dark:border-slate-700">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Daily Steps</CardTitle>
                        <TrendingUp className="h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{latestMetrics.steps.toLocaleString()}</div>
                        <p className="text-xs">Today</p>
                    </CardContent>
                </Card>

                <Card className="shadow-md border-slate-100 dark:border-slate-700">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Sleep</CardTitle>
                        <Moon className="h-4 w-4" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{latestMetrics.sleep}h</div>
                        <p className="text-xs">Last night</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <Card className="shadow-md border-slate-100 dark:border-slate-700 col-span-2">
                    <CardHeader>
                        <CardTitle>Recent Health Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <TimeSeriesChart
                                data={healthMetrics}
                                metric="sleep"
                                width={800}
                                height={250}
                            />
                        </div>
                    </CardContent>
                </Card>
                <AIAssistantCard userRole='patient' />
            </div>
        </div>
    )
}
