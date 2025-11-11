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

document.addEventListener("DOMContentLoaded", function () {
  createStars();
});

// Login
document.addEventListener("DOMContentLoaded", function () {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  checklog(isLoggedIn);
});
// Handle login form submission
document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Get email and password values
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Simple check (for DEMO only! Do NOT use in production)
    if (email && password) {
      // Set flag in localStorage
      localStorage.setItem("isLoggedIn", "true");

      localStorage.setItem("userEmail", email);

      alert("Logged in!");
      const logbool = localStorage.getItem("isLoggedIn") === "true";
      checklog(logbool);
    } else {
      alert("Please enter both email and password.");
    }
  });

function checklog(LoggedIn) {
  const userinfo = document.querySelector(".userinfo");
  if (LoggedIn) {
    userinfo.classList.remove("hidden");
  }
}

const logoutBtn = document.getElementById("#logoutBtn");
logoutBtn.addEventListener('click', function() {
    localStorage.setItem("isLoggedIn", "false");
});