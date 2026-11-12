/*
  ============================================================
  OUTIL DE MISE EN FORME
  ============================================================
  IMPORTANT : cette fonction est définie ici AVANT CAMPING,
  car config.js est chargé avant app.js.
*/
function textStyle(text, options = {}) {
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
}

const MOBILE_HOMES = {
