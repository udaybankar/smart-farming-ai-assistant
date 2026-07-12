import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import './Home.css';

const features = [
  { icon: '🔬', title: 'Crop Disease Detection',  desc: 'Upload a crop photo and our CNN model identifies 50+ diseases with 95% accuracy in seconds.', to: '/disease',    color: '#16a34a', bg: '#f0fdf4' },
  { icon: '🌤️', title: 'Weather Intelligence',    desc: 'Hyper-local forecasts, soil moisture tracking, and agri-specific weather alerts.',               to: '/weather',    color: '#2563eb', bg: '#eff6ff' },
  { icon: '🌱', title: 'Fertilizer AI',           desc: 'Smart NPK recommendations based on soil pH, crop type, and seasonal data.',                      to: '/fertilizer', color: '#d97706', bg: '#fffbeb' },
  { icon: '🤖', title: 'AI Farming Chatbot',      desc: 'Powered by IBM Granite — your 24/7 expert assistant for all farming questions.',                  to: '/chatbot',    color: '#7c3aed', bg: '#f5f3ff' },
  { icon: '📊', title: 'Farm Dashboard',          desc: 'Real-time monitoring of weather, soil conditions, alerts, and crop activity.',                    to: '/dashboard',  color: '#0891b2', bg: '#ecfeff' },
  { icon: '📡', title: 'IoT Integration',         desc: 'Connect soil sensors, weather stations, and drones for fully automated insights.',                to: '/about',      color: '#dc2626', bg: '#fff1f2' },
];

const STATS = [
  { value: 10000, display: '10K+', label: 'Farmers Helped',     icon: '👨‍🌾', suffix: '+' },
  { value: 95,    display: '95%',  label: 'Detection Accuracy', icon: '🎯', suffix: '%' },
  { value: 50,    display: '50+',  label: 'Crop Varieties',     icon: '🌾', suffix: '+' },
  { value: 247,   display: '24/7', label: 'AI Assistance',      icon: '🤖', suffix: '' },
];

const steps = [
  { step: '01', icon: '📸', title: 'Upload or Input', desc: 'Take a photo of your crop or enter soil parameters.' },
  { step: '02', icon: '🧠', title: 'AI Analysis',     desc: 'Our models analyze your data using IBM AI and ML.' },
  { step: '03', icon: '📋', title: 'Get Insights',    desc: 'Receive actionable recommendations instantly.' },
];

const TESTIMONIALS = [
  { name: 'Ramesh Patil',    location: 'Nashik, Maharashtra', quote: 'SmartFarm AI helped me detect leaf blight before it spread. I saved nearly 40% of my tomato yield!',        crop: '🍅 Tomato Farmer',    rating: 5 },
  { name: 'Sunita Devi',     location: 'Ludhiana, Punjab',   quote: 'The fertilizer recommendation was spot-on. My wheat yield improved by 28% this rabi season.',              crop: '🌾 Wheat Farmer',     rating: 5 },
  { name: 'Arun Krishnan',   location: 'Coimbatore, Tamil Nadu', quote: 'Weather alerts saved my cotton crop from unexpected frost. The AI chatbot answers every question!',    crop: '🪴 Cotton Farmer',    rating: 5 },
  { name: 'Meera Sharma',    location: 'Jaipur, Rajasthan',  quote: 'As a first-generation farmer, this app was my guide. Incredibly easy to use and very accurate.',           crop: '🧅 Onion Farmer',     rating: 5 },
];

const PARTNERS = [
  { name: 'IBM Watson',     icon: '🔵', color: '#0f62fe' },
  { name: 'IBM Granite',    icon: '🧠', color: '#0043ce' },
  { name: 'IBM Cloud',      icon: '☁️', color: '#1d70c4' },
  { name: 'TensorFlow',     icon: '📊', color: '#ff6f00' },
  { name: 'OpenWeather',    icon: '🌤️', color: '#e87b30' },
  { name: 'React',          icon: '⚛️', color: '#61dafb' },
];

/* ── Animated counter hook ── */
function useCounter(target, duration = 1800, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, active]);
  return count;
}

function StatCard({ stat, active }) {
  const raw = useCounter(stat.value, 1800, active);
  /* Format nicely */
  const display =
    stat.suffix === '+' ? (raw >= 1000 ? Math.floor(raw / 1000) + 'K+' : raw + '+') :
    stat.suffix === '%' ? raw + '%' :
    stat.display; /* 24/7 – static */
  return (
    <div className="stat-card card">
      <div className="stat-icon">{stat.icon}</div>
      <div className="stat-value">{display}</div>
      <div className="stat-label">{stat.label}</div>
    </div>
  );
}

