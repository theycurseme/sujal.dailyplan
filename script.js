fetch("data.json")
  .then(res => res.json())
  .then(data => buildGrid(data));

function buildGrid(data) {
  const days = Object.keys(data);

  // Collect all unique time slots
  const timeSet = new Set();
  days.forEach(day => {
    data[day].forEach(item => timeSet.add(item.time));
  });
  const times = Array.from(timeSet).sort();

  const table = document.createElement("div");
  table.className = "grid";

  // Empty corner
  table.appendChild(cell(""));

  // Day headers
  days.forEach(day => table.appendChild(cell(day, "header")));

  // Rows
  times.forEach(time => {
    table.appendChild(cell(time, "time"));

    days.forEach(day => {
      const entry = data[day].find(e => e.time === time);
      if (entry) {
        table.appendChild(
          cell(
            `<strong>${entry.subject}</strong><br><small>${entry.room}</small>`,
            entry.type === "lab" ? "lab" : "subject"
          )
        );
      } else {
        table.appendChild(cell(""));
      }
    });
  });

  document.body.appendChild(table);
}

function cell(content, className = "") {
  const div = document.createElement("div");
  div.className = `cell ${className}`;
  div.innerHTML = content;
  return div;
}
