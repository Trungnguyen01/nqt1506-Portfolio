document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. TÍNH NĂNG ĐÓNG / MỞ POPUP MORE NETWORKS ---
    const openPopupBtn = document.getElementById('open-more-btn');
    const closePopupBtn = document.getElementById('close-more-btn');
    const popupOverlay = document.getElementById('more-links-popup');
    
    // Hàm mở popup
    if (openPopupBtn && popupOverlay) {
        openPopupBtn.addEventListener('click', () => {
            popupOverlay.classList.add('active');
            document.body.classList.add('popup-open'); // Khóa trạng thái cuộn của trang chính phía dưới
        });
    }

    // Hàm đóng popup quay lại đúng vị trí đang đứng trước đó
    if (closePopupBtn && popupOverlay) {
        closePopupBtn.addEventListener('click', () => {
            popupOverlay.classList.remove('active');
            document.body.classList.remove('popup-open'); // Mở khóa cuộn trang tự do
        });
        
        // Tắt popup khi click ra ngoài vùng hộp đen nội dung (vùng mờ overlay)
        popupOverlay.addEventListener('click', (e) => {
            if (e.target === popupOverlay) {
                popupOverlay.classList.remove('active');
                document.body.classList.remove('popup-open');
            }
        });
    }


    // --- 2. TÍNH NĂNG CLICK SAO CHÉP NHANH SỐ TÀI KHOẢN ---
    const bankCards = document.querySelectorAll('.bank-card');
    bankCards.forEach(card => {
        card.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-copy');
            if (textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    const numberDOM = this.querySelector('.bank-number');
                    const originalNumber = numberDOM.innerText;
                    
                    numberDOM.innerText = "COPIED! ✓";
                    numberDOM.style.color = "#00ff66"; // Đổi chữ màu xanh neon thành công
                    
                    setTimeout(() => {
                        numberDOM.innerText = originalNumber;
                        numberDOM.style.color = "#d1d1d1";
                    }, 1200);
                }).catch(err => {
                    console.error('Không thể tự động sao chép: ', err);
                });
            }
        });
    });


    // --- 3. HIỆU ỨNG CUỘN TRANG MỜ DẦN (SMOOTH SCROLL ANIMATION) ---
    const scrollSections = document.querySelectorAll('.scroll-anim');
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                sectionObserver.unobserve(entry.target); // Ngừng quan sát khi đã hiện xong để tối ưu CPU
            }
        });
    }, observerOptions);

    scrollSections.forEach(section => {
        sectionObserver.observe(section);
    });
    
});