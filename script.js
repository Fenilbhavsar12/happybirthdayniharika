const card = document.getElementById("bookCard");
const cardWrap = document.getElementById("cardWrap");
const typewriter = document.getElementById("typewriter");
const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");
const gift = document.getElementById("gift");
const giftRibbon = document.getElementById("giftRibbon");
const modal = document.getElementById("giftModal");
const closeModal = document.getElementById("closeModal");

const loveLetter =
  "You are the reason ordinary days become beautiful memories. Today, I just want you to feel as loved, treasured, and celebrated as you make me feel every single day. Happy Birthday, my love. ❤️";

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
    src: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=900&q=80",
    caption: "Every moment with you feels magical."
  },
  {
    src: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=900&q=80",
    caption: "Your smile is my favorite view."
  },
  {
    src: "https://images.unsplash.com/photo-1529634597503-139d3726fed5?auto=format&fit=crop&w=900&q=80",
    caption: "Here’s to us, today and always."
  },
  {
    src: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=900&q=80",
    caption: "You are my forever celebration."
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

giftRibbon.addEventListener("click", () => {
  gift.classList.add("open");
  modal.classList.add("show");
  launchFireworks();
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
