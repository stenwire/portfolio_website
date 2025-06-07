document.addEventListener('DOMContentLoaded', () => {
    const projectTitleEl = document.getElementById('project-title');
    const projectCategoryEl = document.getElementById('project-category');
    const markdownContentEl = document.getElementById('markdown-content');

    const loadProjectDetails = async () => {
        try {
            // 1. Get the project ID from the URL query parameter
            const urlParams = new URLSearchParams(window.location.search);
            const projectId = parseInt(urlParams.get('id'));

            if (isNaN(projectId)) {
                throw new Error('Invalid Project ID.');
            }

            // 2. Fetch the projects data to find the correct project
            const projectsResponse = await fetch('projects.json');
            if (!projectsResponse.ok) throw new Error('Could not load projects data.');
            const allProjects = await projectsResponse.json();

            const project = allProjects.find(p => p.id === projectId);

            if (!project) {
                throw new Error('Project not found.');
            }

            // 3. Update the page header with project info
            // projectTitleEl.textContent = project.title;
            projectTitleEl.textContent = "";
            projectCategoryEl.textContent = "Category: " + (project.category || 'Uncategorized');
            document.title = `${project.title} | Project Details`; // Update browser tab title

            // 4. Fetch the specific markdown file for the project
            const markdownResponse = await fetch(project.markdownFile);
            if (!markdownResponse.ok) throw new Error(`Could not load markdown file: ${project.markdownFile}`);
            const markdownText = await markdownResponse.text();

            // 5. Parse the markdown and render it as HTML
            // Note: `marked.parse` is the method from the 'marked' library
            const htmlContent = marked.parse(markdownText);
            markdownContentEl.innerHTML = htmlContent;

        } catch (error) {
            console.error('Error loading project details:', error);
            markdownContentEl.innerHTML = `
                <div class="error-message">
                    <h2>Oops! Something went wrong.</h2>
                    <p>${error.message}</p>
                    <a href="index.html" class="back-link" style="margin-top:1rem;">Return to Portfolio</a>
                </div>
            `;
            projectTitleEl.textContent = 'Error';
            projectCategoryEl.textContent = '';
        }
    };

    loadProjectDetails();
});
