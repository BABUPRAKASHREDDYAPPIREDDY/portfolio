document.addEventListener('DOMContentLoaded', () => {
    // Loader
    setTimeout(() => {
        const loader = document.getElementById('loader');
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 500);
    }, 1000);

    // Particles.js Config
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 60, density: { enable: true, value_area: 800 } },
                color: { value: ["#00f0ff", "#b000ff"] },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: "#00f0ff", opacity: 0.2, width: 1 },
                move: { enable: true, speed: 2, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
            },
            interactivity: {
                detect_on: "canvas",
                events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" }, resize: true },
                modes: { grab: { distance: 140, line_linked: { opacity: 1 } }, push: { particles_nb: 4 } }
            },
            retina_detect: true
        });
    }

    // Theme Toggle
    const themeBtn = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const icon = themeBtn.querySelector('i');

    themeBtn.addEventListener('click', () => {
        if (html.getAttribute('data-theme') === 'dark') {
            html.setAttribute('data-theme', 'light');
            icon.classList.replace('fa-sun', 'fa-moon');
        } else {
            html.setAttribute('data-theme', 'dark');
            icon.classList.replace('fa-moon', 'fa-sun');
        }
    });

    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('active'));
    });

    // Fetch Blog Posts
    fetch('https://portfolio-1-fyic.onrender.com/api/posts')
        .then(res => res.json())
        .then(data => {
            const blogGrid = document.getElementById('blog-posts');
            if (data.data && data.data.length > 0) {
                blogGrid.innerHTML = data.data.map(post => `
                    <div class="blog-post">
                        <h3>${post.title}</h3>
                        <p>${post.content}</p>
                        <small style="color: #888;">${new Date(post.created_at).toLocaleDateString()}</small>
                    </div>
                `).join('');
            } else {
                blogGrid.innerHTML = '<p>No posts available yet.</p>';
            }
        })
        .catch(err => {
            console.error('Error fetching posts:', err);
            document.getElementById('blog-posts').innerHTML = '<p>Error loading posts.</p>';
        });

    // Contact Form
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        fetch('https://portfolio-1-fyic.onrender.com/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, message })
        })
        .then(res => res.json())
        .then(data => {
            if (data.message === 'success') {
                formStatus.innerHTML = '<p style="color: #00f0ff; margin-top: 1rem;">Message sent successfully!</p>';
                contactForm.reset();
            } else {
                formStatus.innerHTML = '<p style="color: red; margin-top: 1rem;">Failed to send message.</p>';
            }
            setTimeout(() => formStatus.innerHTML = '', 3000);
        })
        .catch(err => {
            console.error('Error:', err);
            formStatus.innerHTML = '<p style="color: red; margin-top: 1rem;">Error sending message.</p>';
        });
    });
});
