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
