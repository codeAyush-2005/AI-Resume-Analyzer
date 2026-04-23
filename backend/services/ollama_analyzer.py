import ollama
import json

def analyze_resume(resume_text: str, jd_text: str = None) -> dict:
    """Analyzes the resume text against the job description using Ollama locally."""
    
    prompt = f"""
    You are an expert ATS (Applicant Tracking System) and career coach.
    Analyze the following resume against the provided Job Description (if any).
    Return your analysis strictly in JSON format as follows:
    {{
        "ats_score": <integer from 0 to 100>,
        "missing_keywords": [<list of missing important keywords>],
        "section_feedback": {{
            "Summary": "Feedback for summary",
            "Experience": "Feedback for experience",
            "Skills": "Feedback for skills"
        }},
        "rewrites": [
            {{
                "original": "<a weak bullet point from the resume>",
                "improved": "<an improved, impactful action-oriented bullet point>"
            }}
        ]
    }}

    If the Job Description is missing, judge the resume based on general best practices for its field.
    Omit the ```json markdown tags, only output the raw JSON object.

    RESUME CONTENT:
    {resume_text}

    JOB DESCRIPTION:
    {jd_text if jd_text else 'None provided, analyze generically.'}
    """
    
    # We will use 'llama3' as default. Make sure it's installed locally (`ollama run llama3`).
    response = ollama.chat(model='llama3', messages=[
        {
            'role': 'user',
            'content': prompt
        }
    ])
    
    try:
        # Extract response text and parse as JSON
        content = response['message']['content']
        # If the LLM still wrapped it in ```json ... ```, strip it
        if content.startswith("```json"):
            content = content[7:-3]
        elif content.startswith("```"):
            content = content[3:-3]
            
        return json.loads(content.strip())
    except json.JSONDecodeError as e:
        return {
            "error": "Failed to parse JSON response from Ollama",
            "raw_response": response['message']['content'],
            "decode_error": str(e)
        }
