// schedule.js - Dynamic, responsive schedule section for BABA E-SPORTS

document.addEventListener('DOMContentLoaded', function() {
    // Example schedule data (replace or extend as needed)
    const scheduleData = [
        {
            title: 'Local Tournaments',
            desc: "Battle with your neighborhood's best teams and rise to the top!",
            img: 'image2.jpg',
            date: 'June 15, 2025'
        },
        {
            title: 'District Tournaments',
            desc: 'Represent your district and claim your spot among the elite.',
            img: 'image5.jpg',
            date: 'July 5, 2025'
        },
        {
            title: 'State Tournaments',
            desc: 'Challenge the best teams from across the state for ultimate glory.',
            img: 'image8.jpg',
            date: 'August 1, 2025'
        }
    ];
    const scheduleList = document.getElementById('scheduleList');
    scheduleList.innerHTML = scheduleData.map(ev => `
        <div class="schedule-card" tabindex="0" data-title="${ev.title}" data-desc="${ev.desc}" data-img="${ev.img}" data-date="${ev.date}">
            <img src="${ev.img}" alt="${ev.title}">
            <h3>${ev.title}</h3>
            <p>${ev.desc}</p>
            <div class="schedule-date">${ev.date}</div>
        </div>
    `).join('');

    // Modal logic
    const cards = document.querySelectorAll('.schedule-card');
    const modal = document.getElementById('scheduleModal');
    const closeModal = document.getElementById('closeModal');
    const modalImg = document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalDate = document.getElementById('modalDate');

    function openModal(card) {
        modalImg.src = card.getAttribute('data-img');
        modalTitle.textContent = card.getAttribute('data-title');
        modalDesc.textContent = card.getAttribute('data-desc');
        modalDate.textContent = card.getAttribute('data-date');
        modal.style.display = 'flex';
        setTimeout(() => modal.classList.add('show'), 10);
    }
    cards.forEach(card => {
        card.addEventListener('click', function() { openModal(card); });
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') openModal(card);
        });
    });
    closeModal.addEventListener('click', function() {
        modal.classList.remove('show');
        setTimeout(() => modal.style.display = 'none', 200);
    });
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal.click();
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') closeModal.click();
    });
});
