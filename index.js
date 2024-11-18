document
  .getElementById("login-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent the default form submission

    // Collect input values
    const username = document.getElementById("LoginForm_username").value;
    const password = document.getElementById("LoginForm_password").value;

    // Check if fields are not empty
    if (!username || !password) {
      alert("Please fill in both username and password.");
      return;
    }

    // Prepare the data to send
    const loginData = { username, password };

    console.log(loginData);

    try {
      // Send POST request to the server
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();

      // Handle the response
      if (result.success) {
        localStorage.setItem("_id", result.data._id);
        window.location.href = "main.html";
      } else {
        // Show an error message if login fails
        alert(result.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again later.");
    }
  });
