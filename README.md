# QualifyPro

**AI-Powered Resume Analysis for Maximum Interview Callbacks**

![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=flat&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=flat&logo=vite)

---

## Overview

QualifyPro is an intelligent resume optimization tool that helps job seekers maximize their interview callback rates. Using advanced AI analysis, it compares your resume against job descriptions to identify gaps, suggest improvements, and ensure ATS (Applicant Tracking System) compatibility.

**Trusted by 10,000+ job seekers worldwide.**

---

## ✨ Features

### 🎯 ATS Compatibility Analysis
Scan your resume for formatting issues that could cause rejection by automated screening systems.

### 🔑 Keyword Matching
Identify critical keywords from job descriptions that are missing from your resume.

### 📊 Skills Gap Analysis
Receive a comprehensive score-based assessment of how well your skills align with job requirements.

### 💼 Experience Alignment
Understand how your work experience maps to the position you're targeting.

### 📄 Format Analysis
Get feedback on resume structure, section organization, and overall readability.

### ✅ Actionable Recommendations
Receive prioritized fixes with impact scores to focus on what matters most.

---

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | React 18, TypeScript, Vite |
| **Styling** | Tailwind CSS, shadcn/ui |
| **Backend** | Lovable Cloud (Edge Functions) |
| **AI** | Claude API (Anthropic) |
| **State Management** | TanStack Query |
| **Routing** | React Router v6 |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── app/                    # Application components
│   │   ├── FileUploader.tsx    # Resume upload component
│   │   ├── AnalysisLoading.tsx # Loading state during analysis
│   │   ├── ScoreCard.tsx       # Score display component
│   │   └── UpgradeModal.tsx    # Upgrade prompt modal
│   ├── ui/                     # shadcn/ui components
│   ├── Benefits.tsx            # Landing page benefits section
│   ├── FAQ.tsx                 # Frequently asked questions
│   ├── Footer.tsx              # Site footer
│   ├── Hero.tsx                # Landing page hero section
│   ├── HowItWorks.tsx          # Process explanation
│   ├── Navbar.tsx              # Navigation bar
│   ├── Pricing.tsx             # Pricing plans
│   └── Testimonials.tsx        # User testimonials
├── pages/
│   ├── Index.tsx               # Landing page
│   ├── AppHome.tsx             # Resume upload page
│   ├── Analyze.tsx             # Job description input
│   ├── Results.tsx             # Analysis results dashboard
│   └── NotFound.tsx            # 404 page
├── lib/
│   ├── claude-api.ts           # Claude API integration
│   ├── usage-tracking.ts       # Free tier usage tracking
│   └── utils.ts                # Utility functions
├── hooks/
│   ├── use-mobile.tsx          # Mobile detection hook
│   └── use-toast.ts            # Toast notifications
└── integrations/
    └── supabase/               # Backend client configuration
        ├── client.ts
        └── types.ts

supabase/
└── functions/
    └── analyze-resume/         # Edge function for AI analysis
        └── index.ts
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to project directory
cd qualifypro

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

---

## 🔄 How It Works

1. **Upload Your Resume**  
   Upload your resume as a PDF file through the intuitive drag-and-drop interface.

2. **Paste Job Description**  
   Copy and paste the job description you're targeting.

3. **AI Analysis**  
   Our AI engine analyzes your resume against the job requirements, checking for:
   - ATS compatibility issues
   - Missing keywords
   - Skills alignment
   - Experience relevance
   - Format optimization opportunities

4. **Review Results**  
   Get a comprehensive report with:
   - Overall match score
   - Detailed breakdown by category
   - Prioritized action items
   - Specific improvement suggestions

---

## 🔐 Environment Variables

The following environment variables are automatically configured:

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Backend API URL (auto-configured) |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Backend public key (auto-configured) |

### Required Secret (Backend)

| Secret | Description |
|--------|-------------|
| `ANTHROPIC_API_KEY` | Claude API key for AI analysis |

---

## 📦 Deployment

### Deploy with Lovable

1. Open your project in [Lovable](https://lovable.dev)
2. Click **Share → Publish**
3. Your app is live!

### Custom Domain

1. Navigate to **Project → Settings → Domains**
2. Click **Connect Domain**
3. Follow the DNS configuration instructions

---

## 💰 Pricing

| Plan | Price | Features |
|------|-------|----------|
| **Free** | $0 | 2 resume analyses |
| **Pro** | $19/month | Unlimited analyses, priority support |
| **Team** | $49/month | Team collaboration, API access |

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is proprietary software. All rights reserved.

---

## 🙏 Credits

- Built with [Lovable](https://lovable.dev)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- AI powered by [Anthropic Claude](https://anthropic.com)

---

<p align="center">
  Made with ❤️ for job seekers everywhere
</p>
