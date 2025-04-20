let totalFocusedTime = 0;
let sessionsToday = 0;
let interval;
let longestSession = 0;
let totalSessions = 0;
let paused = false;
let streak = 0;
let timeLeft = 0;
let originalDuration = 0;

const timerDisplay = document.getElementById("timer");
const memePopup = document.getElementById("memePopup");
const alertSound = document.getElementById("alertSound");
const progressCircle = document.querySelector(".progress-ring .progress");
const totalLength = 2 * Math.PI * 50;

progressCircle.style.strokeDasharray = totalLength;

const memes = [
  { text: "Keep going, you legend! 😎", img: "https://i.imgflip.com/2wifvo.jpg" },
  { text: "That was productive! Now smile. 😁", img: "https://i.imgflip.com/1otk96.jpg" },
  { text: "Even Batman takes breaks. Be like Batman.", img: "https://i.postimg.cc/xdrJ6FHq/image.png" },
  { text: "Productivity + Memes = 👑", img: "https://i.postimg.cc/3JS2FBnD/image.png" },
  { text: "You vs. You yesterday. You're winning. 💪", img: "https://i.imgflip.com/26am.jpg" },
  { text: "One session closer to your dreams! 🌠", img: "https://i.imgflip.com/1bij.jpg" },
  { text: "Not all heroes wear capes. Some use timers. ⏳", img: "https://i.imgflip.com/3si4.jpg" },
  { text: "Stay strong. The grind is real. 🔥", img: "https://i.imgflip.com/1bhf.jpg" },
  { text: "You just leveled up in life. 🎮", img: "https://i.imgflip.com/1ur9b0.jpg" },
  { text: "Break time? You've earned it. ☕", img: "https://i.postimg.cc/HL55HCHQ/image.png" },
  { text: "Focus mode: ACTIVATED. 🧠", img: "https://i.postimg.cc/pTfDQM62/image.png" },
  { text: "That’s how legends work. 👏", img: "https://i.imgflip.com/265k.jpg" },
  { text: "You're doing amazing, sweetie. 😂", img: "https://i.imgflip.com/3oevdk.jpg" },
  { text: "Motivated? Yes. Distracted? No. 🛡️", img: "https://i.postimg.cc/8kbRjDv4/image.png" },
  { text: "Crushed another session like a boss. 💼", img: "https://i.imgflip.com/3vzej.jpg" },
  { text: "Future you is proud right now. 🙌", img: "https://i.imgflip.com/2fm6x.jpg" },
  { text: "Tiny steps = Big progress. 🐢➡️🐇", img: "https://i.imgflip.com/4t0m5.jpg" },
  { text: "Distractions tried. You said no. 🔒", img: "https://i.postimg.cc/XNx5nLMD/image.png" },
  { text: "Procrastination? Never heard of her. 🤷", img: "https://i.postimg.cc/NMjgD1N5/blonde-girl-idk.jpg" },
  { text: "You’re a productivity machine. 🦾", img: "https://i.postimg.cc/9MY7RtD0/image.png" }
];

// Handle the session report dropdown
function toggleReport() {
  const report = document.getElementById('progressReport');
  report.classList.toggle('open');
}

function startTimer(mins, secs) {
  clearInterval(interval); // Clear any existing intervals
  originalDuration = mins * 60 + secs;
  timeLeft = originalDuration;
  paused = false;
  updateDisplay(timeLeft);
  updateProgress(timeLeft, originalDuration);

  interval = setInterval(() => {
    if (!paused && timeLeft > 0) {
      timeLeft--;
      updateDisplay(timeLeft);
      updateProgress(timeLeft, originalDuration);
    }

    // When the time reaches zero
    if (timeLeft <= 0) {
      clearInterval(interval);  // Stop the timer
      streak++;  // Increment the streak
      document.getElementById("streakDisplay").textContent = `🔥 Streak: ${streak}`;
      totalFocusedTime += originalDuration;  // Add to the total focused time
      totalSessions++;  // Increment the total session count
      sessionsToday++;  // Increment the session count for today
      if (originalDuration > longestSession) {
        longestSession = originalDuration;
      }
      updateAchievements();
      logSessionReport(originalDuration);  // Log the session report
      showMeme();  // Display a meme
      playSound();  // Play sound
      playLottie();  // Play Lottie animation
    }
  }, 1000);
}

function startCustom() {
  let hrs = parseInt(document.getElementById("customHour").value) || 0;
  let mins = parseInt(document.getElementById("customMin").value) || 0;
  let secs = parseInt(document.getElementById("customSec").value) || 0;
  let totalMins = hrs * 60 + mins;
  startTimer(totalMins, secs);
}


function updateDisplay(seconds) {
  let h = Math.floor(seconds / 3600);
  let m = Math.floor((seconds % 3600) / 60);
  let s = seconds % 60;
  let display = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  timerDisplay.textContent = display;
}


function updateProgress(timeLeft, totalTime) {
  const progress = totalLength * (1 - (timeLeft / totalTime));
  progressCircle.style.strokeDashoffset = progress;
  if (timeLeft <= 0) {
    progressCircle.style.strokeDashoffset = totalLength;
  }
}

function showMeme() {
  const random = memes[Math.floor(Math.random() * memes.length)];
  memePopup.innerHTML = `<p>${random.text}</p><img class="meme-img" src="${random.img}" alt="Meme">`;
}

function playSound() {
  alertSound.currentTime = 0;
  alertSound.play();
}

