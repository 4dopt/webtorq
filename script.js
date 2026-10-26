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
});

// 1. Interactive Before / After Comparison Slider Engine
let comparisonState = {
  currentIndustry: 'corporate',
  viewMode: 'slider', // 'slider' or 'side-by-side'
  autoScanActive: false,
  autoScanReqId: null,
  autoScanDirection: 1,
  hotspotsVisible: false,
  sliderPercent: 50
};

const comparisonData = {
  corporate: {
    name: 'Sterling Advisory Group',
    url: 'https://sterling-advisory-group.com',
    speedBadge: '100 PageSpeed • 0.3s Load',
    securityBadge: 'SOC-2 Type II Certified',
    before: {
      marquee: '*** STERLING ADVISORY ASSOCIATES LLC - WELCOME TO OUR WEB PORTAL ***',
      logo: 'STERLING ADVISORY LLC',
      tagline: '"Providing Corporate Advice Since 2003"',
      nav: ['HOME', 'ABOUT_US.HTM', 'SERVICES', 'FAX_INQUIRY', 'CONTACT'],
      alert: 'NOTICE: Please call our office between 9am - 4pm EST or fax to (555) 019-2831',
      title: 'General Management & Executive Consulting Solutions',
      body: 'We offer financial advice and business restructuring packages. To inquire, please download our 12-page consultation application document (.PDF) and fax to our New York office.',
      btn: 'Download PDF Application (4.2 MB)',
      speedTag: 'Page Speed: 6.8s (Grade F) • HTTP Insecure',
      counter: '004,821',
      year: '2011'
    },
    after: {
      initials: 'S',
      brand: 'Sterling Advisory',
      accentWord: 'Advisory',
      nav: ['Expertise', 'Case Studies', 'Partners', 'Insights'],
      pill: 'Institutional Advisory & M&A Support',
      title: 'Strategic Precision For Mid-Market Corporate Growth.',
      body: 'We guide corporate executives and private founders through mergers, restructuring, and balance sheet optimization with trusted institutional expertise.',
      primaryBtn: 'Request Consultation &rarr;',
      secondaryBtn: 'View Client Results',
      cardTitle: 'Portfolio Advisory Value',
      cardVal: '$240M+',
      cardMetricTitle: 'Client Inquiry Conversion',
      cardMetricVal: '+175%',
      cardFeature: 'Optimized for fast mobile booking & high trust',
      trustBadge: 'Fully Certified • SOC-2 Type II Compliant'
    },
    metrics: {
      speed: { before: '28/100 (6.8s)', after: '99/100 (0.4s)', diff: '⚡ 17x Faster' },
      mobile: { before: 'Broken Layout', after: '100% Fluid Native', diff: '📱 0 Pinch Zoom' },
      conversion: { before: '0.7% Fax/Calls', after: '4.8% Bookings', diff: '📈 +520% Inquiries' },
      security: { before: 'HTTP / PHP 5.4', after: 'Edge CDN + SSL A+', diff: '🛡️ Zero Exploits' }
    },
    hotspots: [
      { id: 1, top: '15%', left: '72%', title: 'Streamlined Navigation', flaw: 'Before: 14 cluttered links with no clear next step', upgrade: 'After: 4 core navigation paths + primary consultation button' },
      { id: 2, top: '42%', left: '26%', title: 'Authority Value Prop', flaw: 'Before: Dense paragraph with generic consulting jargon', upgrade: 'After: Crisp value proposition tailored to C-suite decision makers' },
      { id: 3, top: '48%', left: '78%', title: 'Verified Proof Card', flaw: 'Before: Zero social proof or transaction evidence', upgrade: 'After: Real-time portfolio advisory volume & conversion metrics' },
      { id: 4, top: '85%', left: '30%', title: 'Instant Online Booking', flaw: 'Before: 12-page printable PDF that required a fax machine', upgrade: 'After: Frictionless 1-click scheduling synced to executive calendars' }
    ]
  },
  healthcare: {
    name: 'Apex Dental & Smile Studio',
    url: 'https://apexdentalcare.com',
    speedBadge: '100 PageSpeed • 0.3s Load',
    securityBadge: 'HIPAA Compliant & Encrypted',
    before: {
      marquee: '*** APEX FAMILY DENTISTRY & ORTHODONTICS - DR. ROBERT D. SMITH, DDS ***',
      logo: 'APEX DENTAL CLINIC',
      tagline: '"Caring For Smiles In Town Since 1998"',
      nav: ['HOME', 'SERVICES', 'MEET_DR_BOB', 'DIRECTIONS_MAP', 'RULES'],
      alert: '⚠️ NOTICE: Arrive 45 mins early to fill out paper intake forms in the waiting room',
      title: 'Family Dental Care, Cleanings & Root Canal Procedures',
      body: 'Welcome to our clinic website. We are currently experiencing heavy phone line traffic. To book, please call during morning desk hours or download our new patient paperwork to print at home.',
      btn: 'Download Patient Forms (.DOC)',
      speedTag: 'Page Speed: 7.2s (Grade F) • Not Mobile Friendly',
      counter: '014,319',
      year: '2010'
    },
    after: {
      initials: 'A',
      brand: 'Apex Dental',
      accentWord: 'Smiles',
      nav: ['Cosmetic Care', 'Implants', 'Emergency', 'Insurance Check'],
      pill: 'Top-Rated Cosmetic & Family Dentistry',
      title: 'Effortless Modern Dentistry Designed For Confident Smiles.',
      body: 'Experience pain-free treatments, zero waiting room paperwork, and 3D digital imaging. In-network with all major PPO insurance plans with instant digital check-in.',
      primaryBtn: 'Book Appointment Online &rarr;',
      secondaryBtn: 'Explore Smile Gallery',
      cardTitle: 'Patient Satisfaction Score',
      cardVal: '4.9 ★★★★★',
      cardMetricTitle: 'Average Clinic Wait Time',
      cardMetricVal: '< 3 Mins',
      cardFeature: 'Instant digital check-in & automated SMS reminders',
      trustBadge: 'HIPAA Compliant • 3D Guided Dental Tech'
    },
    metrics: {
      speed: { before: '24/100 (7.2s)', after: '100/100 (0.3s)', diff: '⚡ 24x Faster' },
      mobile: { before: 'Pinch & Scroll', after: '1-Tap Mobile Booking', diff: '📱 +72% Mobile Users' },
      conversion: { before: '0.9% Phone Calls', after: '6.4% Online Bookings', diff: '📈 +610% Bookings' },
      security: { before: 'Unencrypted HTTP', after: 'HIPAA & SSL Verified', diff: '🛡️ Patient Data Safe' }
    },
    hotspots: [
      { id: 1, top: '15%', left: '72%', title: '1-Click Booking Widget', flaw: 'Before: Forced patients to call during narrow receptionist hours', upgrade: 'After: 24/7 instant booking with real-time chair availability' },
      { id: 2, top: '42%', left: '26%', title: 'Patient-First Copywriting', flaw: 'Before: Intimidating list of dental surgeries & clinical jargon', upgrade: 'After: Warm, trust-building copy focusing on comfort & pain-free care' },
      { id: 3, top: '48%', left: '78%', title: '5-Star Google Social Proof', flaw: 'Before: No ratings or patient testimonials shown', upgrade: 'After: Verified 4.9-star rating badge from 480+ local patients' },
      { id: 4, top: '85%', left: '30%', title: 'Zero Waiting Room Paperwork', flaw: 'Before: Demanded printing multi-page paper forms at home', upgrade: 'After: 60-second mobile intake form sent straight to patient phones' }
    ]
  },
  tech: {
    name: 'CloudSync Data Platform',
    url: 'https://cloudsync-systems.io',
    speedBadge: '99.999% SLA • 0.35s Load',
    securityBadge: 'SOC-2 Type II & GDPR Ready',
    before: {
      marquee: '*** CLOUDSYNC ENTERPRISE HOSTING & LINUX VPS STORAGE INC ***',
      logo: 'CLOUDSYNC SYSTEMS CORP',
      tagline: '"Dedicated Server Co-Location & Backup Scripts"',
      nav: ['OVERVIEW', 'SERVER_SPECS', 'CPANEL_ACCESS', 'SSH_KEYS', 'TICKETS'],
      alert: 'ALERT: Open a support ticket to request custom enterprise pricing (allow 3 business days)',
      title: 'Managed VPS Cloud Servers, Dedicated Co-Location & Backups',
      body: 'We configure dedicated server racks manually with custom Apache & MySQL installations. To obtain custom pricing, download our 22-page configuration RFP and email sales@cloudsync-servers.net.',
      btn: 'Download Server Spec RFP (.XLSX)',
      speedTag: 'Page Speed: 8.1s (Grade F) • Expired SSL Certificate',
      counter: '009,871',
      year: '2012'
    },
    after: {
      initials: 'C',
      brand: 'CloudSync',
      accentWord: 'Platform',
      nav: ['Infrastructure', 'Integrations', 'Benchmarks', 'Enterprise'],
      pill: 'Next-Gen Real-Time Data Pipeline',
      title: 'Deploy Scalable Cloud Infrastructure in Minutes, Not Weeks.',
      body: 'Connect your databases, automate streaming pipelines, and scale to millions of concurrent events with zero DevOps overhead and sub-10ms global latency.',
      primaryBtn: 'Start Free 14-Day Sandbox &rarr;',
      secondaryBtn: 'Read Benchmark Report',
      cardTitle: 'Global Pipeline Throughput',
      cardVal: '1.8M Events/s',
      cardMetricTitle: 'Global Query P99 Latency',
      cardMetricVal: '< 12ms',
      cardFeature: 'Native GitOps deployment & automated schema sync',
      trustBadge: 'Sub-millisecond Edge Mesh • SOC-2 Type II Certified'
    },
    metrics: {
      speed: { before: '31/100 (8.1s)', after: '99/100 (0.35s)', diff: '⚡ 23x Faster' },
      mobile: { before: '0% Mobile Usable', after: '100% Responsive Bento UI', diff: '📱 Clean On Any Screen' },
      conversion: { before: '0.5% Slow Sales RFPs', after: '4.2% Self-Serve Trials', diff: '📈 +740% Free Trials' },
      security: { before: 'Expired SSL / HTTP', after: 'Enterprise Zero-Trust', diff: '🛡️ SOC-2 Type II' }
    },
    hotspots: [
      { id: 1, top: '15%', left: '72%', title: 'Frictionless Self-Serve Trial', flaw: 'Before: Forced a 3-day turnaround RFP sales quote process', upgrade: 'After: Immediate 1-click sandbox deployment with zero credit card required' },
      { id: 2, top: '42%', left: '26%', title: 'Modern Developer Headline', flaw: 'Before: Dense wall of text describing manual server specs', upgrade: 'After: High-impact developer-focused messaging emphasizing velocity' },
      { id: 3, top: '48%', left: '78%', title: 'Live Performance Metrics', flaw: 'Before: Vague claims with zero concrete latency or uptime data', upgrade: 'After: Verified 1.8M events/s throughput & sub-12ms P99 latency stats' },
      { id: 4, top: '85%', left: '30%', title: 'Automated Developer GitOps', flaw: 'Before: Manual SSH configurations and archaic cPanel screens', upgrade: 'After: Modern GitOps native workflow with edge deployment automation' }
    ]
  }
};

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

  // Render initial industry
  renderIndustry(comparisonState.currentIndustry);
  updateSlider(50);
}

