const messageSection = document.getElementById("messages");
messageSection.style.display = "none";

//Create/append footer element
const footer = document.createElement("footer");
document.body.appendChild(footer); // append footer to the end of the body
//Insert copyright text
const today = new Date(); // create date object
const thisYear = today.getFullYear(); // get current year

const copyright = document.createElement("p"); // create <p>
copyright.innerHTML = `&copy; Sai Moe Hein ${thisYear}`; // use unicode for ©
footer.appendChild(copyright); // add <p> to footer

// create Skills array
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

// Select skills section and <ul>
const skillsSection = document.getElementById("Skills");
const skillsList = skillsSection.querySelector("ul");

// Loop through skills array and add <li>
for (let i = 0; i < skills.length; i++) {
  const skill = document.createElement("li");
  skill.innerText = skills[i]; // set skill name
  skillsList.appendChild(skill); // add to <ul>
}

// Select form by name
const messageForm = document.querySelector('form[name="leave_message"]');

// Add submit event listener
messageForm.addEventListener("submit", function (event) {
  event.preventDefault(); // stop page refresh

  // Get form values
  const userName = event.target.usersName.value;
  const userEmail = event.target.usersEmail.value;
  const userMessage = event.target.usersMessage.value;

  console.log(userName, userEmail, userMessage);

  // Select messages section
  const messageSection = document.getElementById("messages");
  const messageList = messageSection.querySelector("ul");

  // Create new list item
  const newMessage = document.createElement("li");

  newMessage.innerHTML = `
    <a href="mailto:${userEmail}">${userName}</a>
    <span> wrote: ${userMessage}</span>
  `;

  // Create remove button
  const removeButton = document.createElement("button");
  removeButton.innerText = "remove";
  removeButton.type = "button";
  removeButton.className = "remove-button";

  // Create edit button
  const editButton = document.createElement("button");
  editButton.innerText = "edit";
  editButton.type = "button";
  editButton.className = "edit-button";

  removeButton.addEventListener("click", function () {
    const entry = removeButton.parentNode;
    entry.remove();

    if (messageList.children.length === 0) {
      messageSection.style.display = "none";
    }
  });

  editButton.addEventListener("click", function () {
    const entry = editButton.parentNode;
    const messageSpan = entry.querySelector("span");
    const currentMessage = messageSpan.textContent
      .replace(" wrote: ", "")
      .trim();
    const updatedMessage = window.prompt("Edit your message:", currentMessage);

    if (updatedMessage === null) {
      return;
    }

    const trimmedMessage = updatedMessage.trim();
    if (trimmedMessage.length === 0) {
      return;
    }

    messageSpan.textContent = ` wrote: ${trimmedMessage}`;
  });

  newMessage.appendChild(editButton);
  newMessage.appendChild(removeButton);
  messageSection.style.display = "block";

  messageList.appendChild(newMessage);

  // Reset form
  messageForm.reset();
});
