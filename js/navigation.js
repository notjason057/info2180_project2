let URLHistory;

function loadContent(url) {
  console.log("navigation triggered");
  console.log("loading content from:", url);

  // Store the most recently visited URL
  URLHistory = url;

  const mainContent = document.getElementById("main-content-container");

  // Request page content from the server
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      return response.text();
    })
    .then((data) => {
      // Use a temporary element to process the returned HTML
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = data;

      // Find and run any scripts included in the loaded content
      const scripts = tempDiv.querySelectorAll("script");
      scripts.forEach((script) => {
        const newScript = document.createElement("script");
        if (script.src) {
          newScript.src = script.src; // Handle external scripts
        } else {
          newScript.textContent = script.textContent; // Handle inline scripts
        }
        document.body.appendChild(newScript);
      });

      // Update the main content area with the new page
      mainContent.innerHTML = tempDiv.innerHTML;
    })
    .catch((error) => {
      console.error("Content load failed:", error);
      mainContent.innerHTML =
        "<p>Unable to load the requested content. Please try again.</p>";
    });
}

// Reload the most recently viewed page
function reloadPage() {
  console.log("reload requested");
  loadContent(URLHistory);
}
