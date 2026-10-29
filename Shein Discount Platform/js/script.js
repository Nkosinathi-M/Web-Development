const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");
const toast = document.querySelector("#toast");
let toastTimer;

menuToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

navLinks?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    if (menuToggle) {
      menuToggle.textContent = "☰";
      menuToggle.setAttribute("aria-label", "Open navigation");
    }
  });
});

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2300);
}

document.querySelectorAll(".copy-button").forEach(button => {
  button.addEventListener("click", async () => {
    const code = button.dataset.code || "";
    if (!code || code === "ADD-CODE") {
      showToast("Replace ADD-CODE with your real promo code first.");
      return;
    }
    try {
      await navigator.clipboard.writeText(code);
      showToast(`Code ${code} copied!`);
    } catch {
      showToast(`Your code is: ${code}`);
    }
  });
});

document.querySelectorAll(".filter-button").forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    document.querySelectorAll(".filter-button").forEach(item => {
      item.classList.toggle("active", item === button);
    });
    document.querySelectorAll(".deal-card").forEach(card => {
      card.hidden = filter !== "all" && card.dataset.type !== filter;
    });
  });
});

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
