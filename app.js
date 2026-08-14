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
    return `<span class="${cls}" style="${custom}">${escapeHtml(value.text)}</span>`;
  }
  return escapeHtml(value);
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

function dynamicStatus(item){
  const schedule = getOpeningSchedule(item);
  const open = isWithinOpeningHours(schedule);

  if(open === null) return item.note;

  return textStyle(open ? "OUVERT ✔️" : "FERMÉ ✖️", {
    color: open ? "green" : "red",
    bold: true
  });
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
      <div class="dynamic-next-label">🎉 PROCHAINE ANIMATION</div>
      <div class="dynamic-next-event">${escapeHtml(label)}</div>
      <div class="dynamic-next-time">${escapeHtml(time)}</div>
      <div class="dynamic-next-countdown">${state.minutesUntil===null?escapeHtml(state.day):escapeHtml(formatAnimationCountdown(state.minutesUntil))}</div>
      <button class="dynamic-next-button" type="button" data-dynamic-planning>VOIR LE PROGRAMME →</button>
    </div>`;
  }
  return `<section class="dynamic-welcome">
    <div class="dynamic-welcome-icon">${g.icon}</div>
    <div class="dynamic-welcome-title">${g.title}</div>
    <div class="dynamic-welcome-subtitle">${g.subtitle}</div>
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

  const dateText = new Intl.DateTimeFormat("fr-FR", {
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

function openSection(id){
  const section=CAMPING.sections[id];
  if(!section)return;

  const blocksHtml = section.accordion
    ? `<div class="info-accordion">${(section.blocks || []).map(b=>`
        <details class="info-accordion-item">
          <summary>
            <span>${renderText(b[0])}</span>
            <span class="accordion-chevron">＋</span>
          </summary>
          <div class="info-accordion-content">${renderText(b[1])}</div>
        </details>
      `).join("")}</div>
      ${section.conclusion ? `<div class="info-conclusion">${renderText(section.conclusion)}`.replace(/\n/g,"<br>") + `</div>` : ""}`
    : (section.blocks || []).map(b=>`<article class="info-block"><h3>${renderText(b[0])}</h3><p>${renderText(b[1])}</p></article>`).join("");

  document.querySelector("#modalContent").innerHTML=`
    <div class="eyebrow dark">CAMPING DE CEYRESTE</div>
    ${section.image ? `<img class="section-image" src="${escapeHtml(section.image)}" alt="" loading="lazy" onerror="this.remove()">` : ""}
    <h2 class="modal-title">${renderText(section.title)}</h2>
    ${section.personalizedMobileHome ? renderMobileHomePersonalization() : ""}
    <p class="modal-intro">${renderText(section.intro)}</p>
    ${section.menuPdf ? `<a class="menu-pdf-button" href="${escapeHtml(section.menuPdf)}" target="_blank" rel="noopener">📖 Voir la carte du restaurant</a>` : ""}
    ${blocksHtml}
    ${id==="region"?`<a class="big-link" href="${CAMPING.contact.mapsUrl}" target="_blank" rel="noopener">📍 Ouvrir Google Maps</a>`:""}
  `;
  document.querySelector("#modal").classList.remove("hidden");
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
    <h2 class="modal-title">📅 Programme de la semaine</h2>
    <p class="modal-intro">Retrouvez toutes les animations de la semaine.</p>
    <div class="planning">${weeklyHtml}</div>
  `;
  modal.classList.remove("hidden");
}

function open(id){ if(id==="planning")return openPlanning(); openSection(id); }

document.addEventListener("keydown",e=>{
  const el=e.target.closest(".today-mobile-home");
  if(el && (e.key==="Enter" || e.key===" ")){ e.preventDefault(); openSection("stay"); }
});

document.addEventListener("click",e=>{
  const dynamicPlanning=e.target.closest("[data-dynamic-planning]");
  if(dynamicPlanning){
    e.preventDefault();
    openPlanning();
    return;
  }
  const btn=e.target.closest("[data-open]");
  if(btn)open(btn.dataset.open);
  if(e.target.closest("[data-home]"))document.querySelector("#modal").classList.add("hidden");
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

setInterval(refreshTodayStatuses, 60000);
refreshTodayStatuses();

(function initDynamicWelcome(){
  const start=()=>{ dynamicWelcomeMount(); setInterval(dynamicWelcomeMount,60000); };
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",start);
  else start();
})();
