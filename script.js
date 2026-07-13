document.addEventListener('DOMContentLoaded', () => {
    console.log("Aegis Security System Initialized.");

    // Highlight current page in navbar
    const currentLocation = location.href;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        // Simple check to avoid empty href matching everything
        if (link.href && currentLocation.includes(link.getAttribute('href'))) {
            // Remove active from all first
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });

    // 1. Interactive Terminal Typewriter Effect
    const terminalBody = document.getElementById('typewriter');
    if (terminalBody) {
        // Clear static content first
        terminalBody.innerHTML = '';
        const lines = [
            '<span class="prompt">$</span> Initializing Aegis shield...',
            '<span class="prompt">$</span> Scanning network traffic...',
            '<span class="prompt">$</span> Deep packet inspection active.',
            '<span class="success">[OK]</span> 0 threats detected. System secure.'
        ];
        
        let lineIndex = 0;
        
        function typeLine() {
            if (lineIndex < lines.length) {
                const lineDiv = document.createElement('div');
                lineDiv.innerHTML = lines[lineIndex];
                lineDiv.style.opacity = '0';
                terminalBody.appendChild(lineDiv);
                
                // Fade in the line
                setTimeout(() => {
                    lineDiv.style.transition = 'opacity 0.5s';
                    lineDiv.style.opacity = '1';
                }, 100);
                
                lineIndex++;
                setTimeout(typeLine, 800 + Math.random() * 800); // Random delay for realism
            }
        }
        setTimeout(typeLine, 500); // Start after short delay
    }

    // 2. Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in, .slide-up');
    animatedElements.forEach(el => observer.observe(el));

    // 3. Tab Logic (Features Page)
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active to clicked
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // 4. Accordion Logic (FAQ)
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all
            document.querySelectorAll('.accordion-item').forEach(acc => {
                acc.classList.remove('active');
            });
            
            // Toggle clicked
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 5. Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            if (name.value.trim() === '') {
                name.parentElement.classList.add('error');
                isValid = false;
            } else {
                name.parentElement.classList.remove('error');
            }
            
            if (email.value.trim() === '' || !email.value.includes('@')) {
                email.parentElement.classList.add('error');
                isValid = false;
            } else {
                email.parentElement.classList.remove('error');
            }
            
            if (message.value.trim() === '') {
                message.parentElement.classList.add('error');
                isValid = false;
            } else {
                message.parentElement.classList.remove('error');
            }
            
            if (isValid) {
                // Show success (simulated)
                contactForm.innerHTML = '<div class="success" style="font-size:1.5rem;text-align:center;padding:3rem 0;">Message sent successfully. Transmitting via secure channel...</div>';
            }
        });
    }
});
