// START: dakchi likan dayer PROF
// Create stars background
function createStars() {
  const container = document.getElementById("stars-container");
  const starCount = 150;

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("div");
    star.classList.add("star");

    const size = Math.random() * 2 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;

    star.style.animationDelay = `${Math.random() * 5}s`;

    container.appendChild(star);
  }
}

// document.addEventListener("DOMContentLoaded", function () {});

// // Mobile menu toggle
// document
//   .getElementById("mobile-menu-button")
//   .addEventListener("click", function () {
//     const menu = document.getElementById("mobile-menu");
//     menu.classList.toggle("open");
//   });

// Initialize on page load
// END: dakchi likan dayer PROF

//login form submission
document.addEventListener("DOMContentLoaded", function () {
  const Users = [
    {
      id: "1",
      email: "iliaselggames@gmail.com",
      password: "ilias2002",
      name: "SaikYouBoi",
      joinDate: "2024-01-15",
      membership: "Explorer",
    },
  ];

  document
    .getElementById("loginForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      
      const loginform = document.getElementById("loginForm");
      
      if (loginform) {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const user = Users.find(
          (u) => u.email === email && u.password === password
        );

        if (user) {
          // ila true what gonna happen
          const userr = {
            id: user.id,
            email: user.email,
            name: user.name,
            isLoggedIn: true,
          };
          localStorage.setItem("currentUser", JSON.stringify(userr));
          // alert("Sucess")
          window.location.href = "index.html";
        } else {
          // ila false what gonna happen
          alert("The credentials are incorrect, please try again.");
        }
      }
    });
});

function logout() {
  localStorage.removeItem("currentUser");
  location.reload();
}

function addingtonav() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const linkinnav = document.getElementById("logginanchor");
  // const linkinnav = document.querySelector('a[href="login.html"]');

  if (user && user.isLoggedIn) {
    // Replace anchor with profile
    if (linkinnav) {
      linkinnav.outerHTML = ` <!-- Profile dropdown-->
                <div class="useinfo relative inline-block text-left">
                    <button id="userMenuButton" type="button"
                        class="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 transition shadow">
                        <i class="fas fa-user text-white text-1xl"></i>
                    </button>

                    <!-- Dropdown menu-->
                    <div id="userDropdown"
                        class="origin-top-right absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50 hidden">
                        <div class="py-1">
                            <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">${user.name}</a>
                            <button id="logoutBtn" class="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">Log
                                Out</button>
                        </div>
                    </div>
                </div>
            </div>`;
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  createStars();
  //setupMobileMenu();
  //setupLoginForm();
  addingtonav();

  const userMenuButton = document.getElementById("userMenuButton");
  const userDropdown = document.getElementById("userDropdown");

  // console.log(userDropdown);
  // console.log(userMenuButton);

  userMenuButton.addEventListener("click", function (e) {
    e.stopPropagation();
    userDropdown.classList.toggle("hidden");
  });

  // Hide dropdown if click outside
  document.addEventListener("click", function (e) {
    if (!userDropdown.classList.contains("hidden")) {
      userDropdown.classList.add("hidden");
    }
  });

  //logout
  document.getElementById("logoutBtn").addEventListener("click", function () {
    localStorage.removeItem("currentUser");
    location.reload();
  });
});
