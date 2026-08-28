const slidesData = [
  {
    text:  `Chào Thẻo iu của anh❤️Nếu em đang ở đây thì cảm ơn em đã dành chút thời gian cho món quà nhỏ này.Anh chỉ muốn cùng em nhìn lại những kỷ niệm đẹp mà chúng ta đã từng có.`,
    gif: "https://i.pinimg.com/originals/b6/b1/d6/b6b1d64609f266d8f236752d8551f26f.gif",
    alt: "Kỷ niệm yêu thương",
  },
  {
    text: `Anh vẫn nhớ từng lần em bay từ Hà Nội vào Sài Gòn.Mỗi lần được gặp em, cả thành phố như vui hơn.Cảm ơn em vì đã luôn cố gắng để khoảng cách không còn quá xa.`,
    gif: "https://i.pinimg.com/originals/3f/4e/d3/3f4ed3cb1539cb42dc93b78020a3ef55.gif",
    alt: "Hà Nội đến Sài Gòn",
  },
  {
    text: `Có lẽ anh chưa phải là người hoàn hảo.Có những lúc anh quá bận, có những điều anh làm chưa đủ tốt.Nhưng có một điều anh chưa từng thay đổi...Đó là anh luôn trân trọng em.`,
    gif: "https://i.pinimg.com/originals/b7/c6/4a/b7c64aca651271c52087f58276bd1de1.gif",
  },
  {
    text: `Anh nhớ những buổi mình cùng đi ăn.Nhớ những lần nắm tay nhau dạo phố.Nhớ những tấm ảnh mình cười thật tươi Những điều bình dị ấy lại là điều anh nhớ nhất.`,
    gif: "https://i.pinimg.com/originals/7e/f6/9c/7ef69cd0a6b0b78526c8ce983b3296fc.gif",
  },
  {
    text:`Dù giữa chúng ta đã có những hiểu lầm...Anh vẫn tin rằng hai người từng thật lòng yêu nhau thì luôn xứng đáng có một cuộc trò chuyện thật bình yên.` ,
    gif: "https://i.pinimg.com/originals/4e/89/d3/4e89d3e4ec4b1f59b1664e880a875c65.gif",
  },
  {text:`Anh không mong em đọc những dòng này rồi phải suy nghĩ nhiều.Anh chỉ mong khi nhớ về chúng ta...Em sẽ mỉm cười nhiều hơn là buồn. `,
    gif: "https://i.pinimg.com/originals/fd/60/15/fd6015dd3f31d0223374f993f66e85d3.gif",
  },
  {
    text: "iu em nhiều moaz moaz 😗😗😗😗",
    gif: "https://i.pinimg.com/originals/56/80/90/5680904ede54bea21d02450affebfc4f.gif",
  },
];

const localImages = Array.from(
  { length: 15 },
  (_, i) => `./style/img/anh%20(${i + 1}).jpg`,
);

let currentSlide = 0;
let finaleShown = false;
let currentTextInterval = null;
let advanceTimeout = null;
const totalSlides = slidesData.length;
const starsContainer = document.getElementById("stars");
const introScreen = document.getElementById("intro-screen");
const heart = document.getElementById("heart");
const bgMusic = document.getElementById("bg-music");
const progressDots = document.getElementById("progress-dots");
const slidesContainer = document.getElementById("slides");
const fallingContainer = document.getElementById("falling-container");
const rainContainer = document.getElementById("rain");
const isMobile = window.matchMedia("(max-width: 768px)").matches;
let slides;

function createSlides() {
  slidesData.forEach((data, index) => {
    const slide = document.createElement("div");
    slide.classList.add("slide");
    slide.id = `slide${index + 1}`;

    const message = document.createElement("div");
    message.classList.add("message");
    message.id = `message${index + 1}`;

    const hackerText = document.createElement("div");
    hackerText.classList.add("hacker-text");
    message.appendChild(hackerText);

    const img = document.createElement("img");
    img.src = data.gif;
    img.alt = data.alt || "Ảnh kỷ niệm";

    slide.appendChild(message);
    slide.appendChild(img);
    slidesContainer.appendChild(slide);
  });

  slides = document.querySelectorAll(".slide");
}

function init() {
  createSlides();
  createProgressDots();
  preloadImages();
  setEventListeners();
  program();
}

