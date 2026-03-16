/* ─────────────────────────────────────────────────────────────────
   ASCII Banner Generator
   Canvas: 1584 × 396 px  |  5 Themes
───────────────────────────────────────────────────────────────── */

const canvas    = document.getElementById('bannerCanvas');
const ctx       = canvas.getContext('2d');
const offCanvas = document.getElementById('offscreenCanvas');
const offCtx    = offCanvas.getContext('2d', { willReadFrequently: true });

const FORMATS = {
  linkedin: { label: 'LinkedIn',  w: 1584, h: 396  },
  twitter:  { label: 'Twitter/X', w: 1500, h: 500  },
  facebook: { label: 'Facebook',  w: 851,  h: 315  },
  youtube:  { label: 'YouTube',   w: 2560, h: 1440 },
};
let W = 1584;
let H = 396;

// ── DPI scale (mutable — changed by the quality buttons) ─────────
let SCALE = 2;
let fontsLoaded = false;

function resizeCanvas() {
  canvas.width        = W * SCALE;
  canvas.height       = H * SCALE;
  canvas.style.width  = W + 'px';
  canvas.style.height = H + 'px';
  document.getElementById('exportNote').textContent =
    `${SCALE}× · ${W * SCALE} × ${H * SCALE} px`;
}

function applyScale(s) {
  SCALE = s;
  resizeCanvas();
  if (fontsLoaded) render();
}

function applyFormat(formatKey) {
  const fmt = FORMATS[formatKey];
  if (!fmt) return;
  state.format = formatKey;
  W = fmt.w;
  H = fmt.h;
  resizeCanvas();
  document.querySelector('.brand-sub').textContent =
    `ASCII Edition — ${fmt.label}  ${W} × ${H} px`;
  document.getElementById('taglineText').setAttribute(
    'maxlength', Math.round(52 * (W / 1584))
  );
  if (fontsLoaded) render();
}

applyScale(SCALE);  // initial setup

// ── Palette (bg & ink are overridden from state at render time) ───
const C = {
  bg:       '#f4f2eb',
  ink:      '#1c1b18',
  inkMid:   '#4a4740',
  inkDim:   '#8a8780',
  inkFaint: 'rgba(28,27,24,0.18)',
  accent:   '#c86440',
  asciiChar:'#1c1b18',
};

function withAlpha(hex, a) {
  const r = parseInt(hex.slice(1,3), 16);
  const g = parseInt(hex.slice(3,5), 16);
  const b = parseInt(hex.slice(5,7), 16);
  return `rgba(${r},${g},${b},${a})`;
}

// ── State ─────────────────────────────────────────────────────────
const state = {
  theme:          'chart',
  format:         'linkedin',
  brand:          '',
  tagline:        '',
  align:          'left',
  seed:           42,
  bgColor:        '#f4f2eb',
  inkColor:       '#1c1b18',
  accentColor:    '#c86440',
  asciiCharColor: '#1c1b18',
  tagPos:         'default',
  mapSide:        'right',
  bannerShape:    'airplane',
  ticker:         '',
  tickerData:     null,
  tickerSymbol:   '',
  asciiImageData: null,
  asciiOffsetX:   0,
  asciiOffsetY:   0,
  tickerSource:   '',
  brandFont:      'serif',
};

// ── PRNG ──────────────────────────────────────────────────────────
function makePRNG(seed) {
  let s = seed | 0;
  return () => {
    s |= 0; s = s + 0x6D2B79F5 | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = t + Math.imul(t ^ (t >>> 7), 61 | t) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 0xFFFFFFFF;
  };
}

// ── Font metrics ──────────────────────────────────────────────────
const MONO_SIZE = 12;
const LINE_H    = MONO_SIZE * 1.22;
let   CHAR_W    = 7.2;

const fontsReady = Promise.all([
  document.fonts.load('700 60px "Playfair Display"'),
  document.fonts.load('500 20px "Inter"'),
  document.fonts.load('400 12px "JetBrains Mono"'),
  document.fonts.load('500 20px "JetBrains Mono"'),
]);

// ─────────────────────────────────────────────────────────────────
// DRAWING HELPERS
// ─────────────────────────────────────────────────────────────────

function measureCharW() {
  ctx.save();
  ctx.font = `400 ${MONO_SIZE}px "JetBrains Mono", monospace`;
  CHAR_W   = ctx.measureText('M').width;
  ctx.restore();
}

function monoFont(sz = MONO_SIZE) {
  return `400 ${sz}px "JetBrains Mono", monospace`;
}

function getBrandFont(sz) {
  switch (state.brandFont) {
    case 'sans': return `700 ${sz}px "Inter", sans-serif`;
    case 'mono': return `500 ${sz}px "JetBrains Mono", monospace`;
    default:     return `700 ${sz}px "Playfair Display", Georgia, serif`;
  }
}

function fillBg() {
  ctx.fillStyle = C.bg;
  ctx.fillRect(0, 0, W, H);
}

function drawLines(lines, x, y, color = C.ink, alpha = 1, sz = MONO_SIZE) {
  if (!lines.length) return;
  ctx.save();
  ctx.font         = monoFont(sz);
  ctx.textBaseline = 'top';
  ctx.textAlign    = 'left';
  ctx.fillStyle    = color;
  ctx.globalAlpha  = alpha;
  const lh = sz * 1.22;
  lines.forEach((l, i) => ctx.fillText(l, x, y + i * lh));
  ctx.restore();
}

