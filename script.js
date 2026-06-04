const header = document.querySelector(".site-header");
const navLinks = document.querySelectorAll('nav a[href^="#"]');
const sections = [...navLinks]
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);
const pdfLink = document.querySelector('a[href*=".pdf"]');

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

const setActiveLink = (id) => {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${id}`;
    link.classList.toggle("is-active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "true");
    } else {
      link.removeAttribute("aria-current");
    }
  });
};

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visibleEntry = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visibleEntry) {
      setActiveLink(visibleEntry.target.id);
    }
  },
  {
    rootMargin: "-35% 0px -45%",
    threshold: [0.2, 0.45, 0.7],
  },
);

sections.forEach((section) => sectionObserver.observe(section));

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const targetId = link.getAttribute("href").slice(1);
    setActiveLink(targetId);
  });
});

if (pdfLink) {
  pdfLink.setAttribute("target", "_blank");
  pdfLink.setAttribute("rel", "noopener");
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });
