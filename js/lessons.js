const input = document.getElementById("gmail_input");
const button = document.getElementById("gmail_button");
const result = document.getElementById("gmail_result");

const phoneRegex = /^(?:\+996|0)\d{9}$/;

button.addEventListener("click", () => {
  const phone = input.value.trim();

  if (phoneRegex.test(phone)) {
    result.textContent = "✅ Valid phone number";
    result.style.color = "green";
  } else {
    result.textContent = "❌ Invalid phone number";
    result.style.color = "red";
  }
});

const groupsContainer = document.querySelector("#team-groups");

const loadPlayers = async () => {
  try {
    const response = await fetch("../data/players.json");
    const data = await response.json();

    const players = Array.isArray(data) ? data : Object.values(data).flat();
    const positions = {
      Defender: [],
      Midfielder: [],
      Forward: [],
      Goalkeeper: [],
    };

    players.forEach((player) => {
      if (positions[player.position]) {
        positions[player.position].push(player);
      } else {
        positions[player.position] = [player];
      }
    });

    // Создаем блоки для каждой группы
    Object.keys(positions).forEach((pos) => {
      if (positions[pos].length === 0) return;

      const groupDiv = document.createElement("div");

      groupDiv.innerHTML = `
        <h3 class="position-title">${pos}</h3>
        <div class="players-group">
          ${positions[pos]
            .map(
              (player) => `
            <div class="player-card">
              <img src="${player.image}" alt="${player.firstName}">
              <div class="player-overlay">
                <h3>${player.firstName} <span>${player.lastName}</span></h3>
                <p class="position">${player.position}</p>
                <div class="stats">
                  <div>
                    <strong>${player.appearances}</strong>
                    <span>Apps</span>
                  </div>
                  <div>
                    <strong>${player.goals ?? player.cleanSheets}</strong>
                    <span>${player.goals ? "Goals" : "Clean"}</span>
                  </div>
                  <div>
                    <strong>${player.assists ?? player.saves}</strong>
                    <span>${player.assists ? "Assists" : "Saves"}</span>
                  </div>
                </div>
              </div>
            </div>
          `,
            )
            .join("")}
        </div>
      `;

      groupsContainer.appendChild(groupDiv);
    });

    document.querySelectorAll(".player-card").forEach((card, i) => {
      setTimeout(() => card.classList.add("visible"), i * 100);
    });
  } catch (err) {
    console.error("Ошибка загрузки игроков:", err);
  }
};

loadPlayers();

const playerImage = document.getElementById("playerImage");
const answersBox = document.getElementById("answers");
const gameResult = document.getElementById("gameResult");
const nextBtn = document.getElementById("nextBtn");

let players = [];
let currentPlayer = null;

const loadPlayersGame = async () => {
  try {
    const response = await fetch("../data/players.json");
    if (!response.ok) throw new Error("Failed to load players");

    const data = await response.json();

    players = Object.values(data).flat();

    loadRandomPlayer();
  } catch (error) {
    console.error(error);
    gameResult.textContent = "❌ Ошибка загрузки игроков";
    gameResult.style.color = "red";
  }
};

const loadRandomPlayer = () => {
  const randomIndex = Math.floor(Math.random() * players.length);
  currentPlayer = players[randomIndex];

  playerImage.src = currentPlayer.image;

  gameResult.textContent = "";
  nextBtn.style.display = "none";
  answersBox.innerHTML = "";

  let options = [...players]
    .sort(() => Math.random() - 0.5)
    .slice(0, 4)
    .map((p) => `${p.firstName} ${p.lastName}`);

  const correctName = `${currentPlayer.firstName} ${currentPlayer.lastName}`;
  if (!options.includes(correctName)) {
    options[Math.floor(Math.random() * options.length)] = correctName;
  }

  options = options.sort(() => Math.random() - 0.5);

  options.forEach((name) => {
    const btn = document.createElement("button");
    btn.textContent = name;
    btn.onclick = () => checkAnswer(name);
    answersBox.append(btn);
  });
};

const checkAnswer = (name) => {
  const correctName = `${currentPlayer.firstName} ${currentPlayer.lastName}`;

  if (name === correctName) {
    gameResult.textContent = "✅ Correct!";
    gameResult.style.color = "lime";
  } else {
    gameResult.textContent = `❌ Wrong! It was ${correctName}`;
    gameResult.style.color = "red";
  }

  nextBtn.style.display = "block";
};

nextBtn.onclick = loadRandomPlayer;

loadPlayersGame();
