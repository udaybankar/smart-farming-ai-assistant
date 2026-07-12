import './About.css';

const DEVELOPER = {
  name:       'Uday Raju Bankar',
  initials:   'UB',
  role:       'Data Science Engineering Student',
  college:    'MIT Academy of Engineering (MITAOE), Alandi, Pune',
  dept:       'Computer Science and Engineering (Data Science)',
  about:      'Passionate about Artificial Intelligence, Machine Learning, Data Science, and Smart Agriculture. This project was developed to help farmers make informed decisions using AI-powered technologies such as IBM Watson Orchestrate, React, and modern web development tools. My goal is to build practical AI solutions that improve agricultural productivity and sustainability.',
  skills: [
    { label: 'Artificial Intelligence', icon: '🧠' },
    { label: 'Data Science',            icon: '📊' },
    { label: 'Python',                  icon: '🐍' },
    { label: 'React.js',                icon: '⚛️' },
    { label: 'IBM Watson Orchestrate',  icon: '🤖' },
    { label: 'IBM Cloud',               icon: '☁️' },
    { label: 'Java',                    icon: '☕' },
    { label: 'C Programming',           icon: '💻' },
    { label: 'Git & GitHub',            icon: '🔗' },
  ],
  vision: 'To create an intelligent digital farming assistant that provides AI-powered crop guidance, disease detection, weather insights, fertilizer recommendations, and multilingual farmer support, making modern technology accessible to every farmer.',
  roadmap: [
    'AI Crop Disease Detection using Computer Vision',
    'Live Weather Forecast Integration',
    'Voice Assistant (English, Hindi, Marathi)',
    'Market Price Prediction',
    'Smart Irrigation Recommendation',
    'IoT Sensor Integration',
    'Drone & Satellite Image Analysis',
    'Mobile Application Development',
  ],
  github:   'https://github.com',
  linkedin: 'https://linkedin.com',
  email:    'mailto:udaybankar@example.com',
};

const TECH = [
  { name: 'React 19',                icon: '⚛️', role: 'UI Framework',             color: '#61dafb', link: 'https://react.dev' },
  { name: 'Vite 8',                  icon: '⚡', role: 'Build Tool',               color: '#646cff', link: 'https://vitejs.dev' },
  { name: 'IBM Watson Orchestrate',  icon: '🤖', role: 'AI Agent Platform',         color: '#1d70c4', link: 'https://ibm.com/watson' },
  { name: 'IBM Granite',             icon: '🧠', role: 'Foundation LLM',            color: '#0f62fe', link: 'https://ibm.com/granite' },
  { name: 'IBM Cloud',               icon: '☁️', role: 'Deployment & Infra',        color: '#0043ce', link: 'https://cloud.ibm.com' },
  { name: 'Python / FastAPI',        icon: '🐍', role: 'Backend API',               color: '#3776ab', link: 'https://fastapi.tiangolo.com' },
  { name: 'TensorFlow / Keras',      icon: '📊', role: 'Disease Detection CNN',     color: '#ff6f00', link: 'https://tensorflow.org' },
  { name: 'OpenWeather API',         icon: '🌤️', role: 'Weather Data',              color: '#e87b30', link: 'https://openweathermap.org' },
  { name: 'PostgreSQL',              icon: '🗄️', role: 'Relational Database',       color: '#336791', link: 'https://postgresql.org' },
];

const OBJECTIVES = [
  { icon: '🌾', title: 'Increase Crop Yields',          desc: 'AI-guided decisions help farmers achieve up to 30% higher yields through precision inputs and timely interventions.' },
  { icon: '💧', title: 'Reduce Resource Waste',         desc: 'Optimise water, fertilizer, and pesticide usage to cut input costs by 20–25% while protecting the environment.' },
  { icon: '🔬', title: 'Early Disease Detection',       desc: 'Detect crop diseases before they spread, minimising losses and reducing the need for broad-spectrum chemical treatments.' },
  { icon: '🌍', title: 'Support Sustainable Agriculture',desc: 'Promote practices that maintain soil health and biodiversity for long-term food security.' },
  { icon: '📱', title: 'Democratise Farm Tech',         desc: 'Make enterprise-grade AI accessible to smallholder farmers worldwide, regardless of technical background.' },
  { icon: '🤝', title: 'Connect Farmers to Experts',    desc: 'Bridge the knowledge gap between research institutions and farming communities through AI-mediated guidance.' },
];

const ARCHITECTURE = [
  { layer: 'Frontend',    desc: 'React 19 + Vite 8 SPA',         tech: ['React Router', 'CSS Variables', 'Responsive Design'] },
  { layer: 'AI Layer',    desc: 'IBM Watson & Granite LLMs',      tech: ['Watson Orchestrate', 'Granite-13B', 'IBM NLP'] },
  { layer: 'ML Models',   desc: 'Disease detection pipeline',     tech: ['TensorFlow CNN', 'Transfer Learning', 'MobileNetV3'] },
  { layer: 'Backend',     desc: 'REST API & data processing',     tech: ['Python FastAPI', 'scikit-learn', 'Redis Cache'] },
  { layer: 'Cloud',       desc: 'IBM Cloud infrastructure',       tech: ['Cloud Foundry', 'Watson APIs', 'IBM COS'] },
  { layer: 'Database',    desc: 'Structured & time-series data',  tech: ['PostgreSQL', 'InfluxDB', 'IBM Cloudant'] },
];

