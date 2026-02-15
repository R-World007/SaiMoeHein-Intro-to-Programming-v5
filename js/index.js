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
