let currentLang = "en";
let currentCategory = "all";

/* ---------- Tab Labels for EN & FA ---------- */
const tabLabels = {
  en: {
    all: "All",
    pizza: "Pizza",
    burgers: "Burgers",
    salads: "Salads",
    "hot-drinks": "Hot Drinks",
    "cold-drinks": "Cold Drinks",
    dessert: "Dessert"
  },
  fa: {
    all: "همه",
    pizza: "پیتزا",
    burgers: "برگر",
    salads: "سالاد",
    "hot-drinks": "نوشیدنی داغ",
    "cold-drinks": "نوشیدنی سرد",
    dessert: "دسر"
  }
};

/* ---------- Load Menu Function ---------- */
async function loadMenu(lang = currentLang, category = currentCategory) {
  const menuContainer = document.getElementById("menu");
  menuContainer.innerHTML = "";

  try {
    const res = await fetch(`menu-${lang}.json`);
    const data = await res.json();

    const filtered =
      category === "all"
        ? data
        : data.filter(item => item.category === category);

    filtered.forEach((item, i) => {
      const card = document.createElement("div");
      card.className = "card";
      card.style.animationDelay = `${i * 0.08}s`;

      card.innerHTML = `
        <img src="${item.img}" alt="${item.name}">
        <div class="card-content">
          <h3>${item.name}</h3>
          <p class="price">$${item.price.toFixed(2)}</p>
          <p class="ingredients">${item.ingredients}</p>
        </div>
      `;

      menuContainer.appendChild(card);
    });

  } catch (err) {
    console.error("Menu load error:", err);
    menuContainer.innerHTML =
      "<p style='text-align:center'>Could not load menu.</p>";
  }
}

/* ---------- Language Switch ---------- */
const enBtn = document.getElementById("en-btn");
const faBtn = document.getElementById("fa-btn");

enBtn.addEventListener("click", () => {
  currentLang = "en";
  loadMenu();
  updateTabLabels("en");

  enBtn.classList.add("active");
  faBtn.classList.remove("active");
  document.body.setAttribute("dir", "ltr");
});

faBtn.addEventListener("click", () => {
  currentLang = "fa";
  loadMenu();
  updateTabLabels("fa");

  faBtn.classList.add("active");
  enBtn.classList.remove("active");
  document.body.setAttribute("dir", "rtl");
});

/* ---------- Category Tabs ---------- */
const tabs = document.querySelectorAll(".tab");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    currentCategory = tab.dataset.category;
    loadMenu();
  });
});

/* ---------- Update Tab Labels Function ---------- */
function updateTabLabels(lang) {
  tabs.forEach(tab => {
    const category = tab.dataset.category;
    if (tabLabels[lang][category]) {
      tab.textContent = tabLabels[lang][category];
    }
  });
}

/* ---------- Initial Load ---------- */
enBtn.classList.add("active");
document.body.setAttribute("dir", "ltr");
updateTabLabels(currentLang);
loadMenu();
