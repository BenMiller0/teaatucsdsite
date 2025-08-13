// Mobile Menu Scripts
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenuButton = document.getElementById('close-menu-button');

    const toggleMenu = () => {
        mobileMenu.classList.toggle('hidden');
        document.body.classList.toggle('overflow-hidden');
    };

    mobileMenuButton.addEventListener('click', toggleMenu);
    closeMenuButton.addEventListener('click', toggleMenu);

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.mobile-menu-link').forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-xl', 'py-2');
            navbar.classList.remove('py-3');
        } else {
            navbar.classList.remove('shadow-xl', 'py-2');
            navbar.classList.add('py-3');
        }
    });

    // Intersection Observer for animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        elements.forEach(element => {
            observer.observe(element);
        });
    };

    // Initialize animations
    animateOnScroll();

    // Load member data
    loadMemberData();
});

// Function to render members into a specified container
const renderMembers = (containerId, membersData, type = 'board') => {
    const container = document.getElementById(containerId);
    
    // Clear the loading message
    container.innerHTML = ''; 

    membersData.forEach((member, index) => {
        const delayClass = `animate__delay-${0.5}s`;
        
        const memberCard = document.createElement('div');
        memberCard.className = `animate__animated animate__fadeInUp ${delayClass} animate-on-scroll`;
        memberCard.innerHTML = `
            <div class="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
                <div class="relative overflow-hidden h-64">
                    <img src="${member.image}" 
                         onerror="this.src='https://placehold.co/600x400/0c4a6e/fff?text=${member.name.replace(' ', '+')}'" 
                         alt="${member.name}" 
                         class="w-full h-full object-cover transition-transform duration-500 hover:scale-105">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
                <div class="p-6 flex-grow">
                    <h3 class="text-xl font-bold text-primary-900 mb-1">${member.name}</h3>
                    <p class="text-accent-500 font-medium mb-2">${member.title}</p>
                    <p class="text-gray-600 mb-3">${member.major}</p>
                    ${member.linkedin ? 
                        `<a href="${member.linkedin}" 
                           class="inline-flex items-center text-primary-700 hover:text-primary-900 transition-colors mt-2" 
                           target="_blank" 
                           rel="noopener noreferrer">
                            <i class="fab fa-linkedin mr-2"></i> LinkedIn
                        </a>` : 
                        ''}
                    ${type === 'alumni' && member.company ? 
                        `<p class="mt-3 text-sm text-gray-500">
                            <i class="fas fa-building mr-2"></i>${member.company}
                        </p>` : 
                        ''}
                </div>
            </div>
        `;
        container.appendChild(memberCard);
    });
};

// Load member data
const loadMemberData = async () => {
    try {
        const [boardResponse, alumniResponse] = await Promise.all([
            fetch('assets/boardmembers.json'),
            fetch('assets/alumni.json')
        ]);
        
        if (!boardResponse.ok || !alumniResponse.ok) {
            throw new Error('Failed to load member data');
        }
        
        const boardMembers = await boardResponse.json();
        const alumni = await alumniResponse.json();
        
        renderMembers('board-members-container', boardMembers, 'board');
        renderMembers('alumni-container', alumni, 'alumni');
        
    } catch (error) {
        console.error('Error loading member data:', error);
        
        const errorHTML = `
            <div class="col-span-full text-center py-8">
                <i class="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
                <p class="text-red-500 font-medium">Error loading data. Please try again later.</p>
                <button onclick="loadMemberData()" class="mt-4 px-4 py-2 bg-primary-900 text-white rounded hover:bg-primary-800 transition-colors">
                    Retry
                </button>
            </div>
        `;
        
        document.getElementById('board-members-container').innerHTML = errorHTML;
        document.getElementById('alumni-container').innerHTML = errorHTML;
    }
};