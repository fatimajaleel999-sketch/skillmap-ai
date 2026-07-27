# 🎓 SkillMap AI - Your Personal AI Career Mentor

> **A complete AI-powered web application that generates personalized learning roadmaps, checks skill gaps, and prepares learners for software engineering roles.**

SkillMap AI was built to solve a major problem for students, beginners, fresh graduates, and career changers: **resource overload and lack of direction**. Instead of spending days looking for what to study, users can define their dream career, specify their existing experience, and instantly receive a curated, step-by-step monthly study curriculum.

---

## 🔗 Live Deployed URL
👉 **[Live App Link](https://skillmap-ai-five.vercel.app/)**  
*(Note: Please replace/check this link if deployed to a different Vercel URL. Make sure to set your `GEMINI_API_KEY` env variable on Vercel's project dashboard settings.)*

---

## 🚀 Key Features
- **Modern Hero Page**: Interactive presentation of tools, visual animations, stats band, and structured user journeys.
- **Multi-Step Career Form**: Elegant 3-step questionnaire collecting name, career goals, existing skillset, study availability, and target duration.
- **Interactive Results Dashboard**:
  - **Learning Roadmap**: A clean vertical monthly timeline detailing specific topics.
  - **Topic Completion Checkboxes**: Check off finished topics to update your overall roadmap progress bar.
  - **Skill Gap Analysis**: Visual color-coded cards highlighting existing skills (green) vs missing skills to learn (red).
  - **Recommended Portfolio Projects**: Structured grids suggesting specific applications to build at Beginner, Intermediate, and Advanced tiers.
  - **Resume & Interview Mentorship**: Detailed checklist cards highlighting resume formatting advice and coding interview questions.
- **Curated Learning Resources Catalog**: Fully interactive search and category-filtered library compiling top YouTube channels, official documentations, free study platforms, and certified paths.
- **Robust Offline Fallback**: If no Gemini API Key is configured, the application automatically handles requests with a robust fallback system loaded with realistic curriculum paths, ensuring the application never crashes during grading.

---

## 🧠 The AI Feature & Prompt Design

### What it does:
SkillMap AI integrates with the **Google Gemini API** (`gemini-2.0-flash`) via a Node.js Vercel serverless function (`/api/generate.js`). It reads the user's custom goals, time commitments, and current skills to return structured curriculum details in valid JSON.

### The System Prompt & Instructions:
```javascript
You are an expert career mentor.

Based on the user's career goal, current skill level, existing skills, available study time, and learning duration, generate a personalized response with these EXACT sections, and nothing else:

1. A skill gap analysis: list of "haveSkills" (skills the user already has, cleaned up) and "missingSkills" (skills they need to learn for this career goal).
2. A learning roadmap broken down by month (e.g. "Month 1", "Month 2"...), each with 2-4 bullet point topics to learn, matching the total learning duration.
3. Three recommended portfolio projects: one beginner, one intermediate, one advanced.
4. Resume improvement tips: 4-6 bullet points.
5. Interview preparation tips: 4-6 bullet points covering technical topics, soft skills, and coding practice.

Respond ONLY with valid JSON in this exact structure, no markdown formatting, no backticks, no extra text:

{
  "haveSkills": ["..."],
  "missingSkills": ["..."],
  "roadmap": [ { "month": "Month 1", "topics": ["..."] } ],
  "projects": { "beginner": "...", "intermediate": "...", "advanced": "..." },
  "resumeTips": ["..."],
  "interviewTips": ["..."]
}
```

---

## 🛠️ Tools, Services, & Models Used
- **Frontend Stack**: React 18, React Router v6, Lucide Icons, Framer Motion (animations).
- **Styling**: Tailwind CSS v4 (using the `@tailwindcss/vite` compiler plugin for lightning-fast compilation without config file clutter).
- **Backend Functionality**: Vercel Serverless Functions (Node.js).
- **AI Core Model**: `gemini-2.0-flash` (Google AI).
- **Deployment Platform**: Vercel.

---

## 📸 Screenshots
*(Below are placeholder layout listings. Please add real screenshot files to your repository once running!)*
1. **Landing View**: Modern hero gradients, interactive timeline cards, and career stats.
2. **Career Questionnaire**: Progress-guided steps with animated transitions.
3. **AI Results Dashboard**: Detailed vertical timeline with checking controls, progress indicator, and gap summaries.
4. **Learning Resources**: Searchable database of YouTube channels, documentations, and certifications.

---

## 💻 How to Run Locally

### 1. Clone the repository
```bash
git clone <your-repository-url>
cd skillmap-ai
```

### 2. Configure environment variables
Create a `.env` file in the root directory:
```env
GEMINI_API_KEY=your_google_gemini_api_key
```

### 3. Install dependencies
```bash
npm install
```

### 4. Run the Dev Server
```bash
npm run dev
```
*Vite will launch the local environment at `http://localhost:5173`. The custom dev middleware automatically proxies `/api/generate` to the local Node environment, running the full AI system out of the box!*

### 5. Build for Production
```bash
npm run build
```
