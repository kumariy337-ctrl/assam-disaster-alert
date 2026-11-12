require('dotenv').config();

const crypto = require('crypto');
const path = require('path');
const express = require('express');
const rateLimit = require('express-rate-limit');
const Database = require('better-sqlite3');

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || '127.0.0.1';
const DB_PATH = path.join(__dirname, 'data.db');

// Initialize SQLite database (created automatically on first run)
const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS sos_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    district TEXT NOT NULL,
    phone TEXT NOT NULL,
    location TEXT NOT NULL,
    created_at TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new'
  );

  CREATE TABLE IF NOT EXISTS helplines (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    label TEXT NOT NULL,
    number TEXT NOT NULL,
    category TEXT NOT NULL,
    source_url TEXT,
    verified INTEGER NOT NULL DEFAULT 0,
    last_verified TEXT
  );
`);

const SEED_HELPLINES = [
  { label: 'National Emergency Unified Helpline', number: '112', category: 'national', source_url: 'https://www.india.gov.in', verified: 1, last_verified: '2026-11-12' },
  { label: 'Police Emergency Helpline', number: '100', category: 'national', source_url: 'https://www.india.gov.in', verified: 1, last_verified: '2026-11-12' },
  { label: 'Fire & Emergency Helpline', number: '101', category: 'national', source_url: 'https://www.india.gov.in', verified: 1, last_verified: '2026-11-12' },
  { label: 'Emergency Ambulance (108)', number: '108', category: 'national', source_url: 'https://asdma.gov.in', verified: 1, last_verified: '2026-11-12' },
  { label: 'Women Helpline', number: '1091', category: 'national', source_url: 'https://www.india.gov.in', verified: 1, last_verified: '2026-11-12' },
  { label: 'Child Helpline', number: '1098', category: 'national', source_url: 'https://www.india.gov.in', verified: 1, last_verified: '2026-11-12' },
  { label: 'NHAI Highway Emergency Helpline', number: '1033', category: 'national', source_url: 'https://nhai.gov.in', verified: 1, last_verified: '2026-11-12' },
  { label: 'Indian Railways Helpline', number: '139', category: 'national', source_url: 'https://www.india.gov.in', verified: 1, last_verified: '2026-11-12' },
  { label: 'Assam State Emergency Operation Centre (SEOC)', number: '1070', category: 'state', source_url: 'https://asdma.gov.in', verified: 1, last_verified: '2026-11-12' },
  { label: 'Assam Alternate State Emergency Helpline', number: '1079', category: 'state', source_url: 'https://assam.gov.in', verified: 1, last_verified: '2026-11-12' },
  { label: 'District Emergency Operation Centre (DEOC Toll-Free)', number: '1077', category: 'state', source_url: 'https://asdma.gov.in', verified: 1, last_verified: '2026-11-12' },
  { label: 'ASDMA Dispur Head Office Landline', number: '0361-2237221', category: 'state', source_url: 'https://assam.gov.in', verified: 1, last_verified: '2026-11-12' },
  { label: '1st Bn NDRF Patgaon (Guwahati)', number: '0361-2840027', category: 'state', source_url: 'https://ndrf.gov.in', verified: 1, last_verified: '2026-11-12' },
  { label: 'Assam Health Information Helpline (104)', number: '104', category: 'state', source_url: 'https://assam.gov.in', verified: 1, last_verified: '2026-11-12' },
  { label: 'APDCL Electricity Fault & Hazard Helpline', number: '1912', category: 'state', source_url: 'https://www.apdcl.org', verified: 1, last_verified: '2026-11-12' },
  { label: 'Mobile Veterinary / Livestock Helpline', number: '1962', category: 'state', source_url: 'https://emri.in', verified: 1, last_verified: '2026-11-12' },
  { label: 'NFSA Ration Card / PDS Grievance Helpdesk', number: '1967', category: 'state', source_url: 'https://nfsa.gov.in', verified: 1, last_verified: '2026-11-12' },
  { label: 'GMCH Emergency Helpline (Guwahati)', number: '0361-2529457', category: 'state', source_url: 'https://gmchassam.gov.in', verified: 1, last_verified: '2026-11-12' },
  { label: 'Panbazar Fire Brigade (Guwahati)', number: '0361-2540222', category: 'state', source_url: 'https://assam.gov.in', verified: 1, last_verified: '2026-11-12' },
  { label: 'Assam Women Distress Helpline', number: '0361-2521242', category: 'state', source_url: 'https://assam.gov.in', verified: 1, last_verified: '2026-11-12' },
  { label: 'Kaziranga Control Room / CWRC Wildlife Rescue', number: '03776-268007', category: 'state', source_url: 'https://www.wti.org.in', verified: 1, last_verified: '2026-11-12' },
  { label: 'Kamrup Metro DEOC', number: '0361-2733052', category: 'district', source_url: 'https://assam.gov.in', verified: 1, last_verified: '2026-11-12' },
  { label: 'Dibrugarh DEOC', number: '0373-2312940', category: 'district', source_url: 'https://assam.gov.in', verified: 1, last_verified: '2026-11-12' },
  { label: 'Dhubri DEOC', number: '03662-230050', category: 'district', source_url: 'https://assam.gov.in', verified: 1, last_verified: '2026-11-12' },
  { label: 'Sonitpur (Tezpur) DEOC', number: '03712-220011', category: 'district', source_url: 'https://assam.gov.in', verified: 1, last_verified: '2026-11-12' },
  { label: 'Cachar (Silchar) DEOC', number: '03842-239249', category: 'district', source_url: 'https://assam.gov.in', verified: 1, last_verified: '2026-11-12' },
  { label: 'Nagaon DEOC', number: '03672-233815', category: 'district', source_url: 'https://assam.gov.in', verified: 1, last_verified: '2026-11-12' },
  { label: 'Tinsukia DEOC', number: '0374-2331572', category: 'district', source_url: 'https://assam.gov.in', verified: 1, last_verified: '2026-11-12' },
  { label: 'Jorhat DEOC', number: '0376-2320020', category: 'district', source_url: 'https://assam.gov.in', verified: 1, last_verified: '2026-11-12' },
  { label: 'Oxfam India', number: '011-46538000', category: 'ngo', source_url: 'https://www.oxfamindia.org', verified: 1, last_verified: '2026-11-12' },
  { label: 'Goonj Head Office', number: '011-26972351', category: 'ngo', source_url: 'https://goonj.org', verified: 1, last_verified: '2026-11-12' },
  { label: 'UNICEF Assam Field Office', number: '0361-2227181', category: 'ngo', source_url: 'https://www.unicef.org', verified: 1, last_verified: '2026-11-12' },
  { label: 'Doctors Without Borders (MSF India)', number: '011-47703400', category: 'ngo', source_url: 'https://www.msfsouthasia.org', verified: 1, last_verified: '2026-11-12' },
  { label: 'SEEDS India', number: '011-20904048', category: 'ngo', source_url: 'https://seedsindia.org', verified: 1, last_verified: '2026-11-12' },
  { label: 'Rapid Response India', number: '9551221199', category: 'ngo', source_url: 'https://www.rapidresponse.org.in', verified: 1, last_verified: '2026-11-12' }
];

const helplineCount = db.prepare('SELECT COUNT(*) AS count FROM helplines').get().count;
if (helplineCount === 0) {
  const insertHelpline = db.prepare(`
    INSERT INTO helplines (label, number, category, source_url, verified, last_verified)
    VALUES (@label, @number, @category, @source_url, @verified, @last_verified)
  `);
  const seedMany = db.transaction((items) => {
    for (const item of items) insertHelpline.run(item);
  });
  seedMany(SEED_HELPLINES);
}

const insertSosStmt = db.prepare(`
  INSERT INTO sos_requests (type, district, phone, location, created_at, status)
  VALUES (?, ?, ?, ?, ?, 'new')
