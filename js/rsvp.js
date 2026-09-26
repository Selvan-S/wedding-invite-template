/**
 * ====================================================================
 * INSTANT WHATSAPP RSVP CONCIERGE (rsvp.js)
 * ====================================================================
 * Collects RSVP details and directs guest to WhatsApp with
 * pre-filled celebratory confirmation message.
 */

function initRSVP(rsvpConfig) {
  const form = document.getElementById('rsvp-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('rsvp-name').value.trim();
    const phone = document.getElementById('rsvp-phone').value.trim();
    const guests = document.getElementById('rsvp-guests').value;
    const attending = document.getElementById('rsvp-attending').value;
    const meal = document.getElementById('rsvp-meal').value;
    const note = document.getElementById('rsvp-note').value.trim();

    if (!name) {
      alert("Please enter your name to confirm your RSVP.");
      return;
    }

    const hostNumber = (rsvpConfig && rsvpConfig.whatsappNumber) || "919876543210";

    const lines = [
      "🎉 *WEDDING RSVP CONFIRMATION*",
      "📅 *Date*: Saturday, 24 October 2026",
      "📍 *Venue*: M.R.P Thirumana Mandapam, Vadaputhur",
      "-----------------------------",
      `👤 *Name*: ${name}`,
      phone ? `📞 *Phone*: ${phone}` : '',
      `✨ *Attendance*: ${attending}`,
      attending.includes("Joyfully") ? `👥 *Number of Guests*: ${guests}` : '',
      attending.includes("Joyfully") ? `🍽️ *Dietary Preference*: ${meal}` : '',
      note ? `💌 *Personal Note*: "${note}"` : '',
      "-----------------------------",
      "Heartiest congratulations to the wonderful couple! Looking forward to celebrating with you! 💐"
    ].filter(Boolean);

    const messageText = lines.join('\n');
    const waUrl = `https://api.whatsapp.com/send?phone=${hostNumber}&text=${encodeURIComponent(messageText)}`;

    // Open WhatsApp in new tab/app
    window.open(waUrl, '_blank');
  });
}

window.initRSVP = initRSVP;
