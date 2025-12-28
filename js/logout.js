document.getElementById("logout-link").addEventListener("click", async (e) => {
    // Prevent the link’s default action
    e.preventDefault();
  
    try {
      // Send logout request to the server
      const response = await fetch("../php/logout.php", {
        method: "POST",
      });
  
      // Check if response is OK
      if (!response.ok) {
        throw new Error("Logout request failed");
      }
  
      const result = await response.json();
  
      // Check the server response
      if (result.success) {
        alert(result.message || "You have been logged out.");
        window.location.href = "../php/index.php"; // Take user back to login page
      } else {
        alert("Logout was unsuccessful. Please try again.");
      }
    } catch (error) {
      console.error("Logout error occurred:", error);
      alert("There was a problem logging you out.");
    }
  });
  