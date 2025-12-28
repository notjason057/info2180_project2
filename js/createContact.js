console.log("hit create contact js fetch");
console.log(document.getElementById("new-contact-form"));

document
  .getElementById("new-contact-form")
  .addEventListener("submit", async (event) => {
    // Stop the form from submitting normally
    event.preventDefault();

    // Gather all form values into a FormData object
    const formData = new FormData(event.target);
    console.log("submit event for create contact");

    // Output each field being sent (for debugging)
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      // Send the form data to the server
      const response = await fetch("../php/API/CreateContact.php", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Handle a successful server response
        const result = await response.text();
        console.log("Contact added successfully:", result);
        alert("Contact added successfully!");

        // Load the dashboard after adding the contact
        loadContent("dashboard.php");
      } else {
        // Handle server-side errors
        console.error("Failed to add contact:", response.statusText);
        alert("Error: Failed to add contact.");
      }
    } catch (error) {
      // Catch network or unexpected errors
      console.error("Error:", error);
      alert("Error: Unable to submit form.");
    }
  });
