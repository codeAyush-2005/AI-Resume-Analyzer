from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
from services.pdf_parser import extract_text_from_pdf
from services.ollama_analyzer import analyze_resume

app = FastAPI(title="AI Resume Analyzer API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/analyze-resume")
async def analyze_resume_endpoint(
    resume: UploadFile = File(...),
    jd_text: str = Form(None)
):
    if not resume.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
    
    try:
        # Extract text from PDF
        pdf_content = await resume.read()
        resume_text = extract_text_from_pdf(pdf_content)
        
        # Analyze using Ollama
        result = analyze_resume(resume_text, jd_text)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
