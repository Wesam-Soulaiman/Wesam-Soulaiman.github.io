/* ============================================================
   Wesam Soulaiman — Portfolio runtime
   Renders every section from DATA (assets/js/data.js),
   then enriches the project cards with live GitHub data.
   ============================================================ */
(function () {
  "use strict";

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/";
  const GH_API  = "https://api.github.com";

  /* GitHub's own language colours, for the language bar */
  const LANG_COLOR = {
    JavaScript: "#f1e05a", TypeScript: "#3178c6", Java: "#b07219",
    Python: "#3572A5", HTML: "#e34c26", CSS: "#563d7c", Vue: "#41b883",
    Shell: "#89e051", Dockerfile: "#384d54", C: "#555555", "C++": "#f34b7d",
    PHP: "#4F5D95", Ruby: "#701516", Go: "#00ADD8", Kotlin: "#A97BFF",
    Dart: "#00B4AB", Swift: "#F05138", SCSS: "#c6538c", Other: "#8b5cf6"
  };
  const langColor = (l) => LANG_COLOR[l] || LANG_COLOR.Other;

  /* project card glyphs, keyed by category */
  const CAT_ICON = {
    "Software Design"  : '<path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"/>',
    "Compilers"        : '<path d="M8 6 3 12l5 6M16 6l5 6-5 6M13 4l-2 16"/>',
    "AI & Data"        : '<path d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4.5-4.5"/>',
    "Systems & Security":'<path d="M12 3 5 6v5c0 4.4 2.9 8.4 7 9.5 4.1-1.1 7-5.1 7-9.5V6l-7-3z"/>',
    "Full-Stack"       : '<path d="M3 5h18v5H3zM3 14h18v5H3zM7 7.5h.01M7 16.5h.01"/>',
    "Backend & APIs"   : '<path d="M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
    _default           : '<path d="M4 6h16v12H4zM8 10l-2 2 2 2M16 10l2 2-2 2"/>'
  };
  const catIcon = (c) => CAT_ICON[c] || CAT_ICON._default;

  const ICON = {
    github : '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.1-1.5 6.1-6.6a5.1 5.1 0 0 0-1.4-3.6 4.8 4.8 0 0 0-.1-3.6s-1.1-.3-3.7 1.4a12.6 12.6 0 0 0-6.6 0C6.7 1.4 5.6 1.7 5.6 1.7a4.8 4.8 0 0 0-.1 3.6A5.1 5.1 0 0 0 4 9c0 5 3.1 6.2 6.1 6.6a3.4 3.4 0 0 0-.9 2.6V22"/>',
    linkedin:'<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-11h4v1.5A6 6 0 0 1 16 8zM6 9H2v12h4zM4 2.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>',
    mail   : '<path d="M3 6h18v12H3zM3 7l9 6 9-6"/>',
    phone  : '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
    pin    : '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
    star   : '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
    fork   : '<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="12" cy="19" r="2.5"/><path d="M6 8.5v2a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3v-2M12 13.5v3"/>',
    ext    : '<path d="M7 17 17 7M9 7h8v8"/>',
    repo   : '<path d="M4 4h12a2 2 0 0 1 2 2v14H6a2 2 0 0 1-2-2V4zM4 16h14"/>'
  };
  const svg = (p, cls = "") => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${p}</svg>`;

  /* ==========================================================
     THEME
     ========================================================== */
  function initTheme() {
    const stored = (() => { try { return localStorage.getItem("wp-theme"); } catch { return null; } })();
    const theme = stored || DATA.options.defaultTheme || "dark";
    document.documentElement.setAttribute("data-theme", theme);

    $("#themeToggle").addEventListener("click", () => {
      const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      const meta = $('meta[name="theme-color"]');
      if (meta) meta.setAttribute("content", next === "dark" ? "#0b0f1e" : "#f7f8fc");
      try { localStorage.setItem("wp-theme", next); } catch { /* private mode */ }
    });
  }

  /* ==========================================================
     HERO
     ========================================================== */
  function renderHero() {
    const p = DATA.profile, c = DATA.contact;

    $("#heroName").textContent    = p.shortName;
    $("#heroTitle").textContent   = p.title;
    $("#heroTagline").textContent = p.tagline;
    $("#availability").textContent = p.availability;
    $("#footerName").textContent  = p.shortName;
    $("#footerNote").textContent  = DATA.options.footerNote || "";
    $("#year").textContent        = new Date().getFullYear();
    document.title = `${p.shortName} — ${p.title}`;

    const img = $("#avatarImg");
    img.src = p.avatar;
    img.alt = p.fullName;

    [$("#cvBtn"), $("#cvBtn2")].forEach((b) => { if (b) b.href = p.cv; });
    $("#mailBtn").href      = `mailto:${c.email}?subject=${encodeURIComponent("Opportunity for " + p.shortName)}`;
    $("#ghProfileBtn").href = c.github;

    const links = [
      { url: c.github,   label: "GitHub",   icon: ICON.github },
      c.linkedin ? { url: c.linkedin, label: "LinkedIn", icon: ICON.linkedin } : null,
      { url: `mailto:${c.email}`, label: "Email", icon: ICON.mail }
    ].filter(Boolean);

    $("#heroLinks").innerHTML = links.map((l) => `
      <a class="social-link" href="${esc(l.url)}" target="_blank" rel="noopener">
        ${svg(l.icon)}${esc(l.label)}
      </a>`).join("");

    /* rotating role text */
    const roles = p.roles || [];
    const out = $("#roleText");
    if (!roles.length) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      out.textContent = roles[0];
      return;
    }
    let i = 0, ch = 0, del = false;
    (function tick() {
      const word = roles[i];
      ch += del ? -1 : 1;
      out.textContent = word.slice(0, ch);
      let wait = del ? 40 : 75;
      if (!del && ch === word.length) { wait = 1700; del = true; }
      else if (del && ch === 0)       { del = false; i = (i + 1) % roles.length; wait = 320; }
      setTimeout(tick, wait);
    })();
  }

  /* ==========================================================
     STATS STRIP
     ========================================================== */
  function renderStats() {
    $("#statStrip").innerHTML = DATA.stats.map((s) => `
      <div class="stat">
        <div class="stat-num" data-stat="${esc(s.key)}" data-target="${s.value}">0</div>
        <div class="stat-label">${esc(s.label)}</div>
      </div>`).join("");
  }

  function countUp(el) {
    const target = Number(el.dataset.target) || 0;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { el.textContent = target; return; }
    const dur = 1100, t0 = performance.now();
    (function frame(now) {
      const t = Math.min((now - t0) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3)));
      if (t < 1) requestAnimationFrame(frame);
    })(t0);
  }

  /* ==========================================================
     ABOUT
     ========================================================== */
  function renderAbout() {
    const p = DATA.profile, c = DATA.contact;
    $("#aboutText").innerHTML = p.about.map((t) => `<p>${t}</p>`).join("");

    const facts = [
      { k: "Name",     v: p.fullName },
      { k: "Role",     v: p.title },
      { k: "Location", v: p.location },
      { k: "Email",    v: `<a href="mailto:${esc(c.email)}">${esc(c.email)}</a>` },
      { k: "Phone",    v: `<a href="tel:${esc(c.phone.replace(/\s/g, ""))}">${esc(c.phone)}</a>` },
      { k: "Languages",v: "Arabic (native) · English (fluent)" }
    ];
    $("#factList").innerHTML = facts.map((f) => `
      <div class="fact"><dt>${esc(f.k)}</dt><dd>${f.v}</dd></div>`).join("");
  }

  /* ==========================================================
     SKILLS
     ========================================================== */
  function renderSkills() {
    $("#skillGrid").innerHTML = DATA.skills.map((g, i) => `
      <article class="skill-card reveal" data-delay="${Math.min(i % 3 + 1, 3)}">
        <h3 class="card-title">${esc(g.group)}</h3>
        <p class="skill-blurb">${esc(g.blurb)}</p>
        <div class="chip-row">
          ${g.items.map((it) => `
            <span class="chip">
              ${it.icon ? `<img src="${DEVICON}${esc(it.icon)}.svg" alt="" loading="lazy" onerror="this.remove()">` : ""}
              ${esc(it.name)}
            </span>`).join("")}
        </div>
      </article>`).join("");
  }

  /* ==========================================================
     TIMELINES
     ========================================================== */
  function renderTimelines() {
    $("#expTimeline").innerHTML = DATA.experience.map((e) => `
      <li class="tl-item${e.current ? " is-current" : ""}">
        <span class="tl-period">${esc(e.period)}</span>
        <h4 class="tl-role">${esc(e.role)}</h4>
        <p class="tl-org">${esc(e.org)}</p>
        <ul class="tl-points">${e.points.map((p) => `<li>${p}</li>`).join("")}</ul>
        ${e.tech?.length ? `<div class="tag-row">${e.tech.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>` : ""}
      </li>`).join("");

    $("#eduTimeline").innerHTML = DATA.education.map((e) => `
      <li class="tl-item${/present/i.test(e.period) ? " is-current" : ""}">
        <span class="tl-period">${esc(e.period)}</span>
        <h4 class="tl-role">${esc(e.degree)}</h4>
        <p class="tl-org">${esc(e.org)}</p>
        <p class="tl-note">${esc(e.note)}</p>
      </li>`).join("");
  }

  /* ==========================================================
     HIGHLIGHT PROJECT
     ========================================================== */
  function renderHighlight() {
    const h = DATA.highlight;
    if (!h) return;
    $("#highlight").hidden = false;
    $("#highlightCard").innerHTML = `
      <span class="hl-badge">${svg(ICON.star)}${esc(h.badge)}</span>
      <h2 class="hl-title">${esc(h.name)}</h2>
      <p class="hl-meta"><span>${esc(h.period)}</span> · ${esc(h.partner)}</p>
      <p class="hl-summary">${esc(h.summary)}</p>
      <ul class="hl-points">${h.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
      <div class="tag-row">${h.tech.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
      ${h.link ? `<p style="margin-top:18px"><a class="btn btn-primary btn-sm" href="${esc(h.link)}" target="_blank" rel="noopener">Visit ${svg(ICON.ext, "btn-ico")}</a></p>` : ""}`;
  }

  /* ==========================================================
     PROJECTS
     ========================================================== */
  function renderProjects() {
    const user = DATA.profile.githubUser;

    $("#projectGrid").innerHTML = DATA.projects.map((p, i) => `
      <article class="project-card reveal" data-delay="${Math.min(i % 3 + 1, 3)}"
               data-cat="${esc(p.category)}" data-repo="${esc(p.repo)}"
               style="--accent:var(--${esc(p.accent || "violet")})">
        <div class="pc-top">
          <div class="pc-icon">${svg(catIcon(p.category))}</div>
          <div class="pc-stats">
            <span class="pc-stat" data-role="stars" title="Stars">${svg(ICON.star)}<span>–</span></span>
            <span class="pc-stat" data-role="forks" title="Forks">${svg(ICON.fork)}<span>–</span></span>
          </div>
        </div>
        <p class="pc-cat">${esc(p.category)}</p>
        <h3 class="pc-title">${esc(p.title)}</h3>
        <p class="pc-summary">${esc(p.summary)}</p>
        <div class="pc-tech">${p.tech.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
        <div class="pc-foot">
          <a class="pc-link" href="https://github.com/${esc(user)}/${esc(p.repo)}" target="_blank" rel="noopener">
            ${svg(ICON.github)} Source
          </a>
          <span class="pc-lang" data-role="lang"></span>
        </div>
      </article>`).join("");

    /* filter bar */
    const cats = ["All", ...new Set(DATA.projects.map((p) => p.category))];
    $("#filterBar").innerHTML = cats.map((c, i) => `
      <button class="filter-btn${i === 0 ? " active" : ""}" type="button"
              data-filter="${esc(c)}" role="tab" aria-selected="${i === 0}">${esc(c)}</button>`).join("");

    $("#filterBar").addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      $$(".filter-btn").forEach((b) => {
        const on = b === btn;
        b.classList.toggle("active", on);
        b.setAttribute("aria-selected", String(on));
      });
      const f = btn.dataset.filter;
      $$(".project-card").forEach((card) => {
        card.classList.toggle("is-hidden", f !== "All" && card.dataset.cat !== f);
      });
    });
  }

  /* ==========================================================
     LIVE GITHUB DATA
     ========================================================== */
  async function loadGitHub() {
    if (!DATA.options.showGithubAPI) return;
    const user = DATA.profile.githubUser;

    let repos;
    try {
      const res = await fetch(`${GH_API}/users/${user}/repos?per_page=100&sort=updated`);
      if (!res.ok) throw new Error(`GitHub API responded ${res.status}`);
      repos = await res.json();
      if (!Array.isArray(repos)) throw new Error("Unexpected payload");
    } catch (err) {
      // Rate-limited or offline: the page keeps its static content.
      console.warn("GitHub data unavailable:", err.message);
      $("#github").hidden = true;
      return;
    }

    const own   = repos.filter((r) => !r.fork);
    const byName = new Map(own.map((r) => [r.name.toLowerCase(), r]));

    /* 1. enrich featured cards */
    $$(".project-card").forEach((card) => {
      const r = byName.get(card.dataset.repo.toLowerCase());
      if (!r) return;
      card.querySelector('[data-role="stars"] span').textContent = r.stargazers_count;
      card.querySelector('[data-role="forks"] span').textContent = r.forks_count;
      if (r.language) {
        card.querySelector('[data-role="lang"]').innerHTML =
          `<span class="lang-dot" style="background:${langColor(r.language)}"></span>${esc(r.language)}`;
      }
    });

    /* 2. language distribution */
    const counts = {};
    own.forEach((r) => { if (r.language) counts[r.language] = (counts[r.language] || 0) + 1; });
    const ranked = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const total  = ranked.reduce((s, [, n]) => s + n, 0) || 1;

    $("#langBar").innerHTML = ranked.map(([l, n]) => {
      const pct = (n / total * 100).toFixed(1);
      return `<span class="lang-seg" style="width:${pct}%;background:${langColor(l)}" title="${esc(l)} ${pct}%"></span>`;
    }).join("");

    $("#langLegend").innerHTML = ranked.map(([l, n]) => `
      <li>
        <span class="lang-dot" style="background:${langColor(l)}"></span>
        ${esc(l)}<span class="lang-pct">${(n / total * 100).toFixed(0)}%</span>
      </li>`).join("");

    /* 3. snapshot metrics */
    const stars   = own.reduce((s, r) => s + r.stargazers_count, 0);
    const newest  = own.reduce((a, r) => (r.pushed_at > a ? r.pushed_at : a), "");
    const since   = own.reduce((a, r) => (!a || r.created_at < a ? r.created_at : a), "");
    const metrics = [
      { v: own.length,     l: "Public repositories" },
      { v: stars,          l: "Total stars earned" },
      { v: ranked.length,  l: "Languages used" },
      { v: newest ? new Date(newest).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "–",
        l: "Last push" }
    ];
    $("#ghMetrics").innerHTML = metrics.map((m) => `
      <div class="metric"><div class="metric-val">${esc(m.v)}</div><div class="metric-label">${esc(m.l)}</div></div>`).join("");

    /* 4. correct the live hero stats */
    const liveVals = { repos: own.length, languages: ranked.length };
    DATA.stats.forEach((s) => {
      if (!s.live || liveVals[s.key] == null) return;
      const el = $(`[data-stat="${s.key}"]`);
      if (!el) return;
      el.dataset.target = liveVals[s.key];
      if (el.dataset.counted === "1") countUp(el);
    });

    /* 5. other repositories */
    if (DATA.showOtherRepos) {
      const featured = new Set(DATA.projects.map((p) => p.repo.toLowerCase()));
      const rest = own
        .filter((r) => !featured.has(r.name.toLowerCase()))
        .sort((a, b) => b.pushed_at.localeCompare(a.pushed_at));

      if (rest.length) {
        $("#otherRepos").hidden = false;
        $("#otherNote").textContent = DATA.otherReposNote;
        $("#repoGrid").innerHTML = rest.map((r) => `
          <a class="repo-item" href="${esc(r.html_url)}" target="_blank" rel="noopener">
            <span class="repo-name">${svg(ICON.repo)}${esc(r.name)}</span>
            <span class="repo-desc">${esc(r.description || "No description yet.")}</span>
            <span class="repo-meta">
              ${r.language ? `<span><span class="lang-dot" style="background:${langColor(r.language)};display:inline-block;vertical-align:middle;margin-right:5px"></span>${esc(r.language)}</span>` : ""}
              <span>★ ${r.stargazers_count}</span>
              <span>${new Date(r.pushed_at).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}</span>
            </span>
          </a>`).join("");
      }
    }

    void since; // reserved for a future "active since" metric
  }

  /* ==========================================================
     CONTACT
     ========================================================== */
  function renderContact() {
    const c = DATA.contact, p = DATA.profile;
    const items = [
      { icon: ICON.mail,  label: "Email",    value: c.email, href: `mailto:${c.email}` },
      { icon: ICON.phone, label: "Phone",    value: c.phone, href: `tel:${c.phone.replace(/\s/g, "")}` },
      { icon: ICON.pin,   label: "Location", value: p.location, href: null },
      c.linkedin ? { icon: ICON.linkedin, label: "LinkedIn", value: "Connect on LinkedIn", href: c.linkedin } : null,
      { icon: ICON.github, label: "GitHub",  value: `@${p.githubUser}`, href: c.github }
    ].filter(Boolean);

    $("#contactCards").innerHTML = items.map((i) => {
      const inner = `
        <div class="ci-icon">${svg(i.icon)}</div>
        <div class="ci-body">
          <span class="ci-label">${esc(i.label)}</span>
          <span class="ci-value">${esc(i.value)}</span>
        </div>`;
      return i.href
        ? `<a class="contact-item" href="${esc(i.href)}"${/^https?:/.test(i.href) ? ' target="_blank" rel="noopener"' : ""}>${inner}</a>`
        : `<div class="contact-item">${inner}</div>`;
    }).join("");
  }

  /* ==========================================================
     SCROLL BEHAVIOUR
     ========================================================== */
  function initScroll() {
    const header = $("#siteHeader");
    const bar    = $("#scrollProgress");

    const onScroll = () => {
      header.classList.toggle("scrolled", window.scrollY > 8);
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* reveal on enter + stat count-up */
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        $$("[data-stat]", e.target).forEach((n) => {
          if (n.dataset.counted !== "1") { n.dataset.counted = "1"; countUp(n); }
        });
        io.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    $$(".reveal").forEach((el) => io.observe(el));

    /* active nav link */
    const sections = $$("main section[id]");
    const navIo = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        $$(".nav-link").forEach((a) =>
          a.classList.toggle("active", a.getAttribute("href") === `#${e.target.id}`));
      });
    }, { threshold: 0.25, rootMargin: "-80px 0px -55% 0px" });
    sections.forEach((s) => navIo.observe(s));

    /* mobile menu */
    const nav = $("#nav"), btn = $("#menuBtn");
    const close = () => { nav.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); };
    btn.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", (e) => { if (e.target.closest(".nav-link")) close(); });
    addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
    matchMedia("(min-width:821px)").addEventListener("change", close);
  }

  /* ==========================================================
     BOOT
     ========================================================== */
  function init() {
    initTheme();
    renderHero();
    renderStats();
    renderAbout();
    renderSkills();
    renderTimelines();
    renderHighlight();
    renderProjects();
    renderContact();
    initScroll();
    loadGitHub();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
