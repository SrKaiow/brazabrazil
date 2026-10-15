/* ============================================================
   BRAZABRAZIL — SITE SETTINGS
   Edit this file to change contact details, hours and delivery.
   ============================================================ */
window.SITE = {
  name: "BrazaBrazil",
  tagline: "Butcher & Groceries · Brazilian · Portuguese Shop",

  // WhatsApp number in international format, digits only (UK = 44, no leading 0)
  // Example: 07700 900123  ->  "447700900123"
  whatsapp: "447766343534",

  phoneDisplay: "07766 343534",
  instagram: "https://www.instagram.com/brazabrazilbutcher/",

  address: {
    line1: "31 South Street",
    line2: "Epsom, Surrey KT18 7PJ",
    mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=31+South+Street,+Epsom,+KT18+7PJ",
    // satellite map (t=k) centred on the shop
    mapEmbed: "https://maps.google.com/maps?q=31+South+Street,+Epsom,+Surrey+KT18+7PJ&t=k&z=19&output=embed"
  },

  hours: [
    { days: { en: "Monday – Saturday", "pt-BR": "Segunda a sábado", "pt-PT": "Segunda a sábado", es: "Lunes a sábado" },
      time: "9:00 – 20:00" },
    { days: { en: "Sunday & bank holidays", "pt-BR": "Domingos e feriados", "pt-PT": "Domingos e feriados", es: "Domingos y festivos" },
      time: "9:00 – 17:00" }
  ],

  // Language used when the visitor's browser language isn't one of ours
  defaultLang: "en",

  // WhatsApp VIP group — daily offers
  vipGroup: "https://chat.whatsapp.com/JRh5FQj0zWuFrFBdu0iuDC",

  delivery: {
    enabled: true,
    note: "Local delivery available — ask us about your postcode.",
    freeOver: null                        // £ amount for free delivery, or null to hide
  },

  currency: "£"
};
