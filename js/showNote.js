console.log("showNote.js loaded");


function loadNotes() {
  const notesContainer = document.getElementById("container-notes-list");

  const contactIdElement = document.getElementById("contact-id");
  const contactId = contactIdElement.value; // Hidden input should store the contact ID
  console.log("loading notes...");

  fetch(`../php/setup/showNote.php?contact_id=${contactId}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        notesContainer.innerHTML = "<h5>Notes</h5>";

        if (data.notes.length > 0) {
          data.notes.forEach((note) => {
            const noteDiv = document.createElement("div");
            noteDiv.className = "note";
            noteDiv.innerHTML = `
                                <p>${note.comment}</p>
                                <small>Created on: ${note.created_at}</small>
                            `;
            notesContainer.appendChild(noteDiv);
          });
        } else {
          notesContainer.innerHTML += "<p>No notes found for this contact.</p>";
        }
      } else {
        notesContainer.innerHTML = `<p>${data.error}</p>`;
      }
    })
    .catch((error) => {
      console.error("Notes fetch error:", error);
    });
}

function addNote() {
  const contactIdElement = document.getElementById("contact-id");
  const contactId = contactIdElement.value; // Hidden input should store the contact ID
  const noteComment = document
    .querySelector('textarea[name="note_comment"]')
    .value.trim();

  if (!noteComment) {
    alert("Please type a note first.");
    return;
  }

  // Build the form-encoded payload for the POST request
  const formData = new URLSearchParams();
  formData.append("contact_id", contactId);
  formData.append("comment", noteComment);

  fetch("../php/setup/update-notes.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        loadNotes();
        document.querySelector('textarea[name="note_comment"]').value = "";
      } else {
        alert(data.error || "Could not add note.");
      }
    })
    .catch((error) => {
      console.error("Add note error:", error);
      alert("Could not add note.");
    });
}

document.querySelector(".btn").addEventListener("click", addNote);

// Load any existing notes when the page opens
loadNotes();
