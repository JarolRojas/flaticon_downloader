
function getPaginationTotal() {
  try {
    const el = document.getElementById('pagination-total');
    if (!el) return 1;
    return el.textContent ? Number(el.textContent.trim()) || 1 : 1;
  } catch (e) {
    return 1;
  }
}

// Busca el primer atributo data-id dentro de un elemento con clase 'search-result'
function getFirstPackIdInSearchResult() {
  try {
    const any = document.querySelector('[data-pack_id]');
    if (any && any.getAttribute) {
      const valPack = any.getAttribute('data-pack_id');
      return valPack || null;
    }
    return null;
  } catch (e) {
    return null;
  }
}

function getPackTitle() {
  try {
    // Buscar el contenedor principal del título
    const header = document.querySelector('.pack-view__header--title') ||
      document.querySelector('.pack-header__title') ||
      document.querySelector('.pack-title') ||
      document.querySelector('head > title');

    if (!header) return "flaticon_pack";

    // Intentar obtener el texto principal y el estilo por separado
    const mainEl = header.querySelector ? header.querySelector('.title') : null;
    const styleEl = header.querySelector ? header.querySelector('.title-style') : null;

    let mainText = '';
    if (mainEl && mainEl.textContent) {
      mainText = mainEl.textContent.trim();
    } else if (header.textContent) {
      // si no hay .title, tomar todo el texto del header
      mainText = header.textContent.trim();
    }

    // Obtener texto de estilo (por ejemplo "| Flat") y limpiar el '|' al inicio
    let styleText = '';
    if (styleEl && styleEl.textContent) {
      styleText = styleEl.textContent.replace(/^\s*\|\s*/, '').trim();
    } else if (!mainEl && header.querySelector) {
      // como fallback, si no hay .title pero hay nodos hijos, buscar .title-style alternativo
      const altStyle = header.querySelector('.title-style');
      if (altStyle && altStyle.textContent) styleText = altStyle.textContent.replace(/^\s*\|\s*/, '').trim();
    }

    // Combinar si hay styleText y no está repetido en mainText
    let combined = mainText;
    if (styleText) {
      // Evitar duplicados
      if (!mainText.includes(styleText)) combined = (mainText + ' ' + styleText).trim();
    }

    if (!combined) return "flaticon_pack";

    // Normalizaciones:
    // 1) quitar prefijos comunes en español/inglés
    // 2) eliminar separadores '|' que puedan quedar
    // 3) colapsar espacios y reemplazarlos por '_'
    // 4) eliminar caracteres inválidos para nombres de archivo
    combined = combined
      .replace(/^(Pack\s+de\s+iconos:|Pack\s+of\s+icons:)\s*/i, '')
      .replace(/\s*\|\s*/g, ' ')
      .replace(/\s+/g, '_')
      .replace(/[\/\\:?%"<>|*]/g, '')
      .trim();

    return combined || "flaticon_pack";
  } catch (e) {
    return "flaticon_pack";
  }
}
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (!message || !message.type) return;
  try {
    if (message.type === 'GET_PAGINATION_TOTAL') {
      const total = getPaginationTotal();
      sendResponse({ ok: true, total });
      return; // fin
    }

    if (message.type === 'GET_FIRST_SEARCH_RESULT_DATAID') {
      const packId = typeof getFirstPackIdInSearchResult === 'function'
        ? getFirstPackIdInSearchResult()
        : null;
      sendResponse({ ok: true, dataPackId: packId ?? null });
      return;
    }

    if (message.type === 'GET_PACK_TITLE') {
      const packTitle = getPackTitle();
      sendResponse({ ok: true, packTitle });
      return;
    }

  } catch (err) {
    sendResponse({ ok: false, error: String(err) });
  }
  // listener responde de forma síncrona
});