export default function Home() {
  const statsRef = useRef();
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="home">

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-bg-pattern" aria-hidden="true" />
        <div className="hero-particles" aria-hidden="true">
          {[...Array(6)].map((_, i) => <div key={i} className={`particle p${i + 1}`} />)}
        </div>

        <div className="hero-content container">
          <div className="hero-text animate-fade-up">
            <span className="hero-badge">
              <span className="badge-dot" />
              🌾 AI-Powered Agriculture Platform
            </span>
            <h1 className="hero-title">
              Farm Smarter with<br />
              <span className="hero-accent">Artificial Intelligence</span>
            </h1>
            <p className="hero-desc">
              Harness IBM AI, real-time weather data, and precision ML models to detect
              crop diseases, optimise fertilizer use, and get expert farming guidance — all in one platform.
            </p>
            <div className="hero-actions">
              <Link to="/disease" className="btn btn-white">🚀 Get Started Free</Link>
              <Link to="/chatbot" className="btn btn-ghost">🤖 Talk to AI</Link>
            </div>
            <div className="hero-trust">
              <span>🔒 No sign-up required</span>
              <span>⚡ Results in seconds</span>
              <span>🌍 Works worldwide</span>
            </div>
          </div>

          <div className="hero-visual animate-fade-in delay-3">
            <div className="hero-card-stack">
              <div className="hcard hcard-main glass-card animate-float">
                <div className="hcard-icon">🌡️</div>
                <div className="hcard-body">
                  <div className="hcard-label">Temperature</div>
                  <div className="hcard-value">24°C</div>
                  <div className="hcard-sub tag tag-green">✓ Optimal</div>
                </div>
              </div>
              <div className="hcard hcard-secondary glass-card animate-float" style={{ animationDelay: '.4s' }}>
                <div className="hcard-icon">💧</div>
                <div className="hcard-body">
                  <div className="hcard-label">Soil Moisture</div>
                  <div className="hcard-value">68%</div>
                  <div className="hcard-sub tag tag-green">✓ Good</div>
                </div>
              </div>
              <div className="hcard hcard-alert glass-card animate-float" style={{ animationDelay: '.8s' }}>
                <div className="hcard-icon">🔬</div>
                <div className="hcard-body">
                  <div className="hcard-label">Disease Risk</div>
                  <div className="hcard-value">Low</div>
                  <div className="hcard-sub tag tag-green">✓ Healthy</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-wave" aria-hidden="true">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#f9fafb"/>
          </svg>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="stats-section" ref={statsRef}>
        <div className="container stats-grid">
          {STATS.map((s, i) => (
            <StatCard key={s.label} stat={s} active={statsVisible} />
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="features-section container">
        <h2 className="section-title animate-fade-up">Everything You Need to Farm Smarter</h2>
        <p className="section-sub animate-fade-up delay-1">
          Our full suite of AI-powered tools covers every aspect of precision agriculture.
        </p>
        <div className="feature-grid">
          {features.map((f, i) => (
            <Link
              to={f.to} key={f.title}
              className={`feature-card card animate-fade-up delay-${(i % 3) + 1}`}
              style={{ '--fc': f.color, '--fb': f.bg }}
            >
              <div className="fc-icon-wrap" style={{ background: f.bg }}>
                <span className="fc-icon">{f.icon}</span>
              </div>
              <h3 className="fc-title">{f.title}</h3>
              <p className="fc-desc">{f.desc}</p>
              <span className="fc-arrow" style={{ color: f.color }}>Explore →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="how-section">
        <div className="how-bg" aria-hidden="true" />
        <div className="container">
          <h2 className="section-title" style={{ color: '#fff' }}>How It Works</h2>
          <p className="section-sub" style={{ color: 'rgba(255,255,255,.75)' }}>
            Three simple steps from field problem to actionable solution.
          </p>
          <div className="steps-grid">
            {steps.map((s, i) => (
              <div key={s.step} className={`step-card glass-card animate-fade-up delay-${i + 1}`}>
                <div className="step-number">{s.step}</div>
                <div className="step-icon">{s.icon}</div>
                <h3 className="step-title">{s.title}</h3>
                <p className="step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="testimonials-section container">
        <h2 className="section-title animate-fade-up">🌟 Trusted by Farmers Across India</h2>
        <p className="section-sub animate-fade-up delay-1">Real stories from real farmers using SmartFarm AI.</p>
        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <div key={t.name} className={`testimonial-card card animate-fade-up delay-${(i % 2) + 1}`}>
              <div className="test-quote-icon">❝</div>
              <p className="test-quote">{t.quote}</p>
              <div className="test-stars">
                {'★'.repeat(t.rating)}
              </div>
              <div className="test-author">
                <div className="test-avatar">
                  {t.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <div className="test-name">{t.name}</div>
                  <div className="test-location">📍 {t.location}</div>
                  <div className="test-crop">{t.crop}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Partners ── */}
      <section className="partners-section">
        <div className="container">
          <p className="partners-label">Powered By</p>
          <div className="partners-row">
            {PARTNERS.map(p => (
              <div key={p.name} className="partner-badge">
                <span className="partner-icon">{p.icon}</span>
                <span className="partner-name" style={{ color: p.color }}>{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section container">
        <div className="cta-box">
          <div className="cta-text">
            <h2>Ready to Transform Your Farm?</h2>
            <p>Join 10,000+ farmers already growing smarter with AI. No subscription needed.</p>
          </div>
          <div className="cta-actions">
            <Link to="/disease" className="btn btn-primary">🚀 Start Now</Link>
            <Link to="/chatbot" className="btn btn-outline">🤖 Ask AI</Link>
          </div>
        </div>
      </section>

    </main>
  );
}
