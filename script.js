document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const message = document.getElementById("message");
  const loginFormContainer = document.getElementById("loginForm");
  const loginFormElement = document.getElementById("loginFormElement");
  const loginMessage = document.getElementById("loginMessage");
  const signupContainer = document.querySelector(".signup-container");
  const viewDatabaseButton = document.getElementById("viewDatabase");
  const deleteDatabaseButton = document.getElementById("deleteDatabase");
  const databaseSection = document.getElementById("databaseSection");
  const databaseBody = document.getElementById("databaseBody");
  const toggleLogin = document.getElementById("toggleLogin");

  let userData = JSON.parse(localStorage.getItem("userData")) || [];

  signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const existingUser = userData.find((user) => user.email === email);
    if (existingUser) {
      message.textContent = "Email already exists!";
      message.className = "message error";
      return;
    }

    userData.push({ username, email, password });
    localStorage.setItem("userData", JSON.stringify(userData));

    message.textContent = "Signed up successfully!";
    message.className = "message success";

    setTimeout(() => {
      signupContainer.classList.add("hidden");
      loginFormContainer.classList.remove("hidden");
      setTimeout(() => {
        loginFormContainer.classList.add("visible");
      }, 50);
    }, 2000);
  });

  loginFormElement.addEventListener("submit", function (event) {
    event.preventDefault();

    const loginEmail = document.getElementById("loginEmail").value;
    const loginPassword = document.getElementById("loginPassword").value;

    userData = JSON.parse(localStorage.getItem("userData")) || [];

    const user = userData.find(
      (u) => u.email === loginEmail && u.password === loginPassword
    );

    if (user) {
      loginMessage.textContent = `Hello, ${user.username}! you have successfully Logged in`;
      loginMessage.className = "message success";
    } else {
      loginMessage.textContent = "Invalid email or password";

      loginMessage.className = "message error";
    }
  });

  const toggleSignupPassword = document.getElementById("toggleSignupPassword");
  toggleSignupPassword.addEventListener("click", function () {
    const passwordInput = document.getElementById("password");
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    toggleSignupPassword.textContent =
      type === "password" ? "Click to Show Password" : "Click to Hide Password";
  });

  const toggleAdminPassword = document.getElementById("toggleLoginPassword");
  toggleAdminPassword.addEventListener("click", function () {
    const passwordInput = document.getElementById("loginPassword");
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    toggleAdminPassword.textContent =
      type === "password" ? "Click to Show Password" : "Click to Hide Password";
  });

  const toggleLoginPassword = document.getElementById("toggleAdminPassword");
  toggleLoginPassword.addEventListener("click", function () {
    const loginPasswordInput = document.getElementById("adminPasswordInput");
    const type =
      loginPasswordInput.getAttribute("type") === "password"
        ? "text"
        : "password";
    loginPasswordInput.setAttribute("type", type);
    toggleLoginPassword.textContent =
      type === "password" ? "Click to Show Password" : "Click to Hide Password";
  });

  viewDatabaseButton.addEventListener("click", function () {
    databaseBody.innerHTML = "";

    userData.forEach((user) => {
      const row = document.createElement("tr");

      const usernameCell = document.createElement("td");
      usernameCell.textContent = user.username;
      row.appendChild(usernameCell);

      const emailCell = document.createElement("td");
      emailCell.textContent = user.email;
      row.appendChild(emailCell);

      const passwordCell = document.createElement("td");
      passwordCell.textContent = user.password;
      row.appendChild(passwordCell);

      databaseBody.appendChild(row);
    });

    databaseSection.style.display = "block";
  });

  deleteDatabaseButton.addEventListener("click", function () {
    if (
      confirm(
        "Are you sure you want to delete all data? This action cannot be undone."
      )
    ) {
      localStorage.removeItem("userData");
      userData = [];
      databaseBody.innerHTML = "";
      message.textContent = "All data has been deleted.";
      message.className = "message success";
    }
  });

  toggleLogin.addEventListener("click", function () {
    signupContainer.classList.add("hidden");
    loginFormContainer.classList.remove("hidden");
    setTimeout(() => {
      loginFormContainer.classList.add("visible");
    }, 50);
  });

  togglesignin.addEventListener("click", function () {
    signupContainer.classList.remove("hidden");
    loginFormContainer.classList.add("hidden");
    setTimeout(() => {
      loginFormContainer.classList.remove("visible");
    }, 50);
  });
  const closeDatabaseButton = document.getElementById("closeDatabase");

  closeDatabaseButton.addEventListener("click", function () {
    databaseSection.style.display = "none";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const ADMIN_PASSWORD = "admin123";
  const toggleAdminControls = document.getElementById("toggleAdminControls");
  const adminPasswordSection = document.getElementById("adminPasswordSection");
  const adminPasswordInput = document.getElementById("adminPasswordInput");
  const submitAdminPassword = document.getElementById("submitAdminPassword");
  const adminButtons = document.getElementById("adminButtons");

  // Function to show popup message
  function showPopupMessage(message, type) {
    const popupMessage = document.getElementById("popupMessage");
    const popupText = document.getElementById("popupText");

    // Set the message and type (success or error)
    popupText.textContent = message;
    popupMessage.className = `popup-message ${type}`;

    // Add the 'visible' class to trigger the slide-in animation
    setTimeout(() => {
      popupMessage.classList.add("visible");
    }, 10); // Small delay to ensure the class is added after the initial render

    // Remove the `visible` class and add `hidden` after 3 seconds
    setTimeout(() => {
      popupMessage.classList.remove("visible");
      popupMessage.classList.add("hidden");
    }, 3000); // Hide after 3 seconds
  }

  // Show/hide the admin password input and admin buttons when "Admin Controls" is clicked
  toggleAdminControls.addEventListener("click", () => {
    if (adminButtons.classList.contains("hidden")) {
      adminPasswordSection.classList.toggle("hidden");
    } else {
      adminButtons.classList.add("hidden");
      adminPasswordInput.value = ""; // Clear the password input
    }
  });

  // Validate the admin password
  submitAdminPassword.addEventListener("click", () => {
    const enteredPassword = adminPasswordInput.value;
    if (enteredPassword === ADMIN_PASSWORD) {
      adminButtons.classList.remove("hidden");
      adminPasswordSection.classList.add("hidden");
      showPopupMessage("✔ Admin access granted!", "success");
    } else {
      showPopupMessage("⚠ Incorrect password. Access denied.", "error");
      adminPasswordInput.value = ""; // Clear the password input on incorrect attempt
    }
  });
});