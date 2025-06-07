document.addEventListener('DOMContentLoaded', () => {
    const projectGrid = document.getElementById('project-grid');
    const navMenuBtn = document.getElementById('nav-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const searchBtn = document.getElementById('search-btn');
    const searchModal = document.getElementById('search-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const searchInput = document.getElementById('search-input');
    const filterResultsCount = document.getElementById('filter-results-count');
    const shareButton = document.getElementById('share-button');

    let allProjects = [];
    

    // --- Fetch and Render Projects ---
    const fetchProjects = async () => {
        try {
            const response = await fetch('projects.json');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            allProjects = await response.json();
            renderProjects(allProjects);
        } catch (error) {
            console.error("Could not fetch projects:", error);
            projectGrid.innerHTML = `<p class="no-results-message">Failed to load projects. Please try again later.</p>`;
        }
    };

    const renderProjects = (projects) => {
        projectGrid.innerHTML = '';
        if (projects.length === 0) {
            projectGrid.innerHTML = `<p class="no-results-message">No projects found matching your criteria.</p>`;
            return;
        }

        projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <div class="card-header">
                <span class="card-category">${project.category || 'PROJECT'}</span>
                <span class="kebab-menu">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>
                </span>
            </div>
            <div class="card-content">
                <h3>${project.title}</h3>
            </div>
            <div class="card-footer">
                <!-- THIS IS THE UPDATED LINE -->
                <a href="project-detail.html?id=${project.id}" class="project-link" aria-label="View project details for ${project.title}">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </a>
            </div>
        `;
        projectGrid.appendChild(projectCard);
        });
    };


    // --- Search/Filter Functionality ---
    const openSearchModal = () => {
        searchModal.classList.add('visible');
        searchInput.focus();
    };

    const closeSearchModal = () => {
        searchModal.classList.remove('visible');
    };

    const filterProjects = () => {
        const query = searchInput.value.toLowerCase().trim();

        const filteredProjects = allProjects.filter(project => {
            const titleMatch = project.title.toLowerCase().includes(query);
            const categoryMatch = project.category.toLowerCase().includes(query);
            const toolsMatch = project.tools.some(tool => tool.toLowerCase().includes(query));
            return titleMatch || categoryMatch || toolsMatch;
        });

        renderProjects(filteredProjects);
        
        const count = filteredProjects.length;
        filterResultsCount.textContent = `${count} project${count !== 1 ? 's' : ''} found.`;
    };

    // --- Share Functionality ---
    const sharePortfolio = async () => {
        const shareData = {
            title: "Maximus' Project Portfolio",
            text: "Check out this project portfolio!",
            url: window.location.href
        };
        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                alert('Portfolio link copied to clipboard!');
            }
        } catch (err) {
            console.error('Share failed:', err);
            // Fallback for when user cancels the share dialog
            if (err.name !== 'AbortError') {
                 alert('Sharing failed, link copied to clipboard instead.');
                 await navigator.clipboard.writeText(window.location.href);
            }
        }
    };

    // --- Event Listeners ---
    searchBtn.addEventListener('click', openSearchModal);
    closeModalBtn.addEventListener('click', closeSearchModal);
    searchModal.addEventListener('click', (e) => {
        if (e.target === searchModal) closeSearchModal();
    });
    searchInput.addEventListener('input', filterProjects);
    shareButton.addEventListener('click', sharePortfolio);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchModal.classList.contains('visible')) {
            closeSearchModal();
        }
    });


    // --- Initialize ---
    fetchProjects();

    // --- Navigation Menu Controls ---
    const toggleNavMenu = (event) => {
        // Stop the click from bubbling up to the document
        event.stopPropagation(); 
        const isVisible = navMenu.classList.toggle('visible');
        navMenuBtn.setAttribute('aria-expanded', isVisible);
    };

    const closeNavMenu = () => {
        if (navMenu.classList.contains('visible')) {
            navMenu.classList.remove('visible');
            navMenuBtn.setAttribute('aria-expanded', 'false');
        }
    };

    // Open/close menu on button click
    navMenuBtn.addEventListener('click', toggleNavMenu);

    // Close menu if user clicks anywhere else on the page
    document.addEventListener('click', closeNavMenu);

    navMenu.addEventListener('click', (event) => {
    // Check if a link was clicked
    if (event.target.tagName === 'A') {
        event.preventDefault(); // Prevent instant jump
        const targetId = event.target.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Close the menu after clicking a link
        closeNavMenu();
        }
    });
});
