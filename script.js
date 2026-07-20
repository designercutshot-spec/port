/* ==========================================================================
   KARTHICK RAJA PORTFOLIO - FULL DYNAMIC DATA BINDING & LIVE ADMIN SYNC
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
        behance: "https://www.behance.net/skarthickr672d",
        linkedin: "https://linkedin.com",
        instagram: "https://www.instagram.com/karthickartsplus?igsh=MXV0NG04NGJhenF2cg%3D%3D&utm_source=qr",
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

    // 1. Hero Section Binding
    const heroGreeting = document.querySelector('.hero-greeting');
    if (heroGreeting && data.hero.greeting) heroGreeting.textContent = data.hero.greeting;

    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && data.hero.name) heroTitle.textContent = data.hero.name;

    const heroRole = document.querySelector('.hero-subtitle');
    if (heroRole && data.hero.role) heroRole.textContent = data.hero.role;

    const stats = document.querySelectorAll('.stat-number');
    if (stats.length >= 3 && data.hero) {
        stats[0].setAttribute('data-target', data.hero.exp);
        stats[0].textContent = data.hero.exp;
        stats[1].setAttribute('data-target', data.hero.projectsCount);
        stats[1].textContent = data.hero.projectsCount;
        stats[2].setAttribute('data-target', data.hero.clientsCount);
        stats[2].textContent = data.hero.clientsCount;
    }

    // 2. About Bio Paragraph Binding
    const aboutFirstPara = document.querySelector('.about-card p');
    if (aboutFirstPara && data.hero.bio) {
        aboutFirstPara.textContent = data.hero.bio;
    }

    // 3. Contact Details & Social Links Binding
    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
        link.href = `mailto:${data.contact.email}`;
        link.textContent = data.contact.email;
    });

    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.href = `tel:${data.contact.phone}`;
        link.textContent = data.contact.phone;
    });

    // Social Links Binding By Class
    document.querySelectorAll('.social-ig').forEach(link => {
        if (data.contact && data.contact.instagram) link.href = data.contact.instagram;
    });

    document.querySelectorAll('.social-li').forEach(link => {
        if (data.contact && data.contact.linkedin) link.href = data.contact.linkedin;
    });

    document.querySelectorAll('.social-be').forEach(link => {
        if (data.contact && data.contact.behance) link.href = data.contact.behance;
    });

    document.querySelectorAll('.social-db').forEach(link => {
        if (data.contact && data.contact.dribbble) link.href = data.contact.dribbble;
    });

    // 4. Skills Matrix Rendering
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

    // 5. Portfolio Projects Rendering
    const portfolioGrid = document.querySelector('.portfolio-grid');
    if (portfolioGrid && data.projects) {
        portfolioGrid.innerHTML = '';
        data.projects.forEach((proj, idx) => {
            const card = document.createElement('div');
            card.className = 'portfolio-card glass-card';
            card.setAttribute('data-category', proj.category || 'all');
            card.innerHTML = `
                <div class="project-img-wrapper">
                    <div class="project-dummy-img img-fintech">
                        <i class="fa-solid fa-folder-open project-icon"></i>
                        <span class="project-tag">PROJECT ${idx + 1}</span>
                    </div>
                    <div class="project-overlay">
                        <button class="project-btn" onclick="openProjectModal('${proj.title.replace(/'/g, "\\'")}', 'Case Study', '${proj.description.replace(/'/g, "\\'")}')">
                            View Case Study <i class="fa-solid fa-arrow-up-right-from-square"></i>
                        </button>
                    </div>
                </div>
                <div class="project-info">
                    <span class="project-category">${proj.category ? proj.category.toUpperCase() : 'UI/UX'}</span>
                    <h3 class="project-title">${proj.title}</h3>
                </div>
            `;
            portfolioGrid.appendChild(card);
        });
    }

    // 6. Services Grid Rendering
    const servicesGrid = document.querySelector('.services-grid');
    if (servicesGrid && data.services) {
        servicesGrid.innerHTML = '';
        data.services.forEach(srv => {
            const card = document.createElement('div');
            card.className = 'service-card glass-card';
            card.innerHTML = `
                <div class="service-icon-box">
                    <i class="fa-solid fa-compass-drafting"></i>
                </div>
                <h3 class="service-card-title">${srv.title}</h3>
                <p class="service-card-desc">${srv.description}</p>
                <button class="service-link" onclick="openServiceModal('${srv.title.replace(/'/g, "\\'")}')">Explore Details <i class="fa-solid fa-arrow-right"></i></button>
            `;
            servicesGrid.appendChild(card);
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
});

/* Listen for cross-tab storage changes & window focus (Admin updates sync live!) */
window.addEventListener('storage', (e) => {
    if (e.key === 'karthick_portfolio_data') {
        applyPortfolioDataToDOM();
    }
});