function createProgressDots() {
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dot.setAttribute("data-index", i);
    if (i === 0) dot.classList.add("active");
    progressDots.appendChild(dot);
  }
}

function preloadImages() {
  const images = document.querySelectorAll(".slide img");
  images.forEach((img) => {
    const image = new Image();
    image.src = img.src;
  });
}

function program(delay = 200) {
  (function () {
    const _b = (s) => decodeURIComponent(escape(atob(s)));
    const _d = [
      "QuG6o24gcXV54buBbiB0aHXhu5ljIHbhu4IgRHIuR2lmdGVy",
      "VGlrdG9rOiBodHRwczovL3d3dy50aWt0b2suY29tL0Bkci5naWZ0ZXIzMDY=",
      "R2l0aHViOiBodHRwczovL2dpdGh1Yi5jb20vRHJHaWZ0ZXI=",
    ];

    setTimeout(() => {
      _d.forEach((x) => console.log(_b(x)));
    }, delay);
  })();
}

function textRevealEffect(element, finalText, speed = 30, onComplete) {
  let index = 0;
  element.textContent = "";
  element.classList.remove("complete");
  if (currentTextInterval) {
    clearInterval(currentTextInterval);
    currentTextInterval = null;
  }

  currentTextInterval = setInterval(() => {
    element.textContent = finalText.slice(0, index + 1);
    index += 1;
    if (index >= finalText.length) {
      clearInterval(currentTextInterval);
      currentTextInterval = null;
      element.classList.add("complete", "visible");
      if (onComplete) onComplete();
    }
  }, speed);
  element.classList.add("visible");
}

function startFallingEffect() {
  fallingContainer.innerHTML = "";
  fallingContainer.style.display = "block";
  const fallingItems = [];
  const imageSources = localImages.slice(0, 15);

  imageSources.forEach((src, index) => {
    const item = document.createElement("img");
    item.classList.add("falling-item", "falling-item--image");
    item.src = src;
    item.alt = `ảnh rơi ${index + 1}`;

    const size = isMobile ? Math.random() * 28 + 50 : Math.random() * 40 + 60;
    item.style.width = `${size}px`;
    item.style.height = `${size}px`;
    item.style.left = `${Math.random() * 60 + 20}%`;
    item.style.top = `${Math.random() * -220 - 140}px`;
    item.style.opacity = "0";
    item.style.animationName = "fallDown";
    item.style.animationTimingFunction = "cubic-bezier(0.22, 0.8, 0.32, 1)";
    item.style.animationDuration = `${Math.random() * 3 + 5.5}s`;
    item.style.animationDelay = `${Math.random() * 1.2}s`;
    item.style.animationFillMode = "forwards";
    item.style.transform = `rotate(${Math.random() * 30 - 15}deg)`;
    item.style.zIndex = "75";
    item.style.transition = "all 1.2s ease-out";

    fallingContainer.appendChild(item);
    fallingItems.push(item);

    requestAnimationFrame(() => {
      item.style.opacity = "1";
    });
  });

  fadeMusicVolume(bgMusic, bgMusic.volume, 0.08, 10000);
  setTimeout(() => slowDownFallingItems(fallingItems), 9000);
  setTimeout(() => attractItemsToCenter(fallingItems), 12500);
  setTimeout(() => assembleItemsIntoHeart(fallingItems), 14500);
  setTimeout(() => createHeartFormation(), 15050);
  setTimeout(() => showFinalCaption(), 17300);
}

function fadeMusicVolume(audio, from, to, duration) {
  const stepTime = 100;
  const steps = Math.max(1, Math.ceil(duration / stepTime));
  let currentStep = 0;
  const delta = (to - from) / steps;
  audio.volume = from;

  const fadeInterval = setInterval(() => {
    currentStep += 1;
    const nextVolume = Math.max(0, Math.min(1, from + delta * currentStep));
    audio.volume = nextVolume;
    if (currentStep >= steps) {
      clearInterval(fadeInterval);
    }
  }, stepTime);
}

function slowDownFallingItems(items) {
  items.forEach((item) => {
    item.style.animationPlayState = "paused";
    item.style.transition = "all 1.2s ease-out";
    item.style.opacity = "0.95";
  });
}