`);
const listHelplinesStmt = db.prepare(`
  SELECT id, label, number, category, source_url, verified, last_verified
  FROM helplines
  ORDER BY id ASC
`);
const listSosStmt = db.prepare(`
  SELECT id, type, district, phone, location, created_at, status
  FROM sos_requests
  ORDER BY id DESC
  LIMIT 200
`);

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[ch]));
}

function timingSafePasswordMatch(provided, expected) {
  const hashA = crypto.createHash('sha256').update(String(provided), 'utf8').digest();
  const hashB = crypto.createHash('sha256').update(String(expected), 'utf8').digest();
  return crypto.timingSafeEqual(hashA, hashB);
}

function requireBasicAuth(req, res, next) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword || !adminPassword.trim()) {
    return res.status(503).type('text/plain').send('Admin endpoint disabled: ADMIN_PASSWORD is not configured in .env.');
  }

  const header = req.headers.authorization || '';
  if (!header.startsWith('Basic ')) {
    res.set('WWW-Authenticate', 'Basic realm="Assam Disaster Alert Admin"');
    return res.status(401).type('text/plain').send('Authentication required.');
  }

  const decoded = Buffer.from(header.slice(6), 'base64').toString('utf8');
  const sepIndex = decoded.indexOf(':');
  if (sepIndex === -1) {
    res.set('WWW-Authenticate', 'Basic realm="Assam Disaster Alert Admin"');
    return res.status(401).type('text/plain').send('Invalid credentials.');
  }

  const password = decoded.slice(sepIndex + 1);
  if (!timingSafePasswordMatch(password, adminPassword)) {
    res.set('WWW-Authenticate', 'Basic realm="Assam Disaster Alert Admin"');
    return res.status(401).type('text/plain').send('Invalid credentials.');
  }

  return next();
}

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '16kb' }));

// Block direct HTTP access to server files, database files, and dotfiles
app.use((req, res, next) => {
  const p = req.path.toLowerCase();
  if (
    p.startsWith('/.') ||
    p.startsWith('/node_modules') ||
    p.endsWith('.db') ||
    p.endsWith('.db-wal') ||
    p.endsWith('.db-shm') ||
    p === '/local_server.js' ||
    p === '/package.json' ||
    p === '/package-lock.json'
  ) {
    return res.status(404).type('text/plain').send('404 Not Found');
  }
  return next();
});

const sosRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    res.status(429).json({
      error: 'Too many SOS requests from this IP (limit: 5 per 10 minutes). If you are in danger, call 112 immediately.'
    });
  }
});

app.post('/api/sos', sosRateLimiter, (req, res) => {
  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const type = typeof body.type === 'string' ? body.type.trim() : '';
  const district = typeof body.district === 'string' ? body.district.trim() : '';
  const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
  const location = typeof body.location === 'string' ? body.location.trim() : '';

  if (!type || type.length > 80) {
    return res.status(400).json({ error: 'Emergency type is required (max 80 characters).' });
  }
  if (!district || district.length > 80) {
    return res.status(400).json({ error: 'District is required (max 80 characters).' });
  }
  if (!location || location.length > 250) {
    return res.status(400).json({ error: 'Location/landmark is required (max 250 characters).' });
  }

  const digits = phone.replace(/\D/g, '');
  if (!/^[+\d\s()-]{8,25}$/.test(phone) || digits.length < 8 || digits.length > 15) {
    return res.status(400).json({ error: 'Phone number must contain 8 to 15 digits.' });
  }

  const createdAt = new Date().toISOString();
  const result = insertSosStmt.run(type, district, phone, location, createdAt);
  return res.status(201).json({ id: Number(result.lastInsertRowid) });
});

app.get('/api/helplines', (_req, res) => {
  const rows = listHelplinesStmt.all();
  res.json(rows);
});

app.get('/admin/sos', requireBasicAuth, (_req, res) => {
  const rows = listSosStmt.all();
  const tableRows = rows.length
    ? rows.map((row) => `
        <tr>
          <td>${escapeHtml(row.id)}</td>
          <td>${escapeHtml(row.type)}</td>
          <td>${escapeHtml(row.district)}</td>
          <td>${escapeHtml(row.phone)}</td>
          <td>${escapeHtml(row.location)}</td>
          <td>${escapeHtml(row.status)}</td>
          <td>${escapeHtml(row.created_at)}</td>
        </tr>`).join('')
    : '<tr><td colspan="7" style="text-align:center;color:#64748b;">No SOS submissions logged yet.</td></tr>';

  res.type('text/html; charset=utf-8').send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SOS Requests Log — Assam Disaster Alert (Prototype)</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; margin: 24px; background: #f8fafc; color: #0f172a; }
    h1 { font-size: 20px; margin-bottom: 6px; }
    p { font-size: 13px; color: #475569; margin-bottom: 16px; }
    table { width: 100%; border-collapse: collapse; background: #fff; border: 1px solid #cbd5e1; font-size: 13px; }
    th, td { padding: 10px 12px; border-bottom: 1px solid #e2e8f0; text-align: left; }
    th { background: #f1f5f9; font-weight: 600; }
  </style>
</head>
<body>
  <h1>Prototype SOS Submissions Log</h1>
  <p>Student prototype database log (<code>data.db</code>). Total shown: ${rows.length}. Not an official emergency dispatch desk.</p>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Emergency Type</th>
        <th>District</th>
        <th>Phone</th>
        <th>Location</th>
        <th>Status</th>
        <th>Created At (UTC)</th>
      </tr>
    </thead>
    <tbody>${tableRows}</tbody>
  </table>
</body>
</html>`);
});

app.use(express.static(__dirname, { dotfiles: 'ignore' }));

app.listen(PORT, HOST, () => {
  console.log(`Assam Disaster Alert server listening on http://${HOST}:${PORT}`);
});
