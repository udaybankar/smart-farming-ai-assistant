import { useState } from 'react';
import './Weather.css';

/* ── Indian farming regions ── */
const REGIONS = [
  { label: 'Pune, Maharashtra',           state: 'Maharashtra' },
  { label: 'Nashik, Maharashtra',          state: 'Maharashtra' },
  { label: 'Nagpur, Maharashtra',          state: 'Maharashtra' },
  { label: 'Ludhiana, Punjab',             state: 'Punjab'      },
  { label: 'Amritsar, Punjab',             state: 'Punjab'      },
  { label: 'Jaipur, Rajasthan',            state: 'Rajasthan'   },
  { label: 'Jodhpur, Rajasthan',           state: 'Rajasthan'   },
  { label: 'Indore, Madhya Pradesh',       state: 'Madhya Pradesh' },
  { label: 'Bhopal, Madhya Pradesh',       state: 'Madhya Pradesh' },
  { label: 'Hyderabad, Telangana',         state: 'Telangana'   },
  { label: 'Warangal, Telangana',          state: 'Telangana'   },
  { label: 'Coimbatore, Tamil Nadu',       state: 'Tamil Nadu'  },
  { label: 'Madurai, Tamil Nadu',          state: 'Tamil Nadu'  },
  { label: 'Bengaluru, Karnataka',         state: 'Karnataka'   },
  { label: 'Mysuru, Karnataka',            state: 'Karnataka'   },
  { label: 'Ahmedabad, Gujarat',           state: 'Gujarat'     },
  { label: 'Surat, Gujarat',               state: 'Gujarat'     },
  { label: 'Patna, Bihar',                 state: 'Bihar'       },
  { label: 'Muzaffarpur, Bihar',           state: 'Bihar'       },
  { label: 'Lucknow, Uttar Pradesh',       state: 'Uttar Pradesh' },
  { label: 'Agra, Uttar Pradesh',          state: 'Uttar Pradesh' },
  { label: 'Kolkata, West Bengal',         state: 'West Bengal' },
  { label: 'Bhubaneswar, Odisha',          state: 'Odisha'      },
  { label: 'Ranchi, Jharkhand',            state: 'Jharkhand'   },
  { label: 'Raipur, Chhattisgarh',         state: 'Chhattisgarh'},
  { label: 'Custom Location…',             state: 'custom'      },
];

const WEATHER_DATA = {
  temp: 24, feels: 22, humidity: 68, wind: 14,
  condition: 'Partly Cloudy', icon: '⛅',
  uvIndex: 5, visibility: 10, pressure: 1013,
  soilMoisture: 42, rainfall: 8.4,
  sunrise: '6:12 AM', sunset: '7:48 PM',
  dewPoint: 16, cloudCover: 45,
};

const FORECAST = [
  { day: 'Mon', icon: '☀️',  high: 27, low: 18, rain: 0,  wind: 12, desc: 'Sunny'         },
  { day: 'Tue', icon: '⛅',  high: 25, low: 17, rain: 10, wind: 15, desc: 'Partly Cloudy'  },
  { day: 'Wed', icon: '🌧️',  high: 20, low: 15, rain: 75, wind: 22, desc: 'Heavy Rain'     },
  { day: 'Thu', icon: '🌦️',  high: 22, low: 16, rain: 40, wind: 18, desc: 'Light Showers'  },
  { day: 'Fri', icon: '☀️',  high: 28, low: 19, rain: 0,  wind: 10, desc: 'Sunny'          },
  { day: 'Sat', icon: '☀️',  high: 30, low: 20, rain: 0,  wind: 8,  desc: 'Clear & Hot'    },
  { day: 'Sun', icon: '⛅',  high: 26, low: 18, rain: 15, wind: 14, desc: 'Mostly Cloudy'  },
];

const AGRI_ALERTS = [
  { level: 'info',    icon: '💧', title: 'Irrigation OK',      text: 'Soil moisture is optimal. Skip irrigation today.' },
  { level: 'warning', icon: '🌧️', title: 'Rain Alert Wed',     text: 'Heavy rain expected Wednesday. Delay fertilizer application.' },
  { level: 'info',    icon: '☀️', title: 'UV Advisory',        text: 'High UV index — protect young seedlings after noon.' },
  { level: 'success', icon: '🌱', title: 'Good Planting Cond', text: 'Temperature and moisture are ideal for seeding this week.' },
];