// Render Industry Showcase Content
function renderIndustry(key) {
  const data = comparisonData[key];
  if (!data) return;

  comparisonState.currentIndustry = key;

  // 1. Update URL bar
  const urlDisplay = document.getElementById('comparisonBrowserUrl');
  if (urlDisplay) urlDisplay.textContent = data.url;

  const speedBadgeDisplay = document.getElementById('comparisonSpeedBadge');
  if (speedBadgeDisplay) speedBadgeDisplay.textContent = data.speedBadge;

  // 2. Update Industry Tabs styling
  document.querySelectorAll('.industry-tab-btn').forEach(btn => {
    const ind = btn.getAttribute('data-industry');
    if (ind === key) {
      btn.classList.add('bg-slate-900', 'text-white', 'shadow-xs');
      btn.classList.remove('text-slate-600', 'hover:bg-slate-100');
    } else {
      btn.classList.remove('bg-slate-900', 'text-white', 'shadow-xs');
      btn.classList.add('text-slate-600', 'hover:bg-slate-100');
    }
  });

  // 3. Update Retro Before Layer Content
  const beforeInner = document.getElementById('beforeInnerContent');
  if (beforeInner) {
    const navLinks = data.before.nav.map(n => `<a href="#" onclick="return false;" class="text-blue-800 underline hover:text-blue-600">${n}</a>`).join(' &bull; ');
    beforeInner.innerHTML = `
      <div>
        <div class="retro-marquee flex items-center justify-between">
          <span>${data.before.marquee}</span>
          <span class="retro-blink text-red-600 font-bold uppercase text-[10px]">⚠️ LEGACY SITE</span>
        </div>
        <header class="p-3 sm:p-4 mt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between border-b-2 border-yellow-600">
          <div>
            <div class="text-lg sm:text-xl font-bold tracking-wider text-yellow-300 uppercase font-serif">
              ${data.before.logo}
            </div>
            <div class="text-[10px] text-slate-200 italic">${data.before.tagline}</div>
          </div>
          <div class="mt-2 sm:mt-0 text-[11px] text-white flex flex-wrap gap-2">
            ${navLinks}
          </div>
        </header>
      </div>

      <div class="my-auto py-5 space-y-3">
        <div class="inline-block bg-red-800 text-white text-[10px] sm:text-[11px] font-bold px-2.5 py-1 border border-black">
          ${data.before.alert}
        </div>
        <h3 class="text-xl sm:text-3xl font-bold text-slate-900 leading-snug font-serif">
          ${data.before.title}
        </h3>
        <p class="text-xs sm:text-sm text-gray-800 leading-relaxed font-serif max-w-xl">
          ${data.before.body}
        </p>
        
        <div class="pt-2 flex flex-wrap items-center gap-3">
          <button class="retro-btn" onclick="alert('Simulated legacy link: This PDF download was 4.2MB and took 14 seconds to load in 2011!')">${data.before.btn}</button>
          <span class="text-red-700 font-bold text-xs bg-red-50 px-2 py-0.5 border border-red-200 font-sans">
            ${data.before.speedTag}
          </span>
        </div>
      </div>

      <div class="pt-3 border-t-2 border-gray-400 text-[10px] sm:text-[11px] text-gray-700 font-sans flex flex-wrap items-center justify-between gap-2">
        <span>Copyright &copy; ${data.before.year} ${data.name}. All rights reserved.</span>
        <div class="flex items-center gap-2">
          <span>Hit Counter:</span>
          <span class="retro-counter">${data.before.counter}</span>
        </div>
      </div>
    `;
  }

  // 4. Update Modern After Layer Content
  const afterInner = document.getElementById('afterModernContent');
  if (afterInner) {
    const navItems = data.after.nav.map(n => `<span class="cursor-pointer hover:text-slate-900 transition-colors">${n}</span>`).join('');
    afterInner.innerHTML = `
      <!-- Clean Modern Header -->
      <div class="flex items-center justify-between border-b border-slate-100 pb-4 sm:pb-5">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-bold text-sm shadow-xs">
            ${data.after.initials}
          </div>
          <span class="font-bold text-base sm:text-lg tracking-tight text-slate-900">
            ${data.after.brand} <span class="text-blue-600 font-medium">${data.after.accentWord}</span>
          </span>
        </div>
        <div class="hidden sm:flex items-center gap-6 text-xs font-semibold text-slate-600">
          ${navItems}
        </div>
        <div class="flex items-center gap-3">
          <span class="hidden md:inline-flex px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            ${data.speedBadge}
          </span>
          <button class="px-3.5 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-blue-600 transition-colors shadow-xs">
            Get Started
          </button>
        </div>
      </div>

      <!-- Clean Modern Hero Body -->
      <div class="my-auto py-6 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div class="md:col-span-7 space-y-3.5">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100">
            ✨ ${data.after.pill}
          </span>
          <h3 class="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight">
            ${data.after.title}
          </h3>
          <p class="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg">
            ${data.after.body}
          </p>
          <div class="flex flex-wrap items-center gap-3 pt-2">
            <button class="px-4 py-2.5 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-blue-600 transition-colors shadow-sm flex items-center gap-2">
              <span>${data.after.primaryBtn}</span>
            </button>
            <button class="px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-100">
              ${data.after.secondaryBtn}
            </button>
          </div>
        </div>

        <!-- Modern Clean Floating Card -->
        <div class="md:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
          <div class="flex items-center justify-between text-xs pb-3 border-b border-slate-200">
            <span class="text-slate-600 font-medium">${data.after.cardTitle}</span>
            <span class="text-emerald-700 font-extrabold text-sm">${data.after.cardVal}</span>
          </div>
          <div class="space-y-2">
            <div class="flex justify-between text-xs text-slate-600 font-medium">
              <span>${data.after.cardMetricTitle}</span>
              <span class="font-bold text-slate-900">${data.after.cardMetricVal}</span>
            </div>
            <div class="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div class="bg-blue-600 h-full w-[88%] rounded-full"></div>
            </div>
          </div>
          <div class="p-3 bg-white rounded-lg border border-slate-200 text-[11px] text-slate-600 flex items-center gap-2 shadow-2xs">
            <i data-lucide="check-circle" class="w-4 h-4 text-emerald-600 shrink-0"></i>
            <span>${data.after.cardFeature}</span>
          </div>
        </div>
      </div>

      <!-- Modern Clean Footer -->
      <div class="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <span class="flex items-center gap-1.5 font-medium text-slate-700">
          <i data-lucide="shield-check" class="w-4 h-4 text-emerald-600"></i> ${data.after.trustBadge}
        </span>
        <span class="font-bold text-blue-700 uppercase tracking-wider text-[10px] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
          ✨ WebTorq Transformation
        </span>
      </div>
    `;
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
  const container = document.getElementById('comparisonContainer');
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
