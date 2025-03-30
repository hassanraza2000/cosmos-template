// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Sidebar toggle
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const mainContent = document.querySelector('main');
const navTexts = document.querySelectorAll('.nav-text');
const logoCollapsed = document.getElementById('logoCollapsed');
const logoExpanded = document.getElementById('logoExpanded');
let sidebarExpanded = false;

function toggleSidebar() {
    sidebarExpanded = !sidebarExpanded;
    
    if (sidebarExpanded) {
        sidebar.classList.remove('sidebar-collapsed');
        sidebar.classList.add('sidebar-expanded');
        mainContent.classList.remove('lg:ml-16');
        mainContent.classList.add('lg:ml-60');
        sidebarToggle.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
        `;
        logoCollapsed.classList.add('hidden');
        logoExpanded.classList.remove('hidden');
        navTexts.forEach(text => text.classList.remove('hidden'));
    } else {
        sidebar.classList.remove('sidebar-expanded');
        sidebar.classList.add('sidebar-collapsed');
        mainContent.classList.remove('lg:ml-60');
        mainContent.classList.add('lg:ml-16');
        sidebarToggle.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
        `;
        logoCollapsed.classList.remove('hidden');
        logoExpanded.classList.add('hidden');
        navTexts.forEach(text => text.classList.add('hidden'));
    }
}

sidebarToggle.addEventListener('click', toggleSidebar);

// Update scroll indicator on scroll
window.addEventListener("scroll", () => {
    const scrollIndicator = document.getElementById("scrollIndicator");
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollTop / scrollHeight) * 100;
    
    // Set the width of the scroll indicator
    scrollIndicator.style.width = scrolled + "%";
  });
  

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Close mobile menu if open
        if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
        
        const target = document.querySelector(this.getAttribute('href'));
        window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Create twinkling stars effect
function createStars() {
    const starsContainer = document.getElementById('starsContainer');
    const starCount = getComputedStyle(document.documentElement).getPropertyValue('--star-count') || 100;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random size between 1-3px
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random position
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        // Random animation delay
        star.style.animationDelay = `${Math.random() * 5}s`;
        
        starsContainer.appendChild(star);
    }
}

// Create star trail effect on cosmos cards
function initCardEffects() {
    const cards = document.querySelectorAll('.cosmos-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.background = `radial-gradient(circle at ${x}px ${y}px,rgb(51, 45, 116), transparent 40%)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.background = '';
        });
    });
}

// Initialize effects
document.addEventListener('DOMContentLoaded', () => {
    createStars();
    initCardEffects();
    AOS.init();
});