window.addEventListener('focus', () => {
    applyPortfolioDataToDOM();
});

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
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.6)';
        } else {
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

/* Animated Number Counter */
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'), 10) || 0;
                    let count = 0;
                    const duration = 1200;
                    const stepTime = Math.max(Math.floor(duration / Math.max(target, 1)), 30);

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

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            const filterValue = e.target.getAttribute('data-filter');
            const portfolioCards = document.querySelectorAll('.portfolio-card');

            portfolioCards.forEach(card => {
                const category = card.getAttribute('data-category') || '';
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
        }
    });
}

/* Modal Functions */
function openModal(modalId) {
    const overlay = document.getElementById('modalOverlay');
    const targetModal = document.getElementById(modalId);

    if (overlay && targetModal) {
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
                <div style="background: rgba(247, 23, 53, 0.08); padding: 18px; border-left: 3px solid #F71735; border-radius: 4px;">
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

function openProjectModal(title, category, description) {
    const infoContent = document.getElementById('infoModalContent');
    if (infoContent) {
        infoContent.innerHTML = `
            <div class="modal-header">
                <span class="section-badge">${category}</span>
                <h3>${title}</h3>
            </div>
            <div style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.7; display: flex; flex-direction: column; gap: 16px;">
                <div style="background: #011627; height: 180px; border-radius: 12px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--glass-border-gold);">
                    <i class="fa-solid fa-layer-group" style="font-size: 3.5rem; color: #F71735;"></i>
                </div>
                <p><strong>Case Study Summary:</strong> ${description}</p>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                    <div style="background: rgba(255,255,255,0.03); padding: 12px; border-radius: 8px;">
                        <span style="font-size: 0.8rem; color: #F71735; font-weight:700;">ROLE</span>
                        <p style="color:#fff; font-size:0.9rem; margin:0;">Lead UI/UX Designer</p>
                    </div>
                    <div style="background: rgba(255,255,255,0.03); padding: 12px; border-radius: 8px;">
                        <span style="font-size: 0.8rem; color: #F71735; font-weight:700;">TIMELINE</span>
                        <p style="color:#fff; font-size:0.9rem; margin:0;">4 - 6 Weeks</p>
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

/* Contact Form WhatsApp Redirection */
function handleContactSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    const data = getPortfolioData();
    let phoneNum = (data.contact && data.contact.phone) ? data.contact.phone.replace(/[^0-9]/g, '') : '919994667382';
    if (!phoneNum.startsWith('91') && phoneNum.length === 10) {
        phoneNum = '91' + phoneNum;
    }

    const waText = `Hi Karthick! I am reaching out from your portfolio website.\n\n👤 *Name:* ${name}\n📧 *Email:* ${email}\n📌 *Project Type:* ${subject}\n\n💬 *Message:* ${message}`;
    const waUrl = `https://wa.me/${phoneNum}?text=${encodeURIComponent(waText)}`;

    const alertBox = document.getElementById('formAlert');
    if (alertBox) {
        alertBox.textContent = 'Opening WhatsApp chat with Karthick Raja...';
        alertBox.className = 'form-alert success';
    }

    setTimeout(() => {
        window.open(waUrl, '_blank');
        event.target.reset();
    }, 500);
}

/* Hire Form WhatsApp Redirection */
function handleHireSubmit(event) {
    event.preventDefault();
    const name = event.target.querySelector('input[type="text"]').value;
    const email = event.target.querySelector('input[type="email"]').value;
    const budget = event.target.querySelector('select').value;

    const data = getPortfolioData();
    let phoneNum = (data.contact && data.contact.phone) ? data.contact.phone.replace(/[^0-9]/g, '') : '919994667382';
    if (!phoneNum.startsWith('91') && phoneNum.length === 10) {
        phoneNum = '91' + phoneNum;
    }

    const waText = `Hi Karthick! I would like to hire you for a project.\n\n👤 *Name:* ${name}\n📧 *Work Email:* ${email}\n💰 *Estimated Budget:* ${budget}`;
    const waUrl = `https://wa.me/${phoneNum}?text=${encodeURIComponent(waText)}`;

    window.open(waUrl, '_blank');
    closeAllModals();
    event.target.reset();
}
