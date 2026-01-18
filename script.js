fetch("data.json")
  .then(res => res.json())
  .then(data => renderTimetable(data));

function renderTimetable(data) {
  const app = document.getElementById("app");
  app.innerHTML = "";

  for (const day in data) {
    const dayBlock = document.createElement("div");
    dayBlock.className = "day";

    const heading = document.createElement("h2");
    heading.innerText = day;
    dayBlock.appendChild(heading);

    data[day].forEach(item => {
      const slot = document.createElement("div");
      slot.className = "slot";

      slot.innerHTML = `
        <strong>${item.time}</strong><br>
        ${item.subject}<br>
        <small>${item.room}</small>
      `;

      dayBlock.appendChild(slot);
    });

    app.appendChild(dayBlock);
  }
}
