import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { UserRole } from '@/types/types';
import { Bot } from 'lucide-react'
import Link from 'next/link';
import React from 'react'

interface AIAssistantCardProps {
    userRole: UserRole;
}

export default function AIAssistantCard({ userRole }: AIAssistantCardProps) {

    const disclaimer = userRole !== 'patient'
        ? "AI-generated content requires clinical review and verification. You are responsible for all decisions and documentation."
        : "For informational purposes only. Not a substitute for professional medical advice.";
    console.log(userRole)
    return (
        <Card className="text-white shadow-md border-slate-100 dark:border-slate-700 bg-linear-to-r from-[#1447e6] to-[#5a7cff]">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">	<Bot />
                    AI Assistant</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-4'>
                <p className="text-sm">Ask for help with clinical tasks like summarizing patient notes, drafting referral letters, finding specific data in a chart, or generating patient education materials.</p>
                <div className="text-xs">
                    <span className='font-medium'>Note:</span> {disclaimer}
                </div>
            </CardContent>
            <CardFooter>
                <Button className='w-full text-base font-medium rounded-full bg-blue-50 dark:bg-black/60 border border-blue-200 dark:border-blue-700 px-3 py-5 text-blue-600 dark:text-blue-500'>
                    <Link href="/chat">Ask Assistant</Link></Button>
            </CardFooter>
        </Card>
    )
}
