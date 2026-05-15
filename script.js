const typingEl = document.getElementById("typingText");
const words = [
  "IT student at Mount Kenya University",
  "Building with C++ and Arduino",
  "Cleaning and analyzing data with Python",
  "Creating websites with HTML, CSS, and JavaScript"
];

let w = 0;
let c = 0;
let deleting = false;

function typeLoop() {
  if (!typingEl) return;

  const current = words[w];
  typingEl.textContent = deleting ? current.slice(0, c--) : current.slice(0, c++);

  if (!deleting && c === current.length + 1) {
    deleting = true;
    setTimeout(typeLoop, 1100);
    return;
  }

  if (deleting && c === -1) {
    deleting = false;
    w = (w + 1) % words.length;
  }

  setTimeout(typeLoop, deleting ? 40 : 70);
}
typeLoop();

const reveals = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  },
  { threshold: 0.12 }
);
reveals.forEach((el) => revealObserver.observe(el));

const sections = document.querySelectorAll("main section[id], main #about");
const navLinks = document.querySelectorAll(".nav-link");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${entry.target.id}`
        );
      });
    });
  },
  { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
);
sections.forEach((section) => sectionObserver.observe(section));

const menuToggle = document.getElementById("menuToggle");
const navLinksWrap = document.getElementById("navLinks");

if (menuToggle && navLinksWrap) {
  menuToggle.addEventListener("click", () => {
    navLinksWrap.classList.toggle("open");
  });

  navLinks.forEach((link) =>
    link.addEventListener("click", () => navLinksWrap.classList.remove("open"))
  );
}
