document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. TÍNH NĂNG CLICK SAO CHÉP NHANH SỐ TÀI KHOẢN ---
    const bankCards = document.querySelectorAll('.bank-card');
    
    bankCards.forEach(card => {
        card.addEventListener('click', function() {
            // Lấy giá trị chuỗi số tài khoản trong thuộc tính data-copy
            const textToCopy = this.getAttribute('data-copy');
            
            if (textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    const numberDOM = this.querySelector('.bank-number');
                    const originalNumber = numberDOM.innerText;
                    
                    // Hiển thị trạng thái thông báo thành công trực tiếp dạng ma trận/hacker
                    numberDOM.innerText = "COPIED! ✓";
                    numberDOM.style.color = "#00ff66"; // Màu xanh lá neon làm điểm nhấn công nghệ
                    
                    // Trả lại số tài khoản nguyên bản sau 1.2 giây
                    setTimeout(() => {
                        numberDOM.innerText = originalNumber;
                        numberDOM.style.color = "#d1d1d1";
                    }, 1200);
                }).catch(err => {
                    console.error('Lỗi, không thể sao chép tự động: ', err);
                });
            }
        });
    });

    // --- 2. HIỆU ỨNG CUỘN TRANG MỜ DẦN (SMOOTH SCROLL ANIMATION) ---
    const scrollSections = document.querySelectorAll('.scroll-anim');
    
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15 // Kích hoạt khi 15% diện tích section xuất hiện trên màn hình
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Ngừng theo dõi section này sau khi nó đã hiển thị xong để tối ưu hiệu năng máy
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    scrollSections.forEach(section => {
        sectionObserver.observe(section);
    });
    
});