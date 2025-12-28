console.log("dashboard.js loaded");

function toggleRowVisibility(row, condition) {
  // Show or hide a table row based on the condition
  row.style.display = condition ? "" : "none";
}

function filterTable(filter) {
  // Get the logged-in user ID from the body attribute
  const userId = document.body.getAttribute("data-user-id");

  // Exit if no user ID is available
  if (userId === "null") {
    console.error("No user ID found in session data.");
    return;
  }

  // Convert user ID to a number for comparison
  const parsedUserId = parseInt(userId, 10);

  const rows = document.querySelectorAll("#contacts-table-body tr");

  rows.forEach((row) => {
    // Read contact type and assigned user from row attributes
    const type = (row.getAttribute("data-type") || "")
      .trim()
      .toLowerCase();
    const assignedTo = parseInt(
      (row.getAttribute("data-assigned") || "").trim()
    );

    // Apply filtering rules
    if (filter === "all") {
      toggleRowVisibility(row, true); // Display every row
    } else if (filter === "assigned") {
      toggleRowVisibility(row, assignedTo === parsedUserId); // Show rows assigned to current user
    } else if (filter === "sales lead" || filter === "support") {
      toggleRowVisibility(row, type === filter); // Match by contact type
    } else {
      toggleRowVisibility(row, false); // Hide rows that don’t match
    }
  });
}

function setupFilterListeners() {
  const filterOptions = document.querySelectorAll(".filter-option");

  filterOptions.forEach((option) => {
    let isListenerAdded = false;

    option.addEventListener("click", () => {
      // Update selected filter styling
      filterOptions.forEach((opt) => opt.classList.remove("selected"));
      option.classList.add("selected");

      // Get selected filter value and apply it
      const filter = option
        .getAttribute("data-filter")
        .trim()
        .toLowerCase();
      filterTable(filter);

      isListenerAdded = true;
    });
  });
}

function initializeFilters() {
  // Set up filter click handlers
  setupFilterListeners();

  // Automatically apply the default filter
  const defaultFilter = document.querySelector(
    '.filter-option[data-filter="all"]'
  );

  if (defaultFilter) {
    defaultFilter.click();
  } else {
    console.warn("Unable to locate the default 'all' filter.");
  }
}

// Initialize filters on page load
initializeFilters();
