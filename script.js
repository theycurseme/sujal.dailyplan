const TIME_SLOTS = [
  "8:30-9:30",
  "9:30-10:30",
  "10:30-11:30",
  "11:30-12:30",
  "12:30-1:30",
  "1:30-2:30",
  "2:30-3:30",
  "3:30-4:30",
  "4:30-5:30",
  "5:30-6:30"
];

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

fetch("data.json")
  .then(res => res.json())
  .then(data => renderTimetable(data));

function renderTimetable(data) {
  const grid = document.createElement("div");
  grid.className = "timetable";

  // Top-left empty
  grid.appendChild(cell(""));

  // Day headers
  DAYS.forEach(day => grid.appendChild(cell(day, "day")));

  TIME_SLOTS.forEach(time => {
    // Time column
    grid.appendChild(cell(time, "time"));

    DAYS.forEach(day => {
      const entry = data[day]?.find(e => e.time === time);
      if (entry) {
        grid.appendChild(
          cell(
            `<strong>${entry.subject}</strong><br><small>${entry.room}</small>`,
            entry.type === "lab" ? "lab" : "subject"
          )
        );
      } else {
        grid.appendChild(cell(""));
      }
    });
  });

  document.body.appendChild(grid);
}

function cell(content, className = "") {
  const div = document.createElement("div");
  div.className = `cell ${className}`;
  div.innerHTML = content;
  return div;
}