function attractItemsToCenter(items) {
  const rect = fallingContainer.getBoundingClientRect();
  const centerX = rect.width / 2;
  const centerY = rect.height / 2 - 20;

  items.forEach((item, index) => {
    const size = parseFloat(item.style.width) || 60;
    const offsetX = Math.random() * 120 - 60;
    const offsetY = Math.random() * 120 - 60;
    item.style.left = `${centerX - size / 2 + offsetX}px`;
    item.style.top = `${centerY - size / 2 + offsetY}px`;
    item.style.transform = `rotate(${Math.random() * 50 - 25}deg) scale(0.92)`;
  });
}

function assembleItemsIntoHeart(items) {
  const rect = fallingContainer.getBoundingClientRect();
  const centerX = rect.width / 2;
  const centerY = rect.height / 2 - 10;
  const scale = Math.min(rect.width, rect.height) / 22;

  const heartPoints = items.map((_, index) => {
    const t = (index / (items.length - 1)) * Math.PI;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y =
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t);
    return { x, y };
  });

  items.forEach((item, index) => {
    const size = parseFloat(item.style.width) || 60;
    const point = heartPoints[index];
    item.style.left = `${centerX + point.x * scale - size / 2}px`;
    item.style.top = `${centerY - point.y * scale - size / 2}px`;
    item.style.transform = "rotate(0deg) scale(0.88)";
    item.style.border = "2px solid rgba(255, 255, 255, 0.9)";
    item.style.boxShadow = "0 0 22px rgba(255, 130, 170, 0.35)";
  });
}

function showFinalCaption() {
  endingScene.classList.add("show");
  endingText.innerHTML = `
    <div class="final-line final-title">Duy ❤️ Thảo</div>
    <div class="final-line final-date">20.01.2026</div>
    <div class="final-line final-subtitle">Forever in my heart</div>
  `;
  endingText.classList.add("show");
  restartStory.classList.add("show");
}

function showShootingStarText(callback) {
  if (callback) callback();
}

function createStars() {
  const starCount = isMobile ? 36 : 100;

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("div");
    star.classList.add("star");
    const size = Math.random() * 2 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * -100}px`;
    const duration = Math.random() * 10 + 5;
    star.style.animationDuration = `${duration}s`;
    star.style.animationDelay = `${Math.random() * 5}s`;
    starsContainer.appendChild(star);
  }
}

function createRain() {
  if (!rainContainer) return;
  rainContainer.innerHTML = "";

  const dropCount = isMobile ? 28 : 48;

  for (let i = 0; i < dropCount; i++) {
    const drop = document.createElement("div");
    drop.classList.add("rain-drop");

    const left = Math.random() * 100;
    const duration = Math.random() * 0.7 + 0.8;
    const delay = Math.random() * 0.8;
    const drift = (Math.random() * 24 - 12).toFixed(2);

    drop.style.left = `${left}%`;
    drop.style.height = `${Math.random() * 16 + 12}px`;
    drop.style.width = `${Math.random() * 1.2 + 0.8}px`;
    drop.style.opacity = `${0.35 + Math.random() * 0.35}`;
    drop.style.animationDuration = `${duration}s`;
    drop.style.animationDelay = `${delay}s`;
    drop.style.setProperty("--drift", `${drift}px`);

    rainContainer.appendChild(drop);
  }
}

function showSlide(index) {
  if (index < 0) index = totalSlides - 1;
  if (index >= totalSlides) index = 0;
  if (currentTextInterval) clearInterval(currentTextInterval);
  if (advanceTimeout) clearTimeout(advanceTimeout);

  currentSlide = index;
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });
  slides[index].classList.add("active");
  document.querySelectorAll(".dot").forEach((dot, i) => {
    if (i === index) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });

  document.querySelectorAll(".hacker-text").forEach((text) => {
    text.classList.remove("complete", "visible");
  });

  const messageElement = document.querySelector(
    `#message${index + 1} .hacker-text`,
  );
  const isLastSlide = index === totalSlides - 1;

  textRevealEffect(messageElement, slidesData[index].text, 28, () => {
    advanceTimeout = setTimeout(() => {
      if (isLastSlide) {
        if (!finaleShown) {
          finaleShown = true;
          slides[index].classList.remove("active");
          advanceTimeout = setTimeout(startFallingEffect, 1000);
        }
      } else {
        nextSlide();
      }
    }, 2000);
  });
}

