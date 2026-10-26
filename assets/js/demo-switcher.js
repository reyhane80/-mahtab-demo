/* ==========================================================================
   قالب مهتاب – سوییچر دموها (فقط برای پیش‌نمایش قالب)
   --------------------------------------------------------------------------
   در سایت واقعی لازم نیست. حذف کامل: در هر صفحه این خط را پاک کنید:
     <script src="../assets/js/demo-switcher.js" defer></script>

   هر دمو یک پوشه‌ی کامل است (clothing، cosmetics، …). این سوییچر شما را به
   همان صفحه در پوشه‌ی دموی دیگر می‌برد؛ مثلاً از perfume/shop.html به jewelry/shop.html.
   ========================================================================== */

(function () {
  'use strict';

  const DEMOS = [
    { id: 'clothing', name: 'پوشاک', swatch: ['#151413', '#F6F4F0', '#B4532A'] },
    { id: 'cosmetics', name: 'آرایشی و بهداشتی', swatch: ['#4A2338', '#F7E6E3', '#C9677A'] },
    { id: 'nuts', name: 'آجیل و شیرینی', swatch: ['#4B2E1E', '#FBF3E4', '#E0A526'] },
    { id: 'flowers', name: 'گل و هدیه', swatch: ['#2F5D50', '#FFFBF5', '#E8A0A8'] },
    { id: 'perfume', name: 'عطر', swatch: ['#0E0C0B', '#EADFCB', '#C8924A'] },
    { id: 'jewelry', name: 'جواهرات', swatch: ['#1F4D3F', '#FAF7F2', '#B8913E'] },
  ];
  const current = document.documentElement.dataset.demo;
  const page = (window.location.pathname.split('/').pop() || 'index.html') + window.location.search;

  const style = document.createElement('style');
  style.textContent = `
    .demo-switcher{position:fixed;left:1rem;bottom:1rem;z-index:50;font-family:Vazirmatn,Tahoma,sans-serif;font-size:.8rem;line-height:1.6;color:#1c1c1c}
    .demo-switcher__toggle{display:flex;align-items:center;gap:.5rem;padding:.45rem .9rem .45rem .5rem;border-radius:999px;background:#fff;box-shadow:0 10px 30px -10px rgb(0 0 0/.45),0 0 0 1px rgb(0 0 0/.06);font-weight:700;cursor:pointer}
    .demo-switcher__dot{width:1.6rem;height:1.6rem;border-radius:999px;box-shadow:inset 0 0 0 1px rgb(0 0 0/.15)}
    .demo-switcher__list{position:absolute;left:0;bottom:calc(100% + .5rem);width:15rem;padding:.4rem;border-radius:1rem;background:#fff;box-shadow:0 20px 50px -15px rgb(0 0 0/.45),0 0 0 1px rgb(0 0 0/.06)}
    .demo-switcher__list a{display:flex;align-items:center;gap:.6rem;padding:.45rem .55rem;border-radius:.7rem;color:#1c1c1c}
    .demo-switcher__list a:hover{background:#f2f0ec}
    .demo-switcher__list a[aria-current]{background:#f2f0ec;font-weight:800}
    .demo-switcher__list .demo-switcher__dot{width:1.35rem;height:1.35rem}
    .demo-switcher__title{padding:.25rem .55rem .35rem;color:#6b665f;font-size:.75rem}
    .demo-switcher :focus-visible{outline:2px solid #1c1c1c;outline-offset:2px}
    body.is-locked .demo-switcher{display:none}
    @media print{.demo-switcher{display:none}}
  `;
  document.head.appendChild(style);

  const dot = (d) => `<span class="demo-switcher__dot" aria-hidden="true" style="background:conic-gradient(${d.swatch[2]} 0 30%, ${d.swatch[1]} 0 55%, ${d.swatch[0]} 0)"></span>`;
  const active = DEMOS.find((d) => d.id === current) || DEMOS[0];

  const box = document.createElement('div');
  box.className = 'demo-switcher';
  box.innerHTML = `
    <div class="demo-switcher__list" id="demo-switcher-list" hidden>
      <p class="demo-switcher__title">دموهای قالب مهتاب</p>
      <ul>${DEMOS.map((d) => `<li><a href="../${d.id}/${page}"${d.id === current ? ' aria-current="page"' : ''}>${dot(d)}${d.name}</a></li>`).join('')}</ul>
    </div>
    <button type="button" class="demo-switcher__toggle" aria-expanded="false" aria-controls="demo-switcher-list">${dot(active)}دموها</button>`;
  document.body.appendChild(box);

  const toggle = box.querySelector('button');
  const list = box.querySelector('.demo-switcher__list');
  const setOpen = (open) => {
    list.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
  };
  toggle.addEventListener('click', () => setOpen(list.hidden));
  document.addEventListener('click', (e) => !box.contains(e.target) && setOpen(false));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !list.hidden) {
      setOpen(false);
      toggle.focus();
    }
  });
})();