function MetricCard({ label, value, unit, icon, subtext, highlight, trend }) {
  return (
    <div className={`metric-card card ${highlight ? 'highlight' : ''}`}>
      <div className="mc-top">
        <div className="mc-icon">{icon}</div>
        {trend !== 0 && <span className={`mc-trend ${trend > 0 ? 'up' : 'down'}`}>{trend > 0 ? '↑' : '↓'}{Math.abs(trend)}%</span>}
      </div>
      <div className="mc-label">{label}</div>
      <div className="mc-value">{value}<span className="mc-unit">{unit}</span></div>
      {subtext && <div className="mc-sub">{subtext}</div>}
    </div>
  );
}

export default function Weather() {
  const [unit, setUnit]           = useState('C');
  const [regionIdx, setRegionIdx] = useState(0);          // index into REGIONS
  const [customLoc, setCustomLoc] = useState('');
  const [showCustom, setShowCustom] = useState(false);

  const w = WEATHER_DATA;
  const toF = t => Math.round(t * 9 / 5 + 32);
  const temp  = unit === 'C' ? w.temp  : toF(w.temp);
  const feels = unit === 'C' ? w.feels : toF(w.feels);

  /* Resolve current display location */
  const selectedRegion = REGIONS[regionIdx];
  const displayLocation =
    selectedRegion.state === 'custom'
      ? (customLoc.trim() || 'Enter your location below')
      : selectedRegion.label;

  function handleRegionChange(e) {
    const idx = Number(e.target.value);
    setRegionIdx(idx);
    setShowCustom(REGIONS[idx].state === 'custom');
  }

  return (
    <div className="page weather-page">

      {/* ── Header ── */}
      <div className="weather-header">
        <div>
          <h1 className="page-title">🌤️ Weather Dashboard</h1>
          <p className="page-subtitle">
            Live conditions and 7-day agricultural forecast for&nbsp;
            <strong className="subtitle-location">{displayLocation}</strong>.
          </p>
        </div>
        <div className="unit-toggle">
          <button className={unit === 'C' ? 'active' : ''} onClick={() => setUnit('C')}>°C</button>
          <button className={unit === 'F' ? 'active' : ''} onClick={() => setUnit('F')}>°F</button>
        </div>
      </div>

      {/* ── Region Selector bar ── */}
      <div className="region-bar card">
        <span className="region-bar-label">📍 Your Region</span>

        <div className="region-select-wrap">
          <span className="region-select-icon">🌏</span>
          <select
            className="region-select"
            value={regionIdx}
            onChange={handleRegionChange}
          >
            {REGIONS.map((r, i) => (
              <option key={r.label} value={i}>{r.label}</option>
            ))}
          </select>
        </div>

        {showCustom && (
          <div className="region-custom-wrap">
            <span className="region-select-icon">✏️</span>
            <input
              type="text"
              className="region-custom-input"
              placeholder="e.g. Amravati, Maharashtra"
              value={customLoc}
              onChange={e => setCustomLoc(e.target.value)}
              maxLength={60}
            />
          </div>
        )}

        <div className="region-active-badge">
          <span className="region-dot" />
          {displayLocation}
        </div>
      </div>

      {/* ── Current conditions hero ── */}
      <div className="current-weather-card">
        <div className="cw-left">
          <div className="cw-icon-wrap">
            <span className="cw-icon">{w.icon}</span>
          </div>
          <div>
            <div className="cw-temp">{temp}°{unit}</div>
            <div className="cw-condition">{w.condition}</div>
            <div className="cw-location">📍 {displayLocation}</div>
          </div>
        </div>
        <div className="cw-divider" />
        <div className="cw-right">
          {[
            { icon: '🌡️', label: 'Feels Like',  val: `${feels}°${unit}` },
            { icon: '💧', label: 'Humidity',    val: `${w.humidity}%` },
            { icon: '💨', label: 'Wind',        val: `${w.wind} km/h` },
            { icon: '👁️', label: 'Visibility',  val: `${w.visibility} km` },
            { icon: '🌧️', label: 'Rainfall',    val: `${w.rainfall} mm` },
            { icon: '🌫️', label: 'Dew Point',   val: `${unit === 'C' ? w.dewPoint : toF(w.dewPoint)}°${unit}` },
          ].map(m => (
            <div key={m.label} className="cw-meta-item">
              <span className="cw-meta-icon">{m.icon}</span>
              <div>
                <div className="cw-meta-label">{m.label}</div>
                <div className="cw-meta-val">{m.val}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Metric cards ── */}
      <div className="metrics-grid">
        <MetricCard icon="💧" label="Humidity"      value={w.humidity}     unit="%" subtext="Optimal: 40–70%"   highlight={w.humidity > 80} trend={2}  />
        <MetricCard icon="💨" label="Wind Speed"    value={w.wind}         unit=" km/h" subtext="Light breeze"                                trend={-5} />
        <MetricCard icon="☀️" label="UV Index"      value={w.uvIndex}      unit=""  subtext="Moderate – use SPF"                              trend={8}  />
        <MetricCard icon="🌡️" label="Pressure"      value={w.pressure}     unit=" hPa" subtext="Normal range"                                trend={0}  />
        <MetricCard icon="🌱" label="Soil Moisture" value={w.soilMoisture} unit="%" subtext="Good for planting"                              trend={3}  />
        <MetricCard icon="☁️" label="Cloud Cover"   value={w.cloudCover}   unit="%" subtext="Partly cloudy"                                  trend={-2} />
      </div>

      {/* ── Sun / Rainfall / Wind row ── */}
      <div className="sun-rain-grid">
        <div className="card sun-card">
          <h2 className="panel-heading">🌅 Sun Schedule</h2>
          <div className="sun-row">
            <div className="sun-item">
              <div className="sun-icon">🌅</div>
              <div className="sun-label">Sunrise</div>
              <div className="sun-time">{w.sunrise}</div>
            </div>
            <div className="sun-arc">
              <svg viewBox="0 0 120 60" fill="none">
                <path d="M10 55 Q60 5 110 55" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="5 3" fill="none"/>
                <circle cx="52" cy="24" r="6" fill="#f59e0b"/>
              </svg>
            </div>
            <div className="sun-item">
              <div className="sun-icon">🌇</div>
              <div className="sun-label">Sunset</div>
              <div className="sun-time">{w.sunset}</div>
            </div>
          </div>
          <div className="sun-daylight">
            <span>☀️ Daylight: <strong>13h 36m</strong></span>
          </div>
        </div>

        <div className="card rain-card">
          <h2 className="panel-heading">🌧️ Rainfall (7-Day)</h2>
          <div className="rain-bars">
            {FORECAST.map(f => (
              <div key={f.day} className="rain-bar-col">
                <div className="rain-bar-wrap">
                  <div
                    className="rain-bar-fill"
                    style={{ height: `${f.rain}%`, background: f.rain > 50 ? '#2563eb' : '#93c5fd' }}
                  />
                </div>
                <div className="rain-pct">{f.rain}%</div>
                <div className="rain-day">{f.day}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card wind-card">
          <h2 className="panel-heading">💨 Wind Details</h2>
          <div className="wind-compass">
            <div className="compass-ring">
              <div className="compass-needle" />
              <span className="compass-n">N</span>
              <span className="compass-s">S</span>
              <span className="compass-e">E</span>
              <span className="compass-w">W</span>
            </div>
          </div>
          <div className="wind-stats">
            <div className="wind-stat"><span>💨 Speed</span><strong>{w.wind} km/h</strong></div>
            <div className="wind-stat"><span>🧭 Direction</span><strong>NE</strong></div>
            <div className="wind-stat"><span>🌀 Gusts</span><strong>22 km/h</strong></div>
          </div>
        </div>
      </div>

      {/* ── 7-day Forecast ── */}
      <div className="card forecast-card">
        <h2 className="panel-heading">📅 7-Day Forecast — {displayLocation}</h2>
        <div className="forecast-grid">
          {FORECAST.map(f => (
            <div key={f.day} className="forecast-day">
              <div className="forecast-name">{f.day}</div>
              <div className="forecast-icon">{f.icon}</div>
              <div className="forecast-desc">{f.desc}</div>
              <div className="forecast-hi">{unit === 'C' ? f.high : toF(f.high)}°</div>
              <div className="forecast-lo">{unit === 'C' ? f.low  : toF(f.low)}°</div>
              <div className={`forecast-rain ${f.rain > 50 ? 'wet' : ''}`}>💧{f.rain}%</div>
              <div className="forecast-wind">💨{f.wind}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Agri Alerts ── */}
      <div className="card agri-card">
        <h2 className="panel-heading">🚜 Agricultural Alerts — {displayLocation}</h2>
        <div className="agri-alerts-grid">
          {AGRI_ALERTS.map((a, i) => (
            <div key={i} className={`agri-alert alert-${a.level}`}>
              <div className="agri-alert-icon">{a.icon}</div>
              <div>
                <div className="agri-alert-title">{a.title}</div>
                <div className="agri-alert-text">{a.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
