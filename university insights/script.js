// Stats animations
function animateCounter(element, target) {
    const duration = 2000; // 2 seconds
    let start = 0;
    let startTime = null;

    function animation(currentTime) {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const value = Math.floor(progress * target);
        element.textContent = value + '+';
        
        if (progress < 1) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

// Create Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            let target;
            switch(entry.target.id) {
                case 'country-stats':
                    target = 7;
                    break;
                case 'universities-stats':
                    target = 50;
                    break;
                case 'students-stats':
                    target = 1000;
                    break;
            }
            const h3Element = entry.target.querySelector('h3');
            animateCounter(h3Element, target);
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

// Observe each stats card
document.querySelectorAll('.stats-card').forEach(card => {
    observer.observe(card);
});


// Ratings slider functionalities
document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.rating-container');
    const slider = document.querySelector('.rating-section');
    const cards = document.querySelectorAll('.rating-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth + 30; // Card width + gap
    const maxIndex = cards.length - Math.floor(container.offsetWidth / cardWidth);

    // Function to update slider position
    function updateSliderPosition() {
        slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        
        // Update button states
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
    }

    // Previous button click handler
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSliderPosition();
        }
    });

    // Next button click handler
    nextBtn.addEventListener('click', () => {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSliderPosition();
        }
    });

    // Initial button state
    updateSliderPosition();

    // Update on window resize
    window.addEventListener('resize', () => {
        const newMaxIndex = cards.length - Math.floor(container.offsetWidth / cardWidth);
        if (currentIndex > newMaxIndex) {
            currentIndex = newMaxIndex;
        }
        updateSliderPosition();
    });
});



// Hamburger toggle animation
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    menu.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !menu.contains(e.target)) {
        hamburger.classList.remove('active');
        menu.classList.remove('active');
    }
});