function dotMatrix(rng, x0 = 0, y0 = 0, x1 = W, y1 = H, density = 0.13) {
  ctx.save();
  ctx.font         = monoFont();
  ctx.textBaseline = 'top';
  ctx.textAlign    = 'left';
  for (let y = y0; y < y1; y += LINE_H) {
    for (let x = x0; x < x1; x += CHAR_W) {
      if (rng() > density) continue;
      ctx.fillStyle   = C.inkFaint;
      ctx.globalAlpha = 0.55 + rng() * 0.55;
      ctx.fillText(rng() > 0.55 ? '.' : '+', x, y);
    }
  }
  ctx.restore();
}

function drawBrand(text, x, y, sz, align = 'left') {
  if (!text) return;
  ctx.save();
  if (align === 'right' || align === 'center') {
    ctx.beginPath();
    ctx.rect(0, 0, W, H);
    ctx.clip();
  }
  ctx.font         = getBrandFont(sz);
  ctx.textBaseline = 'alphabetic';
  ctx.textAlign    = align;
  ctx.fillStyle    = withAlpha(C.ink, 0.08);
  ctx.fillText(text, x + 2, y + 3);
  ctx.fillStyle   = C.ink;
  ctx.globalAlpha = 0.95;
  ctx.fillText(text, x, y);
  ctx.restore();
}

function drawTaglineText(text, x, y, align = 'left', sz = 17, color = C.accent) {
  if (!text) return;
  ctx.save();
  ctx.font         = `500 ${sz}px "Inter", sans-serif`;
  ctx.textBaseline = 'alphabetic';
  ctx.textAlign    = align;
  ctx.fillStyle    = color;
  ctx.fillText(text, x, y);
  ctx.restore();
}

/** Draws the tagline at a fixed canvas position if state.tagPos !== 'default'. */
function renderTaglineOverlay() {
  if (state.tagPos === 'default' || !state.tagline) return;
  const m = 20;
  let x, y, align;
  switch (state.tagPos) {
    case 'tl': x = m;     y = m + 22;    align = 'left';   break;
    case 'tc': x = W / 2; y = m + 22;    align = 'center'; break;
    case 'tr': x = W - m; y = m + 22;    align = 'right';  break;
    case 'bl': x = m;     y = H - m;     align = 'left';   break;
    case 'bc': x = W / 2; y = H - m;     align = 'center'; break;
    case 'br': x = W - m; y = H - m;     align = 'right';  break;
    default: return;
  }
  drawTaglineText(state.tagline, x, y, align, 17, C.accent);
}

function textX(align, leftDefault, rightMargin = 52) {
  if (align === 'center') return W / 2;
  if (align === 'right')  return W - rightMargin;
  return leftDefault;
}

// ─────────────────────────────────────────────────────────────────
// THEME 1 — THE CHART  (volatile + optional live data)
// ─────────────────────────────────────────────────────────────────

// CoinGecko ID map for known crypto tickers
const COINGECKO = {
  BTC:'bitcoin', ETH:'ethereum', SOL:'solana', BNB:'binancecoin',
  ADA:'cardano', DOT:'polkadot', AVAX:'avalanche-2', MATIC:'matic-network',
  LINK:'chainlink', DOGE:'dogecoin', XRP:'ripple', LTC:'litecoin',
  ATOM:'cosmos', UNI:'uniswap', AAVE:'aave', NEAR:'near', FTM:'fantom',
  SHIB:'shiba-inu', PEPE:'pepe', ARB:'arbitrum', OP:'optimism',
};

let tickerDebounce = null;

function setTickerStatus(s) {
  const el = document.getElementById('tickerStatus');
  if (el) el.textContent = s;
}

async function fetchStockYahoo(symbol) {
  const controller = new AbortController();
  const timeoutId  = setTimeout(() => controller.abort(), 6000);
  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?range=1mo&interval=1d&events=none`;
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!res.ok) throw new Error('http');
    const json   = await res.json();
    const closes = json.chart.result[0].indicators.quote[0].close.filter(v => v != null);
    if (closes.length < 2) throw new Error('empty');
    state.tickerData   = closes;
    state.tickerSymbol = symbol;
    state.tickerSource = 'live';
    setTickerStatus('✓');
  } catch {
    clearTimeout(timeoutId);
    // Seeded mock: deterministic per symbol, realistic price range
    const rng  = makePRNG(symbolHash(symbol));
    const base = 50 + (symbolHash(symbol) % 1950);   // $50–$2000
    state.tickerData   = genVolatileChart(rng, 31).map(v => base * (0.70 + v * 0.60));
    state.tickerSymbol = symbol;
    state.tickerSource = 'mock';
    setTickerStatus('~');
  }
}

async function fetchTicker(symbol) {
  const sym = symbol.toUpperCase();
  const id  = COINGECKO[sym];
  setTickerStatus('…');
  if (id) {
    // ── Crypto path (CoinGecko) ──────────────────────
    try {
      const controller = new AbortController();
      const timeoutId  = setTimeout(() => controller.abort(), 7000);
      let res;
      try {
        res = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30&interval=daily`,
          { signal: controller.signal }
        );
      } finally { clearTimeout(timeoutId); }
      if (!res.ok) throw new Error();
      const json = await res.json();
      state.tickerData   = json.prices.map(([, p]) => p);
      state.tickerSymbol = sym;
      state.tickerSource = 'live';
      setTickerStatus('✓');
    } catch {
      state.tickerData   = null;
      state.tickerSource = '';
      setTickerStatus('✗');
    }
  } else {
    // ── Stock path (Yahoo Finance + mock fallback) ────
    await fetchStockYahoo(sym);
  }
  if (state.theme === 'chart') render();
}

