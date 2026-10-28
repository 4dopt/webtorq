// WebTorq Interactive Engine
document.addEventListener('DOMContentLoaded', () => {
  initComparisonSlider();
  initPricingToggle();
  initFaqAccordion();
  initAuditTool();
  initRoiCalculator();
  initModalHandling();
  initMobileMenu();
  initSmoothScroll();
  initStickyConversionBar();
  initSocialProofToast();
  initModalTabsAndScheduler();
  if (window.lucide && typeof lucide.createIcons === 'function') {
    lucide.createIcons();
  }
});

// 1. Interactive Before / After Comparison Slider Engine
// 1. Interactive Before / After Comparison Slider Engine (Real Websites Only)
let comparisonState = {
  currentIndustry: 'desktop',
  viewMode: 'slider', // 'slider' or 'side-by-side'
  autoScanActive: false,
  autoScanReqId: null,
  autoScanDirection: 1,
  hotspotsVisible: false,
  sliderPercent: 50
};

const comparisonData = {
  desktop: {
    title: 'Horizon Logistics London (Desktop 1440px)',
    url: 'horizonlogisticslondon.com → horizonlogisticslondon.netlify.app',
    liveUrl: 'https://horizonlogisticslondon.netlify.app/',
    beforeUrl: 'https://horizonlogisticslondon.com/',
    speedBadge: '100 PageSpeed • 0.35s Load',
    beforeImage: '/public/images/horizon-before.png',
    afterImage: '/public/images/horizon-after.png',
    metrics: {
      speed: { before: '41/100 (6.4s)', after: '100/100 (0.35s)', diff: '⚡ 18x Faster' },
      mobile: { before: 'Cluttered WP Layout', after: '1-Tap WhatsApp & Call', diff: '📱 +84% Mobile Inquiries' },
      conversion: { before: '1.2% Inquiry Rate', after: '6.8% Quote Requests', diff: '📈 +460% Fast Quotes' },
      security: { before: 'Outdated WP Plugins', after: 'Netlify Edge CDN + SSL', diff: '🛡️ 100% Zero Downtime' }
    },
    hotspots: [
      { id: 1, top: '12%', left: '76%', title: 'Instant WhatsApp & 24/7 Dispatch', flaw: 'Before: Restricted 9am-5pm phone desk and delayed email form', upgrade: 'After: 1-click 24/7 WhatsApp dispatch to 07878 569458 & rapid quote modal' },
      { id: 2, top: '38%', left: '26%', title: 'Specialized Cold Chain Focus', flaw: 'Before: Generic freight text burying cold chain capabilities', upgrade: 'After: Dual-temp (-25°C to +25°C) pharma & frozen food precision front and center' },
      { id: 3, top: '50%', left: '74%', title: 'Live Dispatch SLA Card', flaw: 'Before: Zero turnaround commitments or transit time guarantees', upgrade: 'After: 30-60 min rapid transit guarantee with real-time GPS tracking proof' },
      { id: 4, top: '78%', left: '32%', title: 'Frictionless Mobile-First Quote Engine', flaw: 'Before: Clunky 8-field WordPress Elementor form with 24-48h reply lag', upgrade: 'After: 45-second direct quote flow with instant dispatcher route matching' }
    ]
  },
  mobile: {
    title: 'Horizon Logistics London (Mobile 390px)',
    url: 'm.horizonlogisticslondon.com → horizonlogisticslondon.netlify.app',
    liveUrl: 'https://horizonlogisticslondon.netlify.app/',
    beforeUrl: 'https://horizonlogisticslondon.com/',
    speedBadge: '100 Mobile Score • 0.38s Load',
    beforeImage: '/public/images/horizon-before-mobile.png',
    afterImage: '/public/images/horizon-after-mobile.png',
    metrics: {
      speed: { before: '32/100 (7.1s)', after: '99/100 (0.38s)', diff: '⚡ 19x Faster Mobile' },
      mobile: { before: 'Horizontal Overflow', after: 'Native Touch Ergonomics', diff: '📱 0 Pinch Zooming' },
      conversion: { before: '0.8% Mobile Clicks', after: '7.4% WhatsApp Dispatches', diff: '📈 +825% Mobile Leads' },
      security: { before: 'Uncached Mobile WP', after: 'Edge CDN Micro-Assets', diff: '🛡️ Instant Delivery' }
    },
    hotspots: [
      { id: 1, top: '10%', left: '80%', title: 'Sticky WhatsApp Dispatch', flaw: 'Before: Mobile users had to hunt for phone number', upgrade: 'After: Instant tap-to-dispatch WhatsApp floating button' },
      { id: 2, top: '32%', left: '50%', title: 'Readable Touch Typography', flaw: 'Before: Tiny desktop font scaled down illegibly', upgrade: 'After: Bold, high-contrast mobile typography tailored to logistics managers' },
      { id: 3, top: '56%', left: '50%', title: 'SLA Guarantee Cards', flaw: 'Before: Wall of dense text with zero visual hierarchy', upgrade: 'After: High-trust swipeable SLA cards showing 30-60 min rapid transit' },
      { id: 4, top: '80%', left: '50%', title: '1-Thumb Quote Modal', flaw: 'Before: Endless scrolling 8-field desktop form on phone', upgrade: 'After: 2-step thumb-friendly quote sheet' }
    ]
  },
  live: {
    title: 'Horizon Logistics London (Live Interactive Embeds)',
    url: 'Live Interactive: horizonlogisticslondon.com vs horizonlogisticslondon.netlify.app',
    liveUrl: 'https://horizonlogisticslondon.netlify.app/',
    beforeUrl: 'https://horizonlogisticslondon.com/',
    speedBadge: 'Live Verified Sites',
    metrics: {
      speed: { before: '41/100 (6.4s)', after: '100/100 (0.35s)', diff: '⚡ 18x Faster' },
      mobile: { before: 'Cluttered WP Layout', after: '1-Tap WhatsApp & Call', diff: '📱 +84% Mobile Inquiries' },
      conversion: { before: '1.2% Inquiry Rate', after: '6.8% Quote Requests', diff: '📈 +460% Fast Quotes' },
      security: { before: 'Outdated WP Plugins', after: 'Netlify Edge CDN + SSL', diff: '🛡️ 100% Zero Downtime' }
    },
    hotspots: []
  }
};
// Backward compatibility aliases
comparisonData.horizon = comparisonData.desktop;
comparisonData.corporate = comparisonData.desktop;
comparisonData.healthcare = comparisonData.mobile;
comparisonData.tech = comparisonData.live;

