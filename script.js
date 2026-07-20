/* ==========================================================================
   KARTHICK RAJA PORTFOLIO - INTERACTIVE & ADMIN DATA MANAGEMENT LOGIC
   ========================================================================== */

const defaultPortfolioData = {
    hero: {
        greeting: "Hi I am",
        name: "KARTHICK RAJA",
        role: "UI & GRAPHIC DESIGNER",
        exp: 5,
        projectsCount: 20,
        clientsCount: 30,
        bio: "UX designers are responsible for the overall user experience of a website or app. As a UI/UX designer, my job involves understanding the needs of both the business and the user and finding a balance between the two."
    },
    contact: {
        phone: "+91 9994667382",
        email: "karthick.designer8@gmail.com",
        address: "6/22 Sindhu Nagar, Kuniyamuthur, Coimbatore",
        behance: "https://www.behance.net/skarthickr672d",
        linkedin: "https://linkedin.com",
        instagram: "https://instagram.com",
        dribbble: "https://dribbble.com"
    },
    skills: [
        { name: "Figma (UI/UX & Prototyping)", percentage: 95 },
        { name: "CorelDraw (Vector & Branding)", percentage: 80 },
        { name: "Adobe XD (Wireframing & UI)", percentage: 75 },
        { name: "Adobe Illustrator (Graphic Design)", percentage: 75 },
        { name: "Adobe Photoshop (Social Assets)", percentage: 70 },
        { name: "DaVinci Resolve (Basic Video Editing)", percentage: 70 }
    ],
    projects: [
        { title: "PayFlex - Next-Gen Banking App", category: "mobile uiux", description: "Complete redesign of a digital wallet app enhancing transaction speeds by 40% with biometrics and smart expense analytics." },
        { title: "MetricPulse - Cloud Analytics Platform", category: "saas web", description: "Real-time analytics dashboard for data engineers with dark mode visualization components and custom widget builder." },
        { title: "PulseCare - Smart Telemedicine", category: "uiux mobile", description: "Patient consultation app enabling seamless video appointments, prescription tracking, and AI triage assistance." },
        { title: "Aura - Luxury Fashion Experience", category: "web uiux", description: "High-end apparel website with 3D product previews, instant checkout flow, and fluid micro-animations." },
        { title: "Nova Vault - Secure Crypto App", category: "saas mobile", description: "Non-custodial Web3 crypto wallet design emphasizing security key onboarding and multi-chain asset swapping." },
        { title: "OmniHome - IoT Ecosystem", category: "mobile saas", description: "Unified mobile dashboard controlling smart lights, security cameras, energy consumption, and automation routines." }
    ],
    services: [
        { title: "UI/UX Design", description: "End-to-end user experience design including personas, user journey mapping, high-fidelity mockups, and interactive Figma prototypes." },
        { title: "Mobile App Design", description: "Clean, responsive mobile app interfaces tailored for iOS and Android, focusing on thumb-zone usability and micro-interactions." },
        { title: "Web & SaaS Dashboards", description: "Complex web application interfaces simplified into intuitive, data-rich dashboards that improve user productivity." },
        { title: "Design System Creation", description: "Scalable component libraries with color palettes, typography scale, iconography, and documentation for dev handoff." },
        { title: "Wireframing & Prototyping", description: "Rapid low-fidelity sketches and animated high-fidelity prototypes to validate product concepts before engineering." },
        { title: "Brand & Visual Identity", description: "Cohesive visual identity packages including monograms, color systems, typography guides, and marketing assets." }
    ]
};

function getPortfolioData() {
    const saved = localStorage.getItem('karthick_portfolio_data');
    return saved ? JSON.parse(saved) : defaultPortfolioData;
}

function savePortfolioData(data) {
    localStorage.setItem('karthick_portfolio_data', JSON.stringify(data));
    applyPortfolioDataToDOM();
}