function symbolHash(sym) {
  let h = 0;
  for (let i = 0; i < sym.length; i++) h = (h * 31 + sym.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/** Volatile procedural chart — momentum + random shocks */
function genVolatileChart(rng, n) {
  const v = [0.45];
  let trend = 0;
  for (let i = 1; i < n; i++) {
    trend = trend * 0.80 + (rng() - 0.48) * 0.045;
    const shock = rng() > 0.93 ? (rng() > 0.5 ? 1 : -1) * rng() * 0.12 : 0;
    v.push(Math.max(0.04, Math.min(0.95, v[i-1] + trend + shock + (rng()-0.5)*0.018)));
  }
  // Minimal 2-point smoothing only
  return v.map((_, i, a) => {
    const lo = Math.max(0, i-1), hi = Math.min(a.length-1, i+1);
    return (a[lo] + a[i] + a[hi]) / 3;
  });
}

/** Returns normalised chart values [0,1] — live data or procedural. */
function getChartVals(rng, cols) {
  if (state.tickerData && state.tickerData.length > 1) {
    const p   = state.tickerData;
    const min = Math.min(...p), max = Math.max(...p), range = max - min || 1;
    const norm = p.map(v => 0.05 + (v - min) / range * 0.90);
    return Array.from({ length: cols }, (_, c) => {
      const t  = c / (cols - 1) * (norm.length - 1);
      const lo = Math.floor(t), hi = Math.min(norm.length - 1, Math.ceil(t));
      return norm[lo] + (norm[hi] - norm[lo]) * (t - lo);
    });
  }
  return genVolatileChart(rng, cols);
}

function formatPrice(p) {
  if (p >= 1e6) return `${(p/1e6).toFixed(2)}M`;
  if (p >= 1000) return `${(p/1000).toFixed(1)}k`;
  if (p >= 100)  return p.toFixed(0);
  return p.toFixed(2);
}

function renderChart(rng) {
  const lm = Math.round(CHAR_W * 10);
  const tm = 90;
  const bm = Math.round(LINE_H * 3.5);
  const rm = Math.round(CHAR_W * 3);
  const cX = lm, cY = tm;
  const cW = W - lm - rm;
  const cH = H - tm - bm;
  const cols = Math.floor(cW / CHAR_W);
  const rows = Math.floor(cH / LINE_H);

  dotMatrix(rng, 0, 0, W, tm + cH * 0.35, 0.10);

  const vals = getChartVals(rng, cols);
  const dRow = vals.map(v => Math.min(rows - 1, Math.max(0, Math.round((1 - v) * rows))));

  // Real price range for Y labels
  let priceMin = 0, priceMax = 1;
  if (state.tickerData && state.tickerData.length > 1) {
    priceMin = Math.min(...state.tickerData);
    priceMax = Math.max(...state.tickerData);
  }

  // Area fill
  ctx.save();
  ctx.font        = monoFont();
  ctx.textBaseline = 'top';
  ctx.textAlign   = 'left';
  const fill = ['#','#','+','+','.'];
  for (let c = 0; c < cols; c++) {
    const lr = dRow[c];
    for (let r = lr + 1; r < rows; r++) {
      const d  = (r - lr) / Math.max(1, rows - lr);
      const fi = Math.min(fill.length - 1, Math.floor(d * fill.length));
      ctx.fillStyle   = C.inkMid;
      ctx.globalAlpha = fi < 2 ? 0.30 : fi < 4 ? 0.16 : 0.07;
      ctx.fillText(fill[fi], cX + c * CHAR_W, cY + r * LINE_H);
    }
  }
  ctx.restore();

  // Data line
  ctx.save();
  ctx.font        = monoFont();
  ctx.textBaseline = 'top';
  ctx.textAlign   = 'left';
  ctx.fillStyle   = C.asciiChar;
  ctx.globalAlpha = 0.88;
  for (let c = 0; c < cols; c++) {
    const r    = dRow[c];
    const prev = c > 0        ? dRow[c-1] : r;
    const next = c < cols - 1 ? dRow[c+1] : r;
    let ch;
    if      (r < prev && r < next) ch = '^';
    else if (r > prev && r > next) ch = 'v';
    else if (prev > r)             ch = '/';
    else if (prev < r)             ch = '\\';
    else                           ch = '_';
    ctx.fillText(ch, cX + c * CHAR_W, cY + r * LINE_H);
  }
  ctx.restore();

  // Y-axis
  ctx.save();
  ctx.font        = monoFont(MONO_SIZE * 0.85);
  ctx.textBaseline = 'top';
  ctx.fillStyle   = C.inkDim;
  ctx.globalAlpha = 0.50;
  for (let r = 0; r <= rows; r += 4) {
    const pct   = 1 - r / rows;
    const label = state.tickerData
      ? formatPrice(priceMin + pct * (priceMax - priceMin))
      : pct.toFixed(2);
    ctx.fillText(`${label} |`, 0, cY + r * LINE_H);
  }
  ctx.fillStyle   = C.ink;
  ctx.globalAlpha = 0.30;
  ctx.fillText('_'.repeat(cols + 3), cX - CHAR_W, cY + rows * LINE_H);
  ctx.fillText('TIME →', cX + cW - CHAR_W * 6, cY + rows * LINE_H + LINE_H * 0.4);
  ctx.restore();

  // Peak labels
  ctx.save();
  ctx.font        = monoFont(MONO_SIZE * 0.80);
  ctx.textBaseline = 'bottom';
  ctx.fillStyle   = C.accent;
  ctx.globalAlpha = 0.80;
  for (let c = 4; c < cols - 4; c++) {
    if (dRow[c] < dRow[c-1] && dRow[c] < dRow[c+1]) {
      const pct   = 1 - dRow[c] / rows;
      const label = state.tickerData
        ? formatPrice(priceMin + pct * (priceMax - priceMin))
        : (85 + vals[c] * 160).toFixed(0);
      ctx.fillText(label, cX + c * CHAR_W - CHAR_W * 1.5, cY + dRow[c] * LINE_H);
    }
  }
  ctx.restore();

  // Volume strip
  ctx.save();
  ctx.font        = monoFont(MONO_SIZE * 0.72);
  ctx.textBaseline = 'top';
  const volY = cY + rows * LINE_H + LINE_H * 0.2;
  for (let c = 0; c < cols; c += 4) {
    ctx.fillStyle   = vals[c] > 0.5 ? C.accent : C.inkDim;
    ctx.globalAlpha = 0.25;
    ctx.fillText('|', cX + c * CHAR_W, volY);
  }
  ctx.restore();

  // Ticker label
  if (state.tickerSymbol) {
    ctx.save();
    ctx.font        = monoFont(MONO_SIZE * 0.88);
    ctx.textBaseline = 'top';
    ctx.fillStyle   = C.accent;
    ctx.globalAlpha = 0.70;
    ctx.fillText(`${state.tickerSymbol} / USD  30D`, cX + CHAR_W, cY + LINE_H * 0.3);
    ctx.restore();
  }

  // Brand + tagline in upper zone
  const align   = state.align;
  const tx      = textX(align, cX + 8);
  const brandSz = Math.round(H * 0.145);
  drawBrand(state.brand, tx, Math.max(brandSz * 0.88, tm * 0.7), brandSz, align);
  if (state.tagPos === 'default')
    drawTaglineText(state.tagline, tx, tm - 10, align, 16);
}

// ─────────────────────────────────────────────────────────────────
// THEME 2 — THE MAP
// ─────────────────────────────────────────────────────────────────

const CONTINENTS = {
  NAmerica: [[0.03,0.08],[0.11,0.04],[0.20,0.06],[0.27,0.14],[0.27,0.34],[0.22,0.50],[0.14,0.56],[0.06,0.50],[0.02,0.34],[0.02,0.16]],
  SAmerica: [[0.12,0.50],[0.22,0.45],[0.29,0.52],[0.30,0.66],[0.25,0.80],[0.16,0.86],[0.10,0.78],[0.09,0.62]],
  Europe:   [[0.43,0.05],[0.57,0.03],[0.62,0.12],[0.59,0.26],[0.54,0.36],[0.48,0.38],[0.44,0.30],[0.42,0.18]],
  Africa:   [[0.42,0.30],[0.53,0.25],[0.61,0.32],[0.63,0.48],[0.60,0.64],[0.53,0.74],[0.45,0.70],[0.40,0.55],[0.40,0.38]],
  Asia:     [[0.58,0.03],[0.70,0.01],[0.83,0.02],[0.94,0.11],[0.97,0.26],[0.94,0.42],[0.86,0.52],[0.74,0.56],[0.62,0.47],[0.56,0.35],[0.56,0.18]],
  Australia:[[0.74,0.52],[0.90,0.50],[0.96,0.56],[0.95,0.68],[0.88,0.75],[0.77,0.75],[0.72,0.68]],
  Greenland:[[0.23,0.00],[0.37,0.00],[0.41,0.07],[0.37,0.19],[0.26,0.21],[0.21,0.13]],
};

function ptInPoly(px, py, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i][0], yi = poly[i][1];
    const xj = poly[j][0], yj = poly[j][1];
    if (((yi > py) !== (yj > py)) && (px < (xj - xi) * (py - yi) / (yj - yi) + xi))
      inside = !inside;
  }
  return inside;
}

