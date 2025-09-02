// intro-slider.js - Enhanced video slider and engaging intro section

document.addEventListener('DOMContentLoaded', function() {
    const videos = [
        'BABA E-SPORTS VIDEOES/lv_0_20241227141938.mp4',
        'BABA E-SPORTS VIDEOES/lv_0_20250103175551.mp4',
        'BABA E-SPORTS VIDEOES/lv_0_20250106004911.mp4',
        'BABA E-SPORTS VIDEOES/lv_0_20250112020403.mp4'
    ];
    let current = 0;
    const videoEl = document.getElementById('introVideo');
    const prevBtn = document.getElementById('prevVideo');
    const nextBtn = document.getElementById('nextVideo');
    const progressBar = document.getElementById('progressBar');
    const taglines = [
        'Unleash your skills. Compete. Win. Become a legend.',
        'Join the battle. Rise to the top. Make history.',
        'Experience the thrill of e-sports with BABA!',
        'Your journey to glory starts here!'
    ];
    const dynamicTagline = document.getElementById('dynamicTagline');
    let taglineIdx = 0;

    function showVideo(idx) {
        videoEl.src = videos[idx];
        videoEl.load();
        videoEl.play();
        updateProgressBar();
    }

    prevBtn.addEventListener('click', function() {
        current = (current - 1 + videos.length) % videos.length;
        showVideo(current);
        updateTagline();
    });
    nextBtn.addEventListener('click', function() {
        current = (current + 1) % videos.length;
        showVideo(current);
        updateTagline();
    });

    // Progress bar update
    function updateProgressBar() {
        if (!videoEl.duration) {
            progressBar.style.width = '0%';
            return;
        }
        const percent = (videoEl.currentTime / videoEl.duration) * 100;
        progressBar.style.width = percent + '%';
    }
    videoEl.addEventListener('timeupdate', updateProgressBar);
    videoEl.addEventListener('loadedmetadata', updateProgressBar);
    videoEl.addEventListener('ended', function() {
        // Auto-next video
        nextBtn.click();
    });

    // Dynamic tagline cycling
    function updateTagline() {
        taglineIdx = current % taglines.length;
        dynamicTagline.textContent = taglines[taglineIdx];
    }
    setInterval(function() {
        taglineIdx = (taglineIdx + 1) % taglines.length;
        dynamicTagline.textContent = taglines[taglineIdx];
    }, 4000);

    // Optional: swipe support for mobile
    let startX = null;
    videoEl.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
    });
    videoEl.addEventListener('touchend', function(e) {
        if (startX === null) return;
        let endX = e.changedTouches[0].clientX;
        if (endX - startX > 50) prevBtn.click();
        else if (startX - endX > 50) nextBtn.click();
        startX = null;
    });

    // Animate intro headline on load
    setTimeout(() => {
        document.querySelector('.intro-animate').classList.add('animated');
    }, 200);

    // Initial setup
    showVideo(current);
    updateTagline();
});
