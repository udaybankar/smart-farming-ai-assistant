import { NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Navbar.css';

const links = [
  { to: '/',            label: 'Home',       icon: '🏠' },
  { to: '/dashboard',   label: 'Dashboard',  icon: '📊' },
  { to: '/disease',     label: 'Crop AI',    icon: '🔬' },
  { to: '/weather',     label: 'Weather',    icon: '🌤️' },
  { to: '/fertilizer',  label: 'Fertilizer', icon: '🌱' },
  { to: '/chatbot',     label: 'AI Chat',    icon: '🤖' },
  { to: '/about',       label: 'About',      icon: 'ℹ️' },
];

export default function Navbar() {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setOpen(false); }, [location]);

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner container">

        {/* Brand */}
        <NavLink to="/" className="navbar-brand">
          <div className="brand-icon">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
              <circle cx="16" cy="16" r="16" fill="#16a34a"/>
              <path d="M16 8 C16 8 8 14 8 20 C8 24 12 26 16 26 C20 26 24 24 24 20 C24 14 16 8 16 8Z" fill="#4ade80"/>
              <path d="M16 14 L16 26" stroke="#14532d" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M16 18 C14 16 10 17 10 17" stroke="#14532d" strokeWidth="1.2" strokeLinecap="round"/>
              <path d="M16 21 C18 19 22 20 22 20" stroke="#14532d" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="brand-text">SmartFarm<strong>AI</strong></span>
        </NavLink>

        {/* Desktop nav */}
        <nav className="navbar-links desktop-nav">
          {links.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <span className="nav-icon">{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Hamburger */}
        <button
          className={`navbar-toggle ${open ? 'open' : ''}`}
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`mobile-drawer ${open ? 'open' : ''}`}>
        {links.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) => `mobile-link ${isActive ? 'active' : ''}`}
          >
            <span>{icon}</span> {label}
          </NavLink>
        ))}
      </div>
    </header>
  );
}
