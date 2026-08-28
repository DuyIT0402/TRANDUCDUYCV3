// Nền hạt mạng lưới — các chấm cyan di chuyển và nối nhau bằng tia sáng
const canvas = document.getElementById("bg-particles");
const ctx = canvas.getContext("2d");
let w, h, particles = [];
const N = 70, LINK = 130;

function resize() {
  w = canvas.width = innerWidth;
  h = canvas.height = innerHeight;
}
resize();
addEventListener("resize", resize);

for (let i = 0; i < N; i++) {
  particles.push({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    r: Math.random() * 1.6 + 0.6
  });
}

const mouse = { x: -9999, y: -9999 };
addEventListener("mousemove", e => { mouse.x = e.clientX; mouse.y = e.clientY; });

function tick() {
  ctx.clearRect(0, 0, w, h);

  for (const p of particles) {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > w) p.vx *= -1;
    if (p.y < 0 || p.y > h) p.vy *= -1;

    // nhẹ nhàng bị hút về phía chuột
    const dx = mouse.x - p.x, dy = mouse.y - p.y;
    const d = Math.hypot(dx, dy);
    if (d < 180 && d > 0) { p.x += dx / d * 0.4; p.y += dy / d * 0.4; }

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0,240,255,0.7)";
    ctx.fill();
  }

  // nối các hạt gần nhau
  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      const a = particles[i], b = particles[j];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < LINK) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(0,240,255,${(1 - d / LINK) * 0.18})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(tick);
}
tick();

const compactToggle = document.getElementById("compact-toggle");
const compactKey = "duy-cv-compact-mode";

function setCompactMode(enabled) {
  document.body.classList.toggle("compact-mode", enabled);
  compactToggle.setAttribute("aria-pressed", String(enabled));
  compactToggle.textContent = enabled ? "▣ CHẾ ĐỘ ĐẦY ĐỦ" : "▣ CHẾ ĐỘ THƯ MỤC";
  localStorage.setItem(compactKey, String(enabled));
}

if (compactToggle) {
  setCompactMode(localStorage.getItem(compactKey) === "true");
  compactToggle.addEventListener("click", () => {
    setCompactMode(!document.body.classList.contains("compact-mode"));
  });
}

const introGate = document.getElementById("intro-gate");
const enterCv = document.getElementById("enter-cv");

if (introGate && enterCv) {
  enterCv.addEventListener("click", () => {
    document.body.classList.add("is-entered");
    document.getElementById("cv-content").scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(animateSkills, 350);
  });
}

// Các thanh kỹ năng chạy tuần tự từ 0% khi mở hồ sơ.
const skills = document.querySelectorAll(".skill");

function prepareSkills() {
  skills.forEach((skill) => {
    const bar = skill.querySelector(".bar i");
    const number = skill.querySelector("b");
    const target = Number.parseInt(bar.style.getPropertyValue("--w"), 10);
    skill.dataset.target = String(target);
    bar.style.width = "0%";
    number.textContent = "0";
  });
}

function animateSkills() {
  skills.forEach((skill, index) => {
    const bar = skill.querySelector(".bar i");
    const number = skill.querySelector("b");
    const target = Number(skill.dataset.target);

    setTimeout(() => {
      const startedAt = performance.now();
      const duration = 3200;
      skill.classList.add("animate");

      function step(now) {
        const progress = Math.min((now - startedAt) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = eased * target;
        bar.style.width = `${value}%`;
        number.textContent = String(Math.round(value));
        if (progress < 1) requestAnimationFrame(step);
      }

      requestAnimationFrame(step);
    }, index * 520);
  });
}

prepareSkills();
