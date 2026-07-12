import { useState } from 'react';
import './Fertilizer.css';

const CROPS = ['Wheat','Rice','Corn','Tomato','Potato','Soybean','Cotton','Sugarcane'];
const SOILS = ['Sandy','Loamy','Clay','Silty','Peaty','Chalky'];

const RECS = {
  Wheat:     { n: 120, p: 60,  k: 80,  score: 82, label: 'Good',      color: '#16a34a' },
  Rice:      { n: 100, p: 50,  k: 60,  score: 78, label: 'Good',      color: '#16a34a' },
  Corn:      { n: 150, p: 70,  k: 100, score: 88, label: 'Excellent',  color: '#2563eb' },
  Tomato:    { n: 90,  p: 80,  k: 120, score: 75, label: 'Good',      color: '#16a34a' },
  Potato:    { n: 110, p: 90,  k: 140, score: 70, label: 'Fair',       color: '#d97706' },
  Soybean:   { n: 40,  p: 60,  k: 80,  score: 85, label: 'Excellent',  color: '#2563eb' },
  Cotton:    { n: 130, p: 50,  k: 70,  score: 72, label: 'Good',      color: '#16a34a' },
  Sugarcane: { n: 160, p: 80,  k: 120, score: 80, label: 'Good',      color: '#16a34a' },
};

