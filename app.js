(function () {
  const contacts = window.NEONSHINE || {};
  const phoneDisplay = contacts.phoneDisplay || "+7 700 000 00 00";
  const phoneTel = contacts.phoneTel || "+77000000000";
  const whatsapp = String(contacts.whatsapp || "77000000000").replace(/\D/g, "");
  const instagram = contacts.instagram || "https://instagram.com/";

  const services = [
    { name: "Трехфазная мойка", description: "Бережная очистка кузова", price: "от 2 000 ₸" },
    { name: "Химчистка салона", description: "Удаление любых пятен и запахов", price: "от 35 000 ₸" },
    { name: "Полировка кузова", description: "Устранение царапин и голограмм", price: "от 60 000 ₸" },
    { name: "Керамическое покрытие", description: "Защита кузова на 2 года", price: "от 120 000 ₸" },
  ];

  const gate = document.getElementById("gate");
  const topActions = document.getElementById("top-actions");
  const switchBtn = document.getElementById("switch-btn");
  const callBtn = document.getElementById("call-btn");
  const contactsModal = document.getElementById("contacts-modal");
  const variants = {
    1: document.getElementById("variant-1"),
    2: document.getElementById("variant-2"),
    3: document.getElementById("variant-3"),
  };

  function wa(text) {
    return `https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`;
  }

  function fillContacts(root) {
    root.querySelectorAll(".js-phone").forEach((el) => {
      el.href = `tel:${phoneTel}`;
      el.textContent = phoneDisplay;
    });
    root.querySelectorAll(".js-instagram").forEach((el) => {
      el.href = instagram;
    });
    root.querySelectorAll(".js-cta-hero").forEach((el) => {
      el.href = wa("Здравствуйте! Хочу записаться на бесплатный осмотр автомобиля");
      el.target = "_blank";
      el.rel = "noopener noreferrer";
    });
  }

  function fillServicesV1(root) {
    const box = root.querySelector(".js-services");
    if (!box || box.dataset.ready) return;
    services.forEach((service) => {
      const card = document.createElement("article");
      card.className = "card";
      card.innerHTML = `
        <h3></h3>
        <p></p>
        <p class="card__price"></p>
        <a class="btn btn--ghost" target="_blank" rel="noopener noreferrer">Выбрать</a>
      `;
      card.querySelector("h3").textContent = service.name;
      card.querySelector("p").textContent = service.description;
      card.querySelector(".card__price").textContent = service.price;
      const btn = card.querySelector("a");
      btn.href = wa(
        `Привет! Меня интересует ${service.name} за ${service.price}. Подскажите свободное время?`
      );
      box.appendChild(card);
    });
    box.dataset.ready = "1";
  }

  function fillServicesV2(root) {
    const box = root.querySelector(".js-services");
    if (!box || box.dataset.ready) return;
    services.forEach((service, index) => {
      const row = document.createElement("article");
      row.className = "row";
      row.innerHTML = `
        <div class="row__top">
          <span class="row__index"></span>
          <div>
            <h3></h3>
            <p class="row__desc"></p>
            <p class="row__price"></p>
          </div>
        </div>
        <a class="btn btn--line" target="_blank" rel="noopener noreferrer">Выбрать</a>
      `;
      row.querySelector(".row__index").textContent = String(index + 1).padStart(2, "0");
      row.querySelector("h3").textContent = service.name;
      row.querySelector(".row__desc").textContent = service.description;
      row.querySelector(".row__price").textContent = service.price;
      const btn = row.querySelector("a");
      btn.href = wa(
        `Привет! Меня интересует ${service.name} за ${service.price}. Подскажите свободное время?`
      );
      box.appendChild(row);
    });
    box.dataset.ready = "1";
  }

  function fillServicesV3(root) {
    const box = root.querySelector(".js-services");
    if (!box || box.dataset.ready) return;
    services.forEach((service) => {
      const tile = document.createElement("article");
      tile.className = "tile";
      tile.innerHTML = `
        <h3></h3>
        <p class="tile__desc"></p>
        <p class="tile__price"></p>
        <a class="btn btn--outline" target="_blank" rel="noopener noreferrer">Выбрать</a>
      `;
      tile.querySelector("h3").textContent = service.name;
      tile.querySelector(".tile__desc").textContent = service.description;
      tile.querySelector(".tile__price").textContent = service.price;
      const btn = tile.querySelector("a");
      btn.href = wa(
        `Привет! Меня интересует ${service.name} за ${service.price}. Подскажите свободное время?`
      );
      box.appendChild(tile);
    });
    box.dataset.ready = "1";
  }

  function fillModalContacts() {
    const phone = document.getElementById("modal-phone");
    const waLink = document.getElementById("modal-whatsapp");
    const ig = document.getElementById("modal-instagram");

    if (phone) {
      phone.href = `tel:${phoneTel}`;
      const value = phone.querySelector(".modal__value");
      if (value) value.textContent = phoneDisplay;
    }
    if (waLink) {
      waLink.href = wa("Здравствуйте! Хочу связаться с NeonShine");
    }
    if (ig) {
      ig.href = instagram;
    }
  }

  function openContactsModal() {
    fillModalContacts();
    contactsModal.hidden = false;
    document.body.classList.add("is-modal-open");
  }

  function closeContactsModal() {
    contactsModal.hidden = true;
    document.body.classList.remove("is-modal-open");
  }

  function setTheme(num) {
    document.body.classList.remove("theme-1", "theme-2", "theme-3");
    if (num) document.body.classList.add(`theme-${num}`);
  }

  function showGate() {
    Object.values(variants).forEach((el) => {
      if (el) el.hidden = true;
    });
    topActions.hidden = true;
    closeContactsModal();
    setTheme(null);
    gate.hidden = false;
    document.body.classList.add("is-gate");
    document.title = "NeonShine";
    window.scrollTo(0, 0);
  }

  function openVariant(num) {
    gate.hidden = true;
    topActions.hidden = false;
    document.body.classList.remove("is-gate");
    setTheme(num);

    Object.entries(variants).forEach(([key, el]) => {
      if (!el) return;
      el.hidden = key !== num;
    });

    const root = variants[num];
    if (!root) return;

    fillContacts(root);
    if (num === "1") fillServicesV1(root);
    if (num === "2") fillServicesV2(root);
    if (num === "3") fillServicesV3(root);

    document.title = `NeonShine — вариант ${num}`;
    window.scrollTo(0, 0);
  }

  document.querySelectorAll("[data-variant]").forEach((button) => {
    button.addEventListener("click", () => openVariant(button.dataset.variant));
  });

  switchBtn.addEventListener("click", showGate);
  callBtn.addEventListener("click", openContactsModal);

  contactsModal.querySelectorAll("[data-close-modal]").forEach((el) => {
    el.addEventListener("click", closeContactsModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !contactsModal.hidden) {
      closeContactsModal();
    }
  });

  document.body.classList.add("is-gate");
})();

