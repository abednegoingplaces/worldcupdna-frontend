const sharp = require('sharp');

sharp('public/wc2026-poster.webp')
  .modulate({
    brightness: 1.25,      // boost brightness significantly
    saturation: 2.8,       // very high saturation to make blues and golds explode
    hue: 0
  })
  .linear(1.6, -(128 * 0.6))  // aggressive contrast boost
  .sharpen({ sigma: 2.5, m1: 1.5, m2: 3 })  // strong sharpening
  .tint({ r: 10, g: 20, b: 60 })  // deep blue cinematic tint
  .toFile('public/wc2026-poster-enhanced.webp')
  .then(() => console.log('Done!'))
  .catch(console.error);
