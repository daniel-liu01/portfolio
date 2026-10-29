import { CTRL, NS, STEPS, WAYI } from "./climbData";

const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (t) => t * t * (3 - 2 * t);
const ss = (a, b, x) => smooth(clamp((x - a) / (b - a), 0, 1));
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const comb = (a, b, wa, wb) => [a[0] * wa + b[0] * wb, a[1] * wa + b[1] * wb];

function soften(pts, amount) {
  return pts.map((p, i, a) => {
    if (i === 0 || i === a.length - 1) return p;
    const prev = a[i - 1];
    const next = a[i + 1];
    return [
      p[0] + amount * ((prev[0] + next[0]) / 2 - p[0]),
      p[1] + amount * ((prev[1] + next[1]) / 2 - p[1]),
    ];
  });
}

function buildPath() {
  const P = soften(soften(CTRL, 0.22), 0.16);
  const n = P.length;
  const ext = [
    [2 * P[0][0] - P[1][0], 2 * P[0][1] - P[1][1]],
    ...P,
    [2 * P[n - 1][0] - P[n - 2][0], 2 * P[n - 1][1] - P[n - 2][1]],
  ];
  const out = [];
  for (let i = 1; i < ext.length - 2; i++) {
    const p0 = ext[i - 1];
    const p1 = ext[i];
    const p2 = ext[i + 1];
    const p3 = ext[i + 2];
    const t0 = 0;
    const t1 = t0 + Math.sqrt(dist(p0, p1));
    const t2 = t1 + Math.sqrt(dist(p1, p2));
    const t3 = t2 + Math.sqrt(dist(p2, p3));
    for (let k = 0; k < NS; k++) {
      const t = t1 + ((t2 - t1) * k) / NS;
      const A1 = comb(p0, p1, (t1 - t) / (t1 - t0), (t - t0) / (t1 - t0));
      const A2 = comb(p1, p2, (t2 - t) / (t2 - t1), (t - t1) / (t2 - t1));
      const A3 = comb(p2, p3, (t3 - t) / (t3 - t2), (t - t2) / (t3 - t2));
      const B1 = comb(A1, A2, (t2 - t) / (t2 - t0), (t - t0) / (t2 - t0));
      const B2 = comb(A2, A3, (t3 - t) / (t3 - t1), (t - t1) / (t3 - t1));
      out.push(comb(B1, B2, (t2 - t) / (t2 - t1), (t - t1) / (t2 - t1)));
    }
  }
  out.push(P[n - 1]);
  const cum = [0];
  for (let i = 1; i < out.length; i++) cum.push(cum[i - 1] + dist(out[i - 1], out[i]));
  const L = cum[cum.length - 1];
  function at(s) {
    s = clamp(s, 0, L);
    let lo = 0;
    let hi = cum.length - 1;
    while (hi - lo > 1) {
      const m = (lo + hi) >> 1;
      if (cum[m] <= s) lo = m;
      else hi = m;
    }
    const u = (s - cum[lo]) / (cum[hi] - cum[lo] || 1);
    return [lerp(out[lo][0], out[hi][0], u), lerp(out[lo][1], out[hi][1], u), hi];
  }
  const wayS = WAYI.map((k) => cum[k * NS]);
  const wayT = wayS.map((s) => s / L);
  return { pts: out, cum, L, at, wayS, wayT };
}