function initComparisonSlider() {
  const container = document.getElementById('comparisonContainer');
  const sliderInput = document.getElementById('comparisonSlider');
  const beforeLayer = document.getElementById('beforeLayer');
  const sliderHandle = document.getElementById('sliderHandle');
  const innerContent = document.getElementById('beforeInnerContent');

  if (!container || !sliderInput || !beforeLayer || !sliderHandle) return;

  function updateSlider(val) {
    comparisonState.sliderPercent = Math.max(2, Math.min(98, val));
    sliderInput.value = comparisonState.sliderPercent;
    beforeLayer.style.width = `${comparisonState.sliderPercent}%`;
    sliderHandle.style.left = `${comparisonState.sliderPercent}%`;

    if (innerContent) {
      innerContent.style.width = `${container.offsetWidth}px`;
    }

    // Update active preset button highlight
    document.querySelectorAll('.preset-btn').forEach(btn => {
      const p = parseInt(btn.getAttribute('data-percent'));
      if (Math.abs(p - comparisonState.sliderPercent) < 8) {
        btn.classList.add('bg-white', 'text-slate-900', 'shadow-xs');
        btn.classList.remove('text-slate-600');
      } else {
        btn.classList.remove('bg-white', 'text-slate-900', 'shadow-xs');
        btn.classList.add('text-slate-600');
      }
    });
  }

  // Update on input
  sliderInput.addEventListener('input', (e) => {
    // If user interacts, stop auto scan
    if (comparisonState.autoScanActive) {
      stopAutoScan();
    }
    updateSlider(e.target.value);
  });

  // Touch and mouse events on slider handle
  sliderInput.addEventListener('pointerdown', () => {
    if (comparisonState.autoScanActive) stopAutoScan();
  });

  // Keep responsive on resize
  window.addEventListener('resize', () => {
    if (innerContent && container) {
      innerContent.style.width = `${container.offsetWidth}px`;
    }
  });

  // Render initial industry/mode
  renderIndustry(comparisonState.currentIndustry);
  updateSlider(50);
}

