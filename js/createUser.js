// Get the form and listen for submission
document
  .getElementById("new-user-form")
  .addEventListener("submit", async (event) => {
    // Stop the page from reloading
    event.preventDefault();

    // Collect all form input values
    const formData = new FormData(event.target);

    try {
      // Send the form data to the server
      const response = await fetch("../php/API/createUser.php", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Process a successful response
        const result = await response.text();
        console.log("User created:", result);
        alert("User added successfully!");

        // Load the users page after adding a user
        loadContent("users.php");
      } else {
        // Handle server-side errors
        console.error("User creation failed:", response.statusText);
        alert("Error: Failed to add user.");
      }
    } catch (error) {
      // Catch network or unexpected errors
      console.error("Request error:", error);
      alert("Error: Unable to submit form.");
    }
  });
