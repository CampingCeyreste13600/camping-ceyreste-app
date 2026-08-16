/*
  Moteur d'affichage.
  Tu n'as normalement pas besoin de modifier ce fichier.
*/

function escapeHtml(value){
  return String(value ?? "")
    .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;").replace(/'/g,"&#039;");
}

/* ============================================================
   🏕️ PERSONNALISATION — MA LOCATION
   ============================================================ */
const CEYRESTE_MOBILE_HOME_KEY = "ceyreste_mobile_home_number";

function getSelectedMobileHomeNumber(){
  try { return localStorage.getItem(CEYRESTE_MOBILE_HOME_KEY) || ""; }
  catch(e){ return ""; }
}

function setSelectedMobileHomeNumber(number){
  try { localStorage.setItem(CEYRESTE_MOBILE_HOME_KEY, String(number).trim()); }
  catch(e){}
}

function getSelectedMobileHome(){
  const number=getSelectedMobileHomeNumber();
  if(!number || typeof MOBILE_HOMES==="undefined") return null;

  const entry=MOBILE_HOMES[number];
  if(!entry) return null;

  if(typeof entry==="string" && typeof MOBILE_HOME_CATEGORIES!=="undefined"){
    // Accepte le nom exact de la catégorie, sans dépendre des majuscules/minuscules.
    const key=Object.keys(MOBILE_HOME_CATEGORIES).find(
      k => String(k).trim().toUpperCase() === String(entry).trim().toUpperCase()
    );
    if(key) return { number, ...MOBILE_HOME_CATEGORIES[key], categoryKey:key };
  }

  if(typeof entry==="object") return {number, ...entry};
  return null;
}

function askMobileHomeNumber(){
  const modal=document.querySelector("#modal");
  if(!modal) return;

  const current=getSelectedMobileHomeNumber();
  const options=typeof MOBILE_HOMES!=="undefined" ? MOBILE_HOMES : {};
  const hasCurrent=!!(current && options[current]);

  const content=document.querySelector("#modalContent");
  if(!content) return;

  content.innerHTML=`
    <div class="eyebrow dark">CAMPING DE CEYRESTE</div>
    <h2 class="modal-title">🏕️ MA LOCATION</h2>
    <p class="modal-intro">Indiquez le numéro de votre location pour afficher automatiquement les informations correspondantes.</p>
    <form id="mobileHomeForm" class="location-form">
      <label for="mobileHomeNumber">Numéro de location</label>
      <input id="mobileHomeNumber" name="mobileHomeNumber" type="text" inputmode="text" autocomplete="off" autocapitalize="characters" spellcheck="false" value="${escapeHtml(current)}" placeholder="Ex. 90, 69B, T16…" required>
      <p id="mobileHomeError" class="location-error" role="alert" hidden></p>
      <button class="mh-select-button" type="submit">${hasCurrent ? "Enregistrer le numéro" : "Valider ma location"}</button>
    </form>
  `;

  modal.classList.remove("hidden");
  const form=document.querySelector("#mobileHomeForm");
  const input=document.querySelector("#mobileHomeNumber");
  const error=document.querySelector("#mobileHomeError");
  input?.focus();

  form?.addEventListener("submit", e=>{
    e.preventDefault();
    const number=String(input?.value || "").trim().toUpperCase();
    if(!number) return;

    const exists=Object.prototype.hasOwnProperty.call(options, number);
    if(!exists){
      if(error){
        error.textContent="Ce numéro n'est pas configuré. Vérifiez le numéro indiqué par la réception.";
        error.hidden=false;
      }
      input?.focus();
      return;
    }

    setSelectedMobileHomeNumber(number);
    renderToday();
    openSection("stay");
  });
}

function mobileHomeTodaySummary(){
  const mh=getSelectedMobileHome();
  if(!mh) return {
    title:textStyle("MA LOCATION",{color:"teal",bold:true}),
    note:textStyle("Indiquez votre numéro dans MA LOCATION",{color:"gray",bold:true})
  };
  return {
    title:textStyle("N° "+mh.number,{color:"teal",bold:true}),
    note:mh.title || textStyle(mh.category || "Location",{color:"teal",bold:true})
  };
}

function renderMobileHomePersonalization(){
  const mh=getSelectedMobileHome();
  if(!mh) return `
    <div class="mh-personal-card">
      <div class="mh-personal-icon">🏕️</div>
      <h3>MA LOCATION</h3>
      <p>Indiquez votre numéro de location pour personnaliser cette rubrique.</p>
      <button class="mh-select-button" onclick="askMobileHomeNumber()">Indiquer mon numéro</button>
    </div>
  `;

  const info=Array.isArray(mh.info)?mh.info:[];
  return `
    <div class="mh-personal-card">
      ${mh.image ? `<img class="mh-personal-image" src="${escapeHtml(mh.image)}" alt="" loading="lazy" onerror="this.remove()">` : ""}
      <div class="mh-personal-head">
        <div class="mh-personal-icon">🏕️</div>
        <div>
          <div class="mh-personal-number">N° ${escapeHtml(mh.number)}</div>
          <div class="mh-personal-category">${mh.title ? renderAny(mh.title) : escapeHtml(mh.category || "Location")}</div>
        </div>
      </div>
      <div class="mh-personal-grid">
        ${mh.capacity ? `<div><b>👥 Capacité</b><span>${escapeHtml(mh.capacity)}</span></div>` : ""}
        ${mh.bedrooms ? `<div><b>🛏️ Chambres</b><span>${escapeHtml(mh.bedrooms)}</span></div>` : ""}
        ${mh.arrival ? `<div><b>🛎️ Arrivée</b><span>${escapeHtml(mh.arrival)}</span></div>` : ""}
        ${mh.departure ? `<div><b>🧳 Départ</b><span>${escapeHtml(mh.departure)}</span></div>` : ""}
      </div>
      ${info.length ? `<div class="mh-personal-info"><b>ℹ️ À savoir</b>${info.map(x=>`<div>• ${escapeHtml(x)}</div>`).join("")}</div>` : ""}
      <button class="mh-change-button" onclick="askMobileHomeNumber()">Modifier mon numéro</button>
    </div>
  `;
}


if (typeof textStyle !== "function") {
  window.textStyle = function(text, options = {}) {
    return {
      __styledText: true,
      text: String(text ?? ""),
      color: options.color || "",
      bold: !!options.bold,
      italic: !!options.italic,
      size: options.size || "normal",
      background: options.background || "",
      align: options.align || ""
    };
  };
}

function renderStyledValue(value){
  return (typeof value === "string" && value.includes("<span")) ? value : renderText(value);
}

/* ============================================================
   🌍 SYSTÈME DE LANGUES
   ============================================================ */
