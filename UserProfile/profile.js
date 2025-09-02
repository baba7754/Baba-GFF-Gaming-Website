// Demo: Simulate fetching user data from localStorage or a backend
const userData = JSON.parse(localStorage.getItem('babaUserProfile')) || {
    name: 'Player Name',
    uid: '123456789',
    contact: 'player@email.com',
    joined: '2025-06-08',
    tournaments: 5,
    wins: 2,
    image: '../logo.png'
};

// Populate profile
window.addEventListener('DOMContentLoaded', function() {
    document.getElementById('profileName').textContent = userData.name;
    document.getElementById('profileUid').textContent = 'UID: ' + userData.uid;
    document.getElementById('profileContact').textContent = userData.contact;
    document.getElementById('profileJoined').textContent = userData.joined;
    document.getElementById('profileTournaments').textContent = userData.tournaments;
    document.getElementById('profileWins').textContent = userData.wins;
    document.getElementById('profileImg').src = userData.image;
});

// Edit Profile Action: Enable inline editing for profile fields
document.getElementById('editProfileBtn').addEventListener('click', function() {
    const isEditing = document.body.classList.toggle('editing-profile');
    const fields = [
        { id: 'profileName', key: 'name', type: 'text' },
        { id: 'profileContact', key: 'contact', type: 'text' },
        { id: 'profileState', key: 'state', type: 'text' },
        { id: 'profileDistrict', key: 'district', type: 'text' },
        { id: 'profileDob', key: 'dob', type: 'date' }
    ];
    if (isEditing) {
        // Switch to input fields
        fields.forEach(f => {
            const el = document.getElementById(f.id);
            const value = el.textContent;
            let input;
            if (f.type === 'date') {
                input = document.createElement('input');
                input.type = 'date';
                input.value = value;
            } else {
                input = document.createElement('input');
                input.type = 'text';
                input.value = value;
            }
            input.id = f.id + '_input';
            input.className = 'profile-edit-input';
            el.style.display = 'none';
            el.parentNode.appendChild(input);
        });
        this.textContent = 'Save';
    } else {
        // Save changes
        fields.forEach(f => {
            const el = document.getElementById(f.id);
            const input = document.getElementById(f.id + '_input');
            if (input) {
                el.textContent = input.value;
                userData[f.key] = input.value;
                input.remove();
                el.style.display = '';
            }
        });
        // Save to localStorage
        localStorage.setItem('babaUserProfile', JSON.stringify(userData));
        this.textContent = 'Edit Profile';
    }
});

// Logout action
document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('babaUserProfile');
    window.location.href = '../Home.html';
});

// Allow editing of profile image
document.getElementById('profileImgUpload').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(evt) {
        document.getElementById('profileImg').src = evt.target.result;
        userData.image = evt.target.result;
        localStorage.setItem('babaUserProfile', JSON.stringify(userData));
    };
    reader.readAsDataURL(file);
});
