"use client";

export default function AnalysisResults({ results }) {
  if (results.error) {
    return (
      <div className="glass-panel" style={{ border: "1px solid var(--error-color)" }}>
        <h3 style={{ color: "var(--error-color)" }}>Analysis Error</h3>
        <p>{results.error}</p>
        <pre style={{ background: "rgba(0,0,0,0.5)", padding: "1rem", marginTop: "1rem", borderRadius: "8px", overflowX: "auto" }}>
          {results.raw_response}
        </pre>
      </div>
    );
  }

  const { ats_score, missing_keywords, section_feedback, rewrites } = results;

  // Calculate score color
  let scoreColor = "var(--error-color)";
  if (ats_score >= 80) scoreColor = "var(--success-color)";
  else if (ats_score >= 50) scoreColor = "#f59e0b"; // Warning orange

  return (
    <div className="results-container flex" style={{ gap: "2rem", flexDirection: "column" }}>

      {/* Top Banner: Score & Keywords */}
      <div className="flex" style={{ gap: "2rem", flexWrap: "wrap" }}>

        {/* Score Card */}
        <div className="glass-panel text-center" style={{ flex: "1", minWidth: "250px" }}>
          <h2 style={{ fontSize: "1.2rem", color: "var(--text-secondary)", marginBottom: "1rem" }}>ATS Match Score</h2>
          <div style={{ position: "relative", width: "150px", height: "150px", margin: "0 auto" }}>
            <svg viewBox="0 0 36 36" style={{ width: "100%", height: "100%" }}>
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="var(--glass-border)"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke={scoreColor}
                strokeWidth="3"
                strokeDasharray={`${ats_score}, 100`}
                style={{ transition: "stroke-dasharray 1.5s ease-out" }}
              />
            </svg>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontSize: "2.5rem", fontWeight: "700" }}>
              {ats_score}%
            </div>
          </div>
        </div>

        {/* Missing Keywords */}
        <div className="glass-panel" style={{ flex: "2", minWidth: "300px" }}>
          <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>Missing Keywords</h2>
          {missing_keywords && missing_keywords.length > 0 ? (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {missing_keywords.map((keyword, index) => (
                <span key={index} style={{
                  background: "rgba(239, 68, 68, 0.1)",
                  color: "var(--error-color)",
                  border: "1px solid rgba(239, 68, 68, 0.2)",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "999px",
                  fontSize: "0.875rem",
                  fontWeight: "500"
                }}>
                  {keyword}
                </span>
              ))}
            </div>
          ) : (
            <p style={{ color: "var(--success-color)" }}>Great job! You hit all the major keywords.</p>
          )}
        </div>
      </div>

      {/* Section Feedback */}
      <div className="glass-panel">
        <h2 style={{ marginBottom: "1.5rem" }}>Section Feedback</h2>
        {section_feedback && Object.keys(section_feedback).length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {Object.entries(section_feedback).map(([section, feedback], idx) => (
              <div key={idx} style={{ background: "rgba(0,0,0,0.2)", padding: "1rem", borderRadius: "8px", borderLeft: "4px solid var(--accent-color)" }}>
                <h4 style={{ marginBottom: "0.5rem", color: "var(--text-primary)" }}>{section}</h4>
                <p style={{ color: "var(--text-secondary)", lineHeight: "1.5" }}>{feedback}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No specific layout feedback found.</p>
        )}
      </div>

      {/* AI Rewrites */}
      <div className="glass-panel mb-8">
        <h2 style={{ marginBottom: "1.5rem" }}>AI Speculative Rewrites</h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
          We found some weak bullet points. Here is how you can make them sound more impactful and action-oriented.
        </p>

        {rewrites && rewrites.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {rewrites.map((item, idx) => (
              <div key={idx} style={{ background: "rgba(0,0,0,0.2)", borderRadius: "8px", overflow: "hidden", border: "1px solid var(--glass-border)" }}>
                <div style={{ padding: "1rem", background: "rgba(239, 68, 68, 0.05)", borderBottom: "1px solid var(--glass-border)" }}>
                  <span style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: "700", color: "var(--error-color)", letterSpacing: "1px", marginBottom: "0.25rem", display: "block" }}>Original</span>
                  <p style={{ color: "var(--text-secondary)" }}>"{item.original}"</p>
                </div>
                <div style={{ padding: "1rem", background: "rgba(16, 185, 129, 0.05)" }}>
                  <span style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: "700", color: "var(--success-color)", letterSpacing: "1px", marginBottom: "0.25rem", display: "block" }}>AI Rewritten</span>
                  <p>"{item.improved}"</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Your bullet points look great! No major rewrites suggested.</p>
        )}
      </div>
    </div>
  );
}
