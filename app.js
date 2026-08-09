const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

function setText(id, value){ const el=$(id); if(el) el.textContent=value; }

setText("#welcomeText", CAMPING.welcome);
setText("#headline", CAMPING.headline);
setText("#subheadline", CAMPING.subheadline);
setText("#todayTitle", CAMPING.today.title);
setText("#regionTitle", CAMPING.region.title);
setText("#regionText", CAMPING.region.text);
setText("#helpText", `La réception est à votre disposition pour vous accompagner pendant votre séjour.`);
$("#callLink").href = `tel:${CAMPING.contact.phone}`;
$("#mailLink").href = `mailto:${CAMPING.contact.email}`;

function renderTiles(){
  $("#tiles").innerHTML = CAMPING.menu.map(item => `
    <button class="tile" data-open="${item.id}">
      <span class="tile-icon">${item.icon}</span>
      <strong>${item.title}</strong>
      <small>${item.desc}</small>
    </button>`).join("");
}
renderTiles();

function renderToday(){
  $("#todayItems").innerHTML = CAMPING.today.items.map(i => `
    <div class="today-item">
      <span class="today-icon">${i.icon}</span>
      <div><b>${i.title}</b><strong>${i.time}</strong><small>${i.note}</small></div>
    </div>`).join("");
}
renderToday();

function renderDrawer(){
  $("#drawerLinks").innerHTML = CAMPING.menu.map(item => `
    <button class="drawer-link" data-open="${item.id}">
      <span>${item.icon}</span><b>${item.title}</b><small>${item.desc}</small>
    </button>`).join("");
}
renderDrawer();

function openSection(id){
  const section = CAMPING.sections[id];
  if(!section) return;
  $("#modalContent").innerHTML = `
    <div class="eyebrow dark">CAMPING DE CEYRESTE</div>
    <h2 class="modal-title">${section.title}</h2>
    <p class="modal-intro">${section.intro}</p>
    ${section.blocks.map(b=>`<article class="info-block"><h3>${b[0]}</h3><p>${b[1]}</p></article>`).join("")}
    ${id==="map" ? `<div class="map-placeholder">🗺️<br><b>Votre plan sera placé ici</b><br><small>Vous pourrez remplacer cet emplacement par votre image.</small></div>` : ""}
    ${id==="region" ? `<a class="big-link" href="${CAMPING.contact.mapsUrl}" target="_blank" rel="noopener">📍 Ouvrir Google Maps</a>` : ""}
  `;
  $("#modal").classList.remove("hidden");
}

function openPlanning(){
  const safeColor = (value) => {
    if(!value) return "";
    const named = ["green","blue","orange","red","purple","pink","teal","yellow"];
    if(named.includes(String(value).toLowerCase())) return String(value).toLowerCase();
    if(/^#[0-9a-fA-F]{3,8}$/.test(String(value))) return String(value);
    if(/^rgb(a)?\([0-9\s,./%]+\)$/.test(String(value))) return String(value);
    return "";
  };

  const eventHtml = (event) => {
    // Compatibilité avec l'ancien format : ["10h00 • Aquagym"]
    const e = typeof event === "string" ? {text:event} : event;
    const text = e?.text ?? "";
    const color = safeColor(e?.color);
    const style = color && color.startsWith("#") ? `style="--event-color:${color}"` : "";
    const cls = `event ${color && !color.startsWith("#") ? `event-${color}` : ""} ${e?.bold ? "event-bold" : ""} ${e?.size==="small" ? "event-small" : ""} ${e?.size==="large" ? "event-large" : ""}`;
    return `<div class="${cls}" ${style}>${text}</div>`;
  };

  $("#modalContent").innerHTML = `
    <div class="eyebrow dark">CAMPING DE CEYRESTE</div>
    <h2 class="modal-title">📅 Programme de la semaine</h2>
    <p class="modal-intro">Le planning peut être modifié dans <b>config.js</b>. Tu peux aussi choisir la couleur et le gras de chaque animation.</p>
    <div class="planning">${CAMPING.planning.map(d=>`
      <div class="planning-day"><b>${d.day}</b><div>${d.events.map(eventHtml).join("")}</div></div>
    `).join("")}</div>
  `;
  $("#modal").classList.remove("hidden");
}

function open(id){
  if(id==="planning") return openPlanning();
  openSection(id);
}

document.addEventListener("click", e=>{
  const btn=e.target.closest("[data-open]");
  if(btn) open(btn.dataset.open);
  if(e.target.closest("[data-home]")) $("#modal").classList.add("hidden");
});

$("#closeModal").onclick=()=>$("#modal").classList.add("hidden");
$("#modal").addEventListener("click",e=>{if(e.target===$("#modal"))$("#modal").classList.add("hidden")});

$("#menuBtn").onclick=()=>$("#drawer").classList.remove("hidden");
$("#closeDrawer").onclick=()=>$("#drawer").classList.add("hidden");
$("#drawer").addEventListener("click",e=>{
  const btn=e.target.closest("[data-open]");
  if(btn){ open(btn.dataset.open); $("#drawer").classList.add("hidden");}
  if(e.target===$("#drawer"))$("#drawer").classList.add("hidden");
});

const now=new Date();
const date=new Intl.DateTimeFormat("fr-FR",{weekday:"long",day:"numeric",month:"long"}).format(now);
$("#todayTitle").textContent = `${CAMPING.today.title} • ${date}`;

let deferredPrompt;
window.addEventListener("beforeinstallprompt", e=>{
  e.preventDefault(); deferredPrompt=e; $("#installBtn").hidden=false;
});
$("#installBtn").onclick=async()=>{
  if(!deferredPrompt) return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt=null; $("#installBtn").hidden=true;
};

if("serviceWorker" in navigator){
  window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js"));
}
