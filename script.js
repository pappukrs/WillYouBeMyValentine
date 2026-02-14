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

let noCount = 0;

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

// --- Navigation ---
function startJourney() {
  const intro = document.getElementById("scene-intro");
  const final = document.getElementById("scene-final");

  intro.style.display = 'none';
  final.style.display = 'block';
  final.classList.add('fade-in');
}

function onNo() {
  noCount++;
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
  questionText.innerText = blackmailMessages[Math.min(noCount - 1, blackmailMessages.length - 1)];
  questionImg.src = sadCatImages[Math.min(noCount - 1, sadCatImages.length - 1)];

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
