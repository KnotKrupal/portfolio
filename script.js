// ============================================
// KRUPAL UPADHYAY PORTFOLIO - JAVASCRIPT
// Advanced interactions and animations
// ============================================

// === GLOBAL STATE ===
const state = {
  currentPersona: 'hybrid',
  isLoading: true,
  scrollY: 0,
  isMenuOpen: false
};

// === PERSONA DESCRIPTIONS ===
const personaDescriptions = {
  hybrid: "Hybrid mode active: Blending software engineering, VFX pipeline expertise, and manufacturing systems knowledge to create solutions that are both technically robust and visually refined.",
  tech: "Tech mode active: Code-first automation specialist focusing on Python tooling, data workflows, and building internal systems that eliminate manual bottlenecks and human error.",
  vfx: "VFX mode active: Cinematic precision meets technical pipeline development. Expertise in compositing, FX work, and creating visual experiences that demand frame-perfect attention to detail.",
  print: "Manufacturing mode active: Deep hands-on knowledge of UV printing, laser engraving, fixture design, and the practical constraints of production floor operations."
};

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
  initializeLoading();
  initializeNavigation();
  initializeTheme();
  initializePersonaSwitcher();
  initializeCursor();
  initializeParticles();
  initializeScrollEffects();
  initializeAnimations();
  initializeHeroTyping();
  initializeModeCards();
  initializeProjects();
  initializeContactForm();
  initializeBackToTop();
  
  // Set current year in footer
  document.getElementById('currentYear').textContent = new Date().getFullYear();
});

// === LOADING SCREEN ===
function initializeLoading() {
  const loadingScreen = document.getElementById('loadingScreen');
  const loadingProgress = document.getElementById('loadingProgress');
  const loadingStatus = document.getElementById('loadingStatus');
  
  const statuses = [
    'Initializing systems...',
    'Loading automation protocols...',
    'Calibrating VFX engines...',
    'Syncing manufacturing data...',
    'Almost ready...'
  ];
  
  let progress = 0;
  let statusIndex = 0;
  
  const interval = setInterval(() => {
    progress += Math.random() * 30;
    if (progress > 100) progress = 100;
    
    loadingProgress.style.width = progress + '%';
    
    if (statusIndex < statuses.length) {
      loadingStatus.textContent = statuses[statusIndex];
      statusIndex++;
    }
    
    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
          loadingScreen.style.display = 'none';
          state.isLoading = false;
          document.body.style.overflow = 'auto';
        }, 500);
      }, 300);
    }
  }, 400);
}

// === NAVIGATION ===
function initializeNavigation() {
  const header = document.getElementById('siteHeader');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('navMenu');
  
  // Smooth scroll to sections
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offset = 80;
          const targetPosition = target.offsetTop - offset;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Close mobile menu
          if (window.innerWidth <= 768) {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
            state.isMenuOpen = false;
          }
          
          // Update active state
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  });
  
  // Mobile menu toggle
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      mobileToggle.classList.toggle('active');
      state.isMenuOpen = !state.isMenuOpen;
      document.body.style.overflow = state.isMenuOpen ? 'hidden' : 'auto';
    });
  }
  
  // Scroll behavior for header
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    if (currentScroll > lastScroll && currentScroll > 300) {
      header.classList.add('hidden');
    } else {
      header.classList.remove('hidden');
    }
    
    lastScroll = currentScroll;
    state.scrollY = currentScroll;
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
  });
}

function updateActiveNavLink() {
  const sections = document.querySelectorAll('.section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (state.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// === THEME TOGGLE ===
function initializeTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme') || 'dark';
  
  document.body.classList.toggle('theme-light', savedTheme === 'light');
  
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('theme-light');
      const newTheme = document.body.classList.contains('theme-light') ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
    });
  }
}

// === PERSONA SWITCHER ===
function initializePersonaSwitcher() {
  const personaBtns = document.querySelectorAll('.persona-btn');
  const personaDescription = document.getElementById('personaDescription');
  
  personaBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const persona = btn.dataset.persona;
      
      // Update button states
      personaBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Update description
      if (personaDescription) {
        personaDescription.style.opacity = '0';
        setTimeout(() => {
          personaDescription.textContent = personaDescriptions[persona];
          personaDescription.style.opacity = '1';
        }, 150);
      }
      
      // Update body attribute
      document.body.dataset.persona = persona;
      state.currentPersona = persona;
    });
  });
}

// === CUSTOM CURSOR ===
function initializeCursor() {
  if (window.innerWidth <= 1024) return; // Skip on mobile/tablet
  
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  
  let mouseX = 0, mouseY = 0;
  let dotX = 0, dotY = 0;
  let ringX = 0, ringY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  function animateCursor() {
    dotX += (mouseX - dotX) * 0.8;
    dotY += (mouseY - dotY) * 0.8;
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    
    cursorDot.style.left = dotX + 'px';
    cursorDot.style.top = dotY + 'px';
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    
    requestAnimationFrame(animateCursor);
  }
  
  animateCursor();
  
  // Add cursor effects on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .project-card, .mode-card');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-active');
    });
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-active');
    });
  });
}

