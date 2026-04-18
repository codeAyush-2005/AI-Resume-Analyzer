"use client";

import { useState } from "react";

export default function ResumeUploader({ onAnalyze }) {
  const [file, setFile] = useState(null);
  const [jdText, setJdText] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile);
      } else {
        alert("Please upload a PDF file.");
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);
    if (jdText) {
      formData.append("jd_text", jdText);
    }

    onAnalyze(formData);
  };

  return (
    <div className="glass-panel" style={{ maxWidth: "800px", margin: "0 auto" }}>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="input-label">1. Upload your Resume (PDF)</label>
          <div 
            className="dropzone"
            style={{
              border: `2px dashed ${dragActive ? 'var(--accent-color)' : 'var(--glass-border)'}`,
              borderRadius: "12px",
              padding: "3rem 2rem",
              textAlign: "center",
              background: dragActive ? "rgba(99, 102, 241, 0.1)" : "rgba(0,0,0,0.2)",
              transition: "all 0.2s ease",
              cursor: "pointer"
            }}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => document.getElementById("file-upload").click()}
          >
            <input 
              id="file-upload" 
              type="file" 
              accept=".pdf" 
              onChange={handleChange} 
              style={{ display: "none" }} 
            />
            {file ? (
              <div>
                <h4 style={{ color: "var(--success-color)", marginBottom: "0.5rem" }}>File Selected</h4>
                <p>{file.name}</p>
              </div>
            ) : (
              <div>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto 1rem", color: "var(--text-secondary)" }}>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                <p>Drag and drop your PDF here, or click to browse</p>
              </div>
            )}
          </div>
        </div>

        <div className="input-group mt-8">
          <label className="input-label">2. Paste Job Description (Optional)</label>
          <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>
            Helps the AI score your resume explicitly against the required skills.
          </p>
          <textarea 
            className="textarea-input" 
            placeholder="Paste the job description text here..."
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
          ></textarea>
        </div>

        <button 
          type="submit" 
          className="btn" 
          disabled={!file} 
          style={{ width: "100%", padding: "1rem", fontSize: "1.1rem", marginTop: "1rem" }}
        >
          Analyze Resume ✨
        </button>
      </form>
    </div>
  );
}