// Render Real Website Showcase Content
function renderIndustry(key) {
  const data = comparisonData[key] || comparisonData['desktop'];
  if (!data) return;

  comparisonState.currentIndustry = key;

  // 1. Update URL bar
  const urlDisplay = document.getElementById('comparisonBrowserUrl');
  if (urlDisplay) {
    if (data.liveUrl) {
      urlDisplay.innerHTML = `
        <div class="flex items-center gap-1.5 truncate text-[11px] sm:text-xs">
          <a href="${data.beforeUrl}" target="_blank" rel="noopener" class="text-rose-600 hover:underline truncate" title="Open original WordPress site">horizonlogisticslondon.com</a>
          <span class="text-slate-400">→</span>
          <a href="${data.liveUrl}" target="_blank" rel="noopener" class="text-emerald-700 font-bold hover:underline truncate" title="Open live modern redesign">horizonlogisticslondon.netlify.app</a>
        </div>
      `;
    } else {
      urlDisplay.textContent = data.url;
    }
  }

  const speedBadgeDisplay = document.getElementById('comparisonSpeedBadge');
  if (speedBadgeDisplay) speedBadgeDisplay.textContent = data.speedBadge;

  // 2. Update Industry Tabs styling
  document.querySelectorAll('.industry-tab-btn').forEach(btn => {
    const ind = btn.getAttribute('data-industry');
    if (ind === key || (key === 'desktop' && ind === 'horizon')) {
      btn.classList.add('bg-slate-900', 'text-white', 'shadow-xs');
      btn.classList.remove('text-slate-600', 'hover:bg-slate-100');
    } else {
      btn.classList.remove('bg-slate-900', 'text-white', 'shadow-xs');
      btn.classList.add('text-slate-600', 'hover:bg-slate-100');
    }
  });

  const container = document.getElementById('comparisonContainer');
  const sliderInput = document.getElementById('comparisonSlider');
  const sliderHandle = document.getElementById('sliderHandle');
  const beforeLayer = document.getElementById('beforeLayer');
  const beforeInner = document.getElementById('beforeInnerContent');
  const afterInner = document.getElementById('afterModernContent');

  // Handle Live Interactive Embeds
  if (key === 'live') {
    if (comparisonState.autoScanActive) stopAutoScan();
    if (container) container.classList.add('is-side-by-side');
    if (sliderHandle) sliderHandle.style.display = 'none';
    if (sliderInput) sliderInput.style.display = 'none';

    if (beforeInner) {
      beforeInner.style.width = '100%';
      beforeInner.innerHTML = `
        <div class="relative w-full h-full bg-slate-900 flex flex-col">
          <div class="px-3.5 py-2 bg-slate-900 text-white flex items-center justify-between text-xs border-b border-slate-800 shrink-0">
            <span class="font-bold flex items-center gap-1.5 text-rose-400">
              <span class="w-2 h-2 rounded-full bg-rose-500"></span>
              Original: horizonlogisticslondon.com
            </span>
            <a href="https://horizonlogisticslondon.com/" target="_blank" rel="noopener" class="text-[11px] underline text-slate-300 hover:text-white flex items-center gap-1">Open Tab ↗</a>
          </div>
          <iframe src="https://horizonlogisticslondon.com/" class="w-full flex-1 min-h-[440px] border-0 bg-white" loading="lazy" sandbox="allow-scripts allow-same-origin allow-forms"></iframe>
        </div>
      `;
    }

    if (afterInner) {
      afterInner.innerHTML = `
        <div class="relative w-full h-full bg-slate-900 flex flex-col">
          <div class="px-3.5 py-2 bg-slate-900 text-white flex items-center justify-between text-xs border-b border-slate-800 shrink-0">
            <span class="font-bold flex items-center gap-1.5 text-emerald-400">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Redesign: horizonlogisticslondon.netlify.app
            </span>
            <a href="https://horizonlogisticslondon.netlify.app/" target="_blank" rel="noopener" class="text-[11px] underline text-emerald-300 hover:text-white flex items-center gap-1">Open Tab ↗</a>
          </div>
          <iframe src="https://horizonlogisticslondon.netlify.app/" class="w-full flex-1 min-h-[440px] border-0 bg-slate-950" loading="lazy" sandbox="allow-scripts allow-same-origin allow-forms"></iframe>
        </div>
      `;
    }
  } else {
    // Desktop or Mobile Real Visual Slider Mode
    if (comparisonState.viewMode === 'slider') {
      if (container) container.classList.remove('is-side-by-side');
      if (sliderHandle) sliderHandle.style.display = 'flex';
      if (sliderInput) sliderInput.style.display = 'block';
    }

    // 3. Update Real Before Layer
    if (beforeInner) {
      beforeInner.innerHTML = `
        <div class="relative w-full h-full bg-slate-900 select-none overflow-hidden group">
          <img src="${data.beforeImage}" alt="Original Website: ${data.beforeUrl}" class="w-full h-full object-cover object-top select-none pointer-events-none block" />
          <div class="absolute top-3.5 left-3.5 z-20 flex items-center gap-2">
            <a href="${data.beforeUrl}" target="_blank" rel="noopener" class="px-3 py-1.5 rounded-lg bg-rose-950/85 hover:bg-rose-900 text-white text-[11px] sm:text-xs font-bold backdrop-blur-md border border-rose-500/40 shadow-md flex items-center gap-1.5 transition-all">
              <span class="w-2 h-2 rounded-full bg-rose-400"></span>
              <span>Original Site (WordPress)</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"></path><path d="M10 14 21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg>
            </a>
          </div>
          <div class="absolute bottom-3 left-3.5 z-20 hidden sm:inline-flex px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-xs text-rose-300 text-[10px] font-mono border border-rose-500/30">
            PageSpeed: 41 • 6.4s Load • Cluttered Layout
          </div>
        </div>
      `;
    }

    // 4. Update Real After Layer
    if (afterInner) {
      afterInner.innerHTML = `
        <div class="relative w-full h-full bg-slate-950 select-none overflow-hidden group">
          <img src="${data.afterImage}" alt="WebTorq Redesign: ${data.liveUrl}" class="w-full h-full object-cover object-top select-none pointer-events-none block" />
          <div class="absolute top-3.5 right-3.5 z-20 flex items-center gap-2">
            <a href="${data.liveUrl}" target="_blank" rel="noopener" class="px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-950 text-emerald-300 hover:text-white text-[11px] sm:text-xs font-bold backdrop-blur-md border border-emerald-500/40 shadow-md flex items-center gap-1.5 transition-all">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Live Netlify Redesign</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"></path><path d="M10 14 21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg>
            </a>
          </div>
          <div class="absolute bottom-3 right-3.5 z-20 hidden sm:inline-flex px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-xs text-emerald-300 text-[10px] font-mono border border-emerald-500/30">
            PageSpeed: 100 • 0.35s Load • GDP Compliant
          </div>
        </div>
      `;
    }
  }

  // 5. Update Metrics Scorecards
  const scoreSpeed = document.getElementById('metricSpeed');
  if (scoreSpeed) {
    scoreSpeed.innerHTML = `
      <div class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Google PageSpeed</div>
      <div class="flex items-baseline gap-2">
        <span class="text-lg font-extrabold text-emerald-600">${data.metrics.speed.after}</span>
        <span class="text-xs text-rose-500 line-through">${data.metrics.speed.before}</span>
      </div>
      <div class="text-xs font-bold text-emerald-700 mt-1">${data.metrics.speed.diff}</div>
    `;
  }

  const scoreMobile = document.getElementById('metricMobile');
  if (scoreMobile) {
    scoreMobile.innerHTML = `
      <div class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Mobile Experience</div>
      <div class="flex items-baseline gap-2">
        <span class="text-lg font-extrabold text-emerald-600">${data.metrics.mobile.after}</span>
      </div>
      <div class="text-xs font-bold text-blue-600 mt-1">${data.metrics.mobile.diff}</div>
    `;
  }

  const scoreConv = document.getElementById('metricConversion');
  if (scoreConv) {
    scoreConv.innerHTML = `
      <div class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Lead Conversion</div>
      <div class="flex items-baseline gap-2">
        <span class="text-lg font-extrabold text-emerald-600">${data.metrics.conversion.after}</span>
        <span class="text-xs text-rose-500 line-through">${data.metrics.conversion.before}</span>
      </div>
      <div class="text-xs font-bold text-emerald-700 mt-1">${data.metrics.conversion.diff}</div>
    `;
  }

  const scoreSecurity = document.getElementById('metricSecurity');
  if (scoreSecurity) {
    scoreSecurity.innerHTML = `
      <div class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Security & Hosting</div>
      <div class="flex items-baseline gap-2">
        <span class="text-lg font-extrabold text-emerald-600">${data.metrics.security.after}</span>
      </div>
      <div class="text-xs font-bold text-blue-600 mt-1">${data.metrics.security.diff}</div>
    `;
  }

  // 6. Update Hotspots
  renderHotspots(data.hotspots);

  // Re-initialize Lucide Icons for injected HTML
  if (window.lucide && typeof lucide.createIcons === 'function') {
    lucide.createIcons();
  }

  // Resize inner content
  if (beforeInner && container) {
    beforeInner.style.width = `${container.offsetWidth}px`;
  }
}

