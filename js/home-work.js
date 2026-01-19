const inputElement = document.querySelector("#gmail_input");
const gmailBtn = document.querySelector("#gmail_button");
const gmailResult = document.querySelector("#gmail_result");

const child = document.querySelector(".child_block");
const parent = document.querySelector(".parent_block");
const parentWidth = parent.clientWidth - child.offsetWidth;
const parentHeight = parent.clientHeight - child.offsetHeight;

const regex = /^\w+@gmail\.com$/;

gmailBtn.addEventListener("click", () => {
  if (regex.test(inputElement.value)) {
    gmailResult.style.color = "green";
    gmailResult.innerHTML = "Valid Gmail address";
  } else {
    gmailResult.style.color = "red";
    gmailResult.innerHTML = "Invalid Gmail address";
  }
});

let left = 0;
let topPosition = 0;

let direction = "right";
const dvizhenieBtn = () => {
  if (direction === "right") {
    left++;
    if (left >= parentWidth) {
      left = parentWidth;
      direction = "down";
    }
    child.style.left = left + "px";
  } else if (direction === "down") {
    topPosition++;
    if (topPosition >= parentHeight) {
      topPosition = parentHeight;
      direction = "left";
    }
    child.style.top = topPosition + "px";
  } else if (direction === "left") {
    left--;
    if (left <= 0) {
      left = 0;
      direction = "up";
    }
    child.style.left = left + "px";
  } else if (direction === "up") {
    topPosition--;
    if (topPosition <= 0) {
      topPosition = 0;
      direction = "right";
    }
    child.style.top = topPosition + "px";
  }

  requestAnimationFrame(dvizhenieBtn);
};

requestAnimationFrame(dvizhenieBtn);

const timerElement = document.querySelector(".interval");
const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const resetBtn = document.querySelector("#reset");
let seconds = 0;
let interval = null;

const updateTimer = (sec) => {
  let hrs = (sec / 3600) | 0;
  let mins = ((sec % 3600) / 60) | 0;
  let secs = sec % 60;
  timerElement.innerHTML = `${hrs.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

startBtn.addEventListener("click", () => {
  if (interval) return;

  interval = setInterval(() => {
    seconds++;
    updateTimer(seconds);
  }, 1000);
});

stopBtn.addEventListener("click", () => {
  clearInterval(interval);
  interval = null;
});

resetBtn.addEventListener("click", () => {
  clearInterval(interval);
  interval = null;
  seconds = 0;
  updateTimer(seconds);
});

const somInput = document.querySelector("#som");
const usdInput = document.querySelector("#usd");
const euroInput = document.querySelector("#eur");

const converter = (element) => {
  element.oninput = () => {
    const requester = new XMLHttpRequest();
    requester.open("GET", "../data/converter.json");
    requester.setRequestHeader("Content-Type", "application/json");
    requester.send();

    requester.onload = () => {
      const { usd, eur } = JSON.parse(requester.response);
      const value = element.value;

      if (element.id === "som") {
        usdInput.value = (value / usd).toFixed(2);
        euroInput.value = (value / eur).toFixed(2);
      }

      if (element.id === "usd") {
        somInput.value = (value * usd).toFixed(2);
        euroInput.value = ((value * usd) / eur).toFixed(2);
      }

      if (element.id === "eur") {
        somInput.value = (value * eur).toFixed(2);
        usdInput.value = ((value * eur) / usd).toFixed(2);
      }

      if (value === "") {
        somInput.value = "";
        usdInput.value = "";
        euroInput.value = "";
      }
    };
  };
};

converter(somInput);
converter(usdInput);
converter(euroInput);
