// Create stars background
        function createStars() {
            const container = document.getElementById('stars-container');
            const starCount = 150;

            for (let i = 0; i < starCount; i++) {
                const star = document.createElement('div');
                star.classList.add('star');

                const size = Math.random() * 2 + 1;
                star.style.width = `${size}px`;
                star.style.height = `${size}px`;

                star.style.left = `${Math.random() * 100}%`;
                star.style.top = `${Math.random() * 100}%`;

                star.style.animationDelay = `${Math.random() * 5}s`;

                container.appendChild(star);
            }
        }

        document.addEventListener('DOMContentLoaded', function () {
            createStars();
        });

        // Dropdownuser in nav
    const userMenuButton = document.getElementById('userMenuButton');
    const userDropdown = document.getElementById('userDropdown');

    userMenuButton.addEventListener('click', function (e) {
      e.stopPropagation();
      userDropdown.classList.toggle('hidden');
    });

    // Hid  e dropdown if click outside
    document.addEventListener('click', function (e) {
      if (!userDropdown.classList.contains('hidden')) {
        userDropdown.classList.add('hidden');
      }
    });