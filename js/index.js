// Hide Messages section until a message is added.
const messageSection = document.getElementById("messages");
messageSection.style.display = "none";

// Create and append footer at the end of the page.
const footer = document.createElement("footer");
document.body.appendChild(footer);

// Get current year and show copyright text.
const today = new Date();
const thisYear = today.getFullYear();
const copyright = document.createElement("p");
copyright.innerHTML = `&copy; Sai Moe Hein ${thisYear}`;
footer.appendChild(copyright);

// Store skills in an array.
const skills = [
  "JavaScript",
  "HTML",
  "CSS",
  "Java",
  "C",
  "C++",
  "C#",
  "Arduino",
  "Micro:bit",
  "GitHub",
];

// Select Skills section and list.
const skillsSection = document.getElementById("Skills");
const skillsList = skillsSection.querySelector("ul");

// Loop through skills array and render each as a list item.
for (let i = 0; i < skills.length; i++) {
  const skill = document.createElement("li");
  skill.innerText = skills[i];
  skillsList.appendChild(skill);
}

// Select the Leave a Message form.
const messageForm = document.querySelector('form[name="leave_message"]');

// Handle form submission.
messageForm.addEventListener("submit", function (event) {
  // Prevent page refresh.
  event.preventDefault();

  // Read values from form fields.
  const userName = event.target.usersName.value;
  const userEmail = event.target.usersEmail.value;
  const userMessage = event.target.usersMessage.value;
  console.log(userName, userEmail, userMessage);

  // Select Messages section and list.
  const messageSection = document.getElementById("messages");
  const messageList = messageSection.querySelector("ul");

  // Create one message list item.
  const newMessage = document.createElement("li");
  newMessage.innerHTML = `
    <a href="mailto:${userEmail}">${userName}</a>
    <span> wrote: ${userMessage}</span>
  `;

  // Create remove button.
  const removeButton = document.createElement("button");
  removeButton.innerText = "remove";
  removeButton.type = "button";
  removeButton.className = "remove-button";

  // Create edit button.
  const editButton = document.createElement("button");
  editButton.innerText = "edit";
  editButton.type = "button";
  editButton.className = "edit-button";

  // Remove message item when remove is clicked.
  removeButton.addEventListener("click", function () {
    const entry = removeButton.parentNode;
    entry.remove();

    // Hide section again if no messages remain.
    if (messageList.children.length === 0) {
      messageSection.style.display = "none";
    }
  });

  // Allow user to edit message text.
  editButton.addEventListener("click", function () {
    const entry = editButton.parentNode;
    const messageSpan = entry.querySelector("span");
    const currentMessage = messageSpan.textContent
      .replace(" wrote: ", "")
      .trim();
    const updatedMessage = window.prompt("Edit your message:", currentMessage);

    // Stop if user cancels.
    if (updatedMessage === null) {
      return;
    }

    // Stop if input is empty after trimming.
    const trimmedMessage = updatedMessage.trim();
    if (trimmedMessage.length === 0) {
      return;
    }

    // Update visible message text.
    messageSpan.textContent = ` wrote: ${trimmedMessage}`;
  });

  // Add buttons and message to list.
  newMessage.appendChild(editButton);
  newMessage.appendChild(removeButton);
  messageSection.style.display = "block";
  messageList.appendChild(newMessage);

  // Clear form inputs.
  messageForm.reset();
});

// Fetch GitHub repositories for this user.
fetch("https://api.github.com/users/R-World007/repos")
  .then(function (response) {
    // Throw error for unsuccessful API responses.
    if (!response.ok) {
      throw new Error(`GitHub API request failed with status ${response.status}`);
    }

    // Convert response body to JSON.
    return response.json();
  })
  .then(function (data) {
    // Save repositories array and inspect in console.
    const repositories = data;
    console.log(repositories);

    // Select Projects section and list.
    const projectSection = document.getElementById("Projects");
    const projectList = projectSection.querySelector("ul");

    // Create one list item for each repository name.
    for (let i = 0; i < repositories.length; i++) {
      const project = document.createElement("li");
      project.innerText = repositories[i]["name"];
      projectList.appendChild(project);
    }
  })
  .catch(function (error) {
    // Log technical error details.
    console.error("GitHub fetch failed:", error);

    // Show user-friendly message in Projects list.
    const projectSection = document.getElementById("Projects");
    const projectList = projectSection.querySelector("ul");
    const errorItem = document.createElement("li");
    errorItem.innerText = "Unable to load projects right now. Please try again later.";
    projectList.appendChild(errorItem);
  });
