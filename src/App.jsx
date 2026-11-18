import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  useNavigate,
} from "react-router-dom";
import "./App.css";

const API_URL = "http://localhost:5000/api/analyze";

const navItems = [
  { name: "Overview", path: "/", icon: "⌂" },
  { name: "AI Idea Analyzer", path: "/analyzer", icon: "✦" },
  { name: "Idea Validation", path: "/validation", icon: "◈" },
  { name: "Market Research", path: "/market", icon: "⌕" },
  { name: "Business Plan", path: "/business", icon: "▤" },
  { name: "Growth Strategy", path: "/growth", icon: "↗" },
  { name: "Startup Report", path: "/report", icon: "▧" },
];

// ==========================================
// MAIN APP
// ==========================================

function App() {
  const [idea, setIdea] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function analyze() {
    if (!idea.trim()) {
      setError("Please enter your startup idea first.");
      return false;
    }

    setLoading(true);
    setError("");
    setResult("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idea: idea.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Analysis failed. Please try again."
        );
      }

      setResult(data.analysis || "No analysis was generated.");

      return true;
    } catch (err) {
      setError(
        err.message ||
          "Unable to connect to AI. Please check your backend."
      );

      return false;
    } finally {
      setLoading(false);
    }
  }

  return (
    <BrowserRouter>
      <Layout
        idea={idea}
        setIdea={setIdea}
        result={result}
        loading={loading}
        error={error}
        analyze={analyze}
      />
    </BrowserRouter>
  );
}

// ==========================================
// LAYOUT
// ==========================================

function Layout(props) {
  return (
    <div className="app-shell">
      <Sidebar />

      <div className="main-area">
        <header className="topbar">
          <span>Startup Intelligence Platform</span>

          <span className="ai-status">
            <i />
            Local AI
          </span>
        </header>

        <main className="page-content">
          <Routes>
            <Route path="/" element={<Overview {...props} />} />

            <Route
              path="/analyzer"
              element={<Analyzer {...props} />}
            />

            <Route
              path="/validation"
              element={
                <ModulePage
                  title="Idea Validation"
                  {...props}
                />
              }
            />

            <Route
              path="/market"
              element={
                <ModulePage
                  title="Market Research"
                  {...props}
                />
              }
            />

            <Route
              path="/business"
              element={
                <ModulePage
                  title="Business Plan"
                  {...props}
                />
              }
            />

            <Route
              path="/growth"
              element={
                <ModulePage
                  title="Growth Strategy"
                  {...props}
                />
              }
            />

            <Route
              path="/report"
              element={<Report {...props} />}
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}

// ==========================================
// SIDEBAR
// ==========================================

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">✦</div>

        <div>
          <h2>
            AI STARTUP <span>CO-FOUNDER</span>
          </h2>

          <small>STARTUP INTELLIGENCE</small>
        </div>
      </div>

      <div className="nav-heading">WORKSPACE</div>

      {navItems.slice(0, 2).map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === "/"}
          className={({ isActive }) =>
            `nav-link ${isActive ? "active" : ""}`
          }
        >
          <span className="nav-icon">{item.icon}</span>
          {item.name}
        </NavLink>
      ))}

      <div className="nav-heading">INTELLIGENCE</div>

      {navItems.slice(2, 6).map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `nav-link ${isActive ? "active" : ""}`
          }
        >
          <span className="nav-icon">{item.icon}</span>
          {item.name}
        </NavLink>
      ))}

      <div className="nav-heading">DELIVERABLES</div>

      <NavLink
        to="/report"
        className={({ isActive }) =>
          `nav-link ${isActive ? "active" : ""}`
        }
      >
        <span className="nav-icon">▧</span>
        Startup Report
      </NavLink>

      <div className="sidebar-bottom">
        <div className="local-ai">
          <span className="green-dot" />

          <div>
            <strong>AI Engine</strong>
            <small>Ollama · Local</small>
          </div>
        </div>

        <p>Ideas → Insights → Execution</p>
      </div>
    </aside>
  );
}

// ==========================================
// PAGE HEADER
// ==========================================

function PageHeader({ eyebrow, title, description }) {
  return (
    <div className="page-header">
      <span className="eyebrow">{eyebrow}</span>

      <h1>{title}</h1>

      <p>{description}</p>
    </div>
  );
}

// ==========================================
// OVERVIEW
// ==========================================

