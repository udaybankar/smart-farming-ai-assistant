import { useState, useRef } from 'react';
import './CropDisease.css';

/* ─────────────────────────────────────────────────────────────────
   NOTE — DEMO MODE
   This frontend does not have a live ML backend connected yet.
   Results are simulated based on the uploaded image's file
   properties (name, size, type) so that different images produce
   different outputs instead of always showing "Healthy 94%".

   To connect a real model, replace `generateResult()` with:
     const fd = new FormData();
     fd.append('image', imageFile);
     const res = await fetch('/api/disease/predict', { method:'POST', body: fd });
     return await res.json();   // { results:[{key,label,pct}], crop }
   ───────────────────────────────────────────────────────────────── */

/* ── Disease knowledge base — keyed by disease id ── */
const DISEASES = {
  /* ── Universal / generic ── */
  healthy: {
    disease: 'Healthy Plant', severity: 'None', color: '#16a34a',
    description: 'Your plant appears healthy with no visible signs of disease or stress. Continue your current care routine.',
    causes:    ['Good soil nutrition and pH balance', 'Adequate and consistent watering', 'Proper sunlight and air circulation'],
    treatment: ['Maintain current care routine', 'Continue regular crop monitoring every 7 days', 'Ensure consistent irrigation schedule'],
    prevention:['Rotate crops each season to break disease cycles', 'Use certified disease-free seeds', 'Maintain clean field hygiene — remove crop debris'],
  },
  leaf_blight: {
    disease: 'Leaf Blight', severity: 'High', color: '#dc2626',
    description: 'Leaf blight is a fungal disease causing brown, water-soaked lesions that rapidly enlarge and kill leaf tissue, reducing photosynthesis and yield significantly.',
    causes:    ['Fungal pathogen Helminthosporium / Alternaria spp.', 'Warm humid conditions above 80% humidity', 'Excessive leaf wetness from overhead irrigation or rain'],
    treatment: ['Apply copper-based or mancozeb fungicide immediately', 'Remove and destroy all infected leaves — do not compost', 'Improve air circulation by thinning canopy'],
    prevention:['Avoid overhead irrigation — use drip instead', 'Space plants adequately (30–45 cm) for airflow', 'Use blight-resistant certified varieties'],
  },
  powdery_mildew: {
    disease: 'Powdery Mildew', severity: 'Medium', color: '#f59e0b',
    description: 'White powdery fungal coating on leaf surfaces that blocks photosynthesis, stunts growth, and reduces yield by up to 35%.',
    causes:    ['Erysiphales fungal group spores', 'Dry warm days with cool humid nights', 'Crowded planting that reduces airflow between plants'],
    treatment: ['Apply sulfur-based or potassium bicarbonate fungicide', 'Neem oil spray (5 ml/litre) as organic alternative', 'Reduce overhead watering and improve drainage'],
    prevention:['Plant resistant varieties where available', 'Maintain proper plant spacing — at least 40 cm apart', 'Avoid excess nitrogen fertilisation which promotes soft growth'],
  },
  leaf_rust: {
    disease: 'Leaf Rust', severity: 'Medium', color: '#7c3aed',
    description: 'Orange-brown pustules (uredia) on leaves caused by Puccinia fungi, weakening the plant by draining nutrients and reducing grain filling.',
    causes:    ['Puccinia triticina / P. sorghi fungi species', 'Cool moist conditions between 15–25°C', 'Wind-dispersed spores from infected plants nearby'],
    treatment: ['Apply triazole fungicide (propiconazole or tebuconazole)', 'Remove severely infected lower leaves', 'Avoid wetting foliage during irrigation'],
    prevention:['Use rust-resistant cultivars — check local variety trials', 'Monitor crops weekly during wet cool seasons', 'Apply preventive fungicide at flag-leaf stage'],
  },

  /* ── Corn / Maize specific ── */
  corn_northern_blight: {
    disease: 'Northern Corn Leaf Blight', severity: 'High', color: '#b45309',
    description: 'Cigar-shaped grey-green to tan lesions (5–15 cm) on corn leaves caused by Exserohilum turcicum. Severely reduces photosynthetic area and grain yield.',
    causes:    ['Exserohilum turcicum fungus', 'Moderate temperatures 18–27°C with heavy dew or rain', 'Dense plant populations limiting airflow'],
    treatment: ['Apply azoxystrobin or pyraclostrobin fungicide at first sign', 'Destroy infected crop debris after harvest', 'Avoid late planting which coincides with peak spore season'],
    prevention:['Plant resistant hybrids (Ht1, Ht2, HtN resistance genes)', 'Crop rotation — avoid corn after corn', 'Manage plant density: 65,000–75,000 plants/ha'],
  },
  corn_gray_leaf_spot: {
    disease: 'Gray Leaf Spot', severity: 'High', color: '#6b7280',
    description: 'Rectangular tan-to-grey lesions with yellow halos on corn leaves caused by Cercospora zeae-maydis. One of the most damaging corn foliar diseases.',
    causes:    ['Cercospora zeae-maydis fungus', 'Extended periods of leaf wetness (>10 hours)', 'Warm temperatures 25–30°C with high humidity'],
    treatment: ['Spray strobilurin or triazole fungicide at VT/R1 growth stage', 'Incorporate crop residues to reduce inoculum', 'Ensure good drainage to reduce humidity'],
    prevention:['Use resistant hybrids — consult seed dealer for GLS ratings', 'Rotate corn with soybean or wheat for 1–2 seasons', 'Reduce plant density to improve air movement'],
  },
  corn_common_rust: {
    disease: 'Common Corn Rust', severity: 'Medium', color: '#b45309',
    description: 'Circular to elongated brick-red pustules on both leaf surfaces caused by Puccinia sorghi. Reduces grain fill and causes premature plant death in severe cases.',
    causes:    ['Puccinia sorghi airborne spores', 'Cool wet conditions: 16–23°C with >6 hours leaf wetness', 'Susceptible hybrid grown in rust-prone regions'],
    treatment: ['Apply fungicide (azoxystrobin, mancozeb) before tasseling if >50% plants show pustules', 'Scout fields twice weekly during silking period', 'Prioritise treatment on seed corn and sweet corn'],
    prevention:['Plant rust-resistant corn hybrids', 'Early planting to avoid peak rust season', 'Scout regularly after silking — catch early infections'],
  },
  corn_ear_rot: {
    disease: 'Ear / Cob Rot', severity: 'High', color: '#dc2626',
    description: 'Fungal rot of the corn ear (Gibberella / Fusarium spp.) causing pink-red discolouration of kernels. Produces dangerous mycotoxins (fumonisins, DON) harmful to humans and livestock.',
    causes:    ['Fusarium graminearum / F. verticillioides fungi', 'Wet humid weather during silking and grain fill', 'Insect damage (especially corn earworm) creating entry wounds'],
    treatment: ['Harvest promptly at maturity — do not leave corn standing after black layer', 'Dry grain to <14% moisture immediately after harvest', 'Do NOT feed mould-contaminated grain to animals — test for mycotoxins'],
    prevention:['Plant tolerant hybrids with good husk coverage', 'Control corn earworm with timely insecticide at silk', 'Rotate with non-host crops for 2 years'],
  },
  corn_smut: {
    disease: 'Common Smut (Galls)', severity: 'Medium', color: '#78350f',
    description: 'Distinctive silvery-white galls filled with black powdery spores (Ustilago maydis) on ears, tassels, leaves, and stalks. Galls can be large (up to 15 cm).',
    causes:    ['Ustilago maydis soilborne fungus', 'Warm dry weather 26–34°C with intermittent rain', 'Plant wounding from hail, sand-blasting, or insect feeding'],
    treatment: ['Remove galls before they rupture and release spores', 'Bag and remove galls from field — do not compost', 'No effective fungicide once infection established'],
    prevention:['Use smut-resistant hybrids', 'Avoid mechanical damage during cultivation', 'Do not apply excess nitrogen fertiliser'],
  },

  /* ── Tomato specific ── */
  tomato_early_blight: {
    disease: 'Tomato Early Blight', severity: 'High', color: '#dc2626',
    description: 'Concentric ring "target spot" lesions on older lower leaves caused by Alternaria solani. Defoliates plants from the bottom up, exposing fruit to sunscald.',
    causes:    ['Alternaria solani fungus in soil and crop debris', 'Warm wet conditions 24–29°C', 'Nutrient-stressed or over-mature plants are most susceptible'],
    treatment: ['Apply chlorothalonil or mancozeb fungicide every 7–10 days', 'Remove and destroy infected lower leaves immediately', 'Mulch soil surface to prevent spore splash-up'],
    prevention:['Use certified disease-free transplants', 'Stake/cage plants to keep foliage off ground', 'Avoid overhead irrigation — drip irrigate instead'],
  },
  tomato_late_blight: {
    disease: 'Tomato Late Blight', severity: 'High', color: '#1d4ed8',
    description: 'Devastating water-soaked grey-green lesions with white mould on leaf undersides caused by Phytophthora infestans. Can destroy an entire crop within a week.',
    causes:    ['Phytophthora infestans oomycete pathogen', 'Cool wet conditions: 10–20°C with prolonged leaf wetness', 'Infected seed, transplants, or volunteer potatoes nearby'],
    treatment: ['Apply metalaxyl + mancozeb or cymoxanil fungicide IMMEDIATELY', 'Remove and bag infected plants — do not leave in field', 'Stop overhead irrigation completely'],
    prevention:['Use late-blight tolerant varieties (e.g. Mountain Merit)', 'Apply preventive copper fungicide before rainy spells', 'Never plant potatoes or tomatoes in same location 2 years running'],
  },

  /* ── Wheat specific ── */
  wheat_stripe_rust: {
    disease: 'Wheat Yellow (Stripe) Rust', severity: 'High', color: '#ca8a04',
    description: 'Bright yellow-orange pustules arranged in stripes along wheat leaves caused by Puccinia striiformis. Can cause 70% yield loss in susceptible varieties.',
    causes:    ['Puccinia striiformis f. sp. tritici', 'Cool temperatures 8–15°C with high humidity or rain', 'Wind-dispersed spores from infected areas hundreds of km away'],
    treatment: ['Apply triazole fungicide (propiconazole/tebuconazole) at first sign', 'Spray at flag leaf + ear emergence stages', 'Harvest early if infection is severe to limit further loss'],
    prevention:['Grow resistant varieties — check national variety trial lists', 'Avoid late sowing which increases exposure to rust season', 'Monitor flag leaf closely — protect it as it contributes 75% of grain fill'],
  },

  /* ── Pest damage (not a fungal disease) ── */
  pest_damage: {
    disease: 'Pest / Insect Damage', severity: 'Medium', color: '#7c3aed',
    description: 'Irregular holes, feeding tracks, discolouration, or silk damage caused by insects such as corn earworm, aphids, stem borers, or thrips rather than a fungal pathogen.',
    causes:    ['Corn earworm (Helicoverpa zea) feeding on silk and kernels', 'Aphid colonies extracting plant sap', 'Fall armyworm (Spodoptera frugiperda) causing ragged leaf damage', 'Stem borer tunnelling inside stalks'],
    treatment: ['Identify the pest first — check under leaves, inside stalks, on silk', 'Apply appropriate insecticide (lambda-cyhalothrin for earworm/armyworm)', 'Introduce biological controls: Trichogramma wasps, Bt spray for caterpillars', 'Hand-remove egg masses and early instar larvae'],
    prevention:['Scout fields twice weekly from emergence to grain fill', 'Use pheromone traps to monitor adult moth flights', 'Plant early to avoid peak pest pressure', 'Maintain field hygiene — remove crop residues that harbour overwintering pests'],
  },
};