function RecCard({ data, crop, soil, ph }) {
  return (
    <div className="rec-result animate-scale-in">
      {/* Score ring */}
      <div className="rec-score-section">
        <div className="score-ring-wrap">
          <svg viewBox="0 0 80 80" className="score-ring">
            <circle cx="40" cy="40" r="32" fill="none" stroke="#f3f4f6" strokeWidth="8" />
            <circle cx="40" cy="40" r="32" fill="none" stroke={data.color}
              strokeWidth="8" strokeLinecap="round"
              strokeDasharray={`${(data.score / 100) * 201} 201`}
              strokeDashoffset="50"
              style={{ transition: 'stroke-dasharray 1s ease' }}
            />
          </svg>
          <div className="score-center">
            <div className="score-val">{data.score}</div>
            <div className="score-unit">/100</div>
          </div>
        </div>
        <div className="score-info">
          <div className="score-label" style={{ color: data.color }}>{data.label}</div>
          <div className="score-sub">Soil Suitability</div>
          <div className="score-tags">
            <span className="tag tag-green">🌾 {crop}</span>
            <span className="tag tag-blue">🪨 {soil}</span>
            <span className={`tag ${ph < 6 ? 'tag-red' : ph > 7.5 ? 'tag-yellow' : 'tag-green'}`}>
              ⚗️ pH {ph}
            </span>
          </div>
        </div>
      </div>

      {/* NPK cards */}
      <h3 className="rec-section-title">🌿 Recommended NPK (kg/ha)</h3>
      <div className="npk-cards">
        {[
          { el: 'N', label: 'Nitrogen',   val: data.n, color: '#16a34a', bg: '#f0fdf4', desc: 'For leaf & stem growth' },
          { el: 'P', label: 'Phosphorus', val: data.p, color: '#d97706', bg: '#fffbeb', desc: 'For root development' },
          { el: 'K', label: 'Potassium',  val: data.k, color: '#2563eb', bg: '#eff6ff', desc: 'For fruit & resistance' },
        ].map(({ el, label, val, color, bg, desc }) => (
          <div key={el} className="npk-card" style={{ borderTopColor: color, background: bg }}>
            <div className="npk-el" style={{ color }}>{el}</div>
            <div className="npk-label">{label}</div>
            <div className="npk-val" style={{ color }}>{val} <span className="npk-unit">kg/ha</span></div>
            <div className="npk-desc">{desc}</div>
          </div>
        ))}
      </div>

      {/* Schedule */}
      <h3 className="rec-section-title">🗓️ Application Schedule</h3>
      <div className="schedule-list">
        {[
          { phase: 'Pre-planting',  icon: '🌱', detail: `Apply 40% N (${Math.round(data.n * .4)} kg) + full P & K as base dose` },
          { phase: 'Tillering',     icon: '🌿', detail: `Top-dress with 35% N (${Math.round(data.n * .35)} kg)` },
          { phase: 'Grain Fill',    icon: '🌾', detail: `Apply remaining 25% N (${Math.round(data.n * .25)} kg)` },
        ].map((s, i) => (
          <div key={i} className="schedule-row">
            <div className="schedule-icon">{s.icon}</div>
            <div className="schedule-body">
              <div className="schedule-phase">{s.phase}</div>
              <div className="schedule-detail">{s.detail}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="rec-tip">
        💡 Split nitrogen application improves uptake by up to 30% and reduces leaching losses.
      </div>
    </div>
  );
}

export default function Fertilizer() {
  const [form, setForm]     = useState({ crop: '', soil: '', n: '', p: '', k: '', ph: '' });
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(e => ({ ...e, [field]: '' }));
  }

  function validate() {
    const errs = {};
    if (!form.crop) errs.crop = 'Select a crop';
    if (!form.soil) errs.soil = 'Select soil type';
    if (form.n === '' || isNaN(form.n) || form.n < 0) errs.n = 'Enter N (0–300)';
    if (form.p === '' || isNaN(form.p) || form.p < 0) errs.p = 'Enter P (0–300)';
    if (form.k === '' || isNaN(form.k) || form.k < 0) errs.k = 'Enter K (0–300)';
    if (form.ph === '' || isNaN(form.ph) || form.ph < 0 || form.ph > 14) errs.ph = 'Enter pH (0–14)';
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult(RECS[form.crop] || RECS.Wheat);
      setLoading(false);
    }, 1500);
  }

  const phNum = parseFloat(form.ph);
  const phClass = !isNaN(phNum) ? (phNum < 6 ? 'acidic' : phNum > 7.5 ? 'alkaline' : 'neutral') : '';

  return (
    <div className="page fert-page">
      <h1 className="page-title">🌱 Fertilizer Recommendation</h1>
      <p className="page-subtitle">Enter your crop and soil parameters to receive an AI-powered fertilizer plan.</p>

      <div className="fert-layout">
        {/* Form */}
        <div className="card fert-form-card">
          <h2 className="panel-heading">Input Parameters</h2>
          <form onSubmit={handleSubmit} noValidate className="fert-form">

            <div className="form-row two-col">
              <div className="form-group">
                <label className="form-label">Crop Type <span className="req">*</span></label>
                <select value={form.crop} onChange={e => set('crop', e.target.value)} className={`form-control ${errors.crop ? 'err' : ''}`}>
                  <option value="">Select crop…</option>
                  {CROPS.map(c => <option key={c}>{c}</option>)}
                </select>
                {errors.crop && <span className="err-msg">{errors.crop}</span>}
              </div>
              <div className="form-group">
                <label className="form-label">Soil Type <span className="req">*</span></label>
                <select value={form.soil} onChange={e => set('soil', e.target.value)} className={`form-control ${errors.soil ? 'err' : ''}`}>
                  <option value="">Select soil…</option>
                  {SOILS.map(s => <option key={s}>{s}</option>)}
                </select>
                {errors.soil && <span className="err-msg">{errors.soil}</span>}
              </div>
            </div>

            <div className="form-section-label">🧪 Current NPK Levels (kg/ha)</div>
            <div className="form-row three-col">
              {[
                { f: 'n', label: 'N – Nitrogen',   ph: 'e.g. 80', color: '#16a34a' },
                { f: 'p', label: 'P – Phosphorus', ph: 'e.g. 40', color: '#d97706' },
                { f: 'k', label: 'K – Potassium',  ph: 'e.g. 60', color: '#2563eb' },
              ].map(({ f, label, ph, color }) => (
                <div key={f} className="form-group">
                  <label className="form-label" style={{ color }}>
                    <strong>{f.toUpperCase()}</strong> {label.split('–')[1]} <span className="req">*</span>
                  </label>
                  <div className="input-prefix-wrap" style={{ '--ic': color }}>
                    <span className="input-prefix">{f.toUpperCase()}</span>
                    <input type="number" min="0" max="300" placeholder={ph}
                      value={form[f]} onChange={e => set(f, e.target.value)}
                      className={`form-control with-prefix ${errors[f] ? 'err' : ''}`}
                    />
                  </div>
                  {errors[f] && <span className="err-msg">{errors[f]}</span>}
                </div>
              ))}
            </div>

            <div className="form-group">
              <label className="form-label">⚗️ Soil pH (0–14) <span className="req">*</span></label>
              <div className="ph-row">
                <input type="number" min="0" max="14" step="0.1" placeholder="e.g. 6.5"
                  value={form.ph} onChange={e => set('ph', e.target.value)}
                  className={`form-control ph-input ${errors.ph ? 'err' : ''}`}
                />
                {phClass && (
                  <span className={`ph-badge ${phClass}`}>
                    {phClass === 'acidic' ? '🔴 Acidic' : phClass === 'alkaline' ? '🔵 Alkaline' : '🟢 Neutral'}
                  </span>
                )}
              </div>
              {errors.ph && <span className="err-msg">{errors.ph}</span>}
              <div className="ph-scale">
                <input type="range" min="0" max="14" step="0.1"
                  value={form.ph || 7} onChange={e => set('ph', e.target.value)}
                  className="ph-slider"
                />
                <div className="ph-labels">
                  <span>0 Acid</span><span>7 Neutral</span><span>14 Alkaline</span>
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary fert-submit" disabled={loading}>
              {loading ? '⏳ Calculating…' : '📊 Get AI Recommendation'}
            </button>
          </form>
        </div>

        {/* Results */}
        <div className="card fert-results-card">
          <h2 className="panel-heading">Recommendation</h2>
          {!result && !loading && (
            <div className="results-empty">
              <span className="results-empty-icon">🌿</span>
              <p>Fill in the form and click <strong>Get AI Recommendation</strong> to see your personalised fertilizer plan.</p>
            </div>
          )}
          {loading && (
            <div className="results-loading">
              <div className="spinner" />
              <p>Calculating optimal fertilizer plan…</p>
            </div>
          )}
          {result && <RecCard data={result} crop={form.crop} soil={form.soil} ph={form.ph} />}
        </div>
      </div>
    </div>
  );
}
