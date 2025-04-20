let timer = 1500; // 25 minutes in seconds
let interval;
let isRunning = false;

const timerDisplay = document.getElementById("timer");
const streakDisplay = document.getElementById("streak");
const motivationBox = document.getElementById("motivation");
const contentBox = document.getElementById("content");

function updateTimerDisplay() {
  let minutes = Math.floor(timer / 60);
  let seconds = timer % 60;
  timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  interval = setInterval(() => {
    timer--;
    updateTimerDisplay();
    if (timer <= 0) {
      clearInterval(interval);
      isRunning = false;
      showMotivation();
      increaseStreak();
      resetTimer(true);
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(interval);
  isRunning = false;
}

function resetTimer(silent = false) {
  clearInterval(interval);
  isRunning = false;
  timer = 5;
  updateTimerDisplay();
  if (!silent) {
    motivationBox.classList.add("hidden");
  }
}

function increaseStreak() {
  let streak = Number(localStorage.getItem("streak") || 0);
  streak++;
  localStorage.setItem("streak", streak);
  streakDisplay.textContent = streak;
}

function loadStreak() {
  streakDisplay.textContent = localStorage.getItem("streak") || 0;
}

function showMotivation() {
  motivationBox.classList.remove("hidden");
  const showMeme = Math.random() > 0.5;

  if (showMeme) {
    // Random meme
    const memes = ["memes/meme1.jpg", "memes/meme2.jpg", "memes/meme3.jpg"];
    const randomMeme = memes[Math.floor(Math.random() * memes.length)];
    contentBox.innerHTML = `<img src="${randomMeme}" alt="Meme"/>`;
  } else {
    // Random quote from JSON
    fetch("quotes.json")
      .then(res => res.json())
      .then(data => {
        const quote = data[Math.floor(Math.random() * data.length)];
        contentBox.innerHTML = `<p>"${quote.text}"<br>— ${quote.author}</p>`;
      });
  }
}

// Init
updateTimerDisplay();
loadStreak();