const CEYRESTE_LANGUAGE_KEY = "ceyreste_language";
let currentLanguage = "fr";
function getBrowserLanguage(){
  const raw=String(navigator.language||"fr").toLowerCase();
  if(raw.startsWith("en"))return"en";
  if(raw.startsWith("de"))return"de";
  if(raw.startsWith("es"))return"es";
  if(raw.startsWith("nl"))return"nl";
  if(raw.startsWith("it"))return"it";
  return"fr";
}
function t(value){
  const text=String(value??"");
  if(currentLanguage==="fr")return text;
  const pack=(typeof TRANSLATIONS!=="undefined"&&TRANSLATIONS[currentLanguage])||{};
  return Object.prototype.hasOwnProperty.call(pack,text)?pack[text]:text;
}
function renderLanguageSelector(){
  const host=document.querySelector("#languageSelector");
  if(!host||typeof LANGUAGE_CONFIG==="undefined")return;
  const cur=LANGUAGE_CONFIG[currentLanguage]||LANGUAGE_CONFIG.fr;
  host.innerHTML=`<button type="button" class="language-current" id="languageCurrent" aria-label="${escapeHtml(t("Choisir la langue"))}"><span>${cur.flag}</span><b>${currentLanguage.toUpperCase()}</b><span class="language-chevron">▾</span></button><div class="language-menu hidden" id="languageMenu">${Object.entries(LANGUAGE_CONFIG).map(([code,lang])=>`<button type="button" class="language-option ${code===currentLanguage?"active":""}" data-language="${code}"><span class="language-flag">${lang.flag}</span><span class="language-name">${lang.name}</span><span class="language-code">${code.toUpperCase()}</span></button>`).join("")}</div>`;
  document.querySelector("#languageCurrent")?.addEventListener("click",e=>{e.stopPropagation();document.querySelector("#languageMenu")?.classList.toggle("hidden");});
  host.querySelectorAll("[data-language]").forEach(btn=>btn.addEventListener("click",e=>{e.stopPropagation();setLanguage(btn.dataset.language);}));
}
function translateStaticDom(){
  document.querySelectorAll("body *:not(#languageSelector):not(#languageSelector *)").forEach(el=>{
    if(el.children.length===0&&el.childNodes.length===1&&el.firstChild.nodeType===3){
      if(!el.dataset.i18nOriginal)el.dataset.i18nOriginal=el.textContent;
      el.textContent=t(el.dataset.i18nOriginal);
    }
    if(el.hasAttribute("aria-label")){
      if(!el.dataset.i18nAria)el.dataset.i18nAria=el.getAttribute("aria-label");
      el.setAttribute("aria-label",t(el.dataset.i18nAria));
    }
  });
}
function setLanguage(lang){
  if(typeof LANGUAGE_CONFIG==="undefined"||!LANGUAGE_CONFIG[lang])lang="fr";
  currentLanguage=lang;
  try{localStorage.setItem(CEYRESTE_LANGUAGE_KEY,lang);}catch(e){}
  document.documentElement.lang=lang;
  renderLanguageSelector();
  renderToday();
  renderDrawer();
  dynamicWelcomeMount();
  translateStaticDom();
}
function initLanguage(){
  let saved="";
  try{saved=localStorage.getItem(CEYRESTE_LANGUAGE_KEY)||"";}catch(e){}
  currentLanguage=(saved&&LANGUAGE_CONFIG[saved])?saved:getBrowserLanguage();
  document.documentElement.lang=currentLanguage;
  renderLanguageSelector();
}
document.addEventListener("click",()=>document.querySelector("#languageMenu")?.classList.add("hidden"));

