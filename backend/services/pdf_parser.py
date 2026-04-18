import io
import PyPDF2

def extract_text_from_pdf(pdf_bytes: bytes) -> str:
    """Extracts raw text from a PDF file."""
    reader = PyPDF2.PdfReader(io.BytesIO(pdf_bytes))
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    return text.strip()
