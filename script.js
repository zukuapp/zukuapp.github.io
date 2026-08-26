(function () {
  "use strict";

  var reduceMotion =
    document.documentElement.classList.contains("reduced") ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var mode = document.documentElement.dataset.mode || "hype";
  var ACCENT = { hype: "#00d4ff", swipe: "#ff2d78", jump: "#00ff88" };

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else {
      fn();
    }
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  /* ---------- pointer spotlight ---------- */

  function initPointer() {
    var mx = window.innerWidth * 0.5;
    var my = window.innerHeight * 0.28;
    var cx = mx;
    var cy = my;
    var ticking = false;

    function apply() {
      cx = lerp(cx, mx, 0.16);
      cy = lerp(cy, my, 0.16);
      document.documentElement.style.setProperty("--mx", cx + "px");
      document.documentElement.style.setProperty("--my", cy + "px");
      ticking = false;
    }

    window.addEventListener(
      "pointermove",
      function (e) {
        mx = e.clientX;
        my = e.clientY;
        if (reduceMotion) {
          document.documentElement.style.setProperty("--mx", mx + "px");
          document.documentElement.style.setProperty("--my", my + "px");
          return;
        }
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(apply);
      },
      { passive: true }
    );
  }

  /* ---------- magnetic buttons ---------- */

  function initMagnetic() {
    if (reduceMotion || window.matchMedia("(hover: none)").matches) return;
    var nodes = document.querySelectorAll(".magnetic");
    for (var i = 0; i < nodes.length; i += 1) {
      (function (el) {
        el.addEventListener("pointermove", function (e) {
          var r = el.getBoundingClientRect();
          var x = ((e.clientX - r.left) / r.width - 0.5) * 12;
          var y = ((e.clientY - r.top) / r.height - 0.5) * 10;
          el.style.transform = "translate(" + x + "px," + y + "px)";
        });
        el.addEventListener("pointerleave", function () {
          el.style.transform = "";
        });
      })(nodes[i]);
    }
  }

  /* ---------- reveal / header / progress / spy ---------- */

  function revealAll(nodes) {
    for (var i = 0; i < nodes.length; i += 1) nodes[i].classList.add("is-visible");
  }

  function initReveal() {
    var nodes = document.querySelectorAll(".reveal");
    if (!nodes.length) return;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealAll(nodes);
      return;
    }
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
    );
    for (var i = 0; i < nodes.length; i += 1) observer.observe(nodes[i]);
  }

  function initStickyHeader() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    var ticking = false;
    function update() {
      header.classList.toggle("is-stuck", window.scrollY > 8);
      ticking = false;
    }
    window.addEventListener(
      "scroll",
      function () {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(update);
      },
      { passive: true }
    );
    update();
  }

  function initProgress() {
    var bar = document.querySelector(".progress-bar");
    if (!bar) return;
    function update() {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var p = max > 0 ? (window.scrollY / max) * 100 : 0;
      bar.style.width = p + "%";
    }
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  function initNavSpy() {
    var links = document.querySelectorAll('.site-header nav a[href^="#"]');
    var map = {};
    for (var i = 0; i < links.length; i += 1) {
      var id = links[i].getAttribute("href").slice(1);
      var section = document.getElementById(id);
      if (section) map[id] = links[i];
    }
    var ids = Object.keys(map);
    if (!ids.length || !("IntersectionObserver" in window)) return;
    var current = "";
    var observer = new IntersectionObserver(
      function (entries) {
        for (var i = 0; i < entries.length; i += 1) {
          if (entries[i].isIntersecting) current = entries[i].target.id;
        }
        for (var j = 0; j < ids.length; j += 1) {
          map[ids[j]].classList.toggle("is-current", ids[j] === current);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0.1 }
    );
    for (var k = 0; k < ids.length; k += 1) observer.observe(document.getElementById(ids[k]));
  }

  /* ---------- tresillo lattice field ---------- */

  function initField() {
    var canvas = document.getElementById("field");
    var hero = document.querySelector(".hero");
    if (!canvas || !hero || reduceMotion) return;
    var ctx = canvas.getContext("2d");
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var points = [];
    var mx = 0;
    var my = 0;
    var running = false;
    var visible = true;
    var raf = 0;

    function patternX(col) {
      var cycle = col % 8;
      if (cycle < 3) return 3;
      if (cycle < 6) return 3;
      return 2;
    }

    function rebuild() {
      var r = hero.getBoundingClientRect();
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
      canvas.style.width = r.width + "px";
      canvas.style.height = r.height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      points = [];
      var x = 24;
      var col = 0;
      while (x < r.width - 12) {
        var step = patternX(col) * 11;
        for (var y = 28; y < r.height - 12; y += 36) {
          points.push({ x: x, y: y, ox: x, oy: y });
        }
        x += step;
        col += 1;
      }
    }

    function draw() {
      var r = hero.getBoundingClientRect();
      ctx.clearRect(0, 0, r.width, r.height);
      var color = ACCENT[mode] || ACCENT.hype;
      ctx.lineWidth = 1;
      for (var i = 0; i < points.length; i += 1) {
        var p = points[i];
        var dx = p.ox - mx;
        var dy = p.oy - my;
        var dist = Math.sqrt(dx * dx + dy * dy) || 1;
        var force = Math.min(90, 14000 / dist);
        p.x = lerp(p.x, p.ox + (dx / dist) * force * 0.18, 0.12);
        p.y = lerp(p.y, p.oy + (dy / dist) * force * 0.12, 0.12);
        var a = dist < 220 ? 0.42 : 0.12;
        ctx.fillStyle = "rgba(255,255,255," + a + ")";
        ctx.beginPath();
        ctx.arc(p.x, p.y, dist < 140 ? 1.6 : 1.1, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.strokeStyle = color;
      ctx.globalAlpha = 0.16;
      for (var j = 0; j < points.length; j += 1) {
        var a = points[j];
        var dmx = a.x - mx;
        var dmy = a.y - my;
        if (dmx * dmx + dmy * dmy > 180 * 180) continue;
        for (var k = j + 1; k < j + 6 && k < points.length; k += 1) {
          var b = points[k];
          var ddx = a.x - b.x;
          var ddy = a.y - b.y;
          if (ddx * ddx + ddy * ddy < 55 * 55) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      if (running && visible) raf = window.requestAnimationFrame(draw);
    }

    function onMove(e) {
      var r = hero.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    }

    hero.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", rebuild);
    rebuild();

    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        visible = entries[0] && entries[0].isIntersecting;
        if (visible && running) {
          window.cancelAnimationFrame(raf);
          raf = window.requestAnimationFrame(draw);
        }
      });
      io.observe(hero);
    }

    document.addEventListener("visibilitychange", function () {
      running = document.visibilityState === "visible";
      if (running && visible) {
        window.cancelAnimationFrame(raf);
        raf = window.requestAnimationFrame(draw);
      }
    });

    running = true;
    raf = window.requestAnimationFrame(draw);
  }

  /* ---------- stage: mode switch ---------- */

  function setMode(next, opts) {
    if (!next || next === mode) {
      if (opts && opts.scroll) document.getElementById("stage").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
      return;
    }
    var apply = function () {
      mode = next;
      document.documentElement.dataset.mode = next;
      var stage = document.getElementById("stage");
      if (stage) stage.dataset.mode = next;
      var tabs = document.querySelectorAll("button.stage-tab");
      for (var i = 0; i < tabs.length; i += 1) {
        var on = tabs[i].dataset.mode === next;
        tabs[i].setAttribute("aria-selected", on ? "true" : "false");
        tabs[i].tabIndex = on ? 0 : -1;
      }
      var panels = document.querySelectorAll(".stage-panel");
      for (var j = 0; j < panels.length; j += 1) {
        var active = panels[j].dataset.mode === next;
        panels[j].classList.toggle("is-active", active);
        if (active) panels[j].removeAttribute("hidden");
        else panels[j].setAttribute("hidden", "");
      }
      if (next === "jump") {
        if (window.__zukuJumpResize) window.__zukuJumpResize();
        if (window.__zukuJumpLoop) window.__zukuJumpLoop();
      }
      if (opts && opts.scroll) {
        document.getElementById("stage").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
      }
    };

    if (document.startViewTransition && !reduceMotion) {
      document.startViewTransition(apply);
    } else {
      apply();
    }
  }

  function initStage() {
    var tabs = document.querySelectorAll("button.stage-tab");
    var tablist = document.querySelector(".stage-tabs");
    for (var i = 0; i < tabs.length; i += 1) {
      tabs[i].addEventListener("click", function () {
        setMode(this.dataset.mode);
      });
    }
    if (tablist && tabs.length) {
      tablist.addEventListener("keydown", function (e) {
        var order = ["hype", "swipe", "jump"];
        var idx = order.indexOf(mode);
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          e.preventDefault();
          setMode(order[(idx + 1) % 3]);
          document.querySelector('button.stage-tab[data-mode="' + mode + '"]').focus();
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          e.preventDefault();
          setMode(order[(idx + 2) % 3]);
          document.querySelector('button.stage-tab[data-mode="' + mode + '"]').focus();
        } else if (e.key === "Home") {
          e.preventDefault();
          setMode("hype");
          document.getElementById("tab-hype").focus();
        } else if (e.key === "End") {
          e.preventDefault();
          setMode("jump");
          document.getElementById("tab-jump").focus();
        }
      });
    }

    var tries = document.querySelectorAll("button.format-try[data-mode]");
    for (var t = 0; t < tries.length; t += 1) {
      tries[t].addEventListener("click", function () {
        setMode(this.dataset.mode, { scroll: true });
      });
    }

    if (tabs.length) {
      window.addEventListener("keydown", function (e) {
        if (e.target && /input|textarea|select|button/i.test(e.target.tagName)) return;
        if (e.key === "1") setMode("hype");
        if (e.key === "2") setMode("swipe");
        if (e.key === "3") setMode("jump");
      });
    }
  }

  /* ---------- Hype: parallax + timeline ---------- */

  function initHype() {
    var world = document.getElementById("hype-world");
    var scrub = document.getElementById("hype-scrub");
    var toggle = document.getElementById("hype-toggle");
    var label = document.getElementById("hype-label");
    var clock = document.getElementById("hype-clock");
    var scenes = world ? world.querySelectorAll(".hype-scene") : [];
    if (!world || !scrub) return;

    var progress = 0;
    var playing = !reduceMotion;
    var grabbing = false;
    var last = 0;
    var names = ["SCENE 01 — HORIZON", "SCENE 02 — GALLERY", "SCENE 03 — IMMERSE"];

    function fmt(sec) {
      var s = Math.floor(sec);
      return "00:" + (s < 10 ? "0" : "") + s;
    }

    function apply() {
      var idx = progress < 0.33 ? 0 : progress < 0.66 ? 1 : 2;
      for (var i = 0; i < scenes.length; i += 1) scenes[i].classList.toggle("is-on", i === idx);
      if (label) label.textContent = names[idx];
      if (clock) clock.textContent = fmt(progress * 12) + " / 00:12";
      scrub.value = String(Math.round(progress * 1000));
      scrub.style.setProperty("--p", progress * 100 + "%");
      if (toggle) {
        toggle.textContent = playing ? "❚❚" : "▶";
        toggle.setAttribute("aria-pressed", playing ? "true" : "false");
        toggle.setAttribute("aria-label", playing ? "자동 재생 일시정지" : "자동 재생");
      }
    }

    function loop(ts) {
      if (!last) last = ts;
      var dt = Math.min(40, ts - last);
      last = ts;
      if (playing && !grabbing && mode === "hype") {
        progress = (progress + dt / 14000) % 1;
        apply();
      }
      window.requestAnimationFrame(loop);
    }

    world.addEventListener("pointermove", function (e) {
      var r = world.getBoundingClientRect();
      var nx = (e.clientX - r.left) / r.width - 0.5;
      var ny = (e.clientY - r.top) / r.height - 0.5;
      world.style.setProperty("--hx", nx * 28 + "px");
      world.style.setProperty("--hy", ny * 18 + "px");
    });

    world.addEventListener("pointerdown", function (e) {
      if (e.target === scrub) return;
      grabbing = true;
      world.setPointerCapture(e.pointerId);
    });
    world.addEventListener("pointerup", function () {
      grabbing = false;
    });
    world.addEventListener("pointermove", function (e) {
      if (!grabbing) return;
      var r = world.getBoundingClientRect();
      progress = clamp((e.clientX - r.left) / r.width, 0, 1);
      apply();
    });

    scrub.addEventListener("input", function () {
      grabbing = true;
      playing = false;
      progress = Number(scrub.value) / 1000;
      apply();
    });
    scrub.addEventListener("change", function () {
      grabbing = false;
    });

    if (toggle) {
      toggle.addEventListener("click", function () {
        playing = !playing;
        apply();
      });
    }

    world.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        progress = clamp(progress + 0.04, 0, 1);
        playing = false;
        apply();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        progress = clamp(progress - 0.04, 0, 1);
        playing = false;
        apply();
      } else if (e.key === " ") {
        e.preventDefault();
        playing = !playing;
        apply();
      }
    });

    apply();
    window.requestAnimationFrame(loop);
  }

  /* ---------- Swipe reel ---------- */

  function initSwipe() {
    var reel = document.getElementById("swipe-reel");
    var dots = document.getElementById("swipe-dots");
    if (!reel) return;
    var clips = reel.querySelectorAll(".swipe-clip");
    if (dots) {
      dots.innerHTML = "";
      for (var i = 0; i < clips.length; i += 1) {
        var mark = document.createElement("i");
        if (i === 0) mark.className = "is-on";
        dots.appendChild(mark);
      }
    }

    function currentIndex() {
      var h = reel.clientHeight || 1;
      return clamp(Math.round(reel.scrollTop / h), 0, clips.length - 1);
    }

    function updateDots() {
      if (!dots) return;
      var idx = currentIndex();
      var marks = dots.children;
      for (var i = 0; i < marks.length; i += 1) marks[i].classList.toggle("is-on", i === idx);
    }

    reel.addEventListener("scroll", updateDots, { passive: true });

    reel.addEventListener(
      "wheel",
      function (e) {
        if (Math.abs(e.deltaY) < 8) return;
        e.preventDefault();
        var idx = currentIndex() + (e.deltaY > 0 ? 1 : -1);
        idx = clamp(idx, 0, clips.length - 1);
        reel.scrollTo({ top: idx * reel.clientHeight, behavior: reduceMotion ? "auto" : "smooth" });
      },
      { passive: false }
    );

    reel.addEventListener("keydown", function (e) {
      var idx = currentIndex();
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        idx = clamp(idx + 1, 0, clips.length - 1);
        reel.scrollTo({ top: idx * reel.clientHeight, behavior: reduceMotion ? "auto" : "smooth" });
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        idx = clamp(idx - 1, 0, clips.length - 1);
        reel.scrollTo({ top: idx * reel.clientHeight, behavior: reduceMotion ? "auto" : "smooth" });
      }
    });
  }

  /* ---------- Jump mini-game ---------- */

  function initJump() {
    var canvas = document.getElementById("jump-canvas");
    var overlay = document.getElementById("jump-overlay");
    var scoreEl = document.getElementById("jump-score");
    var bestEl = document.getElementById("jump-best");
    if (!canvas) return;
    var ctx = canvas.getContext("2d");
    var W = 960;
    var H = 420;
    var dpr = 1;
    var playing = false;
    var dead = false;
    var looping = false;
    var score = 0;
    var best = 0;
    try {
      best = Number(window.localStorage.getItem("zuku-jump-best") || 0);
    } catch (err) {
      best = 0;
    }
    var y = 0;
    var vy = 0;
    var ground = 0;
    var obstacles = [];
    var spawn = 0;
    var speed = 5.2;
    var raf = 0;
    var last = 0;

    function resize() {
      var wrap = canvas.parentElement;
      var r = wrap.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = Math.max(320, r.width);
      H = Math.max(280, r.height);
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ground = H * 0.78;
      if (!playing) y = ground - 36;
    }
    window.__zukuJumpResize = resize;
    window.addEventListener("resize", resize);

    function reset() {
      score = 0;
      speed = 5.2;
      obstacles = [{ x: W + 80, w: 28, h: 46 }];
      spawn = 0;
      y = ground - 36;
      vy = 0;
      dead = false;
      playing = true;
      overlay.classList.remove("is-on");
    }

    function hop() {
      if (mode !== "jump") return;
      if (!playing || dead) {
        reset();
        vy = -13.2;
        return;
      }
      if (y >= ground - 37) vy = -13.2;
    }

    function tick(ts) {
      if (mode !== "jump") {
        looping = false;
        return;
      }
      var dt = last ? Math.min(32, ts - last) / 16.67 : 1;
      last = ts;

      if (playing && !dead) {
        vy += 0.72 * dt;
        y += vy * dt;
        if (y > ground - 36) {
          y = ground - 36;
          vy = 0;
        }
        speed = 5.2 + score * 0.012;
        spawn += dt;
        if (spawn > 70 - Math.min(30, score * 0.4)) {
          spawn = 0;
          var h = 34 + Math.random() * 42;
          obstacles.push({ x: W + 20, w: 22 + Math.random() * 18, h: h });
        }
        for (var i = obstacles.length - 1; i >= 0; i -= 1) {
          obstacles[i].x -= speed * dt * 1.35;
          if (obstacles[i].x + obstacles[i].w < -20) {
            obstacles.splice(i, 1);
            score += 1;
          }
        }
        var px = W * 0.18;
        var py = y;
        var pw = 28;
        var ph = 36;
        for (var j = 0; j < obstacles.length; j += 1) {
          var o = obstacles[j];
          var ox = o.x;
          var oy = ground - o.h;
          if (px < ox + o.w && px + pw > ox && py < oy + o.h && py + ph > oy) {
            dead = true;
            playing = false;
            if (score > best) {
              best = score;
              try {
                window.localStorage.setItem("zuku-jump-best", String(best));
              } catch (err2) {}
            }
            overlay.classList.add("is-on");
            overlay.querySelector("p").textContent = "Again";
            overlay.querySelector("span").textContent = "충돌 · 클릭 또는 Space로 재시작";
          }
        }
        if (scoreEl) scoreEl.textContent = String(score).padStart(3, "0");
        if (bestEl) bestEl.textContent = best ? "BEST " + String(best).padStart(3, "0") : "";
      }

      draw();
      looping = true;
      raf = window.requestAnimationFrame(tick);
    }

    function ensureLoop() {
      if (looping) return;
      last = 0;
      looping = true;
      raf = window.requestAnimationFrame(tick);
    }
    window.__zukuJumpLoop = ensureLoop;

    function drawDrop(x, cy, color) {
      ctx.save();
      ctx.translate(x, cy);
      ctx.beginPath();
      ctx.moveTo(0, -22);
      ctx.bezierCurveTo(-18, -4, -18, 14, 0, 18);
      ctx.bezierCurveTo(18, 14, 18, -4, 0, -22);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 16;
      ctx.fill();
      ctx.restore();
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#07070c";
      ctx.fillRect(0, 0, W, H);

      ctx.strokeStyle = "rgba(0,255,136,0.08)";
      ctx.lineWidth = 1;
      for (var gx = 0; gx < W; gx += 48) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, H);
        ctx.stroke();
      }
      for (var gy = 0; gy < H; gy += 48) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(W, gy);
        ctx.stroke();
      }

      ctx.strokeStyle = "#00ff88";
      ctx.globalAlpha = 0.55;
      ctx.beginPath();
      ctx.moveTo(0, ground + 0.5);
      ctx.lineTo(W, ground + 0.5);
      ctx.stroke();
      ctx.globalAlpha = 1;

      for (var i = 0; i < obstacles.length; i += 1) {
        var o = obstacles[i];
        ctx.fillStyle = "rgba(0,255,136,0.12)";
        ctx.strokeStyle = "#00ff88";
        ctx.lineWidth = 1.5;
        ctx.fillRect(o.x, ground - o.h, o.w, o.h);
        ctx.strokeRect(o.x + 0.5, ground - o.h + 0.5, o.w, o.h);
      }

      drawDrop(W * 0.18 + 14, y + 4, dead ? "#ff2d78" : "#5ce1e6");
    }

    canvas.addEventListener("pointerdown", function (e) {
      e.preventDefault();
      hop();
    });
    window.addEventListener("keydown", function (e) {
      if (e.code !== "Space" && e.key !== " ") return;
      if (mode !== "jump") return;
      if (e.target && /input|textarea|button/i.test(e.target.tagName)) return;
      e.preventDefault();
      hop();
    });

    if (mode === "jump") ensureLoop();
  }

  /* ---------- tech tilt ---------- */

  function initTilt() {
    if (reduceMotion || window.matchMedia("(hover: none)").matches) return;
    var cards = document.querySelectorAll(".tilt");
    for (var i = 0; i < cards.length; i += 1) {
      (function (el) {
        el.addEventListener("pointermove", function (e) {
          var r = el.getBoundingClientRect();
          var x = (e.clientX - r.left) / r.width - 0.5;
          var y = (e.clientY - r.top) / r.height - 0.5;
          el.style.transform = "perspective(700px) rotateY(" + x * 8 + "deg) rotateX(" + -y * 8 + "deg)";
        });
        el.addEventListener("pointerleave", function () {
          el.style.transform = "";
        });
      })(cards[i]);
    }
  }

  /* ---------- tresillo beat ---------- */

  function initBeat() {
    var trigger = document.getElementById("beat-trigger");
    var bars = document.querySelector(".tresillo");
    if (!trigger || !bars) return;
    function play() {
      bars.classList.remove("is-playing");
      void bars.offsetWidth;
      bars.classList.add("is-playing");
    }
    trigger.addEventListener("click", play);
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          if (entries[0] && entries[0].isIntersecting) play();
        },
        { threshold: 0.4 }
      );
      io.observe(bars);
    } else {
      play();
    }
  }

  /* ---------- detail-page widgets ---------- */

  function initMeters() {
    var meters = document.querySelectorAll(".meter");
    if (!meters.length) return;
    for (var i = 0; i < meters.length; i += 1) {
      (function (el) {
        var fill = el.querySelector(".meter-fill");
        var note = el.querySelector(".meter-note");
        var cap = Number(el.dataset.cap || 100);
        var unit = el.dataset.unit || "";
        var label = el.dataset.label || "";
        var orig = note ? note.textContent : "";

        function setFromEvent(e) {
          var track = el.querySelector(".meter-track");
          var r = track.getBoundingClientRect();
          var p = clamp((e.clientX - r.left) / r.width, 0, 1) * 100;
          var clamped = p > cap;
          if (clamped) p = cap;
          fill.style.width = p + "%";
          el.classList.toggle("is-clamped", clamped);
          if (note) {
            note.textContent = clamped
              ? label + " 한도 " + cap + unit + " — 경계를 넘을 수 없습니다"
              : orig;
          }
        }

        el.querySelector(".meter-track").addEventListener("pointerdown", function (e) {
          this.setPointerCapture(e.pointerId);
          setFromEvent(e);
        });
        el.querySelector(".meter-track").addEventListener("pointermove", function (e) {
          if (!this.hasPointerCapture(e.pointerId)) return;
          setFromEvent(e);
        });
      })(meters[i]);
    }
  }

  function initBoundary() {
    var box = document.querySelector(".boundary");
    var status = document.getElementById("boundary-status");
    if (!box) return;
    function set(which) {
      box.classList.toggle("is-in", which === "in");
      box.classList.toggle("is-out", which === "out");
      if (status) {
        status.textContent =
          which === "in"
            ? "안쪽: 권한 없는 워크로드만 실행됩니다. 호스트 권한은 넘어오지 않습니다."
            : "바깥: 호스트 영역입니다. 인터랙티브 패키지는 이 쪽으로 올라올 수 없습니다.";
      }
    }
    box.querySelector(".boundary-in").addEventListener("pointerenter", function () { set("in"); });
    box.querySelector(".boundary-out").addEventListener("pointerenter", function () { set("out"); });
    box.querySelector(".boundary-in").addEventListener("click", function () { set("in"); });
    box.querySelector(".boundary-out").addEventListener("click", function () { set("out"); });
    set("in");
  }

  function initFeed() {
    var stems = document.querySelectorAll(".stem[data-toggle]");
    for (var i = 0; i < stems.length; i += 1) {
      stems[i].addEventListener("click", function () {
        this.classList.toggle("is-open");
      });
      stems[i].addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.classList.toggle("is-open");
        }
      });
    }
  }

  function initPipeline() {
    var steps = document.querySelectorAll(".pipe-step");
    if (!steps.length) return;
    function open(idx) {
      for (var i = 0; i < steps.length; i += 1) steps[i].classList.toggle("is-on", i === idx);
    }
    for (var s = 0; s < steps.length; s += 1) {
      (function (i) {
        steps[i].addEventListener("click", function () { open(i); });
      })(s);
    }
    open(0);
  }

  function initPresets() {
    var row = document.querySelector(".preset-row");
    var preview = document.querySelector(".aist-preview");
    if (!row || !preview) return;
    var title = preview.querySelector("strong");
    var sub = preview.querySelector("span");
    var buttons = row.querySelectorAll("button");
    for (var i = 0; i < buttons.length; i += 1) {
      buttons[i].addEventListener("click", function () {
        for (var j = 0; j < buttons.length; j += 1) buttons[j].classList.remove("is-on");
        this.classList.add("is-on");
        if (title) title.textContent = this.dataset.title || this.textContent;
        if (sub) sub.textContent = this.dataset.sub || "";
        preview.style.setProperty("--accent", this.dataset.color || "var(--purple)");
      });
    }
  }

  function initWave() {
    var canvas = document.getElementById("vine-wave");
    if (!canvas || reduceMotion) return;
    var ctx = canvas.getContext("2d");
    var raf = 0;
    var t = 0;
    function resize() {
      var r = canvas.parentElement.getBoundingClientRect();
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = r.width * dpr;
      canvas.height = r.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function draw() {
      var w = canvas.parentElement.clientWidth;
      var h = canvas.parentElement.clientHeight;
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = "#b44dff";
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (var x = 0; x <= w; x += 3) {
        var n = x / w;
        var beat = n < 0.375 ? 1 : n < 0.75 ? 0.85 : 0.55;
        var y = h * 0.5 + Math.sin(n * 18 + t) * 28 * beat + Math.sin(n * 5 + t * 0.6) * 12;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      t += 0.04;
      raf = window.requestAnimationFrame(draw);
    }
    window.addEventListener("resize", resize);
    resize();
    raf = window.requestAnimationFrame(draw);
  }

  function initCopy() {
    var btn = document.getElementById("copy-mail");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var mail = btn.dataset.mail || "contact@crevision.kr";
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(mail).then(function () {
          btn.textContent = "복사됨";
          setTimeout(function () { btn.textContent = "주소 복사"; }, 1600);
        });
      }
    });
  }

  ready(function () {
    initPointer();
    initMagnetic();
    initReveal();
    initStickyHeader();
    initProgress();
    initNavSpy();
    initField();
    initStage();
    initHype();
    initSwipe();
    initJump();
    initTilt();
    initBeat();
    initMeters();
    initBoundary();
    initFeed();
    initPipeline();
    initPresets();
    initWave();
    initCopy();
  });
})();
