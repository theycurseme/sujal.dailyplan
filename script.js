fetch("data.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("timetable");

    for (const day in data) {
      const dayDiv = document.createElement("div");
      dayDiv.className = "day";

      dayDiv.innerHTML = `<h2>${day}</h2>`;
      const grid = document.createElement("div");
      grid.className = "grid";

      data[day].forEach(item => {
        const card = document.createElement("div");
        card.className = "card";
        if (item.type === "lab") card.classList.add("lab");

        card.innerHTML = `
          <div class="subject">${item.subject}</div>
          <div class="time">${item.time}</div>
          <div class="room">${item.room}</div>
        `;

        grid.appendChild(card);
      });

      dayDiv.appendChild(grid);
      container.appendChild(dayDiv);
    }
  });
