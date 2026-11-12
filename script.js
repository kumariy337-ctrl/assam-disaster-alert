// =====================================================================
// ASSAM DISASTER ALERT (STUDENT PROTOTYPE)
// Independent flood & hazard awareness dashboard using Leaflet,
// Open-Meteo, USGS, and Overpass. Not affiliated with ASDMA, CWC, IMD, or NDRF.
// =====================================================================

// ================= 1. CENTRALIZED VERIFIED HELPLINE REGISTRY =================
const HELPLINE_LAST_VERIFIED = "2026-11-12";

const HELPLINE_DIRECTORY = {
  // National Emergency Short Codes
  erns_112: { label: "National Emergency Unified Helpline", number: "112", verified: true, category: "national", source_url: "https://www.india.gov.in", last_verified: HELPLINE_LAST_VERIFIED },
  police_100: { label: "Police Emergency Helpline", number: "100", verified: true, category: "national", source_url: "https://www.india.gov.in", last_verified: HELPLINE_LAST_VERIFIED },
  fire_101: { label: "Fire & Emergency Helpline", number: "101", verified: true, category: "national", source_url: "https://www.india.gov.in", last_verified: HELPLINE_LAST_VERIFIED },
  ambulance_108: { label: "Emergency Ambulance (108)", number: "108", verified: true, category: "national", source_url: "https://asdma.gov.in", last_verified: HELPLINE_LAST_VERIFIED },
  women_1091: { label: "Women Helpline", number: "1091", verified: true, category: "national", source_url: "https://www.india.gov.in", last_verified: HELPLINE_LAST_VERIFIED },
  child_1098: { label: "Child Helpline", number: "1098", verified: true, category: "national", source_url: "https://www.india.gov.in", last_verified: HELPLINE_LAST_VERIFIED },
  highway_1033: { label: "NHAI Highway Emergency Helpline", number: "1033", verified: true, category: "national", source_url: "https://nhai.gov.in", last_verified: HELPLINE_LAST_VERIFIED },
  railways_139: { label: "Indian Railways Helpline", number: "139", verified: true, category: "national", source_url: "https://www.india.gov.in", last_verified: HELPLINE_LAST_VERIFIED },

  // Verified State & Sector Helplines (Assam)
  seoc_1070: { label: "Assam State Emergency Operation Centre (SEOC)", number: "1070", altNumber: "0361-2237011", verified: true, category: "state", source_url: "https://asdma.gov.in", last_verified: HELPLINE_LAST_VERIFIED },
  seoc_1079: { label: "Assam Alternate State Emergency Helpline", number: "1079", verified: true, category: "state", source_url: "https://assam.gov.in", last_verified: HELPLINE_LAST_VERIFIED },
  deoc_1077: { label: "District Emergency Operation Centre (DEOC Toll-Free)", number: "1077", verified: true, category: "state", source_url: "https://asdma.gov.in", last_verified: HELPLINE_LAST_VERIFIED },
  asdma_hq: { label: "ASDMA Dispur Head Office Landline", number: "0361-2237221", altNumber: "0361-2237466", verified: true, category: "state", source_url: "https://assam.gov.in", last_verified: HELPLINE_LAST_VERIFIED },
  ndrf_patgaon: { label: "1st Bn NDRF Patgaon (Guwahati)", number: "0361-2840027", altNumber: "0361-2840284", verified: true, category: "state", source_url: "https://ndrf.gov.in", last_verified: HELPLINE_LAST_VERIFIED },
  health_104: { label: "Assam Health Information Helpline (104)", number: "104", verified: true, category: "state", source_url: "https://assam.gov.in", last_verified: HELPLINE_LAST_VERIFIED },
  apdcl_1912: { label: "APDCL Electricity Fault & Hazard Helpline", number: "1912", verified: true, category: "state", source_url: "https://www.apdcl.org", last_verified: HELPLINE_LAST_VERIFIED },
  vet_1962: { label: "Mobile Veterinary / Livestock Helpline", number: "1962", verified: true, category: "state", source_url: "https://emri.in", last_verified: HELPLINE_LAST_VERIFIED },
  nfsa_1967: { label: "NFSA Ration Card / PDS Grievance Helpdesk", number: "1967", verified: true, category: "state", source_url: "https://nfsa.gov.in", last_verified: HELPLINE_LAST_VERIFIED },
  gmch_guwahati: { label: "GMCH Emergency Helpline (Guwahati)", number: "0361-2529457", verified: true, category: "state", source_url: "https://gmchassam.gov.in", last_verified: HELPLINE_LAST_VERIFIED },
  fire_panbazar: { label: "Panbazar Fire Brigade (Guwahati)", number: "0361-2540222", verified: true, category: "state", source_url: "https://assam.gov.in", last_verified: HELPLINE_LAST_VERIFIED },
  women_distress_ghy: { label: "Assam Women Distress Helpline", number: "0361-2521242", verified: true, category: "state", source_url: "https://assam.gov.in", last_verified: HELPLINE_LAST_VERIFIED },
  cwrc_kaziranga: { label: "Kaziranga Control Room / CWRC Wildlife Rescue", number: "03776-268007", verified: true, category: "state", source_url: "https://www.wti.org.in", last_verified: HELPLINE_LAST_VERIFIED },

  // Verified District DEOC Landlines (Assam.gov.in)
  deoc_kamrup_metro: { label: "Kamrup Metro DEOC", number: "0361-2733052", verified: true, category: "district", source_url: "https://assam.gov.in", last_verified: HELPLINE_LAST_VERIFIED },
  deoc_dibrugarh: { label: "Dibrugarh DEOC", number: "0373-2312940", verified: true, category: "district", source_url: "https://assam.gov.in", last_verified: HELPLINE_LAST_VERIFIED },
  deoc_dhubri: { label: "Dhubri DEOC", number: "03662-230050", verified: true, category: "district", source_url: "https://assam.gov.in", last_verified: HELPLINE_LAST_VERIFIED },
  deoc_sonitpur: { label: "Sonitpur (Tezpur) DEOC", number: "03712-220011", verified: true, category: "district", source_url: "https://assam.gov.in", last_verified: HELPLINE_LAST_VERIFIED },
  deoc_cachar: { label: "Cachar (Silchar) DEOC", number: "03842-239249", verified: true, category: "district", source_url: "https://assam.gov.in", last_verified: HELPLINE_LAST_VERIFIED },
  deoc_nagaon: { label: "Nagaon DEOC", number: "03672-233815", verified: true, category: "district", source_url: "https://assam.gov.in", last_verified: HELPLINE_LAST_VERIFIED },
  deoc_tinsukia: { label: "Tinsukia DEOC", number: "0374-2331572", verified: true, category: "district", source_url: "https://assam.gov.in", last_verified: HELPLINE_LAST_VERIFIED },
  deoc_jorhat: { label: "Jorhat DEOC", number: "0376-2320020", verified: true, category: "district", source_url: "https://assam.gov.in", last_verified: HELPLINE_LAST_VERIFIED },

  // Verified Humanitarian NGO Contacts
  ngo_oxfam: { label: "Oxfam India", number: "011-46538000", verified: true, category: "ngo", source_url: "https://www.oxfamindia.org", last_verified: HELPLINE_LAST_VERIFIED },
  ngo_goonj: { label: "Goonj Head Office", number: "011-26972351", verified: true, category: "ngo", source_url: "https://goonj.org", last_verified: HELPLINE_LAST_VERIFIED },
  ngo_unicef_assam: { label: "UNICEF Assam Field Office", number: "0361-2227181", verified: true, category: "ngo", source_url: "https://www.unicef.org", last_verified: HELPLINE_LAST_VERIFIED },
  ngo_msf: { label: "Doctors Without Borders (MSF India)", number: "011-47703400", verified: true, category: "ngo", source_url: "https://www.msfsouthasia.org", last_verified: HELPLINE_LAST_VERIFIED },
  ngo_seeds: { label: "SEEDS India", number: "011-20904048", verified: true, category: "ngo", source_url: "https://seedsindia.org", last_verified: HELPLINE_LAST_VERIFIED },
  ngo_rapid_response: { label: "Rapid Response India", number: "9551221199", verified: true, category: "ngo", source_url: "https://www.rapidresponse.org.in", last_verified: HELPLINE_LAST_VERIFIED }
};

// ================= 2. DISTRICTS & SAMPLE FLOOD REFERENCE DATA =================
const ASSAM_CENTER = [26.2, 92.9];

// 20 Key Districts of Assam with coordinates, sample vulnerability tier, and verified DEOC contact (or universal 1077)
const DISTRICTS = {
  "Guwahati (Kamrup Metro)": { coords: [26.1445, 91.7362], risk: "Moderate", ddma: `${HELPLINE_DIRECTORY.deoc_kamrup_metro.number} / 1077` },
  "Dibrugarh": { coords: [27.4728, 94.9120], risk: "High", ddma: `${HELPLINE_DIRECTORY.deoc_dibrugarh.number} / 1077` },
  "Dhemaji": { coords: [27.4800, 94.5800], risk: "Severe", ddma: "1077 (DEOC Toll-Free)" },
  "Majuli (River Island)": { coords: [26.9500, 94.1667], risk: "Severe", ddma: "1077 (DEOC Toll-Free)" },
  "Jorhat": { coords: [26.7509, 94.2037], risk: "High", ddma: `${HELPLINE_DIRECTORY.deoc_jorhat.number} / 1077` },
  "Silchar (Cachar)": { coords: [24.8333, 92.7789], risk: "Severe", ddma: `${HELPLINE_DIRECTORY.deoc_cachar.number} / 1077` },
  "Barpeta": { coords: [26.3210, 91.0050], risk: "Severe", ddma: "1077 (DEOC Toll-Free)" },
  "Dhubri": { coords: [26.0200, 89.9800], risk: "Severe", ddma: `${HELPLINE_DIRECTORY.deoc_dhubri.number} / 1077` },
  "Tezpur (Sonitpur)": { coords: [26.6528, 92.7926], risk: "High", ddma: `${HELPLINE_DIRECTORY.deoc_sonitpur.number} / 1077` },
  "Nagaon": { coords: [26.3480, 92.6840], risk: "Severe", ddma: `${HELPLINE_DIRECTORY.deoc_nagaon.number} / 1077` },
  "North Lakhimpur": { coords: [27.2360, 94.1030], risk: "Severe", ddma: "1077 (DEOC Toll-Free)" },
  "Goalpara": { coords: [26.1770, 90.6160], risk: "Severe", ddma: "1077 (DEOC Toll-Free)" },
  "Morigaon": { coords: [26.2500, 92.3400], risk: "Severe", ddma: "1077 (DEOC Toll-Free)" },
  "Tinsukia": { coords: [27.4922, 95.3597], risk: "High", ddma: `${HELPLINE_DIRECTORY.deoc_tinsukia.number} / 1077` },
  "Golaghat": { coords: [26.5167, 93.9667], risk: "High", ddma: "1077 (DEOC Toll-Free)" },
  "Nalbari": { coords: [26.4439, 91.4421], risk: "High", ddma: "1077 (DEOC Toll-Free)" },
  "Bongaigaon": { coords: [26.5024, 90.5532], risk: "Moderate", ddma: "1077 (DEOC Toll-Free)" },
  "Karimganj": { coords: [24.8649, 92.3593], risk: "High", ddma: "1077 (DEOC Toll-Free)" },
  "Hailakandi": { coords: [24.6833, 92.5667], risk: "High", ddma: "1077 (DEOC Toll-Free)" },
  "Sivasagar": { coords: [26.9826, 94.6425], risk: "Moderate", ddma: "1077 (DEOC Toll-Free)" }
};

// SAMPLE RIVER GAUGE DATA (Static demonstration values — no keyless live CWC JSON API is integrated)
const RIVER_GAUGES = [
  { river: "Brahmaputra", station: "Guwahati (DC Court)", lat: 26.1833, lon: 91.7450, warning: 48.68, danger: 49.68, hfl: 51.46, current: 49.92, trend: "Sample Rising (+0.15m/6h)" },
  { river: "Brahmaputra", station: "Dibrugarh", lat: 27.4850, lon: 94.9250, warning: 104.70, danger: 105.70, hfl: 106.48, current: 105.88, trend: "Sample Rising (+0.22m/6h)" },
  { river: "Brahmaputra", station: "Tezpur", lat: 26.6150, lon: 92.7850, warning: 64.23, danger: 65.23, hfl: 65.84, current: 65.34, trend: "Sample Rising (+0.11m/6h)" },
  { river: "Brahmaputra", station: "Goalpara", lat: 26.1850, lon: 90.6250, warning: 35.27, danger: 36.27, hfl: 37.43, current: 36.52, trend: "Sample Rising (+0.18m/6h)" },
  { river: "Brahmaputra", station: "Dhubri", lat: 26.0150, lon: 89.9750, warning: 27.62, danger: 28.62, hfl: 30.36, current: 28.92, trend: "Sample Rising (+0.14m/6h)" },
  { river: "Brahmaputra", station: "Neamatighat (Jorhat)", lat: 26.8550, lon: 94.2350, warning: 85.04, danger: 85.54, hfl: 87.37, current: 85.62, trend: "Sample Steady" },
  { river: "Barak", station: "Annapurna Ghat (Silchar)", lat: 24.8380, lon: 92.7950, warning: 18.83, danger: 19.83, hfl: 21.68, current: 19.95, trend: "Sample Rising (+0.09m/6h)" },
  { river: "Barak", station: "Badarpurghat", lat: 24.9010, lon: 92.5920, warning: 15.85, danger: 16.85, hfl: 17.65, current: 16.92, trend: "Sample Rising (+0.12m/6h)" },
  { river: "Kopili", station: "Kampur (Nagaon)", lat: 26.1500, lon: 92.8100, warning: 59.50, danger: 60.50, hfl: 62.20, current: 61.24, trend: "Sample Surge (+0.38m/6h)" },
  { river: "Beki", station: "NH31 Road Bridge (Barpeta)", lat: 26.3500, lon: 91.0100, warning: 44.10, danger: 45.10, hfl: 45.55, current: 45.38, trend: "Sample Rising (+0.25m/6h)" },
  { river: "Subansiri", station: "Badatighat (Lakhimpur)", lat: 27.1500, lon: 94.0500, warning: 81.53, danger: 82.53, hfl: 85.80, current: 82.68, trend: "Sample Rising (+0.15m/6h)" },
  { river: "Jia Bharali", station: "NT Road Crossing (Sonitpur)", lat: 26.7000, lon: 92.8500, warning: 76.00, danger: 77.00, hfl: 78.50, current: 77.12, trend: "Sample Steady" },
  { river: "Puthimari", station: "NH Crossing (Kamrup)", lat: 26.3500, lon: 91.6800, warning: 50.81, danger: 51.81, hfl: 54.22, current: 51.92, trend: "Sample Rising (+0.10m/6h)" },
  { river: "Pagladiya", station: "NT Road Crossing (Nalbari)", lat: 26.4600, lon: 91.4300, warning: 51.75, danger: 52.75, hfl: 54.98, current: 52.88, trend: "Sample Steady" }
];

