(function () {
  "use strict";

  /* ---- Ano no rodapé ---- */
  var anoEl = document.getElementById("ano-atual");
  if (anoEl) anoEl.textContent = new Date().getFullYear();

  /* ---- Menu mobile ---- */
  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("nav-principal");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- Revelar seções ao rolar ---- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---- Portfólio: montar cards a partir de PORTFOLIO_ITEMS ---- */
  var grid = document.getElementById("portfolio-grid");
  var CATEGORY_LABELS = { shows: "Shows", campanhas: "Campanhas", carros: "Carros Antigos" };

  function buildCards() {
    if (!grid || typeof PORTFOLIO_ITEMS === "undefined") return;
    var frag = document.createDocumentFragment();

    PORTFOLIO_ITEMS.forEach(function (item) {
      var card = document.createElement("div");
      card.className = "portfolio-card";
      card.dataset.categoria = item.categoria;

      var img = document.createElement("img");
      img.src = item.imagem;
      img.alt = item.titulo;
      img.loading = "lazy";
      card.appendChild(img);

      var overlay = document.createElement("div");
      overlay.className = "portfolio-card__overlay";

      var cat = document.createElement("span");
      cat.className = "portfolio-card__cat";
      cat.textContent = (CATEGORY_LABELS[item.categoria] || item.categoria) + (item.ano ? " · " + item.ano : "");
      overlay.appendChild(cat);

      var title = document.createElement("h3");
      title.className = "portfolio-card__title";
      title.textContent = item.titulo;
      overlay.appendChild(title);

      card.appendChild(overlay);

      card.addEventListener("click", function () {
        openLightbox(item);
      });

      frag.appendChild(card);
    });

    grid.appendChild(frag);
  }

  /* ---- Filtros ---- */
  var filterButtons = document.querySelectorAll(".filter");
  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterButtons.forEach(function (b) {
        b.classList.remove("is-active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-selected", "true");

      var filtro = btn.dataset.filter;
      document.querySelectorAll(".portfolio-card").forEach(function (card) {
        var mostrar = filtro === "todos" || card.dataset.categoria === filtro;
        card.classList.toggle("is-hidden", !mostrar);
      });
    });
  });

  /* ---- Lightbox ---- */
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightbox-img");
  var lightboxCaption = document.getElementById("lightbox-caption");
  var lightboxClose = document.getElementById("lightbox-close");

  function openLightbox(item) {
    if (!lightbox) return;
    lightboxImg.src = item.imagem;
    lightboxImg.alt = item.titulo;
    lightboxCaption.textContent = item.titulo + " — " + item.descricao;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImg.src = "";
    document.body.style.overflow = "";
  }

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && lightbox && !lightbox.hidden) closeLightbox();
  });

  buildCards();
})();
