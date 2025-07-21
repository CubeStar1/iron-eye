# IronEye Frontend

Frontend for IronEye - An AI-powered air-to-surface classification system using RGB-IR fusion for military object detection. This Next.js application provides a real-time dashboard for monitoring and controlling the system.

## Features

- **Real-time Video Streaming**: Monitor synchronized RGB and IR video feeds
- **Object Classification**: View detected military objects (tanks, vehicles, ships) with confidence scores
- **AI-Powered Chat**: Natural language interface for system control and querying
- **MCP Integration**: Control War Thunder simulation via MCP server
- **Analytics Dashboard**: View detection statistics and system performance metrics

## Tech Stack

- [Next.js 15](https://nextjs.org/) 
- [Supabase](https://supabase.com/) 
- [Shadcn UI](https://ui.shadcn.com/) 
- [Tailwind CSS](https://tailwindcss.com/) 
- [TypeScript](https://www.typescriptlang.org/) 

## 🏗️ Project Structure

```
frontend/
├── app/                  # Next.js 15 App Router
│   ├── api/             # API routes
│   ├── chat/            # AI chat interface
│   └── dashboard/       # Main dashboard pages
├── components/          # Reusable UI components
│   ├── landing/         # Landing page components
│   ├── dashboard/       # Dashboard components
│   └── supaauth/        # Authentication components
├── lib/                 # Utility functions and configs
│   ├── supabase/        # Supabase client and utilities
│   └── ai/              # AI-related utilities
├── public/              # Static assets
│   ├── images/          # Image assets
│   └── videos/          # Sample video assets
└── types/               # TypeScript type definitions
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase project with database schema

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/iron-eye.git
cd iron-eye/frontend
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
Copy `.env.example` to `.env.local` and update with your Supabase credentials and API keys.

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
npm start
```