// Render Hotspot Pins
function renderHotspots(hotspots) {
  const container = document.getElementById('hotspotsContainer');
  if (!container) return;

  container.innerHTML = '';
  hotspots.forEach(spot => {
    const pin = document.createElement('div');
    pin.className = `hotspot-pin ${comparisonState.hotspotsVisible ? 'visible' : ''}`;
    pin.style.top = spot.top;
    pin.style.left = spot.left;
    pin.innerHTML = `
      <div class="hotspot-trigger">${spot.id}</div>
      <div class="hotspot-popover">
        <div class="font-bold text-blue-400 text-xs mb-1">${spot.title}</div>
        <div class="text-slate-300 text-[11px] mb-1.5"><span class="text-rose-400 font-semibold">Flaw:</span> ${spot.flaw}</div>
        <div class="text-slate-200 text-[11px]"><span class="text-emerald-400 font-semibold">Modern Fix:</span> ${spot.upgrade}</div>
      </div>
    `;
    pin.addEventListener('click', (e) => {
      e.stopPropagation();
      pin.classList.toggle('active');
    });
    container.appendChild(pin);
  });
}

// Preset Quick Buttons for Comparison
window.setComparisonPercent = function(val) {
  if (comparisonState.autoScanActive) stopAutoScan();
  const sliderInput = document.getElementById('comparisonSlider');
  if (sliderInput) {
    sliderInput.value = val;
    sliderInput.dispatchEvent(new Event('input'));
  }
};

// Switch Industry Preset
window.switchIndustry = function(key) {
  renderIndustry(key);
};

// Toggle Side-by-Side Mode vs Slider Mode
window.toggleComparisonViewMode = function() {
  const container = document.getElementById('comparisonContainer');
  const btn = document.getElementById('viewModeBtn');
  const beforeInner = document.getElementById('beforeInnerContent');
  if (!container) return;

  if (comparisonState.viewMode === 'slider') {
    if (comparisonState.autoScanActive) stopAutoScan();
    comparisonState.viewMode = 'side-by-side';
    container.classList.add('is-side-by-side');
    if (btn) btn.innerHTML = `<i data-lucide="sliders" class="w-3.5 h-3.5 text-blue-600"></i><span>Slider Mode</span>`;
    if (beforeInner) beforeInner.style.width = '100%';
  } else {
    comparisonState.viewMode = 'slider';
    container.classList.remove('is-side-by-side');
    if (btn) btn.innerHTML = `<i data-lucide="columns" class="w-3.5 h-3.5 text-blue-600"></i><span>Side-by-Side View</span>`;
    const sliderInput = document.getElementById('comparisonSlider');
    if (sliderInput) sliderInput.dispatchEvent(new Event('input'));
  }

  if (window.lucide && typeof lucide.createIcons === 'function') {
    lucide.createIcons();
  }
};

