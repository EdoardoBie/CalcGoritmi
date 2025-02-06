document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animate features on scroll
    const features = document.querySelectorAll('.feature');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    features.forEach(feature => {
        observer.observe(feature);
    });

    // Add loading animation for download buttons
    document.querySelectorAll('.download-button').forEach(button => {
        button.addEventListener('click', function(e) {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-3px)';
            }, 200);
        });
    });

    // Stats Counter Animation
    const stats = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        stats.forEach(stat => {
            const target = parseFloat(stat.textContent);
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if(current >= target) {
                    clearInterval(timer);
                    current = target;
                }
                stat.textContent = current.toFixed(1) + (stat.textContent.includes('%') ? '%' : '');
            }, 50);
        });
    }

    const statsSection = document.querySelector('#stats');
    if(statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    animateStats();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statsSection);
    }

    function displayResults(original, sorted, searchIndex, time) {
        resultsDiv.innerHTML = `
            <div class="result-card">
                <h3>Analysis Results</h3>
                <p><strong>Original Array:</strong> ${original.join(', ')}</p>
                <p><strong>Sorted Array:</strong> ${sorted.join(', ')}</p>
                <p><strong>Search Result:</strong> ${searchIndex >= 0 ? `Found at index ${searchIndex}` : 'Not found'}</p>
                <p><strong>Execution Time:</strong> ${time.toFixed(2)}ms</p>
            </div>
        `;
    }
    // Modal handling
function setupModal(btnId, modalId) {
    const modal = document.getElementById(modalId);
    const btn = document.getElementById(btnId);
    const span = modal.querySelector('.close');

    btn.onclick = (e) => {
        e.preventDefault();
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
    }

    span.onclick = () => {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }

    window.onclick = (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    }
}

setupModal('privacy-policy-btn', 'privacy-modal');
setupModal('cookie-policy-btn', 'cookie-modal');
setupModal('terms-btn', 'terms-modal');

// Cookie consent handling
const cookieConsent = document.getElementById('cookie-consent');
const acceptCookies = document.getElementById('accept-cookies');

if (!localStorage.getItem('cookiesAccepted')) {
    setTimeout(() => {
        cookieConsent.classList.add('show');
    }, 1000);
}

acceptCookies.onclick = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    cookieConsent.classList.remove('show');
};

document.getElementById('cookie-policy-link').onclick = (e) => {
    e.preventDefault();
    document.getElementById('cookie-policy-btn').click();
};
});