const TIMELINE = [
  {
    week:   'Week 1',
    label:  'Research & Planning',
    icon:   '🔍',
    status: 'completed',
    color:  '#16a34a',
    tasks: [
      'Identified farmers\u2019 problems and project objectives.',
      'Studied IBM Watsonx Orchestrate, Granite models, and React.',
      'Designed UI wireframes and project architecture.',
    ],
  },
  {
    week:   'Week 2',
    label:  'Frontend Development',
    icon:   '💻',
    status: 'completed',
    color:  '#2563eb',
    tasks: [
      'Developed responsive React interface.',
      'Created Dashboard, Crop Disease Detection, Weather, Fertilizer Recommendation, AI Chatbot, and About pages.',
      'Added routing, navigation, and modern UI components.',
    ],
  },
  {
    week:   'Week 3',
    label:  'AI Integration',
    icon:   '🤖',
    status: 'completed',
    color:  '#7c3aed',
    tasks: [
      'Connected IBM Watsonx Orchestrate Agent.',
      'Configured IBM Cloud Project, API credentials, and GPT-OSS model.',
      'Integrated AI chatbot with farming knowledge and multilingual support.',
    ],
  },
  {
    week:   'Week 4',
    label:  'Testing & Deployment',
    icon:   '🚀',
    status: 'launched',
    color:  '#d97706',
    tasks: [
      'Performed UI testing and bug fixes.',
      'Optimized performance and responsiveness.',
      'Prepared project documentation, GitHub repository, and deployment for final submission.',
    ],
  },
];

