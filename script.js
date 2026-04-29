const card = document.getElementById("bookCard");
const cardWrap = document.getElementById("cardWrap");
const typewriter = document.getElementById("typewriter");
const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");
const gift = document.getElementById("gift");
const giftRibbon = document.getElementById("giftRibbon");
const modal = document.getElementById("giftModal");
const closeModal = document.getElementById("closeModal");
const giftNote = document.getElementById("giftNote");
const giftProgressFill = document.getElementById("giftProgressFill");
const giftMessage = document.getElementById("giftMessage");

const loveLetter =
  "Happy birthday to my one and only.You make life sweeter just by being in it.I admire your strength, your kindness, your beautiful heart.I’m so lucky to love and be loved by you. कुछ खास है तुम में जो अल्फाज़ों में नहीं आता,दिल कहता है बहुत कुछ, मगर ज़ुबां कह नहीं पाता। ❤️";

let typed = false;

function openCard() {
  card.classList.add("open");
  if (!typed) {
    typed = true;
    typeText(loveLetter, 0);
  }
}

function toggleCard() {
  if (card.classList.contains("open")) {
    card.classList.remove("open");
  } else {
    openCard();
  }
}

function typeText(text, i) {
  if (i <= text.length) {
    typewriter.textContent = text.slice(0, i);
    setTimeout(() => typeText(text, i + 1), 45);
  }
}

card.addEventListener("click", toggleCard);

cardWrap.addEventListener("click", () => {
  music.play();
});

let startX = 0;
cardWrap.addEventListener("touchstart", (e) => {
  startX = e.changedTouches[0].screenX;
}, { passive: true });

cardWrap.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].screenX;
  if (Math.abs(endX - startX) > 35) toggleCard();
}, { passive: true });

musicBtn.addEventListener("click", async () => {
  try {
    if (music.paused) {
      await music.play();
      musicBtn.textContent = "⏸ Pause Music";
    } else {
      music.pause();
      musicBtn.textContent = "🎵 Play Music";
    }
  } catch {
    musicBtn.textContent = "Tap Again 🎵";
  }
});

const slides = [
  {
    src: "HBD.jpeg",
    caption: "To my wonderful wife, happy birthday."
  },
  {
    src: "HBD1.jpeg",
    caption: "Your smile is my favorite view."
  },
  {
    src: "HBD222.jpg",
    caption: "Here’s to celebrating you today and always."
  },
  {
    src: "HBD3.jpeg",
    caption: "You are my forever celebration."
  },{
    src: "IMG_7573.jpeg",
    caption: "You are the melody that plays in my heart."
  },
  {
    src: "IMG_5550.JPG",
    caption: "You are my favorite place to be."
  },
  {
    src: "IMG_8081.jpeg",
    caption: "Being with you feels deeply right."
  },
   {
    src: "IMG_8406.jpeg",
    caption: "You are the warmth I carry everywhere."
  },
   {
    src: "IMG_8045.jpeg",
    caption: "Every moment with you feels magical."
  },
  {
    src: "IMG_4543.jpeg",
    caption: "You are the love that changed everything for me."
  }
];

const slideImage = document.getElementById("slideImage");
const slideCaption = document.getElementById("slideCaption");
const dots = document.getElementById("dots");
let slideIndex = 0;

slides.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.className = "dot" + (i === 0 ? " active" : "");
  dot.addEventListener("click", () => showSlide(i));
  dots.appendChild(dot);
});

function showSlide(i) {
  slideIndex = i;
  slideImage.classList.add("fade");

  setTimeout(() => {
    slideImage.src = slides[i].src;
    slideCaption.textContent = slides[i].caption;
    document.querySelectorAll(".dot").forEach((dot, idx) => {
      dot.classList.toggle("active", idx === i);
    });
    slideImage.classList.remove("fade");
  }, 300);
}

setInterval(() => {
  showSlide((slideIndex + 1) % slides.length);
}, 3600);

let giftStage = 0;
let giftRevealed = false;

const giftStages = [
  {
    note: "The gift heard you... tap again 💫",
    button: "Keep Unwrapping ✨",
    message: "Something sweet is glowing inside..."
  },
  {
    note: "Almost there — one more magical tap 💖",
    button: "Release the Magic 🎁",
    message: "The ribbon is giving way..."
  },
  {
    note: "Surprise unlocked! 🎉",
    button: "Opening...",
    message: "Baba Lala"
  }
];