function applyPortfolioDataToDOM() {
    const data = getPortfolioData();

    // Hero Section
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) heroTitle.textContent = data.hero.name;
    const heroRole = document.querySelector('.hero-subtitle');
    if (heroRole) heroRole.textContent = data.hero.role;

    const stats = document.querySelectorAll('.stat-number');
    if (stats.length >= 3) {
        stats[0].setAttribute('data-target', data.hero.exp);
        stats[0].textContent = data.hero.exp;
        stats[1].setAttribute('data-target', data.hero.projectsCount);
        stats[1].textContent = data.hero.projectsCount;
        stats[2].setAttribute('data-target', data.hero.clientsCount);
        stats[2].textContent = data.hero.clientsCount;
    }

    // Contact Cards
    const emailLink = document.querySelector('a[href^="mailto:"]');
    if (emailLink) {
        emailLink.href = `mailto:${data.contact.email}`;
        emailLink.textContent = data.contact.email;
    }
    const phoneLink = document.querySelector('a[href^="tel:"]');
    if (phoneLink) {
        phoneLink.href = `tel:${data.contact.phone}`;
        phoneLink.textContent = data.contact.phone;
    }

    // Skills Matrix
    const skillsGrid = document.querySelector('.skills-grid');
    if (skillsGrid && data.skills) {
        skillsGrid.innerHTML = '';
        data.skills.forEach(skill => {
            const item = document.createElement('div');
            item.className = 'skill-item';
            item.innerHTML = `
                <div class="skill-info">
                    <span>${skill.name}</span>
                    <span class="skill-percentage">${skill.percentage}%</span>
                </div>
                <div class="skill-bar"><div class="skill-progress" style="width: ${skill.percentage}%;"></div></div>
            `;
            skillsGrid.appendChild(item);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    applyPortfolioDataToDOM();
    initMobileMenu();
    initScrollNavbar();
    initActiveNavHighlight();
    initStatsCounter();
    initPortfolioFilter();
    initCursorSpotlight();
    initGlassTilt();
});

/* Fluid Cursor Spotlight Tracker */
function initCursorSpotlight() {
    const cursorGlow = document.getElementById('cursorGlow');
    if (cursorGlow) {
        window.addEventListener('mousemove', (e) => {
            cursorGlow.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        });
    }
}

/* 3D Glass Tilt Micro-Interactions */
function initGlassTilt() {
    const glassCards = document.querySelectorAll('.glass-card, .hero-portrait-card, .stats-box');
    glassCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((centerY - y) / 18).toFixed(2);
            const rotateY = ((x - centerX) / 18).toFixed(2);

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.025)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
        });
    });
}

/* Mobile Menu Toggle */
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });

        // Close menu on link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.querySelector('i').className = 'fa-solid fa-bars';
            });
        });
    }
}

/* Navbar Shadow on Scroll */
function initScrollNavbar() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '12px 0';
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.padding = '18px 0';
            navbar.style.boxShadow = 'none';
        }
    });
}

/* Active Nav Section Highlight */
function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}

/* Animated Number Counter for Stats Box (5+, 20+, 30+) */
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'), 10);
                    let count = 0;
                    const duration = 1500; // ms
                    const stepTime = Math.max(Math.floor(duration / target), 30);

                    const timer = setInterval(() => {
                        count += 1;
                        stat.textContent = count;
                        if (count >= target) {
                            stat.textContent = target;
                            clearInterval(timer);
                        }
                    }, stepTime);
                });
            }
        });
    }, { threshold: 0.5 });

    const statsBox = document.querySelector('.stats-box');
    if (statsBox) {
        observer.observe(statsBox);
    }
}