export default function About() {
  return (
    <div className="page about-page">

      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-badge">🌾 Open Source Agricultural AI</div>
        <h1 className="about-hero-title">About Smart Farming AI</h1>
        <p className="about-hero-desc">
          We're democratising precision agriculture — putting the power of IBM AI directly
          into the hands of every farmer, regardless of farm size or technical expertise.
        </p>
        <div className="hero-stats-row">
          {[['10K+','Farmers Helped'],['95%','Accuracy'],['50+','Crops'],['4','AI Models']].map(([v,l]) => (
            <div key={l} className="hero-stat">
              <span className="hs-value">{v}</span>
              <span className="hs-label">{l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Objectives */}
      <section className="about-section">
        <h2 className="about-section-title">🎯 Project Objectives</h2>
        <div className="objectives-grid">
          {OBJECTIVES.map(o => (
            <div key={o.title} className="card obj-card">
              <div className="obj-icon">{o.icon}</div>
              <h3 className="obj-title">{o.title}</h3>
              <p className="obj-desc">{o.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture */}
      <section className="about-section">
        <h2 className="about-section-title">🏗️ System Architecture</h2>
        <div className="architecture-table">
          {ARCHITECTURE.map((a, i) => (
            <div key={a.layer} className={`arch-row ${i % 2 === 0 ? '' : 'alt'}`}>
              <div className="arch-layer">{a.layer}</div>
              <div className="arch-desc">{a.desc}</div>
              <div className="arch-tech-list">
                {a.tech.map(t => <span key={t} className="arch-chip">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technologies */}
      <section className="about-section">
        <h2 className="about-section-title">⚙️ Technology Stack</h2>
        <div className="tech-grid">
          {TECH.map(t => (
            <div key={t.name} className="card tech-card">
              <div className="tc-icon-wrap" style={{ background: t.color + '18', borderColor: t.color + '44' }}>
                <span className="tc-icon">{t.icon}</span>
              </div>
              <div className="tc-body">
                <div className="tc-name">{t.name}</div>
                <div className="tc-role">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="ibm-callout">
          <div className="ibm-logo">🔵 IBM</div>
          <div className="ibm-text">
            <strong>Powered by IBM Technology</strong>
            <p>This project leverages IBM Watson Orchestrate for AI agent workflows and IBM Granite for the large language model — enabling intelligent, context-aware farming assistance.</p>
          </div>
        </div>
      </section>

      {/* ── Internship Timeline ── */}
      <section className="about-section">
        <h2 className="about-section-title">🗓️ Internship Timeline</h2>
        <p className="tl-subtitle">4-week development sprint — all milestones completed ✅</p>

        {/* Progress bar */}
        <div className="tl-progress-wrap">
          <div className="tl-progress-track">
            <div className="tl-progress-fill" />
            {TIMELINE.map((t, i) => (
              <div
                key={i}
                className="tl-progress-dot"
                style={{ left: `${(i / (TIMELINE.length - 1)) * 100}%`, background: t.color }}
              />
            ))}
          </div>
          <div className="tl-progress-labels">
            {TIMELINE.map(t => (
              <span key={t.week} className="tl-progress-label">{t.week}</span>
            ))}
          </div>
        </div>

        {/* Horizontal cards */}
        <div className="tl-cards-row">
          {TIMELINE.map((t, i) => (
            <div
              key={i}
              className={`tl-week-card card animate-fade-up delay-${i + 1}`}
              style={{ '--wc': t.color }}
            >
              {/* Card header */}
              <div className="twc-header" style={{ background: t.color }}>
                <div className="twc-icon">{t.icon}</div>
                <div className="twc-week-label">{t.week}</div>
                <div className={`twc-status-badge ${t.status}`}>
                  {t.status === 'launched' ? '🚀 Launched' : '✅ Completed'}
                </div>
              </div>

              {/* Card body */}
              <div className="twc-body">
                <div className="twc-title">{t.label}</div>
                <ul className="twc-tasks">
                  {t.tasks.map((task, j) => (
                    <li key={j} className="twc-task">
                      <span className="twc-check" style={{ color: t.color }}>✓</span>
                      {task}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card footer connector number */}
              <div className="twc-num" style={{ color: t.color }}>
                0{i + 1}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Project Developer ── */}
      <section className="about-section">
        <h2 className="about-section-title">👨‍💻 Project Developer</h2>

        <div className="dev-card-wrap">
          {/* Left — profile card */}
          <div className="dev-profile-card glass-dev">
            {/* Avatar */}
            <div className="dev-avatar-ring">
              <div className="dev-avatar">
                <span className="dev-initials">{DEVELOPER.initials}</span>
              </div>
              <div className="dev-avatar-glow" />
            </div>

            <div className="dev-name">{DEVELOPER.name}</div>
            <div className="dev-role-badge">{DEVELOPER.role}</div>

            <div className="dev-meta">
              <div className="dev-meta-row">
                <span className="dev-meta-icon">🏛️</span>
                <span>{DEVELOPER.college}</span>
              </div>
              <div className="dev-meta-row">
                <span className="dev-meta-icon">🎓</span>
                <span>{DEVELOPER.dept}</span>
              </div>
            </div>

            <div className="dev-socials">
              <a href={DEVELOPER.github}   className="social-btn github"   aria-label="GitHub">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
                GitHub
              </a>
              <a href={DEVELOPER.linkedin} className="social-btn linkedin" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
              <a href={DEVELOPER.email}    className="social-btn email"    aria-label="Email">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                Email
              </a>
            </div>
          </div>

          {/* Right — details */}
          <div className="dev-details">
            {/* About */}
            <div className="card dev-about-card">
              <div className="dev-section-label">About Me</div>
              <p className="dev-about-text">{DEVELOPER.about}</p>
            </div>

            {/* Skills */}
            <div className="card dev-skills-card">
              <div className="dev-section-label">Skills & Technologies</div>
              <div className="dev-skills-grid">
                {DEVELOPER.skills.map(s => (
                  <div key={s.label} className="dev-skill-chip">
                    <span className="dev-skill-icon">{s.icon}</span>
                    {s.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Vision */}
            <div className="card dev-vision-card">
              <div className="dev-section-label">🌾 Project Vision</div>
              <p className="dev-vision-text">{DEVELOPER.vision}</p>
            </div>
          </div>
        </div>

        {/* Roadmap */}
        <div className="card dev-roadmap-card">
          <div className="dev-section-label" style={{ marginBottom: '1rem' }}>🚀 Future Roadmap</div>
          <div className="dev-roadmap-grid">
            {DEVELOPER.roadmap.map((item, i) => (
              <div key={i} className="roadmap-item">
                <div className="roadmap-num">{String(i + 1).padStart(2, '0')}</div>
                <div className="roadmap-text">{item}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="about-section mv-section">
        <div className="mv-grid">
          <div className="card mv-card">
            <div className="mv-icon">🎯</div>
            <h2>Our Mission</h2>
            <p>To provide every farmer with affordable, AI-driven tools that improve crop yields, reduce input waste, and build resilience against climate change.</p>
          </div>
          <div className="card mv-card">
            <div className="mv-icon">🌍</div>
            <h2>Our Vision</h2>
            <p>A world where data-driven agriculture eliminates food insecurity and every harvest is optimised for both productivity and sustainability.</p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <div className="card contact-section">
        <div className="contact-icon">📬</div>
        <h2>Get In Touch</h2>
        <p>Have questions, feedback, or want to collaborate on this project? Feel free to reach out!</p>
        <div className="contact-actions">
          <a
            href="mailto:udaybankar2007@gmail.com"
            className="contact-btn contact-btn-email"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" aria-hidden="true">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            Email Me
          </a>
          <a
            href="#"
            className="contact-btn contact-btn-github"
            aria-label="GitHub (Coming Soon)"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            GitHub
            <span className="contact-btn-soon">Coming Soon</span>
          </a>
          <a
            href="https://www.ibm.com/products/watsonx-orchestrate"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-btn contact-btn-ibm"
          >
            <span className="ibm-btn-dot">🔵</span>
            IBM watsonx Orchestrate
          </a>
        </div>
        <p className="contact-note">
          📧 <strong>udaybankar2007@gmail.com</strong>
        </p>
      </div>
    </div>
  );
}