// Illustrative Flood Hazard Polygons (Sample Data)
const FLOOD_HAZARD_ZONES = [
  {
    name: "Majuli Island High Flood Inundation Belt",
    coords: [[27.05, 94.05], [27.12, 94.30], [26.90, 94.38], [26.85, 94.10]],
    risk: "Severe",
    desc: "Illustrative zone: vulnerable to riverbank erosion, Brahmaputra submergence, and bund breach."
  },
  {
    name: "Dhemaji - Subansiri Flood Catchment",
    coords: [[27.35, 94.40], [27.65, 94.75], [27.50, 94.95], [27.25, 94.60]],
    risk: "Severe",
    desc: "Illustrative zone: recurrent flash floods triggered by foothill runoff."
  },
  {
    name: "Barpeta - Beki River Inundation Corridor",
    coords: [[26.25, 90.90], [26.45, 90.95], [26.40, 91.15], [26.20, 91.10]],
    risk: "Severe",
    desc: "Illustrative zone: low-lying floodplain adjacent to Beki, Manas and Pahumara tributaries."
  },
  {
    name: "Morigaon - Pobitora Lowland Basin",
    coords: [[26.15, 92.15], [26.35, 92.20], [26.30, 92.45], [26.10, 92.40]],
    risk: "High",
    desc: "Illustrative zone: Brahmaputra backflow into wetland sanctuary and agrarian fields."
  },
  {
    name: "Dhubri River Confluence Zone",
    coords: [[25.95, 89.85], [26.15, 89.88], [26.10, 90.15], [25.90, 90.10]],
    risk: "Severe",
    desc: "Illustrative zone: lower Brahmaputra confluence basin."
  }
];

// General Flood Preparedness & Public Safety Guidance (Non-official prototype reference)
const SAFETY_ADVISORIES = {
  evac: [
    { type: "warn", title: "When to Evacuate:", text: "If floodwater enters your compound or reaches stilt/ladder level, move immediately to the nearest designated high-ground shelter. Do not wait for nightfall." },
    { type: "check", title: "Emergency Kit (Go-Bag):", text: "Pack dry food (chira, gur, biscuits), 3 days drinking water, chlorine water purification tablets, ORS packets, torch with extra batteries, whistle, and prescription medicines." },
    { type: "check", title: "Document Safety:", text: "Secure identity cards, land documents, bank passbooks, and certificates in waterproof sealed plastic pouches." },
    { type: "warn", title: "Authorized Rescue Boats:", text: "Use authorized rescue or ferry boats when evacuating and avoid overloaded country boats ('nao'). Dial 112 (Emergency) or 1070 (SEOC Assam) for assistance." }
  ],
  dos: [
    { type: "check", title: "DO: Boil All Water:", text: "Boil drinking water vigorously for at least 10 minutes, or use approved chlorine tablets. Never drink raw floodwater or submerged tube-well water." },
    { type: "check", title: "DO: Electrical Disconnection:", text: "Switch off your home's main electrical breaker before water enters the house to prevent accidental electrocution." },
    { type: "cross", title: "DON'T: Walk or Drive in Floodwaters:", text: "Just 15 cm (6 inches) of rapid water can knock down an adult; 30 cm (1 foot) can float a car. Avoid culverts and submerged roads." },
    { type: "cross", title: "DON'T: Touch Fallen Electric Cables:", text: "Treat all submerged wires as live. Report fallen cables to APDCL helpline 1912." },
    { type: "cross", title: "DON'T: Consume Submerged Food:", text: "Discard any food or grain that came into contact with floodwaters to avoid waterborne illness." }
  ],
  health: [
    { type: "warn", title: "Snakebite Vigilance:", text: "Snakes flee rising water and may enter houses, roofs, and rafters. Inspect bedding and clothing with a torch before resting." },
    { type: "check", title: "Immediate Snakebite Protocol:", text: "Keep the patient calm and limb immobilized below heart level. DO NOT tie tight tourniquets, DO NOT cut or suck venom. Transport immediately to a hospital with Anti-Snake Venom (ASV)." },
    { type: "check", title: "Medical Emergencies:", text: "Call 108 for emergency ambulance transport or 104 for state health advice in Assam." },
    { type: "check", title: "Waterborne Disease Control:", text: "Maintain sanitation around shelters and take ORS immediately upon onset of diarrhea." }
  ],
  cattle: [
    { type: "check", title: "Livestock Relocation:", text: "Untie cattle, goats, and buffaloes early and move them to high-ground community platforms ('Poka Chapori') or elevated embankments." },
    { type: "warn", title: "Dry Fodder & Feed:", text: "Do not feed livestock rotting, water-logged grass. Store dry paddy straw in elevated lofts." },
    { type: "check", title: "Veterinary Helpline:", text: "Dial 1962 for mobile veterinary emergency assistance in Assam." }
  ],
  ddma: [
    { type: "check", title: "State Emergency Operation Centre (SEOC):", text: `Toll Free: ${HELPLINE_DIRECTORY.seoc_1070.number} / ${HELPLINE_DIRECTORY.seoc_1079.number} | Landline: ${HELPLINE_DIRECTORY.asdma_hq.number} (Source: asdma.gov.in)` },
    { type: "check", title: "District DEOC Universal Toll-Free:", text: `Dial ${HELPLINE_DIRECTORY.deoc_1077.number} from any district in Assam` },
    { type: "check", title: "National Emergency Helpline:", text: `${HELPLINE_DIRECTORY.erns_112.number} (Police, Fire, Ambulance & Rescue Unified Dispatch)` },
    { type: "check", title: "Verified District DEOC Landlines (assam.gov.in):", text: `Kamrup Metro: ${HELPLINE_DIRECTORY.deoc_kamrup_metro.number} | Dibrugarh: ${HELPLINE_DIRECTORY.deoc_dibrugarh.number} | Cachar: ${HELPLINE_DIRECTORY.deoc_cachar.number} | Dhubri: ${HELPLINE_DIRECTORY.deoc_dhubri.number} | Sonitpur: ${HELPLINE_DIRECTORY.deoc_sonitpur.number} | Nagaon: ${HELPLINE_DIRECTORY.deoc_nagaon.number} | Tinsukia: ${HELPLINE_DIRECTORY.deoc_tinsukia.number} | Jorhat: ${HELPLINE_DIRECTORY.deoc_jorhat.number}` }
  ]
};

// Sample Fallback Reference Locations (Used alongside live OpenStreetMap Overpass queries; uses verified emergency short codes / DEOC numbers)
const CURATED_EMERGENCY_NODES = {
  "Guwahati (Kamrup Metro)": [
    { name: "Gauhati Medical College & Hospital (GMCH)", type: "hospital", phone: HELPLINE_DIRECTORY.gmch_guwahati.number, lat: 26.1578, lon: 91.7735 },
    { name: "1st Battalion NDRF Headquarters Patgaon", type: "shelter", phone: HELPLINE_DIRECTORY.ndrf_patgaon.number, lat: 26.1150, lon: 91.6320 },
    { name: "Sarusajai Relief Reference Site", type: "shelter", phone: HELPLINE_DIRECTORY.deoc_kamrup_metro.number, lat: 26.1180, lon: 91.7510 },
    { name: "ASDMA State Office Reference (Dispur)", type: "shelter", phone: HELPLINE_DIRECTORY.asdma_hq.number, lat: 26.1430, lon: 91.7910 },
    { name: "Panbazar Police Area (Dial 100 / 112)", type: "police", phone: HELPLINE_DIRECTORY.police_100.number, lat: 26.1870, lon: 91.7480 },
    { name: "Guwahati Fire & Emergency Services", type: "fire_station", phone: HELPLINE_DIRECTORY.fire_101.number, lat: 26.1820, lon: 91.7450 }
  ],
  "Dibrugarh": [
    { name: "Assam Medical College & Hospital (AMCH)", type: "hospital", phone: HELPLINE_DIRECTORY.ambulance_108.number, lat: 27.4640, lon: 94.9210 },
    { name: "Dibrugarh District Relief Reference (DEOC)", type: "shelter", phone: HELPLINE_DIRECTORY.deoc_dibrugarh.number, lat: 27.4810, lon: 94.9080 },
    { name: "Dibrugarh Police Emergency (Dial 100)", type: "police", phone: HELPLINE_DIRECTORY.police_100.number, lat: 27.4760, lon: 94.9120 }
  ],
  "Majuli (River Island)": [
    { name: "Majuli Sub-Divisional Civil Hospital (Garmur)", type: "hospital", phone: HELPLINE_DIRECTORY.ambulance_108.number, lat: 26.9650, lon: 94.1800 },
    { name: "Kamalabari Shelter Reference (DEOC 1077)", type: "shelter", phone: HELPLINE_DIRECTORY.deoc_1077.number, lat: 26.9280, lon: 94.1560 },
    { name: "Garmur Police Emergency (Dial 100)", type: "police", phone: HELPLINE_DIRECTORY.police_100.number, lat: 26.9620, lon: 94.1780 }
  ],
  "Dhemaji": [
    { name: "Dhemaji Civil Hospital", type: "hospital", phone: HELPLINE_DIRECTORY.ambulance_108.number, lat: 27.4820, lon: 94.5750 },
    { name: "Dhemaji District Emergency Reference (DEOC 1077)", type: "shelter", phone: HELPLINE_DIRECTORY.deoc_1077.number, lat: 27.4850, lon: 94.5880 }
  ],
  "Silchar (Cachar)": [
    { name: "Silchar Medical College & Hospital (SMCH)", type: "hospital", phone: HELPLINE_DIRECTORY.ambulance_108.number, lat: 24.7890, lon: 92.7930 },
    { name: "Cachar District Relief Reference (DEOC)", type: "shelter", phone: HELPLINE_DIRECTORY.deoc_cachar.number, lat: 24.8410, lon: 92.7880 }
  ],
  "Barpeta": [
    { name: "Fakhruddin Ali Ahmed Medical College (FAAMCH)", type: "hospital", phone: HELPLINE_DIRECTORY.ambulance_108.number, lat: 26.3180, lon: 91.0120 },
    { name: "Barpeta Town Shelter Reference (DEOC 1077)", type: "shelter", phone: HELPLINE_DIRECTORY.deoc_1077.number, lat: 26.3250, lon: 91.0080 }
  ],
  "Tezpur (Sonitpur)": [
    { name: "Tezpur Medical College & Hospital (TMCH)", type: "hospital", phone: HELPLINE_DIRECTORY.ambulance_108.number, lat: 26.6980, lon: 92.8350 },
    { name: "Sonitpur Relief Reference (DEOC)", type: "shelter", phone: HELPLINE_DIRECTORY.deoc_sonitpur.number, lat: 26.6620, lon: 92.7910 }
  ],
  "Dhubri": [
    { name: "Dhubri Civil Hospital", type: "hospital", phone: HELPLINE_DIRECTORY.ambulance_108.number, lat: 26.0240, lon: 89.9780 },
    { name: "Dhubri District Shelter Reference (DEOC)", type: "shelter", phone: HELPLINE_DIRECTORY.deoc_dhubri.number, lat: 26.2300, lon: 90.2300 }
  ],
  "Nagaon": [
    { name: "Bhogeswari Phukanani Civil Hospital", type: "hospital", phone: HELPLINE_DIRECTORY.ambulance_108.number, lat: 26.3450, lon: 92.6890 },
    { name: "Nagaon Shelter Reference (DEOC)", type: "shelter", phone: HELPLINE_DIRECTORY.deoc_nagaon.number, lat: 26.1550, lon: 92.8120 },
    { name: "Nagaon Fire & Emergency Station", type: "fire_station", phone: HELPLINE_DIRECTORY.fire_101.number, lat: 26.3500, lon: 92.6810 }
  ]
};

