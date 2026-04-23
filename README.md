# AI Resume Analyzer

An intelligent, full-stack web application designed to help job seekers optimize their resumes for Applicant Tracking Systems (ATS). This tool analyzes PDF resumes against a target Job Description (JD) using a local instance of the Ollama LLM, providing an ATS score, missing keywords, and actionable AI-driven feedback.

## Features

- **Resume Parsing**: Automatically extracts text from uploaded PDF resumes.
- **Job Description Matching**: Compares your resume against a specific job role.
- **ATS Scoring**: Calculates a keyword-matching score to estimate your ATS compatibility.
- **Keyword Gap Analysis**: Identifies critical keywords missing from your resume.
- **AI Feedback**: Generates detailed, actionable suggestions to improve your resume content using a locally run large language model (Ollama).
- **Modern UI**: A responsive, real-time dashboard built with Next.js and Tailwind CSS.

## Tech Stack

**Frontend:**
- [Next.js 16](https://nextjs.org/) (React Framework)
- [Tailwind CSS 4](https://tailwindcss.com/) (Styling)

**Backend:**
- [FastAPI](https://fastapi.tiangolo.com/) (Python Web Framework)
- [Uvicorn](https://www.uvicorn.org/) (ASGI Web Server)
- [PyPDF2](https://pypdf2.readthedocs.io/en/3.0.0/) (PDF Text Extraction)
- [Ollama](https://ollama.com/) (Local LLM Integration)

## Getting Started

### ✅ Prerequisites

Make sure you have the following installed before running the project:

| Tool | Version | Purpose |
|------|---------|---------|
| [Python](https://www.python.org/downloads/) | v3.9+ | Backend runtime |
| [Node.js](https://nodejs.org/) | v18+ | Frontend runtime |
| [Ollama](https://ollama.com/) | Latest | Local LLM engine |

---

## 🚀 Running the Project

> You need **3 things running** at the same time: Ollama, the Backend, and the Frontend.  
> Use **separate terminals** for each.

---

### Step 1 — Start Ollama (AI Engine)

Open a terminal and run:

```bash
ollama run llama3
```

> ⚠️ Keep this terminal open. Ollama must be running for the AI analysis to work.  
> First-time users: this will download the LLaMA 3 model (~4GB). Subsequent starts are instant.

---

### Step 2 — Start the Backend (FastAPI)

Open a **new terminal** and run the following commands:

```bash
# Navigate to the backend folder
cd backend

# Activate the virtual environment (Windows)
.\venv\Scripts\activate

# If venv doesn't exist yet, create it first:
# python -m venv venv
# Then activate and install dependencies:
# pip install fastapi uvicorn pydantic PyPDF2 python-multipart ollama

# Start the backend server
python main.py
```

✅ Backend is ready when you see:
```
Uvicorn running on http://0.0.0.0:8000
```

---

### Step 3 — Start the Frontend (Next.js)

Open another **new terminal** and run:

```bash
# Navigate to the frontend folder
cd frontend

# Install dependencies (first time only)
npm install

# Start the development server
npm run dev
```

✅ Frontend is ready when you see:
```
Local: http://localhost:3000
```

---

### Step 4 — Open the App

1. Open **http://localhost:3000** in your browser
2. Upload your **PDF resume**
3. Paste the **Job Description** you're applying for
4. Click **Analyze** and wait a few seconds for the AI to respond
5. Review your **ATS score**, **missing keywords**, and **improvement suggestions**!

---

## ⚠️ Common Issues

| Problem | Cause | Fix |
|---------|-------|-----|
| `ModuleNotFoundError` | venv not activated | Run `.\venv\Scripts\activate` in `backend/` |
| `ollama: command not found` | Ollama not installed | Download from [ollama.com](https://ollama.com) |
| `Connection refused` on analyze | Backend not running | Make sure Step 2 is running on port 8000 |
| Blank page on frontend | Frontend not started | Make sure Step 3 is running on port 3000 |
| Slow analysis response | LLM processing | Normal — LLaMA 3 can take 10–60 seconds locally |

## Usage

1. Open http://localhost:3000 in your browser.
2. Upload your Resume as a `.pdf` file.
3. Paste the Job Description you are applying for in the text box.
4. Click **Analyze** and wait for the AI to process your resume.
5. Review your ATS score, missing keywords, and enhancement suggestions!

## Structure
```
.
├── backend
│   ├── main.py                     # FastAPI entry point
│   ├── services
│   │   ├── ollama_analyzer.py      # LLM integration logic
│   │   └── pdf_parser.py           # PyPDF2 extraction logic
│   └── venv                        # Python virtual environment (ignored)
├── frontend
│   ├── app
│   │   ├── globals.css             # Tailwind imports
│   │   ├── layout.js               # Next.js layout
│   │   └── page.js                 # Main UI Dashboard
│   ├── components
│   │   ├── AnalysisResults.js      # Results display component
│   │   └── ResumeUploader.js       # Upload form component
│   └── package.json                # Node dependencies
├── .gitignore
└── README.md
```
