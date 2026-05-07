async function fetchProjects() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        const container = document.getElementById('project-container');

        data.forEach(project => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3>${project.title}</h3>
                <p>Status: <strong>${project.status}</strong></p>
                <a href="${project.link}">View Project</a>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error("Could not load projects:", error);
    }
}

fetchProjects();