function Overview({ idea, setIdea, result }) {
  const navigate = useNavigate();

  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <span className="eyebrow light">
            YOUR STARTUP JOURNEY
          </span>

          <h1>
            Start Smarter.
            <br />
            <span>Build Smarter.</span>
          </h1>

          <p>
            Turn your startup idea into a clear plan.
            Validate opportunities, understand your market
            and build strategies for growth.
          </p>

          <button
            className="primary-button"
            onClick={() => navigate("/analyzer")}
          >
            Analyze your idea <span>↗</span>
          </button>
        </div>

        <div className="hero-art">
          <div className="orbit orbit-1" />
          <div className="orbit orbit-2" />
          <div className="orbit orbit-3" />

          <div className="hero-core">
            V<span>✦</span>
          </div>

          <div className="floating-card card-a">
            IDEA <b>↗</b>
          </div>

          <div className="floating-card card-b">
            INSIGHT <b>✦</b>
          </div>

          <div className="floating-card card-c">
            GROWTH <b>↗</b>
          </div>
        </div>
      </section>

      <div className="stats-grid">
        <Stat label="AI Modules" value="04" />

        <Stat label="AI Engine" value="LOCAL" />

        <Stat
          label="Analysis Status"
          value={result ? "READY" : "NEW"}
        />

        <Stat
          label="Idea Analysis"
          value={result ? "DONE" : "—"}
        />
      </div>

      <div className="section-title">
        <div>
          <h2>Your workspace</h2>
          <p>Explore your startup intelligence tools.</p>
        </div>
      </div>

      <div className="feature-grid">
        {navItems.slice(1).map((item, index) => (
          <button
            key={item.path}
            className="feature-card"
            onClick={() => navigate(item.path)}
          >
            <div className="feature-icon">
              {item.icon}
            </div>

            <span className="feature-arrow">↗</span>

            <h3>{item.name}</h3>

            <p>
              {
                [
                  "Analyze your idea and generate startup insights.",
                  "Evaluate feasibility, strengths and risks.",
                  "Understand customers, competitors and market opportunities.",
                  "Explore revenue models and business costs.",
                  "Plan launch activities and sustainable growth.",
                  "View your complete startup intelligence report.",
                ][index]
              }
            </p>

            <span className="feature-link">
              Explore module →
            </span>
          </button>
        ))}
      </div>

      <div className="section-title">
        <div>
          <h2>Sample startup ideas</h2>
          <p>Click an example to start your analysis.</p>
        </div>
      </div>

      <div className="sample-grid">
        {[
          [
            "🎓",
            "CareerFinder",
            "EdTech",
            "An AI platform helping students find internships and prepare for interviews.",
          ],
          [
            "🌱",
            "FarmConnect",
            "AgriTech",
            "Connecting farmers directly with customers and restaurants.",
          ],
          [
            "🩺",
            "HealthTrack",
            "HealthTech",
            "A digital platform for tracking wellness habits and fitness goals.",
          ],
        ].map(([icon, name, category, text]) => (
          <button
            className="sample-card"
            key={name}
            onClick={() => {
              setIdea(text);
              navigate("/analyzer");
            }}
          >
            <span className="sample-icon">{icon}</span>

            <small>{category}</small>

            <h3>{name}</h3>

            <p>{text}</p>

            <span className="feature-link">
              Use this idea ↗
            </span>
          </button>
        ))}
      </div>
    </>
  );
}

// ==========================================
// STAT CARD
// ==========================================

function Stat({ label, value }) {
  return (
    <div className="stat-card">
      <small>{label}</small>
      <h2>{value}</h2>
    </div>
  );
}

// ==========================================
// AI IDEA ANALYZER
// ==========================================

function Analyzer({
  idea,
  setIdea,
  result,
  loading,
  error,
  analyze,
}) {
  const navigate = useNavigate();

  async function handleSubmit() {
    const success = await analyze();

    if (success) {
      navigate("/report");
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="IDEA WORKBENCH"
        title="AI Idea Analyzer"
        description="Describe your startup idea and let AI transform it into simple, useful insights."
      />

      <div className="analyzer-grid">
        <section className="input-panel">
          <h2>Describe your idea</h2>

          <p>
            Include your problem, solution and target customers.
          </p>

          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Describe your startup idea here..."
          />

          <div className="text-count">
            {idea.length} characters
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <button
            className="primary-button full-button"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading
              ? "AI is analyzing your idea..."
              : "Generate AI Analysis"}

            <span>
              {loading ? "⏳" : "→"}
            </span>
          </button>

          {loading && (
            <p className="loading">
              Please wait. This may take a little time.
            </p>
          )}
        </section>

        <section className="info-panel">
          <span className="eyebrow">AI ANALYSIS</span>

          <h2>
            Four perspectives.
            <br />
            One startup idea.
          </h2>

          {[
            "Idea Validation",
            "Market Research",
            "Business Plan",
            "Growth Strategy",
          ].map((text, i) => (
            <div className="info-row" key={text}>
              <span>0{i + 1}</span>
              {text}
              <b>↗</b>
            </div>
            ))}
        </section>
      </div>

      {result && (
        <section className="data-card" style={{ marginTop: "24px" }}>
          <h2>Analysis Generated Successfully!</h2>

          <p>
            Your startup analysis is ready in simple English.
          </p>

          <button
            className="primary-button"
            onClick={() => navigate("/report")}
          >
            View Startup Report ↗
          </button>
        </section>
      )}
    </>
  );
}