function nextSlide() {
  showSlide((currentSlide + 1) % totalSlides);
}

function prevSlide() {
  showSlide((currentSlide - 1 + totalSlides) % totalSlides);
}

function startPresentation() {
  introScreen.style.opacity = "0";
  introScreen.style.pointerEvents = "none";
  setTimeout(() => {
    introScreen.style.display = "none";
  }, 400);

  createStars();
  createRain();
  showSlide(0);

  bgMusic.currentTime = 20;
  bgMusic.play().catch((e) => console.log("Tự động phát bị chặn:", e));
}

function setEventListeners() {
  heart.addEventListener("click", startPresentation);
  introScreen.addEventListener("click", (e) => {
    if (e.target === heart) {
      startPresentation();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (introScreen.style.display === "none") {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    }
  });

  document.querySelectorAll(".dot").forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const index = parseInt(e.target.getAttribute("data-index"), 10);
      showSlide(index);
    });
  });

  window.addEventListener("load", adjustImages);
  window.addEventListener("resize", adjustImages);
}

function adjustImages() {
  const images = document.querySelectorAll(".slide img");
  const size = Math.min(window.innerWidth * 0.8, window.innerHeight * 0.5, 300);

  images.forEach((img) => {
    img.style.width = `${size}px`;
    img.style.height = `${size}px`;
  });
}



const overlay = document.createElement("div");
overlay.className = "zoom-overlay";

const zoomImg = document.createElement("img");
zoomImg.className = "zoom-image";

overlay.appendChild(zoomImg);
document.body.appendChild(overlay);

function enableImageZoom(){

    document.addEventListener("pointerdown",(e)=>{

        if(!e.target.classList.contains("falling-item")) return;

        zoomImg.src = e.target.src;
        overlay.classList.add("active");

        e.target.style.animationPlayState="paused";
    });

    function closeZoom(){

        overlay.classList.remove("active");

        document.querySelectorAll(".falling-item").forEach(img=>{
            img.style.animationPlayState="running";
        });

    }

    document.addEventListener("pointerup",closeZoom);
    document.addEventListener("pointercancel",closeZoom);

}

enableImageZoom();
/* ===========================
   ENDING SCENE
=========================== */

const endingScene = document.getElementById("endingScene");
const endingText = document.getElementById("endingText");
const restartStory = document.getElementById("restartStory");

