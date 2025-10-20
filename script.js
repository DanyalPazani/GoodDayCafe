let currentLang = "en"; // default language

async function loadMenu(lang = "en") {
  const menuContainer = document.getElementById("menu");
  menuContainer.innerHTML = ""; // clear existing items

  try {
    const res = await fetch(`menu-${lang}.json`);
    const data = await res.json();

    data.forEach((item, i) => {
      const card = document.createElement("div");
      card.className = "card";
      card.style.animationDelay = `${i * 0.1}s`;

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
    console.error("Failed to load menu:", err);
    menuContainer.innerHTML = "<p style='text-align:center'>Could not load menu.</p>";
  }
}

// 🌐 Get buttons
const enBtn = document.getElementById("en-btn");
const faBtn = document.getElementById("fa-btn");

// 🌐 Language switch logic
enBtn.addEventListener("click", () => {
  currentLang = "en";
  loadMenu("en");

  // button style update
  enBtn.classList.add("active");
  faBtn.classList.remove("active");

  // reset text direction if Persian was active
  document.body.setAttribute("dir", "ltr");
});

faBtn.addEventListener("click", () => {
  currentLang = "fa";
  loadMenu("fa");

  // button style update
  faBtn.classList.add("active");
  enBtn.classList.remove("active");

  // change direction for Persian
  document.body.setAttribute("dir", "rtl");
});

// 🟢 Initial setup
enBtn.classList.add("active");
loadMenu(); // initial load
