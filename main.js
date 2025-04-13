// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.getElementById('header');
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            backToTopButton.classList.add('show');
        } else {
            header.classList.remove('scrolled');
            backToTopButton.classList.remove('show');
        }
    });
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Close mobile menu when clicking a nav link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });
    
    // Back to top button functionality
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Gallery slider functionality
    const gallerySlider = document.querySelector('.gallery-slider');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryDots = document.querySelector('.gallery-dots');
    const galleryPrev = document.querySelector('.gallery-prev');
    const galleryNext = document.querySelector('.gallery-next');
    
    if (galleryItems.length > 0) {
        let currentGalleryIndex = 0;
        
        // Create dots
        galleryItems.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('gallery-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                moveToGallerySlide(index);
            });
            galleryDots.appendChild(dot);
        });
        
        // Previous button
        galleryPrev.addEventListener('click', () => {
            moveToGallerySlide(currentGalleryIndex - 1);
        });
        
        // Next button
        galleryNext.addEventListener('click', () => {
            moveToGallerySlide(currentGalleryIndex + 1);
        });
        
        // Move to slide function
        function moveToGallerySlide(index) {
            if (index < 0) index = galleryItems.length - 1;
            if (index >= galleryItems.length) index = 0;
            
            gallerySlider.style.transform = `translateX(-${index * 100}%)`;
            
            // Update dots
            document.querySelectorAll('.gallery-dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            
            currentGalleryIndex = index;
        }
        
        // Auto slide (optional)
        let galleryInterval = setInterval(() => {
            moveToGallerySlide(currentGalleryIndex + 1);
        }, 5000);
        
        // Pause auto slide on hover
        gallerySlider.addEventListener('mouseenter', () => {
            clearInterval(galleryInterval);
        });
        
        gallerySlider.addEventListener('mouseleave', () => {
            galleryInterval = setInterval(() => {
                moveToGallerySlide(currentGalleryIndex + 1);
            }, 5000);
        });
    }
    
    // Testimonial slider functionality
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const testimonialDots = document.querySelector('.testimonial-dots');
    const testimonialPrev = document.querySelector('.testimonial-prev');
    const testimonialNext = document.querySelector('.testimonial-next');
    
    if (testimonialItems.length > 0) {
        let currentTestimonialIndex = 0;
        
        // Create dots
        testimonialItems.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('testimonial-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                moveToTestimonialSlide(index);
            });
            testimonialDots.appendChild(dot);
        });
        
        // Previous button
        testimonialPrev.addEventListener('click', () => {
            moveToTestimonialSlide(currentTestimonialIndex - 1);
        });
        
        // Next button
        testimonialNext.addEventListener('click', () => {
            moveToTestimonialSlide(currentTestimonialIndex + 1);
        });
        
        // Move to slide function
        function moveToTestimonialSlide(index) {
            if (index < 0) index = testimonialItems.length - 1;
            if (index >= testimonialItems.length) index = 0;
            
            testimonialSlider.style.transform = `translateX(-${index * 100}%)`;
            
            // Update dots
            document.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            
            currentTestimonialIndex = index;
        }
        
        // Auto slide (optional)
        let testimonialInterval = setInterval(() => {
            moveToTestimonialSlide(currentTestimonialIndex + 1);
        }, 6000);
        
        // Pause auto slide on hover
        testimonialSlider.addEventListener('mouseenter', () => {
            clearInterval(testimonialInterval);
        });
        
        testimonialSlider.addEventListener('mouseleave', () => {
            testimonialInterval = setInterval(() => {
                moveToTestimonialSlide(currentTestimonialIndex + 1);
            }, 6000);
        });
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                service: document.getElementById('service').value,
                message: document.getElementById('message').value
            };
            
            // Validate form (simple validation)
            if (!formData.name || !formData.phone || !formData.email || !formData.service || !formData.message) {
                formMessage.textContent = 'Please fill in all fields';
                formMessage.className = 'form-message error';
                return;
            }
            
            // For GitHub Pages, we'll just show a success message
            // In a real implementation, you would send this data to a server
            formMessage.textContent = 'Thank you for your message! We will get back to you soon.';
            formMessage.className = 'form-message success';
            
            // Reset form
            contactForm.reset();
            
            // Clear success message after 5 seconds
            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.className = 'form-message';
            }, 5000);
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to nav links based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const headerHeight = document.getElementById('header').offsetHeight;
            
            if (scrollY >= sectionTop - headerHeight - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Call once on page load
    
    // Fade-in animation for elements when they come into view
    const fadeElements = document.querySelectorAll('.service-card, .feature-card, .stat, .gallery-item, .testimonial-item');
    
    const fadeInOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const fadeInObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, fadeInOptions);
    
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        fadeInObserver.observe(element);
    });
    
    // Add CSS class for fade-in animation
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});
