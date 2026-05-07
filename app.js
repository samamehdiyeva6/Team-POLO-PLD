async function fetchProjects() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        const container = document.getElementById('project-container');

        container.innerHTML = ''; // Clear container

        data.forEach(project => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${project.image}" alt="${project.title}" class="project-img">
                <div class="card-content">
                    <h3>${project.title}</h3>
                    <p>Status: <strong>${project.status}</strong></p>
                    <a href="${project.link}" class="btn">View Project</a>
                </div>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error("Error loading JSON. Make sure you are using a Live Server!", error);
    }
}

fetchProjects();
