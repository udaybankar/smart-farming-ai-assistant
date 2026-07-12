import { useState } from 'react';
import './Dashboard.css';

const now = new Date();
const fmt = (d) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const WEATHER = { temp: 24, humidity: 68, wind: 14, uv: 5, rain: 12, condition: '⛅ Partly Cloudy' };

const SOIL = [
  { label: 'Soil Moisture', value: 42, unit: '%', status: 'good',    icon: '💧', max: 100 },
  { label: 'Soil Temp',     value: 19, unit: '°C', status: 'good',   icon: '🌡️', max: 40  },
  { label: 'Soil pH',       value: 6.8, unit: '',  status: 'good',   icon: '⚗️', max: 14  },
  { label: 'Nitrogen',      value: 68,  unit: '%', status: 'warning', icon: '🧪', max: 100 },
];

const ALERTS = [
  { level: 'warning', icon: '🌧️', title: 'Rain Alert',         msg: 'Heavy rain expected Wednesday. Delay fertilizer application.', time: '2h ago' },
  { level: 'info',    icon: '💧', title: 'Irrigation',          msg: 'Soil moisture optimal. No irrigation needed today.',           time: '4h ago' },
  { level: 'success', icon: '✅', title: 'Disease Scan Clear',  msg: 'Latest scan found no disease threats on Field A.',             time: '6h ago' },
  { level: 'warning', icon: '🌡️', title: 'Temperature Rising',  msg: 'Peak temperature may hit 32°C Friday. Monitor crops.',         time: '1d ago' },
];

const ACTIVITIES = [
  { icon: '🔬', action: 'Disease scan completed',      detail: 'Wheat — Healthy',            time: '09:14 AM', status: 'success' },
  { icon: '🌱', action: 'Fertilizer plan generated',   detail: 'Corn — N:120 P:60 K:80',     time: '08:32 AM', status: 'info'    },
  { icon: '🌤️', action: 'Weather data synced',          detail: 'Partly Cloudy, 24°C',        time: '08:00 AM', status: 'info'    },
  { icon: '🤖', action: 'AI Chat session',              detail: '3 questions answered',       time: 'Yesterday', status: 'info'   },
  { icon: '📊', action: 'Soil report updated',          detail: 'Field B — pH 6.8',           time: 'Yesterday', status: 'success'},
];

const CROPS = [
  { name: 'Wheat',  field: 'Field A', stage: 'Grain Fill', health: 92, icon: '🌾', daysLeft: 18 },
  { name: 'Corn',   field: 'Field B', stage: 'Tillering',  health: 78, icon: '🌽', daysLeft: 42 },
  { name: 'Tomato', field: 'Field C', stage: 'Flowering',  health: 85, icon: '🍅', daysLeft: 30 },
];

function healthColor(h) {
  if (h >= 85) return '#16a34a';
  if (h >= 70) return '#d97706';
  return '#dc2626';
}