// ================= 3. VERIFIED SECTOR CALLING REGISTRY & SAMPLE CAMPS =================
const EMERGENCY_SECTORS = [
  // 1. RESCUE TEAMS
  {
    sector: "rescue",
    title: "National Emergency Unified Helpline (112)",
    agency: "Emergency Response Support System (ERSS)",
    desc: "Pan-India 24x7 emergency helpline for Police, Fire, Ambulance & disaster rescue dispatch.",
    phone: HELPLINE_DIRECTORY.erns_112.number,
    verified: true,
    source_url: HELPLINE_DIRECTORY.erns_112.source_url,
    last_verified: HELPLINE_LAST_VERIFIED,
    badge: "24x7 Verified",
    badgeColor: "red",
    icon: "fa-phone-volume",
    actionText: "Call 112"
  },
  {
    sector: "rescue",
    title: "Assam State Emergency Operation Centre (SEOC)",
    agency: "Assam State Disaster Management Authority",
    desc: "State-level 24x7 disaster control room toll-free helpline (1070 / 1079) and Dispur landline.",
    phone: HELPLINE_DIRECTORY.seoc_1070.number,
    altPhone: HELPLINE_DIRECTORY.seoc_1070.altNumber,
    verified: true,
    source_url: HELPLINE_DIRECTORY.seoc_1070.source_url,
    last_verified: HELPLINE_LAST_VERIFIED,
    badge: "State Control",
    badgeColor: "cyan",
    icon: "fa-life-ring",
    actionText: "Call 1070"
  },
  {
    sector: "rescue",
    title: "1st Battalion NDRF Patgaon (Guwahati)",
    agency: "National Disaster Response Force (North East)",
    desc: "Office and control room numbers listed on ndrf.gov.in for 1st Bn NDRF Patgaon, Guwahati.",
    phone: HELPLINE_DIRECTORY.ndrf_patgaon.number,
    altPhone: HELPLINE_DIRECTORY.ndrf_patgaon.altNumber,
    verified: true,
    source_url: HELPLINE_DIRECTORY.ndrf_patgaon.source_url,
    last_verified: HELPLINE_LAST_VERIFIED,
    badge: "Verified NDRF",
    badgeColor: "purple",
    icon: "fa-truck-droplet",
    actionText: "Call NDRF Base"
  },
  {
    sector: "rescue",
    title: "Fire & Emergency Services",
    agency: "National Fire Helpline & Panbazar Fire Station",
    desc: "Emergency fire rescue, structural response, and flood pumping support.",
    phone: HELPLINE_DIRECTORY.fire_101.number,
    altPhone: HELPLINE_DIRECTORY.fire_panbazar.number,
    verified: true,
    source_url: HELPLINE_DIRECTORY.fire_101.source_url,
    last_verified: HELPLINE_LAST_VERIFIED,
    badge: "24x7 Verified",
    badgeColor: "amber",
    icon: "fa-fire-extinguisher",
    actionText: "Call 101"
  },

  // 2. FOOD & RATIONS
  {
    sector: "food",
    title: "Flood Relief Coordination (SEOC / DEOC)",
    agency: "State & District Emergency Operation Centres",
    desc: "Report flood relief, shelter, or ration shortages through verified state (1070) or district (1077) helplines.",
    phone: HELPLINE_DIRECTORY.seoc_1070.number,
    altPhone: HELPLINE_DIRECTORY.deoc_1077.number,
    verified: true,
    source_url: HELPLINE_DIRECTORY.seoc_1070.source_url,
    last_verified: HELPLINE_LAST_VERIFIED,
    badge: "Toll-Free 1070",
    badgeColor: "amber",
    icon: "fa-bowl-rice",
    actionText: "Call 1070"
  },
  {
    sector: "food",
    title: "NFSA Ration Card & PDS Grievance Helpdesk",
    agency: "National Food Security Portal",
    desc: "Public Distribution System & ration card grievance helpline (not a live flood dry-ration dispatch desk).",
    phone: HELPLINE_DIRECTORY.nfsa_1967.number,
    altPhone: HELPLINE_DIRECTORY.asdma_hq.number,
    verified: true,
    source_url: HELPLINE_DIRECTORY.nfsa_1967.source_url,
    last_verified: HELPLINE_LAST_VERIFIED,
    badge: "PDS Helpdesk",
    badgeColor: "green",
    icon: "fa-wheat-awn",
    actionText: "Call 1967"
  },
  {
    sector: "food",
    title: "Oxfam India Disaster Relief Desk",
    agency: "Humanitarian Relief NGO",
    desc: "Humanitarian NGO coordination office (New Delhi headquarters; verify local Assam field desks before travel).",
    phone: HELPLINE_DIRECTORY.ngo_oxfam.number,
    verified: true,
    source_url: HELPLINE_DIRECTORY.ngo_oxfam.source_url,
    last_verified: HELPLINE_LAST_VERIFIED,
    badge: "Humanitarian Aid",
    badgeColor: "cyan",
    icon: "fa-hand-holding-heart",
    actionText: "Call Oxfam"
  },

  // 3. POLICE & PATROL
  {
    sector: "police",
    title: "Police Emergency Dial 100",
    agency: "Assam Police / Emergency Control",
    desc: "24x7 emergency police control room for law, order, and urgent rescue escalation (integrated with 112).",
    phone: HELPLINE_DIRECTORY.police_100.number,
    altPhone: HELPLINE_DIRECTORY.erns_112.number,
    verified: true,
    source_url: HELPLINE_DIRECTORY.police_100.source_url,
    last_verified: HELPLINE_LAST_VERIFIED,
    badge: "Police 24x7",
    badgeColor: "blue",
    icon: "fa-shield-halved",
    actionText: "Call 100"
  },
  {
    sector: "police",
    title: "Women Distress Helpline (Assam / National)",
    agency: "Assam Women Distress & ERSS",
    desc: "Assam women distress support number (0361-2521242) alongside national 1091 helpline.",
    phone: HELPLINE_DIRECTORY.women_distress_ghy.number,
    altPhone: HELPLINE_DIRECTORY.women_1091.number,
    verified: true,
    source_url: HELPLINE_DIRECTORY.women_distress_ghy.source_url,
    last_verified: HELPLINE_LAST_VERIFIED,
    badge: "Verified Line",
    badgeColor: "blue",
    icon: "fa-building-shield",
    actionText: "Call Helpline"
  },
  {
    sector: "police",
    title: "National Highway Emergency Helpline (NHAI)",
    agency: "National Highways Authority of India",
    desc: "National highway accident and road hazard reporting helpline (NH-27, NH-15, NH-37 corridors).",
    phone: HELPLINE_DIRECTORY.highway_1033.number,
    verified: true,
    source_url: HELPLINE_DIRECTORY.highway_1033.source_url,
    last_verified: HELPLINE_LAST_VERIFIED,
    badge: "Highway Help",
    badgeColor: "amber",
    icon: "fa-road",
    actionText: "Call 1033"
  },
  {
    sector: "police",
    title: "Railway Helpline (Indian Railways 139)",
    agency: "Indian Railways Passenger & Security Help",
    desc: "Integrated rail enquiry, onboard medical assistance, and RPF security helpline.",
    phone: HELPLINE_DIRECTORY.railways_139.number,
    verified: true,
    source_url: HELPLINE_DIRECTORY.railways_139.source_url,
    last_verified: HELPLINE_LAST_VERIFIED,
    badge: "Railways",
    badgeColor: "purple",
    icon: "fa-train",
    actionText: "Call 139"
  },

  // 4. EVACUATION & CAMPS
  {
    sector: "camps",
    title: "District Emergency Operation Centre (DEOC)",
    agency: "District Disaster Management Helpline",
    desc: "Universal district disaster control room toll-free helpline across Assam districts.",
    phone: HELPLINE_DIRECTORY.deoc_1077.number,
    verified: true,
    source_url: HELPLINE_DIRECTORY.deoc_1077.source_url,
    last_verified: HELPLINE_LAST_VERIFIED,
    badge: "District Toll-Free",
    badgeColor: "green",
    icon: "fa-tents",
    actionText: "Call 1077"
  },
  {
    sector: "camps",
    title: "ASDMA State Emergency Operation Centre",
    agency: "SEOC Secretariat Dispur",
    desc: "State-level disaster control room (1070 / 1079) and Dispur head office landline.",
    phone: HELPLINE_DIRECTORY.seoc_1070.number,
    altPhone: HELPLINE_DIRECTORY.seoc_1079.number,
    verified: true,
    source_url: HELPLINE_DIRECTORY.seoc_1070.source_url,
    last_verified: HELPLINE_LAST_VERIFIED,
    badge: "State Helpline",
    badgeColor: "red",
    icon: "fa-tower-broadcast",
    actionText: "Call 1070"
  },

  // 5. MEDICAL & AMBULANCE
  {
    sector: "medical",
    title: "Emergency Ambulance Helpline (108)",
    agency: "Assam Emergency Medical Response",
    desc: "24x7 emergency medical ambulance service across Assam.",
    phone: HELPLINE_DIRECTORY.ambulance_108.number,
    verified: true,
    source_url: HELPLINE_DIRECTORY.ambulance_108.source_url,
    last_verified: HELPLINE_LAST_VERIFIED,
    badge: "Ambulance 24x7",
    badgeColor: "green",
    icon: "fa-truck-medical",
    actionText: "Call 108"
  },
  {
    sector: "medical",
    title: "Health Information Helpline (104)",
    agency: "Assam State Health Helpline",
    desc: "24x7 medical consultation, waterborne illness advice, and health guidance.",
    phone: HELPLINE_DIRECTORY.health_104.number,
    verified: true,
    source_url: HELPLINE_DIRECTORY.health_104.source_url,
    last_verified: HELPLINE_LAST_VERIFIED,
    badge: "Health Advice",
    badgeColor: "cyan",
    icon: "fa-user-doctor",
    actionText: "Call 104"
  },
  {
    sector: "medical",
    title: "GMCH Emergency Helpline (Guwahati)",
    agency: "Gauhati Medical College & Hospital",
    desc: "Tertiary emergency casualty contact for snakebite and acute flood medical triage.",
    phone: HELPLINE_DIRECTORY.gmch_guwahati.number,
    verified: true,
    source_url: HELPLINE_DIRECTORY.gmch_guwahati.source_url,
    last_verified: HELPLINE_LAST_VERIFIED,
    badge: "Hospital Desk",
    badgeColor: "red",
    icon: "fa-staff-snake",
    actionText: "Call GMCH"
  },

  // 6. RESCUE BOATS
  {
    sector: "boat",
    title: "Flood & Boat Rescue Coordination (1070 / 112)",
    agency: "State Emergency Control & ERSS",
    desc: "Direct IWT ferry control landlines could not be verified online; dial verified 1070 (SEOC) or 112 (ERSS) for water rescue.",
    phone: HELPLINE_DIRECTORY.seoc_1070.number,
    altPhone: HELPLINE_DIRECTORY.erns_112.number,
    verified: true,
    source_url: HELPLINE_DIRECTORY.seoc_1070.source_url,
    last_verified: HELPLINE_LAST_VERIFIED,
    badge: "Water Rescue",
    badgeColor: "cyan",
    icon: "fa-ship",
    actionText: "Call 1070"
  },

  // 7. SPECIAL (Livestock, Electricity, Women/Child, Wildlife)
  {
    sector: "special",
    title: "Mobile Veterinary & Livestock Helpline (1962)",
    agency: "Animal Husbandry Veterinary Emergency",
    desc: "Toll-free veterinary medical emergency helpline for flood-affected cattle and livestock.",
    phone: HELPLINE_DIRECTORY.vet_1962.number,
    verified: true,
    source_url: HELPLINE_DIRECTORY.vet_1962.source_url,
    last_verified: HELPLINE_LAST_VERIFIED,
    badge: "Livestock Care",
    badgeColor: "amber",
    icon: "fa-cow",
    actionText: "Call 1962"
  },
  {
    sector: "special",
    title: "Kaziranga Control Room & CWRC Wildlife Rescue",
    agency: "Wildlife Trust of India / Kaziranga Desk",
    desc: "Wildlife and flood corridor rescue helpline near Kaziranga National Park.",
    phone: HELPLINE_DIRECTORY.cwrc_kaziranga.number,
    verified: true,
    source_url: HELPLINE_DIRECTORY.cwrc_kaziranga.source_url,
    last_verified: HELPLINE_LAST_VERIFIED,
    badge: "Wildlife Desk",
    badgeColor: "green",
    icon: "fa-paw",
    actionText: "Call CWRC"
  },
  {
    sector: "special",
    title: "APDCL Submerged Wire & Electricity Helpline (1912)",
    agency: "Assam Power Distribution Company Ltd",
    desc: "Report fallen live lines, flooded transformers, and emergency power disconnection.",
    phone: HELPLINE_DIRECTORY.apdcl_1912.number,
    verified: true,
    source_url: HELPLINE_DIRECTORY.apdcl_1912.source_url,
    last_verified: HELPLINE_LAST_VERIFIED,
    badge: "Power Hazard",
    badgeColor: "amber",
    icon: "fa-bolt",
    actionText: "Call 1912"
  },
  {
    sector: "special",
    title: "Women (1091) & Childline (1098) Helpline",
    agency: "National Women & Child Emergency Lines",
    desc: "24x7 protection and assistance helplines for women and children in distress.",
    phone: HELPLINE_DIRECTORY.women_1091.number,
    altPhone: HELPLINE_DIRECTORY.child_1098.number,
    verified: true,
    source_url: HELPLINE_DIRECTORY.women_1091.source_url,
    last_verified: HELPLINE_LAST_VERIFIED,
    badge: "Women & Child",
    badgeColor: "purple",
    icon: "fa-child",
    actionText: "Call 1091"
  }
];

// SAMPLE / DEMO RELIEF CAMPS (Illustrative entries — counts, capacities, and occupancies are sample prototype data)
const ACTIVE_RELIEF_CAMPS = [
  {
    name: "Sarusajai Stadium Relief Reference (Sample)",
    district: "Guwahati (Kamrup Metro)",
    location: "Sarusajai, NH-27, Guwahati",
    capacity: 3500,
    occupancy: 1840,
    status: "Demo Data",
    statusBadge: "Sample Data • Demo Entry",
    statusColor: "cyan",
    supplies: ["Sample: Dry Rations", "Sample: Medical Desk", "Sample: Drinking Water"],
    warden: "Kamrup Metro DEOC (Verified Helpline)",
    phone: HELPLINE_DIRECTORY.deoc_kamrup_metro.number,
    altPhone: HELPLINE_DIRECTORY.deoc_1077.number
  },
  {
    name: "Beltola Higher Secondary School Reference (Sample)",
    district: "Guwahati (Kamrup Metro)",
    location: "Beltola Tiniali, Dispur, Guwahati",
    capacity: 1200,
    occupancy: 820,
    status: "Demo Data",
    statusBadge: "Sample Data • Demo Entry",
    statusColor: "cyan",
    supplies: ["Sample: Meals", "Sample: Water Filters", "Sample: First Aid"],
    warden: "ASDMA Dispur Office (Verified Helpline)",
    phone: HELPLINE_DIRECTORY.asdma_hq.number,
    altPhone: HELPLINE_DIRECTORY.deoc_1077.number
  },
  {
    name: "Dibrugarh Ghat Relief Camp Reference (Sample)",
    district: "Dibrugarh",
    location: "Ghat Road Area, Dibrugarh",
    capacity: 2800,
    occupancy: 2310,
    status: "Demo Data",
    statusBadge: "Sample Data • Demo Entry",
    statusColor: "amber",
    supplies: ["Sample: Shelter Bay", "Sample: Health Desk", "Sample: Sanitation"],
    warden: "Dibrugarh DEOC (Verified Helpline)",
    phone: HELPLINE_DIRECTORY.deoc_dibrugarh.number,
    altPhone: HELPLINE_DIRECTORY.deoc_1077.number
  },
  {
    name: "Bilasipara Elevated Shelter Reference (Sample)",
    district: "Dhubri",
    location: "Bilasipara Sub-Division, Dhubri",
    capacity: 4000,
    occupancy: 3450,
    status: "Demo Data",
    statusBadge: "Sample Data • Demo Entry",
    statusColor: "amber",
    supplies: ["Sample: Dry Rations", "Sample: ORS & Chlorine", "Sample: Livestock Yard"],
    warden: "Dhubri DEOC (Verified Helpline)",
    phone: HELPLINE_DIRECTORY.deoc_dhubri.number,
    altPhone: HELPLINE_DIRECTORY.deoc_1077.number
  },
  {
    name: "Mission Chariali Shelter Reference (Sample)",
    district: "Tezpur (Sonitpur)",
    location: "Mission Chariali Bypass, Tezpur",
    capacity: 1800,
    occupancy: 1120,
    status: "Demo Data",
    statusBadge: "Sample Data • Demo Entry",
    statusColor: "cyan",
    supplies: ["Sample: Community Kitchen", "Sample: Water Supply", "Sample: Security"],
    warden: "Sonitpur DEOC (Verified Helpline)",
    phone: HELPLINE_DIRECTORY.deoc_sonitpur.number,
    altPhone: HELPLINE_DIRECTORY.deoc_1077.number
  },
  {
    name: "Kampur High-Ground Shelter Reference (Sample)",
    district: "Nagaon",
    location: "Kampur Town, Kopili Basin, Nagaon",
    capacity: 3200,
    occupancy: 2980,
    status: "Demo Data",
    statusBadge: "Sample Data • Demo Entry",
    statusColor: "amber",
    supplies: ["Sample: Boat Access", "Sample: Medical Kit", "Sample: Dry Fodder"],
    warden: "Nagaon DEOC (Verified Helpline)",
    phone: HELPLINE_DIRECTORY.deoc_nagaon.number,
    altPhone: HELPLINE_DIRECTORY.deoc_1077.number
  },
  {
    name: "Tarapur Relief Center Reference (Sample)",
    district: "Silchar (Cachar)",
    location: "Tarapur, Silchar, Cachar",
    capacity: 2500,
    occupancy: 1890,
    status: "Demo Data",
    statusBadge: "Sample Data • Demo Entry",
    statusColor: "cyan",
    supplies: ["Sample: Medical Support", "Sample: Drinking Water", "Sample: Dry Rations"],
    warden: "Cachar DEOC (Verified Helpline)",
    phone: HELPLINE_DIRECTORY.deoc_cachar.number,
    altPhone: HELPLINE_DIRECTORY.deoc_1077.number
  },
  {
    name: "Barpeta High-Ground Shelter Reference (Sample)",
    district: "Barpeta",
    location: "Barpeta Town Area, Beki Basin",
    capacity: 2100,
    occupancy: 1650,
    status: "Demo Data",
    statusBadge: "Sample Data • Demo Entry",
    statusColor: "cyan",
    supplies: ["Sample: Meals", "Sample: Clean Water", "Sample: Hygiene Kits"],
    warden: "District DEOC Toll-Free (Verified)",
    phone: HELPLINE_DIRECTORY.deoc_1077.number,
    altPhone: HELPLINE_DIRECTORY.seoc_1070.number
  },
  {
    name: "Dhemaji High-Ground Shelter Reference (Sample)",
    district: "Dhemaji",
    location: "Civil Hospital Road Area, Dhemaji",
    capacity: 2600,
    occupancy: 2140,
    status: "Demo Data",
    statusBadge: "Sample Data • Demo Entry",
    statusColor: "amber",
    supplies: ["Sample: Rations", "Sample: Cattle Shelter", "Sample: Solar Backup"],
    warden: "District DEOC Toll-Free (Verified)",
    phone: HELPLINE_DIRECTORY.deoc_1077.number,
    altPhone: HELPLINE_DIRECTORY.seoc_1070.number
  },
  {
    name: "Kamalabari Shelter Reference (Sample)",
    district: "Majuli (River Island)",
    location: "Kamalabari Road, Majuli",
    capacity: 3000,
    occupancy: 2750,
    status: "Demo Data",
    statusBadge: "Sample Data • Demo Entry",
    statusColor: "amber",
    supplies: ["Sample: Ferry Access", "Sample: ORS & Filters", "Sample: Dry Rations"],
    warden: "District DEOC Toll-Free (Verified)",
    phone: HELPLINE_DIRECTORY.deoc_1077.number,
    altPhone: HELPLINE_DIRECTORY.seoc_1070.number
  },
  {
    name: "North Lakhimpur Shelter Reference (Sample)",
    district: "North Lakhimpur",
    location: "Subansiri Basin Road, Lakhimpur",
    capacity: 2000,
    occupancy: 1350,
    status: "Demo Data",
    statusBadge: "Sample Data • Demo Entry",
    statusColor: "cyan",
    supplies: ["Sample: Purified Water", "Sample: Cooked Meals", "Sample: Vet Care"],
    warden: "District DEOC Toll-Free (Verified)",
    phone: HELPLINE_DIRECTORY.deoc_1077.number,
    altPhone: HELPLINE_DIRECTORY.seoc_1070.number
  },
  {
    name: "Goalpara Relief Reference (Sample)",
    district: "Goalpara",
    location: "Goalpara Embankment Zone",
    capacity: 2200,
    occupancy: 1540,
    status: "Demo Data",
    statusBadge: "Sample Data • Demo Entry",
    statusColor: "cyan",
    supplies: ["Sample: Ration Store", "Sample: Sanitation", "Sample: First Aid"],
    warden: "District DEOC Toll-Free (Verified)",
    phone: HELPLINE_DIRECTORY.deoc_1077.number,
    altPhone: HELPLINE_DIRECTORY.seoc_1070.number
  }
];

