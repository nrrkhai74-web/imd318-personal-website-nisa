// Main JavaScript File for Personal Website

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Digital Clock
    function updateClock() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        
        const dateTimeString = now.toLocaleDateString('en-US', options);
        
        const clockElement = document.getElementById('digitalClock');
        if (clockElement) {
            clockElement.textContent = dateTimeString;
        }
    }
    
    // Update clock immediately and every second
    updateClock();
    setInterval(updateClock, 1000);
    
    // Set current year in copyright
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Form validation for contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // In a real application, you would send the data to a server here
            console.log('Form submitted:', { name, email, message });
            
            // Show success message
            const successMessage = document.getElementById('formSuccess');
            if (successMessage) {
                contactForm.style.display = 'none';
                successMessage.style.display = 'block';
            } else {
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            }
        });
        
        // Reset form when "Send Another" is clicked
        const sendAnotherBtn = document.getElementById('sendAnother');
        if (sendAnotherBtn) {
            sendAnotherBtn.addEventListener('click', function() {
                contactForm.reset();
                contactForm.style.display = 'block';
                document.getElementById('formSuccess').style.display = 'none';
            });
        }
    }
    
    // Image Lightbox functionality for gallery
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    const lightboxDate = document.getElementById('lightbox-date');
    const lightboxCategory = document.getElementById('lightbox-category');
    const closeLightbox = document.querySelector('.close-lightbox');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    
    let currentImageIndex = 0;
    const galleryImages = Array.from(document.querySelectorAll('.gallery-item'));
    
    if (galleryImages.length > 0) {
        galleryImages.forEach((item, index) => {
            item.addEventListener('click', function() {
                currentImageIndex = index;
                updateLightbox();
                lightbox.style.display = 'block';
            });
        });
    }
    
    if (closeLightbox) {
        closeLightbox.addEventListener('click', function() {
            lightbox.style.display = 'none';
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
            updateLightbox();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
            updateLightbox();
        });
    }
    
    function updateLightbox() {
        if (galleryImages.length === 0) return;
        
        const item = galleryImages[currentImageIndex];
        const imgSrc = item.querySelector('.gallery-img').src;
        const title = item.querySelector('.gallery-overlay h3').textContent;
        const description = item.querySelector('.gallery-overlay p').textContent;
        const date = item.querySelector('.gallery-date').textContent;
        const category = item.getAttribute('data-category');
        
        lightboxImg.src = imgSrc;
        lightboxTitle.textContent = title;
        lightboxDescription.textContent = description;
        lightboxDate.textContent = date;
        lightboxCategory.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    }
    
    // Close lightbox when clicking outside the image
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });
    }
    
    // Gallery filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                const filterValue = button.getAttribute('data-filter');
                
                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll animation for elements
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.section-box, .timeline-item, .gallery-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animation
    const animatedElements = document.querySelectorAll('.section-box, .timeline-item, .gallery-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    // Trigger once on load
    setTimeout(animateOnScroll, 100);
    
    // Search functionality for sitemap
    const siteSearch = document.getElementById('siteSearch');
    const searchBtn = document.getElementById('searchBtn');
    const searchResults = document.getElementById('searchResults');
    
    if (siteSearch && searchBtn) {
        const searchData = [
            { page: 'Home', file: 'index.html', description: 'Main landing page', keywords: 'home, main, introduction' },
            { page: 'Biodata', file: 'biodata.html', description: 'Personal information', keywords: 'biodata, personal, details, information' },
            { page: 'Experience', file: 'experience.html', description: 'Professional experience', keywords: 'experience, skills, achievements, work' },
            { page: 'Education', file: 'education.html', description: 'Academic background', keywords: 'education, academic, school, university' },
            { page: 'Family', file: 'family.html', description: 'Family information', keywords: 'family, tree, parents, siblings' },
            { page: 'Gallery', file: 'gallery.html', description: 'Photo gallery', keywords: 'gallery, photos, images, media' },
            { page: 'Contact', file: 'contact.html', description: 'Contact information', keywords: 'contact, email, phone, address' },
            { page: 'Site Map', file: 'sitemap.html', description: 'Website structure', keywords: 'sitemap, navigation, structure, map' }
        ];
        
        function performSearch() {
            const query = siteSearch.value.toLowerCase().trim();
            searchResults.innerHTML = '';
            
            if (!query) {
                searchResults.innerHTML = '<p class="no-results">Please enter a search term</p>';
                return;
            }
            
            const results = searchData.filter(item => 
                item.page.toLowerCase().includes(query) ||
                item.description.toLowerCase().includes(query) ||
                item.keywords.toLowerCase().includes(query)
            );
            
            if (results.length === 0) {
                searchResults.innerHTML = '<p class="no-results">No results found for "' + query + '"</p>';
                return;
            }
            
            results.forEach(item => {
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                resultItem.innerHTML = `
                    <h4>${item.page}</h4>
                    <p>${item.description}</p>
                    <a href="${item.file}" class="result-link">Go to page</a>
                `;
                searchResults.appendChild(resultItem);
            });
        }
        
        searchBtn.addEventListener('click', performSearch);
        siteSearch.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // Set current page as active in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (linkHref === 'index.html' && currentPage === '')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Update all "last updated" dates
    const updateDateElements = document.querySelectorAll('[id$="Update"], [id$="UpdateDate"]');
    updateDateElements.forEach(element => {
        element.textContent = document.lastModified;
    });
});

// Additional utility functions
function formatPhoneNumber(phone) {
    // Format phone number for display
    const cleaned = ('' + phone).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phone;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <p>${message}</p>
        <button class="close-notification">&times;</button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
    
    // Close button functionality
    notification.querySelector('.close-notification').addEventListener('click', function() {
        notification.remove();
    });
}

// Export functions for use in other scripts if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatPhoneNumber,
        validateEmail,
        showNotification
    };
}