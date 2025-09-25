// --- Utility: Throttle Function ---
function throttle(fn, wait) {
    let lastTime = 0;
    return function (...args) {
        const now = Date.now();
        if (now - lastTime >= wait) {
            fn.apply(this, args);
            lastTime = now;
        }
    };
}

// --- Hamburger Menu ---
function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (!hamburger || !navLinks) {
        console.error('Hamburger or nav-links not found');
        return;
    }

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
    hamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            navLinks.classList.toggle('active');
        }
    });
}

// --- Perfume Gallery ---
const perfumeData = [
    { title: "Hot Aroma 50ml", subtitle: "Limited time Discount", rating: "4.4🌟", status: "Selling Fast", oldPrice: "$45", newPrice: "$30" },
    { title: "Velvet Mist 75ml", subtitle: "Summer Collection", rating: "4.2🌟", status: "Almost Gone", oldPrice: "$60", newPrice: "$40" },
    { title: "Ocean Breeze 100ml", subtitle: "Fresh & Clean", rating: "4.5🌟", status: "Sold Out", oldPrice: "$75", newPrice: "$55" },
    { title: "Midnight Bloom 60ml", subtitle: "New Arrival", rating: "4.8🌟", status: "In Stock", oldPrice: "$50", newPrice: "$35" },
    { title: "Golden Sands 80ml", subtitle: "Luxurious Scent", rating: "4.3🌟", status: "In Stock", oldPrice: "$85", newPrice: "$65" },
    { title: "Mystic Forest 90ml", subtitle: "Earthy Notes", rating: "4.6🌟", status: "In Stock", oldPrice: "$70", newPrice: "$50" },
    { title: "Citrus Burst 50ml", subtitle: "Energetic Fragrance", rating: "4.1🌟", status: "In Stock", oldPrice: "$35", newPrice: "$25" },
    { title: "Evening Charm 70ml", subtitle: "Elegant & Floral", rating: "4.7🌟", status: "Sold Out", oldPrice: "$65", newPrice: "$45" },
    { title: "Spiced Vanilla 120ml", subtitle: "Warm & Inviting", rating: "4.0🌟", status: "In Stock", oldPrice: "$90", newPrice: "$70" },
    { title: "Raindrop Serenity 65ml", subtitle: "Calm & Soothing", rating: "4.5🌟", status: "In Stock", oldPrice: "$55", newPrice: "$40" },
    { title: "Desert Rose 50ml", subtitle: "Exotic & Bold", rating: "4.9🌟", status: "In Stock", oldPrice: "$70", newPrice: "$55" },
    { title: "Arctic Frost 75ml", subtitle: "Crisp & Cool", rating: "4.4🌟", status: "In Stock", oldPrice: "$50", newPrice: "$30" },
    { title: "Blush Petals 100ml", subtitle: "Soft & Romantic", rating: "4.3🌟", status: "Almost Gone", oldPrice: "$80", newPrice: "$60" },
    { title: "Urban Pulse 60ml", subtitle: "Modern & Edgy", rating: "4.6🌟", status: "In Stock", oldPrice: "$45", newPrice: "$35" },
    { title: "Dreamy Nights 80ml", subtitle: "Sweet Dreams", rating: "4.7🌟", status: "In Stock", oldPrice: "$60", newPrice: "$45" },
    { title: "Fireside Glow 90ml", subtitle: "Cozy & Comforting", rating: "4.2🌟", status: "In Stock", oldPrice: "$75", newPrice: "$55" },
    { title: "Tropical Escape 50ml", subtitle: "Vibrant & Fruity", rating: "4.8🌟", status: "In Stock", oldPrice: "$40", newPrice: "$30" },
    { title: "Silk Touch 70ml", subtitle: "Smooth & Subtle", rating: "4.5🌟", status: "In Stock", oldPrice: "$65", newPrice: "$45" },
    { title: "Ancient Amber 120ml", subtitle: "Timeless Classic", rating: "4.0🌟", status: "In Stock", oldPrice: "$100", newPrice: "$80" },
    { title: "Radiant Day 65ml", subtitle: "Bright & Cheerful", rating: "4.9🌟", status: "Selling Fast", oldPrice: "$55", newPrice: "$40" },
];

