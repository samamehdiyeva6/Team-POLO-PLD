const navLinks = document.querySelectorAll('.navbar-links .nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
                
        // Add active class to clicked link
        this.classList.add('active');
    });
});