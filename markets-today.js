/* Affiche les marchés du jour dans la carte « Aujourd'hui au camping ». */
(() => {
  if (typeof CAMPING === "undefined" || typeof renderToday !== "function") return;

  const renderTodayOriginal = renderToday;
  const dayNames = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

  function renderTodayMarkets() {
    const items = document.querySelector("#todayItems");
    const marketSection = CAMPING.sections && CAMPING.sections.market;
    if (!items || !marketSection || !Array.isArray(marketSection.blocks)) return;

    const dayName = dayNames[new Date().getDay()];
    const marketBlock = marketSection.blocks.find(block =>
      String(plainText(block && block[0])).trim().toLowerCase() === dayName.toLowerCase()
    );
    if (!marketBlock) return;

    const animationHeading = items.querySelector(".today-program-heading");
    const marketHtml = `
      <div class="today-program-heading today-market-heading">
        <span>🌾</span>
        <strong>${escapeHtml(t("MARCHÉS DU JOUR"))} • ${escapeHtml(t(dayName))}</strong>
      </div>
      <div class="today-program-list today-market-list">
        <div class="today-program-item">
          <span class="today-program-icon">📅</span>
          <div class="today-program-text">${renderText(marketBlock[1]).replace(/\n/g, "<br>")}</div>
        </div>
      </div>
    `;

    if (animationHeading) animationHeading.insertAdjacentHTML("beforebegin", marketHtml);
    else items.insertAdjacentHTML("beforeend", marketHtml);
  }

  // Les marchés restent accessibles depuis la carte « Aujourd'hui » plutôt que dans le menu.
  CAMPING.menu = CAMPING.menu.filter(item => item.id !== "market");
  if (typeof renderTiles === "function") renderTiles();
  if (typeof renderDrawer === "function") renderDrawer();

  window.renderToday = function(...args) {
    renderTodayOriginal.apply(this, args);
    renderTodayMarkets();
  };
  window.renderToday();
})();
