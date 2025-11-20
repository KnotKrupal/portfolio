document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  /* =========
     Mode switcher
     ========= */
  const modePills = document.querySelectorAll(".mode-pill");
  const roleText = document.getElementById("roleText");
  const debugMode = document.getElementById("debugMode");

  const modeRoleMap = {
    hybrid: "Digital manufacturing & automation",
    dev: "Internal tools, scripting & data flows",
    vfx: "Cinematic pipelines & visual storytelling",
    print: "UV, laser & shop-floor constraints",
    maker: "Fixtures, jigs & 3D-printed experiments"
  };

  modePills.forEach((pill) => {
    pill.addEventListener("click", () => {
      const mode = pill.dataset.mode || "hybrid";
      body.dataset.mode = mode;

      modePills.forEach((p) => p.classList.remove("mode-pill--active"));
      pill.classList.add("mode-pill--active");

      if (roleText && modeRoleMap[mode]) {
        roleText.textContent = modeRoleMap[mode];
      }
      if (debugMode) debugMode.textContent = mode;
    });
  });

  /* =========
     Metrics flip
     ========= */
  const metrics = document.querySelectorAll(".metric");

  metrics.forEach((metric) => {
    metric.addEventListener("click", () => {
      const main = metric.querySelector("[data-metric-main]");
      const alt = metric.querySelector("[data-metric-alt]");
      if (!main || !alt) return;
      const showingAlt = !alt.hasAttribute("hidden");
      if (showingAlt) {
        alt.setAttribute("hidden", "hidden");
        main.removeAttribute("hidden");
      } else {
        main.setAttribute("hidden", "hidden");
        alt.removeAttribute("hidden");
      }
    });
  });

  /* =========
     Hero experiments toggle
     ========= */
  const expBtn = document.getElementById("toggleHiddenExperiments");
  const expList = document.getElementById("hiddenExperiments");

  if (expBtn && expList) {
    expBtn.addEventListener("click", () => {
      const isHidden = expList.hasAttribute("hidden");
      if (isHidden) {
        expList.removeAttribute("hidden");
        expBtn.textContent = "Hide side experiments";
      } else {
        expList.setAttribute("hidden", "hidden");
        expBtn.textContent = "Show a few side experiments";
      }
    });
  }

  /* =========
     About timeline toggle
     ========= */
  const aboutToggle = document.getElementById("aboutToggleTimeline");
  const aboutTimeline = document.getElementById("aboutTimeline");

  if (aboutToggle && aboutTimeline) {
    aboutToggle.addEventListener("click", () => {
      const isHidden = aboutTimeline.hasAttribute("hidden");
      if (isHidden) {
        aboutTimeline.removeAttribute("hidden");
        aboutToggle.textContent =
          "Hide how VFX, print and code ended up in one brain";
      } else {
        aboutTimeline.setAttribute("hidden", "hidden");
        aboutToggle.textContent =
          "See how VFX, print and code ended up in one brain";
      }
    });
  }

  /* =========
     Profile as JSON overlay
     ========= */
  const viewJsonBtn = document.getElementById("viewJsonBtn");
  const jsonOverlay = document.getElementById("jsonOverlay");
  const jsonClose = document.getElementById("jsonClose");
  const jsonContent = document.getElementById("jsonContent");

  const profileJson = {
    name: "Krupal Upadhyay",
    base: "Toronto, Canada",
    education: {
      bachelor: "B.Eng Computer Engineering",
      postgrad_vfx: "Visual Effects for Film & TV – Seneca",
      postgrad_marketing: "Marketing Management – Centennial"
    },
    focus: [
      "Digital manufacturing & automation",
      "UV printing & fiber laser workflows",
      "VFX pipeline and visual storytelling",
      "3D-printed jigs and fixtures"
    ],
    tools: {
      languages: ["Python", "PowerShell", "JavaScript (front-end)"],
      machines: ["Mimaki UJF series", "Canon Arizona", "OMTech MOPA fiber"],
      3d_print: ["Bambu Lab X1E"],
      automation: ["n8n", "internal scripts", "LightBurn templates"]
    },
    looking_for: [
      "Digital manufacturing / automation roles",
      "Hybrid tech + creative teams",
      "Places that care about systems and people"
    ]
  };

  function openJson() {
    if (!jsonOverlay || !jsonContent) return;
    jsonContent.textContent = JSON.stringify(profileJson, null, 2);
    jsonOverlay.hidden = false;
  }

  function closeJson() {
    if (!jsonOverlay) return;
    jsonOverlay.hidden = true;
  }

  if (viewJsonBtn) viewJsonBtn.addEventListener("click", openJson);
  if (jsonClose) jsonClose.addEventListener("click", closeJson);
  if (jsonOverlay) {
    jsonOverlay.addEventListener("click", (e) => {
      if (e.target === jsonOverlay) closeJson();
    });
  }

  /* =========
     Project toggles + filters
     ========= */
  const projectToggles = document.querySelectorAll(".project-toggle");
  const filterChips = document.querySelectorAll(".filter-chip");
  const projectCards = document.querySelectorAll(".project-card");

  projectToggles.forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".project-card");
      if (!card) return;
      const details = card.querySelector(".project-details");
      if (!details) return;
      const isHidden = details.hasAttribute("hidden");
      if (isHidden) {
        details.removeAttribute("hidden");
        btn.textContent = "Hide case study";
      } else {
        details.setAttribute("hidden", "hidden");
        btn.textContent = "View case study";
      }
    });
  });

  filterChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const filter = chip.dataset.filter || "all";

      filterChips.forEach((c) => c.classList.remove("filter-chip--active"));
      chip.classList.add("filter-chip--active");

      projectCards.forEach((card) => {
        const tags = (card.dataset.tags || "").split(",").map((t) => t.trim());
        if (filter === "all") {
          card.classList.remove("hidden");
        } else {
          if (tags.includes(filter)) {
            card.classList.remove("hidden");
          } else {
            card.classList.add("hidden");
          }
        }
      });
    });
  });

  /* =========
     Lab terminal
     ========= */
  const terminalForm = document.getElementById("terminalForm");
  const terminalInput = document.getElementById("terminalCommand");
  const terminalOutput = document.getElementById("terminalOutput");

  const terminalLines = [
    "help → commands",
    "questions → questions I ask before changing a process",
    "defaults → principles I keep in mind",
    "values → what I optimize for",
    "clear → clear this log",
    "reset → start again"
  ];

  function appendTerminalLine(text) {
    if (!terminalOutput) return;
    const div = document.createElement("div");
    div.className = "line";
    div.textContent = text;
    terminalOutput.appendChild(div);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  function handleTerminalCommand(cmdRaw) {
    const cmd = cmdRaw.trim().toLowerCase();
    if (!cmd) return;

    appendTerminalLine("> " + cmdRaw);

    if (cmd === "help") {
      terminalLines.forEach((l) => appendTerminalLine(l));
    } else if (cmd === "questions") {
      appendTerminalLine("• What breaks if this fails silently?");
      appendTerminalLine("• Who has to wake up at 3am if this goes wrong?");
      appendTerminalLine("• Can an operator explain this without me in the room?");
    } else if (cmd === "defaults") {
      appendTerminalLine("• Prefer boring, reliable systems.");
      appendTerminalLine("• Fewer clicks, fewer surprises.");
      appendTerminalLine("• Make the right thing the easiest thing.");
    } else if (cmd === "values") {
      appendTerminalLine("• Clarity over cleverness.");
      appendTerminalLine("• Repeatability over one-off heroics.");
      appendTerminalLine("• Respect for people doing the actual work.");
    } else if (cmd === "clear") {
      if (terminalOutput) terminalOutput.innerHTML = "";
    } else if (cmd === "reset") {
      if (terminalOutput) {
        terminalOutput.innerHTML = "";
        appendTerminalLine(
          'Type "help" to see a few prompts I use when designing systems.'
        );
      }
    } else {
      appendTerminalLine("Unknown command. Try: help");
    }
  }

  if (terminalForm && terminalInput) {
    terminalForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const value = terminalInput.value;
      handleTerminalCommand(value);
      terminalInput.value = "";
    });
  }

  /* =========
     Contact form → mailto
     ========= */
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = contactForm.querySelector("#cfName")?.value.trim() || "";
      const email = contactForm.querySelector("#cfEmail")?.value.trim() || "";
      const context =
        contactForm.querySelector("#cfContext")?.value.trim() ||
        "[Tell me about the problem / role]";

      const subject = encodeURIComponent(
        `Opportunity / project – from ${name || "your portfolio"}`
      );

      const bodyLines = [
        "Hi Krupal,",
        "",
        `My name is ${name || "[Your name]"} and I came across your portfolio.`,
        "",
        context,
        "",
        `You can reach me at: ${email || "[your email]"}`,
        "",
        "Best,",
        name || ""
      ];

      const body = encodeURIComponent(bodyLines.join("\n"));
      window.location.href = `mailto:dotkrupal@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  /* =========
     Footer easter egg (rotate tagline)
     ========= */
  const footerBtn = document.getElementById("footerEasterEgg");
  const footerTagline = document.getElementById("footerTagline");
  const taglineOptions = [
    "Designing calmer systems for busy floors.",
    "Bridging code, cameras and control panels.",
    "Making printers, lasers and humans get along.",
    "Small tools, big relief for operators.",
    "Less chaos, more signal."
  ];
  let taglineIndex = 0;

  if (footerBtn && footerTagline) {
    footerBtn.addEventListener("click", () => {
      taglineIndex = (taglineIndex + 1) % taglineOptions.length;
      footerTagline.textContent = taglineOptions[taglineIndex];
    });
  }

  /* =========
     Debug panel (toggle with 'd')
     ========= */
  const debugPanel = document.getElementById("debugPanel");
  const debugScroll = document.getElementById("debugScroll");

  function updateScrollDebug() {
    if (!debugScroll) return;
    debugScroll.textContent = String(window.scrollY | 0);
  }

  window.addEventListener("scroll", updateScrollDebug);

  document.addEventListener("keydown", (e) => {
    if (e.key === "d" || e.key === "D") {
      if (!debugPanel) return;
      debugPanel.hidden = !debugPanel.hidden;
    }
  });

  /* =========
     Brand double-click easter egg
     ========= */
  const brandLink = document.getElementById("brandLink");
  const hiddenNoteCard = document.getElementById("hiddenNoteCard");

  if (brandLink && hiddenNoteCard) {
    brandLink.addEventListener("dblclick", (e) => {
      e.preventDefault();
      hiddenNoteCard.classList.toggle("subtle-border");
      hiddenNoteCard.classList.toggle("highlight-card");
    });
  }

  /* =========
     Year in footer
     ========= */
  const yearSpan = document.getElementById("yearSpan");
  if (yearSpan) {
    yearSpan.textContent = String(new Date().getFullYear());
  }

  /* =========
     Hero background canvas (subtle particle field)
     ========= */
  const canvas = document.getElementById("heroCanvas");
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const particleCount = 70;
    const particles = [];

    function createParticle() {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        r: Math.random() * 1.3 + 0.4
      };
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }

    function resizeCanvas() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", resizeCanvas);

    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#020617";
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(148,163,184,0.6)";
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            const alpha = 1 - dist / 110;
            ctx.strokeStyle = `rgba(56,189,248,${alpha * 0.35})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(draw);
    }

    draw();
  }
});
