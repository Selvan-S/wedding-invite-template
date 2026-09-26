/**
 * ====================================================================
 * LIVE COUNTDOWN & CALENDAR SYNCHRONIZATION
 * ====================================================================
 * Calculates precision countdown to 24 October 2026 and provides
 * instant Google Calendar / Apple iCal (.ics) links.
 */

function initCountdown(targetDateStr) {
  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-mins');
  const secsEl = document.getElementById('cd-secs');

  if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

  const targetDate = new Date(targetDateStr).getTime();

  function update() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minsEl.textContent = '00';
      secsEl.textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minsEl.textContent = String(minutes).padStart(2, '0');
    secsEl.textContent = String(seconds).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);

  // Setup Google Calendar Sync
  const gcalBtn = document.getElementById('btn-gcal-sync');
  if (gcalBtn) {
    gcalBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const title = encodeURIComponent("Wedding Celebration • 24 October 2026");
      const details = encodeURIComponent("Subha Muhurtham & Grand Wedding Celebrations at M.R.P Thirumana Mandapam, Vadaputhur, Tamil Nadu.");
      const location = encodeURIComponent("M.R.P Thirumana Mandapam, Vadaputhur, Tamil Nadu 642109");
      // 20261024T033000Z is 09:00 AM IST
      const dates = "20261024T033000Z/20261024T163000Z";
      const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
      window.open(gcalUrl, '_blank');
    });
  }

  // Setup Apple iCal (.ics) Download
  const icalBtn = document.getElementById('btn-ical-sync');
  if (icalBtn) {
    icalBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const icsData = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Royal Wedding Invitation//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        'UID:wedding-20261024@mrp-mandapam.com',
        'DTSTAMP:20260919T000000Z',
        'DTSTART:20261024T033000Z',
        'DTEND:20261024T163000Z',
        'SUMMARY:Wedding Celebration • 24 October 2026',
        'DESCRIPTION:Subha Muhurtham & Grand Celebrations at M.R.P Thirumana Mandapam\\, Vadaputhur.',
        'LOCATION:M.R.P Thirumana Mandapam\\, Vadaputhur\\, Tamil Nadu 642109',
        'STATUS:CONFIRMED',
        'BEGIN:VALARM',
        'TRIGGER:-P1D',
        'ACTION:DISPLAY',
        'DESCRIPTION:Reminder: Wedding Celebration tomorrow!',
        'END:VALARM',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', 'Wedding-Invitation-24Oct2026.ics');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
}

window.initCountdown = initCountdown;