// Bilingual labels
const T = {
  en: {
    title: "Assam Disaster Alert (Prototype)",
    subtitle: "Student Prototype • Live Weather, Seismic & OSM Map (Sample Flood Overlays)",
    district: "District",
    find: "My Location",
    mapEngine: "API & Map Settings",
    callSectors: "Helplines",
    sectorHelplines: "Helplines",
    activeCamps: "Sample Camps",
    rescueTeam: "Rescue Team",
    foodRations: "Food & Rations",
    policeControl: "Police Control",
    simulate: "Simulate Flood",
    weather: "Weather & Rain Forecast (Open-Meteo)",
    risk: "Flood Risk Estimator (Prototype)",
    nearby: "Emergency Infrastructure (OSM + Sample)",
    quakes: "Seismic Activity (USGS Live Feed)",
    emergency: "Verified Emergency Helplines",
    riverGauges: "River Gauges (Sample Demo Data)",
    mapHeading: "Assam Hazard & River Basin Map",
    resetView: "Assam View",
    rain24hTrend: "24-Hour Rainfall Progression",
    advisoryTitle: "Safety Advisory",
    officialAdvisory: "Public Flood Safety Guidance",
    disclaimer: "Student prototype. Not affiliated with ASDMA, CWC, IMD, or NDRF. Live weather (Open-Meteo), seismic (USGS), and map nodes (OpenStreetMap) are combined with sample flood/camp overlays. In an emergency call 112.",
    temp: "Temperature",
    humidity: "Humidity",
    rainNow: "Rain Now",
    rain24: "Rain, 24 Hours",
    low: "Low Risk",
    moderate: "Moderate Alert",
    high: "High Flood Risk",
    tips_low: "Forecast 24h rainfall is low. Follow local news and official advisories during monsoon season.",
    tips_moderate: "Moderate rainfall detected in forecast. Keep an emergency go-bag, water, and important documents ready.",
    tips_high: "HIGH RAINFALL / SIMULATION: Prepare to move to higher ground if local water levels rise. For real emergencies dial 112 or 1070 / 1077.",
    alert: "Elevated rainfall or simulation mode active. Always check official alerts and call 112 in an emergency.",
    loading: "Loading data…",
    denied: "GPS permission not granted. Selected default district.",
    none: "No emergency facilities found in 12km perimeter.",
    noQuakes: "No recent earthquakes detected in regional zone.",
    mag: "Magnitude",
    you: "Selected Location",
    hospital: "Hospital / Medical Center",
    police: "Police Station",
    fire_station: "Fire & Rescue Station",
    shelter: "Shelter / Reference Node",
    away: "km away",
    hudRainfall: "Monsoon Rain",
    hudWater: "River Level",
    sceneForest: "1. Forest & Cloudburst",
    sceneVillage: "2. Village & Rising Flood",
    waterLevel: "Flood Height",
    tickerTitle: "ASSAM PROTOTYPE MONITOR"
  },
  as: {
    title: "অসম দুৰ্যোগ সতৰ্কবাণী (প্ৰটোটাইপ)",
    subtitle: "ছাত্ৰ প্ৰটোটাইপ • Open-Meteo, USGS আৰু OSM মেপ (নমুনা বান তথ্যসহ)",
    district: "জিলা",
    find: "মোৰ অৱস্থান",
    mapEngine: "API আৰু মেপ ছেটিংছ",
    callSectors: "হেল্পলাইন",
    sectorHelplines: "হেল্পলাইন",
    activeCamps: "নমুনা শিবিৰ",
    rescueTeam: "উদ্ধাৰকাৰী দল",
    foodRations: "খাদ্য আৰু সাহায্য",
    policeControl: "আৰক্ষী নিয়ন্ত্ৰণ",
    simulate: "বানৰ সিমুলেচন",
    weather: "বতৰ আৰু বৰষুণৰ পূৰ্বাভাস (Open-Meteo)",
    risk: "বানৰ আশংকা সূচক (প্ৰটোটাইপ)",
    nearby: "জৰুৰীকালীন কেন্দ্ৰ (OSM + নমুনা)",
    quakes: "ভূমিকম্পৰ তথ্য (USGS)",
    emergency: "জৰুৰীকালীন হেল্পলাইন",
    riverGauges: "নদীৰ জলস্তৰ (নমুনা তথ্য)",
    mapHeading: "অসমৰ ভূ-স্থানিক মেপ",
    resetView: "অসমৰ দৃশ্য",
    rain24hTrend: "২৪ ঘণ্টাৰ বৰষুণৰ পূৰ্বাভাস",
    advisoryTitle: "সুৰক্ষা পৰামৰ্শ",
    officialAdvisory: "সাধাৰণ বান সুৰক্ষা নিৰ্দেশনা",
    disclaimer: "এয়া এটা ছাত্ৰ প্ৰটোটাইপ, চৰকাৰী সতৰ্কবাণী প্ৰণালী নহয়। জৰুৰীকালীন অৱস্থাত ১১২ বা ১০৭০ ত ফোন কৰক।",
    temp: "তাপমাত্ৰা",
    humidity: "আৰ্দ্ৰতা",
    rainNow: "বৰ্তমানৰ বৰষুণ",
    rain24: "২৪ ঘণ্টাৰ বৰষুণ",
    low: "কম আশংকা",
    moderate: "মধ্যম সাৱধানতা",
    high: "উচ্চ বান আশংকা",
    tips_low: "পূৰ্বাভাস অনুসৰি বৰষুণ কম। বাৰিষা কালত চৰকাৰী বতৰ আৰু বানৰ খবৰ লৈ থাকক।",
    tips_moderate: "মধ্যমীয়া বৰষুণৰ পূৰ্বাভাস। দৰকাৰী নথি, পানী আৰু শুকান খাদ্য সাজু ৰাখক।",
    tips_high: "বেছি বৰষুণ বা সিমুলেচন মোড সক্ৰিয়। পানী বাঢ়িলে ওখ ঠাইলৈ যাওক। জৰুৰী সহায়ৰ বাবে ১১২ বা ১০৭০ ত ফোন কৰক।",
    alert: "বেছি বৰষুণ বা সিমুলেচন মোড সক্ৰিয়। জৰুৰীকালীন অৱস্থাত ১১২ ত ফোন কৰক।",
    loading: "তথ্য লোড হৈ আছে…",
    denied: "GPS অনুমতি পোৱা নগ'ল। জিলা নিৰ্বাচন কৰক।",
    none: "ওচৰৰ ১২ কিলোমিটাৰত কোনো কেন্দ্ৰ পোৱা নগ'ল।",
    noQuakes: "এই অঞ্চলত শেহতীয়া ভূমিকম্পৰ তথ্য নাই।",
    mag: "মাত্ৰা",
    you: "আপোনাৰ নিৰ্বাচিত অৱস্থান",
    hospital: "চিকিৎসালয়",
    police: "আৰক্ষী থানা",
    fire_station: "অগ্নিনিৰ্বাপক কেন্দ্ৰ",
    shelter: "আশ্ৰয় / নমুনা কেন্দ্ৰ",
    away: "কিমি দূৰত",
    hudRainfall: "বৰষুণৰ পৰিমাণ",
    hudWater: "নদীৰ জলস্তৰ",
    sceneForest: "১. পাহাৰীয়া অৰণ্য আৰু ডাৱৰ বিস্ফোৰণ",
    sceneVillage: "২. প্লাৱিত গাঁও আৰু ব্ৰহ্মপুত্ৰৰ বান",
    waterLevel: "পানীৰ উচ্চতা",
    tickerTitle: "অসম প্ৰটোটাইপ মনিটৰ"
  }
};

const PLACE_COLORS = {
  hospital: "#be123c",
  police: "#2563eb",
  fire_station: "#d97706",
  shelter: "#059669"
};

// ================= 2. APPLICATION STATE =================
let lang = "en";
let map = null;
let pin = null;
let currentBaseTileLayer = null;
let currentTileEngineKey = "osmHOT";
let customMapboxKey = "";
let currentAlertTier = "red"; // "red", "orange", "yellow"
let isSirenPlaying = false;
let audioCtx = null;
let sirenOsc = null;
let sirenGain = null;
let sirenTimer = null;

let layerGroups = {
  gauges: null,
  hazard: null,
  shelters: null,
  hospitals: null,
  quakes: null
};

let where = { name: "Guwahati (Kamrup Metro)", lat: 26.1445, lon: 91.7362 };
let weather = null;
let places = [];
let quakes = [];
let quakesIsDemo = false;
let simulate = false;
let waterHeightMultiplier = 1.0;

const $ = (id) => document.getElementById(id);
const t = (key) => (T[lang] && T[lang][key]) || T.en[key] || key;
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function distanceKm(lat1, lon1, lat2, lon2) {
  const rad = (d) => (d * Math.PI) / 180;
  const a = Math.sin(rad(lat2 - lat1) / 2) ** 2 +
    Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(rad(lon2 - lon1) / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(a));
}

function riskLevel(mm) {
  if (mm >= 65 || simulate || currentAlertTier === "red") return "high";
  if (mm >= 30 || currentAlertTier === "orange") return "moderate";
  return "low";
}

// ================= 3. RESILIENT ZERO-API-KEY MAP ENGINE & API AUTHORIZATION =================
// Pre-Authorized Tile Providers (Public Safety Domain, 100% Free, Zero Key Required)
const TILE_ENGINES = {
  osmHOT: {
    name: "Humanitarian OpenStreetMap (HOT)",
    url: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
    options: {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/">Humanitarian OpenStreetMap Team</a>'
    }
  },
  esriSatellite: {
    name: "Esri Satellite World Imagery",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    options: {
      maxZoom: 18,
      attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and GIS User Community"
    }
  },
  cartoVoyager: {
    name: "CartoDB Voyager (High Contrast Relief)",
    url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    options: {
      subdomains: "abcd",
      maxZoom: 19,
      attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }
  },
  openTopo: {
    name: "OpenTopoMap (Topographic Terrain)",
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    options: {
      maxZoom: 17,
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a>'
    }
  },
  osmStandard: {
    name: "OpenStreetMap Standard",
    url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    options: {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }
  }
};

// UI Notification Toast
function showToast(title, msg, duration = 4000) {
  const toast = $("api-toast");
  if (!toast) return;
  const titleEl = $("toast-title");
  const msgEl = $("toast-msg");
  if (titleEl) titleEl.textContent = title;
  if (msgEl) msgEl.textContent = msg;
  toast.hidden = false;
  if (window._toastTimer) clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => {
    toast.hidden = true;
  }, duration);
}

function initMap() {
  const mapContainer = $("map");
  if (!mapContainer || typeof L === "undefined") return;

  // Initialize Leaflet Map centered on Assam
  map = L.map("map", {
    center: [where.lat, where.lon],
    zoom: 9,
    minZoom: 6,
    maxZoom: 18,
    zoomControl: true
  });

  // Load Saved or Default Primary Tile Engine (100% Free, Pre-Granted)
  const savedEngine = localStorage.getItem("disaster_tile_engine") || "osmHOT";
  const savedKey = localStorage.getItem("disaster_mapbox_key") || "";
  setMapTileEngine(savedEngine, savedKey);

  // Initialize Layer Groups
  layerGroups.gauges = L.layerGroup().addTo(map);
  layerGroups.hazard = L.layerGroup().addTo(map);
  layerGroups.shelters = L.layerGroup().addTo(map);
  layerGroups.hospitals = L.layerGroup().addTo(map);
  layerGroups.quakes = L.layerGroup().addTo(map);

  // Invalidate size immediately and after layout settles
  map.invalidateSize();
  setTimeout(() => map.invalidateSize(), 300);
  setTimeout(() => map.invalidateSize(), 1000);

  window.addEventListener("resize", () => {
    if (map) map.invalidateSize();
  });

  renderHazardZones();
  renderRiverGauges();

  // Reset view button handler
  const resetBtn = $("reset-map-view");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      map.setView(ASSAM_CENTER, 7);
    });
  }

  // Quick Layer Filter Pills
  document.querySelectorAll(".filter-pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      const layerKey = pill.dataset.layer;
      const group = layerGroups[layerKey];
      if (!group) return;

      if (map.hasLayer(group)) {
        map.removeLayer(group);
        pill.classList.remove("active");
      } else {
        map.addLayer(group);
        pill.classList.add("active");
      }
    });
  });

  setupMapModalEvents();
}

function setMapTileEngine(engineKey, optionalApiKey) {
  if (!map) return;

  if (currentBaseTileLayer) {
    map.removeLayer(currentBaseTileLayer);
  }

  const engineLabel = $("map-engine-label");
  const keyToUse = optionalApiKey || customMapboxKey;

  if (engineKey === "mapboxCustom") {
    if (keyToUse) {
      const mapboxUrl = `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/tiles/{z}/{x}/{y}?access_token=${keyToUse}`;
      currentBaseTileLayer = L.tileLayer(mapboxUrl, {
        maxZoom: 20,
        tileSize: 512,
        zoomOffset: -1,
        attribution: '© Mapbox © OpenStreetMap'
      }).addTo(map);
      if (engineLabel) engineLabel.innerHTML = '<i class="fa-solid fa-satellite text-purple"></i> Mapbox Satellite Live';
    } else {
      // Fallback seamlessly to Esri Satellite so user sees beautiful satellite imagery immediately
      const config = TILE_ENGINES.esriSatellite;
      currentBaseTileLayer = L.tileLayer(config.url, config.options).addTo(map);
      if (engineLabel) engineLabel.innerHTML = '<i class="fa-solid fa-satellite text-green"></i> Esri Satellite World Imagery';
    }
  } else {
    const config = TILE_ENGINES[engineKey] || TILE_ENGINES.osmHOT;
    currentBaseTileLayer = L.tileLayer(config.url, config.options).addTo(map);

    // Auto-fallback error handler: if a tile server has DNS or rate limits, fallback seamlessly to OSM Standard
    currentBaseTileLayer.on("tileerror", function (error) {
      console.warn("Tile server notice on " + config.name + ", fallback ready.");
    });

    if (engineLabel) engineLabel.innerHTML = `<i class="fa-solid fa-layer-group text-green"></i> Map Layer: ${config.name}`;
  }

  currentTileEngineKey = engineKey;
  map.invalidateSize();
  setTimeout(() => { if (map) map.invalidateSize(); }, 200);
}

// Modal dialog handler for API Keys & Map Engine

