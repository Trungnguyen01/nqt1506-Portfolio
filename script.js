document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. POPUP MORE NETWORKS CONTROLLER ---
    const openPopupBtn = document.getElementById('open-more-btn');
    const closePopupBtn = document.getElementById('close-more-btn');
    const popupOverlay = document.getElementById('more-links-popup');
    
    if (openPopupBtn && popupOverlay) {
        openPopupBtn.addEventListener('click', () => {
            popupOverlay.classList.add('active');
            document.body.classList.add('popup-open'); 
        });
    }

    if (closePopupBtn && popupOverlay) {
        closePopupBtn.addEventListener('click', () => {
            popupOverlay.classList.remove('active');
            document.body.classList.remove('popup-open'); 
        });
        
        popupOverlay.addEventListener('click', (e) => {
            if (e.target === popupOverlay) {
                popupOverlay.classList.remove('active');
                document.body.classList.remove('popup-open');
            }
        });
    }

    // --- 2. CLICK TO COPY BANK ACCOUNT ---
    const bankCards = document.querySelectorAll('.bank-card');
    bankCards.forEach(card => {
        card.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-copy');
            if (textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    const numberDOM = this.querySelector('.bank-number');
                    const originalNumber = numberDOM.innerText;
                    
                    numberDOM.innerText = "COPIED! ✓";
                    numberDOM.style.setProperty('color', '#00ff66', 'important'); 
                    
                    setTimeout(() => {
                        numberDOM.innerText = originalNumber;
                        numberDOM.style.setProperty('color', '#d1d1d1', 'important');
                    }, 1200);
                }).catch(err => {
                    console.error('Lỗi: ', err);
                });
            }
        });
    });

    // --- 3. INTERSECTION OBSERVER (SCROLL ANIMATION) ---
    const scrollSections = document.querySelectorAll('.scroll-anim');
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                sectionObserver.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    scrollSections.forEach(section => {
        sectionObserver.observe(section);
    });
    
});