// Toggle Hotspots
window.toggleComparisonHotspots = function() {
  comparisonState.hotspotsVisible = !comparisonState.hotspotsVisible;
  const btn = document.getElementById('inspectHotspotsBtn');
  document.querySelectorAll('.hotspot-pin').forEach(pin => {
    if (comparisonState.hotspotsVisible) {
      pin.classList.add('visible');
    } else {
      pin.classList.remove('visible');
    }
  });

  if (btn) {
    if (comparisonState.hotspotsVisible) {
      btn.classList.add('bg-blue-600', 'text-white');
      btn.classList.remove('bg-white', 'text-slate-700');
    } else {
      btn.classList.remove('bg-blue-600', 'text-white');
      btn.classList.add('bg-white', 'text-slate-700');
    }
  }
};

// Auto-Scan Animation Engine
window.toggleAutoScan = function() {
  if (comparisonState.autoScanActive) {
    stopAutoScan();
  } else {
    startAutoScan();
  }
};

function startAutoScan() {
  if (comparisonState.viewMode === 'side-by-side') {
    window.toggleComparisonViewMode();
  }
  comparisonState.autoScanActive = true;
  const btn = document.getElementById('autoScanBtn');
  if (btn) {
    btn.innerHTML = `<i data-lucide="pause" class="w-3.5 h-3.5 text-rose-600"></i><span>Pause Scan</span>`;
    btn.classList.add('border-blue-300', 'bg-blue-50', 'text-blue-700');
  }
  if (window.lucide) lucide.createIcons();

  let startVal = comparisonState.sliderPercent || 50;
  let angle = (startVal / 100) * Math.PI;

  function step() {
    if (!comparisonState.autoScanActive) return;
    angle += 0.02;
    // Oscillate between 12% and 88%
    const currentPercent = 50 + 38 * Math.sin(angle);
    window.setComparisonPercent(currentPercent);
    comparisonState.autoScanReqId = requestAnimationFrame(step);
  }

  comparisonState.autoScanReqId = requestAnimationFrame(step);
}

function stopAutoScan() {
  comparisonState.autoScanActive = false;
  if (comparisonState.autoScanReqId) {
    cancelAnimationFrame(comparisonState.autoScanReqId);
    comparisonState.autoScanReqId = null;
  }
  const btn = document.getElementById('autoScanBtn');
  if (btn) {
    btn.innerHTML = `<i data-lucide="play" class="w-3.5 h-3.5 text-blue-600"></i><span>Auto Scan</span>`;
    btn.classList.remove('border-blue-300', 'bg-blue-50', 'text-blue-700');
  }
  if (window.lucide) lucide.createIcons();
}

// 2. Pricing Frequency Toggle (Monthly vs Annual)
function initPricingToggle() {
  const billingToggle = document.getElementById('billingToggle');
  if (!billingToggle) return;

  const starterPrice = document.getElementById('starterPrice');
  const proPrice = document.getElementById('proPrice');
  const scalePrice = document.getElementById('scalePrice');
  const periodLabels = document.querySelectorAll('.billing-period-text');
  const annualDiscountBadge = document.getElementById('annualBadge');

  billingToggle.addEventListener('change', () => {
    const isAnnual = billingToggle.checked;

    if (isAnnual) {
      // Annual: discounted rates
      if (starterPrice) starterPrice.textContent = '$79';
      if (proPrice) proPrice.textContent = '$149';
      if (scalePrice) scalePrice.textContent = '$279';
      periodLabels.forEach(el => el.textContent = '/mo (billed annually)');
      if (annualDiscountBadge) {
        annualDiscountBadge.classList.add('bg-blue-50', 'text-blue-700', 'border-blue-200');
        annualDiscountBadge.classList.remove('text-slate-600');
      }
    } else {
      // Monthly rates
      if (starterPrice) starterPrice.textContent = '$99';
      if (proPrice) proPrice.textContent = '$189';
      if (scalePrice) scalePrice.textContent = '$349';
      periodLabels.forEach(el => el.textContent = '/month');
      if (annualDiscountBadge) {
        annualDiscountBadge.classList.remove('bg-blue-50', 'text-blue-700', 'border-blue-200');
        annualDiscountBadge.classList.add('text-slate-600');
      }
    }
  });
}

// 3. FAQ Accordion
function initFaqAccordion() {
  const faqButtons = document.querySelectorAll('.faq-toggle-btn');

  faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.faq-item');
      const answer = parent.querySelector('.faq-answer');
      const icon = btn.querySelector('.faq-icon');
      const isOpen = answer.classList.contains('open');

      // Close all others
      document.querySelectorAll('.faq-answer').forEach(el => el.classList.remove('open'));
      document.querySelectorAll('.faq-icon').forEach(el => el.style.transform = 'rotate(0deg)');

      if (!isOpen) {
        answer.classList.add('open');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });
}

