import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner container">
        <div className="footer-top">
          <div className="footer-brand-col">
            <div className="footer-brand">
              <svg viewBox="0 0 32 32" fill="none" width="28" height="28">
                <circle cx="16" cy="16" r="16" fill="#16a34a"/>
                <path d="M16 8 C16 8 8 14 8 20 C8 24 12 26 16 26 C20 26 24 24 24 20 C24 14 16 8 16 8Z" fill="#4ade80"/>
                <path d="M16 14 L16 26" stroke="#14532d" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M16 18 C14 16 10 17 10 17" stroke="#14532d" strokeWidth="1.2" strokeLinecap="round"/>
                <path d="M16 21 C18 19 22 20 22 20" stroke="#14532d" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              <span className="footer-brand-name">SmartFarm<strong>AI</strong></span>
            </div>
            <p className="footer-tagline">AI-powered precision agriculture for a sustainable future.</p>
            <div className="footer-powered">
              <span className="ibm-badge">🔵 Powered by IBM Watson</span>
            </div>
          </div>

          <div className="footer-nav-cols">
            <div className="footer-nav-col">
              <div className="footer-col-title">Platform</div>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/disease">Crop Disease AI</Link>
              <Link to="/weather">Weather</Link>
              <Link to="/fertilizer">Fertilizer</Link>
              <Link to="/chatbot">AI Chatbot</Link>
            </div>
            <div className="footer-nav-col">
              <div className="footer-col-title">Company</div>
              <Link to="/about">About Us</Link>
              <Link to="/about">Technology</Link>
              <Link to="/about">Team</Link>
              <a href="mailto:hello@smartfarmai.io">Contact</a>
              <a href="https://github.com">GitHub</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">© {new Date().getFullYear()} Smart Farming AI. All rights reserved.</p>
          <div className="footer-legal">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
