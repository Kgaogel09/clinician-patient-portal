# Clinician-Patient Portal

A comprehensive healthcare management platform built with Next.js that enables clinicians to manage patient information, track appointments, and monitor critical alerts through an intuitive dashboard interface.

## Features

- **Clinician Dashboard**: Overview of active patients, daily appointments, and critical alerts
- **Patient Management**: Comprehensive patient lookup and information management
- **AI Assistant Integration**: Built-in AI assistant for clinical decision support
- **Authentication System**: Secure user authentication and role-based access
- **Responsive Design**: Mobile-friendly interface with dark mode support
- **Real-time Updates**: Live data updates for patient information and alerts

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom component library with shadcn/ui
- **Authentication**: Context-based auth system
- **Font**: [Geist](https://vercel.com/font) font family

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── clinician-dashboard/
│   │   ├── patients-lookup-table/
│   │   └── ai-assistant-card/
│   └── ui/
├── context/
│   └── auth.tsx
├── data/
└── app/
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd clinician-patient-portal
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Development

- Main dashboard component: `src/components/layout/clinician-dashboard/clinician-dashboard.tsx`
- Patient data: `src/data/data.ts`
- Authentication context: `src/context/auth.tsx`

## Key Components

### Clinician Dashboard
- Displays active patient count, daily appointments, and critical alerts
- Shows recent patients table with snapshot view
- Integrated AI assistant for clinical support

### Patient Management
- Searchable patient lookup table
- Patient information cards and detailed views
- Real-time patient status updates

### AI Assistant
- Role-based AI assistance for clinicians
- Clinical decision support
- Integrated chat interface

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs/)

## Deployment

Deploy on [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme):

```bash
npm run build
npm run start
```

For detailed deployment instructions, see the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).