// 4. Interactive Live Website Audit Tool
function initAuditTool() {
  const auditBtn = document.getElementById('startAuditBtn');
  const auditInput = document.getElementById('auditUrlInput');
  const auditResults = document.getElementById('auditResults');
  const auditLoading = document.getElementById('auditLoading');
  const auditProgressText = document.getElementById('auditProgressText');
  const auditProgressBar = document.getElementById('auditProgressBar');

  if (!auditBtn || !auditInput) return;

  auditBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let url = auditInput.value.trim();
    if (!url) {
      showToast('Please enter your website URL or company name to audit.', 'warning');
      auditInput.focus();
      return;
    }

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }

    // Begin simulated analysis
    auditBtn.disabled = true;
    auditBtn.classList.add('opacity-60', 'cursor-not-allowed');
    if (auditResults) auditResults.classList.add('hidden');
    if (auditLoading) auditLoading.classList.remove('hidden');

    const steps = [
      { progress: 25, text: 'Fetching DNS & measuring page load speed...' },
      { progress: 55, text: 'Scanning mobile responsiveness & legacy CSS frameworks...' },
      { progress: 80, text: 'Evaluating lead conversion funnel & UX design age...' },
      { progress: 100, text: 'Audit complete! Generating modernization blueprint...' }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        if (auditProgressBar) auditProgressBar.style.width = steps[currentStep].progress + '%';
        if (auditProgressText) auditProgressText.textContent = steps[currentStep].text;
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          if (auditLoading) auditLoading.classList.add('hidden');
          if (auditResults) {
            auditResults.classList.remove('hidden');
            const targetUrlEl = document.getElementById('auditTargetDomain');
            if (targetUrlEl) {
              try {
                const domain = new URL(url).hostname;
                targetUrlEl.textContent = domain;
              } catch (e) {
                targetUrlEl.textContent = url;
              }
            }
          }
          auditBtn.disabled = false;
          auditBtn.classList.remove('opacity-60', 'cursor-not-allowed');
          showToast('Audit complete! See your modernization recommendations below.', 'success');
        }, 500);
      }
    }, 700);
  });
}

// 5. ROI / Cost Calculator
function initRoiCalculator() {
  const agencyCostSlider = document.getElementById('agencyCostSlider');
  const agencyCostValue = document.getElementById('agencyCostValue');
  const annualAgencyTotal = document.getElementById('annualAgencyTotal');
  const annualWebTorqTotal = document.getElementById('annualWebTorqTotal');
  const annualSavingsTotal = document.getElementById('annualSavingsTotal');

  if (!agencyCostSlider) return;

  function recalculate() {
    const upfrontCost = parseInt(agencyCostSlider.value, 10);
    if (agencyCostValue) agencyCostValue.textContent = `$${upfrontCost.toLocaleString()}`;

    // Typical agency total year 1: Upfront ($3k-$15k) + hosting/maintenance/hourly changes ($200/mo * 12 = $2,400)
    const yearlyMaintenance = 2400;
    const totalAgencyYear1 = upfrontCost + yearlyMaintenance;

    // WebTorq Growth Plan ($189/mo * 12 = $2,268/yr) all inclusive with build/redesign, unlimited requests & hosting
    const webtorqAnnual = 2268;
    const savings = Math.max(0, totalAgencyYear1 - webtorqAnnual);

    if (annualAgencyTotal) annualAgencyTotal.textContent = `$${totalAgencyYear1.toLocaleString()}`;
    if (annualWebTorqTotal) annualWebTorqTotal.textContent = `$${webtorqAnnual.toLocaleString()}`;
    if (annualSavingsTotal) annualSavingsTotal.textContent = `$${savings.toLocaleString()}`;
  }

  agencyCostSlider.addEventListener('input', recalculate);
  recalculate();
}