const endingMessages = [

`Có người hỏi anh...

Điều đẹp nhất của tình yêu là gì?

Anh nghĩ rất lâu.`,

`Rồi anh nhận ra...

Điều đẹp nhất...

Là gặp được một người...

Khiến mình muốn sống tốt hơn mỗi ngày.`,

`Anh từng nghĩ...

Yêu là nói thật nhiều.

Sau này mới hiểu...

Lắng nghe...

Mới khó.`,

`Có những cuộc cãi vã...

Không phải vì hết thương.

Chỉ là...

Cả hai đều đang đợi...

Một người lên tiếng trước.`,

`Anh cũng từng bướng bỉnh.

Từng nghĩ...

Im lặng sẽ làm mọi chuyện tốt hơn.

Nhưng hóa ra...

Im lặng chỉ làm khoảng cách dài thêm.`,

`Càng trưởng thành...

Anh càng hiểu.

Đúng hay sai...

Đôi khi...

Không quan trọng bằng...

Việc còn muốn nắm tay nhau hay không.`,

`Anh không muốn...

Làm người giỏi nhất.

Anh chỉ muốn...

Là người khiến em...

Cảm thấy bình yên nhất.`,

`Có những lời xin lỗi...

Không thể quay ngược thời gian.

Nhưng...

Có thể khiến một người...

Bắt đầu thay đổi.`,

`Anh không hứa...

Sẽ không bao giờ làm em buồn.

Nhưng anh hứa...

Sẽ học cách...

Làm em buồn ít hơn hôm qua.`,

`Yêu một người...

Không phải là giữ họ.

Mà là...

Để họ luôn cảm thấy...

Được tôn trọng.`,

`Anh luôn tin...

Một mối quan hệ đẹp...

Không phải vì...

Chưa từng cãi nhau.

Mà vì...

Sau mỗi lần như vậy...

Vẫn muốn hiểu nhau hơn.`,

`Có người nói...

Thời gian sẽ thay đổi mọi thứ.

Anh thì nghĩ...

Thời gian...

Chỉ làm rõ...

Ai là người...

Mình thật sự trân trọng.`,

`Nếu có điều gì...

Anh muốn cảm ơn.

Thì là...

Cảm ơn em...

Đã từng xuất hiện...

Trong những năm tháng đẹp nhất.`,

`Nhờ có em...

Anh biết...

Mình vẫn có thể cười rất nhiều.

Chỉ vì một người.`,

`Nhờ có em...

Anh biết...

Một tin nhắn ngắn.

Cũng đủ...

Làm cả ngày trở nên vui hơn.`,

`Anh từng nghĩ...

Mình hiểu em.

Sau này mới biết...

Hiểu một người...

Là việc phải học...

Suốt cả đời.`,

`Có những ngày...

Mọi chuyện không như ý.

Chỉ cần còn một người...

Muốn ngồi xuống...

Lắng nghe nhau.

Đã là điều rất đáng quý.`,

`Anh thích...

Những điều bình thường.

Một bữa ăn.

Một cái nắm tay.

Một câu hỏi...

"Hôm nay em có mệt không?"`,

`Nếu sau này...

Em gặp ai đó.

Anh chỉ mong...

Người ấy...

Sẽ luôn dịu dàng với em.`,

`Còn nếu...

Người đó là anh.

Anh sẽ cố gắng...

Để xứng đáng hơn hôm nay.`,

`Anh không muốn...

Chứng minh điều gì.

Anh chỉ muốn...

Sự thay đổi của mình...

Tự nói lên tất cả.`,

`Có những người...

Đi ngang cuộc đời.

Có những người...

Ở lại trong ký ức.

Em...

Là người...

Anh luôn biết ơn.`,

`Thật ra...

Hạnh phúc...

Không phải là có tất cả.

Mà là...

Biết trân trọng...

Những gì mình từng có.`,

`Nếu một ngày...

Em đọc đến đây.

Hy vọng...

Em sẽ mỉm cười.

Đừng khóc nhé.

Em cười đẹp hơn nhiều.`,

`Anh vẫn thích...

Phiên bản em...

Hay cười.

Hay kể chuyện.

Hay giận.

Và cũng rất dễ mềm lòng.`,

`Anh tin...

Điều tốt đẹp.

Đến chậm một chút...

Cũng không sao.

Miễn là...

Đừng từ bỏ nó.`,

`Có lẽ...

Điều trưởng thành nhất...

Anh học được.

Là biết...

Yêu một người...

Bằng sự tử tế.`,

`Nếu sau này...

Chúng mình gặp lại.

Anh hy vọng.

Cả hai...

Đều sẽ mỉm cười.`,

`Không phải vì...

Mọi chuyện từng hoàn hảo.

Mà vì...

Chúng ta...

Đều đã trưởng thành hơn.`,

`Và dù tương lai...

Có viết tiếp câu chuyện này hay không.

Anh vẫn luôn...

Biết ơn...

Vì đã từng có em.

❤️`

];

