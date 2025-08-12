// Mobile Menu Scripts
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const closeMenuButton = document.getElementById('close-menu-button');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.remove('hidden');
});

closeMenuButton.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.mobile-menu-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Function to render members into a specified container
const renderMembers = (containerId, membersData) => {
    const container = document.getElementById(containerId);
    // Clear the loading message
    container.innerHTML = ''; 

    membersData.forEach(member => {
        const memberCard = `
            <div class="bg-white rounded-lg overflow-hidden shadow-md transition-all card-hover">
                <img src="${member.image}" onerror="this.src='https://placehold.co/600x400/0c4a6e/fff?text=${member.name.replace(' ', '+')}'" alt="${member.name}" class="w-full h-64 object-cover">
                <div class="p-6 text-center">
                    <h3 class="text-xl font-bold text-blue-900 mb-1">${member.name}</h3>
                    <p class="text-yellow-600 font-medium mb-2">${member.title}</p>
                    <p class="text-gray-600 font-medium mb-2 whitespace-nowrap">${member.major}</p>
                    ${member.linkedin ? `<a href="${member.linkedin}" class="text-blue-700 hover:underline block mt-2" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>` : ''}
                </div>
            </div>
        `;
        container.innerHTML += memberCard;
    });
};

// Fetch and render board members and alumni
Promise.all([
    fetch('assets/boardmembers.json').then(res => res.json()),
    fetch('assets/alumni.json').then(res => res.json())
]) 
.then(([boardMembers, alumni]) => {
    renderMembers('board-members-container', boardMembers);
    renderMembers('alumni-container', alumni);
})
.catch(error => {
    console.error('Error loading member data:', error);
    document.getElementById('board-members-container').innerHTML = '<p class="col-span-full text-center text-red-500">Error loading board members</p>';
    document.getElementById('alumni-container').innerHTML = '<p class="col-span-full text-center text-red-500">Error loading alumni</p>';
});