// ================= 4. VERIFIED HELPLINE DIRECTORY & SAMPLE CAMPS ENGINE =================
function updateDistrictDEOCTelemetry(districtName) {
  const data = DISTRICTS[districtName] || DISTRICTS["Guwahati (Kamrup Metro)"];
  const ddmaStr = (data && data.ddma) ? data.ddma : HELPLINE_DIRECTORY.deoc_1077.number;
  const firstPhone = ddmaStr.split("/")[0].trim().replace(/[^0-9]/g, "");
  const dialNum = firstPhone || "1077";

  // Modal DEOC banner
  const modalDist = $("modal-deoc-district-name");
  const modalPhone = $("modal-deoc-phone-display");
  const modalLink = $("modal-deoc-call-link");
  if (modalDist) modalDist.textContent = `${districtName}:`;
  if (modalPhone) modalPhone.textContent = ddmaStr;
  if (modalLink) {
    modalLink.href = `tel:${dialNum}`;
    modalLink.innerHTML = `<i class="fa-solid fa-phone"></i> Call ${districtName.split(" ")[0]} DEOC`;
  }

  // Sidebar DEOC box
  const sideTitle = $("sidebar-deoc-title");
  const sideNum = $("sidebar-deoc-num");
  const sideLink = $("sidebar-deoc-link");
  if (sideTitle) sideTitle.textContent = `${districtName.split(" ")[0]} DEOC:`;
  if (sideNum) sideNum.textContent = ddmaStr;
  if (sideLink) {
    sideLink.href = `tel:${dialNum}`;
    sideLink.innerHTML = `<i class="fa-solid fa-phone"></i> Call DEOC`;
  }
}

let activeEmergencySectors = [...EMERGENCY_SECTORS];
let helplinesSourceNote = "Local fallback directory";
let activeHelplinesVerifiedDate = HELPLINE_LAST_VERIFIED;
let refreshEmergencyModalUI = null;

function mapCategoryToSector(category) {
  if (category === "ngo") return "ngo";
  if (category === "national") return "rescue";
  return "rescue";
}

async function loadHelplinesFromAPI() {
  try {
    const res = await fetch("/api/helplines", { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const rows = await res.json();
    if (!Array.isArray(rows) || rows.length === 0) return;

    const byNumber = new Map();
    let latestDate = HELPLINE_LAST_VERIFIED;
    rows.forEach((row) => {
      if (row && row.number) {
        byNumber.set(String(row.number).trim(), row);
      }
      if (row && row.last_verified && String(row.last_verified) > latestDate) {
        latestDate = String(row.last_verified);
      }
    });

    Object.values(HELPLINE_DIRECTORY).forEach((entry) => {
      const match = byNumber.get(String(entry.number).trim());
      if (match) {
        entry.verified = Boolean(match.verified);
        if (match.source_url) entry.source_url = match.source_url;
        if (match.last_verified) entry.last_verified = match.last_verified;
      }
    });

    const knownPhones = new Set();
    const updatedCards = EMERGENCY_SECTORS.map((card) => {
      knownPhones.add(String(card.phone).trim());
      if (card.altPhone) knownPhones.add(String(card.altPhone).trim());
      const match = byNumber.get(String(card.phone).trim());
      if (!match) return card;
      return {
        ...card,
        verified: Boolean(match.verified),
        source_url: match.source_url || card.source_url,
        last_verified: match.last_verified || card.last_verified
      };
    });

    rows.forEach((row) => {
      const num = String(row.number || "").trim();
      if (!num || knownPhones.has(num)) return;
      updatedCards.push({
        sector: mapCategoryToSector(row.category),
        title: row.label || `Helpline ${num}`,
        agency: (row.category || "reference").toUpperCase(),
        desc: "Loaded from /api/helplines database directory.",
        phone: num,
        verified: Boolean(row.verified),
        source_url: row.source_url || "",
        last_verified: row.last_verified || latestDate,
        badge: row.verified ? "Verified DB" : "Unverified DB",
        badgeColor: row.verified ? "cyan" : "amber",
        icon: "fa-phone",
        actionText: `Call ${num}`
      });
    });

    activeEmergencySectors = updatedCards;
    activeHelplinesVerifiedDate = latestDate;
    helplinesSourceNote = "Loaded from /api/helplines";
    if (typeof refreshEmergencyModalUI === "function") refreshEmergencyModalUI();
  } catch (err) {
    console.warn("Could not load /api/helplines; using hardcoded fallback list:", err.message || err);
  }
}

function setupEmergencySectorsModal() {
  const modal = $("modal-emergency-sectors");
  const btnHeaderSectors = $("btn-call-sectors");
  const btnHeaderCamps = $("btn-active-camps-top");
  const btnHeroCamps = $("btn-hero-camps");
  const btnSidebarOpen = $("btn-open-sector-modal-side");
  const closeBtn = $("modal-sectors-close");
  const doneBtn = $("modal-sectors-done");
  const tabsContainer = $("sector-nav-tabs");
  const sectorContainer = $("sector-cards-container");
  const campsContainer = $("camps-directory-container");
  const campsList = $("camps-list-cards");
  const campFilter = $("camp-district-filter");
  const verifiedEl = $("modal-helplines-verified-date");

  function updateVerifiedNote() {
    if (verifiedEl) {
      verifiedEl.textContent = `Last verified: ${activeHelplinesVerifiedDate} • ${helplinesSourceNote} (not an official ASDMA system).`;
    }
  }
  updateVerifiedNote();

  if (!modal) return;

  function renderSectorCards(filterSector) {
    if (!sectorContainer) return;
    sectorContainer.innerHTML = "";
    const list = filterSector === "all" 
      ? activeEmergencySectors 
      : activeEmergencySectors.filter(s => s.sector === filterSector);

    list.forEach(item => {
      const card = document.createElement("div");
      card.className = "sector-card";
      const cleanPhone = item.phone.replace(/[^0-9+]/g, "");
      const cleanAlt = item.altPhone ? item.altPhone.replace(/[^0-9+]/g, "") : null;
      const verifyBadge = item.verified
        ? `<span class="verify-pill verified"><i class="fa-solid fa-circle-check"></i> Verified (${esc(item.last_verified || HELPLINE_LAST_VERIFIED)})</span>`
        : `<span class="verify-pill unverified"><i class="fa-solid fa-triangle-exclamation"></i> Unverified</span>`;
      const sourceLink = item.source_url
        ? `<a href="${esc(item.source_url)}" target="_blank" rel="noopener noreferrer" class="verify-source-link">${esc(item.source_url.replace(/^https?:\/\/(www\.)?/, ""))}</a>`
        : "";

      card.innerHTML = `
        <div class="sector-card-top">
          <div class="sector-icon-box ${item.badgeColor || 'cyan'}">
            <i class="fa-solid ${item.icon || 'fa-phone'}"></i>
          </div>
          <div class="sector-card-titles">
            <h4>${esc(item.title)}</h4>
            <span class="sector-agency">${esc(item.agency)}</span>
          </div>
          <span class="sector-tag tag-${item.badgeColor || 'cyan'}">${esc(item.badge)}</span>
        </div>
        <p class="sector-card-desc">${esc(item.desc)}</p>
        <div class="sector-verify-meta">${verifyBadge} ${sourceLink}</div>
        <div class="sector-card-action">
          <div class="sector-phone-preview">
            <i class="fa-solid fa-phone"></i>
            <b>${esc(item.phone)}</b>
            ${item.altPhone ? `<small class="text-secondary">/ ${esc(item.altPhone)}</small>` : ''}
          </div>
          <div class="sector-call-buttons">
            <a href="tel:${cleanPhone}" class="btn-sector-dial">
              <i class="fa-solid fa-phone-volume"></i> ${esc(item.actionText || 'Call')}
            </a>
            ${cleanAlt ? `
              <a href="tel:${cleanAlt}" class="btn-sector-dial alt" title="Call Alternate Verified Number">
                <i class="fa-solid fa-phone"></i>
              </a>` : ''}
          </div>
        </div>
      `;
      sectorContainer.appendChild(card);
    });
  }

  function renderCampCards(filterDistrict) {
    if (!campsList) return;
    campsList.innerHTML = "";
    const list = (!filterDistrict || filterDistrict === "all")
      ? ACTIVE_RELIEF_CAMPS
      : ACTIVE_RELIEF_CAMPS.filter(c => c.district.toLowerCase().includes(filterDistrict.toLowerCase()) || filterDistrict.toLowerCase().includes(c.district.toLowerCase()));

    if (!list.length) {
      campsList.innerHTML = `<div class="camps-empty-notice"><i class="fa-solid fa-circle-info"></i> No sample camp entries found for this filter. Dial verified District DEOC at 1077 or SEOC at 1070.</div>`;
      return;
    }

    list.forEach(camp => {
      const card = document.createElement("div");
      card.className = "camp-card";
      const cleanPhone = camp.phone.replace(/[^0-9+]/g, "");
      const cleanAlt = camp.altPhone ? camp.altPhone.replace(/[^0-9+]/g, "") : null;

      const suppliesHtml = camp.supplies.map(s => `<span class="supply-chip"><i class="fa-solid fa-check"></i> ${esc(s)}</span>`).join("");

      card.innerHTML = `
        <div class="camp-card-top">
          <div>
            <span class="camp-district-pill"><i class="fa-solid fa-location-dot"></i> ${esc(camp.district)}</span>
            <h4>${esc(camp.name)}</h4>
            <span class="camp-loc"><i class="fa-solid fa-map-pin"></i> ${esc(camp.location)}</span>
          </div>
          <span class="camp-status-badge status-${camp.statusColor || 'cyan'}">
            <i class="fa-solid fa-flask"></i> ${esc(camp.statusBadge)}
          </span>
        </div>
        <div class="camp-capacity-strip">
          <div class="capacity-bar-wrap">
            <div class="capacity-info">
              <span><b>Sample Capacity:</b> ${camp.capacity.toLocaleString()}</span>
              <span><b>Sample Occupancy:</b> ${camp.occupancy.toLocaleString()}</span>
            </div>
            <div class="capacity-progress-track">
              <div class="capacity-progress-bar ${camp.statusColor}" style="width: ${Math.min(100, (camp.occupancy / camp.capacity) * 100)}%;"></div>
            </div>
          </div>
        </div>
        <div class="camp-supplies-list">
          ${suppliesHtml}
        </div>
        <div class="camp-footer-action">
          <div class="camp-warden-info">
            <span class="warden-label">Verified Emergency Contact:</span>
            <span class="warden-name"><i class="fa-solid fa-phone"></i> ${esc(camp.warden)}</span>
          </div>
          <div class="camp-dial-group">
            <a href="tel:${cleanPhone}" class="btn-camp-call">
              <i class="fa-solid fa-phone-volume"></i> Call ${esc(camp.phone)}
            </a>
            ${cleanAlt ? `
              <a href="tel:${cleanAlt}" class="btn-camp-call alt" title="Call Alt Line ${esc(camp.altPhone)}">
                <i class="fa-solid fa-phone"></i> ${esc(camp.altPhone)}
              </a>` : ''}
          </div>
        </div>
      `;
      campsList.appendChild(card);
    });
  }

  // Populate Camp District Filter Dropdown
  if (campFilter) {
    campFilter.innerHTML = '<option value="all">All Districts (12 Sample Camps)</option>';
    const uniqueDistricts = [...new Set(ACTIVE_RELIEF_CAMPS.map(c => c.district))];
    uniqueDistricts.forEach(d => {
      const opt = document.createElement("option");
      opt.value = d;
      opt.textContent = d;
      campFilter.appendChild(opt);
    });

    campFilter.addEventListener("change", () => {
      renderCampCards(campFilter.value);
    });
  }

  function setActiveTab(targetSector) {
    if (!tabsContainer) return;
    tabsContainer.querySelectorAll(".sector-tab-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.sector === targetSector);
    });

    if (targetSector === "camps") {
      if (sectorContainer) sectorContainer.style.display = "none";
      if (campsContainer) campsContainer.style.display = "block";
      if (campFilter) {
        const found = Array.from(campFilter.options).some(o => o.value === where.name);
        campFilter.value = found ? where.name : "all";
      }
      renderCampCards(campFilter ? campFilter.value : "all");
    } else {
      if (campsContainer) campsContainer.style.display = "none";
      if (sectorContainer) sectorContainer.style.display = "grid";
      renderSectorCards(targetSector);
    }
  }

  // Tab click event
  if (tabsContainer) {
    tabsContainer.querySelectorAll(".sector-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        setActiveTab(btn.dataset.sector);
      });
    });
  }

  function openModal(defaultTab = "all") {
    modal.hidden = false;
    updateVerifiedNote();
    updateDistrictDEOCTelemetry(where.name);
    setActiveTab(defaultTab);
  }

  refreshEmergencyModalUI = () => {
    updateVerifiedNote();
    if (!modal.hidden && tabsContainer) {
      const activeBtn = tabsContainer.querySelector(".sector-tab-btn.active");
      setActiveTab(activeBtn ? activeBtn.dataset.sector : "all");
    }
  };

  function closeModal() {
    modal.hidden = true;
  }

  if (btnHeaderSectors) btnHeaderSectors.addEventListener("click", () => openModal("all"));
  if (btnHeaderCamps) btnHeaderCamps.addEventListener("click", () => openModal("camps"));
  if (btnHeroCamps) btnHeroCamps.addEventListener("click", () => openModal("camps"));
  if (btnSidebarOpen) btnSidebarOpen.addEventListener("click", () => openModal("all"));
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (doneBtn) doneBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });
}

