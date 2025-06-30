# ScholarSync - Resume & Google Scholar Integration App

![ScholarSync Banner](https://via.placeholder.com/1200x400/4F46E5/FFFFFF?text=ScholarSync)  
*[Insert Application Screenshot or Demo Video Here]*

## 🚀 Overview

ScholarSync is an intelligent full-stack web application that bridges your professional resume with your academic Google Scholar profile to suggest personalized research projects. Our AI-powered platform analyzes your skills, education, work experience, and research interests to recommend projects that align perfectly with your expertise.

### Key Features
- **Smart Resume Parsing** - Extracts skills, education, and experience from uploaded resumes
- **Google Scholar Integration** - Analyzes publications, citations, and research interests
- **AI-Powered Recommendations** - Suggests tailored research projects
- **Beautiful Dashboard** - Modern UI with interactive visualizations

## 🛠️ Tech Stack

**Frontend:**
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Redux Toolkit

**Backend:**
- Next.js API Routes
- Google Gemini API (AI suggestions)
- PDF parsing libraries

**Deployment:**
- Vercel (Hosting)
- ESLint + Prettier (Code Quality)

## 📥 Installation

### Prerequisites
- Node.js v18+
- npm v9+
- Google Gemini API key (for AI features)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/Axestein/scholarsync.git
   cd scholarsync
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file:
   ```env
   GEMINI_API_KEY=your_api_key_here
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Visit `http://localhost:3000`

## 🔍 Usage Guide

1. **Upload Your Resume** (PDF or DOCX)
   - The system will parse your skills, education, and experience

2. **Connect Google Scholar Profile**
   - Enter your public Google Scholar URL

3. **Get Project Recommendations**
   - View AI-generated project suggestions based on your profile

4. **Explore Your Dashboard**
   - Interactive visualization of your academic and professional profile

## 🧪 Testing

### Run Unit Tests
```bash
npm test
```

### Test Coverage
```bash
npm run test:coverage
```

### Test Cases Covered
- Resume parsing accuracy
- Google Scholar profile fetching
- AI suggestion relevance
- UI component rendering

## 🔒 Security

### Implemented Measures
- **Input Validation**: All user inputs are sanitized
- **File Upload Security**: Strict file type and size restrictions
- **API Protection**: Rate limiting on all endpoints
- **XSS Prevention**: Output encoding for all rendered content

### Security Best Practices
1. Always keep dependencies updated
2. Never commit API keys to version control
3. Use HTTPS in production
4. Implement proper CORS policies

## 🏗️ Project Structure

```
scholarsync/
├── app/                    # Next.js app router
│   ├── api/                # API routes
│   ├── (main)/             # Main application pages
├── components/             # React components
├── store/                  # Redux store configuration
└── types/                  # TypeScript type definitions
```

## ✉️ Contact

Aditya Singh - [@adityasingh7211](https://x.com/adityasingh7211) - adityandmb@gmail.com