// === PARTICLE CANVAS ===
function initializeParticles() {
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  
  const particles = [];
  const particleCount = Math.min(80, Math.floor(width / 20));
  
  class Particle {
    constructor() {
      this.reset();
    }
    
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 1.5 + 0.5;
    }
    
    update() {
      this.x += this.vx;
      this.y += this.vy;
      
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(102, 126, 234, 0.4)';
      ctx.fill();
    }
  }
  
  // Initialize particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
  
  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(102, 126, 234, ${0.15 * (1 - distance / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }
  
  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    
    drawConnections();
    requestAnimationFrame(animate);
  }
  
  animate();
  
  // Handle resize
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
}

// === SCROLL EFFECTS ===
function initializeScrollEffects() {
  // Parallax effect on hero
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallax = scrolled * 0.5;
      heroSection.style.transform = `translateY(${parallax}px)`;
    });
  }
}

// === SCROLL ANIMATIONS (AOS-like) ===
function initializeAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
        // Optionally unobserve after animation
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
  });
}

// === HERO TYPING EFFECT ===
function initializeHeroTyping() {
  const typingText = document.getElementById('typingText');
  if (!typingText) return;
  
  const words = ['code', 'machines', 'automation', 'vision', 'systems'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  
  function type() {
    const current = words[wordIndex];
    
    if (isDeleting) {
      typingText.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingText.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === current.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500;
    }
    
    setTimeout(type, typeSpeed);
  }
  
  type();
}

// === MODE CARDS ===
function initializeModeCards() {
  const modeCards = document.querySelectorAll('.mode-card');
  const personaDescription = document.getElementById('personaDescription');
  
  modeCards.forEach(card => {
    card.addEventListener('click', () => {
      const mode = card.dataset.mode;
      
      // Update active state
      modeCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      
      // Update description
      if (personaDescription) {
        personaDescription.style.opacity = '0';
        setTimeout(() => {
          personaDescription.textContent = personaDescriptions[mode];
          personaDescription.style.opacity = '1';
        }, 150);
      }
      
      // Also update persona buttons in header
      const personaBtns = document.querySelectorAll('.persona-btn');
      personaBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.persona === mode);
      });
      
      document.body.dataset.persona = mode;
      state.currentPersona = mode;
    });
  });
}

// === PROJECT CARDS ===
function initializeProjects() {
  const expandButtons = document.querySelectorAll('.project-expand');
  
  expandButtons.forEach(button => {
    button.addEventListener('click', () => {
      const projectId = button.dataset.project;
      const details = document.getElementById(`projectDetails${projectId}`);
      const isOpen = details.classList.contains('open');
      
      // Close all other details
      document.querySelectorAll('.project-details').forEach(d => {
        d.classList.remove('open');
      });
      document.querySelectorAll('.project-expand').forEach(b => {
        b.classList.remove('active');
        b.querySelector('span:first-child').textContent = 'View Technical Details';
      });
      
      // Toggle current
      if (!isOpen) {
        details.classList.add('open');
        button.classList.add('active');
        button.querySelector('span:first-child').textContent = 'Hide Technical Details';
      }
    });
  });
}

// === CONTACT FORM ===
function initializeContactForm() {
  const form = document.getElementById('contactForm');
  
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Create mailto link
      const subjectMap = {
        job: 'Job Opportunity',
        consulting: 'Consulting Project',
        collaboration: 'Collaboration Opportunity',
        other: 'General Inquiry'
      };
      
      const mailtoSubject = encodeURIComponent(`${subjectMap[subject]} - ${name}`);
      const mailtoBody = encodeURIComponent(
        `Hi Krupal,\n\n` +
        `My name is ${name} and I'm reaching out regarding a ${subjectMap[subject].toLowerCase()}.\n\n` +
        `${message}\n\n` +
        `Best regards,\n${name}\n\n` +
        `---\nReply to: ${email}`
      );
      
      window.location.href = `mailto:dotkrupal@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
    });
  }
}

// === BACK TO TOP BUTTON ===
function initializeBackToTop() {
  const button = document.getElementById('backToTop');
  
  if (button) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 500) {
        button.classList.add('visible');
      } else {
        button.classList.remove('visible');
      }
    });
    
    button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// === UTILITY FUNCTIONS ===
function throttle(func, delay) {
  let lastCall = 0;
  return function(...args) {
    const now = new Date().getTime();
    if (now - lastCall < delay) return;
    lastCall = now;
    return func(...args);
  };
}

function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// === CONSOLE EASTER EGG ===
console.log(
  '%c👋 Hey there!',
  'font-size: 24px; font-weight: bold; color: #667eea;'
);
console.log(
  '%cImpressed by the code? Let\'s talk!',
  'font-size: 16px; color: #764ba2;'
);
console.log(
  '%c📧 dotkrupal@gmail.com | 💼 linkedin.com/in/krupal-upadhyay',
  'font-size: 14px; color: #6c757d;'
);
console.log(
  '%c🚀 Built with: Vanilla JS, CSS3, HTML5 | Zero frameworks, maximum performance',
  'font-size: 12px; color: #51cf66;'
);

