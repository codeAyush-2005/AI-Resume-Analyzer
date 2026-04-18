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

### Prerequisites

1. **Node.js** (v18+) for the frontend.
2. **Python** (v3.9+) for the backend.
3. **Ollama**: Download and install [Ollama](https://ollama.com/).
   - Pull the required model by running:
     ```bash
     ollama run llama3
     ```
     *(Note: Replace `llama3` with whatever specific model is configured in your `ollama_analyzer.py` file).*

### Installation & Running the App

#### 1. Start the Backend server

Open a terminal and navigate to the backend directory:
```bash
cd backend

# Create a virtual environment (recommended)
python -m venv venv
# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies (if you have a requirements.txt)
pip install fastapi uvicorn pydantic PyPDF2 python-multipart

# Start the FastAPI server
python main.py
```
*The backend will be running at http://localhost:8000*

#### 2. Start the Frontend server

Open a new terminal and navigate to the frontend directory:
```bash
cd frontend

# Install Node dependencies
npm install

# Start the development server
npm run dev
```
*The frontend will be running at http://localhost:3000*

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