/* Portfolio Filter Tabs */
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category.includes(filterValue)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/* Modal Open & Close Functions */
function openModal(modalId) {
    const overlay = document.getElementById('modalOverlay');
    const targetModal = document.getElementById(modalId);

    if (overlay && targetModal) {
        // Hide all cards first
        document.querySelectorAll('.modal-card').forEach(card => {
            card.style.display = 'none';
        });

        targetModal.style.display = 'block';
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeAllModals() {
    const overlay = document.getElementById('modalOverlay');
    if (overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

/* Service Details Popup Modal */
function openServiceModal(serviceTitle) {
    const infoContent = document.getElementById('infoModalContent');
    if (infoContent) {
        infoContent.innerHTML = `
            <div class="modal-header">
                <span class="section-badge">SERVICE OVERVIEW</span>
                <h3>${serviceTitle}</h3>
            </div>
            <div style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.7; display: flex; flex-direction: column; gap: 14px;">
                <p>Karthick Raja provides end-to-end expert execution for <strong>${serviceTitle}</strong>, tailored to startup founders, scaleups, and digital product teams.</p>
                <div style="background: rgba(229, 184, 36, 0.05); padding: 18px; border-left: 3px solid var(--gold-primary); border-radius: 4px;">
                    <strong style="color: #fff; display: block; margin-bottom: 6px;">Key Deliverables:</strong>
                    <ul style="margin-left: 20px;">
                        <li>User Journey Maps & Empathy Personas</li>
                        <li>High-Fidelity Interactive Figma Mockups</li>
                        <li>Responsive Component Architecture & Design System</li>
                        <li>Usability Testing & Developer Handoff Specs</li>
                    </ul>
                </div>
            </div>
            <button class="btn btn-gold btn-full" style="margin-top: 24px;" onclick="closeAllModals(); openModal('hireModal');">Book This Service</button>
        `;
        openModal('infoModal');
    }
}

/* Case Study Project Popup Modal */
function openProjectModal(title, category, description) {
    const infoContent = document.getElementById('infoModalContent');
    if (infoContent) {
        infoContent.innerHTML = `
            <div class="modal-header">
                <span class="section-badge">${category}</span>
                <h3>${title}</h3>
            </div>
            <div style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.7; display: flex; flex-direction: column; gap: 16px;">
                <div style="background: #111017; height: 180px; border-radius: 12px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--border-gold);">
                    <i class="fa-solid fa-layer-group" style="font-size: 3.5rem; color: var(--gold-primary);"></i>
                </div>
                <p><strong>Case Study Summary:</strong> ${description}</p>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                    <div style="background: rgba(255,255,255,0.03); padding: 12px; border-radius: 8px;">
                        <span style="font-size: 0.8rem; color: var(--gold-primary); font-weight:700;">ROLE</span>
                        <p style="color:#fff; font-size:0.9rem; margin:0;">Lead UI/UX Designer</p>
                    </div>
                    <div style="background: rgba(255,255,255,0.03); padding: 12px; border-radius: 8px;">
                        <span style="font-size: 0.8rem; color: var(--gold-primary); font-weight:700;">TIMELINE</span>
                        <p style="color:#fff; font-size:0.9rem; margin:0;">6 Weeks</p>
                    </div>
                </div>
            </div>
            <button class="btn btn-gold btn-full" style="margin-top: 24px;" onclick="closeAllModals(); openModal('hireModal');">Discuss Similar Project</button>
        `;
        openModal('infoModal');
    }
}

/* CV Download Trigger */
function downloadCVFile() {
    const link = document.createElement('a');
    link.href = 'assets/Karthick_Raja_Resume.pdf';
    link.download = 'Karthick_Raja_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    closeAllModals();
}

/* Contact Form Submission */
function handleContactSubmit(event) {
    event.preventDefault();
    const alertBox = document.getElementById('formAlert');
    alertBox.textContent = 'Thank you, your message has been sent to Karthick Raja! We will respond within 24 hours.';
    alertBox.className = 'form-alert success';
    event.target.reset();
}

/* Hire Form Submission */
function handleHireSubmit(event) {
    event.preventDefault();
    alert('Thank you for your hiring interest! Karthick Raja will contact you shortly.');
    closeAllModals();
    event.target.reset();
}

/* Optional Helper function to swap portrait image dynamically */
function updatePortraitImage(imageSrc) {
    const imgElement = document.getElementById('hero-portrait');
    if (imgElement) {
        imgElement.src = imageSrc;
    }
}
