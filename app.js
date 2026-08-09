/*
  Moteur d'affichage.
  Tu n'as normalement pas besoin de modifier ce fichier.
*/

function escapeHtml(value){
  return String(value ?? "")
    .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;").replace(/'/g,"&#039;");
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
    hero.style.setProperty("--hero-image", `url("${images.accueil}")`);
    hero.classList.add("has-hero-image");
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

function renderTiles(){
  document.querySelector("#tiles").innerHTML=CAMPING.menu.map(item=>`
    <button class="tile" data-open="${item.id}">
      <span class="tile-icon">${item.icon}</span>
      <strong>${renderText(item.title)}</strong>
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
  const fixedHtml = fixedItems.map(item => `
    <div class="today-info-item">
      <span class="today-program-icon">${item.icon || "ℹ️"}</span>
      <div class="today-info-content">
        <div class="today-info-title">${renderText(item.title)}</div>
        <div class="today-info-bottom">
          <span class="today-info-time">${renderText(item.time || "")}</span>
          <span class="today-info-note">${renderText(item.note || "")}</span>
        </div>
      </div>
    </div>
  `).join("");

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
      <span>${item.icon}</span><b>${renderText(item.title)}</b><small>${renderText(item.desc)}</small>
    </button>`).join("");
}
renderDrawer();

function openSection(id){
  const section=CAMPING.sections[id];
  if(!section)return;
  document.querySelector("#modalContent").innerHTML=`
    <div class="eyebrow dark">CAMPING DE CEYRESTE</div>
    <h2 class="modal-title">${renderText(section.title)}</h2>
    <p class="modal-intro">${renderText(section.intro)}</p>
    ${section.blocks.map(b=>`<article class="info-block"><h3>${renderText(b[0])}</h3><p>${renderText(b[1])}</p></article>`).join("")}
    ${id==="map"?`<div class="map-placeholder">🗺️<br><b>Votre plan sera placé ici</b><br><small>Vous pourrez remplacer cet emplacement par votre image.</small></div>`:""}
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

document.addEventListener("click",e=>{
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
