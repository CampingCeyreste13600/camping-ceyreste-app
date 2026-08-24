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
  renderSocials();
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


function miniBlockPlainText(value){
  if(value && typeof value==="object" && value.__styledText) return String(value.text||"");
  return String(value??"");
}
function miniBlockIcon(title){
  const t=miniBlockPlainText(title).toLowerCase();
  if(t.includes("horaire") || t.includes("ouverture")) return "🕐";
  if(t.includes("réservation") || t.includes("reservation") || t.includes("contact")) return "📞";
  if(t.includes("règle") || t.includes("reglement") || t.includes("règlement")) return "📋";
  if(t.includes("formal") || t.includes("départ") || t.includes("depart")) return "🧹";
  if(t.includes("carte")) return "📖";
  if(t.includes("information")) return "ℹ️";
  if(t.includes("installation")) return "🏊";
  return "ℹ️";
}
function renderMiniInfoBlock(block){
  const title=block?.[0];
  const content=block?.[1];
  const icon=(block && block[2]) || miniBlockIcon(title);
  return `<article class="mini-info-block">
    <div class="mini-info-icon">${icon}</div>
    <div class="mini-info-content">
      <div class="mini-info-title">${renderText(title)}</div>
      <div class="mini-info-text">${renderText(content)}</div>
    </div>
  </article>`;
}
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


/* ============================================================
   📲 RÉSEAUX SOCIAUX — Facebook + Instagram
   ============================================================
   Les liens sont ici, dans app.js, pour ne pas modifier config.js.
   Si tu connais les URLs exactes des pages du camping, remplace
   simplement les deux URLs ci-dessous.
*/
const CEYRESTE_SOCIALS = {
  facebook: "https://www.facebook.com/search/top?q=Camping%20de%20Ceyreste",
  instagram: "https://www.instagram.com/explore/search/keyword/?q=Camping%20de%20Ceyreste"
};