function createPerfumeItemHTML(data, index) {
    const statusClass = {
        "Selling Fast": "status-selling-fast",
        "Almost Gone": "status-almost-gone",
        "Sold Out": "status-sold-out",
        "In Stock": "status-in-stock"
    }[data.status] || "";
    return `
        <div class="perfume-item" data-index="${index}">
            <div class="product-pricing">
                <span class="old-price">${data.oldPrice}</span><br>
                <span class="new-price">${data.newPrice}</span>
            </div>
            <div class="stock-status ${statusClass}">${data.status}</div>
            <div class="perfume-image-container">
                <img src="https://via.placeholder.com/180x300.png?text=${data.title.replace(/\s/g, '+')}" alt="${data.title}" loading="lazy" sizes="(max-width: 600px) 140px, 180px">
                <div class="image-label">${data.title}</div>
            </div>
            <div class="product-details">
                <h3>${data.title}</h3>
                <p class="subtitle">${data.subtitle}</p>
                <p class="rating">${data.rating}</p>
                <div class="product-actions">
                    <span class="favorite-icon" role="button" aria-label="Add to favorites">❤️</span>
                    <button class="add-to-cart-btn" aria-label="Add ${data.title} to cart">Add to Cart</button>
                </div>
            </div>
        </div>
    `;
}

function initPerfumeGallery() {
    const imageContainer = document.getElementById('image-container');
    if (!imageContainer) {
        console.error('Perfume gallery container not found');
        return;
    }
    imageContainer.innerHTML = ''; // Clear any existing content
    perfumeData.forEach((data, index) => {
        imageContainer.innerHTML += createPerfumeItemHTML(data, index);
    });

    const perfumeItems = document.querySelectorAll('.perfume-item');
    const leftArrow = document.getElementById('left-arrow');
    const rightArrow = document.getElementById('right-arrow');
    if (!perfumeItems.length || !leftArrow || !rightArrow) {
        console.error('Perfume gallery elements missing');
        return;
    }

    function updatePerfumeGallery() {
        const containerWidth = imageContainer.offsetWidth;
        const scrollLeft = imageContainer.scrollLeft;
        const containerCenter = scrollLeft + (containerWidth / 2);
        const itemWidthWithGap = perfumeItems[0]?.offsetWidth + 15 || 195;
        const uprightZoneWidth = itemWidthWithGap * 3; // Zone for 3 items
        const uprightZoneCenter = containerCenter;

        perfumeItems.forEach(item => {
            const itemRect = item.getBoundingClientRect();
            const itemCenter = item.offsetLeft + (item.offsetWidth / 2);
            const distanceFromZoneCenter = Math.abs(itemCenter - uprightZoneCenter);
            if (distanceFromZoneCenter < uprightZoneWidth / 2) {
                item.style.transform = 'rotate(0deg)';
                item.style.opacity = '1';
            } else {
                const distanceOutsideZone = distanceFromZoneCenter - (uprightZoneWidth / 2);
                const maxDistance = (containerWidth / 2) - (uprightZoneWidth / 2);
                const normalizedDistance = Math.min(distanceOutsideZone / maxDistance, 1);
                const rotation = normalizedDistance * 8;
                const opacity = 1 - (normalizedDistance * 0.4);
                const rotationDirection = itemCenter > uprightZoneCenter ? '' : '-';
                item.style.transform = `rotate(${rotationDirection}${rotation}deg)`;
                item.style.opacity = opacity;
            }
        });
    }

    let scrollAmount = perfumeItems[0]?.offsetWidth + 15 || 195;
    function scrollGallery(direction) {
        if (!imageContainer) return;
        imageContainer.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
        setTimeout(updatePerfumeGallery, 300);
    }

    // Swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    imageContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    imageContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const swipeDistance = touchEndX - touchStartX;
        if (Math.abs(swipeDistance) > 50) {
            scrollGallery(swipeDistance > 0 ? -1 : 1);
        }
    });

    leftArrow.addEventListener('click', () => scrollGallery(-1));
    rightArrow.addEventListener('click', () => scrollGallery(1));
    leftArrow.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            scrollGallery(-1);
        }
    });
    rightArrow.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            scrollGallery(1);
        }
    });

    imageContainer.addEventListener('scroll', throttle(updatePerfumeGallery, 100));
    window.addEventListener('resize', () => {
        scrollAmount = perfumeItems[0]?.offsetWidth + 15 || 195;
        updatePerfumeGallery();
    });

    // Initial update
    setTimeout(updatePerfumeGallery, 100); // Delay to ensure DOM is rendered
}

