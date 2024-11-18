document
  .getElementById("registration")
  .addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent the default form submission

    // Collect input values
    const username = document
      .getElementById("RegistrationForm_username")
      .value.trim();
    const password = document
      .getElementById("RegistrationForm_password")
      .value.trim();
    const confirmPassword = document
      .getElementById("RegistrationForm_confirm_password")
      .value.trim();
    const email = document
      .getElementById("RegistrationForm_captcha")
      .value.trim();

    // Validate input fields
    if (!username || !password || !confirmPassword || !email) {
      alert("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Prepare the data to send
    const formData = {
      username,
      password,
      email,
    };

    try {
      // Send a POST request to the server using async/await
      const response = await fetch("https://unicc-backend-sooty.vercel.app/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      // Handle the server response
      if (result.success) {
        alert("Registration successful!");
        window.location.href = "index.html"; // Redirect to the main page on success
      } else {
        alert(result.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred. Please try again later.");
    }
  });
