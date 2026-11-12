import { icon } from './icons.js';
const KEY = 'loop.appearance.v1';
let preference = {};
try { preference = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch {}
export function appearanceControls(compact = false) {
  return `<div class="appearance-controls ${compact ? 'compact' : ''}" aria-label="Appearance preferences">
    <fieldset><legend>Color</legend><div class="appearance-options">${['light', 'dark'].map(theme => `<button type="button" data-theme-choice="${theme}" aria-pressed="${document.documentElement.dataset.theme === theme}">${icon(theme === 'light' ? 'sun' : 'moon', 15)}<span>${theme === 'light' ? 'Light' : 'Dark'}</span></button>`).join('')}</div></fieldset>
    <fieldset><legend>Surface</legend><div class="appearance-options">${['glass', 'solid'].map(material => `<button type="button" data-material-choice="${material}" aria-pressed="${document.documentElement.dataset.material === material}">${icon(material === 'glass' ? 'layers' : 'square', 15)}<span>${material === 'glass' ? 'Glass' : 'Solid'}</span></button>`).join('')}</div></fieldset>
  </div>`;
}
function syncControls() {
  document.querySelectorAll('[data-theme-choice]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.themeChoice === document.documentElement.dataset.theme)));
  document.querySelectorAll('[data-material-choice]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.materialChoice === document.documentElement.dataset.material)));
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = document.documentElement.dataset.theme === 'light' ? '#f6f4ef' : '#161923';
}
export function setAppearance(key, value) {
  if (!({theme: ['light','dark'],material:['glass','solid']}[key] || []).includes(value)) return;
  document.documentElement.dataset[key] = value;
  preference[key] = value;
  try { localStorage.setItem(KEY, JSON.stringify(preference)); } catch {}
  syncControls();
}
export function applyMotion(reduced) {
  document.documentElement.dataset.reduced = String(reduced || matchMedia('(prefers-reduced-motion: reduce)').matches);
}
document.addEventListener('click', e => {
  const color = e.target.closest('[data-theme-choice]');
  const surface = e.target.closest('[data-material-choice]');
  if (color) setAppearance('theme', color.dataset.themeChoice);
  if (surface) setAppearance('material', surface.dataset.materialChoice);
});
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (!preference.theme) { document.documentElement.dataset.theme = e.matches ? 'dark' : 'light'; syncControls(); }
});
matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', () => {
  let reduced = false; try { reduced = JSON.parse(localStorage.getItem('loop.workspace.v3'))?.reduced; } catch {}
  applyMotion(reduced);
});
syncControls();
