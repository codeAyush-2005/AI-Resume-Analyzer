"use client";

import { useState } from "react";
import ResumeUploader from "../components/ResumeUploader";
import AnalysisResults from "../components/AnalysisResults";

export default function Home() {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async (formData) => {
    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const response = await fetch("http://localhost:8000/api/analyze-resume", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to analyze resume. Make sure the backend and Ollama are running.");
      }

      const data = await response.json();
      setAnalysis(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="text-center mb-8 mt-4">
        <h1 style={{ fontSize: "3rem", marginBottom: "0.5rem", background: "linear-gradient(to right, #6366f1, #10b981)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          AI Resume Analyzer
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem" }}>
          Optimize your resume to pass the ATS and land your dream job.
        </p>
      </div>

      {!analysis && !loading && (
        <ResumeUploader onAnalyze={handleAnalyze} />
      )}

      {loading && (
        <div className="glass-panel text-center mt-8">
          <div className="loader" style={{ margin: "0 auto", width: "50px", height: "50px", border: "4px solid rgba(255,255,255,0.1)", borderTop: "4px solid var(--accent-color)", borderRadius: "50%", animation: "spin 1s linear infinite" }}></div>
          <h3 className="mt-4">Analyzing Resume...</h3>
          <p style={{ color: "var(--text-secondary)" }}>Ollama is reading and grading your resume. This may take a minute.</p>
          <style jsx>{`
            @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
          `}</style>
        </div>
      )}

      {error && (
        <div className="glass-panel mt-8" style={{ border: "1px solid var(--error-color)" }}>
          <h3 style={{ color: "var(--error-color)" }}>Error</h3>
          <p>{error}</p>
          <button className="btn mt-4" onClick={() => setError(null)}>Try Again</button>
        </div>
      )}

      {analysis && !loading && (
        <div>
          <button className="btn mb-4" onClick={() => setAnalysis(null)} style={{ background: "transparent", border: "1px solid var(--glass-border)" }}>
            ← Analyze Another Resume
          </button>
          <AnalysisResults results={analysis} />
        </div>
      )}
    </main>
  );
}
