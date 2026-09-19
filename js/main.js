(function () {
  "use strict";

  /* ---- Ano no rodapé ---- */
  var anoEl = document.getElementById("ano-atual");
  if (anoEl) anoEl.textContent = new Date().getFullYear();

  /* ---- Header muda de aparência ao rolar ---- */
  var header = document.getElementById("topo");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- Contadores da seção de números ---- */
  var statNumbers = document.querySelectorAll(".stat__number");
  function animateCount(el) {
    var target = parseInt(el.dataset.countTo, 10) || 0;
    var suffix = el.dataset.suffix || "";
    var duration = 1200;
    var start = null;

    function step(ts) {
      if (start === null) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if (statNumbers.length && "IntersectionObserver" in window) {
    var statsIo = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            statsIo.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    statNumbers.forEach(function (el) { statsIo.observe(el); });
  } else {
    statNumbers.forEach(function (el) {
      el.textContent = (el.dataset.countTo || "0") + (el.dataset.suffix || "");
    });
  }

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
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---- Portfólio: montar cards a partir de PORTFOLIO_ITEMS ---- */
  var grid = document.getElementById("portfolio-grid");
  var CATEGORY_LABELS = { shows: "Shows", campanhas: "Campanhas", carros: "Carros Antigos" };
  var FEATURED_ITEM = {
    imagem: "assets/img/portfolio/carros-1.jpg",
    titulo: "Um encontro, centenas de clássicos",
    descricao: "Cobertura completa de um dos maiores encontros de carros antigos já produzidos pela Murupi."
  };

  function buildCards() {
    if (!grid || typeof PORTFOLIO_ITEMS === "undefined") return;
    var frag = document.createDocumentFragment();

    PORTFOLIO_ITEMS.forEach(function (item, index) {
      var card = document.createElement("div");
      card.className = "portfolio-card";
      card.dataset.categoria = item.categoria;
      card.dataset.index = String(index);
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-label", "Ampliar: " + item.titulo);

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

      var hint = document.createElement("span");
      hint.className = "portfolio-card__hint";
      hint.setAttribute("aria-hidden", "true");
      hint.textContent = "+";
      card.appendChild(hint);

      var open = function () { openLightbox(index); };
      card.addEventListener("click", open);
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
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

  /* ---- Lightbox (com navegação entre os itens visíveis) ---- */
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightbox-img");
  var lightboxCaption = document.getElementById("lightbox-caption");
  var lightboxClose = document.getElementById("lightbox-close");
  var lightboxPrev = document.getElementById("lightbox-prev");
  var lightboxNext = document.getElementById("lightbox-next");
  var currentIndex = -1;

  function visibleIndexes() {
    var list = [];
    document.querySelectorAll(".portfolio-card:not(.is-hidden)").forEach(function (card) {
      list.push(parseInt(card.dataset.index, 10));
    });
    return list;
  }

  function showItem(item) {
    lightboxImg.src = item.imagem;
    lightboxImg.alt = item.titulo;
    lightboxCaption.textContent = item.titulo + " — " + item.descricao;
  }

  // index: posição em PORTFOLIO_ITEMS, ou -1 para o item em destaque
  function openLightbox(index) {
    if (!lightbox) return;
    currentIndex = index;
    showItem(index === -1 ? FEATURED_ITEM : PORTFOLIO_ITEMS[index]);
    var hasNav = index !== -1 && visibleIndexes().length > 1;
    lightboxPrev.hidden = !hasNav;
    lightboxNext.hidden = !hasNav;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function stepLightbox(direction) {
    if (currentIndex === -1) return;
    var list = visibleIndexes();
    var pos = list.indexOf(currentIndex);
    if (pos === -1) return;
    var nextPos = (pos + direction + list.length) % list.length;
    currentIndex = list[nextPos];
    showItem(PORTFOLIO_ITEMS[currentIndex]);
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImg.src = "";
    document.body.style.overflow = "";
  }

  var featuredCase = document.getElementById("featured-case");
  if (featuredCase) {
    var openFeatured = function () { openLightbox(-1); };
    featuredCase.addEventListener("click", openFeatured);
    featuredCase.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openFeatured(); }
    });
  }

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener("click", function () { stepLightbox(-1); });
  if (lightboxNext) lightboxNext.addEventListener("click", function () { stepLightbox(1); });
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (!lightbox || lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") stepLightbox(-1);
    if (e.key === "ArrowRight") stepLightbox(1);
  });

  /* ---- Formulário de contato: monta a mensagem e abre WhatsApp ou e-mail ---- */
  var contactForm = document.getElementById("contact-form");
  if (contactForm) {
    var waNumber = contactForm.dataset.whatsapp;
    var contactEmail = contactForm.dataset.email;

    contactForm.querySelectorAll("button[data-action]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        if (!contactForm.reportValidity()) return;

        var nome = contactForm.nome.value.trim();
        var tipo = contactForm.tipo.value;
        var data = contactForm.data.value.trim();
        var mensagem = contactForm.mensagem.value.trim();

        var linhas = [
          "Olá! Meu nome é " + nome + ".",
          "Tipo de evento: " + tipo,
          data ? "Data prevista: " + data : null,
          "Mensagem: " + mensagem
        ].filter(Boolean);
        var texto = linhas.join("\n");

        if (btn.dataset.action === "whatsapp") {
          window.open("https://wa.me/" + waNumber + "?text=" + encodeURIComponent(texto), "_blank", "noopener");
        } else {
          var assunto = "Contato pelo site — " + tipo;
          window.location.href = "mailto:" + contactEmail + "?subject=" + encodeURIComponent(assunto) + "&body=" + encodeURIComponent(texto);
        }
      });
    });
  }

  /* ---- Vídeos: botão de play sobre o pôster; só um vídeo toca por vez ---- */
  var videoCards = document.querySelectorAll(".video-card");
  videoCards.forEach(function (card) {
    var video = card.querySelector("video");
    var play = card.querySelector(".video-card__play");
    if (!video || !play) return;

    play.addEventListener("click", function () {
      videoCards.forEach(function (other) {
        if (other === card) return;
        var v = other.querySelector("video");
        if (v && !v.paused) v.pause();
      });
      card.classList.add("is-playing");
      video.controls = true;
      video.play();
    });

    video.addEventListener("ended", function () {
      card.classList.remove("is-playing");
      video.controls = false;
      video.load();
    });
  });

  buildCards();
})();
