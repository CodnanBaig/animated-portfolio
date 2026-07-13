import type { ProjectVisual as VisualType } from "@/data/portfolio";

export function ProjectVisual({ type, compact = false }: { type: VisualType; compact?: boolean }) {
  return (
    <div className={`project-visual visual-${type} ${compact ? "is-compact" : ""}`} aria-hidden="true">
      <div className="visual-grid" />
      {type === "distribution" && (
        <div className="mock-window dashboard-mock">
          <div className="mock-top"><i/><i/><i/><span>release.control</span></div>
          <div className="mock-body dashboard-layout">
            <div className="mock-sidebar"><b/><b/><b/><b/><b/></div>
            <div className="dashboard-content">
              <div className="metric-row"><b/><b/><b/></div>
              <div className="chart"><span/><span/><span/><span/><span/><span/></div>
              <div className="table-lines"><i/><i/><i/><i/></div>
            </div>
          </div>
        </div>
      )}
      {type === "resume" && (
        <div className="resume-scene">
          <div className="resume-page back"><i/><i/><i/><i/></div>
          <div className="resume-page front"><b>AB</b><i/><i/><i/><span/><span/><span/></div>
          <div className="ai-chip">AI / EDIT</div>
        </div>
      )}
      {type === "wave" && (
        <div className="wave-scene">
          <div className="wave-disc"><i/><i/><i/></div>
          <div className="wave-line one"/><div className="wave-line two"/><div className="wave-line three"/>
          <div className="wave-panel"><span>01:28</span><b/><b/><b/><b/></div>
        </div>
      )}
      {type === "training" && (
        <div className="phone-scene">
          <div className="phone-frame">
            <div className="phone-notch"/>
            <div className="round-timer"><span>03</span><small>ROUND</small></div>
            <div className="combo-bars"><i/><i/><i/><i/></div>
            <div className="phone-nav"><b/><b/><b/></div>
          </div>
          <div className="strike-path"><i/><i/><i/></div>
        </div>
      )}
      {type === "finance" && (
        <div className="finance-scene">
          <div className="balance-card"><small>AVAILABLE</small><strong>₹ 42,850</strong><div className="spark"><i/><i/><i/><i/><i/><i/></div></div>
          <div className="receipt"><span/><span/><span/><span/><b/></div>
          <div className="coin coin-one">₹</div><div className="coin coin-two">₹</div>
        </div>
      )}
      {type === "studio" && (
        <div className="mock-window studio-mock">
          <div className="mock-top"><i/><i/><i/><span>kenmark / studio</span></div>
          <div className="studio-layout">
            <div className="studio-rail"><b/><b/><b/><b/><b/><b/></div>
            <div className="studio-tree"><span/><span/><span/><span/><span/></div>
            <div className="studio-code">
              <em/><em/><em/><em/><em/><em/><em/><em/>
              <div className="agent-card"><small>AGENT RUN</small><b/><b/><b/></div>
            </div>
          </div>
        </div>
      )}
      <div className="visual-shine" />
    </div>
  );
}