function renderSocials(){
  const host=document.querySelector("#socialsCard");
  if(!host) return;
  host.innerHTML=`
    <div class="socials-head">
      <div>
        <div class="eyebrow dark">${escapeHtml(t("NOUS SUIVRE"))}</div>
        <h2>${escapeHtml(t("Restez connectés"))}</h2>
        <p>${escapeHtml(t("Retrouvez nos actualités, photos, vidéos et les nouveautés du camping."))}</p>
      </div>
      <div class="socials-main-icon">📲</div>
    </div>
    <div class="socials-buttons">
      <a class="social-button facebook" href="${CEYRESTE_SOCIALS.facebook}" target="_blank" rel="noopener noreferrer">
        <span class="social-icon">f</span>
        <span><strong>Facebook</strong><small>${escapeHtml(t("Voir notre page"))}</small></span>
        <span class="social-arrow">↗</span>
      </a>
      <a class="social-button instagram" href="${CEYRESTE_SOCIALS.instagram}" target="_blank" rel="noopener noreferrer">
        <span class="social-icon instagram-glyph">◎</span>
        <span><strong>Instagram</strong><small>${escapeHtml(t("Voir nos photos et vidéos"))}</small></span>
        <span class="social-arrow">↗</span>
      </a>
    </div>
    <div class="socials-footer">📸 ${escapeHtml(t("Partagez vos vacances et identifiez-nous !"))}</div>
  `;
}
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
renderSocials();

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
    ? `<div class="mini-info-list">${(section.blocks || []).map(b=>renderMiniInfoBlock(b)).join("")}</div>
      ${section.conclusion ? `<div class="info-conclusion">${renderText(section.conclusion).replace(/\\n/g,"<br>")}</div>` : ""}`
    : `<div class="mini-info-list">${(section.blocks || []).map(b=>renderMiniInfoBlock(b)).join("")}</div>`;

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
 const EXTRA_TRANSLATIONS = {"en":{"Bienvenue au camping":"Welcome to the campsite","Mobilhome LA CIOTAT":"LA CIOTAT Mobile Home","La Ciotat":"La Ciotat","4 personnes":"4 people","2 chambres":"2 bedrooms","À partir de 15h30":"From 3:30 pm","Entre 8h et 10h, après avoir réalisé l'état des lieux de sortie (voir avec la réception)":"Between 8 am and 10 am, after completing the check-out inspection (ask reception)","1 véhicule autorisé sur l'emplacement":"1 vehicle allowed on the pitch","Calme après 23h s'il vous plait":"Quiet after 11 pm, please","Mobilhome CASSIS":"CASSIS Mobile Home","2 personnes":"2 people","1 chambre":"1 bedroom","Mobilhome FIGUEROLLES":"FIGUEROLLES Mobile Home","Mobilhome PORT MIOU":"PORT MIOU Mobile Home","Port Miou":"Port Miou","6 personnes":"6 people","3 chambres":"3 bedrooms","Mobilhome PORT PIN":"PORT PIN Mobile Home","Port Pin":"Port Pin","Draps Inclus":"Bed linen included","Lave vaisselle intégré":"Integrated dishwasher","Mobilhome EN VAU":"EN VAU Mobile Home","En Vau":"En Vau","Mobilhome PREMIUM":"PREMIUM Mobile Home","1 véhicule autorisé sur le parking réservé":"1 vehicle allowed in the reserved parking area","Draps et serviettes Inclus":"Bed linen and towels included","Plancha à gaz":"Gas griddle","Forfait ménage inclus":"Cleaning package included","2 Salles de bain":"2 bathrooms","Tente Jenya":"Jenya Tent","Tente Kenya":"Kenya Tent","5 personnes":"5 people","Accès aux sanitaires":"Access to sanitary facilities","Emplacement nature":"Nature pitch","À partir de 14h00":"From 2 pm","Avant 12h00":"Before 12 pm","Electricité et Eau sur chaque emplacement":"Electricity and water on every pitch","Réception":"Reception","Accueil, renseignements et services du camping.":"Reception, information and campsite services.","Espace aquatique":"Water park","Piscines et espace aquatique du camping.":"Campsite pools and water park.","Snack / Restaurant":"Snack / Restaurant","Restaurant et snack du camping.":"Campsite restaurant and snack bar.","Épicerie":"Grocery shop","Épicerie située au niveau de la réception.":"Grocery shop located by reception.","Parking du camping.":"Campsite parking.","Aire de jeux":"Playground","Aire de jeux.":"Playground.","Ping Pong":"Table tennis","Tables de ping-pong.":"Table tennis tables.","Terrain multisports.":"Multi-sports court.","Pétanque":"Pétanque","Terrain de pétanque.":"Pétanque court.","Trampoline + Accrobranche":"Trampoline + Tree climbing","Trampoline à élastique.":"Bungee trampoline.","Accrobranche / Acro Games.":"Tree climbing / Acro Games.","Sanitaires 1":"Sanitary facilities 1","Sanitaires composés de WC, douches, lavabos,....":"Facilities with toilets, showers, sinks, etc.","Sanitaires 2":"Sanitary facilities 2","Camping de Ceyreste":"Camping de Ceyreste","Ceyreste • La Ciotat • Provence":"Ceyreste • La Ciotat • Provence","Que les vacances commençent !":"Let the holiday begin!","Profitez pleinement de votre séjour":"Make the most of your stay","Toutes les infos du camping directement à portée de main.":"All campsite information at your fingertips.","AUJOURD'HUI AU CAMPING":"TODAY AT THE CAMPSITE","Ma location":"My accommodation","Indiquez votre numéro dans MA LOCATION":"Enter your accommodation number in MY ACCOMMODATION","Horaires selon la période":"Opening hours vary by period","Ouverte ✔️":"Open ✔️","Espace Aquatique":"Water Park","Ouvert ✔️":"Open ✔️","Toute la journée en juillet-août / à partir de 17H le reste de l'année":"All day in July-August / from 5 pm the rest of the year","08H-20H (dans la réception)":"8 am-8 pm (at reception)","PROGRAMME D'ANIMATION DU JOUR":"TODAY'S ENTERTAINMENT PROGRAMME","Aucune animation prévue aujourd'hui":"No activities planned today","Animations & planning":"Entertainment & schedule","Piscines, toboggans & horaires":"Pools, slides & opening hours","Carte, horaires":"Map, opening hours","Toutes vos informations concernant votre séjour":"All the information about your stay","Les règles du camping":"Campsite rules","Découvrir le camping":"Discover the campsite","Activités & lieux incontournables":"Activities & must-see places","Activités locales":"Local activities","Toutes nos locations et suppléments à retrouver ici":"All our rentals and extras can be found here","MON DÉPART":"MY DEPARTURE","Les dernières étapes avant de partir":"The final steps before leaving","🏊 ESPACE AQUATIQUE":"🏊 WATER PARK","Découvrez nos piscines et nos toboggans, pour le bonheur des petits et des plus grands.":"Discover our pools and slides, for the enjoyment of young and old.","Basse Saison: 10h-19h\n Juillet-Août: 10h-20h":"Low season: 10 am-7 pm\n July-August: 10 am-8 pm","Les shorts de bain NE SONT PAS AUTORISES. Respectez les consignes affichées et SURVEILLEZ vos enfants.":"SWIM SHORTS ARE NOT ALLOWED. Please follow the posted rules and SUPERVISE your children.","🍽️ RESTAURANT":"🍽️ RESTAURANT","Nathalie et toute son équipe vous accueillent pendant la saison.":"Nathalie and her team welcome you during the season.","Toute la journée en haute saison (juillet-aôut) et à partir de 17h le reste de l'année":"All day in high season (July-August) and from 5 pm the rest of the year","Il est plus que préférable de réserver. Pensez y et allez voir directement le personnel du restaurant.":"Reservations are strongly recommended. Please contact the restaurant staff directly.","📝 RECEPTION":"📝 RECEPTION","Les services pratiques du camping.":"Practical campsite services.","Il vous manque quelque chose ? Envie d'une petite gourmandise ? Notre épicerie est la pour vous.":"Missing something? Fancy a little treat? Our grocery shop is here for you.","📖 REGLEMENT DU CAMPING":"📖 CAMPSITE RULES","Merci de respecter ces règles afin que chacun profite de vacances agréables.":"Please respect these rules so everyone can enjoy a pleasant holiday.","Camping familial et calme. Merci de respecter le calme APRES 23h.":"Family-friendly and quiet campsite. Please keep quiet AFTER 11 pm.","Merci de respecter les capacités maximum de votre location (2, 4 ou 6personnes)":"Please respect the maximum capacity of your accommodation (2, 4 or 6 people).","Un adulte est obligatoire dans chaque mobil-home. Les mineurs ne doivent pas être laissés sans surveillance.":"An adult is required in each mobile home. Minors must not be left unsupervised.","Les mobil-homes doivent être rendus propres avant 10h. Un état des lieux de sortie sera à réaliser. Appelez-nous quand vous êtes prêts !":"Mobile homes must be left clean before 10 am. A check-out inspection must be carried out. Call us when you are ready!","Les animaux doivent être tenus sous contrôle et respecter les règles du camping.":"Pets must be kept under control and follow the campsite rules.","Merci de respecter les espaces communs, sanitaires et zones de tri.":"Please respect the common areas, sanitary facilities and waste-sorting areas.","CONSIGNES D'EVACUATION":"EVACUATION INSTRUCTIONS","🗺️ PLAN DU CAMPING":"🗺️ CAMPSITE MAP","Repérez facilement les principaux services et équipements.":"Easily locate the main services and facilities.","📍 Points importants":"📍 Important locations","📍 A DECOUVRIR":"📍 DISCOVER","Dernières étapes avant de partir":"Final steps before leaving","🚲 NOS PARTENAIRES":"🚲 OUR PARTNERS","Retrouvez ici les activités partenaires recommandées par le camping.":"Here you will find partner activities recommended by the campsite.","Location de vélos":"Bike rental","Location de scooters":"Scooter rental","Location de quad":"Quad rental","Location Kayak":"Kayak rental","Salles d'escalade":"Climbing gyms","Location Voiture":"Car rental","Visites des Calanques":"Calanques tours","Plongée":"Diving","Visites des Calanques en Bateau":"Calanques boat tours","Vous avez oublié quelque chose ? Vous avez besoin de quelque chose ?":"Forgot something? Need something?","🔔 Infos du camping":"🔔 Campsite information","📢 Information":"📢 Information","🧳 MON DÉPART":"🧳 MY DEPARTURE","Les dernières étapes avant de prendre la route 👋":"The final steps before hitting the road 👋","HEURE DE DÉPART":"DEPARTURE TIME","Votre hébergement doit être libéré avant 10h00.":"Your accommodation must be vacated before 10 am.","HÉBERGEMENT":"ACCOMMODATION","DÉCHETS":"WASTE","CLÉS":"KEYS","DERNIÈRES VÉRIFICATIONS":"FINAL CHECKS","🏕️ MA LOCATION":"🏕️ MY ACCOMMODATION","Restez connectés":"Stay connected","NOUS SUIVRE":"FOLLOW US","Voir notre page":"View our page","Voir nos photos et vidéos":"See our photos and videos","Partagez vos vacances et identifiez-nous !":"Share your holiday and tag us!"},"de":{"Bienvenue au camping":"Willkommen auf dem Campingplatz","Mobilhome LA CIOTAT":"Mobilheim LA CIOTAT","La Ciotat":"La Ciotat","4 personnes":"4 Personen","2 chambres":"2 Schlafzimmer","À partir de 15h30":"Ab 15:30 Uhr","Entre 8h et 10h, après avoir réalisé l'état des lieux de sortie (voir avec la réception)":"Zwischen 8 und 10 Uhr, nach Durchführung der Abreiseinspektion (an der Rezeption nachfragen)","1 véhicule autorisé sur l'emplacement":"1 Fahrzeug auf dem Stellplatz erlaubt","Calme après 23h s'il vous plait":"Bitte ab 23 Uhr Ruhe","Mobilhome CASSIS":"Mobilheim CASSIS","2 personnes":"2 Personen","1 chambre":"1 Schlafzimmer","Mobilhome FIGUEROLLES":"Mobilheim FIGUEROLLES","Mobilhome PORT MIOU":"Mobilheim PORT MIOU","Port Miou":"Port Miou","6 personnes":"6 Personen","3 chambres":"3 Schlafzimmer","Mobilhome PORT PIN":"Mobilheim PORT PIN","Port Pin":"Port Pin","Draps Inclus":"Bettwäsche inklusive","Lave vaisselle intégré":"Integrierte Spülmaschine","Mobilhome EN VAU":"Mobilheim EN VAU","En Vau":"En Vau","Mobilhome PREMIUM":"PREMIUM Mobilheim","1 véhicule autorisé sur le parking réservé":"1 Fahrzeug auf dem reservierten Parkplatz erlaubt","Draps et serviettes Inclus":"Bettwäsche und Handtücher inklusive","Plancha à gaz":"Gas-Plancha","Forfait ménage inclus":"Endreinigung inklusive","2 Salles de bain":"2 Badezimmer","Tente Jenya":"Jenya Tent","Tente Kenya":"Kenya-Zelt","5 personnes":"5 Personen","Accès aux sanitaires":"Zugang zu den Sanitäranlagen","Emplacement nature":"Naturstellplatz","À partir de 14h00":"Ab 14:00 Uhr","Avant 12h00":"Vor 12:00 Uhr","Electricité et Eau sur chaque emplacement":"Strom und Wasser auf jedem Stellplatz","Réception":"Rezeption","Accueil, renseignements et services du camping.":"Empfang, Informationen und Campingplatz-Services.","Espace aquatique":"Wasserpark","Piscines et espace aquatique du camping.":"Pools und Wasserbereich des Campingplatzes.","Snack / Restaurant":"Snack / Restaurant","Restaurant et snack du camping.":"Restaurant und Snackbar des Campingplatzes.","Épicerie":"Minimarkt","Épicerie située au niveau de la réception.":"Minimarkt bei der Rezeption.","Parking du camping.":"Parkplatz des Campingplatzes.","Aire de jeux":"Spielplatz","Aire de jeux.":"Spielplatz.","Ping Pong":"Tischtennis","Tables de ping-pong.":"Tischtennisplatten.","Terrain multisports.":"Multisportplatz.","Pétanque":"Boule","Terrain de pétanque.":"Bouleplatz.","Trampoline + Accrobranche":"Trampolin + Hochseilgarten","Trampoline à élastique.":"Bungee-Trampolin.","Accrobranche / Acro Games.":"Hochseilgarten / Acro Games.","Sanitaires 1":"Sanitäranlagen 1","Sanitaires composés de WC, douches, lavabos,....":"Sanitäranlagen mit Toiletten, Duschen, Waschbecken usw.","Sanitaires 2":"Sanitäranlagen 2","Camping de Ceyreste":"Camping de Ceyreste","Ceyreste • La Ciotat • Provence":"Ceyreste • La Ciotat • Provence","Que les vacances commençent !":"Der Urlaub kann beginnen!","Profitez pleinement de votre séjour":"Genießen Sie Ihren Aufenthalt in vollen Zügen","Toutes les infos du camping directement à portée de main.":"Alle Informationen zum Campingplatz direkt zur Hand.","AUJOURD'HUI AU CAMPING":"HEUTE AUF DEM CAMPINGPLATZ","Ma location":"Meine Unterkunft","Indiquez votre numéro dans MA LOCATION":"Geben Sie Ihre Unterkunftsnummer unter MEINE UNTERKUNFT ein","Horaires selon la période":"Öffnungszeiten je nach Zeitraum","Ouverte ✔️":"Geöffnet ✔️","Espace Aquatique":"Wasserpark","Ouvert ✔️":"Geöffnet ✔️","Toute la journée en juillet-août / à partir de 17H le reste de l'année":"Den ganzen Tag im Juli-August / ab 17 Uhr den Rest des Jahres","08H-20H (dans la réception)":"8-20 Uhr (an der Rezeption)","PROGRAMME D'ANIMATION DU JOUR":"HEUTIGES ANIMATIONSPROGRAMM","Aucune animation prévue aujourd'hui":"Heute sind keine Aktivitäten geplant","Animations & planning":"Animation & Programm","Piscines, toboggans & horaires":"Pools, Rutschen & Öffnungszeiten","Carte, horaires":"Karte, Öffnungszeiten","Toutes vos informations concernant votre séjour":"Alle Informationen zu Ihrem Aufenthalt","Les règles du camping":"Campingplatzregeln","Découvrir le camping":"Campingplatz entdecken","Activités & lieux incontournables":"Aktivitäten & Sehenswürdigkeiten","Activités locales":"Lokale Aktivitäten","Toutes nos locations et suppléments à retrouver ici":"Alle unsere Mietangebote und Extras finden Sie hier","MON DÉPART":"MEINE ABREISE","Les dernières étapes avant de partir":"Die letzten Schritte vor der Abreise","🏊 ESPACE AQUATIQUE":"🏊 WASSERPARK","Découvrez nos piscines et nos toboggans, pour le bonheur des petits et des plus grands.":"Entdecken Sie unsere Pools und Rutschen – Freude für Groß und Klein.","Basse Saison: 10h-19h\n Juillet-Août: 10h-20h":"Nebensaison: 10-19 Uhr\n Juli-August: 10-20 Uhr","Les shorts de bain NE SONT PAS AUTORISES. Respectez les consignes affichées et SURVEILLEZ vos enfants.":"BADESHORTS SIND NICHT ERLAUBT. Bitte beachten Sie die ausgeschilderten Regeln und BEAUFSICHTIGEN Sie Ihre Kinder.","🍽️ RESTAURANT":"🍽️ RESTAURANT","Nathalie et toute son équipe vous accueillent pendant la saison.":"Nathalie und ihr Team begrüßen Sie während der Saison.","Toute la journée en haute saison (juillet-aôut) et à partir de 17h le reste de l'année":"Den ganzen Tag in der Hochsaison (Juli-August) und ab 17 Uhr den Rest des Jahres","Il est plus que préférable de réserver. Pensez y et allez voir directement le personnel du restaurant.":"Eine Reservierung wird dringend empfohlen. Bitte wenden Sie sich direkt an das Restaurantpersonal.","📝 RECEPTION":"📝 REZEPTION","Les services pratiques du camping.":"Praktische Services des Campingplatzes.","Il vous manque quelque chose ? Envie d'une petite gourmandise ? Notre épicerie est la pour vous.":"Fehlt Ihnen etwas? Lust auf eine kleine Leckerei? Unser Minimarkt ist für Sie da.","📖 REGLEMENT DU CAMPING":"📖 CAMPINGPLATZREGELN","Merci de respecter ces règles afin que chacun profite de vacances agréables.":"Bitte beachten Sie diese Regeln, damit alle einen angenehmen Urlaub genießen können.","Camping familial et calme. Merci de respecter le calme APRES 23h.":"Familienfreundlicher und ruhiger Campingplatz. Bitte halten Sie NACH 23 Uhr Ruhe.","Merci de respecter les capacités maximum de votre location (2, 4 ou 6personnes)":"Bitte beachten Sie die maximale Belegung Ihrer Unterkunft (2, 4 oder 6 Personen).","Un adulte est obligatoire dans chaque mobil-home. Les mineurs ne doivent pas être laissés sans surveillance.":"In jedem Mobilheim muss ein Erwachsener anwesend sein. Minderjährige dürfen nicht unbeaufsichtigt gelassen werden.","Les mobil-homes doivent être rendus propres avant 10h. Un état des lieux de sortie sera à réaliser. Appelez-nous quand vous êtes prêts !":"Mobilheime müssen vor 10 Uhr sauber übergeben werden. Eine Abreiseinspektion ist durchzuführen. Rufen Sie uns an, wenn Sie bereit sind!","Les animaux doivent être tenus sous contrôle et respecter les règles du camping.":"Tiere müssen unter Kontrolle gehalten werden und die Campingplatzregeln beachten.","Merci de respecter les espaces communs, sanitaires et zones de tri.":"Bitte respektieren Sie die Gemeinschaftsbereiche, Sanitäranlagen und Mülltrennbereiche.","CONSIGNES D'EVACUATION":"EVAKUIERUNGSANWEISUNGEN","🗺️ PLAN DU CAMPING":"🗺️ CAMPINGPLATZPLAN","Repérez facilement les principaux services et équipements.":"Finden Sie die wichtigsten Services und Einrichtungen ganz einfach.","📍 Points importants":"📍 Wichtige Orte","📍 A DECOUVRIR":"📍 ENTDECKEN","Dernières étapes avant de partir":"Letzte Schritte vor der Abreise","🚲 NOS PARTENAIRES":"🚲 UNSERE PARTNER","Retrouvez ici les activités partenaires recommandées par le camping.":"Hier finden Sie vom Campingplatz empfohlene Partneraktivitäten.","Location de vélos":"Fahrradverleih","Location de scooters":"Rollerverleih","Location de quad":"Quad-Verleih","Location Kayak":"Kajakverleih","Salles d'escalade":"Kletterhallen","Location Voiture":"Autovermietung","Visites des Calanques":"Calanques-Ausflüge","Plongée":"Tauchen","Visites des Calanques en Bateau":"Bootstouren zu den Calanques","Vous avez oublié quelque chose ? Vous avez besoin de quelque chose ?":"Etwas vergessen? Brauchen Sie etwas?","🔔 Infos du camping":"🔔 Informationen zum Campingplatz","📢 Information":"📢 Information","🧳 MON DÉPART":"🧳 MEINE ABREISE","Les dernières étapes avant de prendre la route 👋":"Die letzten Schritte vor der Abreise 👋","HEURE DE DÉPART":"ABFAHRTSZEIT","Votre hébergement doit être libéré avant 10h00.":"Ihre Unterkunft muss vor 10 Uhr geräumt sein.","HÉBERGEMENT":"UNTERKUNFT","DÉCHETS":"ABFALL","CLÉS":"SCHLÜSSEL","DERNIÈRES VÉRIFICATIONS":"LETZTE KONTROLLEN","🏕️ MA LOCATION":"🏕️ MEINE UNTERKUNFT","Restez connectés":"Bleiben Sie verbunden","NOUS SUIVRE":"UNS FOLGEN","Voir notre page":"Unsere Seite ansehen","Voir nos photos et vidéos":"Unsere Fotos und Videos ansehen","Partagez vos vacances et identifiez-nous !":"Teilen Sie Ihren Urlaub und markieren Sie uns!"},"es":{"Bienvenue au camping":"Bienvenido al camping","Mobilhome LA CIOTAT":"Mobilhome LA CIOTAT","La Ciotat":"La Ciotat","4 personnes":"4 personas","2 chambres":"2 dormitorios","À partir de 15h30":"A partir de las 15:30","Entre 8h et 10h, après avoir réalisé l'état des lieux de sortie (voir avec la réception)":"Entre las 8:00 y las 10:00, después de realizar el inventario de salida (consultar en recepción)","1 véhicule autorisé sur l'emplacement":"1 vehículo permitido en la parcela","Calme après 23h s'il vous plait":"Silencio después de las 23:00, por favor","Mobilhome CASSIS":"Mobilhome CASSIS","2 personnes":"2 personas","1 chambre":"1 dormitorio","Mobilhome FIGUEROLLES":"Mobilhome FIGUEROLLES","Mobilhome PORT MIOU":"Mobilhome PORT MIOU","Port Miou":"Port Miou","6 personnes":"6 personas","3 chambres":"3 dormitorios","Mobilhome PORT PIN":"Mobilhome PORT PIN","Port Pin":"Port Pin","Draps Inclus":"Sábanas incluidas","Lave vaisselle intégré":"Lavavajillas integrado","Mobilhome EN VAU":"Mobilhome EN VAU","En Vau":"En Vau","Mobilhome PREMIUM":"Mobilhome PREMIUM","1 véhicule autorisé sur le parking réservé":"1 vehículo permitido en el aparcamiento reservado","Draps et serviettes Inclus":"Sábanas y toallas incluidas","Plancha à gaz":"Plancha de gas","Forfait ménage inclus":"Limpieza final incluida","2 Salles de bain":"2 baños","Tente Jenya":"Jenya Tent","Tente Kenya":"Tienda Kenya","5 personnes":"5 personas","Accès aux sanitaires":"Acceso a los sanitarios","Emplacement nature":"Parcela natural","À partir de 14h00":"A partir de las 14:00","Avant 12h00":"Antes de las 12:00","Electricité et Eau sur chaque emplacement":"Electricidad y agua en cada parcela","Réception":"Recepción","Accueil, renseignements et services du camping.":"Recepción, información y servicios del camping.","Espace aquatique":"Parque acuático","Piscines et espace aquatique du camping.":"Piscinas y parque acuático del camping.","Snack / Restaurant":"Snack / Restaurante","Restaurant et snack du camping.":"Restaurante y snack bar del camping.","Épicerie":"Tienda de comestibles","Épicerie située au niveau de la réception.":"Tienda situada junto a la recepción.","Parking du camping.":"Aparcamiento del camping.","Aire de jeux":"Zona de juegos","Aire de jeux.":"Zona de juegos.","Ping Pong":"Tenis de mesa","Tables de ping-pong.":"Mesas de tenis de mesa.","Terrain multisports.":"Pista multideportiva.","Pétanque":"Petanca","Terrain de pétanque.":"Pista de petanca.","Trampoline + Accrobranche":"Trampolín + Aventura en los árboles","Trampoline à élastique.":"Trampolín elástico.","Accrobranche / Acro Games.":"Aventura en los árboles / Acro Games.","Sanitaires 1":"Sanitarios 1","Sanitaires composés de WC, douches, lavabos,....":"Instalaciones con baños, duchas, lavabos, etc.","Sanitaires 2":"Sanitarios 2","Camping de Ceyreste":"Camping de Ceyreste","Ceyreste • La Ciotat • Provence":"Ceyreste • La Ciotat • Provence","Que les vacances commençent !":"¡Que empiecen las vacaciones!","Profitez pleinement de votre séjour":"Disfrute plenamente de su estancia","Toutes les infos du camping directement à portée de main.":"Toda la información del camping al alcance de la mano.","AUJOURD'HUI AU CAMPING":"HOY EN EL CAMPING","Ma location":"Mi alojamiento","Indiquez votre numéro dans MA LOCATION":"Indique su número en MI ALOJAMIENTO","Horaires selon la période":"Horarios según el período","Ouverte ✔️":"Abierto ✔️","Espace Aquatique":"Parque Acuático","Ouvert ✔️":"Abierto ✔️","Toute la journée en juillet-août / à partir de 17H le reste de l'année":"Todo el día en julio-agosto / a partir de las 17:00 el resto del año","08H-20H (dans la réception)":"8:00-20:00 (en recepción)","PROGRAMME D'ANIMATION DU JOUR":"PROGRAMA DE ANIMACIÓN DE HOY","Aucune animation prévue aujourd'hui":"Hoy no hay actividades previstas","Animations & planning":"Animación y programa","Piscines, toboggans & horaires":"Piscinas, toboganes y horarios","Carte, horaires":"Mapa, horarios","Toutes vos informations concernant votre séjour":"Toda la información sobre su estancia","Les règles du camping":"Normas del camping","Découvrir le camping":"Descubrir el camping","Activités & lieux incontournables":"Actividades y lugares imprescindibles","Activités locales":"Actividades locales","Toutes nos locations et suppléments à retrouver ici":"Todas nuestras opciones de alquiler y extras están aquí","MON DÉPART":"MI SALIDA","Les dernières étapes avant de partir":"Los últimos pasos antes de salir","🏊 ESPACE AQUATIQUE":"🏊 PARQUE ACUÁTICO","Découvrez nos piscines et nos toboggans, pour le bonheur des petits et des plus grands.":"Descubra nuestras piscinas y toboganes, para el disfrute de pequeños y mayores.","Basse Saison: 10h-19h\n Juillet-Août: 10h-20h":"Temporada baja: 10:00-19:00\n Julio-agosto: 10:00-20:00","Les shorts de bain NE SONT PAS AUTORISES. Respectez les consignes affichées et SURVEILLEZ vos enfants.":"NO SE PERMITEN BAÑADORES TIPO SHORT. Respete las normas indicadas y SUPERVISE a sus hijos.","🍽️ RESTAURANT":"🍽️ RESTAURANTE","Nathalie et toute son équipe vous accueillent pendant la saison.":"Nathalie y todo su equipo les reciben durante la temporada.","Toute la journée en haute saison (juillet-aôut) et à partir de 17h le reste de l'année":"Todo el día en temporada alta (julio-agosto) y a partir de las 17:00 el resto del año","Il est plus que préférable de réserver. Pensez y et allez voir directement le personnel du restaurant.":"Se recomienda encarecidamente reservar. Consulte directamente al personal del restaurante.","📝 RECEPTION":"📝 RECEPCIÓN","Les services pratiques du camping.":"Servicios prácticos del camping.","Il vous manque quelque chose ? Envie d'une petite gourmandise ? Notre épicerie est la pour vous.":"¿Le falta algo? ¿Le apetece un pequeño capricho? Nuestra tienda está aquí para usted.","📖 REGLEMENT DU CAMPING":"📖 REGLAMENTO DEL CAMPING","Merci de respecter ces règles afin que chacun profite de vacances agréables.":"Respete estas normas para que todos puedan disfrutar de unas vacaciones agradables.","Camping familial et calme. Merci de respecter le calme APRES 23h.":"Camping familiar y tranquilo. Por favor, respete el silencio DESPUÉS de las 23:00.","Merci de respecter les capacités maximum de votre location (2, 4 ou 6personnes)":"Respete la capacidad máxima de su alojamiento (2, 4 o 6 personas).","Un adulte est obligatoire dans chaque mobil-home. Les mineurs ne doivent pas être laissés sans surveillance.":"Es obligatorio que haya un adulto en cada mobilhome. Los menores no deben quedar sin supervisión.","Les mobil-homes doivent être rendus propres avant 10h. Un état des lieux de sortie sera à réaliser. Appelez-nous quand vous êtes prêts !":"Los mobilhomes deben dejarse limpios antes de las 10:00. Se realizará un inventario de salida. ¡Llámenos cuando estén listos!","Les animaux doivent être tenus sous contrôle et respecter les règles du camping.":"Los animales deben estar bajo control y respetar las normas del camping.","Merci de respecter les espaces communs, sanitaires et zones de tri.":"Respete las zonas comunes, sanitarios y áreas de separación de residuos.","CONSIGNES D'EVACUATION":"INSTRUCCIONES DE EVACUACIÓN","🗺️ PLAN DU CAMPING":"🗺️ MAPA DEL CAMPING","Repérez facilement les principaux services et équipements.":"Localice fácilmente los principales servicios e instalaciones.","📍 Points importants":"📍 Puntos importantes","📍 A DECOUVRIR":"📍 PARA DESCUBRIR","Dernières étapes avant de partir":"Últimos pasos antes de salir","🚲 NOS PARTENAIRES":"🚲 NUESTROS SOCIOS","Retrouvez ici les activités partenaires recommandées par le camping.":"Aquí encontrará las actividades de nuestros socios recomendadas por el camping.","Location de vélos":"Alquiler de bicicletas","Location de scooters":"Alquiler de scooters","Location de quad":"Alquiler de quads","Location Kayak":"Alquiler de kayaks","Salles d'escalade":"Salas de escalada","Location Voiture":"Alquiler de coches","Visites des Calanques":"Visitas a las Calanques","Plongée":"Buceo","Visites des Calanques en Bateau":"Visitas en barco por las Calanques","Vous avez oublié quelque chose ? Vous avez besoin de quelque chose ?":"¿Ha olvidado algo? ¿Necesita algo?","🔔 Infos du camping":"🔔 Información del camping","📢 Information":"📢 Información","🧳 MON DÉPART":"🧳 MI SALIDA","Les dernières étapes avant de prendre la route 👋":"Los últimos pasos antes de ponerse en camino 👋","HEURE DE DÉPART":"HORA DE SALIDA","Votre hébergement doit être libéré avant 10h00.":"Su alojamiento debe quedar libre antes de las 10:00.","HÉBERGEMENT":"ALOJAMIENTO","DÉCHETS":"RESIDUOS","CLÉS":"LLAVES","DERNIÈRES VÉRIFICATIONS":"ÚLTIMAS COMPROBACIONES","🏕️ MA LOCATION":"🏕️ MI ALOJAMIENTO","Restez connectés":"Manténgase conectado","NOUS SUIVRE":"SÍGUENOS","Voir notre page":"Ver nuestra página","Voir nos photos et vidéos":"Ver nuestras fotos y vídeos","Partagez vos vacances et identifiez-nous !":"¡Comparte tus vacaciones y etiquétanos!"},"nl":{"Bienvenue au camping":"Welkom op de camping","Mobilhome LA CIOTAT":"Stacaravan LA CIOTAT","La Ciotat":"La Ciotat","4 personnes":"4 personen","2 chambres":"2 slaapkamers","À partir de 15h30":"Vanaf 15:30 uur","Entre 8h et 10h, après avoir réalisé l'état des lieux de sortie (voir avec la réception)":"Tussen 8.00 en 10.00 uur, na de uitcheckcontrole (vraag het bij de receptie)","1 véhicule autorisé sur l'emplacement":"1 voertuig toegestaan op de staanplaats","Calme après 23h s'il vous plait":"Rust na 23.00 uur, alstublieft","Mobilhome CASSIS":"Stacaravan CASSIS","2 personnes":"2 personen","1 chambre":"1 slaapkamer","Mobilhome FIGUEROLLES":"Stacaravan FIGUEROLLES","Mobilhome PORT MIOU":"Stacaravan PORT MIOU","Port Miou":"Port Miou","6 personnes":"6 personen","3 chambres":"3 slaapkamers","Mobilhome PORT PIN":"Stacaravan PORT PIN","Port Pin":"Port Pin","Draps Inclus":"Beddengoed inbegrepen","Lave vaisselle intégré":"Ingebouwde vaatwasser","Mobilhome EN VAU":"Stacaravan EN VAU","En Vau":"En Vau","Mobilhome PREMIUM":"PREMIUM stacaravan","1 véhicule autorisé sur le parking réservé":"1 voertuig toegestaan op de gereserveerde parkeerplaats","Draps et serviettes Inclus":"Beddengoed en handdoeken inbegrepen","Plancha à gaz":"Gasbakplaat","Forfait ménage inclus":"Eindschoonmaak inbegrepen","2 Salles de bain":"2 badkamers","Tente Jenya":"Jenya Tent","Tente Kenya":"Kenya-tent","5 personnes":"5 personen","Accès aux sanitaires":"Toegang tot de sanitaire voorzieningen","Emplacement nature":"Natuurplaats","À partir de 14h00":"Vanaf 14.00 uur","Avant 12h00":"Voor 12.00 uur","Electricité et Eau sur chaque emplacement":"Elektriciteit en water op elke staanplaats","Réception":"Receptie","Accueil, renseignements et services du camping.":"Receptie, informatie en campingdiensten.","Espace aquatique":"Waterpark","Piscines et espace aquatique du camping.":"Zwembaden en waterpark van de camping.","Snack / Restaurant":"Snackbar / Restaurant","Restaurant et snack du camping.":"Restaurant en snackbar van de camping.","Épicerie":"Kruidenierswinkel","Épicerie située au niveau de la réception.":"Kruidenierswinkel bij de receptie.","Parking du camping.":"Parkeerplaats van de camping.","Aire de jeux":"Speeltuin","Aire de jeux.":"Speeltuin.","Ping Pong":"Tafeltennis","Tables de ping-pong.":"Tafeltennistafels.","Terrain multisports.":"Multisportterrein.","Pétanque":"Petanque","Terrain de pétanque.":"Petanquebaan.","Trampoline + Accrobranche":"Trampoline + Klimparcours","Trampoline à élastique.":"Bungeetrampoline.","Accrobranche / Acro Games.":"Klimparcours / Acro Games.","Sanitaires 1":"Sanitaire voorzieningen 1","Sanitaires composés de WC, douches, lavabos,....":"Voorzieningen met toiletten, douches, wastafels enz.","Sanitaires 2":"Sanitaire voorzieningen 2","Camping de Ceyreste":"Camping de Ceyreste","Ceyreste • La Ciotat • Provence":"Ceyreste • La Ciotat • Provence","Que les vacances commençent !":"Laat de vakantie beginnen!","Profitez pleinement de votre séjour":"Geniet optimaal van uw verblijf","Toutes les infos du camping directement à portée de main.":"Alle informatie over de camping binnen handbereik.","AUJOURD'HUI AU CAMPING":"VANDAAG OP DE CAMPING","Ma location":"Mijn accommodatie","Indiquez votre numéro dans MA LOCATION":"Vul uw nummer in bij MIJN ACCOMMODATIE","Horaires selon la période":"Openingstijden afhankelijk van de periode","Ouverte ✔️":"Open ✔️","Espace Aquatique":"Waterpark","Ouvert ✔️":"Open ✔️","Toute la journée en juillet-août / à partir de 17H le reste de l'année":"De hele dag in juli-augustus / vanaf 17.00 uur de rest van het jaar","08H-20H (dans la réception)":"08.00-20.00 uur (bij de receptie)","PROGRAMME D'ANIMATION DU JOUR":"ANIMATIEPROGRAMMA VAN VANDAAG","Aucune animation prévue aujourd'hui":"Vandaag zijn er geen activiteiten gepland","Animations & planning":"Animatie & programma","Piscines, toboggans & horaires":"Zwembaden, glijbanen & openingstijden","Carte, horaires":"Kaart, openingstijden","Toutes vos informations concernant votre séjour":"Alle informatie over uw verblijf","Les règles du camping":"Campingregels","Découvrir le camping":"Ontdek de camping","Activités & lieux incontournables":"Activiteiten & bezienswaardigheden","Activités locales":"Lokale activiteiten","Toutes nos locations et suppléments à retrouver ici":"Al onze verhuur en extra's vindt u hier","MON DÉPART":"MIJN VERTREK","Les dernières étapes avant de partir":"De laatste stappen voor vertrek","🏊 ESPACE AQUATIQUE":"🏊 WATERPARK","Découvrez nos piscines et nos toboggans, pour le bonheur des petits et des plus grands.":"Ontdek onze zwembaden en glijbanen, voor het plezier van jong en oud.","Basse Saison: 10h-19h\n Juillet-Août: 10h-20h":"Laagseizoen: 10.00-19.00 uur\n Juli-augustus: 10.00-20.00 uur","Les shorts de bain NE SONT PAS AUTORISES. Respectez les consignes affichées et SURVEILLEZ vos enfants.":"ZWEMSHORTS ZIJN NIET TOEGESTAAN. Volg de aangegeven regels en HOUD TOEZICHT op uw kinderen.","🍽️ RESTAURANT":"🍽️ RESTAURANT","Nathalie et toute son équipe vous accueillent pendant la saison.":"Nathalie en haar team heten u welkom tijdens het seizoen.","Toute la journée en haute saison (juillet-aôut) et à partir de 17h le reste de l'année":"De hele dag in het hoogseizoen (juli-augustus) en vanaf 17.00 uur de rest van het jaar","Il est plus que préférable de réserver. Pensez y et allez voir directement le personnel du restaurant.":"Reserveren wordt sterk aanbevolen. Vraag het rechtstreeks aan het restaurantpersoneel.","📝 RECEPTION":"📝 RECEPTIE","Les services pratiques du camping.":"Praktische campingdiensten.","Il vous manque quelque chose ? Envie d'une petite gourmandise ? Notre épicerie est la pour vous.":"Mist u iets? Zin in iets lekkers? Onze winkel staat voor u klaar.","📖 REGLEMENT DU CAMPING":"📖 CAMPINGREGELS","Merci de respecter ces règles afin que chacun profite de vacances agréables.":"Respecteer deze regels zodat iedereen van een fijne vakantie kan genieten.","Camping familial et calme. Merci de respecter le calme APRES 23h.":"Familiecamping en rustig. Gelieve na 23.00 uur de rust te respecteren.","Merci de respecter les capacités maximum de votre location (2, 4 ou 6personnes)":"Respecteer de maximale capaciteit van uw accommodatie (2, 4 of 6 personen).","Un adulte est obligatoire dans chaque mobil-home. Les mineurs ne doivent pas être laissés sans surveillance.":"In elke stacaravan moet een volwassene aanwezig zijn. Minderjarigen mogen niet zonder toezicht worden achtergelaten.","Les mobil-homes doivent être rendus propres avant 10h. Un état des lieux de sortie sera à réaliser. Appelez-nous quand vous êtes prêts !":"Stacaravans moeten vóór 10.00 uur schoon worden achtergelaten. Er wordt een uitcheckcontrole uitgevoerd. Bel ons wanneer u klaar bent!","Les animaux doivent être tenus sous contrôle et respecter les règles du camping.":"Huisdieren moeten onder controle worden gehouden en de campingregels naleven.","Merci de respecter les espaces communs, sanitaires et zones de tri.":"Respecteer de gemeenschappelijke ruimtes, sanitaire voorzieningen en afvalscheidingszones.","CONSIGNES D'EVACUATION":"EVACUATIE-INSTRUCTIES","🗺️ PLAN DU CAMPING":"🗺️ CAMPINGKAART","Repérez facilement les principaux services et équipements.":"Vind de belangrijkste diensten en voorzieningen gemakkelijk.","📍 Points importants":"📍 Belangrijke locaties","📍 A DECOUVRIR":"📍 TE ONTDEKKEN","Dernières étapes avant de partir":"Laatste stappen voor vertrek","🚲 NOS PARTENAIRES":"🚲 ONZE PARTNERS","Retrouvez ici les activités partenaires recommandées par le camping.":"Hier vindt u door de camping aanbevolen partneractiviteiten.","Location de vélos":"Fietsverhuur","Location de scooters":"Scooterverhuur","Location de quad":"Quadverhuur","Location Kayak":"Kajakverhuur","Salles d'escalade":"Klimhallen","Location Voiture":"Autoverhuur","Visites des Calanques":"Excursies naar de Calanques","Plongée":"Duiken","Visites des Calanques en Bateau":"Boottochten naar de Calanques","Vous avez oublié quelque chose ? Vous avez besoin de quelque chose ?":"Iets vergeten? Heeft u iets nodig?","🔔 Infos du camping":"🔔 Campinginformatie","📢 Information":"📢 Informatie","🧳 MON DÉPART":"🧳 MIJN VERTREK","Les dernières étapes avant de prendre la route 👋":"De laatste stappen voordat u vertrekt 👋","HEURE DE DÉPART":"VERTREKTIJD","Votre hébergement doit être libéré avant 10h00.":"Uw accommodatie moet vóór 10.00 uur vrij zijn.","HÉBERGEMENT":"ACCOMMODATIE","DÉCHETS":"AFVAL","CLÉS":"SLEUTELS","DERNIÈRES VÉRIFICATIONS":"LAATSTE CONTROLES","🏕️ MA LOCATION":"🏕️ MIJN ACCOMMODATIE","Restez connectés":"Blijf verbonden","NOUS SUIVRE":"VOLG ONS","Voir notre page":"Bekijk onze pagina","Voir nos photos et vidéos":"Bekijk onze foto's en video's","Partagez vos vacances et identifiez-nous !":"Deel je vakantie en tag ons!"},"it":{"Bienvenue au camping":"Benvenuti al campeggio","Mobilhome LA CIOTAT":"Casa mobile LA CIOTAT","La Ciotat":"La Ciotat","4 personnes":"4 persone","2 chambres":"2 camere","À partir de 15h30":"Dalle 15:30","Entre 8h et 10h, après avoir réalisé l'état des lieux de sortie (voir avec la réception)":"Tra le 8:00 e le 10:00, dopo aver effettuato il controllo di partenza (chiedere alla reception)","1 véhicule autorisé sur l'emplacement":"1 veicolo consentito sulla piazzola","Calme après 23h s'il vous plait":"Silenzio dopo le 23:00, per favore","Mobilhome CASSIS":"Casa mobile CASSIS","2 personnes":"2 persone","1 chambre":"1 camera","Mobilhome FIGUEROLLES":"Casa mobile FIGUEROLLES","Mobilhome PORT MIOU":"Casa mobile PORT MIOU","Port Miou":"Port Miou","6 personnes":"6 persone","3 chambres":"3 camere","Mobilhome PORT PIN":"Casa mobile PORT PIN","Port Pin":"Port Pin","Draps Inclus":"Lenzuola incluse","Lave vaisselle intégré":"Lavastoviglie integrata","Mobilhome EN VAU":"Casa mobile EN VAU","En Vau":"En Vau","Mobilhome PREMIUM":"Casa mobile PREMIUM","1 véhicule autorisé sur le parking réservé":"1 veicolo consentito nel parcheggio riservato","Draps et serviettes Inclus":"Lenzuola e asciugamani inclusi","Plancha à gaz":"Piastra a gas","Forfait ménage inclus":"Pulizia finale inclusa","2 Salles de bain":"2 bagni","Tente Jenya":"Jenya Tent","Tente Kenya":"Tenda Kenya","5 personnes":"5 persone","Accès aux sanitaires":"Accesso ai servizi igienici","Emplacement nature":"Piazzola natura","À partir de 14h00":"Dalle 14:00","Avant 12h00":"Prima delle 12:00","Electricité et Eau sur chaque emplacement":"Elettricità e acqua su ogni piazzola","Réception":"Reception","Accueil, renseignements et services du camping.":"Accoglienza, informazioni e servizi del campeggio.","Espace aquatique":"Parco acquatico","Piscines et espace aquatique du camping.":"Piscine e parco acquatico del campeggio.","Snack / Restaurant":"Snack / Ristorante","Restaurant et snack du camping.":"Ristorante e snack bar del campeggio.","Épicerie":"Minimarket","Épicerie située au niveau de la réception.":"Minimarket situato presso la reception.","Parking du camping.":"Parcheggio del campeggio.","Aire de jeux":"Area giochi","Aire de jeux.":"Area giochi.","Ping Pong":"Ping-pong","Tables de ping-pong.":"Tavoli da ping-pong.","Terrain multisports.":"Campo multisport.","Pétanque":"Bocce","Terrain de pétanque.":"Campo da bocce.","Trampoline + Accrobranche":"Trampolino + Parco avventura","Trampoline à élastique.":"Trampolino elastico.","Accrobranche / Acro Games.":"Parco avventura / Acro Games.","Sanitaires 1":"Servizi igienici 1","Sanitaires composés de WC, douches, lavabos,....":"Servizi con WC, docce, lavabi, ecc.","Sanitaires 2":"Servizi igienici 2","Camping de Ceyreste":"Camping de Ceyreste","Ceyreste • La Ciotat • Provence":"Ceyreste • La Ciotat • Provence","Que les vacances commençent !":"Che inizino le vacanze!","Profitez pleinement de votre séjour":"Godetevi appieno il vostro soggiorno","Toutes les infos du camping directement à portée de main.":"Tutte le informazioni del campeggio a portata di mano.","AUJOURD'HUI AU CAMPING":"OGGI AL CAMPEGGIO","Ma location":"La mia sistemazione","Indiquez votre numéro dans MA LOCATION":"Inserisci il tuo numero in LA MIA SISTEMAZIONE","Horaires selon la période":"Orari in base al periodo","Ouverte ✔️":"Aperto ✔️","Espace Aquatique":"Parco Acquatico","Ouvert ✔️":"Aperto ✔️","Toute la journée en juillet-août / à partir de 17H le reste de l'année":"Tutto il giorno in luglio-agosto / dalle 17:00 nel resto dell'anno","08H-20H (dans la réception)":"08:00-20:00 (alla reception)","PROGRAMME D'ANIMATION DU JOUR":"PROGRAMMA DI ANIMAZIONE DI OGGI","Aucune animation prévue aujourd'hui":"Nessuna attività prevista oggi","Animations & planning":"Animazione e programma","Piscines, toboggans & horaires":"Piscine, scivoli e orari","Carte, horaires":"Mappa, orari","Toutes vos informations concernant votre séjour":"Tutte le informazioni sul vostro soggiorno","Les règles du camping":"Regole del campeggio","Découvrir le camping":"Scopri il campeggio","Activités & lieux incontournables":"Attività e luoghi imperdibili","Activités locales":"Attività locali","Toutes nos locations et suppléments à retrouver ici":"Tutti i nostri noleggi e supplementi sono qui","MON DÉPART":"LA MIA PARTENZA","Les dernières étapes avant de partir":"Gli ultimi passaggi prima della partenza","🏊 ESPACE AQUATIQUE":"🏊 PARCO ACQUATICO","Découvrez nos piscines et nos toboggans, pour le bonheur des petits et des plus grands.":"Scoprite le nostre piscine e gli scivoli, per la gioia di grandi e piccini.","Basse Saison: 10h-19h\n Juillet-Août: 10h-20h":"Bassa stagione: 10:00-19:00\n Luglio-agosto: 10:00-20:00","Les shorts de bain NE SONT PAS AUTORISES. Respectez les consignes affichées et SURVEILLEZ vos enfants.":"I COSTUMI A PANTALONCINO NON SONO CONSENTITI. Rispettate le regole esposte e SORVEGLIATE i vostri bambini.","🍽️ RESTAURANT":"🍽️ RISTORANTE","Nathalie et toute son équipe vous accueillent pendant la saison.":"Nathalie e tutto il suo team vi accolgono durante la stagione.","Toute la journée en haute saison (juillet-aôut) et à partir de 17h le reste de l'année":"Tutto il giorno in alta stagione (luglio-agosto) e dalle 17:00 nel resto dell'anno","Il est plus que préférable de réserver. Pensez y et allez voir directement le personnel du restaurant.":"È vivamente consigliato prenotare. Rivolgetevi direttamente al personale del ristorante.","📝 RECEPTION":"📝 RECEPTION","Les services pratiques du camping.":"Servizi pratici del campeggio.","Il vous manque quelque chose ? Envie d'une petite gourmandise ? Notre épicerie est la pour vous.":"Vi manca qualcosa? Voglia di uno spuntino? Il nostro minimarket è qui per voi.","📖 REGLEMENT DU CAMPING":"📖 REGOLAMENTO DEL CAMPEGGIO","Merci de respecter ces règles afin que chacun profite de vacances agréables.":"Rispettate queste regole affinché tutti possano trascorrere una piacevole vacanza.","Camping familial et calme. Merci de respecter le calme APRES 23h.":"Campeggio familiare e tranquillo. Si prega di rispettare il silenzio DOPO le 23:00.","Merci de respecter les capacités maximum de votre location (2, 4 ou 6personnes)":"Rispettate la capacità massima del vostro alloggio (2, 4 o 6 persone).","Un adulte est obligatoire dans chaque mobil-home. Les mineurs ne doivent pas être laissés sans surveillance.":"È obbligatoria la presenza di un adulto in ogni casa mobile. I minori non devono essere lasciati senza sorveglianza.","Les mobil-homes doivent être rendus propres avant 10h. Un état des lieux de sortie sera à réaliser. Appelez-nous quand vous êtes prêts !":"Le case mobili devono essere riconsegnate pulite entro le 10:00. Verrà effettuato un controllo di partenza. Chiamateci quando siete pronti!","Les animaux doivent être tenus sous contrôle et respecter les règles du camping.":"Gli animali devono essere tenuti sotto controllo e rispettare le regole del campeggio.","Merci de respecter les espaces communs, sanitaires et zones de tri.":"Rispettate gli spazi comuni, i servizi igienici e le aree di raccolta differenziata.","CONSIGNES D'EVACUATION":"ISTRUZIONI DI EVACUAZIONE","🗺️ PLAN DU CAMPING":"🗺️ MAPPA DEL CAMPEGGIO","Repérez facilement les principaux services et équipements.":"Individuate facilmente i principali servizi e strutture.","📍 Points importants":"📍 Punti importanti","📍 A DECOUVRIR":"📍 DA SCOPRIRE","Dernières étapes avant de partir":"Ultimi passaggi prima della partenza","🚲 NOS PARTENAIRES":"🚲 I NOSTRI PARTNER","Retrouvez ici les activités partenaires recommandées par le camping.":"Qui troverete le attività dei nostri partner consigliate dal campeggio.","Location de vélos":"Noleggio biciclette","Location de scooters":"Noleggio scooter","Location de quad":"Noleggio quad","Location Kayak":"Noleggio kayak","Salles d'escalade":"Palestre di arrampicata","Location Voiture":"Noleggio auto","Visites des Calanques":"Visite delle Calanques","Plongée":"Immersioni","Visites des Calanques en Bateau":"Visite in barca delle Calanques","Vous avez oublié quelque chose ? Vous avez besoin de quelque chose ?":"Avete dimenticato qualcosa? Avete bisogno di qualcosa?","🔔 Infos du camping":"🔔 Informazioni sul campeggio","📢 Information":"📢 Informazioni","🧳 MON DÉPART":"🧳 LA MIA PARTENZA","Les dernières étapes avant de prendre la route 👋":"Gli ultimi passaggi prima di mettersi in viaggio 👋","HEURE DE DÉPART":"ORA DI PARTENZA","Votre hébergement doit être libéré avant 10h00.":"Il vostro alloggio deve essere liberato entro le 10:00.","HÉBERGEMENT":"ALLOGGIO","DÉCHETS":"RIFIUTI","CLÉS":"CHIAVI","DERNIÈRES VÉRIFICATIONS":"ULTIMI CONTROLLI","🏕️ MA LOCATION":"🏕️ LA MIA SISTEMAZIONE","Restez connectés":"Restate connessi","NOUS SUIVRE":"SEGUICI","Voir notre page":"Vedi la nostra pagina","Voir nos photos et vidéos":"Guarda le nostre foto e video","Partagez vos vacances et identifiez-nous !":"Condividete le vostre vacanze e taggateci!"}};
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