function sprinkleGiftMagic(amount = 14) {
  const rect = gift.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  for (let i = 0; i < amount; i++) {
    const spark = document.createElement("span");
    spark.className = "gift-spark";
    spark.textContent = ["✨", "💖", "🎊", "⭐"][Math.floor(Math.random() * 4)];
    spark.style.left = `${centerX}px`;
    spark.style.top = `${centerY}px`;
    spark.style.setProperty("--spark-x", `${(Math.random() - .5) * 280}px`);
    spark.style.setProperty("--spark-y", `${-80 - Math.random() * 170}px`);
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 1050);
  }
}

function revealGift() {
  gift.classList.remove("is-charging", "is-ready");
  gift.classList.add("open");
  sprinkleGiftMagic(34);

  setTimeout(() => {
    modal.classList.add("show");
    launchFireworks();
  }, 760);
}

giftRibbon.addEventListener("click", () => {
  if (giftRevealed) return;

  const stage = giftStages[giftStage];
  gift.classList.remove("is-waking");
  void gift.offsetWidth;
  gift.classList.add("is-waking");

  giftNote.textContent = stage.note;
  giftRibbon.textContent = stage.button;
  giftMessage.textContent = stage.message;
  giftMessage.classList.add("show");
  giftProgressFill.style.width = `${Math.min((giftStage + 1) * 34, 100)}%`;
  sprinkleGiftMagic(10 + giftStage * 6);

  if (giftStage === 1) {
    gift.classList.add("is-charging");
  }

  if (giftStage >= giftStages.length - 1) {
    giftRevealed = true;
    gift.classList.add("is-ready");
    setTimeout(revealGift, 900);
  }

  giftStage += 1;
});

closeModal.addEventListener("click", () => modal.classList.remove("show"));
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.remove("show");
});

// Soft floating sparkles
const sparkleCanvas = document.getElementById("sparkleCanvas");
const sctx = sparkleCanvas.getContext("2d");
let sparkles = [];

function resizeSparkles() {
  sparkleCanvas.width = window.innerWidth;
  sparkleCanvas.height = window.innerHeight;
  sparkles = Array.from({ length: 70 }, () => ({
    x: Math.random() * sparkleCanvas.width,
    y: Math.random() * sparkleCanvas.height,
    r: Math.random() * 2 + 1,
    speed: Math.random() * .45 + .15,
    alpha: Math.random() * .7 + .2
  }));
}
resizeSparkles();
window.addEventListener("resize", resizeSparkles);

function drawSparkles() {
  sctx.clearRect(0, 0, sparkleCanvas.width, sparkleCanvas.height);
  sparkles.forEach(p => {
    p.y -= p.speed;
    if (p.y < -10) {
      p.y = sparkleCanvas.height + 10;
      p.x = Math.random() * sparkleCanvas.width;
    }
    sctx.globalAlpha = p.alpha;
    sctx.beginPath();
    sctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    sctx.fillStyle = "#fff";
    sctx.fill();
  });
  sctx.globalAlpha = 1;
  requestAnimationFrame(drawSparkles);
}
drawSparkles();

// Fireworks
const fireworksCanvas = document.getElementById("fireworksCanvas");
const fctx = fireworksCanvas.getContext("2d");
let particles = [];

function resizeFireworks() {
  fireworksCanvas.width = window.innerWidth;
  fireworksCanvas.height = window.innerHeight;
}
resizeFireworks();
window.addEventListener("resize", resizeFireworks);

function launchFireworks() {
  particles = [];
  for (let burst = 0; burst < 7; burst++) {
    const x = Math.random() * fireworksCanvas.width;
    const y = Math.random() * fireworksCanvas.height * .55 + 60;
    const hue = Math.random() * 360;

    for (let i = 0; i < 54; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 2;
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 90,
        color: `hsl(${hue + Math.random() * 40}, 100%, 60%)`
      });
    }
  }
}

function animateFireworks() {
  fctx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);

  particles.forEach((p, index) => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += .045;
    p.life--;

    fctx.globalAlpha = Math.max(p.life / 90, 0);
    fctx.beginPath();
    fctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
    fctx.fillStyle = p.color;
    fctx.fill();

    if (p.life <= 0) particles.splice(index, 1);
  });

  fctx.globalAlpha = 1;
  requestAnimationFrame(animateFireworks);
}
animateFireworks();
