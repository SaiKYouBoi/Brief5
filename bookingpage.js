
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