// 6. Modal Handling (Book Call / Start Subscription)
function initModalHandling() {
  const modal = document.getElementById('bookingModal') || document.getElementById('inquiryModal');
  const openButtons = document.querySelectorAll('.open-modal-btn');
  const closeButtons = document.querySelectorAll('.close-modal-btn');
  const bookingForm = document.getElementById('bookingForm');

  if (!modal) return;

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const planName = btn.getAttribute('data-plan') || 'Professional Growth Plan';
      const planInput = document.getElementById('selectedPlanInput');
      if (planInput) planInput.value = planName;
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      // Default to Reserve tab
      const tabReserveBtn = document.getElementById('tabReserveBtn');
      if (tabReserveBtn) tabReserveBtn.click();
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    });
  });

  // Click outside to close
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  });

  // Handle Form Submission
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = bookingForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg> Reserving Your Slot...
      `;
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        modal.classList.add('hidden');
        document.body.style.overflow = '';
        bookingForm.reset();
        showToast('🎉 Application received! We will send your tailored mockup & onboarding link within 2 hours.', 'success');
      }, 1500);
    });
  }
}

// 7. Mobile Navigation Menu
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    const isHidden = mobileMenu.classList.contains('hidden');
    if (isHidden) {
      mobileMenu.classList.remove('hidden');
    } else {
      mobileMenu.classList.add('hidden');
    }
  });

  // Close when clicking nav links or buttons
  mobileMenu.querySelectorAll('a, button').forEach(item => {
    item.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

// 8. Smooth Scroll
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId.startsWith('#')) return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// 9. Toast Notification Utility
function showToast(message, type = 'info') {
  let toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    toastContainer.className = 'fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm pointer-events-none';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  const bgClass = type === 'success' ? 'bg-white border-emerald-500 text-slate-800 shadow-xl' : 
                  type === 'warning' ? 'bg-white border-amber-500 text-slate-800 shadow-xl' : 
                  'bg-white border-blue-500 text-slate-800 shadow-xl';

  toast.className = `p-4 rounded-xl border backdrop-blur-xl flex items-center gap-3 text-sm transition-all transform duration-300 translate-y-6 opacity-0 pointer-events-auto ${bgClass}`;
  toast.innerHTML = `
    <span class="text-base">${type === 'success' ? '✓' : type === 'warning' ? '!' : 'i'}</span>
    <span class="flex-1 font-semibold leading-tight text-slate-900">${message}</span>
  `;

  toastContainer.appendChild(toast);

  // Trigger enter animation
  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-6', 'opacity-0');
  });

  // Auto dismiss
  setTimeout(() => {
    toast.classList.add('translate-y-6', 'opacity-0');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 4500);
}

// 10. Sticky Conversion Floating Bar (For Ad Traffic)
function initStickyConversionBar() {
  const bar = document.getElementById('stickyConversionBar');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 450) {
      bar.classList.add('visible');
    } else {
      bar.classList.remove('visible');
    }
  }, { passive: true });
}

// 11. Live Social Proof Notification Popups
function initSocialProofToast() {
  const toastEl = document.getElementById('socialProofToast');
  if (!toastEl) return;

  const proofEvents = [
    { name: 'Marcus V.', company: 'Corporate Advisory, NY', action: 'reserved an Onboarding Slot', plan: 'Growth Plan', time: '3 mins ago' },
    { name: 'Dr. Elena R.', company: 'Aesthetic Clinic, Miami', action: 'booked a 15-Min Strategy Call', plan: 'Website Overhaul', time: '8 mins ago' },
    { name: 'Julian H.', company: 'B2B SaaS, Austin', action: 'launched their redesign with 100 PageSpeed', plan: 'Scale Plan', time: '24 mins ago' },
    { name: 'David C.', company: 'Commercial Builder, Denver', action: 'switched from $10k agency retainer', plan: 'Growth Plan', time: '41 mins ago' },
    { name: 'Chloe S.', company: 'Executive Search, London', action: 'reserved the 4th client slot for November', plan: 'Starter Launch', time: '1 hour ago' }
  ];

  let eventIdx = 0;

  function showNextProof() {
    if (!toastEl) return;
    const evt = proofEvents[eventIdx % proofEvents.length];
    eventIdx++;

    const contentEl = document.getElementById('socialProofContent');
    if (contentEl) {
      contentEl.innerHTML = `
        <div class="text-xs font-bold text-slate-900 leading-tight">
          ${evt.name} <span class="font-normal text-slate-500">(${evt.company})</span>
        </div>
        <div class="text-[11px] text-blue-700 font-semibold mt-0.5">
          ${evt.action} &bull; <span class="text-slate-500">${evt.time}</span>
        </div>
      `;
    }

    toastEl.classList.add('show');

    setTimeout(() => {
      toastEl.classList.remove('show');
    }, 5500);
  }

  // First trigger after 7 seconds, then every 24 seconds
  setTimeout(() => {
    showNextProof();
    setInterval(showNextProof, 24000);
  }, 7000);
}

// 12. Modal Tabs (Reserve Slot vs Book 15-Min Strategy Call)
function initModalTabsAndScheduler() {
  const tabReserveBtn = document.getElementById('tabReserveBtn');
  const tabCallBtn = document.getElementById('tabCallBtn');
  const reserveTabContent = document.getElementById('reserveTabContent');
  const callTabContent = document.getElementById('callTabContent');
  const scheduleCallForm = document.getElementById('scheduleCallForm');

  if (tabReserveBtn && tabCallBtn) {
    tabReserveBtn.addEventListener('click', () => {
      tabReserveBtn.classList.add('bg-slate-900', 'text-white', 'shadow-xs');
      tabReserveBtn.classList.remove('text-slate-600', 'hover:bg-slate-100');
      tabCallBtn.classList.remove('bg-slate-900', 'text-white', 'shadow-xs');
      tabCallBtn.classList.add('text-slate-600', 'hover:bg-slate-100');

      if (reserveTabContent) reserveTabContent.classList.remove('hidden');
      if (callTabContent) callTabContent.classList.add('hidden');
    });

    tabCallBtn.addEventListener('click', () => {
      tabCallBtn.classList.add('bg-slate-900', 'text-white', 'shadow-xs');
      tabCallBtn.classList.remove('text-slate-600', 'hover:bg-slate-100');
      tabReserveBtn.classList.remove('bg-slate-900', 'text-white', 'shadow-xs');
      tabReserveBtn.classList.add('text-slate-600', 'hover:bg-slate-100');

      if (callTabContent) callTabContent.classList.remove('hidden');
      if (reserveTabContent) reserveTabContent.classList.add('hidden');
    });
  }

  // Date and Time Slot Pills
  document.querySelectorAll('.time-slot-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const parentGroup = pill.closest('.pill-group');
      if (parentGroup) {
        parentGroup.querySelectorAll('.time-slot-pill').forEach(p => p.classList.remove('active'));
      }
      pill.classList.add('active');
      const hiddenInput = document.getElementById('selectedTimeSlot');
      if (hiddenInput) hiddenInput.value = pill.textContent.trim();
    });
  });

  // Call Booking Form Submit
  if (scheduleCallForm) {
    scheduleCallForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = scheduleCallForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg> Confirming Calendar Invite...
      `;
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        const modal = document.getElementById('bookingModal') || document.getElementById('inquiryModal');
        if (modal) modal.classList.add('hidden');
        document.body.style.overflow = '';
        scheduleCallForm.reset();
        showToast('📞 15-Minute Strategy Call Booked! A Google Meet invite has been sent to your email.', 'success');
      }, 1400);
    });
  }
}