// ==========================================
// EXTRACT SECTIONS FROM AI RESPONSE
// ==========================================

function getModuleContent(result, title) {
  if (!result) return "";

  const sections = {};

  const headingRegex = /^##\s*(?:\d+\.\s*)?(.+)$/gm;

  const matches = [...result.matchAll(headingRegex)];

  for (let i = 0; i < matches.length; i++) {
    const heading = matches[i][1].trim();

    const start =
      matches[i].index + matches[i][0].length;

    const end =
      i + 1 < matches.length
        ? matches[i + 1].index
        : result.length;

    sections[heading.toLowerCase()] =
      result.substring(start, end).trim();
  }

  const sectionMap = {
    "Idea Validation": [
      "Startup Idea",
      "Problem",
      "Target Customers",
      "SWOT Analysis",
      "Final Verdict",
    ],

    "Market Research": [
      "Market Opportunity",
      "Competitors",
    ],

    "Business Plan": [
      "Revenue Model",
      "Risks",
      "Improvements",
    ],

    "Growth Strategy": [
      "Growth Strategy",
    ],
  };

  const selectedSections = sectionMap[title] || [];

  return selectedSections
    .map((name) => {
      const content = sections[name.toLowerCase()];

      if (!content) return null;

      return `## ${name}\n\n${content}`;
    })
    .filter(Boolean)
    .join("\n\n");
}

// ==========================================
// INTELLIGENCE MODULES
// ==========================================

function ModulePage({
  title,
  idea,
  result,
  loading,
  error,
}) {
  const navigate = useNavigate();

  const moduleContent = result
    ? getModuleContent(result, title)
    : "";

  return (
    <>
      <PageHeader
        eyebrow="STARTUP INTELLIGENCE"
        title={title}
        description="AI-powered insights for your startup idea."
      />

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {loading && (
        <div className="loading">
          Analyzing your startup idea...
        </div>
      )}

      {!result && !loading && (
        <div className="empty-card">
          <div className="empty-icon">✦</div>

          <h2>Analysis not available yet</h2>

          <p>
            First analyze your startup idea to unlock
            this section.
          </p>

          <button
            className="primary-button"
            onClick={() => navigate("/analyzer")}
          >
            Analyze startup idea →
          </button>
        </div>
      )}

      {result && (
        <>
          <div className="idea-box">
            <small>YOUR STARTUP IDEA</small>

            <p>{idea}</p>
          </div>

          <section className="data-card analysis-card">
            <h2>{title}</h2>

            {moduleContent ? (
              <div
                style={{
                  whiteSpace: "pre-wrap",
                  lineHeight: "1.8",
                  overflowWrap: "anywhere",
                }}
              >
                {moduleContent}
              </div>
            ) : (
              <p>
                This section was not found in the AI response.
                Please analyze your idea again.
              </p>
            )}
          </section>
        </>
      )}
    </>
  );
}

// ==========================================
// ANALYSIS CARD
// ==========================================

function AnalysisCard({ result }) {
  return (
    <section className="data-card analysis-card">
      <h2>AI Startup Analysis</h2>

      <div
        style={{
          whiteSpace: "pre-wrap",
          lineHeight: "1.8",
          overflowWrap: "anywhere",
        }}
      >
        {result}
      </div>
    </section>
  );
}

// ==========================================
// STARTUP REPORT
// ==========================================

function Report({ result, idea }) {
  return (
    <>
      <PageHeader
        eyebrow="DELIVERABLE"
        title="Startup Report"
        description="Your complete AI-generated startup analysis in simple English."
      />

      {!result ? (
        <div className="empty-card">
          <h2>No report generated yet</h2>

          <p>
            Analyze an idea to generate your startup report.
          </p>

          <NavLink
            to="/analyzer"
            className="primary-button"
          >
            Start analysis →
          </NavLink>
        </div>
      ) : (
        <div className="report">
          <h2>Startup Intelligence Report</h2>

          <div className="idea-box">
            <small>STARTUP IDEA</small>

            <p>{idea}</p>
          </div>

          <AnalysisCard result={result} />

          <button
            className="primary-button"
            onClick={() => window.print()}
          >
            Print / Save as PDF ↗
          </button>
        </div>
      )}
    </>
  );
}

export default App;