function playLottie() {
  const container = document.getElementById("lottieContainer");
  container.innerHTML = "";
  lottie.loadAnimation({
    container: container,
    renderer: 'svg',
    loop: false,
    autoplay: true,
    path: 'https://assets10.lottiefiles.com/packages/lf20_rsa6mkzx.json'
  });
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

// Assign random font and movement to floating words
const fonts = [
  "Georgia", "Verdana", "Courier New", "Lucida Console", "Comic Sans MS",
  "Trebuchet MS", "Impact", "Palatino Linotype", "Tahoma", "Arial Black"
];

document.querySelectorAll('.floating-word').forEach(word => {
  const top = Math.random() * 90 + 5;
  const delay = Math.random() * 5;
  const duration = 5 + Math.random() * 3;
  const font = fonts[Math.floor(Math.random() * fonts.length)];

  word.style.top = `${top}%`;
  word.style.animationDelay = `${delay}s`;
  word.style.animationDuration = `${duration}s`;
  word.style.fontFamily = font;
});

function pauseTimer() {
  paused = true;
}

function resumeTimer() {
  if (paused && timeLeft > 0) {
    paused = false;
  }
}

function restartTimer() {
  if (originalDuration > 0) {
    startTimer(Math.floor(originalDuration / 60), originalDuration % 60);
  }
}

function logSessionReport(duration) {
  const reportList = document.getElementById("reportList");
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  const now = new Date();
  const timestamp = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const item = document.createElement("li");
  item.innerHTML = `
    <strong>✅ Completed:</strong> ${minutes}m ${seconds}s |
    <strong>Streak:</strong> ${streak} |
    <strong>Sessions Today:</strong> ${sessionsToday} |
    <strong>Total Time:</strong> ${Math.floor(totalFocusedTime / 60)}m ${totalFocusedTime % 60}s |
    <strong>Finished At:</strong> ${timestamp}
  `;
  reportList.prepend(item);
}

// --- Achievements System ---
let achievements = [
  {
    key: "firstSession",
    title: "Getting Started",
    description: "Complete your first focus session.",
    check: () => totalSessions >= 1,
    progress: () => Math.min(totalSessions, 1),
    target: 1
  },
  {
    key: "fiveSessions",
    title: "First Five",
    description: "Complete 5 focus sessions.",
    check: () => totalSessions >= 5,
    progress: () => Math.min(totalSessions, 5),
    target: 5
  },
  {
    key: "tenSessions",
    title: "Consistency is Key",
    description: "Complete 10 focus sessions in total.",
    check: () => totalSessions >= 10,
    progress: () => Math.min(totalSessions, 10),
    target: 10
  },
  {
    key: "shortSession",
    title: "Short & Sweet",
    description: "Complete a 5-minute session.",
    check: () => longestSession >= 300,
    progress: () => Math.min(longestSession, 300),
    target: 300
  },
  {
    key: "deepDive",
    title: "Deep Dive",
    description: "Complete a 15-minute session.",
    check: () => longestSession >= 900,
    progress: () => Math.min(longestSession, 900),
    target: 900
  },
  {
    key: "endurance",
    title: "Endurance Challenge",
    description: "Complete a 30-minute session.",
    check: () => longestSession >= 1800,
    progress: () => Math.min(longestSession, 1800),
    target: 1800
  },
  {
    key: "hourlyHero",
    title: "Hourly Hero",
    description: "Reach 1 hour of total focus time.",
    check: () => totalFocusedTime >= 3600,
    progress: () => Math.min(totalFocusedTime, 3600),
    target: 3600
  },
  {
    key: "threeHourStreak",
    title: "Three-Hour Streak",
    description: "Reach 3 hours of total focus time.",
    check: () => totalFocusedTime >= 10800,
    progress: () => Math.min(totalFocusedTime, 10800),
    target: 10800
  },
  {
    key: "marathon",
    title: "Marathon Focus",
    description: "Complete a 60-minute session.",
    check: () => longestSession >= 3600,
    progress: () => Math.min(longestSession, 3600),
    target: 3600
  },
  {
    key: "focusMaster",
    title: "Focus Master",
    description: "Reach 10 hours of total focus time.",
    check: () => totalFocusedTime >= 36000,
    progress: () => Math.min(totalFocusedTime, 36000),
    target: 36000
  }
];

function updateAchievements() {
  const container = document.getElementById("achievements-list");
  container.innerHTML = "";

  achievements.forEach(ach => {
    const current = ach.progress();
    const progress = Math.min((current / ach.target) * 100, 100);
    const unlocked = ach.check();

    const wrapper = document.createElement("div");
    wrapper.className = "achievement";

    const label = document.createElement("div");
    label.className = "achievement-label";
    label.innerHTML = `
      <span class="${unlocked ? 'unlocked' : ''}">${ach.title}</span>
      <span>${ach.key === "shortSession" || ach.key === "deepDive" || ach.key === "endurance" || ach.key === "marathon"
        ? `${Math.floor(current/60)}m/${Math.floor(ach.target/60)}m`
        : `${current}/${ach.target}`}</span>
    `;

    const bar = document.createElement("div");
    bar.className = "progress-bar";
    bar.innerHTML = `<div class="progress-fill" style="width: ${progress}%;"></div>`;

    const description = document.createElement("div");
    description.className = "achievement-description";
    description.textContent = ach.description;

    wrapper.appendChild(label);
    wrapper.appendChild(bar);
    wrapper.appendChild(description);
    container.appendChild(wrapper);
  });
}
updateAchievements();