/* ── Crop → list of possible disease keys (weighted probabilities) ── */
const CROP_DISEASES = {
  '🌽 Corn': [
    { key: 'corn_northern_blight', w: 22 },
    { key: 'corn_gray_leaf_spot',  w: 18 },
    { key: 'corn_common_rust',     w: 20 },
    { key: 'corn_ear_rot',         w: 12 },
    { key: 'corn_smut',            w: 8  },
    { key: 'pest_damage',          w: 20 },
    { key: 'healthy',              w: 0  }, // only appears as runner-up
  ],
  '🍅 Tomato': [
    { key: 'tomato_early_blight',  w: 30 },
    { key: 'tomato_late_blight',   w: 25 },
    { key: 'powdery_mildew',       w: 15 },
    { key: 'leaf_rust',            w: 10 },
    { key: 'pest_damage',          w: 20 },
  ],
  '🥔 Potato': [
    { key: 'tomato_late_blight',   w: 35 },
    { key: 'tomato_early_blight',  w: 25 },
    { key: 'leaf_rust',            w: 15 },
    { key: 'pest_damage',          w: 25 },
  ],
  '🌾 Wheat': [
    { key: 'wheat_stripe_rust',    w: 30 },
    { key: 'leaf_rust',            w: 28 },
    { key: 'powdery_mildew',       w: 22 },
    { key: 'leaf_blight',          w: 20 },
  ],
  default: [
    { key: 'leaf_blight',    w: 25 },
    { key: 'powdery_mildew', w: 25 },
    { key: 'leaf_rust',      w: 25 },
    { key: 'pest_damage',    w: 25 },
  ],
};

