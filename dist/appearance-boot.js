// Runs before styles: resolve appearance without flashing the other theme.
(() => {
  let saved = {}, reduced = false;
  try { saved = JSON.parse(localStorage.getItem('loop.appearance.v1') || '{}') || {}; } catch {}
  try { reduced = JSON.parse(localStorage.getItem('loop.workspace.v3') || '{}')?.reduced === true; } catch {}
  const root = document.documentElement;
  root.dataset.theme = ['light', 'dark'].includes(saved.theme) ? saved.theme : (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  root.dataset.material = ['glass', 'solid'].includes(saved.material) ? saved.material : 'glass';
  root.dataset.reduced = String(reduced || matchMedia('(prefers-reduced-motion: reduce)').matches);
})();
