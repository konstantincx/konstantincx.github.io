// year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// theme (dark par défaut)
const body = document.body;
const checkbox = document.getElementById("themeCheckbox");


const saved = localStorage.getItem("theme");
if (saved === "light") {
  body.classList.add("light");
  if (checkbox) checkbox.checked = true; 
}

// Sync toggle cus whynot
checkbox?.addEventListener("change", (e) => {
  const checked = e.target.checked;
  if (checked) {
    body.classList.add("light");
    localStorage.setItem("theme", "light");
  } else {
    body.classList.remove("light");
    localStorage.setItem("theme", "dark");
  }
});
