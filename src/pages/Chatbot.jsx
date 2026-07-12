import { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

/* ─────────────────────────────────────────────────────────────────
   Watson Orchestrate integration point:
   Replace `simulateResponse()` below with a real API call, e.g.:
     const res = await fetch('/api/watson/chat', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ input: text, session_id: sessionId }),
     });
     const data = await res.json();
     return data.output.generic[0].text;
   ───────────────────────────────────────────────────────────────── */

/* ══════════════════════════════════════════════════════════════════
   KNOWLEDGE BASE  — each entry is a fully-structured response object
   ══════════════════════════════════════════════════════════════════ */
const KB = {

  /* ── IRRIGATION ─────────────────────────────────────────────── */
  irrigation: {
    title: 'Irrigation Scheduling',
    overview: 'Irrigation is the controlled application of water to crops. Proper scheduling prevents water stress, reduces disease risk, and saves up to 40% water compared to unscheduled flooding.',
    causes: [
      'Under-irrigation: wilting, yellowing leaves, stunted growth',
      'Over-irrigation: root rot, nutrient leaching, fungal disease spread',
      'Poor timing (midday): up to 30% water lost to evaporation',
      'Flood irrigation: uneven distribution and waterlogging',
    ],
    prevention: [
      'Use a soil moisture sensor or tensiometer to trigger irrigation only when needed',
      'Check weather forecast — skip irrigation 24 hours before expected rain',
      'Group crops by water requirement zones (hydrozoning)',
      'Mulch around plants to retain soil moisture longer',
      'Inspect pipes, drippers, and sprinklers weekly for leaks or blockages',
    ],
    treatment: [
      '💧 Drip irrigation: delivers water to root zone, cuts usage 30–50%',
      '🌧️ Sprinkler irrigation: best for field crops; irrigate in early morning (6–8 AM)',
      '🌊 Furrow/flood: suitable for row crops but inefficient — improve with land levelling',
      '📱 Smart controllers: automate scheduling based on ET (evapotranspiration) data',
    ],
    bestPractices: [
      'Irrigate in early morning (before 8 AM) — reduces evaporation and leaf wetness',
      'For vegetables: 25–40 mm/week depending on crop and season',
      'For wheat/rice: maintain 2–3 cm standing water during critical stages',
      'Monitor leaf colour and wilting as visual stress indicators',
      'Use rain gauge to track actual rainfall and adjust schedule accordingly',
    ],
    precautions: [
      '⚠️ Never irrigate during peak afternoon heat — evaporation loss exceeds 35%',
      '⚠️ Avoid waterlogging — standing water >48 hrs causes root oxygen stress',
      '⚠️ Do not use untreated wastewater near edible crop root zones',
      '⚠️ Saline irrigation water increases soil electrical conductivity (EC) — test periodically',
    ],
    crops: 'Wheat 🌾, Rice 🌾, Corn 🌽, Tomato 🍅, Cotton, Sugarcane, Vegetables',
    soilInfo: {
      suitable: 'Loamy and sandy-loam soils have best water-holding vs drainage balance',
      ph: '6.0 – 7.5 (neutral)',
      drainage: 'Well-drained soils reduce waterlogging risk; avoid clay-heavy soils without drainage',
      organic: 'Add 2–3 tonnes/ha of compost to improve water retention in sandy soils',
    },
  },

  /* ── LEAF BLIGHT ────────────────────────────────────────────── */
  blight: {
    title: 'Leaf Blight Disease',
    overview: 'Leaf blight is a fungal disease causing brown, water-soaked lesions on leaves that rapidly enlarge, killing leaf tissue and severely reducing photosynthesis and crop yield.',
    causes: [
      'Fungal pathogens: Helminthosporium, Alternaria, or Phytophthora spp.',
      'Warm humid conditions (temperature 24–30°C, humidity >80%)',
      'Prolonged leaf wetness from overhead irrigation or dense fog',
      'Infected crop debris left in field from previous season',
      'Crowded planting that restricts air movement',
    ],
    prevention: [
      'Use certified disease-free or blight-resistant seed varieties',
      'Avoid overhead irrigation — switch to drip irrigation',
      'Maintain plant spacing of 30–45 cm for adequate airflow',
      'Remove and destroy infected crop debris after harvest',
      'Apply preventive copper-based fungicide before monsoon season',
      'Crop rotation every 2 seasons — do not grow same crop repeatedly',
      'Do not work in wet fields — spreading spores on boots/tools',
    ],
    treatment: [
      '🌿 Organic: Neem oil spray (5 ml/L water) every 7 days; Trichoderma viride bio-fungicide',
      '💊 Chemical: Mancozeb 75 WP @ 2.5 g/L or Copper oxychloride 3 g/L — spray every 10 days',
      '🔴 Severe infection: Propiconazole 0.1% + Mancozeb — systemic fungicide combination',
      'Remove and bag all infected leaves — do not compost them',
    ],
    bestPractices: [
      'Scout fields every 7 days from vegetative stage onwards',
      'Apply fungicide at first sign of lesions — do not wait for spread',
      'Alternate fungicide classes to prevent resistance build-up',
      'Maintain balanced NPK nutrition — excess nitrogen increases susceptibility',
      'Record disease incidence and weather conditions to predict future outbreaks',
    ],
    precautions: [
      '⚠️ Do not spray fungicide during rain or immediately before rain — will wash off',
      '⚠️ Wear gloves and mask when applying chemical fungicides',
      '⚠️ Do not reuse irrigation water from infected fields — spreads spores',
      '⚠️ Destroy, do not compost, infected plant material',
    ],
    crops: 'Corn 🌽, Wheat 🌾, Rice 🌾, Potato 🥔, Tomato 🍅, Soybean, Cotton',
  },

  /* ── POWDERY MILDEW ─────────────────────────────────────────── */
  mildew: {
    title: 'Powdery Mildew',
    overview: 'Powdery mildew is a fungal disease creating white powdery coating on leaf surfaces. It blocks sunlight from reaching leaf cells, reduces photosynthesis by up to 40%, and can cause premature leaf drop.',
    causes: [
      'Erysiphales fungi (obligate parasites — live only on plant tissue)',
      'Dry warm days (20–28°C) combined with cool humid nights',
      'Crowded planting reducing air movement between plants',
      'Excess nitrogen fertilisation producing soft, lush growth',
      'Stressed or weakened plants are most susceptible',
    ],
    prevention: [
      'Plant resistant varieties — check local agronomy extension recommendations',
      'Maintain minimum 40 cm plant spacing for airflow',
      'Avoid excess nitrogen — use balanced NPK with potassium emphasis',
      'Remove and destroy infected leaves at first detection',
      'Apply sulphur dust preventively at start of dry season',
      'Ensure good drainage — reduce excess soil moisture',
    ],
    treatment: [
      '🌿 Organic: Neem oil (5 ml/L) or potassium bicarbonate (10 g/L) spray weekly',
      '🌿 Baking soda spray: 5 g sodium bicarbonate + 2 ml liquid soap per litre water',
      '💊 Chemical: Wettable sulphur 80 WP @ 3 g/L, or Hexaconazole 0.1% systemic spray',
      'Apply spray on both upper and lower leaf surfaces for complete coverage',
    ],
    bestPractices: [
      'Monitor crops from flowering stage — peak susceptibility period',
      'Spray in early morning or late evening — not in midday heat',
      'Alternate between neem oil and sulphur to prevent resistance',
      'Keep records of first infection date to predict next season timing',
      'Improve soil health with compost to boost plant natural resistance',
    ],
    precautions: [
      '⚠️ Sulphur spray damages plants if temperature exceeds 35°C — apply on cooler days only',
      '⚠️ Do not apply sulphur within 2 weeks of oil-based sprays — phytotoxicity risk',
      '⚠️ Infected debris should be burned or buried — not composted',
    ],
    crops: 'Wheat 🌾, Grapes 🍇, Cucumbers 🥒, Tomato 🍅, Squash, Peas, Mango 🥭',
  },

  /* ── FERTILIZER — GENERAL ───────────────────────────────────── */
  fertilizer: {
    title: 'Fertilizer Recommendations',
    overview: 'Fertilizers supply essential nutrients (N, P, K) that crops need for healthy growth. Improper application causes nutrient toxicity, leaching, and environmental pollution. A soil test is the foundation of any fertilizer plan.',
    causes: [
      'Nutrient deficiency: yellowing, stunting, poor fruiting',
      'Over-application: salt burn, groundwater contamination, blocked nutrient uptake',
      'Wrong timing: nutrients applied when crops cannot absorb them are wasted',
      'pH imbalance: nutrients locked up at wrong pH levels',
    ],
    prevention: [
      'Get soil test before every season — test for N, P, K, and pH',
      'Follow soil test recommendations exactly — do not guess',
      'Use slow-release fertilizers to reduce leaching loss',
      'Incorporate organic matter (compost, FYM) to improve nutrient holding capacity',
      'Apply fertilizer in multiple splits — not all at once',
    ],
    treatment: [
      '🌿 Organic: Farmyard Manure (FYM) 10–15 t/ha, vermicompost 2–3 t/ha, neem cake 250 kg/ha',
      '💊 Chemical: Follow NPK ratio based on crop (see below)',
      '🌱 Foliar spray: 2% urea solution for quick nitrogen top-up during growing season',
      '🔬 Biofertilizers: Rhizobium (legumes), Azospirillum (cereals) fix atmospheric nitrogen',
    ],
    bestPractices: [
      'Split nitrogen into 3 applications: basal (40%) + tillering (35%) + grain fill (25%)',
      'Apply phosphorus and potassium as full basal dose at sowing',
      'Use a sprinkler or drip system to fertirigate — saves 20–30% fertilizer',
      'Test soil pH every 2 years — add lime if acidic, sulphur if alkaline',
      'Rotate between legume crops to naturally add nitrogen to soil',
    ],
    precautions: [
      '⚠️ Never apply urea on waterlogged soil — volatilisation losses exceed 50%',
      '⚠️ Keep fertilizer bag sealed and dry — moisture causes caking and nutrient loss',
      '⚠️ Do not mix urea with single superphosphate (SSP) directly — apply separately',
      '⚠️ Maintain 5–7 day gap between pesticide spray and foliar fertilizer spray',
    ],
    crops: 'All crops — especially Wheat 🌾, Rice 🌾, Corn 🌽, Tomato 🍅, Cotton, Sugarcane',
    fertilizerInfo: {
      wheat:    'N:P:K = 120:60:40 kg/ha | Apply at sowing + tillering + flag-leaf stage',
      rice:     'N:P:K = 100:50:50 kg/ha | Basal + active tillering + panicle initiation',
      corn:     'N:P:K = 150:75:60 kg/ha | Basal + knee-high stage + tasseling',
      tomato:   'N:P:K = 90:60:80 kg/ha | Weekly liquid feed from fruit set onwards',
      general:  'Base: 12:32:16 NPK complex @ 250 kg/ha as starter dose',
    },
  },

  /* ── NITROGEN DEFICIENCY ────────────────────────────────────── */
  nitrogen: {
    title: 'Nitrogen Deficiency',
    overview: 'Nitrogen (N) is the most critical macronutrient for plant growth. Deficiency causes characteristic yellowing of older leaves from bottom up, stunted growth, and significantly reduced grain yield.',
    causes: [
      'Insufficient nitrogen application at sowing or topdress stages',
      'Heavy rainfall leaching nitrates below root zone',
      'Waterlogged soil converting nitrates to gases (denitrification)',
      'High-carbon crop residues tying up soil nitrogen during decomposition',
      'Soil pH below 5.5 or above 8.0 reducing nitrogen availability',
    ],
    prevention: [
      'Split nitrogen application: 40% basal + 35% first topdress + 25% second topdress',
      'Use nitrification inhibitors (e.g., DCD) to slow nitrogen conversion and loss',
      'Grow green manure crops (dhaincha, sun hemp) before main crop to add nitrogen',
      'Test soil nitrogen before each season and supplement accordingly',
      'Avoid waterlogging — ensure field drainage channels are clear',
    ],
    treatment: [
      '⚡ Quick fix: Foliar spray of 2% urea solution (20 g urea/L water) on yellowing leaves',
      '💊 Soil application: Urea 46% N @ 50–65 kg/ha or Ammonium Sulphate @ 100 kg/ha',
      '🌿 Organic: Apply vermicompost 2 t/ha or poultry manure 5 t/ha near root zone',
      'Apply top-dress nitrogen within 24 hours of light rain for best uptake',
    ],
    bestPractices: [
      'Maintain soil organic matter above 2% to buffer nitrogen availability',
      'Use legume cover crops in rotation to fix 60–120 kg N/ha naturally',
      'Monitor SPAD chlorophyll meter readings to guide topdress timing',
      'Incorporate crop residues with urea to balance C:N ratio',
    ],
    precautions: [
      '⚠️ Excess nitrogen causes lodging, late maturity, and increased pest susceptibility',
      '⚠️ Do not apply urea on wet soil — ammonia volatilisation loss up to 30%',
      '⚠️ Yellowing from nitrogen must be distinguished from viral infection — check pattern',
    ],
    crops: 'Wheat 🌾, Rice 🌾, Corn 🌽, Sugarcane, Vegetables, Cotton',
    fertilizerInfo: {
      general: 'Urea (46% N): 130–170 kg/ha depending on crop | Split in 2–3 doses',
    },
  },

  /* ── SOIL pH ────────────────────────────────────────────────── */
  soilph: {
    title: 'Soil pH Management',
    overview: 'Soil pH controls the availability of all plant nutrients. Most crops grow best between pH 6.0–7.5. Outside this range, nutrients become chemically locked — even if present in soil, roots cannot absorb them.',
    causes: [
      'Acidic soil (pH <6): excessive rainfall leaching calcium and magnesium; heavy use of ammonium-based fertilizers',
      'Alkaline soil (pH >7.5): calcareous parent material; excessive irrigation with hard water; sodium accumulation',
      'Incorrect fertilizer type for soil type',
    ],
    prevention: [
      'Test soil pH every 2 years using a calibrated meter or soil test kit',
      'Use pH-buffering organic matter — compost stabilises pH over time',
      'Select fertilizers appropriate for soil type: use sulphate-based in alkaline soils',
      'Avoid over-irrigation which leaches calcium from soil',
      'Grow acid-tolerant cover crops on acidic soils before correction',
    ],
    treatment: [
      '🔴 To raise pH (acidic soil): Apply agricultural lime (CaCO₃) 2–4 t/ha; dolomite 1–2 t/ha',
      '🔵 To lower pH (alkaline soil): Apply sulphur powder 200–500 kg/ha; gypsum 1–2 t/ha',
      '🌿 Organic buffers: Vermicompost 2 t/ha helps buffer pH in both directions',
      'Apply amendments 4–6 weeks before sowing for effective pH shift',
    ],
    bestPractices: [
      'Ideal range: 6.0–6.8 for most vegetable crops; 6.5–7.0 for cereals',
      'Acidic soil for blueberries/tea: 4.5–5.5 — use elemental sulphur to maintain',
      'Incorporate lime thoroughly into topsoil — do not just surface apply',
      'Retest pH 3 months after amendment application to check effectiveness',
    ],
    precautions: [
      '⚠️ Do not over-lime — pH >7.8 causes micronutrient deficiency (Fe, Mn, Zn)',
      '⚠️ Sulphur takes 4–8 weeks to lower pH — do not over-apply expecting instant results',
      '⚠️ Do not apply lime and ammonium fertilizer together — nitrogen volatilisation loss',
    ],
    crops: 'All crops | Tomato 🍅 pH 6.0–6.8 | Wheat 🌾 pH 6.5–7.0 | Potato 🥔 pH 5.8–6.2 | Grapes 🍇 pH 5.5–6.5',
    soilInfo: {
      suitable: 'Loamy soils maintain pH most stably; sandy soils become acidic faster',
      ph: 'Target: 6.0–7.0 for most crops; test annually',
      drainage: 'Well-drained soils lose less calcium and maintain pH better',
      organic: 'Compost (2–3 t/ha/year) is the best long-term pH buffer — adds slowly',
    },
  },

  /* ── WEATHER IMPACT ─────────────────────────────────────────── */
  weather: {
    title: 'Weather & Farming Impact',
    overview: 'Weather is the single biggest determinant of crop success or failure. Understanding temperature, rainfall, humidity, and wind allows farmers to schedule operations, protect crops, and maximise yield.',
    causes: [
      'Extreme heat (>38°C): pollen sterility, fruit drop, increased irrigation need',
      'Cold/frost (<4°C): cell damage, wilting, crop death in sensitive species',
      'Excess rain: waterlogging, disease spread, nutrient leaching, harvest delays',
      'Drought: water stress, reduced grain fill, yield loss up to 60%',
      'High humidity (>85%): fungal disease explosion — blight, mildew, rust',
      'Strong wind (>40 km/h): lodging, soil erosion, pesticide drift',
    ],
    prevention: [
      'Monitor 7-day forecast daily using a weather app or agro-met station',
      'Delay pesticide/fertilizer application 48 hours before predicted rain',
      'Establish windbreaks (tree rows) on field borders to reduce wind damage',
      'Use frost-protection cloth or overhead sprinklers for frost events',
      'Prepare field drainage channels before monsoon season',
      'Schedule irrigation to compensate for dry spell forecasts',
    ],
    treatment: [
      '🌡️ Heat stress: apply kaolin clay spray (5%) to reflect sunlight; irrigate in morning',
      '❄️ Frost: light overhead irrigation before freeze locks latent heat in ice',
      '🌧️ Waterlogging: open drainage channels within 24 hrs; apply potassium nitrate as foliar',
      '💨 Wind damage: stake lodged plants; apply potassium to strengthen stems',
      '🌫️ High humidity: apply preventive fungicide; thin canopy to improve airflow',
    ],
    bestPractices: [
      'Install an automatic weather station at farm — temperature, humidity, rainfall, wind',
      'Subscribe to IMD (India Meteorological Department) agro-advisory SMS alerts',
      'Adjust sowing date by 1–2 weeks based on monsoon forecast each year',
      'Use agri-insurance schemes to protect against weather-related crop loss',
      'Keep spray records noting weather at time of application for efficacy review',
    ],
    precautions: [
      '⚠️ Never spray contact pesticides when wind speed >15 km/h — drift hazard',
      '⚠️ High UV days (UV index >8) degrade some pesticides within 2 hours — spray in evening',
      '⚠️ Apply fungicide preventively before rain — not after infection has set in',
    ],
    crops: 'All crops affected | Especially Wheat 🌾 (frost, heat), Rice 🌾 (flood), Cotton (humidity), Grapes 🍇 (wind)',
    weatherInfo: {
      temperature: 'Most crops: 18–30°C optimal; above 35°C causes heat stress in most species',
      rainfall: '500–1200 mm/year optimal for most field crops; rice needs 1200–1800 mm',
      humidity: '50–75% ideal; >85% for 3+ days triggers fungal disease outbreaks',
      wind: 'Light breeze (<20 km/h) aids pollination; >40 km/h causes lodging and drift',
    },
  },

  /* ── PEST CONTROL ───────────────────────────────────────────── */
  pest: {
    title: 'Pest Control & Management',
    overview: 'Crop pests — insects, mites, rodents — can destroy 20–80% of yield if unmanaged. Integrated Pest Management (IPM) combines cultural, biological, and chemical methods to minimise damage sustainably.',
    causes: [
      'Monoculture farming — same crop repeatedly builds pest populations',
      'No field hygiene — crop debris harbours overwintering pests',
      'Excess nitrogen fertilisation — soft lush growth attracts aphids and caterpillars',
      'Disruption of natural enemies (predators/parasitoids) by indiscriminate pesticide use',
      'Delayed sowing or harvest increases exposure to peak pest pressure windows',
    ],
    prevention: [
      'Practise crop rotation every season — breaks pest lifecycle',
      'Use pheromone traps to monitor adult moth population and predict egg-laying',
      'Install yellow sticky traps for aphids and whiteflies (10–15 traps/ha)',
      'Encourage natural predators: ladybirds, lacewings, parasitic wasps',
      'Keep field borders clean — remove weeds that host pest populations',
      'Use resistant or tolerant crop varieties where available',
      'Follow recommended plant density — overcrowding increases pest spread',
    ],
    treatment: [
      '🌿 Organic/Bio: Neem oil (5 ml/L) every 7 days; Beauveria bassiana for caterpillars; Bt spray for armyworm',
      '💊 Chemical: Lambda-cyhalothrin 2.5 EC @ 1 ml/L for caterpillars/borers; Imidacloprid 17.8 SL @ 0.5 ml/L for sap-suckers',
      '🔬 Biological: Release Trichogramma cards (50,000 eggs/ha/week) against stem borer and earworm',
      'Apply insecticide in early morning or evening when bees are inactive',
    ],
    bestPractices: [
      'Scout fields twice weekly — count pests and check Economic Threshold Level (ETL)',
      'Spray only when pest population exceeds ETL — save cost and preserve beneficials',
      'Rotate insecticide classes to prevent resistance: organophosphate → pyrethroid → neonicotinoid',
      'Keep spray records: pest, product used, date, weather conditions, effectiveness',
    ],
    precautions: [
      '⚠️ Never spray insecticide during flowering — lethal to pollinators (bees)',
      '⚠️ Wear full PPE: gloves, mask, goggles, long-sleeved clothing when spraying',
      '⚠️ Never mix unknown pesticide combinations — chemical incompatibility causes toxicity',
      '⚠️ Pre-harvest interval (PHI) must be respected — check product label',
    ],
    crops: 'All crops | Corn 🌽 (earworm, armyworm) | Rice 🌾 (stem borer, BPH) | Cotton (bollworm) | Vegetables (aphids, whitefly)',
  },

  /* ── COMPOSTING / ORGANIC ───────────────────────────────────── */
  organic: {
    title: 'Organic Farming & Composting',
    overview: 'Organic farming uses natural inputs — compost, biofertilizers, biopesticides — to grow crops without synthetic chemicals. It improves long-term soil health, biodiversity, and fetches 20–40% premium market price.',
    causes: [
      'Soil degradation from continuous synthetic fertilizer use',
      'Pesticide residues in food reducing market acceptance',
      'Loss of soil microbiome reducing nutrient cycling efficiency',
      'Rising input costs making chemical farming less profitable',
    ],
    prevention: [
      'Build compost pit: layer green waste + brown waste + cow dung + soil every 15 days',
      'Prepare jeevamrutha (cow dung 10 kg + urine 5 L + jaggery 1 kg + gram flour 1 kg + soil in 200 L water) — apply weekly',
      'Use Panchagavya (5 cow products) foliar spray @ 3% for plant growth promotion',
      'Grow green manure crops: Dhaincha, Sun Hemp — plough in at 40 days',
      'Mulch with rice straw or dry leaves to retain moisture and suppress weeds',
    ],
    treatment: [
      '🌿 Ready compost: 2–3 tonnes/ha applied 2 weeks before sowing',
      '🔬 Bio-fertilizers: Rhizobium for legumes, Azospirillum for cereals, PSB for phosphorus solubilisation',
      '🌱 Vermicompost: 1–2 t/ha in furrows or soil mixing before transplanting',
      'Trichoderma viride: 5 kg/ha mixed with compost — controls soil-borne diseases',
    ],
    bestPractices: [
      'Maintain 3-year records for organic certification (NPOP, India Organic)',
      'Establish composting units — convert all crop and kitchen waste into soil amendment',
      'Use cover crops between main crops to add biomass and fix nitrogen',
      'Keep a biodiversity strip with flowering plants to attract beneficial insects',
    ],
    precautions: [
      '⚠️ Raw/fresh animal manure applied near harvest can contaminate produce with pathogens',
      '⚠️ Compost C:N ratio must be 25:1 — too much carbon slows decomposition and ties nitrogen',
      '⚠️ Transition period of 2–3 years expected before full organic yield potential achieved',
    ],
    crops: 'All crops | Especially Vegetables 🥦, Fruits 🍎, Pulses, Spices',
    soilInfo: {
      suitable: 'Loamy soil with high organic matter (>3%) ideal for organic systems',
      ph: '6.0–7.0 | Organic matter naturally buffers pH',
      drainage: 'Good drainage essential — waterlogged soil destroys beneficial soil life',
      organic: 'Target: raise soil organic carbon (SOC) by 0.1% per year through compost additions',
    },
  },

  /* ── HARVEST / STORAGE ──────────────────────────────────────── */
  harvest: {
    title: 'Harvest & Post-Harvest Storage',
    overview: 'Correct harvesting time and proper storage prevent post-harvest losses of 20–40% that occur every year. Harvesting too early or too late, and poor storage conditions, destroy the value of an entire season\'s work.',
    causes: [
      'Premature harvest: immature grain, poor quality, low germination rate',
      'Delayed harvest: shattering losses, bird damage, field fungal infection',
      'Incorrect moisture at storage: >14% moisture causes mould and mycotoxins',
      'Poor storage structure: moisture ingress, rodent damage, insect infestation',
    ],
    prevention: [
      'Test grain moisture with a meter before harvest — target <14% for safe storage',
      'Use combine harvester with correct cylinder speed and concave clearance settings',
      'Harvest in dry sunny weather — avoid harvesting after rain',
      'Clean storage structure thoroughly before loading new crop',
      'Apply grain protectant (Malathion 50 EC or Deltamethrin) to empty godown before filling',
    ],
    treatment: [
      '🌾 Grain drying: Sun-dry on clean tarpaulin 3–5 days or use mechanical grain dryer',
      '💊 Grain treatment: Malathion dust 500 g/tonne + Deltamethrin 1% powder 300 g/tonne for stored grain insects',
      '🐀 Rodent control: zinc phosphide bait (3% ZnP) placed in burrows near store',
      '📦 Hermetic bags (Purdue Improved Cowpea Storage bags): zero oxygen — no insects or fungi',
    ],
    bestPractices: [
      'Harvest cereals at 14–16% moisture, dry to 12–13% before long-term storage',
      'Fumigate with Aluminium Phosphide (3 tablets/tonne) in sealed structure for 5 days',
      'Monitor stored grain temperature and moisture monthly',
      'Label all bags: crop variety, harvest date, field number, treatment applied',
    ],
    precautions: [
      '⚠️ Aluminium Phosphide (Celphos) is highly toxic — use only trained applicators with PPE',
      '⚠️ Do not store wet grain — mould produces aflatoxin harmful to humans and livestock',
      '⚠️ Keep storage away from direct sunlight and moisture — use raised platform (15 cm off ground)',
    ],
    crops: 'Wheat 🌾, Rice 🌾, Corn 🌽, Soybean, Pulses 🫘, Onion 🧅, Potato 🥔',
  },

  /* ── DEFAULT / GENERAL ──────────────────────────────────────── */
  default: {
    title: 'Smart Farming Best Practices',
    overview: 'Modern smart farming combines AI, data science, and precision agriculture to help farmers increase yield, reduce input costs, and protect crops from disease and weather stress.',
    causes: [
      'Lack of real-time crop monitoring leads to delayed problem identification',
      'Inconsistent input application wastes resources and reduces effectiveness',
      'Poor record-keeping prevents learning from past season successes/failures',
    ],
    prevention: [
      'Monitor crops visually every 7 days — walk all field sections',
      'Keep a farm diary: sowing date, variety, inputs applied, pest observations, yield',
      'Use AI tools (this app) for disease detection, fertilizer planning, and weather alerts',
      'Build relationships with local Krishi Vigyan Kendra (KVK) for free expert advice',
      'Join a Farmer Producer Organisation (FPO) for bulk input purchase and better prices',
    ],
    treatment: [
      '📊 Use the Farm Dashboard to track soil conditions and AI alerts daily',
      '🔬 Upload crop images to Crop Disease Detection for instant diagnosis',
      '🌤️ Check Weather Dashboard before every spray or fertilizer application',
      '🤖 Ask this AI assistant any specific question — the more detail you provide, the better the answer',
    ],
    bestPractices: [
      'Invest in soil health: test every 2 years, apply compost annually',
      'Diversify crops — grow 2–3 crops/year to spread income and disease risk',
      'Attend farmer training programmes — especially on IPM and precision irrigation',
      'Use government subsidies for drip irrigation, soil testing, and crop insurance',
    ],
    precautions: [
      '⚠️ Verify advice from multiple sources before major investment decisions',
      '⚠️ Weather forecasts are probabilistic — always have a contingency plan',
      '⚠️ Consult a certified agronomist for diagnosis of unfamiliar problems',
    ],
    crops: 'All crops | Ask about a specific crop for tailored recommendations',
  },
};

/* ══════════════════════════════════════════════════════════════════
   INTENT ROUTER  — maps user input to a KB entry
   ══════════════════════════════════════════════════════════════════ */
function detectIntent(text) {
  const l = text.toLowerCase();

  // Language check — Devanagari Unicode block
  const isHindi   = /[\u0900-\u097F]/.test(text);
  const isMarathi = isHindi && /कधी|सिंचन|खत|रोग|शेती|पाऊस|तापमान/.test(text);

  if (isHindi || isMarathi) return 'lang';

  if (l.match(/irrigat|when.*water|how.*water|drip|sprinkler|flood.*irrig|moisture.*schedule|watering|कधी|सिंचन/))
    return 'irrigation';
  if (l.match(/blight|brown.*leaf|leaf.*spot|lesion|water.soak|alternaria|helmintho/))
    return 'blight';
  if (l.match(/mildew|white.*powder|powder.*white|fungal.*coat|erysip/))
    return 'mildew';
  if (l.match(/rust|orange.*pustule|pustule|puccinia/))
    return 'mildew'; // rust reuses mildew structure
  if (l.match(/fertiliz|npk|urea|dap|manure|nitrogen|phospho|potassium|nutrient|compost.*fertiliz|खत/))
    return 'fertilizer';
  if (l.match(/nitrogen.*deficien|yellow.*leaf|pale.*leaf|n.*deficien|sign.*nitrogen|lack.*nitrogen/))
    return 'nitrogen';
  if (l.match(/soil.*ph|ph.*soil|acid.*soil|alkaline|lime.*soil|soil.*acid|improve.*ph|ph.*level/))
    return 'soilph';
  if (l.match(/weather|rain|temperature|humid|forecast|frost|heat.*stress|cold.*crop|flood|drought|wind|पाऊस|तापमान/))
    return 'weather';
  if (l.match(/pest|insect|aphid|worm|borer|moth|caterpillar|earworm|armyworm|thrip|mite|whitefly|locust/))
    return 'pest';
  if (l.match(/organic|compost|vermicompost|biofertiliz|natural.*farm|jeevamrutha|panchagavya|green.*manure/))
    return 'organic';
  if (l.match(/harvest|storage|store.*grain|grain.*store|post.harvest|silo|moisture.*grain|threshing/))
    return 'harvest';
  if (l.match(/disease|sick.*plant|infected|diagnos|spot.*leaf|discolor|dying.*plant/))
    return 'blight';

  return 'default';
}

/* ══════════════════════════════════════════════════════════════════
   RESPONSE BUILDER  — converts KB entry → structured HTML string
   ══════════════════════════════════════════════════════════════════ */
function buildHtml(intent, query) {

  // Language fallback
  if (intent === 'lang') {
    return `<div class="r-lang">
      <div class="r-section-head">🌐 Language Support / भाषा सहायता / भाषा सहाय्य</div>
      <p>मैं हिंदी और मराठी में सवाल समझ सकता हूँ। कृपया अपना सवाल यहाँ लिखें — उत्तर अंग्रेजी में होगा।<br/>
      मी हिंदी आणि मराठीत प्रश्न समजतो. कृपया आपला प्रश्न येथे लिहा — उत्तर इंग्रजीत असेल.</p>
      <p style="margin-top:.5rem">Please type your farming question in Hindi, Marathi, or English and I will give you a detailed answer. For example:<br/>
      <em>कब सिंचाई करें? / सिंचन कधी करावे? / When should I irrigate?</em></p>
    </div>`;
  }

  const k = KB[intent] || KB.default;

  const li = (arr) => arr.map(s => `<li>${s}</li>`).join('');

  // Build extra blocks for fertilizer / soil / weather
  let extraHtml = '';

  if (k.soilInfo) {
    const s = k.soilInfo;
    extraHtml += `<div class="r-section">
      <div class="r-section-head">🪱 Soil Requirements</div>
      <ul>
        <li><strong>Suitable Soil:</strong> ${s.suitable}</li>
        <li><strong>Ideal pH:</strong> ${s.ph}</li>
        <li><strong>Drainage:</strong> ${s.drainage}</li>
        <li><strong>Organic Matter:</strong> ${s.organic}</li>
      </ul>
    </div>`;
  }

  if (k.fertilizerInfo) {
    const f = k.fertilizerInfo;
    const rows = Object.entries(f).map(([crop, val]) =>
      `<li><strong>${crop.charAt(0).toUpperCase() + crop.slice(1)}:</strong> ${val}</li>`
    ).join('');
    extraHtml += `<div class="r-section">
      <div class="r-section-head">⚗️ NPK Recommendations by Crop</div>
      <ul>${rows}</ul>
    </div>`;
  }

  if (k.weatherInfo) {
    const w = k.weatherInfo;
    extraHtml += `<div class="r-section">
      <div class="r-section-head">🌡️ Key Weather Parameters</div>
      <ul>
        <li><strong>Temperature:</strong> ${w.temperature}</li>
        <li><strong>Rainfall:</strong> ${w.rainfall}</li>
        <li><strong>Humidity:</strong> ${w.humidity}</li>
        <li><strong>Wind:</strong> ${w.wind}</li>
      </ul>
    </div>`;
  }

  return `
    <div class="r-title">${k.title}</div>

    <div class="r-section">
      <div class="r-section-head">🌱 Overview</div>
      <p>${k.overview}</p>
    </div>

    <div class="r-section">
      <div class="r-section-head">🔍 Causes</div>
      <ul>${li(k.causes)}</ul>
    </div>

    <div class="r-section">
      <div class="r-section-head">✅ Prevention</div>
      <ul>${li(k.prevention)}</ul>
    </div>

    <div class="r-section">
      <div class="r-section-head">🛠️ Treatment</div>
      <ul>${li(k.treatment)}</ul>
    </div>

    <div class="r-section">
      <div class="r-section-head">🌾 Best Practices</div>
      <ul>${li(k.bestPractices)}</ul>
    </div>

    <div class="r-section">
      <div class="r-section-head">⚠️ Precautions</div>
      <ul>${li(k.precautions)}</ul>
    </div>

    ${extraHtml}

    <div class="r-crops">
      <span class="r-crops-label">📌 Suitable Crops:</span> ${k.crops}
    </div>
  `.trim();
}

/* ══════════════════════════════════════════════════════════════════
   MAIN ENTRY — ties intent + builder together
   ══════════════════════════════════════════════════════════════════ */
function generateResponse(query) {
  const intent = detectIntent(query);
  return buildHtml(intent, query);
}

/* ── Suggestion chips ── */
const SUGGESTIONS = [
  'When should I irrigate?',
  'Best fertilizer for wheat?',
  'How to prevent leaf blight?',
  'How to improve soil pH?',
  'Signs of nitrogen deficiency?',
  'Weather impact on crops?',
  'How to control pests organically?',
  'Best practices for grain storage?',
];

const INITIAL_MSG = {
  id: 1,
  from: 'bot',
  html: `<div class="r-section-head" style="font-size:1rem;margin-bottom:.5rem">👋 Welcome to SmartFarm AI</div>
<p>I'm your agricultural expert assistant powered by <strong>IBM Granite</strong>. Ask me anything about:</p>
<ul>
  <li>💧 Irrigation scheduling &amp; water management</li>
  <li>🦠 Crop disease identification &amp; treatment</li>
  <li>🌱 Fertilizer &amp; NPK recommendations</li>
  <li>🌤️ Weather impact on farming operations</li>
  <li>🐛 Pest control (organic &amp; chemical)</li>
  <li>🪱 Soil health, pH, and composting</li>
  <li>🌾 Harvest timing &amp; storage best practices</li>
</ul>
<p style="margin-top:.5rem;color:#6b7280;font-size:.85rem">Also supports <strong>Hindi</strong> (हिंदी) and <strong>Marathi</strong> (मराठी) questions.</p>`,
  ts: new Date(),
};

let nextId = 2;
function formatTime(d) {
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function Chatbot() {
  const [messages, setMessages] = useState([INITIAL_MSG]);
  const [input, setInput]       = useState('');
  const [typing, setTyping]     = useState(false);
  const bottomRef = useRef();
  const inputRef  = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  /* ── Watson Orchestrate integration point ──
     Replace the body of this function with a real fetch() call.
     Return the raw HTML string from the server.              */
  function simulateResponse(text) {
    return new Promise(resolve => {
      const delay = 800 + Math.random() * 600;
      setTimeout(() => resolve(generateResponse(text)), delay);
    });
  }

  async function sendMessage(text) {
    const trimmed = text.trim();
    if (!trimmed || typing) return;

    const userMsg = { id: nextId++, from: 'user', text: trimmed, ts: new Date() };
    setMessages(m => [...m, userMsg]);
    setInput('');
    setTyping(true);

    const html = await simulateResponse(trimmed);
    setMessages(m => [...m, { id: nextId++, from: 'bot', html, ts: new Date() }]);
    setTyping(false);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
  }

  function clearChat() {
    setMessages([INITIAL_MSG]);
    setInput('');
  }

  return (
    <div className="page chatbot-page">
      {/* Header */}
      <div className="chatbot-header">
        <div>
          <h1 className="page-title">🤖 AI Farming Assistant</h1>
          <p className="page-subtitle">Powered by IBM Granite · Detailed expert answers on crops, soil, pests &amp; more.</p>
        </div>
        <div className="chatbot-actions">
          <span className="watson-badge">
            <span className="watson-dot" />
            IBM Watson Ready
          </span>
          <button className="btn btn-outline btn-sm" onClick={clearChat}>🗑️ Clear</button>
        </div>
      </div>

      <div className="chat-outer card">
        {/* Header bar */}
        <div className="chat-header-bar">
          <div className="chat-bot-info">
            <div className="chat-bot-avatar">🌿</div>
            <div>
              <div className="chat-bot-name">SmartFarm AI — Agricultural Expert</div>
              <div className="chat-bot-status">
                <span className="online-dot" /> Online · IBM Granite · English / हिंदी / मराठी
              </div>
            </div>
          </div>
          <div className="chat-header-right">
            <span className="chat-secure">🔒 Secure</span>
          </div>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {messages.map(msg => (
            <div key={msg.id} className={`msg-group ${msg.from}`}>
              {msg.from === 'bot' && (
                <div className="msg-avatar bot-avatar-sm">🌿</div>
              )}
              <div className="msg-col">
                {msg.from === 'bot' ? (
                  <div
                    className="bubble bot bubble-rich"
                    dangerouslySetInnerHTML={{ __html: msg.html || msg.text || '' }}
                  />
                ) : (
                  <div className="bubble user">{msg.text}</div>
                )}
                <div className="msg-time">{formatTime(msg.ts)}</div>
              </div>
              {msg.from === 'user' && (
                <div className="msg-avatar user-avatar-sm">👤</div>
              )}
            </div>
          ))}

          {typing && (
            <div className="msg-group bot">
              <div className="msg-avatar bot-avatar-sm">🌿</div>
              <div className="msg-col">
                <div className="bubble bot typing-bubble">
                  <span /><span /><span />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick suggestions */}
        <div className="suggestions-bar">
          <span className="sug-label">Quick asks:</span>
          <div className="sug-chips">
            {SUGGESTIONS.map(s => (
              <button key={s} className="sug-chip" onClick={() => sendMessage(s)} disabled={typing}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="chat-input-bar">
          <textarea
            ref={inputRef}
            className="chat-input"
            rows={1}
            placeholder="Ask in English, Hindi (हिंदी), or Marathi (मराठी)…"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={typing}
          />
          <button
            className="send-btn"
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || typing}
            aria-label="Send"
          >
            ➤
          </button>
        </div>
        <div className="chat-footer-note">
          Responses are AI-generated expert guidance. Always consult a local agronomist for critical decisions.
        </div>
      </div>
    </div>
  );
}