function isLandCell(nx, ny) {
  return Object.values(CONTINENTS).some(p => ptInPoly(nx, ny, p));
}

const FIN_CENTERS = [
  [0.150, 0.285, 'NYC'], [0.460, 0.183, 'LON'], [0.492, 0.172, 'FRA'],
  [0.582, 0.315, 'DXB'], [0.634, 0.378, 'BOM'], [0.760, 0.330, 'HKG'],
  [0.832, 0.260, 'TYO'], [0.758, 0.445, 'SGP'], [0.846, 0.625, 'SYD'],
  [0.208, 0.595, 'GRU'],
];

function renderMap(rng) {
  const panelW = Math.round(W * 0.26);
  // Determine positions based on map side
  const mapOnRight = state.mapSide !== 'left';
  const mapX   = mapOnRight ? panelW : 0;
  const panelX = mapOnRight ? Math.round(W * 0.025) : W - panelW + Math.round(W * 0.015);
  const panelTextAlign = 'left';

  const mapY = Math.round(LINE_H * 1.8);
  const mapW = W - panelW - Math.round(CHAR_W * 3);
  const mapH = H - mapY * 2;
  const cols = Math.floor(mapW / CHAR_W);
  const rows = Math.floor(mapH / LINE_H);

  // Pre-compute land grid
  const land = Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => isLandCell(c / cols, r / rows))
  );

  // Ocean
  ctx.save();
  ctx.font        = monoFont();
  ctx.textBaseline = 'top';
  ctx.textAlign   = 'left';
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (land[r][c] || rng() > 0.17) continue;
      ctx.fillStyle   = C.inkFaint;
      ctx.globalAlpha = 0.38 + rng() * 0.30;
      ctx.fillText('.', mapX + c * CHAR_W, mapY + r * LINE_H);
    }
  }
  ctx.restore();

  // Land
  const LAND_CH  = ['#','#','%','%','+','.'];
  const COAST_CH = ['#','%','@'];
  ctx.save();
  ctx.font        = monoFont();
  ctx.textBaseline = 'top';
  ctx.textAlign   = 'left';
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (!land[r][c]) continue;
      const coast =
        (r > 0       && !land[r-1][c]) ||
        (r < rows-1  && !land[r+1][c]) ||
        (c > 0       && !land[r][c-1]) ||
        (c < cols-1  && !land[r][c+1]);
      const ch    = coast
        ? COAST_CH[Math.floor(rng() * COAST_CH.length)]
        : LAND_CH[Math.floor(rng() * LAND_CH.length)];
      ctx.fillStyle   = C.ink;
      ctx.globalAlpha = coast ? 0.68 : 0.28 + rng() * 0.28;
      ctx.fillText(ch, mapX + c * CHAR_W, mapY + r * LINE_H);
    }
  }
  ctx.restore();

  // Financial centres
  ctx.save();
  ctx.font        = monoFont(MONO_SIZE * 0.88);
  ctx.textBaseline = 'top';
  ctx.textAlign   = 'left';
  for (const [nx, ny, label] of FIN_CENTERS) {
    const cx = mapX + nx * mapW;
    const cy = mapY + ny * mapH;
    ctx.fillStyle   = C.accent;
    ctx.globalAlpha = 0.95;
    ctx.fillText('[+]', cx - CHAR_W, cy);
    ctx.globalAlpha = 0.78;
    ctx.fillText(label, cx - CHAR_W * 0.5, cy - LINE_H * 1.1);
  }
  ctx.restore();

  // Panel content
  const brandSz = Math.round(H * 0.17);
  drawBrand(state.brand, panelX, H * 0.42, brandSz, panelTextAlign);
  if (state.tagPos === 'default')
    drawTaglineText(state.tagline, panelX, H * 0.58, panelTextAlign, 15);

  ctx.save();
  ctx.font        = monoFont(MONO_SIZE * 0.85);
  ctx.textBaseline = 'top';
  ctx.fillStyle   = C.inkDim;
  ctx.globalAlpha = 0.42;
  ctx.fillText('GLOBAL',   panelX, LINE_H);
  ctx.fillText('NETWORK',  panelX, LINE_H * 2.3);
  ctx.fillText('────────', panelX, LINE_H * 3.5);
  const shown = FIN_CENTERS.slice(0, 5).map(f => f[2]);
  ctx.fillText(shown.join(' ·'), panelX, H - LINE_H * 2.5);
  ctx.restore();

  // Panel divider
  const divX = mapOnRight ? panelW : W - panelW;
  ctx.save();
  ctx.strokeStyle = C.inkFaint;
  ctx.globalAlpha = 0.5;
  ctx.lineWidth   = 1;
  ctx.setLineDash([3, 5]);
  ctx.beginPath();
  ctx.moveTo(divX, mapY);
  ctx.lineTo(divX, H - mapY);
  ctx.stroke();
  ctx.restore();
}