function renderText(value, fallbackClass=""){
  if(value && typeof value === "object" && value.__styledText){
    const colors=["green","green-dark","blue","orange","red","purple","pink","teal","yellow","gray","dark","white"];
    let colorClass = colors.includes(String(value.color).toLowerCase()) ? ` txt-${String(value.color).toLowerCase()}` : "";
    let custom = "";
    if(value.color && !colorClass){
      const c=String(value.color);
      if(/^#[0-9a-fA-F]{3,8}$/.test(c)) custom += `--txt-color:${c};`;
      else if(/^rgb(a)?\([0-9\s,./%]+\)$/.test(c)) custom += `--txt-color:${c};`;
    }
    if(value.background && /^#[0-9a-fA-F]{3,8}$/.test(value.background)) custom += `--txt-bg:${value.background};`;
    const cls=`styled-text ${fallbackClass}${colorClass} ${value.bold?"txt-bold":""} ${value.italic?"txt-italic":""} txt-${["small","normal","large","xl"].includes(value.size)?value.size:"normal"} txt-align-${["left","center","right"].includes(value.align)?value.align:"left"}`;
    return `<span class="${cls}" style="${custom}">${escapeHtml(t(value.text))}</span>`;
  }
  return escapeHtml(t(value));
}

function renderAny(value, fallbackClass=""){
  if(value && typeof value === "object" && value.__styledText){
    return renderText(value, fallbackClass);
  }
  if(typeof value === "string" && /<span\b[^>]*class=["'][^"']*styled-text/.test(value)){
    return value;
  }
  return renderText(value, fallbackClass);
}


function plainText(value){
  return value && typeof value==="object" && value.__styledText ? value.text : String(value ?? "");
}


function setupImages(){
  const images=CAMPING.images || {};
  const logo=document.querySelector("#campingLogo");
  const fallback=document.querySelector("#brandFallback");

  if(logo && images.logo){
    logo.src=images.logo;
    logo.classList.remove("hidden");
    fallback?.classList.add("hidden");
    logo.onerror=()=>{ logo.classList.add("hidden"); fallback?.classList.remove("hidden"); };
  }

  const hero=document.querySelector(".hero");
  if(hero && images.accueil){
    // Résout correctement le chemin, y compris sur GitHub Pages
    const heroUrl = new URL(String(images.accueil).trim(), document.baseURI).href;
    const testImage = new Image();
    testImage.onload = () => {
      hero.style.setProperty("--hero-image", `url("${heroUrl}")`);
      hero.classList.add("has-hero-image");
      hero.style.backgroundImage = `linear-gradient(180deg,rgba(20,70,95,.35),rgba(10,55,50,.35)),url("${heroUrl}")`;
      hero.style.backgroundSize = "cover";
      hero.style.backgroundPosition = "center";
    };
    testImage.onerror = () => {
      console.warn("Impossible de charger l'image d'accueil :", heroUrl);
    };
    testImage.src = heroUrl;
  }

  const region=document.querySelector("#regionCard");
  if(region && images.region){
    region.style.setProperty("--region-image", `url("${images.region}")`);
    region.classList.add("has-region-image");
  }

  const photos=Array.isArray(images.gallery) ? images.gallery.filter(Boolean) : [];
  const card=document.querySelector("#galleryCard");
  const grid=document.querySelector("#galleryGrid");
  if(card && grid && photos.length){
    card.hidden=false;
    grid.innerHTML=photos.map((src,i)=>`
      <button class="gallery-item" type="button">
        <img src="${escapeHtml(src)}" alt="Photo du camping ${i+1}" loading="lazy"
             onerror="this.closest('.gallery-item').style.display='none'">
      </button>
    `).join("");
    grid.querySelectorAll(".gallery-item").forEach((btn,i)=>{
      btn.onclick=()=>openPhoto(photos[i]);
    });
  }
}

function openPhoto(src){
  let viewer=document.querySelector("#photoViewer");
  if(!viewer){
    viewer=document.createElement("div");
    viewer.id="photoViewer";
    viewer.className="photo-viewer";
    viewer.innerHTML=`<button class="photo-close" aria-label="Fermer">×</button><img alt="Photo du camping">`;
    document.body.appendChild(viewer);
    viewer.querySelector(".photo-close").onclick=()=>viewer.classList.remove("show");
    viewer.onclick=e=>{if(e.target===viewer)viewer.classList.remove("show")};
  }
  viewer.querySelector("img").src=src;
  viewer.classList.add("show");
}

function setText(id,value){
  const el=document.querySelector(id);
  if(el) el.innerHTML=renderText(value);
}

setupImages();

setText("#welcomeText", CAMPING.welcome);
setText("#headline", CAMPING.headline);
setText("#subheadline", CAMPING.subheadline);
setText("#todayTitle", CAMPING.today.title);
setText("#regionTitle", CAMPING.region.title);
setText("#regionText", CAMPING.region.text);
document.querySelector("#helpText").textContent="La réception est à votre disposition pour vous accompagner pendant votre séjour.";
document.querySelector("#callLink").href=`tel:${CAMPING.contact.phone}`;
document.querySelector("#mailLink").href=`mailto:${CAMPING.contact.email}`;

function resolveImageUrl(src){
  if(!src) return "";
  try { return new URL(String(src).trim(), document.baseURI).href; }
  catch(e) { return String(src).trim(); }
}

function renderTiles(){
  document.querySelector("#tiles").innerHTML=CAMPING.menu.map(item=>`
    <button class="tile ${item.image ? "has-tile-image" : ""}" data-open="${item.id}">
      ${item.image ? `<img class="tile-image" src="${escapeHtml(item.image)}" alt="" loading="lazy" onerror="this.remove();this.parentElement.classList.remove('has-tile-image')">` : ""}
      <span class="tile-icon">${item.icon}</span>
      <strong>${item.mobileHomeSummary ? renderText(mobileHomeTodaySummary().title) : renderAny(item.title)}</strong>
      <small>${renderText(item.desc)}</small>
    </button>`).join("");
}
renderTiles();

function getTodayPlanning(){
  const dayNames = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi"
  ];

  const todayName = dayNames[new Date().getDay()];
  const days = Array.isArray(CAMPING.today?.animation?.days)
    ? CAMPING.today.animation.days
    : [];

  return days.find(day =>
    plainText(day?.day).trim().toLowerCase() === todayName.toLowerCase()
  ) || null;
}


function getOpeningSchedule(item, now = new Date()){
  if(!item) return null;

  if(Array.isArray(item.openingHours)) return item.openingHours;

  if(item.openingSchedule){
    const month = now.getMonth() + 1;
    if(month === 7 || month === 8) return item.openingSchedule.juilletAout || [];
    if(month === 10) return item.openingSchedule.octobre || [];
    if(month === 11 || month === 12 || month === 1) return item.openingSchedule.novJan || [];
    return item.openingSchedule.basseSaison || [];
  }

  return null;
}

function isWithinOpeningHours(openingHours, now = new Date()){
  if(!Array.isArray(openingHours) || !openingHours.length) return null;

  const minutes = now.getHours() * 60 + now.getMinutes();

  return openingHours.some(period => {
    const [sh, sm] = String(period.start).split(":").map(Number);
    const [eh, em] = String(period.end).split(":").map(Number);

    if([sh, sm, eh, em].some(Number.isNaN)) return false;

    const start = sh * 60 + sm;
    const end = eh * 60 + em;

    // L'heure de fermeture est exclusive : 20:00 => FERMÉ.
    if(start === end) return false;
    if(start < end) return minutes >= start && minutes < end;
    return minutes >= start || minutes < end;
  });
}

function dynamicStatus(item, now = new Date()){
  const schedule = getOpeningSchedule(item, now);
  const open = isWithinOpeningHours(schedule, now);

  if(open === null) return item.note;

  return textStyle(open ? "OUVERT ✔️" : "FERMÉ ✖️", {
    color: open ? "green" : "red",
    bold: true
  });
}

function getSectionOpeningItem(id){
  const items = Array.isArray(CAMPING.today?.items) ? CAMPING.today.items : [];
  const wanted = {
    pool: "Espace Aquatique",
    restaurant: "Restaurant",
    shop: "Réception"
  }[id];
  if(!wanted) return null;
  return items.find(item => plainText(item?.title).trim().toLowerCase() === wanted.toLowerCase()) || null;
}

function renderOpeningStatusCard(id){
  const item = getSectionOpeningItem(id);
  if(!item) return "";

  const now = new Date();
  const schedule = getOpeningSchedule(item, now);
  const open = isWithinOpeningHours(schedule, now);
  if(open === null) return "";

  const periods = Array.isArray(schedule) ? schedule : [];
  const formatTime = value => String(value || "").replace(/^0/, "");
  const hours = periods.map(p => `${formatTime(p.start)} – ${formatTime(p.end)}`).join(" / ");

  let nextText = "";
  if(!open && periods.length){
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const next = periods.find(p => {
      const [h,m] = String(p.start).split(":").map(Number);
      return !Number.isNaN(h) && !Number.isNaN(m) && h*60+m > currentMinutes;
    });
    if(next) nextText = `<div class="opening-next">Prochaine ouverture : <strong>${formatTime(next.start)}</strong></div>`;
  }

  return `<div class="opening-status-card ${open ? "is-open" : "is-closed"}" data-opening-section="${id}">
    <div class="opening-status-label">Aujourd'hui</div>
    <div class="opening-status-main">${open ? "OUVERT" : "FERMÉ"} <span>${open ? "✓" : "✕"}</span></div>
    <div class="opening-status-hours">${escapeHtml(hours)}</div>
    ${nextText}
  </div>`;
}

function refreshTodayStatuses(){
  document.querySelectorAll("[data-today-index]").forEach(el => {
    const index = Number(el.dataset.todayIndex);
    const item = CAMPING.today && CAMPING.today.items
      ? CAMPING.today.items[index]
      : null;

    if(!item) return;

    const note = item.mobileHomeSummary
      ? mobileHomeTodaySummary().note
      : dynamicStatus(item);

    const noteEl = el.querySelector(".today-info-note");
    if(noteEl) noteEl.innerHTML = renderAny(note);
  });
}


function getTimeGreeting(now=new Date()){
  const h=now.getHours();
  if(h>=5 && h<18) return {icon:"☀️",title:"BONJOUR !",subtitle:h<12?"Une belle journée vous attend au Camping de Ceyreste 🌿":"Profitez bien de votre après-midi au camping ☀️"};
  if(h>=18 && h<23) return {icon:"🌅",title:"BONSOIR !",subtitle:"Une belle soirée vous attend ✨"};
  return {icon:"🌙",title:"BONSOIR !",subtitle:"La journée touche à sa fin 🌙"};
}
function parseAnimationTime(text){
  const m=String(text||"").match(/(?:^|\D)([01]?\d|2[0-3])h([0-5]\d)?/i);
  return m ? Number(m[1])*60+Number(m[2]||0) : null;
}
function getNextAnimation(now=new Date()){
  const days=CAMPING?.today?.animation?.days||[];
  const names=["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];
  const todayName=names[now.getDay()];
  const today=days.find(d=>String(d.day).toLowerCase()===todayName.toLowerCase());
  const nowMin=now.getHours()*60+now.getMinutes();
  const events=(today?.events||[]).map(e=>({...e,_minutes:parseAnimationTime(e.text)})).filter(e=>e._minutes!==null).sort((a,b)=>a._minutes-b._minutes);
  const next=events.find(e=>e._minutes>=nowMin);
  if(next) return {event:next,day:todayName,minutesUntil:next._minutes-nowMin};
  const order=["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"];
  const idx=order.indexOf(todayName);
  for(let step=1;step<=7;step++){
    const day=order[(idx+step)%7];
    const d=days.find(x=>String(x.day).toLowerCase()===day.toLowerCase());
    const ev=(d?.events||[]).map(e=>({...e,_minutes:parseAnimationTime(e.text)})).filter(e=>e._minutes!==null).sort((a,b)=>a._minutes-b._minutes)[0];
    if(ev) return {event:ev,day,minutesUntil:null};
  }
  return null;
}
function formatAnimationCountdown(min){
  if(min===null) return "";
  if(min<=0) return "MAINTENANT";
  const h=Math.floor(min/60), m=min%60;
  return h ? `Dans ${h}h${m?String(m).padStart(2,"0"):""}` : `Dans ${m} min`;
}
function renderDynamicWelcome(){
  const g=getTimeGreeting(), state=getNextAnimation();
  let nextHtml="";
  if(state){
    const raw=String(state.event.text||"");
    const tm=raw.match(/(?:^|\D)([01]?\d|2[0-3])h([0-5]\d)?/i);
    const time=tm?`${tm[1]}h${tm[2]||"00"}`:"";
    const label=raw.replace(/(?:^|\D)([01]?\d|2[0-3])h([0-5]\d)?/i,"").replace(/^\s*[•\-]\s*/,"").trim();
    nextHtml=`<div class="dynamic-next-animation">
      <div class="dynamic-next-label">🎉 ${escapeHtml(t("PROCHAINE ANIMATION"))}</div>
      <div class="dynamic-next-event">${escapeHtml(label)}</div>
      <div class="dynamic-next-time">${escapeHtml(time)}</div>
      <div class="dynamic-next-countdown">${state.minutesUntil===null?escapeHtml(t(state.day)):escapeHtml(formatAnimationCountdown(state.minutesUntil))}</div>
      <button class="dynamic-next-button" type="button" data-dynamic-planning>${escapeHtml(t("VOIR LE PROGRAMME →"))}</button>
    </div>`;
  }
  return `<section class="dynamic-welcome">
    <div class="dynamic-welcome-icon">${g.icon}</div>
    <div class="dynamic-welcome-title">${escapeHtml(t(g.title))}</div>
    <div class="dynamic-welcome-subtitle">${escapeHtml(t(g.subtitle))}</div>
    ${nextHtml}
  </section>`;
}
function dynamicWelcomeMount(){
  // L'accueil de cette application est une page statique (#app/main),
  // il n'existe pas de #page-home. On monte donc la carte dans
  // la vraie carte "BIENVENUE" existante.
  const homeCard=document.querySelector(".welcome-card");
  if(!homeCard) return;

  let mount=homeCard.querySelector(".dynamic-welcome-mount");
  if(!mount){
    mount=document.createElement("div");
    mount.className="dynamic-welcome-mount";
    homeCard.appendChild(mount);
  }

  mount.innerHTML=renderDynamicWelcome();
}

function renderToday(){
  const today = getTodayPlanning();
  const titleEl = document.querySelector("#todayTitle");
  const itemsEl = document.querySelector("#todayItems");

  const dateText = new Intl.DateTimeFormat(currentLanguage==="fr"?"fr-FR":currentLanguage==="de"?"de-DE":currentLanguage==="es"?"es-ES":currentLanguage==="nl"?"nl-NL":currentLanguage==="it"?"it-IT":"en-GB", {
    weekday:"long", day:"numeric", month:"long"
  }).format(new Date());

  if(titleEl){
    titleEl.innerHTML = `
      ${renderText(CAMPING.today.title)}
      <span class="today-date">• ${escapeHtml(dateText)}</span>
    `;
  }

  if(!itemsEl) return;

  // 1) Infos fixes du camping : piscine, restaurant, épicerie, etc.
  const fixedItems = Array.isArray(CAMPING.today.items) ? CAMPING.today.items : [];
  const fixedHtml = fixedItems.map((item,index) => {
    const mhSummary = item.mobileHomeSummary ? mobileHomeTodaySummary() : null;
    const titleHtml = item.mobileHomeSummary
      ? renderAny(mhSummary.title)
      : renderAny(item.title);
    const noteHtml = item.mobileHomeSummary
      ? renderAny(mhSummary.note)
      : renderText(dynamicStatus(item));

    return `
    <div class="today-info-item${item.mobileHomeSummary ? " today-mobile-home" : ""}" data-today-index="${index}"${item.mobileHomeSummary ? ' data-open="stay" role="button" tabindex="0"' : ""}>
      <span class="today-program-icon">${item.icon || "ℹ️"}</span>
      <div class="today-info-content">
        <div class="today-info-title">${titleHtml}</div>
        <div class="today-info-bottom">
          <span class="today-info-time">${renderAny(item.time || "")}</span>
          <span class="today-info-note">${noteHtml}</span>
        </div>
      </div>
    </div>
    `;
  }).join("");

  // 2) Animations : récupérées automatiquement selon le jour actuel.
  const events = today && Array.isArray(today.events) ? today.events : [];
  const eventsHtml = events.length
    ? events.map(event => {
        const e = typeof event === "string" ? { text: event } : event || {};
        return `
          <div class="today-program-item">
            <span class="today-program-icon">${e.icon || "🎉"}</span>
            <div class="today-program-text">${renderText(e.text ?? "")}</div>
          </div>
        `;
      }).join("")
    : `
      <div class="today-empty">
        <span>😴</span>
        <div>
          <b>Aucune animation prévue aujourd'hui</b>
          <small>Profitez pleinement de votre journée au Camping de Ceyreste !</small>
        </div>
      </div>
    `;

  itemsEl.innerHTML = `
    ${fixedHtml}

    <div class="today-program-heading">
      <span>🎉</span>
      <strong>PROGRAMME D'ANIMATION DU JOUR</strong>
    </div>

    <div class="today-program-list">
      ${eventsHtml}
    </div>
  `;
}
renderToday();

function renderDrawer(){
  document.querySelector("#drawerLinks").innerHTML=CAMPING.menu.map(item=>`
    <button class="drawer-link" data-open="${item.id}">
      <span>${item.icon}</span><b>${renderAny(item.title)}</b><small>${renderText(item.desc)}</small>
    </button>`).join("");
}
renderDrawer();


function getProgrammeDateKey(date){
  const y=date.getFullYear();
  const m=String(date.getMonth()+1).padStart(2,"0");
  const d=String(date.getDate()).padStart(2,"0");
  return `${y}-${m}-${d}`;
}
function getFrenchDayShort(date){ return ["DIM","LUN","MAR","MER","JEU","VEN","SAM"][date.getDay()]; }
function getFrenchMonth(date){ return ["JAN","FÉV","MAR","AVR","MAI","JUIN","JUIL","AOÛT","SEP","OCT","NOV","DÉC"][date.getMonth()]; }
function getProgrammeDays(count=7){
  const days=[], now=new Date(); now.setHours(0,0,0,0);
  for(let i=0;i<count;i++){ const d=new Date(now); d.setDate(now.getDate()+i); days.push(d); }
  return days;
}
function programmeDayName(date){ return ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"][date.getDay()]; }
function findProgrammeEvents(date){
  const entry=(((CAMPING.today&&CAMPING.today.animation)&&CAMPING.today.animation.days)||[]).find(d=>String(d.day).toLowerCase()===programmeDayName(date).toLowerCase());
  return entry ? (entry.events||[]) : [];
}
function renderProgrammeForDate(date){
  const selectedKey=getProgrammeDateKey(date), todayKey=getProgrammeDateKey(new Date());
  const tabs=getProgrammeDays(7).map(d=>{
    const key=getProgrammeDateKey(d), active=key===selectedKey, today=key===todayKey;
    return `<button type="button" class="programme-day ${active?'active':''}" data-programme-date="${key}">
      <span class="programme-day-name">${today?'AUJ.':getFrenchDayShort(d)}</span>
      <strong>${String(d.getDate()).padStart(2,"0")}</strong>
      <span class="programme-day-month">${getFrenchMonth(d)}</span>
    </button>`;
  }).join("");
  const events=findProgrammeEvents(date);
  const titleDate=`${programmeDayName(date)} ${date.getDate()} ${getFrenchMonth(date)}`;
  const eventsHtml=events.length ? events.map(ev=>`
    <article class="programme-event-card">
      <div class="programme-event-icon">${ev.icon||"🎉"}</div>
      <div class="programme-event-body"><div class="programme-event-text">${escapeHtml(ev.text||"")}</div></div>
    </article>`).join("") : `
    <div class="programme-empty"><div>😴</div><strong>Aucune animation prévue</strong><span>Profitez pleinement de votre journée au camping !</span></div>`;
  return `<div class="programme-page">
    <div class="programme-day-scroller" aria-label="Choisir un jour">${tabs}</div>
    <div class="programme-selected-heading">
      <div class="programme-selected-kicker">${selectedKey===todayKey?"AUJOURD'HUI AU CAMPING":"PROGRAMME DU JOUR"}</div>
      <h3>${titleDate}</h3>
    </div>
    <div class="programme-events-list">${eventsHtml}</div>
  </div>`;
}
function bindProgrammeTabs(){
  document.querySelectorAll("[data-programme-date]").forEach(btn=>{
    if(btn.dataset.bound==="1") return;
    btn.dataset.bound="1";
    btn.addEventListener("click",e=>{
      e.preventDefault();
      e.stopPropagation();
      const holder=document.querySelector(".programme-page");
      if(!holder)return;
      holder.outerHTML=renderProgrammeForDate(new Date(btn.dataset.programmeDate+"T12:00:00"));
      bindProgrammeTabs();
    });
  });
}
function openSection(id){
  if(id==="planning"){
    document.querySelector("#modalContent").innerHTML =
      `<div class="eyebrow dark">CAMPING DE CEYRESTE</div>
       <h2 class="modal-title">🎉 PROGRAMME D'ANIMATIONS</h2>
       ${renderProgrammeForDate(new Date())}`;
    document.querySelector("#modal").classList.remove("hidden");
    bindProgrammeTabs();
    if(window.__programmeTimer) clearInterval(window.__programmeTimer);
    window.__programmeTimer=setInterval(()=>{
      const active=document.querySelector(".programme-day.active")?.dataset.programmeDate;
      if(active===getProgrammeDateKey(new Date())){
        const holder=document.querySelector(".programme-page");
        if(holder){ holder.outerHTML=renderProgrammeForDate(new Date()); bindProgrammeTabs(); }
      }
    },60000);
    return;
  }
  const section=CAMPING.sections[id];
  if(!section)return;
  if(id === "map" && section.interactive && typeof PLAN_INTERACTIF !== "undefined") {
    renderInteractiveMap();
    document.querySelector("#modal").classList.remove("hidden");
    initInteractiveMap();
    return;
  }
  const blocksHtml = section.accordion
    ? `<div class="info-accordion">${(section.blocks || []).map(b=>`
        <details class="info-accordion-item">
          <summary><span>${renderText(b[0])}</span><span class="accordion-chevron">＋</span></summary>
          <div class="info-accordion-content">${renderText(b[1])}</div>
        </details>
      `).join("")}</div>
      ${section.conclusion ? `<div class="info-conclusion">${renderText(section.conclusion).replace(/\\n/g,"<br>")}</div>` : ""}`
    : (section.blocks || []).map(b=>`<article class="info-block"><h3>${renderText(b[0])}</h3><p>${renderText(b[1])}</p></article>`).join("");

  document.querySelector("#modalContent").innerHTML=`
    <div class="eyebrow dark">CAMPING DE CEYRESTE</div>
    ${section.image ? `<img class="section-image" src="${escapeHtml(section.image)}" alt="" loading="lazy" onerror="this.remove()">` : ""}
    <h2 class="modal-title">${renderText(section.title)}</h2>
    ${section.personalizedMobileHome ? renderMobileHomePersonalization() : ""}
    <p class="modal-intro">${renderText(section.intro)}</p>
    ${["pool","restaurant","shop"].includes(id) ? renderOpeningStatusCard(id) : ""}
    ${section.menuPdf ? `<a class="menu-pdf-button" href="${escapeHtml(section.menuPdf)}" target="_blank" rel="noopener">📖 Voir la carte du restaurant</a>` : ""}
    ${blocksHtml}
    ${id==="region"?`<a class="big-link" href="${CAMPING.contact.mapsUrl}" target="_blank" rel="noopener">📍 Ouvrir Google Maps</a>`:""}
  `;
  document.querySelector("#modal").classList.remove("hidden");
  if(window.__openingStatusTimer) clearInterval(window.__openingStatusTimer);
  if(["pool","restaurant","shop"].includes(id)){
    window.__openingStatusTimer=setInterval(()=>{
      if(document.querySelector("#modal")?.classList.contains("hidden")) return;
      const card=document.querySelector(`[data-opening-section="${id}"]`);
      if(!card) return;
      const fresh=renderOpeningStatusCard(id);
      card.outerHTML=fresh;
    }, 30000);
  }
}

function renderInteractiveMap(){
  const points=Array.isArray(PLAN_INTERACTIF.points)?PLAN_INTERACTIF.points:[];
  const selected=getSelectedMobileHomeNumber();
  const loc=(PLAN_INTERACTIF.locations||{})[selected];
  const selectedData=getSelectedMobileHome();
  const locationMarker=loc ? `<button type="button" class="camp-map-marker camp-map-location" data-map-location="${escapeHtml(selected)}" style="left:${loc.x}%;top:${loc.y}%" title="Votre location" aria-label="Votre location">🏠</button>` : "";
  const pointMarkers=points.map(p=>`<button type="button" class="camp-map-marker camp-map-point" data-map-point="${escapeHtml(p.id)}" data-category="${escapeHtml(p.category||'services')}" data-name="${escapeHtml(t(p.name||''))}" style="left:${p.x}%;top:${p.y}%" title="${escapeHtml(t(p.name||''))}" aria-label="${escapeHtml(t(p.name||''))}"><span>${p.icon||'📍'}</span></button>`).join("");
  document.querySelector("#modalContent").innerHTML=`
    <div class="eyebrow dark">CAMPING DE CEYRESTE</div>
    <h2 class="modal-title">${t("🗺️ PLAN DU CAMPING")}</h2>
    <p class="modal-intro">${t("Explorez les principaux services et équipements. Votre location est visible uniquement pour vous.")}</p>
    <div class="camp-map-tools">
      <input id="campMapSearch" type="search" placeholder="🔎 Rechercher un lieu..." autocomplete="off">
      <div class="camp-map-filters" role="tablist">
        <button type="button" class="camp-map-filter active" data-filter="all">Tout</button>
        <button type="button" class="camp-map-filter" data-filter="services">Services</button>
        <button type="button" class="camp-map-filter" data-filter="loisirs">Loisirs</button>
      </div>
      <div class="camp-map-zoom"><button type="button" id="campMapMinus">−</button><button type="button" id="campMapReset">100%</button><button type="button" id="campMapPlus">＋</button></div>
    </div>
    <div class="camp-map-viewport" id="campMapViewport">
      <div class="camp-map-stage" id="campMapStage">
        <img src="${escapeHtml(PLAN_INTERACTIF.image)}" alt="Plan du camping" draggable="false">
        ${pointMarkers}
        ${locationMarker}
      </div>
    </div>
    <div class="camp-map-selected" id="campMapSelected">${selectedData ? `🏠 <b>Votre location : N° ${escapeHtml(selected)}</b> — ${selectedData.category ? renderAny(selectedData.category) : ""}` : "💡 Renseignez votre numéro dans « MA LOCATION » pour afficher votre propre location sur le plan."}</div>
    <div class="camp-map-legend"><span>📍 Touchez un point pour voir ses informations</span><span>🤏 Pincez / zoomez pour agrandir</span></div>
  `;
}

function initInteractiveMap(){
  const viewport=document.querySelector('#campMapViewport');
  const stage=document.querySelector('#campMapStage');
  if(!viewport || !stage) return;
  let scale=1, tx=0, ty=0, drag=false, sx=0, sy=0, startX=0, startY=0;
  let pinchStartDist=0, pinchStartScale=1;
  const clamp=()=>{
    const vw=viewport.clientWidth, vh=viewport.clientHeight;
    const sw=stage.scrollWidth*scale, sh=stage.scrollHeight*scale;
    const maxX=Math.max(0,(sw-vw)/2+40), maxY=Math.max(0,(sh-vh)/2+40);
    tx=Math.max(-maxX,Math.min(maxX,tx)); ty=Math.max(-maxY,Math.min(maxY,ty));
  };
  const apply=()=>{stage.style.transform=`translate3d(${tx}px,${ty}px,0) scale(${scale})`; document.querySelector('#campMapReset').textContent=Math.round(scale*100)+'%';};
  const setScale=(s,centerX=viewport.clientWidth/2,centerY=viewport.clientHeight/2)=>{
    const old=scale; scale=Math.max(1,Math.min(3.5,s));
    tx=centerX-(centerX-tx)*(scale/old); ty=centerY-(centerY-ty)*(scale/old); clamp(); apply();
  };
  document.querySelector('#campMapPlus')?.addEventListener('click',()=>setScale(scale+0.25));
  document.querySelector('#campMapMinus')?.addEventListener('click',()=>setScale(scale-0.25));
  document.querySelector('#campMapReset')?.addEventListener('click',()=>{scale=1;tx=0;ty=0;apply();});
  viewport.addEventListener('wheel',e=>{e.preventDefault();setScale(scale+(e.deltaY<0?.18:-.18),e.offsetX,e.offsetY)},{passive:false});
  viewport.addEventListener('pointerdown',e=>{
    if(e.pointerType==='touch') return;
    drag=true; sx=e.clientX; sy=e.clientY; startX=tx; startY=ty; viewport.setPointerCapture?.(e.pointerId);
  });
  viewport.addEventListener('pointermove',e=>{if(!drag)return;tx=startX+(e.clientX-sx);ty=startY+(e.clientY-sy);clamp();apply();});
  viewport.addEventListener('pointerup',()=>drag=false); viewport.addEventListener('pointercancel',()=>drag=false);
  viewport.addEventListener('touchstart',e=>{
    if(e.touches.length===2){pinchStartDist=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);pinchStartScale=scale;}
    else if(e.touches.length===1){sx=e.touches[0].clientX;sy=e.touches[0].clientY;startX=tx;startY=ty;}
  },{passive:true});
  viewport.addEventListener('touchmove',e=>{
    if(e.touches.length===2){
      e.preventDefault(); const d=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY); setScale(pinchStartScale*(d/pinchStartDist));
    } else if(e.touches.length===1){tx=startX+(e.touches[0].clientX-sx);ty=startY+(e.touches[0].clientY-sy);clamp();apply();}
  },{passive:false});
  const showPoint=(p)=>{
    const el=document.querySelector('#campMapSelected');
    if(!el)return;
    el.classList.add('camp-map-selected-active');
    el.innerHTML=`
      <div class="camp-map-point-title">${p.icon||'📍'} <b>${escapeHtml(t(p.name||''))}</b></div>
      <div class="camp-map-point-description">${escapeHtml(t(p.description||''))}</div>
    `;
    el.scrollIntoView({behavior:"smooth",block:"nearest"});
  };
  // Clics directs sur les marqueurs : plus fiable sur ordinateur ET téléphone.
  const handlePointClick=(marker,e)=>{
    e.preventDefault();
    e.stopPropagation();
    const p=(PLAN_INTERACTIF.points||[]).find(x=>String(x.id)===String(marker.dataset.mapPoint));
    if(p) showPoint(p);
  };
  const handleLocationClick=(marker,e)=>{
    e.preventDefault();
    e.stopPropagation();
    const n=marker.dataset.mapLocation;
    const mh=getSelectedMobileHome();
    const el=document.querySelector('#campMapSelected');
    if(el){
      el.classList.add('camp-map-selected-active');
      el.innerHTML=`<div class="camp-map-point-title">🏠 <b>${t("VOTRE LOCATION")} — N° ${escapeHtml(n)}</b></div><div class="camp-map-point-description">${mh?.category?renderAny(mh.category):''}</div>`;
      el.scrollIntoView({behavior:"smooth",block:"nearest"});
    }
  };

  const bindMarker=(marker, handler)=>{
    let downX=0, downY=0, moved=false;
    marker.addEventListener('pointerdown',e=>{
      downX=e.clientX; downY=e.clientY; moved=false;
      e.stopPropagation();
    });
    marker.addEventListener('pointermove',e=>{
      if(Math.hypot(e.clientX-downX,e.clientY-downY)>8) moved=true;
      e.stopPropagation();
    });
    marker.addEventListener('pointerup',e=>{
      e.preventDefault();
      e.stopPropagation();
      if(!moved) handler(marker,e);
    });
    marker.addEventListener('click',e=>{
      // Mouse fallback for browsers where pointerup is not followed by a click.
      e.preventDefault();
      e.stopPropagation();
      if(!moved) handler(marker,e);
    });
  };

  document.querySelectorAll('[data-map-point]').forEach(marker=>{
    bindMarker(marker,handlePointClick);
  });
  document.querySelectorAll('[data-map-location]').forEach(marker=>{
    bindMarker(marker,handleLocationClick);
  });
  const applyFilter=(filter,query='')=>{
    const q=query.trim().toLowerCase();
    document.querySelectorAll('.camp-map-point').forEach(el=>{const ok=(filter==='all'||el.dataset.category===filter) && (!q||el.dataset.name.toLowerCase().includes(q));el.classList.toggle('map-hidden',!ok);});
  };
  let filter='all';
  document.querySelectorAll('.camp-map-filter').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.camp-map-filter').forEach(b=>b.classList.remove('active'));btn.classList.add('active');filter=btn.dataset.filter;applyFilter(filter,document.querySelector('#campMapSearch').value);}));
  document.querySelector('#campMapSearch')?.addEventListener('input',e=>applyFilter(filter,e.target.value));
  apply();
}


function openPlanning(){
  const animation = CAMPING.today?.animation;
  const days = animation && Array.isArray(animation.days) ? animation.days : [];

  const safeColor=(value)=>{
    if(!value)return "";
    const named=["green","green-dark","blue","orange","red","purple","pink","teal","yellow","gray","dark","white"];
    if(named.includes(String(value).toLowerCase()))return String(value).toLowerCase();
    if(/^#[0-9a-fA-F]{3,8}$/.test(String(value)))return String(value);
    return "";
  };

  const eventHtml=(event)=>{
    const e=typeof event==="string"?{text:event}:event||{text:""};
    const color=safeColor(e.color);
    const custom=color && color.startsWith("#")?`style="--event-color:${color}"`:"";
    const cls=`event ${color && !color.startsWith("#")?`event-${color}`:""} ${e.bold?"event-bold":""} ${e.italic?"event-italic":""} ${e.size==="small"?"event-small":""} ${e.size==="large"?"event-large":""}`;
    return `<div class="${cls}" ${custom}>${renderText(e.text)}</div>`;
  };

  const weeklyHtml = days.length
    ? days.map(d=>`
        <div class="planning-day">
          <b>${renderText(d.day)}</b>
          <div>${Array.isArray(d.events) ? d.events.map(eventHtml).join("") : ""}</div>
        </div>
      `).join("")
    : `<p>Aucun programme d'animation n'est renseigné pour le moment.</p>`;

  const modal=document.querySelector("#modal");
  const content=document.querySelector("#modalContent");
  if(!modal || !content) return;

  content.innerHTML=`
    <div class="eyebrow dark">CAMPING DE CEYRESTE</div>
    <h2 class="modal-title">📅 ${t("Programme de la semaine")}</h2>
    <p class="modal-intro">${escapeHtml(t("Retrouvez toutes les animations de la semaine."))}</p>
    <div class="planning">${weeklyHtml}</div>
  `;
  modal.classList.remove("hidden");
}

function open(id){
  if(id==="planning"){
    const modal=document.querySelector("#modal");
    const content=document.querySelector("#modalContent");
    if(!modal || !content) return;
    content.innerHTML=`
      <div class="eyebrow dark">CAMPING DE CEYRESTE</div>
      <h2 class="modal-title">🎉 PROGRAMME D'ANIMATIONS</h2>
      ${renderProgrammeForDate(new Date())}
    `;
    modal.classList.remove("hidden");
    bindProgrammeTabs();
    if(window.__programmeTimer) clearInterval(window.__programmeTimer);
    window.__programmeTimer=setInterval(()=>{
      const active=document.querySelector(".programme-day.active")?.dataset.programmeDate;
      if(active===getProgrammeDateKey(new Date())){
        const holder=document.querySelector(".programme-page");
        if(holder){ holder.outerHTML=renderProgrammeForDate(new Date()); bindProgrammeTabs(); }
      }
    },60000);
    return;
  }
  openSection(id);
}

document.addEventListener("keydown",e=>{
  const el=e.target.closest(".today-mobile-home");
  if(el && (e.key==="Enter" || e.key===" ")){ e.preventDefault(); openSection("stay"); }
});

function setActiveNav(id){
  document.querySelectorAll('.bottom-nav button').forEach(b=>b.classList.remove('active'));
  const target = id === 'home' ? document.querySelector('[data-home]') : document.querySelector(`.bottom-nav [data-open="${id}"]`);
  target?.classList.add('active');
}

document.addEventListener("click",e=>{
  const dynamicPlanning=e.target.closest("[data-dynamic-planning]");
  if(dynamicPlanning){
    e.preventDefault();
    setActiveNav('planning');
    openPlanning();
    return;
  }
  const btn=e.target.closest("[data-open]");
  if(btn){
    const id=btn.dataset.open;
    // La barre reste identique et visible sur tous les écrans.
    if(btn.closest('.bottom-nav')) setActiveNav(id);
    open(id);
  }
  if(e.target.closest("[data-home]")){
    setActiveNav('home');
    document.querySelector("#modal").classList.add("hidden");
  }
});
document.querySelector("#closeModal").onclick=()=>document.querySelector("#modal").classList.add("hidden");
document.querySelector("#modal").addEventListener("click",e=>{if(e.target===document.querySelector("#modal"))document.querySelector("#modal").classList.add("hidden")});
document.querySelector("#menuBtn").onclick=()=>document.querySelector("#drawer").classList.remove("hidden");
document.querySelector("#closeDrawer").onclick=()=>document.querySelector("#drawer").classList.add("hidden");
document.querySelector("#drawer").addEventListener("click",e=>{
  const btn=e.target.closest("[data-open]");
  if(btn){open(btn.dataset.open);document.querySelector("#drawer").classList.add("hidden");}
  if(e.target===document.querySelector("#drawer"))document.querySelector("#drawer").classList.add("hidden");
});


let deferredPrompt;
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredPrompt=e;document.querySelector("#installBtn").hidden=false;});
document.querySelector("#installBtn").onclick=async()=>{
  if(!deferredPrompt)return;
  deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;document.querySelector("#installBtn").hidden=true;
};
if("serviceWorker" in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js"));


if(typeof TRANSLATIONS!=="undefined"){
 const EXTRA_TRANSLATIONS={
  en:{"Aucun programme d'animation n'est renseigné pour le moment.":"No entertainment programme is currently available.","Programme de la semaine":"Weekly schedule","VOIR LE PROGRAMME →":"VIEW THE PROGRAMME →","PROGRAMME D'ANIMATION DU JOUR":"TODAY'S ENTERTAINMENT PROGRAMME","Aucune animation prévue aujourd'hui":"No activities planned today","Profitez pleinement de votre journée au Camping de Ceyreste !":"Enjoy your day at Camping de Ceyreste!"},
  de:{"Aucun programme d'animation n'est renseigné pour le moment.":"Derzeit ist kein Animationsprogramm eingetragen.","Programme de la semaine":"Wochenprogramm","VOIR LE PROGRAMME →":"PROGRAMM ANSEHEN →","PROGRAMME D'ANIMATION DU JOUR":"HEUTIGES ANIMATIONSPROGRAMM","Aucune animation prévue aujourd'hui":"Heute sind keine Aktivitäten geplant","Profitez pleinement de votre journée au Camping de Ceyreste !":"Genießen Sie Ihren Tag auf dem Campingplatz Ceyreste!"},
  es:{"Aucun programme d'animation n'est renseigné pour le moment.":"No hay programa de animación disponible.","Programme de la semaine":"Programa semanal","VOIR LE PROGRAMME →":"VER EL PROGRAMA →","PROGRAMME D'ANIMATION DU JOUR":"PROGRAMA DE ANIMACIÓN DE HOY","Aucune animation prévue aujourd'hui":"No hay actividades previstas hoy","Profitez pleinement de votre journée au Camping de Ceyreste !":"¡Disfruta de tu día en el Camping de Ceyreste!"},
  nl:{"Aucun programme d'animation n'est renseigné pour le moment.":"Er is momenteel geen animatieprogramma beschikbaar.","Programme de la semaine":"Weekprogramma","VOIR LE PROGRAMME →":"BEKIJK HET PROGRAMMA →","PROGRAMME D'ANIMATION DU JOUR":"ANIMATIEPROGRAMMA VAN VANDAAG","Aucune animation prévue aujourd'hui":"Vandaag zijn er geen activiteiten gepland","Profitez pleinement de votre journée au Camping de Ceyreste!":"Geniet van uw dag op Camping de Ceyreste!"},
  it:{"Aucun programme d'animation n'est renseigné pour le moment.":"Al momento non è disponibile alcun programma di animazione.","Programme de la semaine":"Programma settimanale","VOIR LE PROGRAMME →":"VEDI IL PROGRAMMA →","PROGRAMME D'ANIMATION DU JOUR":"PROGRAMMA DI ANIMAZIONE DI OGGI","Aucune animation prévue aujourd'hui":"Nessuna attività prevista oggi","Profitez pleinement de votre journée au Camping de Ceyreste!":"Goditi la tua giornata al Camping de Ceyreste!"}
 };
 Object.entries(EXTRA_TRANSLATIONS).forEach(([l,v])=>Object.assign(TRANSLATIONS[l]||{},v));
}


if(typeof TRANSLATIONS!=="undefined"){
 const GREETING_TRANSLATIONS={
  en:{"BONJOUR !":"GOOD MORNING!","BONSOIR !":"GOOD EVENING!","Une belle journée vous attend au Camping de Ceyreste 🌿":"A beautiful day awaits you at Camping de Ceyreste 🌿","Profitez bien de votre après-midi au camping ☀️":"Enjoy your afternoon at the campsite ☀️","Une belle soirée vous attend ✨":"A lovely evening awaits you ✨","La journée touche à sa fin 🌙":"The day is coming to an end 🌙","PROCHAINE ANIMATION":"NEXT ACTIVITY"},
  de:{"BONJOUR !":"GUTEN MORGEN!","BONSOIR !":"GUTEN ABEND!","Une belle journée vous attend au Camping de Ceyreste 🌿":"Ein schöner Tag erwartet Sie auf dem Campingplatz Ceyreste 🌿","Profitez bien de votre après-midi au camping ☀️":"Genießen Sie Ihren Nachmittag auf dem Campingplatz ☀️","Une belle soirée vous attend ✨":"Ein schöner Abend erwartet Sie ✨","La journée touche à sa fin 🌙":"Der Tag geht zu Ende 🌙","PROCHAINE ANIMATION":"NÄCHSTE AKTIVITÄT"},
  es:{"BONJOUR !":"¡BUENOS DÍAS!","BONSOIR !":"¡BUENAS TARDES!","Une belle journée vous attend au Camping de Ceyreste 🌿":"Un bonito día te espera en el Camping de Ceyreste 🌿","Profitez bien de votre après-midi au camping ☀️":"Disfruta de tu tarde en el camping ☀️","Une belle soirée vous attend ✨":"Una bonita noche te espera ✨","La journée touche à sa fin 🌙":"El día llega a su fin 🌙","PROCHAINE ANIMATION":"PRÓXIMA ACTIVIDAD"},
  nl:{"BONJOUR !":"GOEDEMORGEN!","BONSOIR !":"GOEDENAVOND!","Une belle journée vous attend au Camping de Ceyreste 🌿":"Een mooie dag wacht op u op Camping de Ceyreste 🌿","Profitez bien de votre après-midi au camping ☀️":"Geniet van uw middag op de camping ☀️","Une belle soirée vous attend ✨":"Een mooie avond wacht op u ✨","La journée touche à sa fin 🌙":"De dag loopt ten einde 🌙","PROCHAINE ANIMATION":"VOLGENDE ACTIVITEIT"},
  it:{"BONJOUR !":"BUONGIORNO!","BONSOIR !":"BUONASERA!","Une belle journée vous attend au Camping de Ceyreste 🌿":"Una splendida giornata vi aspetta al Camping de Ceyreste 🌿","Profitez bien de votre après-midi au camping ☀️":"Godetevi il pomeriggio al campeggio ☀️","Une belle soirée vous attend ✨":"Una splendida serata vi aspetta ✨","La journée touche à sa fin 🌙":"La giornata volge al termine 🌙","PROCHAINE ANIMATION":"PROSSIMA ATTIVITÀ"}
 };
 Object.entries(GREETING_TRANSLATIONS).forEach(([l,v])=>Object.assign(TRANSLATIONS[l]||{},v));
}

initLanguage();
renderToday();
renderDrawer();
dynamicWelcomeMount();
translateStaticDom();
setInterval(refreshTodayStatuses, 60000);
refreshTodayStatuses();

(function initDynamicWelcome(){
  const start=()=>{ dynamicWelcomeMount(); setInterval(dynamicWelcomeMount,60000); };
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",start);
  else start();
})();
