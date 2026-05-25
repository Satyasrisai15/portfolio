// Theme Manager Module
const ThemeManager = {
  STORAGE_KEY: 'portfolio-theme',

  init() {
    const stored = this.getStoredTheme();
    if (stored) {
      this.setTheme(stored);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setTheme(prefersDark ? 'dark' : 'light');
    }

    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!this.getStoredTheme()) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    });

    // Bind toggle button
    const toggleBtn = document.querySelector('.theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => this.toggle());
    }
  },

  toggle() {
    const current = document.body.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
    this.storeTheme(next);
  },

  setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    const toggleBtn = document.querySelector('.theme-toggle');
    if (toggleBtn) {
      toggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
      toggleBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }
  },

  getStoredTheme() {
    try {
      return localStorage.getItem(this.STORAGE_KEY);
    } catch (e) {
      return null;
    }
  },

  storeTheme(theme) {
    try {
      localStorage.setItem(this.STORAGE_KEY, theme);
    } catch (e) {
      // localStorage unavailable (e.g. private browsing) — silently ignore
    }
  }
};

// Project Renderer Module
const ProjectRenderer = {
  render(projects, container) {
    if (!container) return;
    container.innerHTML = '';
    if (!projects || projects.length === 0) return;

    projects.forEach(project => {
      const card = document.createElement('div');
      card.className = 'project-card';

      let html = `<h3 class="project-title">${this.escapeHtml(project.title)}</h3>`;
      html += `<p class="project-description">${this.escapeHtml(project.description)}</p>`;

      if (project.tags && project.tags.length > 0) {
        html += '<div class="project-tags">';
        project.tags.forEach(tag => {
          html += `<span class="tag">${this.escapeHtml(tag)}</span>`;
        });
        html += '</div>';
      }

      html += '<div class="project-links">';
      if (project.liveUrl) {
        html += `<a href="${this.escapeHtml(project.liveUrl)}" target="_blank" rel="noopener noreferrer" class="project-link">Live Demo</a>`;
      }
      if (project.sourceUrl) {
        html += `<a href="${this.escapeHtml(project.sourceUrl)}" target="_blank" rel="noopener noreferrer" class="project-link">Source Code</a>`;
      }
      html += '</div>';

      card.innerHTML = html;
      container.appendChild(card);
    });
  },

  escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
};

// Skills Renderer Module
const SkillsRenderer = {
  render(skills, container) {
    if (!container) return;
    container.innerHTML = '';
    if (!skills || Object.keys(skills).length === 0) return;

    Object.entries(skills).forEach(([category, items]) => {
      const group = document.createElement('div');
      group.className = 'skills-group';

      group.innerHTML = `<h3 class="skills-category">${this.escapeHtml(category)}</h3>`;

      const list = document.createElement('div');
      list.className = 'skills-list';

      items.forEach(skill => {
        const badge = document.createElement('span');
        badge.className = 'skill-badge';
        badge.textContent = skill;
        list.appendChild(badge);
      });

      group.appendChild(list);
      container.appendChild(group);
    });
  },

  escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
};

// Contact Renderer Module
const ContactRenderer = {
  icons: {
    github: '&#xe900;', // placeholder — replaced by SVG below
    linkedin: '&#xe901;',
    email: '&#xe902;'
  },

  render(social, container) {
    if (!container) return;
    container.innerHTML = '';
    if (!social) return;

    if (social.github) {
      container.appendChild(this.createLink(social.github, 'GitHub', this.githubSvg()));
    }
    if (social.linkedin) {
      container.appendChild(this.createLink(social.linkedin, 'LinkedIn', this.linkedinSvg()));
    }
    if (social.email) {
      container.appendChild(this.createEmailLink(social.email));
    }
  },

  createLink(url, label, iconHtml) {
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.className = 'social-link';
    a.setAttribute('aria-label', label);
    a.innerHTML = iconHtml + `<span>${label}</span>`;
    return a;
  },

  createEmailLink(email) {
    const a = document.createElement('a');
    a.href = `mailto:${email}`;
    a.className = 'social-link';
    a.setAttribute('aria-label', 'Email');
    a.innerHTML = this.emailSvg() + '<span>Email</span>';
    return a;
  },

  githubSvg() {
    return '<svg class="social-icon" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="currentColor" d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/></svg>';
  },

  linkedinSvg() {
    return '<svg class="social-icon" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>';
  },

  emailSvg() {
    return '<svg class="social-icon" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="currentColor" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>';
  }
};