// ─────────────────────────────────────────────────────────────────
// THEME 3 — THE SKYLINE
// ─────────────────────────────────────────────────────────────────

function renderSkyline(rng) {
  const groundY    = H * 0.96;
  const skylineTop = H * 0.28;
  const skyH       = groundY - skylineTop;

  dotMatrix(rng, 0, 0, W, skylineTop + skyH * 0.3, 0.11);

  const COUNT = 44;
  let tallest = null;

  const buildings = Array.from({ length: COUNT }, (_, i) => {
    const t     = i / (COUNT - 1);
    const xC    = W * (0.005 + t * 0.990);
    const wChars = Math.max(2, Math.floor(2 + rng() * 10));
    const baseProfile = (
      0.22 * Math.sin(t * Math.PI * 1.1 + 0.2) +
      0.18 * Math.sin(t * Math.PI * 3.4) +
      0.10 * (t > 0.35 && t < 0.75 ? (t - 0.35) * 2.4 : 0) +
      rng() * 0.32 + 0.04
    );
    const profile = rng() > 0.85 ? Math.min(0.96, baseProfile + 0.40) : baseProfile;
    const topY   = groundY - skyH * Math.min(0.96, Math.max(0.04, profile));
    const hChars = Math.max(2, Math.floor((groundY - topY) / LINE_H));
    const style  = Math.floor(rng() * 4);
    const b      = { xC, wChars, topY, hChars, style, t };
    if (!tallest || hChars > tallest.hChars) tallest = b;
    return b;
  });

  ctx.save();
  ctx.font        = monoFont();
  ctx.textBaseline = 'top';
  ctx.textAlign   = 'left';
  for (const b of buildings) {
    const startX = b.xC - (b.wChars * CHAR_W) / 2;
    const w      = b.wChars;
    for (let row = 0; row < b.hChars; row++) {
      const y       = groundY - (b.hChars - row) * LINE_H;
      const opacity = 0.42 + (row / b.hChars) * 0.44;
      let line;
      if (row === 0) {
        line = '_'.repeat(w);
      } else {
        switch (b.style) {
          case 0: line = row%3===1 ? '[' + '='.repeat(Math.max(1,w-2)) + ']' : 'H'.repeat(w); break;
          case 1: line = row%4===2 ? '|' + '-'.repeat(Math.max(1,w-2)) + '|' : '|' + ' '.repeat(Math.max(0,w-2)) + '|'; break;
          case 2: line = row%2===0 ? '#'.repeat(w) : '|' + '+'.repeat(Math.max(0,w-2)) + '|'; break;
          default: line = row%3===0 ? '='.repeat(w) : '[' + 'H'.repeat(Math.max(0,w-2)) + ']';
        }
      }
      if (b.style === 1 && row > 1 && row%2===0 && w > 3) {
        const arr = line.split('');
        for (let ci = 1; ci < w-1; ci += 2)
          if (rng() > 0.45) arr[ci] = rng() > 0.5 ? 'o' : '.';
        line = arr.join('');
      }
      ctx.fillStyle   = C.asciiChar;
      ctx.globalAlpha = opacity;
      ctx.fillText(line, startX, y);
    }
  }
  ctx.restore();

  // Ground
  ctx.save();
  ctx.font        = monoFont(MONO_SIZE * 0.85);
  ctx.textBaseline = 'top';
  ctx.fillStyle   = C.ink;
  ctx.globalAlpha = 0.38;
  ctx.fillText('_'.repeat(Math.floor(W / CHAR_W)), 0, groundY);
  ctx.restore();

  // Billboard on tallest building
  if (tallest && state.tagline && state.tagPos === 'default') {
    const pad   = 2;
    const inner = ' '.repeat(pad) + state.tagline + ' '.repeat(pad);
    const bw    = inner.length;
    const box   = ['+' + '-'.repeat(bw) + '+', '|' + inner + '|', '+' + '-'.repeat(bw) + '+'];
    const boxPW = (bw + 2) * CHAR_W;
    const bboxX = tallest.xC - boxPW / 2;
    const bboxY = tallest.topY - box.length * LINE_H - LINE_H * 0.5;
    drawLines(box, bboxX, bboxY, C.accent, 0.92);
    ctx.save();
    ctx.font        = monoFont();
    ctx.textBaseline = 'top';
    ctx.fillStyle   = C.ink;
    ctx.globalAlpha = 0.50;
    for (let i = 0; i < 2; i++)
      ctx.fillText('|', tallest.xC - CHAR_W * 0.5, tallest.topY - i * LINE_H - LINE_H * 0.8);
    ctx.restore();
  }

  const align   = state.align;
  const tx      = textX(align, 64);
  const brandSz = Math.round(H * 0.155);
  drawBrand(state.brand, tx, Math.min(H * 0.21, skylineTop - LINE_H * 2.5), brandSz, align);
}

