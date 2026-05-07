const navLinks = document.querySelectorAll('.navbar-links .nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
                
        // Add active class to clicked link
        this.classList.add('active');
    });
});
async function loadTeam() {
    const grid = document.getElementById('team-grid');
    const titleElement = document.querySelector('h1'); 
    try {
        const response = await fetch('./data.json');
        const data = await response.json();
        
        const teamInfo = data[0];
        const teamMembers = teamInfo.members;

        if (titleElement) titleElement.textContent = teamInfo.teamName;

        grid.innerHTML = teamMembers.map(member => {
            const imageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random&size=150&bold=true&rounded=true`;

            return `
                <div class="card">
                    <img src="${imageUrl}" alt="${member.name}" class="profile-img">
                    <div class="role">${member.role}</div>
                    <h3>${member.name}</h3>
                    <p class="bio">${member.bio}</p>
                    
                    <a href="${member.github}" target="_blank" class="github-btn">
                        View GitHub
                    </a>
                </div>
            `;
        }).join('');

    } catch (error) {
        console.error('Error loading JSON:', error);
        grid.innerHTML = `<p style="color: red;">Failed to load members. Check console.</p>`;
    }
}

window.addEventListener('DOMContentLoaded', loadTeam);
// ...existing code...
async function fetchProjects() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        
        // Əgər səhifədə project-container yoxdursa, kod qırılmasın deyə yoxlanış edirik
        const container = document.getElementById('project-container');
        if (!container) return; 

        container.innerHTML = ''; // Clear container

        // data[1] yox, data[0] olmalıdır
        const projects = data[0].projects;
        
        projects.forEach(project => {
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
// ...existing code...

// ...existing code...
fetch('data.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const members = data.members;
    const projects = data.projects;
    
    // Call your functions to render data to the website
    // renderMembers(members);
    loadTeam();
    // renderProjects(projects);
    fetchProjects();
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
// ...existing code...
