const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const sampleProducts = [
  // ============ RINGS (6 products) ============
  {
    name: "Celestial Orbit Ring",
    description: "The Celestial Orbit Ring wraps your finger in flowing bands of molten gold, accented with two bezel-set crystals that shine like tiny planets in motion. Designed with an anti-tarnish, hypoallergenic finish, this airy statement ring is light to wear yet bold enough to steal the spotlight—perfect for stacking or wearing solo when you want all eyes on your glow.",
    price: 899,
    salePrice: 699,
    category: "rings",
    material: "Gold Plated with Crystals",
    images: ["/images/products/ring1.jpeg"],
    stock: 20,
    isOnSale: true,
    careInstructions: "Wipe with soft cloth after wear. Store separately to prevent scratching. Avoid water and chemicals."
  },
  {
    name: "Eternal Glow Stacking Ring Set",
    description: "Celebrate timeless elegance with our Eternal Glow Stacking Ring Set. This trio features two sleek gold bands and a dazzling eternity ring adorned with sparkling cubic zirconia stones—perfect for stacking, mixing, or wearing solo. Versatile and anti-tarnish, these rings are designed for lasting shine and effortless style. Hypoallergenic for everyday comfort.",
    price: 1299,
    salePrice: 999,
    category: "rings",
    material: "Gold & Silver Plated with Cubic Zirconia",
    images: ["/images/products/ring2.jpeg"],
    stock: 15,
    isOnSale: true,
    careInstructions: "Set of three stackable rings. Anti-tarnish finish. Store in provided box. Clean gently with jewelry cloth."
  },
  {
    name: "Radiant Harmony Wave Stacking Ring",
    description: "Embrace sculptural beauty with our Radiant Harmony Wave Stacking Ring. This statement piece features interconnected gold-plated bands with a flowing, wave-inspired design, adorned with two brilliant clear crystals for added sparkle. Anti-tarnish and hypoallergenic, it's a perfect solo statement or ideal for stacking with minimalist rings—bringing radiant energy to both everyday and special occasion looks.",
    price: 1099,
    category: "rings",
    material: "Gold Plated with Clear Crystals",
    images: ["/images/products/ring3.jpeg"],
    stock: 18,
    isOnSale: false,
    careInstructions: "Adjustable wide band. Remove before water activities. Polish with soft cloth to maintain shine."
  },
  {
    name: "Seaside Shell Stackable Ring",
    description: "Dive into beachy elegance with the Seaside Shell Stackable Ring. Crafted from luminous gold-tone stainless steel, this geometric open band features a repeating shell motif that wraps gracefully around your finger. Anti-tarnish and hypoallergenic, this comfortable statement piece is perfect solo or stacked with your favorite rings—making it a standout for daily wear, gifting, or special occasions.",
    price: 799,
    salePrice: 599,
    category: "rings",
    material: "Gold-Tone Stainless Steel",
    images: ["/images/products/ring4.jpeg"],
    stock: 25,
    isOnSale: true,
    careInstructions: "Adjustable open band fits most sizes. Water-resistant stainless steel. Clean with mild soap and water."
  },
  {
    name: "Luna Glow Crescent Moon Ring",
    description: "Let your style shine with the Luna Glow Crescent Moon Ring. Crafted in luminous gold, this dainty open band features a shimmering crescent moon set with pavé crystals and a delicate star accent. Hypoallergenic and anti-tarnish, it's perfect for dreamers and stargazers—ideal as a thoughtful gift, dainty stacker, or the centerpiece of your celestial jewelry collection.",
    price: 699,
    category: "rings",
    material: "Gold Plated with Pavé Crystals",
    images: ["/images/products/ring5.jpeg"],
    stock: 30,
    isOnSale: false,
    careInstructions: "Adjustable delicate band. Handle with care. Avoid harsh chemicals and perfumes. Store in soft pouch."
  },
  {
    name: "Starfall Sparkle Ring",
    description: "A delicate star-kissed band that captures the magic of a midnight sky, the Starfall Sparkle Ring is designed to shine from every angle. Tiny, light-catching stones trace the outline of a celestial star, set on an anti-tarnish, hypoallergenic band perfect for everyday wear. Stack it with your favorites or wear it solo for a subtle, dreamy glow that feels as special as a wish come true.",
    price: 799,
    category: "rings",
    material: "Anti-Tarnish Metal with Crystal Accents",
    images: ["/images/products/ring6.jpeg"],
    stock: 22,
    isOnSale: false,
    careInstructions: "Delicate star design. Clean with jewelry cloth. Remove before sleeping or exercising. Store flat."
  },

  // ============ EARRINGS (8 products) ============
  {
    name: "Ocean Glow Starfish Stud Earrings",
    description: "Channel the magic of the sea with our Ocean Glow Starfish Stud Earrings. These golden studs—crafted with an anti-tarnish finish—capture the whimsical charm and textured beauty of starfish, bringing a bit of shoreline sophistication to your everyday look. Lightweight and easy to wear, they're perfect for adding a touch of coastal shimmer whether you're at the beach or in the city.",
    price: 699,
    salePrice: 499,
    category: "earrings",
    material: "Gold Plated Anti-Tarnish",
    images: ["/images/products/earrings1.jpeg"],
    stock: 25,
    isOnSale: true,
    careInstructions: "Premium anti-tarnish coating. Hypoallergenic for sensitive ears. Classic push-back studs for comfort."
  },
  {
    name: "Golden Ribbon Bow Stud Earrings",
    description: "Add a touch of playful elegance to your style with our Golden Ribbon Bow Stud Earrings. Featuring a charming bow motif in gleaming anti-tarnish gold, these studs are perfect for illuminating every outfit with a hint of youthful grace. Crafted for comfortable, all-day wear and hypoallergenic for sensitive ears, they're a delightful accessory for parties, casual outings, or as a thoughtful gift.",
    price: 599,
    category: "earrings",
    material: "Gold Plated Anti-Tarnish",
    images: ["/images/products/earrings2.jpeg"],
    stock: 30,
    isOnSale: false,
    careInstructions: "Anti-tarnish coating for lasting shine. Lightweight and hypoallergenic. Secure push-back closure."
  },
  {
    name: "Celestial Dream Crescent Earrings",
    description: "Embrace the magic of the night sky with our Celestial Dream Crescent Earrings. These enchanting earrings pair shimmering crescent moons with radiant sunbursts and delicate pearl accents, all in a lustrous anti-tarnish gold finish. Perfect for stargazers and dreamers, these earrings add a celestial glow to any look—day or night. Lightweight, hypoallergenic, and crafted for all-day sparkle.",
    price: 1099,
    salePrice: 899,
    category: "earrings",
    material: "Gold Plated with Pearl Accents",
    images: ["/images/products/earrings3.jpeg"],
    stock: 20,
    isOnSale: true,
    careInstructions: "Anti-tarnish finish for enduring brilliance. Hypoallergenic and gentle. Unique moon and sun motif with pearl detailing."
  },
  {
    name: "Ocean Treasures Seashell Pearl Earrings",
    description: "Capture the elegance of the seaside with our Ocean Treasures Seashell Pearl Earrings. Each pair features a shimmering gold shell adorned with a cascade of luminous pearls, evoking the beauty and mystery of the ocean's treasures. Crafted with an anti-tarnish finish, these earrings are lightweight, hypoallergenic, and designed for comfort—perfect for daydreamers and mermaids at heart.",
    price: 999,
    salePrice: 799,
    category: "earrings",
    material: "Gold Plated with Genuine Pearls",
    images: ["/images/products/earrings4.jpeg"],
    stock: 18,
    isOnSale: true,
    careInstructions: "Anti-tarnish coating. Genuine pearl accents for luxury. Delicate seashell motif for beach-inspired statement."
  },
  {
    name: "Pearl Whisper Shell Drop Earrings",
    description: "Elevate your elegance with our Pearl Whisper Shell Drop Earrings. These luminous earrings pair a radiant faux pearl stud with an iridescent shell charm framed in anti-tarnish gold. Lightweight and graceful, they bring a touch of ocean-inspired beauty to any look—ideal for special occasions or adding subtle sophistication to your everyday style. Hypoallergenic and comfortable for all-day wear.",
    price: 899,
    category: "earrings",
    material: "Gold Plated with Faux Pearl & Shell",
    images: ["/images/products/earrings5.jpeg"],
    stock: 22,
    isOnSale: false,
    careInstructions: "Anti-tarnish finish. Faux pearl stud with mother-of-pearl shell drop. Hypoallergenic. Timeless minimalist design."
  },
  {
    name: "Seaside Charm Pearl & Shell Hoop Earrings",
    description: "Celebrate the beauty of the coast with our Seaside Charm Pearl & Shell Hoop Earrings. These minimalist gold hoops feature one elegant freshwater-inspired pearl and a dainty gold shell charm, blending timeless grace with playful versatility. Lightweight and finished with an anti-tarnish coating, they're perfect for mixing, matching, and expressing your individual style—whether paired together or worn solo. Hypoallergenic for all-day comfort.",
    price: 1199,
    salePrice: 999,
    category: "earrings",
    material: "Gold Plated Hoops with Pearl & Shell",
    images: ["/images/products/earrings6.jpeg"],
    stock: 15,
    isOnSale: true,
    careInstructions: "Anti-tarnish gold hoops. Charming shell and pearl pendants. Lightweight minimalist design. Perfect for stacking."
  },
  {
    name: "Seashell Whisper Pearl Hoops",
    description: "Bring a touch of the shoreline to your everyday style with our Seashell Whisper Pearl Hoops. Soft gold-toned open hoops cradle luminous pearl drops, photographed against sandy shell impressions for that dreamy, beachside feel. Finished with an anti-tarnish, hypoallergenic coating, these lightweight earrings are perfect for effortless elegance from sunrise coffee to sunset plans.",
    price: 1099,
    category: "earrings",
    material: "Gold-Tone Hoops with Pearl Drops",
    images: ["/images/products/earrings7.jpeg"],
    stock: 20,
    isOnSale: false,
    careInstructions: "Anti-tarnish gold-tone hoops. Lustrous pearl drops. Lightweight all-day wear. Hypoallergenic finish."
  },
  {
    name: "Golden Tide Drop Earrings",
    description: "Inspired by the smooth forms shaped by ocean waves, the Golden Tide Drop Earrings bring a touch of coastal elegance to your look. Their sleek gold-toned drop design is lightweight, minimal, and finished with an anti-tarnish, hypoallergenic coating—perfect for effortless everyday style.",
    price: 799,
    category: "earrings",
    material: "Gold-Tone Drop Design",
    images: ["/images/products/earrings8.jpeg"],
    stock: 25,
    isOnSale: false,
    careInstructions: "Elegant molten-drop gold design. Lightweight and comfortable. Anti-tarnish finish. Perfect for minimalist styling."
  },

  // ============ NECKLACES (10 products) ============
  {
    name: "Ocean Guardian Turtle Necklace",
    description: "Inspired by the gentle spirit of the sea, the Ocean Guardian Turtle Necklace adds a touch of coastal charm to your everyday style. The delicate gold-toned turtle pendant sits on a fine chain, creating a minimal yet meaningful piece perfect for daily wear.",
    price: 1299,
    salePrice: 999,
    category: "necklaces",
    material: "Gold-Tone with Turtle Pendant",
    images: ["/images/products/necklace1.jpeg"],
    stock: 20,
    isOnSale: true,
    careInstructions: "Detailed turtle pendant inspired by ocean life. Lightweight and comfortable. Hypoallergenic design."
  },
  {
    name: "Golden Wave Tail Necklace",
    description: "The Golden Wave Tail Necklace captures the beauty of ocean waves with its sleek whale-tail pendant design. Minimal and elegant, this delicate gold-toned necklace brings a subtle seaside vibe to your everyday look.",
    price: 1199,
    category: "necklaces",
    material: "Gold-Tone with Whale Tail Pendant",
    images: ["/images/products/necklace2.jpeg"],
    stock: 18,
    isOnSale: false,
    careInstructions: "Elegant whale-tail ocean-inspired pendant. Minimal design. Lightweight chain. Anti-tarnish finish."
  },
  {
    name: "Golden Rain Charm Necklace",
    description: "Playful yet elegant, the Golden Rain Charm Necklace features a delicate umbrella pendant symbolizing charm and positivity. Its sleek gold-toned finish makes it a unique statement piece for everyday outfits.",
    price: 1099,
    salePrice: 899,
    category: "necklaces",
    material: "Gold-Tone with Umbrella Charm",
    images: ["/images/products/necklace3.jpeg"],
    stock: 22,
    isOnSale: true,
    careInstructions: "Unique umbrella charm pendant design. Polished gold-tone finish. Lightweight. Hypoallergenic."
  },
  {
    name: "Seaside Treasure Shell Necklace",
    description: "Inspired by treasures found along the shore, the Seaside Treasure Shell Necklace features a delicate shell pendant paired with pearl and star accents. This ocean-inspired piece brings a soft coastal elegance to any outfit.",
    price: 1399,
    category: "necklaces",
    material: "Gold-Tone with Shell, Pearl & Star Charms",
    images: ["/images/products/necklace4.jpeg"],
    stock: 15,
    isOnSale: false,
    careInstructions: "Shell, pearl, and star ocean-inspired charms. Elegant gold-tone finish. Anti-tarnish coating."
  },
  {
    name: "Golden Pearl Bloom Necklace",
    description: "The Golden Pearl Bloom Necklace features a sculpted petal-shaped gold design holding a luminous pearl at its center. Elegant and minimal, it adds a soft, sophisticated touch to your everyday jewelry collection.",
    price: 1499,
    salePrice: 1199,
    category: "necklaces",
    material: "Gold-Tone with Pearl Bloom Pendant",
    images: ["/images/products/necklace5.jpeg"],
    stock: 18,
    isOnSale: true,
    careInstructions: "Elegant gold petal design with pearl accent. Lightweight chain. High-polish finish. Hypoallergenic."
  },
  {
    name: "Coastal Star Bead Necklace",
    description: "The Coastal Star Bead Necklace blends natural white beads with a golden starfish pendant for a relaxed beach-inspired look. Perfect for summer days, it adds a playful coastal touch to your style.",
    price: 1299,
    category: "necklaces",
    material: "Natural Beads with Gold Starfish Pendant",
    images: ["/images/products/necklace6.jpeg"],
    stock: 20,
    isOnSale: false,
    careInstructions: "Starfish pendant inspired by ocean beauty. Natural-style white bead design. Lightweight fit."
  },
  {
    name: "Ocean Treasure Charm Necklace",
    description: "Inspired by seaside treasures, the Ocean Treasure Charm Necklace features delicate charms including a shell, pearl, and starfish. This layered design captures the beauty of the ocean in a minimal yet elegant style.",
    price: 1599,
    salePrice: 1299,
    category: "necklaces",
    material: "Gold-Tone with Multiple Ocean Charms",
    images: ["/images/products/necklace7.jpeg"],
    stock: 15,
    isOnSale: true,
    careInstructions: "Shell, pearl, and starfish charm combination. Elegant gold-tone chain. Anti-tarnish finish."
  },
  {
    name: "Star Pearl Minimal Necklace",
    description: "The Star Pearl Minimal Necklace pairs a delicate gold starfish charm with a soft pearl accent. Simple yet elegant, this necklace brings a subtle ocean-inspired touch to everyday outfits.",
    price: 999,
    category: "necklaces",
    material: "Gold-Tone with Starfish & Pearl",
    images: ["/images/products/necklace8.jpeg"],
    stock: 25,
    isOnSale: false,
    careInstructions: "Minimal starfish and pearl charm design. Elegant gold-tone chain. Lightweight. Hypoallergenic."
  },
  {
    name: "Seaside Pearl Shell Necklace",
    description: "Inspired by treasures of the ocean, the Seaside Pearl Shell Necklace features delicate freshwater-style pearls paired with a golden shell charm. Elegant and minimal, this necklace brings a soft coastal glow to your everyday look.",
    price: 1399,
    salePrice: 1099,
    category: "necklaces",
    material: "Pearl Beads with Gold Shell Pendant",
    images: ["/images/products/necklace9.jpeg"],
    stock: 18,
    isOnSale: true,
    careInstructions: "Natural pearl-style bead necklace. Elegant gold shell pendant. Polished gold-tone finish."
  },
  {
    name: "Ocean Charm Link Necklace",
    description: "The Ocean Charm Link Necklace blends modern chain styling with delicate seaside charms. Featuring a crystal, shell, and starfish pendant, this gold-toned necklace adds a playful yet elegant coastal touch to any outfit.",
    price: 1699,
    category: "necklaces",
    material: "Gold Link Chain with Ocean Charms",
    images: ["/images/products/necklace10.jpeg"],
    stock: 12,
    isOnSale: false,
    careInstructions: "Unique link chain with ocean-inspired charms. Crystal, shell, and starfish pendants. High-polish finish."
  },

  // ============ BRACELETS (9 products - includes bangles & cuffs) ============
  {
    name: "Seaside Charm Pearl Bracelet",
    description: "The Seaside Charm Pearl Bracelet blends luminous pearl beads with ocean-inspired charms including a shell and starfish. A playful coastal piece designed to bring beachside elegance to your everyday style.",
    price: 1199,
    salePrice: 899,
    category: "bracelets",
    material: "Pearl Beads with Gold Charms",
    images: ["/images/products/bracelet1.jpeg"],
    stock: 20,
    isOnSale: true,
    careInstructions: "Pearl bead bracelet with ocean-themed charms. Gold-tone chain with adjustable clasp. Lightweight."
  },
  {
    name: "Ocean Star Charm Bracelet",
    description: "The Ocean Star Charm Bracelet features delicate pearls and sparkling charms inspired by the beauty of the sea. Its elegant gold chain adds a soft and feminine coastal touch.",
    price: 999,
    category: "bracelets",
    material: "Pearl & Crystal Charms with Gold Chain",
    images: ["/images/products/bracelet2.jpeg"],
    stock: 22,
    isOnSale: false,
    careInstructions: "Star and crystal charm design. Elegant pearl accents. Gold-tone adjustable chain. Lightweight."
  },
  {
    name: "Golden Pearl Clasp Bracelet",
    description: "The Golden Pearl Clasp Bracelet combines delicate pearls with a modern gold clasp design. This minimal yet elegant bracelet is perfect for adding a refined touch to everyday outfits.",
    price: 1099,
    salePrice: 799,
    category: "bracelets",
    material: "Pearl with Modern Gold Clasp",
    images: ["/images/products/bracelet3.jpeg"],
    stock: 18,
    isOnSale: true,
    careInstructions: "Elegant pearl and gold chain design. Modern circular clasp detail. Lightweight. Polished finish."
  },
  {
    name: "Golden Heart Charm Bracelet",
    description: "The Golden Heart Charm Bracelet features delicate heart accents along a fine gold chain, symbolizing love and elegance. A charming piece perfect for everyday wear.",
    price: 899,
    category: "bracelets",
    material: "Gold Chain with Heart Charms",
    images: ["/images/products/bracelet4.jpeg"],
    stock: 25,
    isOnSale: false,
    careInstructions: "Elegant heart charm design. Fine gold-tone chain. Lightweight. Adjustable clasp for flexibility."
  },
  {
    name: "Snowflake Sparkle Bracelet",
    description: "Inspired by the beauty of winter snowflakes, the Snowflake Sparkle Bracelet features a delicate snowflake charm set on a fine gold chain.",
    price: 799,
    salePrice: 599,
    category: "bracelets",
    material: "Gold Chain with Snowflake Charm",
    images: ["/images/products/bracelet5.jpeg"],
    stock: 20,
    isOnSale: true,
    careInstructions: "Snowflake-inspired charm design. Elegant gold-tone chain. Lightweight minimal style. Adjustable clasp."
  },
  {
    name: "Golden Blossom Cuff Bracelet",
    description: "Inspired by delicate blooming flowers, the Golden Blossom Cuff Bracelet features intricately detailed floral accents in a radiant gold-tone finish. This open cuff design brings a graceful and feminine touch to any outfit.",
    price: 1499,
    salePrice: 1199,
    category: "bracelets",
    material: "Gold-Tone Floral Cuff",
    images: ["/images/products/cuff1.jpeg"],
    stock: 15,
    isOnSale: true,
    careInstructions: "Floral-inspired gold cuff design. High-polish finish. Adjustable open cuff. Lightweight statement accessory."
  },
  {
    name: "Golden Coral Cuff Bracelet",
    description: "Inspired by the organic patterns of ocean coral, the Golden Coral Cuff Bracelet features an artistic openwork design. Its sculptural form adds a bold yet elegant statement to your jewelry collection.",
    price: 1599,
    category: "bracelets",
    material: "Gold-Tone Coral Openwork Cuff",
    images: ["/images/products/cuff2.jpeg"],
    stock: 12,
    isOnSale: false,
    careInstructions: "Coral-inspired open cuff design. Elegant gold-tone polished finish. Lightweight statement bracelet."
  },
  {
    name: "Golden Leaf Cuff Bracelet",
    description: "The Golden Leaf Cuff Bracelet showcases a beautifully textured leaf-inspired design. Its artistic gold finish captures the elegance of nature in a bold statement piece.",
    price: 1399,
    salePrice: 1099,
    category: "bracelets",
    material: "Gold-Tone Leaf Design Cuff",
    images: ["/images/products/cuff3.jpeg"],
    stock: 18,
    isOnSale: true,
    careInstructions: "Nature-inspired leaf design cuff. Elegant gold-tone polished finish. Adjustable open cuff. Lightweight."
  },
  {
    name: "Golden Pearl Wave Cuff",
    description: "The Golden Pearl Wave Cuff features flowing gold bands accented with delicate pearls. Its elegant layered design creates a graceful and modern jewelry statement.",
    price: 1699,
    category: "bracelets",
    material: "Gold-Tone Layered Cuff with Pearls",
    images: ["/images/products/cuff4.jpeg"],
    stock: 10,
    isOnSale: false,
    careInstructions: "Layered wave-style cuff design. Elegant pearl accents. High-polish gold-tone finish. Comfortable open cuff."
  },

  // ============ BANGLES (1 product) ============
  {
    name: "Modern Ridge Gold Bangle",
    description: "The Modern Ridge Gold Bangle features a sleek structured design with curved ridges that reflect light beautifully. A contemporary piece that brings sophistication to everyday wear.",
    price: 1299,
    salePrice: 999,
    category: "bangles",
    material: "Structured Gold-Tone Bangle",
    images: ["/images/products/bangle1.jpeg"],
    stock: 20,
    isOnSale: true,
    careInstructions: "Structured ridge-style gold bangle. High-polish gold-tone finish. Durable and comfortable. Modern minimalist aesthetic."
  },

  // ============ JEWELRY SETS (12 products) ============
  {
    name: "Pearl Harmony Jewelry Set",
    description: "Inspired by timeless elegance, the Pearl Harmony Jewelry Set features delicate pearls paired with sleek gold accents. This coordinated set brings effortless sophistication to both everyday looks and special occasions.",
    price: 3999,
    salePrice: 2999,
    category: "jewelry-set",
    material: "Pearl with Gold Accents",
    images: ["/images/products/set1.jpeg"],
    stock: 10,
    isOnSale: true,
    careInstructions: "Elegant pearl necklace, bracelet, and earrings set. Classic pearl design with gold-tone accents. Lightweight."
  },
  {
    name: "Modern Pearl Link Necklace",
    description: "The Modern Pearl Link Necklace combines sleek gold chain links with soft pearl accents for a contemporary yet elegant style. A perfect balance of minimal design and timeless beauty.",
    price: 2499,
    category: "jewelry-set",
    material: "Gold Link Chain with Pearls",
    images: ["/images/products/set2.jpeg"],
    stock: 12,
    isOnSale: false,
    careInstructions: "Modern link chain with pearl accents. Elegant gold-tone polished finish. Lightweight. Minimal design."
  },
  {
    name: "Golden Twist Hoop Earrings Set",
    description: "Inspired by flowing ocean waves, the Golden Twist Hoop Earrings feature an elegant braided design with a polished gold finish. These hoops add a bold yet refined touch to any outfit.",
    price: 1899,
    salePrice: 1499,
    category: "jewelry-set",
    material: "Braided Gold-Tone Hoops",
    images: ["/images/products/set3.jpeg"],
    stock: 15,
    isOnSale: true,
    careInstructions: "Elegant twisted hoop design. High-polish gold-tone finish. Lightweight. Durable anti-tarnish coating."
  },
  {
    name: "Radiant Crystal Cuff Set",
    description: "The Radiant Crystal Cuff Set showcases shimmering crystal details set within a sleek gold cuff and matching earrings. A bold statement piece designed for modern elegance.",
    price: 4499,
    salePrice: 3499,
    category: "jewelry-set",
    material: "Gold with Crystal Embellishments",
    images: ["/images/products/set4.jpeg"],
    stock: 8,
    isOnSale: true,
    careInstructions: "Sparkling crystal embedded design. Elegant gold-tone cuff and earrings. Durable fit. High-shine finish."
  },
  {
    name: "Luminous Pearl Bloom Set",
    description: "The Luminous Pearl Bloom Set features a delicate pearl centerpiece framed by a shimmering gold floral design. A graceful set that blends classic pearls with modern luxury.",
    price: 4999,
    category: "jewelry-set",
    material: "Pearl with Gold Floral Design",
    images: ["/images/products/set5.jpeg"],
    stock: 7,
    isOnSale: false,
    careInstructions: "Pearl centerpiece with gold floral design. Elegant necklace, ring, and earrings set. High-polish finish."
  },
  {
    name: "Golden Pearl Chain Collection",
    description: "The Golden Pearl Chain Collection highlights the beauty of pearls paired with sleek gold chains. This modern design blends minimalism with classic elegance for everyday sophistication.",
    price: 3499,
    salePrice: 2799,
    category: "jewelry-set",
    material: "Gold Chain with Pearl Accents",
    images: ["/images/products/set6.jpeg"],
    stock: 10,
    isOnSale: true,
    careInstructions: "Unique chain and pearl combination. Elegant gold-tone finish. Lightweight. Minimal modern design."
  },
  {
    name: "Minimal Luxe Layered Jewelry Set",
    description: "The Minimal Luxe Layered Jewelry Set combines delicate gold chains, pearl accents, and textured rings for a refined modern aesthetic.",
    price: 4299,
    category: "jewelry-set",
    material: "Gold Chains, Pearls & Rings",
    images: ["/images/products/set7.jpeg"],
    stock: 9,
    isOnSale: false,
    careInstructions: "Elegant layered necklace design. Matching rings and bracelet included. Polished gold-tone finish. Lightweight."
  },
  {
    name: "Pearl Drop Elegance Set",
    description: "The Pearl Drop Elegance Set features delicate pearl drop earrings, a matching necklace, and a stylish ring. Designed to bring timeless beauty and sophistication to any outfit.",
    price: 3899,
    salePrice: 2999,
    category: "jewelry-set",
    material: "Pearl Drops with Gold Accents",
    images: ["/images/products/set8.jpeg"],
    stock: 11,
    isOnSale: true,
    careInstructions: "Classic pearl drop jewelry design. Elegant gold-tone accents. Lightweight. Hypoallergenic and skin-friendly."
  },
  {
    name: "Seaside Pearl Charm Set",
    description: "Inspired by the beauty of the ocean, the Seaside Pearl Charm Set blends delicate pearls with starfish charms. A playful yet elegant design perfect for beach-inspired style.",
    price: 3299,
    category: "jewelry-set",
    material: "Pearl with Starfish Charms",
    images: ["/images/products/set9.jpeg"],
    stock: 12,
    isOnSale: false,
    careInstructions: "Starfish charm with pearl necklace design. Elegant gold-tone finish. Lightweight. Perfect for summer styling."
  },
  {
    name: "Crystal Radiance Pendant Necklace",
    description: "The Crystal Radiance Pendant Necklace features a sparkling crystal set in a delicate gold pendant. A timeless piece designed to add subtle brilliance to everyday style.",
    price: 2799,
    salePrice: 2199,
    category: "jewelry-set",
    material: "Gold with Crystal Pendant",
    images: ["/images/products/set10.jpeg"],
    stock: 14,
    isOnSale: true,
    careInstructions: "Brilliant crystal pendant centerpiece. Elegant gold-tone chain design. Lightweight. Anti-tarnish finish."
  },
  {
    name: "Pearl Charm Bracelet & Necklace Set",
    description: "This elegant pearl jewelry set blends delicate pearls with gold charm details for a refined and stylish appearance.",
    price: 3699,
    category: "jewelry-set",
    material: "Pearl with Gold Charms",
    images: ["/images/products/set11.jpeg"],
    stock: 10,
    isOnSale: false,
    careInstructions: "Elegant pearl bracelet and necklace set. Gold-tone charm accents. Lightweight. Durable anti-tarnish finish."
  },
  {
    name: "Ocean Star Pearl Choker Set",
    description: "The Ocean Star Pearl Choker Set features a delicate pearl choker adorned with golden starfish charms and matching earrings. A beautiful piece inspired by seaside elegance.",
    price: 4199,
    salePrice: 3299,
    category: "jewelry-set",
    material: "Pearl Choker with Starfish Charms",
    images: ["/images/products/set12.jpeg"],
    stock: 8,
    isOnSale: true,
    careInstructions: "Starfish charm pearl choker design. Elegant gold-tone accents. Lightweight. Perfect for beach-inspired fashion."
  }
];

const seedDatabase = async () => {
  try {
    console.log('🔄 Clearing existing products...');
    await Product.deleteMany({});
    
    console.log('📦 Adding sample products...');
    await Product.insertMany(sampleProducts);
    
    console.log('✅ Sample products added successfully!');
    console.log(`✅ Added ${sampleProducts.length} products to database`);
    console.log('\n📊 Products by Category:');
    console.log(`   - Rings: 6 products`);
    console.log(`   - Earrings: 8 products`);
    console.log(`   - Necklaces: 10 products`);
    console.log(`   - Bracelets: 9 products (includes cuffs)`);
    console.log(`   - Bangles: 1 product`);
    console.log(`   - Jewelry Sets: 12 products`);
    console.log(`\n💎 Total: ${sampleProducts.length} products\n`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();