function showEnding() {
  endingScene.classList.add("show");
  startSnowfall();

  let current = 0;

  function revealText(text, onComplete) {
    endingText.innerHTML = "";
    endingText.classList.add("show");

    const lines = text.split("\n");
    const allChars = [];

    lines.forEach((line) => {
      const lineEl = document.createElement("div");
      lineEl.className = "ending-line";

      Array.from(line).forEach((char) => {
        const charEl = document.createElement("span");
        charEl.className = "ending-char";
        charEl.textContent = char === " " ? "\u00A0" : char;
        if (char === " ") {
          charEl.classList.add("space");
        }
        lineEl.appendChild(charEl);
        allChars.push(charEl);
      });

      endingText.appendChild(lineEl);
    });

    requestAnimationFrame(() => {
      allChars.forEach((charEl, index) => {
        setTimeout(() => {
          charEl.classList.add("visible");
        }, index * 25);
      });
    });

    const duration = Math.max(600, allChars.length * 28 + 900);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, duration);
  }

  function startSnowfall() {
    const snowCount = 30;
    for (let i = 0; i < snowCount; i++) {
      createSnowflake(i * 120);
    }

    const snowInterval = setInterval(() => {
      createSnowflake();
    }, 320);

    function createSnowflake(delay = 0) {
      setTimeout(() => {
        const snow = document.createElement("img");
        snow.className = "snowflake";
        snow.src = "./style/bongtuyet.png";
        snow.alt = "snowflake";
        snow.style.left = `${Math.random() * 100}%`;
        snow.style.top = `${Math.random() * -80 - 30}px`;
        snow.style.animationDuration = `${Math.random() * 3 + 4.2}s`;
        snow.style.opacity = `${0.35 + Math.random() * 0.45}`;
        const size = Math.random() * 16 + 10;
        snow.style.width = `${size}px`;
        snow.style.height = `${size}px`;
        snow.style.animationDelay = `${Math.random() * 1.4}s`;
        snow.style.transform = `translateX(${Math.random() * 14 - 7}px)`;
        snow.style.setProperty("--drift", `${Math.random() * 18 - 9}px`);
        endingScene.appendChild(snow);
        snow.addEventListener("animationend", () => snow.remove());
      }, delay);
    }

    endingScene.dataset.snowInterval = snowInterval;
  }

  function createHeartFormation() {
    const snowInterval = Number(endingScene.dataset.snowInterval || 0);
    if (snowInterval) {
      clearInterval(snowInterval);
      delete endingScene.dataset.snowInterval;
    }

    const rect = endingScene.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2 - 30;
    const heartWidth = Math.min(rect.width * 0.55, 540);
    const scale = heartWidth / 18;

    const outline = document.createElement("div");
    outline.className = "heart-outline";
    outline.style.left = `${centerX}px`;
    outline.style.top = `${centerY}px`;
    outline.style.setProperty("--heart-size", `${heartWidth}px`);
    endingScene.appendChild(outline);

    const fillPoints = [];
    const step = 0.06;
    for (let px = -1.2; px <= 1.2; px += step) {
      for (let py = -1.3; py <= 1.2; py += step) {
        const value = Math.pow(px * px + py * py - 1, 3) - px * px * py * py * py;
        if (value <= 0) {
          fillPoints.push({ x: px, y: py });
        }
      }
    }

    const particleCount = Math.min(320, fillPoints.length);
    const selected = fillPoints
      .sort(() => Math.random() - 0.5)
      .slice(0, particleCount);

    selected.forEach((point, index) => {
      const targetX = centerX + point.x * scale * 9;
      const targetY = centerY - point.y * scale * 9;
      const piece = document.createElement("img");
      piece.className = "heart-piece";
      piece.src = localImages[index % localImages.length] || "./style/bongtuyet.png";
      piece.alt = "heart piece";
      const size = Math.random() * 18 + 18;
      piece.style.width = `${size}px`;
      piece.style.height = `${size}px`;
      piece.style.objectFit = "cover";
      piece.style.borderRadius = "18px";
      const startX = Math.random() * rect.width;
      const startY = Math.random() * -260 - 120;
      piece.style.left = `${startX}px`;
      piece.style.top = `${startY}px`;
      piece.style.opacity = "0";
      piece.style.animationName = "fallToHeart";
      piece.style.animationDuration = `${Math.random() * 1.5 + 2.4}s`;
      piece.style.animationDelay = `${index * 0.022}s`;
      piece.style.animationTimingFunction = "cubic-bezier(0.22, 1, 0.36, 1)";
      piece.style.setProperty("--dx", `${targetX - startX}px`);
      piece.style.setProperty("--dy", `${targetY - startY}px`);
      piece.style.setProperty("--scale", `${Math.random() * 0.2 + 0.92}`);
      piece.style.setProperty("--rotation", `${Math.random() * 40 - 20}deg`);
      piece.onerror = () => {
        piece.src = "./style/bongtuyet.png";
      };
      endingScene.appendChild(piece);
      piece.addEventListener("animationend", () => {
        piece.style.animation = "heartPulse 1.4s ease-in-out infinite alternate";
      });
    });
  }

  function nextMessage() {
    if (current >= endingMessages.length) {
      createHeartFormation();
      setTimeout(() => {
        restartStory.classList.add("show");
      }, 2800);
      return;
    }

    revealText(endingMessages[current], () => {
      current += 1;
      setTimeout(nextMessage, 2600);
    });
  }

  nextMessage();
}

restartStory.onclick = () => {

    location.reload();

};
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}