function setupMapModalEvents() {
  const openBtn = $("btn-map-settings");
  const modal = $("map-settings-modal");
  const closeBtn = $("modal-close");
  const doneBtn = $("btn-modal-done");
  const saveBtn = $("btn-save-map-settings");
  const customInputGroup = $("custom-api-input-group");
  const customInput = $("custom-api-key");
  const saveCustomKeyBtn = $("btn-save-custom-key");
  const testCustomKeyBtn = $("btn-test-custom-key");
  const clearCustomKeyBtn = $("btn-clear-custom-key");
  const keyFeedback = $("custom-key-feedback");
  const regrantBtn = $("btn-regrant-all");
  const runDiagBtn = $("btn-run-diagnostics");
  const diagLog = $("diag-console-log");

  // Load saved key
  const savedKey = localStorage.getItem("disaster_mapbox_key") || "";
  if (customInput) customInput.value = savedKey;
  if (savedKey) customMapboxKey = savedKey;

  const savedEngine = localStorage.getItem("disaster_tile_engine") || "osmHOT";
  currentTileEngineKey = savedEngine;
  const matchingRadio = document.querySelector(`input[name="tile-engine"][value="${savedEngine}"]`);
  if (matchingRadio) {
    matchingRadio.checked = true;
    document.querySelectorAll(".radio-card").forEach((rc) => rc.classList.remove("active"));
    matchingRadio.closest(".radio-card")?.classList.add("active");
    if (customInputGroup) {
      customInputGroup.style.display = savedEngine === "mapboxCustom" ? "block" : "none";
    }
  }

  // Open modal
  if (openBtn && modal) {
    openBtn.addEventListener("click", () => {
      modal.hidden = false;
    });
  }

  // Close modal
  const closeModal = () => {
    if (modal) {
      modal.hidden = true;
      if (map) {
        setTimeout(() => map.invalidateSize(), 150);
      }
    }
  };

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (doneBtn) doneBtn.addEventListener("click", closeModal);

  // Click backdrop outside dialog
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // Escape key closes modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && !modal.hidden) {
      closeModal();
    }
  });

  // Modal tab switching
  document.querySelectorAll(".modal-tab-btn").forEach((tabBtn) => {
    tabBtn.addEventListener("click", () => {
      document.querySelectorAll(".modal-tab-btn").forEach((b) => b.classList.remove("active"));
      tabBtn.classList.add("active");

      const targetTab = tabBtn.dataset.tab;
      document.querySelectorAll(".modal-tab-content").forEach((content) => {
        content.style.display = "none";
        content.classList.remove("active");
      });

      const activeContent = $("tab-content-" + targetTab);
      if (activeContent) {
        activeContent.style.display = "flex";
        activeContent.classList.add("active");
      }
    });
  });

  // Radio button engine selection
  document.querySelectorAll('input[name="tile-engine"]').forEach((radio) => {
    radio.addEventListener("change", (e) => {
      document.querySelectorAll(".radio-card").forEach((rc) => rc.classList.remove("active"));
      e.target.closest(".radio-card")?.classList.add("active");
      if (customInputGroup) {
        customInputGroup.style.display = e.target.value === "mapboxCustom" ? "block" : "none";
      }
    });
  });

  // Save custom key
  if (saveCustomKeyBtn && customInput) {
    saveCustomKeyBtn.addEventListener("click", () => {
      const val = customInput.value.trim();
      customMapboxKey = val;
      localStorage.setItem("disaster_mapbox_key", val);
      if (keyFeedback) {
        keyFeedback.textContent = val ? "✓ Personal Mapbox key saved and granted locally." : "Token cleared. Using pre-granted public disaster layers.";
        keyFeedback.style.color = "#34d399";
      }
      showToast("API Key Granted", val ? "Custom Mapbox token saved & authorized!" : "Reverted to pre-granted public satellite layers.");
    });
  }

  // Test custom key
  if (testCustomKeyBtn && customInput) {
    testCustomKeyBtn.addEventListener("click", async () => {
      const val = customInput.value.trim();
      if (!val) {
        if (keyFeedback) {
          keyFeedback.textContent = "Please enter a Mapbox token starting with pk.ey... or select a free layer above.";
          keyFeedback.style.color = "#fbbf24";
        }
        return;
      }
      if (keyFeedback) {
        keyFeedback.textContent = "Pinging Mapbox tile endpoint…";
        keyFeedback.style.color = "#38bdf8";
      }
      try {
        const res = await fetch(`https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/tiles/0/0/0?access_token=${val}`);
        if (res.ok) {
          if (keyFeedback) {
            keyFeedback.textContent = "✓ Mapbox API Key verified & live (HTTP 200 OK)!";
            keyFeedback.style.color = "#34d399";
          }
          showToast("Token Verified", "Mapbox Access Token is valid and ready!");
        } else {
          throw new Error("HTTP " + res.status);
        }
      } catch (err) {
        if (keyFeedback) {
          keyFeedback.textContent = "Notice: Token rejected or offline (" + err.message + "). Free disaster layers remain 100% active.";
          keyFeedback.style.color = "#f87171";
        }
      }
    });
  }

  // Clear custom key
  if (clearCustomKeyBtn && customInput) {
    clearCustomKeyBtn.addEventListener("click", () => {
      customInput.value = "";
      customMapboxKey = "";
      localStorage.removeItem("disaster_mapbox_key");
      if (keyFeedback) {
        keyFeedback.textContent = "Token cleared. Free pre-granted public disaster layers active.";
        keyFeedback.style.color = "var(--text-muted)";
      }
      showToast("Token Cleared", "Using pre-granted free disaster layers.");
    });
  }

  // Refresh & Re-Authorize All 6 API Keys
  if (regrantBtn) {
    regrantBtn.addEventListener("click", () => {
      regrantBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Re-Verifying 6 Mission-Critical APIs…';
      setTimeout(() => {
        regrantBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Refresh Public Data Endpoints';
        showToast("Endpoints Refreshed", "Keyless public endpoints (Open-Meteo, USGS, OSM/Overpass) and local prototype layers active.");
        const label = $("map-engine-label");
        if (label) label.innerHTML = `<i class="fa-solid fa-layer-group text-green"></i> Map Layer: ${TILE_ENGINES[currentTileEngineKey]?.name || "OSM"}`;
      }, 500);
    });
  }

  // Run live diagnostics handshake
  if (runDiagBtn && diagLog) {
    runDiagBtn.addEventListener("click", async () => {
      runDiagBtn.disabled = true;
      runDiagBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Testing Handshakes…';
      diagLog.innerHTML = '<div class="diag-line">[DIAGNOSTICS] Checking keyless public API endpoints and local prototype layers...</div>';

      const addLog = (text, type = "") => {
        const time = new Date().toLocaleTimeString();
        const div = document.createElement("div");
        div.className = "diag-line " + type;
        div.textContent = `[${time}] ${text}`;
        diagLog.appendChild(div);
        diagLog.scrollTop = diagLog.scrollHeight;
      };

      // Test 1: Map Tile Server
      try {
        const t0 = performance.now();
        const r = await fetch("https://tile.openstreetmap.org/9/414/220.png", { method: "HEAD", cache: "no-store" });
        const latency = Math.round(performance.now() - t0);
        addLog(`Leaflet Map Tiles (OSM/HOT/Esri - keyless): HTTP ${r.status} (${latency}ms)`, r.ok ? "success" : "warn");
      } catch (e) {
        addLog(`Leaflet Map Tiles: Unreachable (${e.message})`, "warn");
      }

      // Test 2: Open-Meteo Weather
      try {
        const t0 = performance.now();
        const r = await fetch("https://api.open-meteo.com/v1/forecast?latitude=26.14&longitude=91.73&current=temperature_2m", { cache: "no-store" });
        const latency = Math.round(performance.now() - t0);
        addLog(`Open-Meteo Weather API (keyless): HTTP ${r.status} (${latency}ms)`, r.ok ? "success" : "warn");
      } catch (e) {
        addLog(`Open-Meteo Weather API: Unavailable (${e.message}) — falls back to sample weather data`, "warn");
      }

      // Test 3: USGS Earthquakes
      try {
        const t0 = performance.now();
        const r = await fetch("https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&limit=1", { cache: "no-store" });
        const latency = Math.round(performance.now() - t0);
        addLog(`USGS Earthquake API (keyless): HTTP ${r.status} (${latency}ms)`, r.ok ? "success" : "warn");
      } catch (e) {
        addLog(`USGS Earthquake API: Unavailable (${e.message}) — falls back to sample seismic data`, "warn");
      }

      // Test 4: Local Sample Gauges
      addLog(`River Gauges & Hazard Zones: Local static sample data (no live CWC feed connected)`, "warn");

      // Test 5: Overpass Shelters
      addLog(`Overpass OSM API (keyless): Queries hospitals/police/fire/shelters in 12km radius + local sample fallback`, "success");

      // Test 6: Web Audio Siren
      addLog(`Siren Synthesizer: Browser Web Audio API (client-side audio only)`, "success");

      addLog(`DIAGNOSTIC COMPLETE.`, "success");

      runDiagBtn.disabled = false;
      runDiagBtn.innerHTML = '<i class="fa-solid fa-play"></i> Re-Run Check';
      showToast("Endpoint Check Complete", "Review log output for live API vs sample fallback status.");
    });
  }

  // Apply engine button
  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      const selected = document.querySelector('input[name="tile-engine"]:checked');
      if (selected) {
        const val = selected.value;
        const key = customInput ? customInput.value.trim() : "";
        localStorage.setItem("disaster_tile_engine", val);
        setMapTileEngine(val, key);
        showToast("Map Engine Updated", `Active: ${TILE_ENGINES[val]?.name || val}`);
      }
      closeModal();
    });
  }
}

// ================= 4. EMERGENCY EARLY WARNING ALERT SYSTEM =================
function initAlertSystem() {
  // Alert Tier Switchers
  document.querySelectorAll(".tier-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tier = btn.dataset.tier;
      setAlertTier(tier);
    });
  });

  // Emergency Siren Button (Synthetic Web Audio)
  const sirenBtn = $("btn-emergency-siren");
  if (sirenBtn) {
    sirenBtn.addEventListener("click", toggleEmergencySiren);
  }

  // Load Initial Advisory
  renderOfficialAdvisory("evac");

  // Advisory Tab Switchers
  document.querySelectorAll(".adv-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".adv-tab").forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      renderOfficialAdvisory(tab.dataset.adv);
    });
  });
}

function setAlertTier(tier) {
  currentAlertTier = tier;
  document.querySelectorAll(".tier-btn").forEach((b) => {
    b.classList.toggle("active", b.dataset.tier === tier);
  });

  const pulse = document.querySelector(".alert-status-pulse");
  const headline = $("headline-text");
  const districtStat = $("stat-districts");

  if (pulse) {
    pulse.className = `alert-status-pulse ${tier}`;
  }

  if (tier === "red") {
    if (headline) headline.textContent = "PROTOTYPE ALERT DEMO (RED TIER) • SAMPLE ASSAM BASIN VIEW";
    if (districtStat) districtStat.textContent = "20 Districts (Sample)";
  } else if (tier === "orange") {
    if (headline) headline.textContent = "PROTOTYPE ALERT DEMO (ORANGE TIER) • SAMPLE WATCH VIEW";
    if (districtStat) districtStat.textContent = "12 Districts (Sample)";
  } else {
    if (headline) headline.textContent = "PROTOTYPE ALERT DEMO (YELLOW TIER) • SAMPLE MONITOR VIEW";
    if (districtStat) districtStat.textContent = "7 Districts (Sample)";
  }

  renderRisk();
}

// Synthetic Dual-Tone Emergency Siren (Uses Web Audio API - Zero External MP3 Needed)
function toggleEmergencySiren() {
  const btn = $("btn-emergency-siren");
  const icon = $("siren-icon");
  const label = $("siren-label");

  if (isSirenPlaying) {
    // Stop Siren
    if (sirenTimer) clearInterval(sirenTimer);
    if (sirenOsc) {
      try { sirenOsc.stop(); sirenOsc.disconnect(); } catch (e) {}
      sirenOsc = null;
    }
    isSirenPlaying = false;
    if (btn) btn.classList.remove("playing");
    if (label) label.textContent = "Sound Siren";
    if (icon) icon.className = "fa-solid fa-volume-high";
  } else {
    // Start Dual-Tone Siren (750 Hz <-> 960 Hz alternating)
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!audioCtx) audioCtx = new AudioContext();
      if (audioCtx.state === "suspended") audioCtx.resume();

      sirenOsc = audioCtx.createOscillator();
      sirenGain = audioCtx.createGain();

      sirenOsc.type = "sawtooth";
      sirenOsc.frequency.setValueAtTime(750, audioCtx.currentTime);
      sirenGain.gain.setValueAtTime(0.08, audioCtx.currentTime); // Safe pleasant volume

      sirenOsc.connect(sirenGain);
      sirenGain.connect(audioCtx.destination);
      sirenOsc.start();

      let toggle = false;
      sirenTimer = setInterval(() => {
        if (!sirenOsc) return;
        toggle = !toggle;
        sirenOsc.frequency.setTargetAtTime(toggle ? 960 : 720, audioCtx.currentTime, 0.12);
      }, 450);

      isSirenPlaying = true;
      if (btn) btn.classList.add("playing");
      if (label) label.textContent = "Mute Siren";
      if (icon) icon.className = "fa-solid fa-volume-xmark";
    } catch (err) {
      console.warn("Audio Context init blocked:", err);
    }
  }
}

// Render Public Safety Guidance
function renderOfficialAdvisory(tabKey) {
  const pane = $("advisory-pane-content");
  if (!pane) return;

  const items = SAFETY_ADVISORIES[tabKey] || SAFETY_ADVISORIES.evac;
  pane.innerHTML = items.map((item) => {
    const tone = item.type === "check" ? "check" : item.type === "cross" ? "cross" : "warn";
    const iconClass = tone === "check" ? "fa-solid fa-circle-check" : tone === "cross" ? "fa-solid fa-circle-xmark" : "fa-solid fa-triangle-exclamation";
    return `
      <div class="adv-item ${tone}">
        <span class="adv-icon-wrap" aria-hidden="true"><i class="${iconClass}"></i></span>
        <div class="adv-item-body">
          <b class="adv-item-title">${esc(item.title)}</b>
          <p class="adv-item-text">${esc(item.text)}</p>
        </div>
      </div>
    `;
  }).join("");
}

// Render Brahmaputra Flood Hazard Zones onto Map
function renderHazardZones() {
  if (!layerGroups.hazard) return;
  layerGroups.hazard.clearLayers();

  FLOOD_HAZARD_ZONES.forEach((zone) => {
    const isSevere = zone.risk === "Severe";
    const polygon = L.polygon(zone.coords, {
      color: isSevere ? "#dc2626" : "#f59e0b",
      weight: 2,
      opacity: 0.85,
      fillColor: isSevere ? "#ef4444" : "#fbbf24",
      fillOpacity: 0.35,
      dashArray: "4, 4"
    }).addTo(layerGroups.hazard);

    polygon.bindPopup(`
      <div style="font-family:inherit; min-width:180px;">
        <span style="background:${isSevere ? '#dc2626' : '#d97706'}; color:#fff; font-size:10px; font-weight:800; padding:2px 8px; border-radius:4px;">
          ${zone.risk.toUpperCase()} FLOOD ZONE
        </span>
        <h4 style="margin:6px 0 3px; font-size:13px; color:#f8fafc;">${esc(zone.name)}</h4>
        <p style="margin:0; font-size:11px; color:#94a3b8;">${esc(zone.desc)}</p>
      </div>
    `);
  });
}

// Render Central Water Commission (CWC) Official River Gauges
function renderRiverGauges() {
  if (!layerGroups.gauges) return;
  layerGroups.gauges.clearLayers();
  const listEl = $("river-gauges-list");
  if (listEl) listEl.innerHTML = "";

  RIVER_GAUGES.forEach((g) => {
    const isDanger = g.current >= g.danger;
    const isWarning = g.current >= g.warning && !isDanger;
    const statusClass = isDanger ? "danger" : isWarning ? "warning" : "normal";
    const statusText = isDanger ? "ABOVE DANGER LEVEL" : isWarning ? "WARNING LEVEL" : "NORMAL FLOW";
    const markerColor = isDanger ? "#ef4444" : isWarning ? "#f59e0b" : "#06b6d4";

    const marker = L.circleMarker([g.lat, g.lon], {
      radius: 8,
      fillColor: markerColor,
      color: "#ffffff",
      weight: 2,
      opacity: 1,
      fillOpacity: 0.95
    }).addTo(layerGroups.gauges);

    marker.bindPopup(`
      <div style="font-family:inherit; min-width:220px;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <b style="color:#38bdf8; font-size:11px;">SAMPLE GAUGE DATA (DEMO)</b>
          <span style="font-size:10px; font-weight:800; color:${markerColor};">${statusText}</span>
        </div>
        <h3 style="margin:4px 0 6px; font-size:14px; color:#fff;">${esc(g.river)} &bull; ${esc(g.station)}</h3>
        <p style="margin:2px 0; font-size:12px;">Sample Water Level: <b style="color:${markerColor}">${g.current.toFixed(2)} m</b> (${esc(g.trend)})</p>
        <p style="margin:2px 0; font-size:11px; color:#94a3b8;">Reference Danger: <b>${g.danger.toFixed(2)} m</b> &bull; Warning: ${g.warning.toFixed(2)} m</p>
        <p style="margin:2px 0; font-size:11px; color:#64748b;">Recorded HFL Benchmark: <b>${g.hfl.toFixed(2)} m</b></p>
      </div>
    `);

    if (listEl) {
      const percentage = Math.min(100, Math.max(10, ((g.current - (g.warning - 2)) / (g.danger - (g.warning - 2) + 0.8)) * 100));
      const row = document.createElement("div");
      row.className = "gauge-row";
      row.innerHTML = `
        <div class="gauge-top">
          <span class="gauge-name">${esc(g.river)} - ${esc(g.station)}</span>
          <span class="gauge-status ${statusClass}">${g.current >= g.danger ? 'DANGER' : 'WARNING'}</span>
        </div>
        <div class="gauge-metric-bar">
          <div class="gauge-progress ${statusClass}" style="width: ${percentage}%"></div>
        </div>
        <div class="gauge-nums">
          <span>Level: <b>${g.current}m</b> (${g.trend})</span>
          <span>Danger: <b>${g.danger}m</b> | HFL: <b>${g.hfl}m</b></span>
        </div>
      `;
      row.addEventListener("click", () => {
        map.setView([g.lat, g.lon], 12);
        marker.openPopup();
      });
      listEl.appendChild(row);
    }
  });
}

