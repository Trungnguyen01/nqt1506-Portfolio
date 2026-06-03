document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. HIỆU ỨNG CUỘN TRANG XUẤT HIỆN ---
    const animatedSections = document.querySelectorAll('.scroll-anim');

    const handleScroll = () => {
        animatedSections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const triggerPoint = window.innerHeight - 60;

            if (sectionTop < triggerPoint) {
                section.classList.add('visible');
            }
        });
    };

    // Chạy cấu trúc lần đầu và gán sự kiện vuốt chạm tối ưu mượt cho Mobile
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });


    // --- 2. LOGIC CLICK ĐỂ COPY SỐ TÀI KHOẢN ---
    const bankCards = document.querySelectorAll('.bank-card');

    bankCards.forEach(card => {
        card.style.cursor = 'pointer';

        card.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-copy');
            
            if (textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    
                    const numberDisplay = this.querySelector('.bank-number');
                    const originalText = numberDisplay.innerText;
                    
                    numberDisplay.innerText = "✓ ĐÃ SAO CHÉP STK";
                    numberDisplay.style.color = "#00ff88"; // Màu xanh lá phản hồi gọn gàng

                    setTimeout(() => {
                        numberDisplay.innerText = originalText;
                        numberDisplay.style.color = ""; 
                    }, 1500);

                }).catch(err => {
                    console.error('Lỗi thực thi sao chép: ', err);
                });
            }
        });
    });
});