function StatusDot({ level }) {
  const colors = { good: '#16a34a', warning: '#d97706', danger: '#dc2626', info: '#2563eb' };
  return <span className="status-dot" style={{ background: colors[level] || colors.info }} />;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="page dashboard-page">
      {/* Header */}
      <div className="dash-header">
        <div>
          <h1 className="page-title">📊 Farm Dashboard</h1>
          <p className="page-subtitle">Real-time overview of your farm's health and AI insights.</p>
        </div>
        <div className="dash-time glass-card">
          <div className="dash-time-icon">🕐</div>
          <div>
            <div className="dash-time-val">{fmt(now)}</div>
            <div className="dash-time-date">{now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
          </div>
        </div>
      </div>

      {/* Tab nav */}
      <div className="dash-tabs">
        {['overview', 'crops', 'alerts', 'activities'].map(t => (
          <button
            key={t}
            className={`dash-tab ${activeTab === t ? 'active' : ''}`}
            onClick={() => setActiveTab(t)}
          >
            {{ overview: '🏠 Overview', crops: '🌾 Crops', alerts: '🚨 Alerts', activities: '📋 Activity' }[t]}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <>
          {/* Weather + Soil row */}
          <div className="dash-grid-top">
            {/* Current weather */}
            <div className="card weather-dash-card">
              <h2 className="panel-heading">🌤️ Current Weather</h2>
              <div className="wd-main">
                <div className="wd-icon">⛅</div>
                <div className="wd-body">
                  <div className="wd-temp">{WEATHER.temp}°C</div>
                  <div className="wd-condition">{WEATHER.condition}</div>
                </div>
              </div>
              <div className="wd-metrics">
                {[
                  { icon: '💧', label: 'Humidity',   val: `${WEATHER.humidity}%` },
                  { icon: '💨', label: 'Wind',        val: `${WEATHER.wind} km/h` },
                  { icon: '☀️', label: 'UV Index',    val: WEATHER.uv },
                  { icon: '🌧️', label: 'Rain Chance', val: `${WEATHER.rain}%` },
                ].map(m => (
                  <div key={m.label} className="wd-metric">
                    <span className="wd-m-icon">{m.icon}</span>
                    <div>
                      <div className="wd-m-label">{m.label}</div>
                      <div className="wd-m-val">{m.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Soil cards */}
            <div className="soil-grid">
              {SOIL.map(s => (
                <div key={s.label} className="card soil-card">
                  <div className="soil-top">
                    <span className="soil-icon">{s.icon}</span>
                    <StatusDot level={s.status} />
                  </div>
                  <div className="soil-label">{s.label}</div>
                  <div className="soil-value">{s.value}<span className="soil-unit">{s.unit}</span></div>
                  <div className="soil-bar-wrap">
                    <div
                      className="soil-bar"
                      style={{
                        width: `${(s.value / s.max) * 100}%`,
                        background: s.status === 'warning' ? '#d97706' : '#16a34a',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alerts + Activities */}
          <div className="dash-grid-bottom">
            <div className="card alerts-card">
              <h2 className="panel-heading">🚨 AI Alerts</h2>
              <div className="alerts-list">
                {ALERTS.slice(0, 3).map((a, i) => (
                  <div key={i} className={`alert-item alert-${a.level}`}>
                    <div className="alert-icon-wrap">{a.icon}</div>
                    <div className="alert-body">
                      <div className="alert-title">{a.title}</div>
                      <div className="alert-msg">{a.msg}</div>
                    </div>
                    <div className="alert-time">{a.time}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card activity-card">
              <h2 className="panel-heading">📋 Recent Activity</h2>
              <div className="activity-list">
                {ACTIVITIES.slice(0, 4).map((a, i) => (
                  <div key={i} className="activity-item">
                    <div className="act-icon">{a.icon}</div>
                    <div className="act-body">
                      <div className="act-action">{a.action}</div>
                      <div className="act-detail">{a.detail}</div>
                    </div>
                    <div className="act-time">{a.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'crops' && (
        <div className="crops-tab">
          <div className="crops-grid">
            {CROPS.map(c => (
              <div key={c.name} className="card crop-card">
                <div className="crop-header">
                  <span className="crop-icon">{c.icon}</span>
                  <div>
                    <div className="crop-name">{c.name}</div>
                    <div className="crop-field">{c.field}</div>
                  </div>
                  <span className="tag tag-green">{c.stage}</span>
                </div>
                <div className="crop-health-row">
                  <span className="crop-health-label">Health Score</span>
                  <span className="crop-health-val" style={{ color: healthColor(c.health) }}>{c.health}%</span>
                </div>
                <div className="crop-bar-wrap">
                  <div className="crop-bar" style={{ width: `${c.health}%`, background: healthColor(c.health) }} />
                </div>
                <div className="crop-footer">
                  <span>🗓️ {c.daysLeft} days to harvest</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'alerts' && (
        <div className="card">
          <h2 className="panel-heading">All AI Alerts</h2>
          <div className="alerts-list">
            {ALERTS.map((a, i) => (
              <div key={i} className={`alert-item alert-${a.level}`}>
                <div className="alert-icon-wrap">{a.icon}</div>
                <div className="alert-body">
                  <div className="alert-title">{a.title}</div>
                  <div className="alert-msg">{a.msg}</div>
                </div>
                <div className="alert-time">{a.time}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'activities' && (
        <div className="card">
          <h2 className="panel-heading">Full Activity Log</h2>
          <div className="activity-list">
            {ACTIVITIES.map((a, i) => (
              <div key={i} className="activity-item">
                <div className="act-icon">{a.icon}</div>
                <div className="act-body">
                  <div className="act-action">{a.action}</div>
                  <div className="act-detail">{a.detail}</div>
                </div>
                <div className="act-time">{a.time}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