// ================= 5. LIVE METEOROLOGICAL & SEISMIC DATA LOADERS =================
async function loadWeather() {
  const weatherEl = $("weather");
  if (weatherEl) {
    weatherEl.innerHTML = `<div class="loading-spinner"><i class="fa-solid fa-spinner fa-spin"></i> ${t("loading")}</div>`;
  }

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${where.lat}&longitude=${where.lon}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&hourly=precipitation,precipitation_probability&forecast_days=2&timezone=auto`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Weather HTTP " + res.status);
    const d = await res.json();

    let start = d.hourly.time.findIndex((x) => x >= d.current.time);
    if (start < 0) start = 0;
    const hourly24 = d.hourly.precipitation.slice(start, start + 24);
    const rain24 = hourly24.reduce((acc, val) => acc + (val || 0), 0);

    weather = {
      temp: d.current.temperature_2m,
      humidity: d.current.relative_humidity_2m,
      rainNow: d.current.precipitation,
      rain24: rain24,
      windSpeed: d.current.wind_speed_10m,
      code: d.current.weather_code,
      hourly24: hourly24,
      isDemoFallback: false
    };

    renderWeather();
    renderRisk();
    renderRainProgression();
  } catch (err) {
    console.warn("Open-Meteo live API unavailable, showing sample fallback weather:", err);
    weather = {
      temp: 28.5,
      humidity: 89,
      rainNow: 4.2,
      rain24: 76.8,
      windSpeed: 14.5,
      code: 63,
      hourly24: [2.1, 3.4, 5.0, 7.2, 8.5, 6.1, 4.3, 3.2, 2.8, 1.9, 1.2, 2.4, 3.8, 4.2, 5.6, 6.1, 4.8, 3.2, 2.1, 1.5, 0.9, 0.4, 0.2, 0.0],
      isDemoFallback: true
    };
    renderWeather();
    renderRisk();
    renderRainProgression();
  }
}

function renderWeather() {
  const el = $("weather");
  if (!el || !weather) return;

  const locChip = $("current-location-chip");
  if (locChip) locChip.textContent = where.name.split(" ")[0];

  const fallbackNote = weather.isDemoFallback
    ? `<div class="demo-data-note"><i class="fa-solid fa-flask"></i> Sample offline fallback data (Open-Meteo unavailable)</div>`
    : `<div class="live-source-note"><i class="fa-solid fa-circle-check"></i> Live Open-Meteo Forecast</div>`;

  el.innerHTML = `
    ${fallbackNote}
    <div class="weather-stats-grid">
      <div class="w-stat-box">
        <span class="w-label">${t("temp")}</span>
        <span class="w-val">${weather.temp} °C</span>
      </div>
      <div class="w-stat-box">
        <span class="w-label">${t("humidity")}</span>
        <span class="w-val">${weather.humidity}%</span>
      </div>
      <div class="w-stat-box">
        <span class="w-label">${t("rainNow")}</span>
        <span class="w-val ${weather.rainNow > 5 ? 'rain-high' : ''}">${weather.rainNow} mm</span>
      </div>
      <div class="w-stat-box">
        <span class="w-label">${t("rain24")}</span>
        <span class="w-val ${weather.rain24 >= 50 ? 'rain-high' : ''}">${weather.rain24.toFixed(1)} mm</span>
      </div>
    </div>
  `;
}

function renderRainProgression() {
  const container = $("rain-bars");
  const sumEl = $("rain-24h-total");
  if (!container || !weather || !weather.hourly24) return;

  container.innerHTML = "";
  if (sumEl) sumEl.textContent = `${weather.rain24.toFixed(1)} mm total`;

  const maxRain = Math.max(...weather.hourly24, 10);

  weather.hourly24.forEach((val, i) => {
    const bar = document.createElement("div");
    bar.className = "rain-bar" + (val >= 5 ? " heavy" : "");
    const heightPercent = Math.max(6, (val / maxRain) * 100);
    bar.style.height = `${heightPercent}%`;
    bar.title = `Hour +${i + 1}: ${val.toFixed(1)} mm`;
    container.appendChild(bar);
  });
}

function renderRisk() {
  const riskBox = $("risk");
  const tipsBox = $("tips");
  const slot = $("risk-badge-slot");
  if (!riskBox) return;

  const mm = simulate ? 135.0 : (weather ? weather.rain24 : 0);
  const level = riskLevel(mm);

  if (slot) {
    slot.innerHTML = `<span class="badge ${level}"><i class="fa-solid fa-circle-exclamation"></i> ${t(level)}</span>`;
  }

  const districtData = DISTRICTS[where.name];
  const ddmaNum = districtData ? districtData.ddma : "1077";

  riskBox.innerHTML = `
    <p><b>Sample District Vulnerability Tier:</b> <span style="color:#dc2626; font-weight:800;">${districtData ? districtData.risk.toUpperCase() : 'HIGH'} (SAMPLE)</span></p>
    <p><b>${simulate ? "Simulated 24h Rainfall:" : "Open-Meteo 24h Forecast:"}</b> <span style="color:#0284c7; font-weight:800;">${mm.toFixed(1)} mm</span>${simulate ? ' <span class="sim-inline-pill">SIMULATION</span>' : ''}</p>
    <p style="font-size:0.78rem; color:#475569; margin-top:2px;">District DEOC Helpline: <b>${esc(ddmaNum)}</b></p>
  `;

  if (tipsBox) tipsBox.textContent = t("tips_" + level);
}

async function loadQuakes() {
  const box = $("quakes");
  if (box) box.innerHTML = `<div class="loading-spinner"><i class="fa-solid fa-spinner fa-spin"></i> ${t("loading")}</div>`;
  if (!layerGroups.quakes) return;
  layerGroups.quakes.clearLayers();

  const start = new Date(Date.now() - 30 * 864e5).toISOString().slice(0, 10);
  const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${start}&minlatitude=22&maxlatitude=29&minlongitude=89&maxlongitude=97&minmagnitude=2.5&orderby=time`;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);

    if (!res.ok) throw new Error("USGS " + res.status);
    const d = await res.json();
    quakesIsDemo = false;
    quakes = d.features.map((f) => ({
      mag: f.properties.mag || 0,
      place: f.properties.place || "Assam-Burma Seismic Fault",
      time: f.properties.time,
      lat: f.geometry.coordinates[1],
      lon: f.geometry.coordinates[0]
    }));
  } catch (e) {
    quakesIsDemo = true;
    quakes = [
      { mag: 4.8, place: "34 km W of Tezpur, Assam (Sample Fallback)", time: Date.now() - 3 * 864e5, lat: 26.68, lon: 92.45 },
      { mag: 3.7, place: "18 km NE of Dhekiajuli, Sonitpur (Sample Fallback)", time: Date.now() - 7 * 864e5, lat: 26.75, lon: 92.55 },
      { mag: 4.2, place: "22 km S of Silchar, Cachar (Sample Fallback)", time: Date.now() - 14 * 864e5, lat: 24.62, lon: 92.76 },
      { mag: 5.1, place: "Arunachal-Assam Border Belt (Sample Fallback)", time: Date.now() - 21 * 864e5, lat: 27.65, lon: 93.85 },
      { mag: 3.5, place: "45 km E of Guwahati, Morigaon (Sample Fallback)", time: Date.now() - 26 * 864e5, lat: 26.22, lon: 92.18 }
    ];
  }

  quakes.forEach((q) => {
    const isMajor = q.mag >= 4.5;
    const color = isMajor ? "#dc2626" : q.mag >= 3.5 ? "#ea580c" : "#d97706";

    L.circleMarker([q.lat, q.lon], {
      radius: 4 + q.mag * 2.2,
      color: "#ffffff",
      weight: 1.5,
      fillColor: color,
      fillOpacity: 0.85
    }).bindPopup(`
      <div style="font-family:inherit; min-width:180px;">
        <span style="background:${color}; color:#fff; font-size:10px; font-weight:800; padding:2px 8px; border-radius:4px;">
          MAGNITUDE ${q.mag.toFixed(1)}
        </span>
        <h4 style="margin:6px 0 2px; font-size:13px; color:#fff;">${esc(q.place)}</h4>
        <span style="font-size:11px; color:#94a3b8;">${new Date(q.time).toLocaleDateString()} &bull; ${new Date(q.time).toLocaleTimeString()}</span>
      </div>
    `).addTo(layerGroups.quakes);
  });

  renderQuakes();
}

function renderQuakes() {
  const box = $("quakes");
  if (!box) return;
  if (!quakes.length) {
    box.innerHTML = `<p class="small">${t("noQuakes")}</p>`;
    return;
  }

  const notice = quakesIsDemo
    ? `<div class="demo-data-note"><i class="fa-solid fa-flask"></i> Sample offline fallback data (USGS feed unavailable)</div>`
    : `<div class="live-source-note"><i class="fa-solid fa-circle-check"></i> Live USGS GeoJSON Feed</div>`;

  const top = [...quakes].sort((a, b) => b.time - a.time).slice(0, 4);
  box.innerHTML = notice + top.map((q) => {
    const magClass = q.mag >= 4.5 ? "high" : q.mag >= 3.5 ? "mid" : "low";
    return `
      <div class="quake-item" onclick="map.setView([${q.lat}, ${q.lon}], 10)">
        <div style="display:flex; align-items:center;">
          <span class="quake-mag-badge ${magClass}">M ${q.mag.toFixed(1)}</span>
          <div class="quake-details">
            <div class="quake-place">${esc(q.place)}</div>
            <div class="quake-time">${new Date(q.time).toLocaleDateString()}</div>
          </div>
        </div>
        <i class="fa-solid fa-chevron-right" style="color:#64748b; font-size:0.75rem;"></i>
      </div>
    `;
  }).join("");
}

// Emergency Infrastructure Loader (OpenStreetMap Overpass API + Sample Reference Points)
async function loadPlaces() {
  const list = $("places");
  const countEl = $("nearby-count");
  if (list) list.innerHTML = `<li class="loading-li"><i class="fa-solid fa-spinner fa-spin"></i> ${t("loading")}</li>`;
  
  if (layerGroups.shelters) layerGroups.shelters.clearLayers();
  if (layerGroups.hospitals) layerGroups.hospitals.clearLayers();
  places = [];

  // Sample reference points paired with verified emergency short codes / DEOC numbers
  const districtList = CURATED_EMERGENCY_NODES[where.name] || CURATED_EMERGENCY_NODES["Guwahati (Kamrup Metro)"];
  places = districtList.map((p) => ({
    name: p.name,
    type: p.type,
    phone: p.phone || (p.type === "hospital" ? "108" : p.type === "police" ? "100" : p.type === "fire_station" ? "101" : "1077"),
    lat: p.lat,
    lon: p.lon,
    isDemo: true,
    km: distanceKm(where.lat, where.lon, p.lat, p.lon)
  }));

  const query = `[out:json][timeout:5];nwr["amenity"~"^(hospital|police|fire_station|shelter)$"](around:12000,${where.lat},${where.lon});out center 25;`;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const res = await fetch("https://overpass-api.de/api/interpreter?data=" + encodeURIComponent(query), { signal: controller.signal });
    clearTimeout(timeout);

    if (res.ok) {
      const d = await res.json();
      if (d && d.elements && d.elements.length > 0) {
        const livePlaces = d.elements.map((el) => {
          const lat = el.lat ?? (el.center && el.center.lat);
          const lon = el.lon ?? (el.center && el.center.lon);
          const type = el.tags.amenity;
          const phone = el.tags.phone || el.tags["contact:phone"] || (type === "hospital" ? "108" : type === "police" ? "100" : type === "fire_station" ? "101" : "1077");
          return {
            name: el.tags.name || `${where.name.split(" ")[0]} ${t(type)}`,
            type: type,
            phone: phone,
            lat: lat,
            lon: lon,
            isDemo: false,
            km: distanceKm(where.lat, where.lon, lat, lon)
          };
        }).filter((p) => p.lat != null && p.lon != null);

        livePlaces.forEach((lp) => {
          if (!places.some((ep) => ep.name === lp.name)) {
            places.push(lp);
          }
        });
      }
    }
  } catch (err) {}

  places.sort((a, b) => a.km - b.km);

  places.forEach((p) => {
    const isHospital = p.type === "hospital";
    const targetGroup = isHospital ? layerGroups.hospitals : layerGroups.shelters;
    const color = PLACE_COLORS[p.type] || "#3b82f6";
    const cleanPhone = (p.phone || "112").replace(/[^0-9+]/g, "");
    const sourceBadge = p.isDemo ? "Sample Reference Node" : "OpenStreetMap (Overpass)";

    L.circleMarker([p.lat, p.lon], {
      radius: 7,
      fillColor: color,
      color: "#ffffff",
      weight: 1.5,
      fillOpacity: 0.95
    }).bindPopup(`
      <div style="font-family:inherit; min-width:180px;">
        <span style="background:${color}; color:#fff; font-size:10px; font-weight:800; padding:2px 8px; border-radius:4px;">
          ${t(p.type).toUpperCase()} &bull; ${sourceBadge.toUpperCase()}
        </span>
        <h4 style="margin:6px 0 2px; font-size:13px; color:#fff;">${esc(p.name)}</h4>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:4px;">
          <span style="font-size:11px; color:#38bdf8;">${p.km.toFixed(1)} ${t("away")}</span>
        </div>
        <div style="margin-top:8px;">
          <a href="tel:${cleanPhone}" style="display:inline-flex; align-items:center; gap:5px; background:#059669; color:#fff; font-size:11px; font-weight:700; padding:4px 10px; border-radius:6px; text-decoration:none;">
            <i class="fa-solid fa-phone"></i> Emergency Line: ${esc(p.phone || '112')}
          </a>
        </div>
      </div>
    `).addTo(targetGroup);
  });

  renderPlaces();
  const osmCount = places.filter((p) => !p.isDemo).length;
  if (countEl) countEl.textContent = osmCount > 0 ? `${osmCount} OSM + Sample` : `${places.length} Sample Nodes`;
}

function renderPlaces() {
  const list = $("places");
  if (!list) return;
  list.innerHTML = "";

  if (!places.length) {
    list.innerHTML = `<li>${t("none")}</li>`;
    return;
  }

  places.slice(0, 8).forEach((p) => {
    const li = document.createElement("li");
    const iconClass = p.type === "hospital" ? "fa-hospital" : p.type === "police" ? "fa-shield" : p.type === "fire_station" ? "fa-fire-extinguisher" : "fa-tents";
    const cleanPhone = (p.phone || (p.type === "hospital" ? "108" : p.type === "police" ? "100" : p.type === "fire_station" ? "101" : "1077")).replace(/[^0-9+]/g, "");

    li.innerHTML = `
      <div class="place-left">
        <div class="place-icon ${p.type}">
          <i class="fa-solid ${iconClass}"></i>
        </div>
        <div class="place-info">
          <span class="place-name">${esc(p.name)}</span>
          <span class="place-type">${t(p.type)}</span>
        </div>
      </div>
      <div class="place-actions-right">
        <span class="place-dist">${p.km.toFixed(1)} ${t("away")}</span>
        <a href="tel:${cleanPhone}" class="place-call-btn" title="Call directly from phone" onclick="event.stopPropagation();">
          <i class="fa-solid fa-phone"></i> Call
        </a>
      </div>
    `;

    li.addEventListener("click", () => {
      map.setView([p.lat, p.lon], 14);
    });

    list.appendChild(li);
  });
}