const SUPPORTED_CROPS = [
  '🌽 Corn','🍅 Tomato','🥔 Potato','🌾 Wheat',
  '🍇 Grape','🍎 Apple','🌶️ Pepper','🫘 Soybean',
  '🌻 Sunflower','🥦 Broccoli','🧅 Onion','🥕 Carrot',
];

/* ── Simulate a varied result from image file properties ──────────
   Uses filename hash + file size to produce different outputs for
   different images instead of always returning the same answer.
   ────────────────────────────────────────────────────────────── */
function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function generateResult(imageFile, cropLabel) {
  // Build a seed from the filename + file size so the same file
  // always produces the same result, but different files differ.
  const seed = hashString(imageFile.name + String(imageFile.size));

  const pool = CROP_DISEASES[cropLabel] || CROP_DISEASES.default;

  // Weighted random pick of the primary disease using seed
  const totalWeight = pool.reduce((s, d) => s + d.weight || s + d.w, 0);
  let pick = seed % totalWeight;
  let primaryKey = pool[pool.length - 1].key;
  for (const d of pool) {
    pick -= (d.weight || d.w);
    if (pick <= 0) { primaryKey = d.key; break; }
  }

  // Primary confidence: 58–89%, seeded
  const primaryPct = 58 + (seed % 32);

  // Distribute remaining % among 3 runner-ups from pool
  const others = pool
    .filter(d => d.key !== primaryKey)
    .slice(0, 3);

  const remaining = 100 - primaryPct;
  const splits = splitRemaining(remaining, others.length, seed);

  const results = [
    { key: primaryKey, label: DISEASES[primaryKey]?.disease || primaryKey, pct: primaryPct },
    ...others.map((d, i) => ({
      key: d.key,
      label: DISEASES[d.key]?.disease || d.key,
      pct: splits[i],
    })),
  ];

  return results;
}