// --- Testimonial Slider ---
function initTestimonialSlider() {
    const testimonialSlider = document.getElementById('testimonial-slider');
    const testimonialContainer = document.querySelector('.testimonial-container');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const leftArrow = document.getElementById('testimonial-left-arrow');
    const rightArrow = document.getElementById('testimonial-right-arrow');
    if (!testimonialSlider || !testimonialContainer || !testimonialCards.length || !leftArrow || !rightArrow) {
        console.error('Testimonial slider elements missing');
        return;
    }

    let currentTestimonialIndex = 0;
    const totalCards = testimonialCards.length;

    function updateTestimonialSlider() {
        const cardWidth = testimonialContainer.offsetWidth;
        testimonialSlider.style.transform = `translateX(-${currentTestimonialIndex * cardWidth}px)`;
    }

    function moveTestimonial(direction) {
        currentTestimonialIndex = (currentTestimonialIndex + direction + totalCards) % totalCards;
        updateTestimonialSlider();
    }

    // Swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    testimonialContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    testimonialContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const swipeDistance = touchEndX - touchStartX;
        if (Math.abs(swipeDistance) > 50) {
            moveTestimonial(swipeDistance > 0 ? -1 : 1);
        }
    });

    leftArrow.addEventListener('click', () => moveTestimonial(-1));
    rightArrow.addEventListener('click', () => moveTestimonial(1));
    leftArrow.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            moveTestimonial(-1);
        }
    });
    rightArrow.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            moveTestimonial(1);
        }
    });

    window.addEventListener('resize', updateTestimonialSlider);
    updateTestimonialSlider();
}

// --- Announcement Bar ---
function initAnnouncementBar() {
    const countryDropdown = document.getElementById('country-dropdown');
    if (countryDropdown) {
        countryDropdown.addEventListener('change', () => {
            console.log(`Selected country: ${countryDropdown.value}`);
        });
    }

    const announcementList = document.querySelector('.announcement-list');
    if (!announcementList) {
        console.error('Announcement list not found');
        return;
    }

    const items = document.querySelectorAll('.announcement-list li');
    if (!items.length) {
        console.error('No announcement items found');
        return;
    }

    let currentIndex = 0;
    let animationInterval = null;

    function showNextMessage() {
        currentIndex = (currentIndex + 1) % items.length;
        announcementList.style.transform = `translateY(${-currentIndex * 20}px)`;
    }

    function startAnimation() {
        if (animationInterval) clearInterval(animationInterval); // Clear any existing interval
        animationInterval = setInterval(showNextMessage, 3000);
    }

    function stopAnimation() {
        if (animationInterval) {
            clearInterval(animationInterval);
            animationInterval = null;
        }
    }

    // Start animation initially
    startAnimation();

    // Pause animation when not in viewport
    const observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) {
            stopAnimation();
        } else {
            startAnimation();
        }
    }, { threshold: 0 });

    observer.observe(announcementList);
}

// --- Update Copyright Year ---
function updateCopyrightYear() {
    const copyrightElement = document.getElementById('copyright');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.innerHTML = `&copy; ${currentYear} WPerfumes, Inc. All Rights Reserved.<br>Company Reg. No: 12345678A`;
    }
}

// --- Initialize Components ---
document.addEventListener('DOMContentLoaded', () => {
    initHamburgerMenu();
    initPerfumeGallery();
    initTestimonialSlider();
    initAnnouncementBar();
    updateCopyrightYear();
});