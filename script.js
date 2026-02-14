const sadCatImages = [
  "https://media1.tenor.com/images/9413ffc5a11722a3cc456a88810750bd/tenor.gif?itemid=14193216",
  "https://emoji.gg/assets/emoji/5228_cat_cri.gif",
  "https://media1.tenor.com/images/a0554662ae7c3c60c0a7fdadac74ef18/tenor.gif?itemid=13931206",
  "https://media3.giphy.com/media/qpCvOBBmBkble/giphy.gif",
  "https://c.tenor.com/fpIAhF2jIY0AAAAC/cat-crying.gif"
];

const blackmailMessages = [
  "Wait, really? 🥺",
  "Think about it again... 💔",
  "I'll be so sad 😭",
  "Please? For me? 🌹",
  "I'm gonna cry... HUHUHU"
];

const quizQuestions = [
  {
    q: "How much do I love you?",
    options: ["To the moon and back 🌙", "Infinity and beyond 🚀", "More than words can say ✨", "All of the above ✅"],
    correct: 3
  }
];

let gameState = {
  currentLevel: 1,
  heartsCaught: 0,
  currentQuiz: 0,
  noCount: 0
};

// --- Initial Background ---
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerHTML = "❤️";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (Math.random() * 20 + 20) + "px";
  heart.style.animationDuration = (Math.random() * 3 + 3) + "s";
  document.getElementById("backgroundHearts").appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 6000);
}
setInterval(createHeart, 400);

// --- Level Transitions ---
function updateProgress() {
  const totalLevels = 4;
  const progress = ((gameState.currentLevel - 1) / totalLevels) * 100;
  document.getElementById("progressBar").style.width = progress + "%";
}

function showScene(sceneId) {
  const scenes = ['scene-intro', 'scene-catch', 'scene-quiz', 'scene-final'];
  scenes.forEach(id => {
    const el = document.getElementById(id);
    if (id === sceneId) {
      el.style.display = 'block';
      el.classList.add('fade-in');
    } else {
      el.style.display = 'none';
      el.classList.remove('fade-in');
    }
  });
  updateProgress();
}

// --- Level 1: Start ---
function startGame() {
  gameState.currentLevel = 2;
  document.getElementById("levelBadge").innerText = "LEVEL 2: DEVOTION";
  showScene('scene-catch');
  startHeartCatcher();
}

// --- Level 2: Heart Catcher ---
function startHeartCatcher() {
  const interval = setInterval(() => {
    if (gameState.currentLevel !== 2 || gameState.heartsCaught >= 5) {
      clearInterval(interval);
      return;
    }
    const heart = document.createElement("div");
    heart.classList.add("clickable-heart");
    heart.innerHTML = "❤️";
    heart.style.left = (20 + Math.random() * 60) + "%";
    heart.style.top = (20 + Math.random() * 60) + "%";
    heart.onclick = () => {
      gameState.heartsCaught++;
      document.getElementById("catch-counter").innerText = `Hearts Caught: ${gameState.heartsCaught}/5`;
      heart.remove();
      if (gameState.heartsCaught >= 5) {
        setTimeout(startQuiz, 500);
      }
    };
    document.getElementById("scene-catch").appendChild(heart);
    setTimeout(() => heart.remove(), 2000);
  }, 1000);
}

// --- Level 3: Quiz ---
function startQuiz() {
  gameState.currentLevel = 3;
  document.getElementById("levelBadge").innerText = "LEVEL 3: VIBE CHECK";
  showScene('scene-quiz');
  loadQuiz();
}

function loadQuiz() {
  const qData = quizQuestions[gameState.currentQuiz];
  document.getElementById("quiz-question").innerText = qData.q;
  const optionsContainer = document.getElementById("quiz-options");
  optionsContainer.innerHTML = '';

  qData.options.forEach((opt, index) => {
    const btn = document.createElement("div");
    btn.classList.add("quiz-option");
    btn.innerText = opt;
    btn.onclick = () => {
      if (index === qData.correct) {
        btn.classList.add('correct');
        setTimeout(() => {
          gameState.currentQuiz++;
          if (gameState.currentQuiz < quizQuestions.length) {
            loadQuiz();
          } else {
            startFinalBoss();
          }
        }, 500);
      } else {
        btn.classList.add('wrong');
        setTimeout(() => btn.classList.remove('wrong'), 500);
      }
    };
    optionsContainer.appendChild(btn);
  });
}

// --- Level 4: Final Boss ---
function startFinalBoss() {
  gameState.currentLevel = 4;
  document.getElementById("levelBadge").innerText = "LEVEL 4: THE BIG ONE";
  showScene('scene-final');
  // Update progress for final state manually
  document.getElementById("progressBar").style.width = "100%";
}

function onNo() {
  gameState.noCount++;
  const noBtn = document.getElementById("noBtn");
  const yesBtn = document.getElementById("yesBtn");
  const questionText = document.getElementById("wedate");
  const questionImg = document.getElementById("questionImg");
  const sadMusic = document.getElementById("sadMusic");

  sadMusic.play();

  // Make Yes button bigger
  const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
  yesBtn.style.fontSize = (currentSize * 1.2) + "px";
  yesBtn.style.padding = (parseFloat(window.getComputedStyle(yesBtn).padding) * 1.1) + "px";

  // Change text and image
  questionText.innerText = blackmailMessages[Math.min(gameState.noCount - 1, blackmailMessages.length - 1)];
  questionImg.src = sadCatImages[Math.min(gameState.noCount - 1, sadCatImages.length - 1)];

  // Teleport No button randomly
  const maxX = window.innerWidth - noBtn.offsetWidth;
  const maxY = window.innerHeight - noBtn.offsetHeight;
  noBtn.style.position = 'fixed';
  noBtn.style.left = (Math.random() * maxX) + 'px';
  noBtn.style.top = (Math.random() * maxY) + 'px';
}

function onYes() {
  const happyMusic = document.getElementById("happyMusic");
  const sadMusic = document.getElementById("sadMusic");

  sadMusic.pause();
  happyMusic.play();

  document.getElementById("successModal").style.display = 'flex';
}

function closeModal() {
  document.getElementById("successModal").style.display = 'none';
  location.reload();
}