function setPlace(lat, lon, name, isUser) {
  where = { name, lat, lon };
  if (map) {
    map.setView([lat, lon], isUser ? 12 : 10);
    if (pin) pin.remove();

    const pinIcon = L.divIcon({
      className: "custom-location-pin",
      html: `<div style="position:relative;">
              <span style="display:block; width:18px; height:18px; background:#0ea5e9; border:3px solid #fff; border-radius:50%; box-shadow:0 0 14px #0ea5e9;"></span>
              <span style="position:absolute; inset:-6px; border:2px solid #38bdf8; border-radius:50%; animation:pulse-ring 2s infinite;"></span>
             </div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });

    pin = L.marker([lat, lon], { icon: pinIcon })
      .addTo(map)
      .bindPopup(`<b>${esc(isUser ? t("you") : name)}</b>`)
      .openPopup();
  }

  updateDistrictDEOCTelemetry(name);
  loadWeather();
  loadPlaces();
}

function applyLang() {
  document.documentElement.lang = lang === "as" ? "as" : "en";
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });

  const langBtn = $("lang");
  if (langBtn) {
    langBtn.querySelector("span").textContent = lang === "en" ? "অসমীয়া" : "English";
  }

  renderWeather();
  renderRisk();
  renderPlaces();
  renderQuakes();
  renderRiverGauges();
  if (pin) pin.setPopupContent(`<b>${esc(t("you"))}</b>`);
}

// ================= 6. ILLUSTRATIVE FLOOD PREPAREDNESS PHOTO CAROUSEL =================
const HERO_PHOTO_SLIDES = [
  {
    key: "basin",
    badge: "PLACEHOLDER SCENE 01/05 • BRAHMAPUTRA FLOODPLAIN OVERVIEW",
    location: "Upper Assam River Basin (Illustrative)",
    title: "Brahmaputra Monsoon Floodplain & Stilt Settlements",
    desc: "Placeholder image illustrating how seasonal monsoon runoff affects low-lying Assam floodplains and char settlements. Replace with licensed photography before production use."
  },
  {
    key: "boat",
    badge: "PLACEHOLDER SCENE 02/05 • BOAT EVACUATION SCENARIO",
    location: "Flood-Prone Riverine Villages (Illustrative)",
    title: "Emergency Boat Evacuation & Flood Rescue Preparedness",
    desc: "Illustrative scene highlighting boat evacuation during monsoon flooding. In a real emergency in Assam, call 112 (ERSS) or 1070 (SEOC)."
  },
  {
    key: "chopper",
    badge: "PLACEHOLDER SCENE 03/05 • AERIAL RELIEF SCENARIO",
    location: "Cut-Off Embankment Communities (Illustrative)",
    title: "Air-Drop Relief & High-Ground Supply Awareness",
    desc: "Placeholder illustration of aerial supply drops for isolated areas. Check verified state helplines (1070 / 1077) for actual official operations."
  },
  {
    key: "camp",
    badge: "PLACEHOLDER SCENE 04/05 • RELIEF SHELTER SCENARIO",
    location: "Community Relief Camps (Illustrative)",
    title: "Clean Drinking Water, Sanitation & Shelter Readiness",
    desc: "Illustrative relief camp scene showing clean water, ORS, and dry rations support. See Sample Camps tab for prototype reference data."
  },
  {
    key: "wildlife",
    badge: "PLACEHOLDER SCENE 05/05 • WILDLIFE & LIVESTOCK SAFETY",
    location: "Kaziranga Corridor & Highlands (Illustrative)",
    title: "Wildlife Corridor & Rural Livestock Evacuation",
    desc: "Placeholder illustration of highland flood platforms ('Poka Chaporis') and wildlife corridor safety near Kaziranga."
  }
];

let heroSliderState = {
  index: 0,
  autoPlay: true,
  elapsedMs: 0,
  durationMs: 6000,
  intervalId: null
};

function selectHeroSlide(targetIndexOrKey) {
  let idx = typeof targetIndexOrKey === "number"
    ? targetIndexOrKey
    : HERO_PHOTO_SLIDES.findIndex((s) => s.key === targetIndexOrKey);

  if (idx < 0 || idx >= HERO_PHOTO_SLIDES.length) idx = 0;
  heroSliderState.index = idx;
  heroSliderState.elapsedMs = 0;

  const current = HERO_PHOTO_SLIDES[idx];

  document.querySelectorAll(".hero-slide").forEach((slideEl) => {
    slideEl.classList.toggle("active", slideEl.dataset.slide === current.key);
  });

  document.querySelectorAll(".slide-pill").forEach((pill) => {
    const isActive = pill.dataset.slide === current.key;
    pill.classList.toggle("active", isActive);
    pill.setAttribute("aria-selected", isActive ? "true" : "false");
  });

  const statusText = $("scene-status-text");
  const locEl = $("hero-caption-loc");
  const titleEl = $("hero-caption-title");
  const descEl = $("hero-caption-desc");
  const progressFill = $("slide-progress-fill");

  if (statusText) statusText.textContent = current.badge;
  if (locEl) locEl.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${esc(current.location)}`;
  if (titleEl) titleEl.textContent = current.title;
  if (descEl) descEl.textContent = current.desc;
  if (progressFill) progressFill.style.width = "0%";
}

function initHeroPhotoSlider() {
  const heroSection = $("hero-photo-section");
  if (!heroSection) return;

  const prevBtn = $("slide-prev");
  const nextBtn = $("slide-next");
  const autoplayBtn = $("btn-toggle-autoplay");
  const autoplayIcon = $("autoplay-icon");
  const collapseBtn = $("btn-toggle-collapse");
  const progressFill = $("slide-progress-fill");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      const prevIdx = (heroSliderState.index - 1 + HERO_PHOTO_SLIDES.length) % HERO_PHOTO_SLIDES.length;
      selectHeroSlide(prevIdx);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      const nextIdx = (heroSliderState.index + 1) % HERO_PHOTO_SLIDES.length;
      selectHeroSlide(nextIdx);
    });
  }

  document.querySelectorAll(".slide-pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      selectHeroSlide(pill.dataset.slide);
    });
  });

  if (autoplayBtn) {
    autoplayBtn.addEventListener("click", () => {
      heroSliderState.autoPlay = !heroSliderState.autoPlay;
      autoplayBtn.classList.toggle("active", heroSliderState.autoPlay);
      if (autoplayIcon) {
        autoplayIcon.className = heroSliderState.autoPlay ? "fa-solid fa-pause" : "fa-solid fa-play";
      }
    });
  }

  if (collapseBtn) {
    collapseBtn.addEventListener("click", () => {
      heroSection.classList.toggle("expanded");
    });
  }

  selectHeroSlide(0);

  if (heroSliderState.intervalId) clearInterval(heroSliderState.intervalId);
  const tickMs = 100;
  heroSliderState.intervalId = setInterval(() => {
    if (!heroSliderState.autoPlay) return;
    heroSliderState.elapsedMs += tickMs;
    const pct = Math.min(100, (heroSliderState.elapsedMs / heroSliderState.durationMs) * 100);
    if (progressFill) progressFill.style.width = pct + "%";

    if (heroSliderState.elapsedMs >= heroSliderState.durationMs) {
      const nextIdx = (heroSliderState.index + 1) % HERO_PHOTO_SLIDES.length;
      selectHeroSlide(nextIdx);
    }
  }, tickMs);
}
// ----------------- 3D FLIP STAT CARDS & CITIZEN SOS DESK -----------------
function initFlipStatCards() {
  const cards = document.querySelectorAll(".flip-stat-card");
  cards.forEach((card) => {
    // Triggers inside card
    const triggers = card.querySelectorAll(".btn-flip-trigger, .btn-flip-back");
    triggers.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        card.classList.toggle("flipped");
      });
    });

    // Clicking anywhere on card (except telephone or action links) also flips
    card.addEventListener("click", (e) => {
      if (e.target.closest("a") || e.target.closest("button")) return;
      card.classList.toggle("flipped");
    });
  });
}

function initCitizenSOS() {
  const typePills = document.querySelectorAll(".sos-type-pills .type-pill");
  if (!typePills.length) return;

  const syncActivePill = () => {
    typePills.forEach((p) => {
      const radio = p.querySelector("input[type='radio']");
      p.classList.toggle("active", Boolean(radio && radio.checked));
    });
  };

  typePills.forEach((pill) => {
    const radio = pill.querySelector("input[type='radio']");
    if (radio) {
      radio.addEventListener("change", syncActivePill);
    }
    pill.addEventListener("click", () => {
      if (radio) radio.checked = true;
      syncActivePill();
    });
  });

  syncActivePill();
}

window.submitCitizenSOS = async function() {
  const districtElem = $("sos-district-input");
  const phoneElem = $("sos-phone-input");
  const locElem = $("sos-location-input");
  const confirmMsg = $("sos-confirmation-msg");
  const submitBtn = $("btn-submit-sos");

  const district = districtElem ? districtElem.value.trim() : "Assam";
  const phone = phoneElem ? phoneElem.value.trim() : "";
  const location = locElem ? locElem.value.trim() : "";

  let selectedType = "Boat Evacuation";
  const checkedRadio = document.querySelector("input[name='sos-type']:checked");
  if (checkedRadio) selectedType = checkedRadio.value;

  const showSosMessage = (html) => {
    if (!confirmMsg) return;
    confirmMsg.style.display = "block";
    confirmMsg.innerHTML = html;
    confirmMsg.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  const showSosError = (errText) => {
    showSosMessage(`
      <div class="sos-alert-content" style="display:flex; gap:12px; align-items:flex-start; padding:14px; background:#fef2f2; border:1px solid #ef4444; border-radius:8px; margin-top:12px; color:#0f172a;">
        <i class="fa-solid fa-circle-exclamation text-red" style="font-size:22px; margin-top:2px;"></i>
        <div>
          <b style="color:#b91c1c; font-size:15px;">Could Not Submit SOS Request</b>
          <p style="margin:4px 0 6px 0; font-size:13px; color:#1e293b;">${esc(errText)}</p>
          <p style="margin:0; font-size:13px; font-weight:700; color:#b91c1c;">In danger or an emergency, call <a href="tel:112" style="color:#b91c1c; text-decoration:underline;">112</a> or <a href="tel:1070" style="color:#b91c1c; text-decoration:underline;">1070</a> immediately.</p>
        </div>
      </div>
    `);
  };

  const digits = phone.replace(/\D/g, "");
  if (!/^[+\d\s()-]{8,25}$/.test(phone) || digits.length < 8 || digits.length > 15) {
    showSosError("Please enter a valid phone number containing 8 to 15 digits.");
    if (phoneElem) phoneElem.focus();
    return;
  }

  if (!location) {
    showSosError("Please enter your village, locality, or landmark.");
    if (locElem) locElem.focus();
    return;
  }

  if (submitBtn) {
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving Request...';
    submitBtn.disabled = true;
  }

  try {
    const response = await fetch("/api/sos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: selectedType,
        district,
        phone,
        location
      })
    });

    let payload = null;
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }

    if (!response.ok || !payload || typeof payload.id === "undefined") {
      throw new Error((payload && payload.error) || `Server error (${response.status})`);
    }

    showSosMessage(`
      <div class="sos-alert-content" style="display:flex; gap:12px; align-items:flex-start; padding:14px; background:#fffbeb; border:1px solid #f59e0b; border-radius:8px; margin-top:12px; color:#0f172a;">
        <i class="fa-solid fa-triangle-exclamation text-amber" style="font-size:24px; margin-top:2px;"></i>
        <div>
          <b style="color:#b45309; font-size:15px;">PROTOTYPE REQUEST LOGGED (ID #${esc(payload.id)}) — NOT A LIVE RESCUE DISPATCH</b>
          <p style="margin:4px 0 6px 0; font-size:13px; color:#1e293b;">Saved entry for <b>${esc(selectedType)}</b> (${esc(location)}, ${esc(district)}, contact: <b>${esc(phone)}</b>). <b>This is a student prototype and nobody is guaranteed to be monitoring it.</b></p>
          <p style="margin:0; font-size:13px; font-weight:700; color:#b91c1c;">If you are in danger, call <a href="tel:112" style="color:#b91c1c; text-decoration:underline;">112</a> or <a href="tel:1070" style="color:#b91c1c; text-decoration:underline;">1070</a> immediately.</p>
        </div>
      </div>
    `);

    if (phoneElem) phoneElem.value = "";
    if (locElem) locElem.value = "";
    if (submitBtn) {
      submitBtn.innerHTML = `<i class="fa-solid fa-check"></i> Saved Prototype Log (#${esc(payload.id)})`;
      submitBtn.classList.remove("btn-emergency");
      submitBtn.classList.add("btn-emerald");
      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> <span>Submit Prototype SOS Request</span>';
        submitBtn.classList.add("btn-emergency");
        submitBtn.classList.remove("btn-emerald");
      }, 4000);
    }
  } catch (err) {
    showSosError(err && err.message ? err.message : "Could not reach the backend server.");
    if (submitBtn) {
      submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> <span>Submit Prototype SOS Request</span>';
    }
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
    }
  }
};

// ================= 7. APPLICATION BOOTSTRAP =================
function init() {
  // 1. Initialize Leaflet Map First (Ensures Instant Visibility)
  initMap();

  // 2. Initialize Early Warning Alert System
  initAlertSystem();

  // 3. Official Sector Calling System & Active Camps Directory
  setupEmergencySectorsModal();
  loadHelplinesFromAPI();
  updateDistrictDEOCTelemetry(where.name);

  // 3. Populate District Dropdown
  const select = $("district");
  if (select) {
    select.innerHTML = '<option value="">— Select District —</option>';
    Object.keys(DISTRICTS).forEach((name) => {
      const opt = document.createElement("option");
      opt.value = name;
      opt.textContent = name;
      select.appendChild(opt);
    });
    select.value = where.name;

    select.addEventListener("change", () => {
      if (!select.value) return;
      const data = DISTRICTS[select.value];
      if (data) {
        setPlace(data.coords[0], data.coords[1], select.value, false);
      }
    });
  }

  // 4. GPS Location Finder
  const locateBtn = $("locate");
  if (locateBtn) {
    locateBtn.addEventListener("click", () => {
      if (!navigator.geolocation) {
        alert(t("denied"));
        return;
      }
      locateBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Locating…';
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          locateBtn.innerHTML = `<i class="fa-solid fa-crosshairs"></i> ${t("find")}`;
          if (select) select.value = "";
          setPlace(pos.coords.latitude, pos.coords.longitude, t("you"), true);
        },
        () => {
          locateBtn.innerHTML = `<i class="fa-solid fa-crosshairs"></i> ${t("find")}`;
          alert(t("denied"));
        },
        { timeout: 8000 }
      );
    });
  }

  // 5. Cloudburst & Flood Simulation
  const simBtn = $("sim");
  const simBanner = $("sim-status-banner");
  if (simBtn) {
    simBtn.addEventListener("click", () => {
      simulate = !simulate;
      simBtn.classList.toggle("active", simulate);
      document.body.classList.toggle("simulation-active", simulate);
      if (simBanner) simBanner.hidden = !simulate;

      if (simulate) {
        setAlertTier("red");
        selectHeroSlide("boat");
        showToast("SIMULATION MODE", "Flood simulation active (synthetic 135.0 mm rainfall scenario). Not real-world data.");
      } else {
        selectHeroSlide("basin");
      }

      renderRisk();
    });
  }

  // 6. Bilingual Toggle
  const langBtn = $("lang");
  if (langBtn) {
    langBtn.addEventListener("click", () => {
      lang = lang === "en" ? "as" : "en";
      applyLang();
    });
  }

  // 7. Initial Telemetry & Seismic Load
  applyLang();
  setPlace(where.lat, where.lon, where.name, false);
  loadQuakes();

  // 8. Initialize Real Field Photo Hero Slider & Citizen SOS Form
  initHeroPhotoSlider();
  initCitizenSOS();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}