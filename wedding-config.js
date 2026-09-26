/**
 * ====================================================================
 * WEDDING INVITATION CONFIGURATION & CONTENT DATA
 * ====================================================================
 * This central configuration file powers all text, dates, venues, 
 * schedules, themes, and interactive features across the website.
 * 
 * To reuse this template for another celebration, simply edit the values below!
 * ====================================================================
 */

window.WEDDING_CONFIG = {
  // Couple Information
  couple: {
    groom: {
      name: "Groom",
      fullName: "The Handsome Groom",
      title: "Groom",
      bio: "Software craftsman, traveler at heart, and the one who believes every journey is better hand-in-hand.",
      quote: "With you, every ordinary moment turns into a cherished memory.",
      parents: "Beloved son of Proud Parents"
    },
    bride: {
      name: "Bride",
      fullName: "The Beautiful Bride",
      title: "Bride",
      bio: "Creative spirit, sunshine enthusiast, and the anchor that brings warmth and laughter to every day.",
      quote: "You are my answered prayer, my favorite story, and my forever home.",
      parents: "Beloved daughter of Proud Parents"
    },
    monogram: "G & B",
    tagline: "Two Hearts • One Journey",
    subTagline: "A Beautiful Chapter Begins... Better Together",
    hashtag: "#GrandWedding2026",
    quote: "Same Journey, Brighter Tomorrow."
  },

  // Dates & Timers (Target date for precision live countdown)
  dates: {
    // ISO-8601 formatted date string for countdown calculation
    targetDate: "2026-10-24T09:00:00+05:30",
    displayDate: "Saturday, 24 October 2026",
    auspiciousNote: "Subha Muhurtham • Vaikasi / Aippasi Auspicious Star",
    year: "2026",
    month: "October",
    day: "24",
    dayOfWeek: "Saturday"
  },

  // Venue Details (M.R.P Thirumana Mandapam, Vadaputhur)
  venue: {
    name: "M.R.P Thirumana Mandapam",
    hall: "Grand Main Hall & Dining",
    address: "Vadaputhur, Tamil Nadu 642109",
    region: "Pollachi / Coimbatore Region",
    googleMapsUrl: "https://maps.app.goo.gl/1GnqwUPNKJN2rUPX6?g_st=ac",
    embedMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15672.48202476536!2d76.99!3d10.82!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba84f64c0416975%3A0x8fa2c2bde47f86f8!2sM.R.P%20Thirumana%20Mandapam!5e0!3m2!1sen!2sin!4v1700000000000",
    travelGuide: {
      nearestRailway: "Kinathukadavu Railway Station (~10 km) / Pollachi Jn (~18 km) / Coimbatore Jn (~35 km)",
      nearestAirport: "Coimbatore International Airport (CJB) (~42 km)",
      parking: "Spacious dedicated car & bike parking available inside venue premises",
      landmark: "Easily accessible from Main Road, Vadaputhur"
    }
  },

  // Single-Day Event Schedule (24 October 2026)
  schedule: [
    {
      id: "muhurtham",
      title: "Subha Muhurtham",
      subtitle: "The Sacred Nuptial Ceremony",
      time: "09:00 AM – 10:30 AM",
      description: "Sacred chants, Kanyadaanam, and Mangalya Dharanam solemnizing the holy union of two souls amidst family blessings.",
      attire: "Traditional Silk / Pattu Veshti & Kanjeevaram Sarees",
      palette: ["#D4AF37", "#9E2A2B", "#FFFDD0"],
      icon: "ring"
    },
    {
      id: "virundhu",
      title: "Kalyana Virundhu",
      subtitle: "Traditional Grand Festive Feast",
      time: "11:30 AM – 02:30 PM",
      description: "An authentic, royal South Indian feast served traditionally on fresh banana leaves with traditional delicacies and sweet payasam.",
      attire: "Festive Traditional",
      palette: ["#2D6A4F", "#D4AF37", "#FAF6F0"],
      icon: "feast"
    },
    {
      id: "reception",
      title: "Grand Evening Reception",
      subtitle: "Celebrations, Music & Felicitations",
      time: "06:30 PM Onwards",
      description: "An enchanting evening of congratulations, photo moments, melodic music, and a lavish celebratory dinner with the newlyweds.",
      attire: "Royal & Festive Indo-Western / Glamorous Ethnic",
      palette: ["#1B4332", "#B8860B", "#F5EFEB"],
      icon: "sparkles"
    }
  ],

  // Dress Code Suggestions & Palette Visualizer
  dressCodeGuide: [
    { name: "Royal Gold", hex: "#D4AF37", text: "Gold, Zari, and Champagne accents" },
    { name: "Auspicious Crimson", hex: "#9E2A2B", text: "Deep reds, maroon, and rose hues" },
    { name: "Emerald Splendor", hex: "#1B4332", text: "Rich jewel-toned green silks" },
    { name: "Silk Cream", hex: "#FAF6F0", text: "Ivory, sandalwood, and muted pearls" },
    { name: "Festive Cyan", hex: "#00A8B5", text: "Vibrant peacock & turquoise blues" }
  ],

  // Love Story & Milestones
  story: [
    {
      year: "The Beginning",
      title: "When Stars Aligned",
      description: "Two families, two hearts, and a meeting that felt like reuniting with someone known for a lifetime."
    },
    {
      year: "The Connection",
      title: "Laughter, Conversations & Coffee",
      description: "Endless conversations about dreams, values, favorite foods, and the beautiful realization that our paths were meant to merge."
    },
    {
      year: "The Promise",
      title: "The Auspicious Yes",
      description: "With smiles, heartfelt vows, and our parents' joyful blessings, our families united to seal this golden bond."
    },
    {
      year: "24 October 2026",
      title: "The Grand Beginning",
      description: "Stepping around the sacred fire to begin our lifelong journey of companionship, joy, and mutual love."
    }
  ],

  // Ambient Audio Settings
  audio: {
    title: "Kalyana Mangalyam Flute & Sitar Ensemble",
    artist: "Auspicious Classical Melodies",
    src: "assets/audio/wedding-flute.mp3",
    autoPlayPromptText: "Tap to unseal the invitation with auspicious music"
  },

  // WhatsApp RSVP Concierge
  rsvp: {
    whatsappNumber: "919876543210", // Change to host's phone number without + or spaces
    eventHost: "The Wedding Host Family",
    defaultMessage: "Namaste! We are delighted to RSVP for the wedding on Saturday, 24 October 2026 at M.R.P Thirumana Mandapam, Vadaputhur.",
    deadlineNote: "Please kindly confirm your presence by 10 October 2026 to help us welcome you with warmth."
  },

  // Initial Blessings Seed (Pre-populated sample well-wishes)
  initialBlessings: [
    {
      name: "Suresh & Priya",
      relation: "Family Friends",
      blessing: "Wishing you both a lifetime of happiness, unconditional love, and endless joy! Can't wait to celebrate with you at Vadaputhur!",
      date: "September 2026",
      avatarEmoji: "💐"
    },
    {
      name: "Karthik R.",
      relation: "College Friend",
      blessing: "Hearty congratulations to the most wonderful pair! May this chapter be filled with laughter, adventures, and prosperity.",
      date: "September 2026",
      avatarEmoji: "✨"
    },
    {
      name: "Lakshmi Mami & Family",
      relation: "Relatives",
      blessing: "May the almighty shower all divine blessings on the lovely couple. Looking forward to the auspicious Muhurtham!",
      date: "September 2026",
      avatarEmoji: "🪔"
    }
  ]
};