export function runClimb(root) {
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  const openAtWork = location.hash === "#steps";
  if (location.hash && !openAtWork) {
    history.replaceState(null, "", location.pathname + location.search);
  }
  if (!openAtWork) window.scrollTo(0, 0);

  const $ = (s) => root.querySelector(s);
  const { pts, L, at, wayS, wayT } = buildPath();
  const PA = [0.07, 0.22, 0.3, 0.43, 0.5, 0.63, 0.7, 0.8, 0.87, 0.95];
  const TA = [0, wayT[0], wayT[0], wayT[1], wayT[1], wayT[2], wayT[2], wayT[3], wayT[3], 1];
  const ARRIVE = [PA[1], PA[3], PA[5], PA[7]];
  const LEAVE = [PA[2], PA[4], PA[6], PA[8]];
  function tOf(p) {
    if (p <= PA[0]) return 0;
    if (p >= PA[PA.length - 1]) return TA[TA.length - 1];
    for (let i = 0; i < PA.length - 1; i++) {
      if (p <= PA[i + 1]) {
        let u = (p - PA[i]) / (PA[i + 1] - PA[i]);
        u = lerp(u, smooth(u), 0.6);
        return lerp(TA[i], TA[i + 1], u);
      }
    }
    return 0;
  }

  const NSVG = "http://www.w3.org/2000/svg";
  function el(tag, attrs, parent) {
    const e = document.createElementNS(NSVG, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }

  const world = $("#world");
  const stage = $("#stage");
  const climb = $("#climb");
  const printsG = $("#prints");
  const flagsG = $("#flags");
  const routeEl = $("#route");
  const prints = [];
  let step = 24;
  let k = 0;
  for (let s = 40; s < L - 4; s += step, k++) {
    const a = at(s);
    const b = at(s + 6);
    const ang = Math.atan2(b[1] - a[1], b[0] - a[0]);
    const side = (k % 2 ? 1 : -1) * 7.5;
    const x = a[0] + Math.cos(ang + Math.PI / 2) * side;
    const y = a[1] + Math.sin(ang + Math.PI / 2) * side;
    const e = el(
      "use",
      {
        href: "#foot",
        class: "pr",
        opacity: "0",
        transform: `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${((ang * 180) / Math.PI).toFixed(1)}) scale(1.1 ${k % 2 ? -1.1 : 1.1}) translate(-12 -4.5)`,
      },
      printsG,
    );
    prints.push({ s, e });
  }
  (function inbound() {
    const st = at(0);
    const a = [-30, 1138];
    const dx = st[0] - a[0];
    const dy = st[1] - a[1];
    const L0 = Math.hypot(dx, dy);
    const ang = Math.atan2(dy, dx);
    const n = 6;
    for (let j = 0; j < n; j++) {
      const t = ((j + 0.5) / (n + 0.6)) * L0;
      const side = (j % 2 ? 1 : -1) * 7.5;
      const x = a[0] + Math.cos(ang) * t + Math.cos(ang + Math.PI / 2) * side;
      const y = a[1] + Math.sin(ang) * t + Math.sin(ang + Math.PI / 2) * side;
      el(
        "use",
        {
          href: "#foot",
          class: "pr",
          opacity: "0.9",
          transform: `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${((ang * 180) / Math.PI).toFixed(1)}) scale(1.1 ${j % 2 ? -1.1 : 1.1}) translate(-12 -4.5)`,
        },
        printsG,
      );
    }
  })();

  const FLAGSIDE = [-1, -1, 1, -1];
  const flags = WAYI.map((_, i) => {
    const onPath = at(wayS[i]);
    const sd = FLAGSIDE[i];
    const g = el(
      "g",
      { transform: `translate(${onPath[0].toFixed(1)} ${onPath[1].toFixed(1)})` },
      flagsG,
    );
    el("circle", { class: "ring", r: "9", cx: "0", cy: "0" }, g);
    const spot = el("g", { transform: `translate(${sd * 68} 8)` }, g);
    const up = el("g", { transform: "scale(0)" }, spot);
    el("ellipse", { class: "mound", cx: "0", cy: "0", rx: "15", ry: "3.6" }, up);
    el("line", { class: "pole", x1: "0", y1: "0", x2: "0", y2: "-64" }, up);
    el("path", { class: "pen", d: `M0 -64 L${sd * 38} -52 L0 -41 Z` }, up);
    const t = el(
      "text",
      { class: "fnum", x: String(sd * 9), y: "-70", "text-anchor": sd > 0 ? "start" : "end" },
      up,
    );
    t.textContent = STEPS[i].n;
    return up;
  });

  const rangeSvg = $("#range");
  const nextEl = el("g", { id: "nextflag" }, rangeSvg);
  el("line", { class: "next-pole", x1: "1500", y1: "-798", x2: "1500", y2: "-868" }, nextEl);
  el("path", { class: "next-flag", d: "M1500 -868 L1575 -848 L1500 -828 Z" }, nextEl);
  el("text", { class: "next-t", x: "1520", y: "-943" }, nextEl).textContent = "NEXT SUMMIT";
  el("text", { class: "next-s", x: "1520", y: "-900" }, nextEl).textContent = "[ ??? ]";

  let lastJ = -1;
  function setRoute(S) {
    const a = at(S);
    const j = a[2];
    if (j === lastJ) return;
    lastJ = j;
    let d = `M${a[0].toFixed(1)} ${a[1].toFixed(1)}`;
    for (let i = j; i < pts.length; i++) d += `L${pts[i][0].toFixed(1)} ${pts[i][1].toFixed(1)}`;
    routeEl.setAttribute("d", d);
  }

  const box = $("#stars");
  let seed = 7;
  function rnd() {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  }
  for (let i = 0; i < 110; i++) {
    const s = document.createElement("i");
    const z = rnd() < 0.15 ? 2.4 : rnd() < 0.5 ? 1.6 : 1.1;
    s.style.cssText = `left:${(rnd() * 100).toFixed(2)}%;top:${(rnd() * 100).toFixed(2)}%;width:${z}px;height:${z}px;animation-delay:-${(rnd() * 5).toFixed(2)}s;animation-duration:${(3 + rnd() * 4).toFixed(1)}s`;
    box.appendChild(s);
  }

  function optimizedSrc(path, width) {
    return `/_next/image?url=${encodeURIComponent(path)}&w=${width}&q=100`;
  }

  function thumbHTML(s, eager) {
    const widths = [640, 828, 1080, 1200, 1920];
    const srcset = widths.map((w) => `${optimizedSrc(s.img, w)} ${w}w`).join(", ");
    const sizes = eager
      ? "(max-width: 759px) calc(100vw - 24px), 430px"
      : "(max-width: 759px) calc(100vw - 32px), min(584px, 46vw)";
    return (
      `<a class="thumb" style="--tone:${s.tone}" href="${s.href}" tabindex="-1" aria-hidden="true">` +
      `<span class="ph"><b>${s.name}</b><i>project image</i></span>` +
      `<img alt="" ${eager ? 'fetchpriority="high" ' : 'loading="lazy" '}decoding="async" src="${optimizedSrc(s.img, 1200)}" srcset="${srcset}" sizes="${sizes}"></a>`
    );
  }

  const cardsEl = $("#cards");
  STEPS.forEach((s) => {
    const c = document.createElement("article");
    c.className = "card";
    c.setAttribute("aria-hidden", "true");
    c.innerHTML =
      thumbHTML(s, true) +
      `<div class="card-body"><div class="meta"><span class="step alt">${s.alt}</span><span>${s.kind}</span></div>` +
      `<h3>${s.name}</h3><ul class="tags">${s.tags.map((t) => `<li>${t}</li>`).join("")}</ul>` +
      `<p class="note">${s.note}</p>` +
      `<a class="go" href="${s.href}" tabindex="-1">View case study <span aria-hidden="true">→</span></a></div>`;
    cardsEl.appendChild(c);
  });
  const cardEls = [].slice.call(cardsEl.children);

  const gTrack = $("#gTrack");
  const ticks = [];
  function addTick(f, label, num, pTarget) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "tick";
    b.style.setProperty("--f", f.toFixed(4));
    b.setAttribute("aria-label", "Go to " + label);
    b.innerHTML = `<span class="lbl"><b>${num}</b><em>${label}</em></span>`;
    b.addEventListener("click", () => goTo(pTarget));
    gTrack.appendChild(b);
    ticks.push({ el: b, f });
  }
  addTick(0, "Base camp", "00", 0);
  STEPS.forEach((s, i) =>
    addTick(wayT[i], s.short || s.name, s.n, (ARRIVE[i] + LEAVE[i]) / 2),
  );
  addTick(1, "Summit", "", 1);

  const grid = $("#grid");
  STEPS.forEach((s) => {
    const a = document.createElement("a");
    a.className = "tile";
    a.href = s.href;
    a.innerHTML =
      thumbHTML(s, false)
        .replace('<a class="thumb"', '<span class="thumb"')
        .replace("</a>", "</span>")
        .replace(' tabindex="-1" aria-hidden="true"', "")
        .replace(` href="${s.href}"`, "") +
      `<h3>${s.alt} · ${s.name}</h3><p>${s.tags.join(" / ")}</p>`;
    grid.appendChild(a);
  });

  function guardImages() {
    [].forEach.call(root.querySelectorAll(".thumb img"), (img) => {
      function bad() {
        img.style.display = "none";
      }
      img.addEventListener("error", bad);
      if (img.complete && img.naturalWidth === 0 && img.src)
        setTimeout(() => {
          if (img.naturalWidth === 0) bad();
        }, 2500);
    });
  }
  guardImages();

  let vw = 0;
  let vh = 0;
  let mobile = false;
  let HERO;
  let WIDE;
  let sFollow;
  let sEnd;
  let fx;
  let fy;
  let fxE;
  let fyE;
  const endPos = [960, 220];
  const cam = { cx: 1000, cy: 560, s: 0.72 };
  const EXT = 1250;
  const KC = 0.82;
  function layout() {
    vw = stage.clientWidth || innerWidth;
    vh = stage.clientHeight || innerHeight;
    mobile = vw < 760;
    stage.classList.toggle("is-narrow", mobile);
    const Rx0 = 90;
    const Rx1 = 1300;
    let B = 1160;
    let s0 = Math.max(vw / (2000 + 2 * EXT), Math.min(vw / (Rx1 - Rx0), vh / B));
    if (mobile) {
      B = 1125 + (vh * 0.1) / s0;
      s0 = Math.max(vw / (2000 + 2 * EXT), Math.min(vw / (Rx1 - Rx0), vh / B));
    }
    const sH = s0;
    const visW = vw / sH;
    const visH = vh / sH;
    const hx = clamp(
      clamp(1000, Rx1 - visW / 2, Rx0 + visW / 2),
      -EXT + visW / 2,
      2000 + EXT - visW / 2,
    );
    HERO = { s: sH, cx: hx, cy: visH >= B - 0.5 ? B - visH / 2 : B / 2 };
    const sW = Math.max(vw / (2000 + 2 * EXT), vh / 2200);
    const wW = vw / sW;
    const wH = vh / sW;
    const topPad = 84 / sW;
    WIDE = { s: sW, cx: clamp(1000, 1740 - wW / 2, 920 + wW / 2), cy: -1040 - topPad + wH / 2 };
    sFollow = Math.max(vw / (mobile ? 640 : 1000), sH * 1.15);
    sEnd = Math.max(vw / (mobile ? 900 : 1500), sH * 1.02);
    fx = mobile ? 0.5 : 0.36;
    fy = mobile ? 0.3 : 0.62;
    fxE = mobile ? 0.5 : 0.54;
    fyE = mobile ? 0.42 : 0.5;
  }
  function follow(x, y, s, fxx, fyy) {
    let cx = x + (0.5 - fxx) * (vw / s);
    const cy = y + (0.5 - fyy) * (vh / s);
    const half = vw / (2 * s);
    if (vw / s < 2000 + 2 * EXT) cx = clamp(cx, -EXT + half, 2000 + EXT - half);
    return { cx, cy, s };
  }
  function mixCam(a, b, u) {
    return {
      cx: lerp(a.cx, b.cx, u),
      cy: lerp(a.cy, b.cy, u),
      s: Math.exp(lerp(Math.log(a.s), Math.log(b.s), u)),
    };
  }
  const P0 = PA[0];
  const PEND = PA[PA.length - 1];
  function wantCam(p, pos) {
    const f = follow(pos[0], pos[1], sFollow, fx, fy);
    if (p < P0) {
      const st = follow(CTRL[0][0], CTRL[0][1], sFollow, fx, fy);
      return mixCam(HERO, st, smooth(p / P0));
    }
    if (p > PEND) {
      const e = follow(endPos[0], endPos[1], sEnd, fxE, fyE);
      return mixCam(f, e, smooth((p - PEND) / (1 - PEND)));
    }
    return f;
  }

  const html = document.documentElement;
  const summitEl = $("#summit");
  const rangeEl = $("#range");
  const cue = $("#cue");
  const skip = $("#skip");
  const seeWork = $("#seeWork");
  const fadeEl = $("#fade");
  const gauge = $("#gauge");
  const finale = $("#finale");
  const wideTitle = $("#wideTitle");
  const pg = $("#pg");
  const pgFlip = $("#pgFlip");
  const pgBody = $("#pgBody");
  const baseT = $("#base");
  const live = $("#live");
  const gFillParent = gTrack;
  const gFill = gFillParent.querySelector(".g-fill");
  const gDot = gFillParent.querySelector(".g-dot");
  void gFill;
  void gDot;

  let reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) html.classList.add("reduced");
  let target = 0;
  let cur = 0;
  let raf = 0;
  let lastTs = 0;
  let lastS = 0;
  let amp = 0;
  let dir = 1;
  let activeCard = -1;
  let camReady = false;
  let busy = false;
  let navOnLight = false;

  function parseColor(str) {
    if (!str || str === "none" || str === "transparent") return null;
    const trimmed = str.trim();
    if (trimmed.startsWith("#")) {
      let h = trimmed.slice(1);
      if (h.length === 3) h = h.split("").map((c) => c + c).join("");
      if (h.length !== 6) return null;
      return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
    }
    const m = trimmed.match(
      /rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:\s*[,\s/]\s*([\d.]+))?/,
    );
    if (!m) return null;
    const a = m[4] === undefined ? 1 : Number(m[4]) > 1 ? Number(m[4]) / 255 : Number(m[4]);
    if (a < 0.12) return null;
    return [Number(m[1]), Number(m[2]), Number(m[3])];
  }

  function relativeLuminance(rgb) {
    const lin = rgb.map((c) => {
      const x = c / 255;
      return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
  }

  function isPainted(node) {
    let n = node;
    while (n && n !== document.documentElement) {
      const s = getComputedStyle(n);
      if (s.visibility === "hidden" || s.display === "none" || Number(s.opacity) < 0.12) {
        return false;
      }
      n = n.parentElement;
    }
    return true;
  }

  function colorOfNode(node) {
    if (!isPainted(node)) return null;
    const s = getComputedStyle(node);
    if (node instanceof SVGElement) {
      const painted = /^(use|path|polygon|rect|circle|ellipse)$/i.test(node.tagName);
      if (painted) {
        const token =
          parseColor(s.getPropertyValue("--k0")) || parseColor(s.getPropertyValue("--sk"));
        if (token) return token;
      }
      const fill = parseColor(s.fill);
      const explicit = node.getAttribute("fill") || node.style.fill;
      if (fill && explicit && explicit !== "none") return fill;
    }
    return parseColor(s.backgroundColor);
  }

  function sampleNavLuminance() {
    const nav = document.getElementById("nav");
    if (!nav) return 0.2;
    const targets = [nav.querySelector(".logo"), nav.querySelector(".nav-right")].filter(Boolean);
    const points = [];
    targets.forEach((el) => {
      const r = el.getBoundingClientRect();
      const y = r.top + r.height / 2;
      points.push(
        [r.left + r.width * 0.2, y],
        [r.left + r.width * 0.5, y],
        [r.left + r.width * 0.8, y],
      );
    });
    const trail = $("#trail");
    const prevWorld = world.style.pointerEvents;
    const prevTrail = trail?.style.pointerEvents;
    world.style.pointerEvents = "auto";
    if (trail) trail.style.pointerEvents = "none";
    let maxLum = 0;
    let sum = 0;
    let n = 0;
    points.forEach(([x, y]) => {
      const stack = document.elementsFromPoint(x, y);
      let rgb = null;
      for (const el of stack) {
        if (
          nav.contains(el) ||
          el.closest(".site-nav, .gauge, .cards, .finale, .skip, .cue, .trail-link, .wide-title")
        ) {
          continue;
        }
        rgb = colorOfNode(el);
        if (rgb) break;
      }
      if (!rgb) return;
      const lum = relativeLuminance(rgb);
      maxLum = Math.max(maxLum, lum);
      sum += lum;
      n += 1;
    });
    world.style.pointerEvents = prevWorld;
    if (trail) trail.style.pointerEvents = prevTrail || "";
    if (!n) return 0.2;
    return maxLum * 0.65 + (sum / n) * 0.35;
  }

  function updateNavContrast(force) {
    const lum = sampleNavLuminance();
    if (force) {
      navOnLight = lum > 0.42;
    } else if (navOnLight) {
      if (lum < 0.36) navOnLight = false;
    } else if (lum > 0.48) {
      navOnLight = true;
    }
    html.classList.toggle("climb-nav-on-light", navOnLight);
  }

  const LOCK = KC;
  let wideUnlocked = false;
  function snapToLock() {
    const r = climb.getBoundingClientRect();
    const max = Math.max(0, r.height - stage.clientHeight);
    const y = window.scrollY + r.top + LOCK * max;
    if (Math.abs(window.scrollY - y) > 0.5) window.scrollTo(0, y);
  }
  function progressNow() {
    const r = climb.getBoundingClientRect();
    const max = r.height - stage.clientHeight;
    return max > 0 ? clamp(-r.top / max, 0, 1) : 0;
  }
  function readScroll() {
    if (reduced) {
      target = 0;
      return;
    }
    const r = climb.getBoundingClientRect();
    const max = r.height - stage.clientHeight;
    target = max > 0 ? clamp(-r.top / max, 0, 1) : 0;
    if (!wideUnlocked && target > LOCK) {
      target = LOCK;
      snapToLock();
    }
  }
  function render(p, ease) {
    const pp = p;
    p = Math.min(1, pp / KC);
    const u = clamp((pp - KC) / (1 - KC), 0, 1);
    if (stage.clientWidth !== vw || stage.clientHeight !== vh) {
      layout();
      camReady = false;
    }
    const t = tOf(p);
    const S = t * L;
    const pos = at(S);
    const d0 = at(S - 10);
    const d1 = at(S + 10);
    const dx = d1[0] - d0[0];
    const dy = d1[1] - d0[1];
    if (Math.abs(dx) > 0.3 * Math.hypot(dx, dy)) dir = dx >= 0 ? 1 : -1;

    let w = wantCam(p, pos);
    if (u > 0) w = mixCam(w, WIDE, smooth(u));
    if (!camReady) {
      cam.cx = w.cx;
      cam.cy = w.cy;
      cam.s = w.s;
      camReady = true;
    } else {
      cam.cx += (w.cx - cam.cx) * ease;
      cam.cy += (w.cy - cam.cy) * ease;
      cam.s = Math.exp(Math.log(cam.s) + (Math.log(w.s) - Math.log(cam.s)) * ease);
    }
    busy =
      Math.abs(w.cx - cam.cx) * cam.s > 0.3 ||
      Math.abs(w.cy - cam.cy) * cam.s > 0.3 ||
      Math.abs(Math.log(w.s / cam.s)) > 0.0008;
    const tx = vw / 2 - cam.cx * cam.s;
    const ty = vh / 2 - cam.cy * cam.s;
    world.style.transform = `translate3d(${tx.toFixed(2)}px,${ty.toFixed(2)}px,0) scale(${cam.s.toFixed(5)})`;
    world.style.setProperty("--cam-s", cam.s.toFixed(4));
    world.style.setProperty("--cam-tx", `${tx.toFixed(1)}px`);
    world.style.setProperty("--cam-ty", `${ty.toFixed(1)}px`);
    world.style.setProperty("--stage-w", `${vw}px`);
    updateNavContrast();

    const v = Math.abs(S - lastS);
    lastS = S;
    amp += (clamp(v * 0.9, 0, 1) - amp) * 0.25;
    if (amp < 0.01) amp = 0;
    const ph = S / 11;
    const rot = Math.sin(ph * Math.PI) * 4.6 * amp;
    const bob = -Math.abs(Math.sin(ph * Math.PI)) * 2.6 * amp;
    const sit = ss(0.88, 0.995, t);
    const ox = -40 * sit;
    const oy = 24 * sit;
    pg.style.transform = `translate(${(pos[0] - 45.5 + ox).toFixed(1)}px,${(pos[1] - 101 + oy).toFixed(1)}px)`;
    pgFlip.style.transform = `scaleX(${dir})`;
    pgBody.style.transform = `translateY(${bob.toFixed(2)}px) rotate(${rot.toFixed(2)}deg)`;
    if (baseT) baseT.setAttribute("opacity", (1 - ss(0.002, 0.03, p)).toFixed(3));

    for (let i = 0; i < prints.length; i++) {
      const o = clamp((S - prints[i].s - 6) / 30, 0, 1);
      prints[i].e.setAttribute("opacity", (o * 0.9).toFixed(3));
    }
    setRoute(S);
    for (let j = 0; j < flags.length; j++) {
      const a = ss(wayT[j] - 0.028, wayT[j] - 0.004, t);
      const sc = a * (1 + 0.1 * Math.sin(Math.PI * a));
      flags[j].setAttribute("transform", `scale(${sc.toFixed(3)})`);
    }

    summitEl.classList.toggle("reached", t > 0.995);
    cue.style.opacity = (0.8 * (1 - ss(0, 0.025, p))).toFixed(3);
    fadeEl.style.opacity = ss(0.94, 1, pp).toFixed(3);
    stage.style.setProperty("--p", p.toFixed(4));

    gauge.style.setProperty("--t", t.toFixed(4));
    const gv = ss(0.045, 0.085, p);
    gauge.style.opacity = gv.toFixed(3);
    gauge.style.visibility = gv < 0.01 ? "hidden" : "visible";
    ticks.forEach((tk, ix) => {
      const done = t >= tk.f - 0.004 && ix > 0;
      tk.el.classList.toggle("done", done || ix === 0);
      const near = Math.abs(t - tk.f) < 0.03 && p < PEND + 0.02;
      tk.el.classList.toggle("cur", near);
    });

    let idx = -1;
    for (let c = 0; c < 4; c++) if (p >= ARRIVE[c] - 0.025 && p <= LEAVE[c] + 0.012) idx = c;
    if (idx !== activeCard) {
      activeCard = idx;
      cardEls.forEach((ce, ci) => {
        const on = ci === idx;
        ce.classList.toggle("on", on);
        ce.setAttribute("aria-hidden", on ? "false" : "true");
        [].forEach.call(ce.querySelectorAll("a"), (a) => {
          a.tabIndex = on ? 0 : -1;
        });
      });
      if (idx >= 0)
        live.textContent =
          "Checkpoint at " + STEPS[idx].alt.replace(" m", " meters") + ": " + STEPS[idx].name;
    }
    const fin = p > 0.955 && u < 0.22;
    if (fin !== finale.classList.contains("on")) finale.classList.toggle("on", fin);
    const skipOut = fin ? 1 : ss(0.05, 0.32, u);
    skip.style.opacity = (1 - skipOut).toFixed(3);
    skip.style.pointerEvents = skipOut > 0.5 ? "none" : "";
    skip.setAttribute("aria-hidden", skipOut > 0.5 ? "true" : "false");
    skip.tabIndex = skipOut > 0.5 ? -1 : 0;
    const trailIn = ss(0.55, 0.92, u);
    const trailLive = trailIn > 0.5;
    if (seeWork) {
      seeWork.style.opacity = trailIn.toFixed(3);
      seeWork.style.pointerEvents = trailLive ? "auto" : "none";
      seeWork.setAttribute("aria-hidden", trailLive ? "false" : "true");
      seeWork.tabIndex = trailLive ? 0 : -1;
    }
    if (fin) {
      const pr = pg.getBoundingClientRect();
      const sr = stage.getBoundingClientRect();
      if (mobile) {
        finale.style.left = "12px";
        finale.style.right = "12px";
        finale.style.width = "auto";
        finale.style.top = "auto";
        finale.style.bottom = "calc(12px + env(safe-area-inset-bottom, 0px))";
      } else {
        const fw = finale.offsetWidth || 520;
        const fh = finale.offsetHeight || 240;
        let left = pr.left - sr.left - fw - 72;
        left = clamp(left, 24, Math.max(24, pr.left - sr.left - fw - 36));
        let top = pr.top - sr.top - fh - 24;
        top = clamp(top, 88, Math.max(88, sr.height * 0.2));
        finale.style.left = `${left.toFixed(1)}px`;
        finale.style.top = `${top.toFixed(1)}px`;
        finale.style.right = "auto";
        finale.style.bottom = "auto";
        finale.style.width = "";
      }
    }
    rangeEl.style.opacity = ss(0, 0.55, u).toFixed(3);
    nextEl.style.opacity = ss(0.5, 0.95, u).toFixed(3);
    updateWideTitle(u);
    stage.classList.toggle("is-wide", u > 0.12);
  }
  function frame(ts) {
    raf = 0;
    const dt = lastTs ? Math.min(48, ts - lastTs) : 16.7;
    lastTs = ts;
    const ease = 1 - Math.pow(1 - 0.16, dt / 16.67);
    const dp = target - cur;
    if (Math.abs(dp) > 0.0002) cur += dp * ease;
    else cur = target;
    render(cur, ease);
    if (Math.abs(target - cur) > 0.0002 || busy || amp > 0) raf = requestAnimationFrame(frame);
    else lastTs = 0;
  }
  function kick() {
    if (!raf) raf = requestAnimationFrame(frame);
  }
  function goTo(p) {
    if (reduced) {
      $("#steps").scrollIntoView();
      return;
    }
    const r = climb.getBoundingClientRect();
    const max = r.height - stage.clientHeight;
    const top = r.top + window.scrollY + clamp(p, 0, 1) * KC * max;
    window.scrollTo({ top, behavior: "smooth" });
  }

  let wideAnim = 0;
  let titleRevealTimer = 0;
  let titleArmed = false;
  let titleShown = false;
  function setWideTitleShown(on) {
    if (!wideTitle || titleShown === on) return;
    titleShown = on;
    wideTitle.classList.toggle("is-shown", on);
    wideTitle.setAttribute("aria-hidden", on ? "false" : "true");
  }
  function clearTitleReveal() {
    if (titleRevealTimer) {
      clearTimeout(titleRevealTimer);
      titleRevealTimer = 0;
    }
    titleArmed = false;
    setWideTitleShown(false);
  }
  function updateWideTitle(u) {
    if (!wideTitle) return;
    if (reduced) {
      clearTimeout(titleRevealTimer);
      titleRevealTimer = 0;
      titleArmed = u >= 0.2;
      setWideTitleShown(u >= 0.2);
      return;
    }
    if (u >= 0.98) {
      if (titleShown || titleArmed) return;
      titleArmed = true;
      titleRevealTimer = setTimeout(() => {
        titleRevealTimer = 0;
        setWideTitleShown(true);
      }, 500);
      return;
    }
    if (u < 0.6) clearTitleReveal();
  }
  function cancelWide() {
    if (wideAnim) {
      cancelAnimationFrame(wideAnim);
      wideAnim = 0;
      if (progressNow() < LOCK - 0.01) wideUnlocked = false;
    }
  }
  function climbEndY() {
    const r = climb.getBoundingClientRect();
    const max = Math.max(0, r.height - stage.clientHeight);
    return r.top + window.scrollY + max;
  }
  function animateScrollTo(y, ms, done) {
    cancelWide();
    const start = window.scrollY;
    const dist = y - start;
    if (Math.abs(dist) < 2) {
      done?.();
      return;
    }
    const t0 = performance.now();
    const step = (now) => {
      const t = clamp((now - t0) / ms, 0, 1);
      const e = t * t * (3 - 2 * t);
      window.scrollTo(0, start + dist * e);
      if (t < 1) wideAnim = requestAnimationFrame(step);
      else {
        wideAnim = 0;
        done?.();
      }
    };
    wideAnim = requestAnimationFrame(step);
  }
  function goToWide(e) {
    e.preventDefault();
    wideUnlocked = true;
    const y = climbEndY();
    if (reduced) {
      window.scrollTo(0, y);
      return;
    }
    animateScrollTo(y, 3360);
  }

  const onScroll = () => {
    readScroll();
    kick();
  };
  const onResize = () => {
    layout();
    readScroll();
    camReady = false;
    kick();
  };
  const mq = matchMedia("(prefers-reduced-motion: reduce)");
  const onMq = (e) => {
    reduced = e.matches;
    html.classList.toggle("reduced", reduced);
    readScroll();
    kick();
  };
  const skipToSteps = (e) => {
    e.preventDefault();
    wideUnlocked = true;
    cancelWide();
    $("#steps").scrollIntoView({ behavior: "smooth" });
  };
  function goToWork() {
    const el = $("#steps");
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    if (reduced) {
      wideUnlocked = true;
      window.scrollTo(0, top);
      readScroll();
      kick();
      return;
    }
    animateScrollTo(top, 520, () => {
      readScroll();
      kick();
    });
    wideUnlocked = true;
  }
  const onGoWork = () => goToWork();
  const stepLinks = [...root.querySelectorAll('a[href="#steps"]')];
  const revealWide = $("#revealWide");
  let touchY = 0;
  function pastSummit(delta) {
    return !wideUnlocked && !reduced && delta > 0 && progressNow() >= LOCK - 0.004;
  }
  const onWheel = (e) => {
    if (wideAnim) cancelWide();
    if (pastSummit(e.deltaY)) {
      e.preventDefault();
      snapToLock();
    }
  };
  const onTouchStart = (e) => {
    if (wideAnim) cancelWide();
    touchY = e.touches[0]?.clientY ?? 0;
  };
  const onTouchMove = (e) => {
    const y = e.touches[0]?.clientY ?? 0;
    if (pastSummit(touchY - y)) {
      e.preventDefault();
      snapToLock();
    }
  };
  const onKeyLock = (e) => {
    if (!["ArrowDown", "PageDown", " ", "Spacebar"].includes(e.key)) return;
    if (pastSummit(1)) {
      e.preventDefault();
      snapToLock();
    }
  };

  addEventListener("scroll", onScroll, { passive: true });
  document.addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onResize);
  addEventListener("wheel", onWheel, { passive: false });
  addEventListener("touchstart", onTouchStart, { passive: true });
  addEventListener("touchmove", onTouchMove, { passive: false });
  addEventListener("keydown", onKeyLock);
  mq.addEventListener?.("change", onMq);
  stepLinks.forEach((el) => el.addEventListener("click", skipToSteps));
  revealWide?.addEventListener("click", goToWide);
  addEventListener("climb:go-work", onGoWork);
  const themeMo = new MutationObserver(() => {
    requestAnimationFrame(() => updateNavContrast(true));
  });
  themeMo.observe(html, { attributes: true, attributeFilter: ["data-theme"] });

  const prevScrollBehavior = html.style.scrollBehavior;
  html.style.scrollBehavior = "auto";
  html.classList.add("climb-page");

  layout();
  readScroll();
  cur = target;
  render(cur, 1);
  kick();
  if (openAtWork) requestAnimationFrame(() => goToWork());

  return () => {
    if (raf) cancelAnimationFrame(raf);
    cancelWide();
    clearTitleReveal();
    removeEventListener("scroll", onScroll);
    document.removeEventListener("scroll", onScroll);
    removeEventListener("resize", onResize);
    removeEventListener("wheel", onWheel);
    removeEventListener("touchstart", onTouchStart);
    removeEventListener("touchmove", onTouchMove);
    removeEventListener("keydown", onKeyLock);
    mq.removeEventListener?.("change", onMq);
    stepLinks.forEach((el) => el.removeEventListener("click", skipToSteps));
    revealWide?.removeEventListener("click", goToWide);
    removeEventListener("climb:go-work", onGoWork);
    themeMo.disconnect();
    html.style.scrollBehavior = prevScrollBehavior;
    html.classList.remove("climb-page", "climb-nav-on-light");
    printsG.replaceChildren();
    flagsG.replaceChildren();
    nextEl.remove();
    box.replaceChildren();
    cardsEl.replaceChildren();
    grid.replaceChildren();
    ticks.forEach((tk) => tk.el.remove());
  };
}
