import { NextRequest, NextResponse } from 'next/server';

// Mock AI responses
const mockResponses: Record<string, string> = {
    'hello': 'Hello! I\'m your AI health assistant. How can I help you with your health concerns today?',
    'symptoms': 'I can help you understand common symptoms, but please remember I\'m not a substitute for professional medical advice. For serious symptoms, contact your healthcare provider immediately.',
    'appointment': 'To schedule an appointment, please contact your healthcare provider directly. I can help you prepare questions to ask during your visit.',
    'medication': 'For medication-related questions, it\'s important to consult with your pharmacist or healthcare provider who has access to your complete medical history.',
    'diet': 'A balanced diet with plenty of fruits, vegetables, lean proteins, and whole grains is generally recommended. For personalized dietary advice, consult a registered dietitian.',
    'exercise': 'Regular physical activity is important for overall health. Most adults should aim for at least 150 minutes of moderate exercise per week, but consult your doctor before starting new exercises.',
    'default': 'Thank you for your question. While I can provide general health information, it\'s important to consult with healthcare professionals for personalized medical advice. Is there anything specific you\'d like to know about general health practices?'
};

export async function POST(request: NextRequest) {
    try {
        const { message } = await request.json();

        if (!message) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }

        // Simulate API latency (600-900ms)
        await new Promise(resolve =>
            setTimeout(resolve, 600 + Math.random() * 300)
        );

        // Find matching response or use default
        const lowerMessage = message.toLowerCase();
        let response = mockResponses.default;

        for (const [key, value] of Object.entries(mockResponses)) {
            if (lowerMessage.includes(key) && key !== 'default') {
                response = value;
                break;
            }
        }

        return NextResponse.json({ response });
    } catch (error) {
        return NextResponse.json(
            { error: error || 'Internal server error' },
            { status: 500 }
        );
    }
}