// ─────────────────────────────────────────────────────────────────
// THEME 4 — THE BANNER  (commercial airliner + ASCII clouds)
// ─────────────────────────────────────────────────────────────────

// Hot air balloon — basket at bottom, rope attaches to basket
const HOT_AIR_BALLOON = [
  `      .-------.      `,
  `    .'  ( ) ( )'.    `,
  `   /   ()     ()  \\ `,
  `  |   (   ( )   )  | `,
  `  |    '-------'   | `,
  `   \\               / `,
  `    '---.,   ,.---'  `,
  `         | | |       `,
  `        /|___|\\      `,
  `       [_______]     `,
];

// Commercial airliner — bird's-eye top-down view, nose at top
const AIRLINER = [
  `         /\\         `,
  `        /  \\        `,
  `  _____/    \\_____  `,
  ` |     |    |     | `,
  `<|     | () |     |>`,
  ` |_____|    |_____| `,
  `        \\  /        `,
  `         \\/         `,
  `         /\\         `,
  `        /  \\        `,
];

// Puffy ASCII clouds of varying sizes
const CLOUD_SHAPES = [
  [`  .---.  `, ` (     ) `, `  '---'  `],
  [`  .-~~~~-.  `, ` ( () ()  )`, `  '~~~~~~'  `],
  [` .--. .--.  `, `(    X    )`, ` '--' '--'  `],
  [`.-""""-.`, `( () ()  )`, `'-------'`],
  [`   .--.   `, `  (    )  `, `   '--'   `],
  [`.----------.`, `(  () ()    )`, `'----------'`],
];

function renderClouds(rng, avoidX1, avoidY1, avoidX2, avoidY2) {
  const count = 5 + Math.floor(rng() * 4);
  for (let i = 0; i < count; i++) {
    const shape = CLOUD_SHAPES[Math.floor(rng() * CLOUD_SHAPES.length)];
    const sw    = shape[0].length * CHAR_W;
    const sh    = shape.length   * LINE_H;
    let x, y, tries = 0;
    do {
      x = rng() * (W - sw);
      y = rng() * (H - sh);
      tries++;
    } while (
      tries < 20 &&
      !(x + sw < avoidX1 || x > avoidX2 || y + sh < avoidY1 || y > avoidY2)
    );
    drawLines(shape, x, y, C.ink, 0.16 + rng() * 0.22);
  }
}

function makeBannerBox(text) {
  const pad   = 2;
  const inner = ' '.repeat(pad) + (text || '') + ' '.repeat(pad);
  const bw    = inner.length;
  return ['+' + '-'.repeat(bw) + '+', '|' + inner + '|', '+' + '-'.repeat(bw) + '+'];
}

function renderBanner(rng) {
  dotMatrix(rng, 0, 0, W, H, 0.11);

  const isBalloon = state.bannerShape === 'balloon';
  const shape     = isBalloon ? HOT_AIR_BALLOON : AIRLINER;
  const planeCols = shape.reduce((m, l) => Math.max(m, l.length), 0);
  const planeRows = shape.length;
  const planePixW = planeCols * CHAR_W;
  const planePixH = planeRows * LINE_H;
  const planeX    = isBalloon ? (W - planePixW) / 2 : W * 0.04;
  const planeY    = H * 0.28;
  const planeRX   = planeX + planePixW;

  if (isBalloon) {
    // Clouds around balloon
    renderClouds(rng, planeX - 10, planeY - 10, planeRX + 10, planeY + planePixH + 10);
    drawLines(shape, planeX, planeY, C.ink, 0.90);

    // Tagline below basket for default position
    if (state.tagline && state.tagPos === 'default') {
      const basketY = planeY + planePixH + LINE_H * 0.8;
      drawTaglineText(state.tagline, W / 2, basketY, 'center', 16);
    }
  } else {
    const ropeY = planeY + LINE_H * 3.0;

    // Clamp tagline so banner always fits
    const maxBannerChars = Math.floor((W * 0.95 - planeRX - CHAR_W * 6) / CHAR_W) - 4;
    const safeTag        = (state.tagline || '').slice(0, Math.max(8, maxBannerChars));
    const box            = makeBannerBox(safeTag);
    const boxPixW        = box[0].length * CHAR_W;
    const bannerX        = W * 0.95 - boxPixW;
    const bannerY        = ropeY - LINE_H;

    // Rope
    const ropeChars = Math.max(0, Math.floor((bannerX - planeRX - CHAR_W) / CHAR_W / 2));
    const ropeStr   = '- '.repeat(ropeChars);

    // Clouds (behind plane)
    renderClouds(rng, planeX - 10, planeY - 10, planeRX + 10, planeY + planePixH + 10);

    // Draw plane, rope, banner
    drawLines(AIRLINER, planeX, planeY, C.ink, 0.90);
    drawLines([ropeStr], planeRX + CHAR_W * 0.5, ropeY, C.accent, 0.65);
    drawLines(box,       bannerX, bannerY, C.accent, 0.92);

    // Propeller wash
    for (let i = 0; i < 5; i++) {
      const px = planeX - CHAR_W * (3 + i * 2.5);
      if (px < 0) break;
      drawLines(['~'], px, planeY + LINE_H * 3.5, C.inkDim, 0.30 - i * 0.05);
    }

    // HUD labels
    ctx.save();
    ctx.font        = monoFont(MONO_SIZE * 0.78);
    ctx.textBaseline = 'top';
    ctx.fillStyle   = C.inkDim;
    ctx.globalAlpha = 0.32;
    ctx.textAlign   = 'left';
    ctx.fillText('ALT 3,500 ft', W * 0.04, H * 0.90);
    ctx.fillText('HDG 090°    ', W * 0.19, H * 0.90);
    ctx.restore();
  }

  // Brand text
  const brandSz = Math.round(H * 0.145);
  const align   = state.align;
  const tx      = textX(align, planeX + planePixW * 0.35);
  drawBrand(state.brand, tx, planeY - brandSz * 0.35, brandSz, align);
}

