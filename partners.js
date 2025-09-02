// partners.js - Interactive and responsive enhancements for Partners.html

document.addEventListener('DOMContentLoaded', function() {
    // Partner card interactive popup
    document.querySelectorAll('.partner-card').forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            const desc = this.getAttribute('data-desc');
            const popup = document.getElementById('partnerDesc');
            popup.innerHTML = desc;
            popup.style.display = 'block';
            const rect = this.getBoundingClientRect();
            // Responsive: position popup below or above depending on space
            let top = rect.bottom + window.scrollY + 10;
            if (window.innerHeight - rect.bottom < 100) {
                top = rect.top + window.scrollY - popup.offsetHeight - 10;
            }
            popup.style.left = (rect.left + window.scrollX + rect.width/2 - 120) + 'px';
            popup.style.top = top + 'px';
        });
        card.addEventListener('mouseleave', function() {
            document.getElementById('partnerDesc').style.display = 'none';
        });
        card.addEventListener('focus', function(e) {
            // Keyboard accessibility
            this.dispatchEvent(new Event('mouseenter'));
        });
        card.addEventListener('blur', function(e) {
            this.dispatchEvent(new Event('mouseleave'));
        });
    });

    // Responsive: stack cards vertically on small screens
    function handleResize() {
        const cards = document.getElementById('partnerCards');
        if (window.innerWidth < 700) {
            cards.classList.add('vertical');
        } else {
            cards.classList.remove('vertical');
        }
    }
    window.addEventListener('resize', handleResize);
    handleResize();
});
