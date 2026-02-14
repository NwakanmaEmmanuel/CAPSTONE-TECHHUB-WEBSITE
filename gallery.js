// ===== GALLERY FILTERING =====

const filterButtons = document.querySelectorAll('.filter-btn');
const galleryCards = document.querySelectorAll('.gallery-card');

if (filterButtons.length > 0 && galleryCards.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter cards with animation
            galleryCards.forEach((card, index) => {
                // Skip the upload card
                if (card.classList.contains('upload-card')) {
                    return;
                }
                
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category.includes(filterValue)) {
                    // Show card with delay for stagger effect
                    setTimeout(() => {
                        card.style.display = 'block';
                        card.classList.remove('hidden');
                        // Trigger reflow
                        card.offsetHeight;
                        card.style.animation = 'fadeInUp 0.6s ease';
                    }, index * 50);
                } else {
                    // Hide card
                    card.classList.add('hidden');
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ===== LIGHTBOX FUNCTIONALITY (Optional Enhancement) =====
// Click on images to view in larger size
const cardImages = document.querySelectorAll('.card-image img');

cardImages.forEach(img => {
    img.addEventListener('click', function(e) {
        e.stopPropagation();
        openLightbox(this.src, this.alt);
    });
});

function openLightbox(imageSrc, imageAlt) {
    // Create lightbox if it doesn't exist
    let lightbox = document.getElementById('lightbox');
    
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        const lightboxImg = document.createElement('img');
        lightboxImg.id = 'lightbox-img';
        lightboxImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border-radius: 10px;
            box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
        `;
        
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '✕';
        closeBtn.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            background: white;
            color: #333;
            border: none;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            font-size: 24px;
            cursor: pointer;
            transition: all 0.3s ease;
            z-index: 10001;
        `;
        
        closeBtn.addEventListener('mouseenter', function() {
            this.style.background = '#00a85a';
            this.style.color = 'white';
            this.style.transform = 'scale(1.1)';
        });
        
        closeBtn.addEventListener('mouseleave', function() {
            this.style.background = 'white';
            this.style.color = '#333';
            this.style.transform = 'scale(1)';
        });
        
        lightbox.appendChild(lightboxImg);
        lightbox.appendChild(closeBtn);
        document.body.appendChild(lightbox);
        
        // Close on click
        lightbox.addEventListener('click', closeLightbox);
        closeBtn.addEventListener('click', closeLightbox);
    }
    
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = imageSrc;
    lightboxImg.alt = imageAlt;
    
    // Show lightbox
    lightbox.style.display = 'flex';
    setTimeout(() => {
        lightbox.style.opacity = '1';
    }, 10);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.opacity = '0';
        setTimeout(() => {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Close lightbox with ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// ===== LAZY LOADING FOR IMAGES =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all gallery cards for scroll animation
document.querySelectorAll('.gallery-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    cardObserver.observe(card);
});

console.log('Gallery page initialized ✅');
console.log(`Total images: ${cardImages.length}`);
console.log(`Filter buttons: ${filterButtons.length}`);