// ─────────────────────────────────────────────────────────────────
// THEME 5 — ASCII UPLOAD
// ─────────────────────────────────────────────────────────────────

// Characters from dark → light
const ASCII_RAMP = '@%#*+=-:·. ';

function renderAscii() {
  const data = state.asciiImageData;
  if (!data) {
    ctx.save();
    ctx.font        = monoFont(MONO_SIZE * 1.4);
    ctx.textBaseline = 'middle';
    ctx.textAlign   = 'center';
    ctx.fillStyle   = C.inkDim;
    ctx.globalAlpha = 0.55;
    ctx.fillText('Upload an image to convert it to ASCII', W/2, H/2 - LINE_H);
    ctx.fillText('Supports JPG · PNG · GIF · WebP', W/2, H/2 + LINE_H * 1.2);
    ctx.restore();
    return;
  }

  const cols = data.width;
  const rows = data.height;

  ctx.save();
  ctx.font        = monoFont();
  ctx.textBaseline = 'top';
  ctx.textAlign   = 'left';
  ctx.fillStyle   = C.asciiChar;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const i4  = (r * cols + c) * 4;
      const lum = (data.data[i4] * 0.299 + data.data[i4+1] * 0.587 + data.data[i4+2] * 0.114) / 255;
      const ci  = Math.min(ASCII_RAMP.length - 1, Math.floor((1 - lum) * ASCII_RAMP.length));
      const ch  = ASCII_RAMP[ci];
      if (ch === ' ') continue;
      ctx.globalAlpha = 0.38 + (1 - lum) * 0.58;
      ctx.fillText(ch, state.asciiOffsetX + c * CHAR_W, state.asciiOffsetY + r * LINE_H);
    }
  }
  ctx.restore();

  // Brand overlay with a soft bg box for legibility
  if (state.brand) {
    const brandSz = Math.round(H * 0.18);
    const align   = state.align;
    const tx      = textX(align, 60);
    ctx.save();
    ctx.font        = getBrandFont(brandSz);
    ctx.textBaseline = 'alphabetic';
    ctx.textAlign   = align;
    const tw = ctx.measureText(state.brand).width;
    const bx = align === 'center' ? tx - tw/2 - 12
             : align === 'right'  ? tx - tw - 12 : tx - 12;
    ctx.fillStyle   = C.bg;
    ctx.globalAlpha = 0.52;
    ctx.fillRect(bx, H * 0.38 - brandSz, tw + 24, brandSz * 1.35);
    ctx.restore();
    drawBrand(state.brand, tx, H * 0.48, brandSz, align);
  }
}

// ─────────────────────────────────────────────────────────────────
// RENDER DISPATCHER
// ─────────────────────────────────────────────────────────────────

function render() {
  // Sync editable palette
  C.bg        = state.bgColor;
  C.ink       = state.inkColor;
  C.accent    = state.accentColor;
  C.asciiChar = state.asciiCharColor;
  C.inkFaint  = withAlpha(state.asciiCharColor, 0.18);

  measureCharW();
  const rng = makePRNG(state.seed);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.setTransform(SCALE, 0, 0, SCALE, 0, 0);
  fillBg();   // always covers full W×H after format change

  switch (state.theme) {
    case 'chart':   renderChart(rng);   break;
    case 'map':     renderMap(rng);     break;
    case 'skyline': renderSkyline(rng); break;
    case 'banner':  renderBanner(rng);  break;
    case 'ascii':   renderAscii();      break;
  }
  renderTaglineOverlay();
}

// ── Download ──────────────────────────────────────────────────────
function downloadBanner() {
  const link  = document.createElement('a');
  link.download = `banner-${state.format}-${state.theme}-${state.seed}.png`;
  link.href   = canvas.toDataURL('image/png');
  link.click();
}

// ─────────────────────────────────────────────────────────────────
// UI WIRING
// ─────────────────────────────────────────────────────────────────

