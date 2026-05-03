const titleInput = document.getElementById("title");
const dateInput = document.getElementById("date");
const categoryInput = document.getElementById("category");
const descInput = document.getElementById("description");

const addEventBtn = document.getElementById("addEventBtn");
const eventsContainer = document.getElementById("eventsContainer");
const clearAllBtn = document.getElementById("clearAll");
const sampleBtn = document.getElementById("sample");

addEventBtn.addEventListener("click", () => {
  if (!titleInput.value || !dateInput.value) return;

  createEvent(
    titleInput.value,
    dateInput.value,
    categoryInput.value,
    descInput.value
  );

  titleInput.value = "";
  dateInput.value = "";
  descInput.value = "";
});

function createEvent(title, date, category, desc) {
  const eventDiv = document.createElement("div");
  eventDiv.className = "event";

  eventDiv.innerHTML = `
    <div class="delete">✖</div>
    <h3>${title}</h3>
    <p>📅 ${date}</p>
    <span>${category}</span>
    <p>${desc}</p>
  `;

  eventsContainer.appendChild(eventDiv);
}

eventsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
  }
});

clearAllBtn.addEventListener("click", () => {
  eventsContainer.innerHTML = "";
});

sampleBtn.addEventListener("click", () => {
  createEvent("Event", "2026-01-14", "Sports", "There is an event");
});

const box = document.getElementById("textBox");

document.getElementById("innerHTML").innerText =
  "innerHTML: " + box.innerHTML;

document.getElementById("innerText").innerText =
  "innerText: " + box.innerText;

document.getElementById("textContent").innerText =
  "textContent: " + box.textContent;

document.addEventListener("keydown", (e) => {
  document.getElementById("keyPressed").innerText =
    "You pressed: " + e.key;
});