// JavaScript (login.js)
window.onload = () => {
    // Get the form and input elements
    const loginForm = document.querySelector("form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
  
    // Handle the form submit event
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault(); // Stop the default form action
  
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
  
      // Basic client-side check
      if (email === "" || password === "") {
        alert("Please fill out both fields.");
        return;
      }
  
      try {
        // Build the data object
        const loginData = {
          email: email,
          password: password,
        };
  
        // Send a POST request to login.php
        const response = await fetch("../php/API/login.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        });
  
        // Confirm the request was successful
        if (!response.ok) {
          throw new Error("Network request failed");
        }
  
        // Convert the response to JSON
        const result = await response.json();
  
        // Process the response from the server
        if (result.success) {
          // Redirect after a successful login
          window.location.href = "../public/main-page.php";
        } else {
          alert(result.message); // Display error message
        }
      } catch (error) {
        console.error("Fetch error:", error);
        alert("Something went wrong, please try again.");
      }
    });
  };
  