function updateThemeOptions() {
  document.querySelectorAll('.theme-opts').forEach(el => el.classList.add('hidden'));
  const map = { chart: 'chartOptions', map: 'mapOptions', banner: 'bannerOptions', ascii: 'asciiOptions' };
  const id  = map[state.theme];
  if (id) document.getElementById(id).classList.remove('hidden');
  document.getElementById('variationSection').classList.toggle('hidden', state.theme === 'ascii');
  document.getElementById('seedSection').classList.toggle('hidden', state.theme === 'ascii');
}

// Theme buttons
document.querySelectorAll('.theme-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.theme = btn.dataset.theme;
    updateThemeOptions();
    render();
  });
});

// Text
document.getElementById('brandText').addEventListener('input', e => {
  state.brand = e.target.value; render();
});
document.getElementById('taglineText').addEventListener('input', e => {
  state.tagline = e.target.value; render();
});

// Alignment
document.querySelectorAll('.toggle-btn[data-align]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.toggle-btn[data-align]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.align = btn.dataset.align;
    render();
  });
});

// Tagline position
document.getElementById('tagPos').addEventListener('change', e => {
  state.tagPos = e.target.value; render();
});

// Color pickers
document.getElementById('bgColor').addEventListener('input', e => {
  state.bgColor = e.target.value; render();
});
document.getElementById('inkColor').addEventListener('input', e => {
  state.inkColor = e.target.value; render();
});
document.getElementById('asciiCharColor').addEventListener('input', e => {
  state.asciiCharColor = e.target.value; render();
});
document.getElementById('accentColor').addEventListener('input', e => {
  state.accentColor = e.target.value; render();
});

// Brand font toggle
document.querySelectorAll('.font-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.font-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.brandFont = btn.dataset.font;
    render();
  });
});

// Banner shape toggle
document.querySelectorAll('.banner-shape-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.banner-shape-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.bannerShape = btn.dataset.shape;
    render();
  });
});

// Scale / quality
document.querySelectorAll('.scale-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.scale-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyScale(parseInt(btn.dataset.scale, 10));
  });
});

// Ticker input (debounced, 600 ms)
document.getElementById('tickerInput').addEventListener('input', e => {
  state.ticker = e.target.value.trim().toUpperCase();
  clearTimeout(tickerDebounce);
  tickerDebounce = null;
  if (state.ticker.length < 2) {
    state.tickerData = null; state.tickerSymbol = '';
    setTickerStatus(''); render(); return;
  }
  tickerDebounce = setTimeout(() => fetchTicker(state.ticker), 600);
});

// Map side toggle
document.querySelectorAll('.map-side-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.map-side-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.mapSide = btn.dataset.side;
    render();
  });
});

// Image upload for ASCII mode
document.getElementById('imageUpload').addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const img = new Image();
  img.onload = () => {
    measureCharW();
    const maxCols   = Math.floor(W / CHAR_W);
    const maxRows   = Math.floor(H / LINE_H);
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const cellAspect = CHAR_W / LINE_H;
    const charAspect = imgAspect / cellAspect;

    let cols, rows;
    if (charAspect >= maxCols / maxRows) {
      cols = maxCols;
      rows = Math.max(1, Math.round(cols / charAspect));
    } else {
      rows = maxRows;
      cols = Math.max(1, Math.round(rows * charAspect));
    }
    cols = Math.min(cols, maxCols);
    rows = Math.min(rows, maxRows);

    offCanvas.width  = cols;
    offCanvas.height = rows;
    offCtx.clearRect(0, 0, cols, rows);
    offCtx.drawImage(img, 0, 0, cols, rows);
    state.asciiImageData = offCtx.getImageData(0, 0, cols, rows);
    state.asciiOffsetX = Math.floor((maxCols - cols) / 2) * CHAR_W;
    state.asciiOffsetY = Math.floor((maxRows - rows) / 2) * LINE_H;
    URL.revokeObjectURL(img.src);
    // Switch to ASCII theme
    state.theme = 'ascii';
    document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('[data-theme="ascii"]').classList.add('active');
    updateThemeOptions();
    document.getElementById('uploadNote').textContent = file.name;
    render();
  };
  img.onerror = () => {
    document.getElementById('uploadNote').textContent =
      'Error: could not load image. Try a different file.';
  };
  img.src = URL.createObjectURL(file);
});

// Seed
const seedSlider  = document.getElementById('seedSlider');
const seedDisplay = document.getElementById('seedDisplay');
seedSlider.addEventListener('input', () => {
  state.seed = parseInt(seedSlider.value, 10);
  seedDisplay.textContent = state.seed;
  render();
});

document.getElementById('randomize').addEventListener('click', () => {
  state.seed = Math.floor(Math.random() * 1000);
  seedSlider.value        = state.seed;
  seedDisplay.textContent = state.seed;
  render();
});

document.getElementById('downloadBtn').addEventListener('click', downloadBanner);

document.getElementById('formatSelect').addEventListener('change', e => {
  applyFormat(e.target.value);
});

// Theme legend toggle
const legendBtn   = document.getElementById('legendBtn');
const themeLegend = document.getElementById('themeLegend');
legendBtn.addEventListener('click', () => {
  const open = !themeLegend.classList.contains('hidden');
  themeLegend.classList.toggle('hidden', open);
  legendBtn.setAttribute('aria-expanded', String(!open));
});

// Easter egg: click brand name → spin the brand-mark once
const brandMark = document.querySelector('.brand-mark');
document.getElementById('brandName').addEventListener('click', () => {
  if (brandMark.classList.contains('spinning')) return;
  brandMark.classList.add('spinning');
  brandMark.addEventListener('animationend', () => {
    brandMark.classList.remove('spinning');
  }, { once: true });
});

// ── Initial render ────────────────────────────────────────────────
updateThemeOptions();
applyFormat('linkedin');
fontsReady
  .then(() => { fontsLoaded = true; measureCharW(); render(); })
  .catch(() => { fontsLoaded = true; measureCharW(); render(); });