// Navigation Module
const Navigation = {
  init() {
    this.navLinks = document.querySelectorAll('.nav-links a');
    this.navToggle = document.querySelector('.nav-toggle');
    this.navMenu = document.querySelector('.nav-links');
    this.sections = document.querySelectorAll('main .section');

    this.setupSmoothScroll();
    this.setupScrollSpy();
    this.setupMobileToggle();
  },

  setupSmoothScroll() {
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
          // Close mobile menu after navigation
          this.closeMobileMenu();
        }
      });
    });

    // Also handle CTA button smooth scroll
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
      ctaButton.addEventListener('click', (e) => {
        const href = ctaButton.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    }
  },

  setupScrollSpy() {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.highlightActive(entry.target.id);
        }
      });
    }, observerOptions);

    this.sections.forEach(section => observer.observe(section));
  },

  highlightActive(sectionId) {
    this.navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${sectionId}`) {
        link.classList.add('active');
      }
    });
  },

  setupMobileToggle() {
    if (!this.navToggle || !this.navMenu) return;

    this.navToggle.addEventListener('click', () => {
      this.toggleMobileMenu();
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.navMenu.classList.contains('open')) {
        this.closeMobileMenu();
        this.navToggle.focus();
      }
    });
  },

  toggleMobileMenu() {
    const isOpen = this.navMenu.classList.toggle('open');
    this.navToggle.setAttribute('aria-expanded', String(isOpen));
  },

  closeMobileMenu() {
    if (this.navMenu) {
      this.navMenu.classList.remove('open');
    }
    if (this.navToggle) {
      this.navToggle.setAttribute('aria-expanded', 'false');
    }
  }
};

// Animations Module
const Animations = {
  init() {
    this.observeSections();
    this.observeSkills();
  },

  observeSections() {
    const sections = document.querySelectorAll('.section:not(.hero)');
    if (!sections.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    sections.forEach(section => observer.observe(section));
  },

  observeSkills() {
    const skillsSection = document.querySelector('.skills');
    if (!skillsSection) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.staggerSkillBadges(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    observer.observe(skillsSection);
  },

  staggerSkillBadges(container) {
    const badges = container.querySelectorAll('.skill-badge');
    badges.forEach((badge, index) => {
      badge.style.transitionDelay = `${index * 0.05}s`;
    });
  }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  Navigation.init();

  // Render projects
  const projectsGrid = document.querySelector('.projects-grid');
  if (typeof portfolioData !== 'undefined' && portfolioData.projects) {
    ProjectRenderer.render(portfolioData.projects, projectsGrid);
  }

  // Render skills
  const skillsContainer = document.querySelector('.skills-container');
  if (typeof portfolioData !== 'undefined' && portfolioData.skills) {
    SkillsRenderer.render(portfolioData.skills, skillsContainer);
  }

  // Render contact/social links
  const socialContainer = document.querySelector('.social-links');
  if (typeof portfolioData !== 'undefined' && portfolioData.social) {
    ContactRenderer.render(portfolioData.social, socialContainer);
  }

  // Initialize animations after content is rendered
  Animations.init();
});

// Export for testing (Node.js / module environments)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ThemeManager, ProjectRenderer, SkillsRenderer, ContactRenderer, Navigation, Animations };
}
