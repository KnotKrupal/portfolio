// hero text role cycler
const roles = [
  "Digital Manufacturing Engineer",
  "Automation / Tooling Developer",
  "UV Print & Laser Specialist",
  "VFX Pipeline TD",
  "Hybrid Systems Thinker"
];

let roleIndex = 0;
const roleElement = document.getElementById("roleCycler");

function cycleRole() {
  roleIndex = (roleIndex + 1) % roles.length;
  if (!roleElement) return;

  roleElement.classList.add("fade-out");
  setTimeout(() => {
    roleElement.textContent = roles[roleIndex];
    roleElement.classList.remove("fade-out");
  }, 230);
}

setInterval(cycleRole, 2800);

// intersection observer for reveals
const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15
  }
);

revealElements.forEach(el => observer.observe(el));

// tilt effect
const tiltCards = document.querySelectorAll(".tilt-card");

tiltCards.forEach(card => {
  card.addEventListener("mousemove", event => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / rect.height) * 8;
    const rotateY = (x / rect.width) * 8;

    card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(700px) rotateX(0deg) rotateY(0deg) translateY(0)";
  });
});

// theme toggle
const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("theme-light");
  });
}

// persona mode logic
const personaLabel = document.getElementById("personaLabel");
const personaDescription = document.getElementById("personaDescription");
const personaChips = document.querySelectorAll(".persona-chip");

const personaDescriptions = {
  hybrid:
    "Hybrid mode enabled: mixing code, VFX and manufacturing to build systems that hit both performance and aesthetics.",
  tech:
    "Tech mode: code-first mindset – Python tooling, data flows, automation and clean UX for operators and stakeholders.",
  vfx:
    "VFX mode: cinematic eye for detail, compositing, FX and design that makes even technical demos feel premium.",
  print:
    "Print mode: deep understanding of UV, laser and screen workflows, fixtures and practical constraints on the floor."
};

personaChips.forEach(chip => {
  chip.addEventListener("click", () => {
    const persona = chip.dataset.persona || "hybrid";

    personaChips.forEach(c => c.classList.remove("persona-chip--active"));
    chip.classList.add("persona-chip--active");

    if (personaLabel) personaLabel.textContent = persona.toUpperCase();
    if (personaDescription)
      personaDescription.textContent = personaDescriptions[persona];

    document.body.dataset.persona = persona;
  });
});

// project details toggling
const projectToggles = document.querySelectorAll(".project-toggle");

projectToggles.forEach(btn => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".project-card");
    if (!card) return;
    const details = card.querySelector(".project-details");
    if (!details) return;
    const isOpen = details.classList.contains("open");
    details.classList.toggle("open", !isOpen);
    btn.textContent = isOpen ? "See how it works" : "Hide details";
  });
});

// year in footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// contact form -> generate mailto
function handleContactSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  const subject = encodeURIComponent(
    `Opportunity / Project – from ${name || "your portfolio"}`
  );

  const bodyLines = [
    `Hi Krupal,`,
    "",
    `My name is ${name || "[Your name]"} and I came across your portfolio.`,
    "",
    message || "[Describe the role / project / problem you’re trying to solve.]",
    "",
    `You can reach me back at: ${email || "[Your email]"}`,
    "",
    "Best,",
    name || ""
  ];

  const body = encodeURIComponent(bodyLines.join("\n"));

  window.location.href = `mailto:dotkrupal@gmail.com?subject=${subject}&body=${body}`;
  return false;
}

window.handleContactSubmit = handleContactSubmit;

// hero background canvas (simple particle field)
(function initHeroCanvas() {
  const canvas = document.getElementById("heroCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight * 0.7);

  const numParticles = 80;
  const particles = [];

  function createParticle() {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      r: Math.random() * 1.8 + 0.5
    };
  }

  for (let i = 0; i < numParticles; i++) {
    particles.push(createParticle());
  }

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight * 0.7;
  }

  window.addEventListener("resize", resize);

  function step() {
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = "rgba(15,23,42,0.95)";
    ctx.fillRect(0, 0, width, height);

    // particles
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(129,140,248,0.6)";
      ctx.fill();
    });

    // connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          const alpha = 1 - dist / 110;
          ctx.strokeStyle = `rgba(79,70,229,${alpha * 0.55})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(step);
  }

  step();
})();