function splitRemaining(total, count, seed) {
  if (count === 0) return [];
  const parts = [];
  let left = total;
  for (let i = 0; i < count - 1; i++) {
    const v = Math.max(1, Math.floor(left * ((seed >> i) % 40 + 10) / 100));
    parts.push(v);
    left -= v;
  }
  parts.push(Math.max(1, left));
  return parts;
}

export default function CropDisease() {
  const [preview, setPreview]     = useState(null);
  const [image, setImage]         = useState(null);
  const [selectedCrop, setCrop]   = useState('');
  const [result, setResult]       = useState(null);
  const [loading, setLoading]     = useState(false);
  const [activeTab, setTab]       = useState('description');
  const inputRef = useRef();

  function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  }

  function handleDrop(e) {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  }

  function handleAnalyze() {
    if (!image) return;
    setLoading(true);
    setResult(null);
    // Simulate async model inference
    setTimeout(() => {
      const res = generateResult(image, selectedCrop);
      setResult(res);
      setLoading(false);
      setTab('description');
    }, 2200);
  }

  function handleReset() {
    setImage(null);
    setPreview(null);
    setResult(null);
    setCrop('');
  }

  const top = result ? DISEASES[result[0].key] : null;

  return (
    <div className="page">
      <h1 className="page-title">🔬 Crop Disease Detection</h1>
      <p className="page-subtitle">Upload a clear photo of your crop leaf or plant for instant AI-powered diagnosis.</p>

      {/* Demo mode notice */}
      <div className="demo-notice">
        <span className="demo-notice-icon">🧪</span>
        <div>
          <strong>Demo Mode</strong> — Results are simulated. Each image produces a different output based on file properties.
          For real AI diagnosis, select your crop type before scanning.
          Connect a TensorFlow/IBM backend to replace the simulation.
        </div>
      </div>

      <div className="disease-layout">

        {/* ── Upload Panel ── */}
        <div className="card upload-panel">
          <h2 className="panel-heading">Upload Image</h2>

          {/* Crop selector */}
          <div className="crop-selector-wrap">
            <label className="crop-selector-label">
              🌾 Select Crop Type <span style={{ color: '#6b7280', fontWeight: 400 }}>(optional but improves accuracy)</span>
            </label>
            <select
              className="crop-selector"
              value={selectedCrop}
              onChange={e => setCrop(e.target.value)}
            >
              <option value="">— Any crop / Unknown —</option>
              {SUPPORTED_CROPS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div
            className={`drop-zone ${preview ? 'has-image' : ''}`}
            onDragOver={e => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => !preview && inputRef.current.click()}
          >
            {preview ? (
              <div className="preview-wrap">
                <img src={preview} alt="Crop preview" className="preview-img" />
                <div className="preview-overlay">
                  <button className="preview-change-btn" onClick={e => { e.stopPropagation(); inputRef.current.click(); }}>
                    🔄 Change Photo
                  </button>
                </div>
              </div>
            ) : (
              <div className="drop-placeholder">
                <div className="drop-icon-ring">📷</div>
                <p className="drop-title">Drag &amp; drop your crop photo</p>
                <p className="drop-hint">or <span className="drop-link">click to browse</span></p>
                <p className="drop-formats">JPG · PNG · WEBP · up to 10 MB</p>
              </div>
            )}
          </div>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            style={{ position: 'absolute', width: '1px', height: '1px', opacity: 0, pointerEvents: 'none', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}
            onChange={e => handleFile(e.target.files[0])}
          />

          <div className="upload-actions">
            {!preview ? (
              <button className="btn btn-primary full-width" onClick={() => inputRef.current.click()}>
                📁 Choose Photo
              </button>
            ) : (
              <>
                <button className="btn btn-primary" onClick={handleAnalyze} disabled={loading}>
                  {loading ? '⏳ Analyzing…' : '🔍 Detect Disease'}
                </button>
                <button className="btn btn-outline" onClick={handleReset}>✕ Reset</button>
              </>
            )}
          </div>

          <div className="upload-tips">
            <div className="tips-title">📌 Tips for best results</div>
            <ul>
              <li>🌿 Capture a single clearly affected leaf</li>
              <li>☀️ Use natural daylight, no flash</li>
              <li>🎯 Keep the leaf centred and in focus</li>
              <li>📐 Avoid shadows across the leaf</li>
              <li>🌾 Always select your crop type above</li>
            </ul>
          </div>
        </div>

        {/* ── Results Panel ── */}
        <div className="card results-panel">
          <h2 className="panel-heading">Detection Results</h2>

          {!result && !loading && (
            <div className="results-empty">
              <span className="results-empty-icon">🌿</span>
              <p>
                {selectedCrop
                  ? <>Crop: <strong>{selectedCrop}</strong> — Upload a photo and click <strong>Detect Disease</strong>.</>
                  : <>Select your crop type and upload a photo, then click <strong>Detect Disease</strong>.</>
                }
              </p>
            </div>
          )}

          {loading && (
            <div className="results-loading">
              <div className="scan-animation">
                <div className="scan-circle" />
                <div className="scan-line" />
                <span className="scan-icon">🔬</span>
              </div>
              <p className="scan-text">AI is scanning your crop…</p>
              <p className="scan-sub">
                {selectedCrop ? `Analysing ${selectedCrop} disease patterns` : 'Running 50+ disease classifiers'}
              </p>
            </div>
          )}

          {result && top && (
            <div className="results-content animate-scale-in">
              {/* Top result */}
              <div className="result-hero" style={{ borderColor: top.color }}>
                <div className="result-hero-left">
                  <span className="result-badge" style={{ background: top.color }}>
                    {top.disease}
                  </span>
                  <div className="result-conf">
                    <span className="conf-pct" style={{ color: top.color }}>{result[0].pct}%</span>
                    <span className="conf-label">Confidence</span>
                  </div>
                </div>
                <div className="result-severity">
                  <div className="sev-label">Severity</div>
                  <div className={`sev-badge sev-${top.severity.toLowerCase()}`}>{top.severity}</div>
                </div>
              </div>

              {selectedCrop && (
                <div className="result-crop-tag">
                  Analysed as: <strong>{selectedCrop}</strong>
                </div>
              )}

              {/* Breakdown bars */}
              <div className="breakdown-section">
                <div className="breakdown-title">Full Analysis Breakdown</div>
                {result.map(r => {
                  const d = DISEASES[r.key];
                  return (
                    <div key={r.key} className="breakdown-row">
                      <span className="breakdown-label">{r.label}</span>
                      <div className="breakdown-bar-wrap">
                        <div
                          className="breakdown-bar"
                          style={{ width: `${r.pct}%`, background: d ? d.color : '#9ca3af' }}
                        />
                      </div>
                      <span className="breakdown-pct">{r.pct}%</span>
                    </div>
                  );
                })}
              </div>

              {/* Detail tabs */}
              <div className="detail-tabs">
                {['description', 'causes', 'treatment', 'prevention'].map(t => (
                  <button
                    key={t}
                    className={`detail-tab ${activeTab === t ? 'active' : ''}`}
                    onClick={() => setTab(t)}
                    style={activeTab === t ? { borderColor: top.color, color: top.color } : {}}
                  >
                    {{ description: '📋 Info', causes: '🔍 Causes', treatment: '💊 Treatment', prevention: '🛡️ Prevention' }[t]}
                  </button>
                ))}
              </div>

              <div className="detail-content">
                {activeTab === 'description' && (
                  <p className="detail-text">{top.description}</p>
                )}
                {activeTab !== 'description' && (
                  <ul className="detail-list">
                    {top[activeTab].map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Demo disclaimer inside result */}
              <div className="result-disclaimer">
                🧪 <strong>Demo result</strong> — This is a simulated diagnosis. For verified results, integrate a trained CNN model or consult a local agronomist.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Supported crops */}
      <div className="card supported-crops">
        <h2 className="panel-heading">🌿 Supported Crops ({SUPPORTED_CROPS.length})</h2>
        <div className="crops-grid">
          {SUPPORTED_CROPS.map(c => (
            <span
              key={c}
              className={`crop-chip ${selectedCrop === c ? 'crop-chip-active' : ''}`}
              onClick={() => setCrop(c)}
              title={`Click to select ${c}`}
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