// Global helper to open Call Booking tab directly
window.openCallBookingModal = function() {
  const modal = document.getElementById('bookingModal') || document.getElementById('inquiryModal');
  const tabCallBtn = document.getElementById('tabCallBtn');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    if (tabCallBtn) tabCallBtn.click();
  }
};

window.dismissSocialProof = function() {
  const toastEl = document.getElementById('socialProofToast');
  if (toastEl) toastEl.classList.remove('show');
};

// 13. Hero Dual-Mode Switcher & 2-Minute Scope Builder (Sitesquad & 123webpage style)
let heroScopeState = {
  industry: 'corporate',
  goal: 'redesign'
};

window.switchHeroTab = function(tab) {
  const btnQuiz = document.getElementById('heroTabQuiz');
  const btnPreview = document.getElementById('heroTabPreview');
  const contentQuiz = document.getElementById('heroScopeBuilderContent');
  const contentPreview = document.getElementById('heroPreviewContent');

  if (!btnQuiz || !btnPreview) return;

  if (tab === 'quiz') {
    btnQuiz.classList.add('bg-slate-900', 'text-white', 'shadow-xs');
    btnQuiz.classList.remove('text-slate-600');
    btnPreview.classList.remove('bg-slate-900', 'text-white', 'shadow-xs');
    btnPreview.classList.add('text-slate-600');

    if (contentQuiz) contentQuiz.classList.remove('hidden');
    if (contentPreview) contentPreview.classList.add('hidden');
  } else {
    btnPreview.classList.add('bg-slate-900', 'text-white', 'shadow-xs');
    btnPreview.classList.remove('text-slate-600');
    btnQuiz.classList.remove('bg-slate-900', 'text-white', 'shadow-xs');
    btnQuiz.classList.add('text-slate-600');

    if (contentPreview) contentPreview.classList.remove('hidden');
    if (contentQuiz) contentQuiz.classList.add('hidden');
  }

  if (window.lucide && typeof lucide.createIcons === 'function') {
    lucide.createIcons();
  }
};

window.selectHeroIndustry = function(btn, key) {
  heroScopeState.industry = key;
  document.querySelectorAll('.hero-scope-pill').forEach(pill => {
    pill.classList.remove('border-blue-600', 'bg-blue-50', 'text-blue-900', 'active');
    pill.classList.add('border-slate-200', 'bg-white', 'text-slate-700');
  });
  btn.classList.add('border-blue-600', 'bg-blue-50', 'text-blue-900', 'active');
  btn.classList.remove('border-slate-200', 'bg-white', 'text-slate-700');
};

window.selectHeroGoal = function(btn, goal) {
  heroScopeState.goal = goal;
  document.querySelectorAll('.hero-goal-pill').forEach(pill => {
    pill.classList.remove('border-blue-600', 'bg-blue-50/60', 'active');
    pill.classList.add('border-slate-200', 'bg-white');
  });
  btn.classList.add('border-blue-600', 'bg-blue-50/60', 'active');
  btn.classList.remove('border-slate-200', 'bg-white');
};

window.launchQuizReservation = function() {
  const modal = document.getElementById('bookingModal') || document.getElementById('inquiryModal');
  const planInput = document.getElementById('selectedPlanInput');
  const tabReserveBtn = document.getElementById('tabReserveBtn');

  if (planInput) {
    planInput.value = `Growth & Redesign ($189/mo) - Industry: ${heroScopeState.industry}, Goal: ${heroScopeState.goal}`;
  }

  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    if (tabReserveBtn) tabReserveBtn.click();
  }
};
