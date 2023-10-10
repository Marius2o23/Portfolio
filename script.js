//Mobile Nav Button

const dropdownButton = document.getElementById('dropdown-button');
const mobileDropdown = document.querySelector('.mobile-dropdown');

dropdownButton.addEventListener('click', function() {
    mobileDropdown.classList.toggle('active');
});

const mobileMenuItems = mobileDropdown.querySelectorAll('li');
mobileMenuItems.forEach(function(item) {
    item.addEventListener('click', function() {
        mobileDropdown.classList.remove('active');
    });
});

//----------------------------------------------------------------

