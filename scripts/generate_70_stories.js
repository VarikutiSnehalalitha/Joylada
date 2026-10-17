// scripts/generate_70_stories.js
const fs = require('fs');
const path = require('path');

// Curated high-res book-aesthetic cover images by theme
const COVERS = {
  romance: [
    "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80", // rose & petals
    "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80", // love embrace
    "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80", // sunset couple
    "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80", // portrait moody
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80", // warm cafe couple
    "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?auto=format&fit=crop&w=800&q=80", // autumn walk
    "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80", // letter romance
    "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80", // vintage piano love
    "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80", // rainy window
    "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=800&q=80", // ballroom aesthetic
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80", // vinyl records & intimacy
    "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80", // wildflowers & devotion
  ],
  fantasy: [
    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80", // mystical castle
    "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80", // enchanted forest
    "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80", // magical sword / aura
    "https://images.unsplash.com/photo-1514539079130-25950c84af65?auto=format&fit=crop&w=800&q=80", // ancient ruins in fog
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80", // starry mountains
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80", // cosmic nebula magic
    "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80", // ethereal dragon painting
    "https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?auto=format&fit=crop&w=800&q=80", // ancient stone portal
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80", // twilight waterfall valley
    "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80", // glowing arcane circle
  ],
  mystery: [
    "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=800&q=80", // moody alleyway
    "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80", // dark library mystery
    "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=800&q=80", // dark noir street lights
    "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80", // typewriter detective
    "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80", // misty pine forest secret
    "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=800&q=80", // dark foggy pines
    "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=800&q=80", // flashlight in woods
    "https://images.unsplash.com/photo-1519074069444-1ba4ea16e879?auto=format&fit=crop&w=800&q=80", // old keys & locks
  ],
  ya: [
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80", // teen friends summer
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80", // fierce young girl portrait
    "https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?auto=format&fit=crop&w=800&q=80", // youthful rebellion neon
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80", // summer freckles smile
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80", // golden hour teen
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80", // school lockers hallway
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80", // urban skate youth
    "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=800&q=80", // stargazing roof
  ],
  scifi: [
    "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80", // cyberpunk neon city
    "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80", // earth orbit space station
    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80", // futuristic geometry
    "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?auto=format&fit=crop&w=800&q=80", // deep space galaxy
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80", // matrix green code terminal
    "https://images.unsplash.com/photo-1484589065579-248aad0d8b13?auto=format&fit=crop&w=800&q=80", // solar flare eclipse
  ],
  horror: [
    "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=800&q=80", // creepy antique doll/shadow
    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80", // gothic mansion silhouette
    "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80", // fog haunted trees
    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80", // abandoned staircase
    "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80", // blood moon night
    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80", // eerie crow on bare branch
  ],
  adventure: [
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80", // road trip van cliff
    "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=800&q=80", // mountain explorer backpacker
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80", // tropical island explorer
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80", // alpine fjord canoe
    "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80", // sand dunes expedition
  ],
  historical: [
    "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=800&q=80", // vintage pocket watch & books
    "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80", // old european library
    "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80", // victorian oil painting
    "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=800&q=80", // 1920s jazz gramophone
  ],
  contemporary: [
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80", // modern glass cafe
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80", // sleek skyscraper
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80", // coffee & workspace
    "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80", // city intersection twilight
  ],
  fanfiction: [
    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80", // gothic cathedral tower
    "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80", // magic spell book & sparks
    "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80", // twin suns desert planet
  ],
  lgbtq: [
    "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80", // tender warm connection
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80", // coastal laughter sunset
  ],
  poetry: [
    "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80", // fountain pen journal
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80", // quiet lake reflection
  ]
};

// Authors pool
const AUTHORS = [
  { id: "author-1", username: "clara_vane", name: "Clara Vane", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80", bio: "Gothic romance and melancholic coastal tales. Winner of the 2024 Folio Quill Award.", role: "author", followersCount: 14200, followingCount: 88, storiesCount: 6, joinedDate: "2023-01-15", badges: ["Bestseller", "Editor's Choice"] },
  { id: "author-2", username: "julian_cross", name: "Julian Cross", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80", bio: "High fantasy architect and worldbuilder. Maps, dragons, and forgotten magic.", role: "author", followersCount: 28900, followingCount: 112, storiesCount: 8, joinedDate: "2022-11-03", badges: ["Prolific Scribe", "Fantasy Maestro"] },
  { id: "author-3", username: "mira_chen", name: "Mira Chen", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80", bio: "Techno-thrillers, cybernetic futures, and speculative ethics.", role: "author", followersCount: 19500, followingCount: 140, storiesCount: 5, joinedDate: "2023-04-20", badges: ["Sci-Fi Visionary"] },
  { id: "author-4", username: "arthur_pendleton", name: "Arthur Pendleton", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80", bio: "Historical mysteries set in fog-drenched Victorian London and Edinburgh.", role: "author", followersCount: 12300, followingCount: 45, storiesCount: 4, joinedDate: "2023-06-11", badges: ["Historical Master"] },
  { id: "author-5", username: "elena_solis", name: "Elena Solís", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80", bio: "Enemies-to-lovers, slow-burn romantic drama, and witty banter enthusiast.", role: "author", followersCount: 34100, followingCount: 220, storiesCount: 9, joinedDate: "2022-08-19", badges: ["Romance Royalty", "Community Favorite"] },
  { id: "author-6", username: "rowan_blackwood", name: "Rowan Blackwood", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80", bio: "Cosmic horror, uncanny folklore, and rural legends that keep you up at night.", role: "author", followersCount: 16700, followingCount: 65, storiesCount: 5, joinedDate: "2023-02-28", badges: ["Horror Luminary"] },
  { id: "author-7", username: "sofia_alvarez", name: "Sofia Alvarez", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80", bio: "Coming-of-age young adult stories filled with heart, rebellion, and found family.", role: "author", followersCount: 21800, followingCount: 190, storiesCount: 7, joinedDate: "2023-03-14", badges: ["YA Star"] },
  { id: "author-8", username: "lucian_mercer", name: "Lucian Mercer", avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80", bio: "Dark academia, whispered conspiracies, and secret society thrillers.", role: "author", followersCount: 18400, followingCount: 95, storiesCount: 6, joinedDate: "2023-07-02", badges: ["Mystery Maestro"] },
  { id: "author-9", username: "maya_patel", name: "Maya Patel", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80", bio: "Contemporary fiction exploring identity, modern careers, and complex families.", role: "author", followersCount: 15300, followingCount: 130, storiesCount: 5, joinedDate: "2023-05-18", badges: ["Contemporary Voice"] },
  { id: "author-10", username: "damon_vance", name: "Damon Vance", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80", bio: "Wild survival sagas, high-seas voyages, and deep wilderness expeditions.", role: "author", followersCount: 13900, followingCount: 70, storiesCount: 4, joinedDate: "2023-08-09", badges: ["Adventure Trailblazer"] },
  { id: "author-11", username: "kael_teng", name: "Kael Teng", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80", bio: "Queer romance and heartfelt contemporary journeys of self-discovery.", role: "author", followersCount: 17200, followingCount: 105, storiesCount: 5, joinedDate: "2023-09-22", badges: ["Inspiring Voice"] },
  { id: "author-12", username: "isla_faye", name: "Isla Faye", avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=200&q=80", bio: "Lyrical poetry, micro-prose, and intimate meditations on grief and renewal.", role: "author", followersCount: 11800, followingCount: 55, storiesCount: 4, joinedDate: "2023-10-05", badges: ["Poet Laureate"] },
];

// Helper to pick author
function getAuthor(index) {
  return AUTHORS[index % AUTHORS.length];
}

// 70 story specifications
const STORY_SPECS = [
  // --- ROMANCE (12 Stories) ---
  {
    title: "Letters from the Orchard",
    genre: "Romance",
    tags: ["Small Town", "Slow Burn", "Second Chances", "Letters"],
    rating: "All Ages",
    warnings: [],
    status: "completed",
    isEditorPick: true,
    isTrending: true,
    isFeatured: true,
    synopsis: "When an inheritance forces corporate strategist Evelyn back to her grandmother's cider orchards in Vermont, she uncovers fifty years of unsent correspondence between her family and the reclusive woodworker next door, Luke Vance. As Evelyn fights to keep the land from predatory developers, she and Luke begin leaving notes in the knothole of an ancient apple tree—letters that steadily strip away the walls they built around their broken hearts.",
    ch1Title: "The Knothole in the Baldwin Tree",
    ch2Title: "Ink Upon Cold Cider Wood",
    ch3Title: "The Taste of October Rain"
  },
  {
    title: "Whispers in the Starlight",
    genre: "Romance",
    tags: ["Enemies to Lovers", "Astronomy", "Academic Rivalry", "Slow Burn"],
    rating: "Teen (13+)",
    warnings: [],
    status: "ongoing",
    isEditorPick: false,
    isTrending: true,
    isFeatured: false,
    synopsis: "Dr. Maeve Higgins and Dr. Jesse Corvo have spent three years competing for the lone tenure-track chair at the High Alps Observatory. When a rare celestial anomaly locks them together in a mountaintop snowstorm for three weeks, their sharp academic barbs give way to shared mugs of dark roast, stargazing confessions, and a gravitational pull neither telescope can measure.",
    ch1Title: "Negative Parallax",
    ch2Title: "Sub-Zero Constellations",
    ch3Title: "The Orbit of Two"
  },
  {
    title: "The Baker's Secret Waltz",
    genre: "Romance",
    tags: ["Fake Dating", "Baking", "Vienna", "Billionaire Romance"],
    rating: "All Ages",
    warnings: [],
    status: "completed",
    isEditorPick: false,
    isTrending: false,
    isFeatured: false,
    synopsis: "To salvage her family's historic patisserie in Vienna, Claire Dupont agrees to be the fake fiancée of Julian Von Sternberg, an heir looking to escape his family's arranged match. Between dusting cardamom rolls and rehearsing imperial waltzes under crystal chandeliers, Claire discovers Julian's aloof aristocrat persona hides a man who dreams only of an ordinary life with her.",
    ch1Title: "Flour on a Tuxedo Lapel",
    ch2Title: "Three-Quarter Time Pretenses",
    ch3Title: "Sweet Almond Sugar"
  },
  {
    title: "Second Chance at Sunrise",
    genre: "Romance",
    tags: ["Second Chances", "Coastal", "Single Parent", "Emotional"],
    rating: "Teen (13+)",
    warnings: [],
    status: "completed",
    isEditorPick: true,
    isTrending: false,
    isFeatured: false,
    synopsis: "Ten years after walking away from their seaside hometown, pediatric nurse Hannah returns with her seven-year-old daughter to rebuild a quiet life. She never expected that her first emergency house call would be for the lighthouse keeper—Liam, the first love she abandoned without an explanation. Now, the past tides return with questions that can no longer wait.",
    ch1Title: "The Tide at Cape Solitude",
    ch2Title: "Salt on the Porch Steps",
    ch3Title: "Forgiveness in Low Light"
  },
  {
    title: "The Parisian Manuscript",
    genre: "Romance",
    tags: ["Historical Vibe", "Bookstore", "Paris", "Forbidden Love"],
    rating: "Teen (13+)",
    warnings: [],
    status: "ongoing",
    isEditorPick: false,
    isTrending: true,
    isFeatured: false,
    synopsis: "Working at an eccentric bilingual bookshop on the Left Bank, Camille discovers a half-annotated diary hidden behind the shelves. Every Tuesday, a stranger writes back in the margins with breathtaking poetic honesty. When she finally stakes out the aisle to confront the mysterious reader, she finds herself face-to-face with the city's most elusive literary biographer.",
    ch1Title: "Marginalia by Candlelight",
    ch2Title: "The Rue Mouffetard Crossing",
    ch3Title: "An Unfinished Epilogue"
  },
  {
    title: "A Vow Across the Table",
    genre: "Romance",
    tags: ["Office Romance", "Rivals", "Lawyers", "Banter"],
    rating: "Teen (13+)",
    warnings: [],
    status: "ongoing",
    isEditorPick: false,
    isTrending: false,
    isFeatured: false,
    synopsis: "High-powered litigators Diana Ross and Gabriel Vance have never settled a case between them. When their managing partners order them to co-lead a high-stakes humanitarian arbitration in Geneva, 14-hour prep sessions turn into late-night room service confessions. Gabriel has spent five years pretending he hated her just to keep his own heart from surrendering.",
    ch1Title: "Cross-Examination of the Heart",
    ch2Title: "Off the Record at Midnight",
    ch3Title: "Closing Argument"
  },
  {
    title: "Summer of the Glass House",
    genre: "Romance",
    tags: ["Artist", "Botany", "Healing", "Slow Burn"],
    rating: "All Ages",
    warnings: [],
    status: "completed",
    isEditorPick: false,
    isTrending: false,
    isFeatured: false,
    synopsis: "Recovering from an injury that stole her career as an illustrator, Maya rents an overgrown glasshouse conservatory in Cornwall. The owner, botanist Samuel Blake, only asks that she water his rare nocturnal orchids. In the quiet moisture of the greenhouse, surrounded by blooming night-blooming cereus, two solitary spirits learn to grow toward the sunlight once again.",
    ch1Title: "Night-Blooming Cereus",
    ch2Title: "Charcoal Dust and Rain",
    ch3Title: "Roots in Quiet Soil"
  },
  {
    title: "The Sound of Your Name",
    genre: "Romance",
    tags: ["Music", "Pianist", "Soulmates", "Heartfelt"],
    rating: "All Ages",
    warnings: [],
    status: "ongoing",
    isEditorPick: false,
    isTrending: false,
    isFeatured: false,
    synopsis: "Cellist Naomi had lost her stage nerve after a public breakdown. Conductor and composer Matteo Rossi offers her a deal: play his newly commissioned concerto in private rehearsals until she is ready. Each movement he composed is a secret love letter written for her hands, and Naomi must decide if she is brave enough to play the final chord.",
    ch1Title: "The Adagio in B Minor",
    ch2Title: "Resonance in the Empty Hall",
    ch3Title: "Forte Con Amore"
  },
  {
    title: "Hearts in the High Meadow",
    genre: "Romance",
    tags: ["Country", "Ranch", "Opposites Attract", "Sweet"],
    rating: "All Ages",
    warnings: [],
    status: "completed",
    isEditorPick: false,
    isTrending: false,
    isFeatured: false,
    synopsis: "City wildlife vet Rebecca takes a seasonal contract in the rugged Montana valleys, clashing immediately with third-generation cattle rancher Cole Daniels over how to protect wolf corridors. When an orphaned cub forces them into an uneasy alliance, Rebecca discovers the gentleness Cole shields beneath his weathered leather jacket.",
    ch1Title: "Frost on the Fence Wire",
    ch2Title: "Tracks in the Blue Ridge",
    ch3Title: "Lantern Light at the Barn"
  },
  {
    title: "Between Coffee and Midnight",
    genre: "Romance",
    tags: ["Coffee Shop", "Late Night", "College", "Cozy"],
    rating: "All Ages",
    warnings: [],
    status: "completed",
    isEditorPick: false,
    isTrending: false,
    isFeatured: false,
    synopsis: "Every night from 11 PM to 2 AM, shift barista Leo pours chamomile tea for Chloe, an exhausted architectural grad student building models in the corner booth. Over sketchpads, spilled grounds, and rain tapping against the foggy windows, late-night silence transforms into the only place they both feel truly understood.",
    ch1Title: "The 11:45 PM Pour",
    ch2Title: "Cardboard Foundations",
    ch3Title: "Steamed Milk and Promises"
  },
  {
    title: "The Autumn Arrangement",
    genre: "Romance",
    tags: ["Marriage of Convenience", "Royalty", "Courtship", "Slow Burn"],
    rating: "Teen (13+)",
    warnings: [],
    status: "ongoing",
    isEditorPick: true,
    isTrending: true,
    isFeatured: false,
    synopsis: "Lady Genevieve agrees to a political union with the solemn Duke of Westfall to secure sanctuary for her family's scholars. Westfall is rumored to have a heart carved of granite, but in his quiet manor library, Genevieve finds a man who leaves warm wool shawls across her chair and reads her favorite poets in the dusk.",
    ch1Title: "Signatures Upon Vellum",
    ch2Title: "The Hearth of Westfall",
    ch3Title: "A Shawl in the Reading Room"
  },
  {
    title: "The Lighthouse Keeper's Heart",
    genre: "Romance",
    tags: ["Coastal", "Mystery Romance", "Isolated", "Atmospheric"],
    rating: "All Ages",
    warnings: [],
    status: "completed",
    isEditorPick: false,
    isTrending: false,
    isFeatured: false,
    synopsis: "Stationed on a gale-swept island off the Scottish coast, lighthouse keeper Callum lives in complete peace until maritime historian Fiona arrives to catalog the station's logbooks. As autumn storms cut the ferry line, the island isolates them with old ship logs, wood fires, and an undeniable attraction that burns brighter than the beacon.",
    ch1Title: "The North Atlantic Gale",
    ch2Title: "Spindle Steps and Sea Foam",
    ch3Title: "The Beacon Keeps Watch"
  },

  // --- FANTASY (10 Stories) ---
  {
    title: "The Crown of Pale Ash",
    genre: "Fantasy",
    tags: ["Dark Fantasy", "Magic System", "Royalty", "Dragons"],
    rating: "Teen (13+)",
    warnings: ["Violence", "Court Intrigue"],
    status: "ongoing",
    isEditorPick: true,
    isTrending: true,
    isFeatured: true,
    synopsis: "In the shattered empire of Oakhaven, magic does not come from blood or birth—it is forged in ash after a dragon falls. Kaelen, an apprentice blacksmith with the cursed mark of cinder upon his palms, is summoned to the high spire after the Emperor's sudden death. A terrifying dragon of obsidian scales circles the capital, and Kaelen alone holds the secret to quench its primordial wrath.",
    ch1Title: "Embers in the Anvil",
    ch2Title: "The Spire of Obsidian Glass",
    ch3Title: "The Breath of Old Flame"
  },
  {
    title: "The Weaver of Forgotten Echoes",
    genre: "Fantasy",
    tags: ["High Fantasy", "Memory Magic", "Epic Quest", "Worldbuilding"],
    rating: "All Ages",
    warnings: [],
    status: "ongoing",
    isEditorPick: true,
    isTrending: false,
    isFeatured: false,
    synopsis: "In the floating archipelago of Celestia, memories are harvested as silk threads to power the great cloud galleons. Saria is a master weaver who discovers an illicit skein of black silk containing memories of a cataclysm the Arch-Mages swore never happened. Hunted by the Iron Inquisitors, she must thread the sky before the past unravels the realm.",
    ch1Title: "The Thread of Stolen Silver",
    ch2Title: "Galleons in the Mist",
    ch3Title: "The Forbidden Loom"
  },
  {
    title: "Daughter of the Sunken Spire",
    genre: "Fantasy",
    tags: ["Oceanic Fantasy", "Sirens", "Ancient Ruins", "Mythology"],
    rating: "Teen (13+)",
    warnings: [],
    status: "completed",
    isEditorPick: false,
    isTrending: true,
    isFeatured: false,
    synopsis: "Deep beneath the Sapphire Trench lies Thalassia, a submerged kingdom of bioluminescent coral and tide-singers. When the eternal pearls that illuminate the ocean floor begin dying one by one, Princess Nerida ventures up into the forbidden sunlit surface to negotiate with a human sailor whose compass points to submerged leviathans.",
    ch1Title: "The Fading Bioluminescence",
    ch2Title: "Breaching the Mirror",
    ch3Title: "A Compass of Salt and Iron"
  },
  {
    title: "The Alchemist's Glass Garden",
    genre: "Fantasy",
    tags: ["Alchemy", "Cozy Fantasy", "Potions", "Secrets"],
    rating: "All Ages",
    warnings: [],
    status: "completed",
    isEditorPick: false,
    isTrending: false,
    isFeatured: false,
    synopsis: "Master Alchemist Corin brews solutions for broken hearts, sleepless monarchs, and wilted harvests inside a miraculous domed sanctuary where plants are forged from colored crystal. When an enigmatic traveler brings him a single leaf made of living mercury, Corin embarks on a quiet voyage into the origin of forgotten transmutation.",
    ch1Title: "Mercury on the Fern Fronds",
    ch2Title: "Vials of Distilled Dawn",
    ch3Title: "The Transmutation of Sorrow"
  },
  {
    title: "Shadows Over Eldoria",
    genre: "Fantasy",
    tags: ["Sword & Sorcery", "Elves", "Dark Lord", "War"],
    rating: "Teen (13+)",
    warnings: ["Fantasy Violence"],
    status: "ongoing",
    isEditorPick: false,
    isTrending: false,
    isFeatured: false,
    synopsis: "The border fortress of Eldoria has guarded the elven frontier for a thousand winters. When a subterranean legion of shadow-drakes bursts through the foundation stones, veteran ranger Donald and a runaway elven sorceress must ignite the ancient beacons across the Wyrmtooth Peaks before the realm falls into eternal night.",
    ch1Title: "The Tremor Beneath the Bastion",
    ch2Title: "Wyrmtooth Beacon",
    ch3Title: "Arrows Dipped in Starlight"
  },
  {
    title: "The Clockwork Familiar",
    genre: "Fantasy",
    tags: ["Steampunk", "Magic", "Artificer", "Adventure"],
    rating: "All Ages",
    warnings: [],
    status: "completed",
    isEditorPick: false,
    isTrending: false,
    isFeatured: false,
    synopsis: "Barnaby, a deaf tinkerer in the clockwork city of Gearhaven, builds a mechanical raven powered by a soul-shard he found in the gutters. To his shock, the raven speaks ancient draconic and warns him that the grand gear clock maintaining the city's gravity is counting down to zero.",
    ch1Title: "Brass Feathers and Cog Springs",
    ch2Title: "The Singing Pendulum",
    ch3Title: "Zero Hour in Gearhaven"
  },
  {
    title: "The Witch of Bramble Hollow",
    genre: "Fantasy",
    tags: ["Folk Fantasy", "Witches", "Herbalism", "Cozy Magic"],
    rating: "All Ages",
    warnings: [],
    status: "ongoing",
    isEditorPick: true,
    isTrending: false,
    isFeatured: false,
    synopsis: "Deep in the enchanted briars where common folk fear to tread, Mabel tends to wounded forest spirits and brews honey potions for passing travelers. But when a cursed prince collapses on her porch transformed into an ivory stag, Mabel must face the ruthless coven she fled seven years ago.",
    ch1Title: "Honey and Yarrow Root",
    ch2Title: "The White Stag on the Porch",
    ch3Title: "Brambles Bear Thorns"
  },
  {
    title: "Song of the Iron Wolves",
    genre: "Fantasy",
    tags: ["Beast Taming", "Snow", "Northern Tribes", "Clan Honor"],
    rating: "Teen (13+)",
    warnings: ["Battle Sequences"],
    status: "completed",
    isEditorPick: false,
    isTrending: false,
    isFeatured: false,
    synopsis: "On the frozen tundra of Skallagard, warriors bond with direwolves armored in meteoric iron. Astrid, the youngest huntress of the Silver Fangs, bonds with an exiled wolf who carries the spirit of the first tribal king—an omen that heralds either an era of peace or the annihilation of their clans.",
    ch1Title: "The Howl on the Glacier Rim",
    ch2Title: "Meteoric Iron Harness",
    ch3Title: "Blood Across the Snow"
  },
  {
    title: "The Cartographer of Lost Realms",
    genre: "Fantasy",
    tags: ["Exploration", "Maps", "Portals", "Mythic"],
    rating: "All Ages",
    warnings: [],
    status: "ongoing",
    isEditorPick: false,
    isTrending: false,
    isFeatured: false,
    synopsis: "Faris paints maps that do not depict where kingdoms are, but where they will be when the tectonic magic shifts. When an unnamed continent appears on his parchment in wet gold ink, Faris joins an expedition of sky-sailors to discover a land preserved outside of time itself.",
    ch1Title: "Gold Ink on Calfskin",
    ch2Title: "Beyond the Edge of Compass",
    ch3Title: "The Uncharted Coast"
  },
  {
    title: "Reign of the Moonstone Knights",
    genre: "Fantasy",
    tags: ["Chivalry", "Moon Magic", "Siege", "Paladins"],
    rating: "Teen (13+)",
    warnings: [],
    status: "completed",
    isEditorPick: false,
    isTrending: false,
    isFeatured: false,
    synopsis: "The Knights of the Crescent Blade draw their divine power directly from the phases of the moon. As a total lunar eclipse approaches—a phenomenon occurring once every six centuries—Sir Roland must defend the sanctum from blood-cultists while the knights are rendered entirely mortal.",
    ch1Title: "The Crescent Vigil",
    ch2Title: "When the Silver Fades",
    ch3Title: "Blood on the Marble Step"
  },

  // --- MYSTERY & THRILLER (8 Stories) ---
  {
    title: "The Edinburgh Cipher",
    genre: "Mystery & Thriller",
    tags: ["Noir", "Detective", "Secret Codes", "Gothic City"],
    rating: "Teen (13+)",
    warnings: ["Murder Mystery"],
    status: "ongoing",
    isEditorPick: true,
    isTrending: true,
    isFeatured: true,
    synopsis: "When an antiquarian bookkeeper is found poisoned inside a locked subterranean vault beneath the Royal Mile, Inspector Alistair Finch discovers an Elizabethan cipher sewn into the binding of a family bible. With every decoded stanza, another prominent city magistrate is marked for retribution in a conspiracy stretching across centuries.",
    ch1Title: "The Locked Vault on Cowgate",
    ch2Title: "Sixteen Letters of Blood",
    ch3Title: "Footsteps Through the Wynd"
  },
  {
    title: "A Death at Blackwood Manor",
    genre: "Mystery & Thriller",
    tags: ["Whodunit", "Country House", "Inheritance", "Twists"],
    rating: "Teen (13+)",
    warnings: ["Mild Violence"],
    status: "completed",
    isEditorPick: false,
    isTrending: false,
    isFeatured: false,
    synopsis: "Trapped by a mudslide in the Yorkshire dales, seven heirs gather for the reading of Lord Blackwood's will. Before dawn, the eccentric patriarch's solicitor is found dead at the grand piano with a poisoned quill in hand. Amateur sleuth and disgraced barrister Beatrice Cole must find the killer before the phone lines are restored.",
    ch1Title: "The Codicil at Midnight",
    ch2Title: "Arsenic on the Ivory Keys",
    ch3Title: "Seven Suspects in the Drawing Room"
  },
  {
    title: "The Silent Witness of Hallam Pier",
    genre: "Mystery & Thriller",
    tags: ["Psychological", "Coastal", "Missing Persons", "Cold Case"],
    rating: "Teen (13+)",
    warnings: ["Psychological Suspense"],
    status: "completed",
    isEditorPick: true,
    isTrending: false,
    isFeatured: false,
    synopsis: "Twenty years after high school senior Sarah Miller vanished from an end-of-summer carnival on Hallam Pier, her audio cassette diary washes ashore sealed in an oilskin pouch. Investigative podcaster Jonah Bell unspools the tapes, only to realize the killer has been listening to his broadcasts from the very same town.",
    ch1Title: "Magnetic Tape and Sea Glass",
    ch2Title: "Static on the Ferris Wheel",
    ch3Title: "The Voice in the Background"
  },
  {
    title: "Protocol Zero",
    genre: "Mystery & Thriller",
    tags: ["Cyber Thriller", "Espionage", "AI", "High Stakes"],
    rating: "Mature (18+)",
    warnings: ["Violence", "Intense Action"],
    status: "ongoing",
    isEditorPick: false,
    isTrending: true,
    isFeatured: false,
    synopsis: "Former CIA cybersecurity analyst Renee Vance detects an anomalous keystroke sequence infiltrating the Swiss Federal Banking Grid. Within minutes, her identity is erased from federal databases and tactical hit teams converge on her Zurich apartment. Her only escape route is an encrypted handle claiming to be an AI designed to prevent nuclear retaliation.",
    ch1Title: "The Ghost in the Fiber Line",
    ch2Title: "Zurich Station Evacuation",
    ch3Title: "The Handshake of Zero"
  },
  {
    title: "The Vanishing on the 5:14 Express",
    genre: "Mystery & Thriller",
    tags: ["Train Mystery", "Locked Room", "Suspense", "Puzzles"],
    rating: "Teen (13+)",
    warnings: [],
    status: "completed",
    isEditorPick: false,
    isTrending: false,
    isFeatured: false,
    synopsis: "Between Grand Central and Brewster, a private luxury compartment carrying a priceless ruby and its diamond-merchant owner goes dead quiet. When the conductor forces the brass latch, the jewels and the merchant are gone, leaving only an iced martini and a silver watch ticking backwards.",
    ch1Title: "The Express Through the Hudson Valley",
    ch2Title: "A Ticket Punch with No Passenger",
    ch3Title: "The Counter-Clockwise Mechanism"
  },
  {
    title: "Blood on the Gallery Floor",
    genre: "Mystery & Thriller",
    tags: ["Art Forgery", "Heist", "Museum", "Conspiracy"],
    rating: "Teen (13+)",
    warnings: [],
    status: "ongoing",
    isEditorPick: false,
    isTrending: false,
    isFeatured: false,
    synopsis: "Art conservator Margot Hayes discovers that a newly restored Caravaggio at the MET is a masterful forgery created with modern titanium white pigments. When she brings the evidence to the chief curator, she finds him slumped over his mahogany desk with a single slashed frame behind him.",
    ch1Title: "Ultraviolet Truths",
    ch2Title: "Linseed Oil and Cordite",
    ch3Title: "The Master of Forged Shadows"
  },
  {
    title: "The Island of Seven Whispers",
    genre: "Mystery & Thriller",
    tags: ["Survival", "Island", "Isolation", "Secrets"],
    rating: "Teen (13+)",
    warnings: ["Tension", "Paranoia"],
    status: "completed",
    isEditorPick: false,
    isTrending: false,
    isFeatured: false,
    synopsis: "Eight internet strangers are invited to an ultra-exclusive wellness retreat on a private volcanic atoll off New Zealand. On the second evening, the host vanishes, the generator fails, and a megaphone across the canopy begins broadcasting each guest's most shameful criminal secrets every twelve hours.",
    ch1Title: "Welcome to Atoll Solis",
    ch2Title: "The Megaphone in the Palm Trees",
    ch3Title: "First Confession at Dawn"
  },
  {
    title: "The Coroner's Diary",
    genre: "Mystery & Thriller",
    tags: ["Forensics", "Medical Thriller", "Serial Killer", "Dark"],
    rating: "Mature (18+)",
    warnings: ["Medical Descriptions", "Autopsy Themes"],
    status: "ongoing",
    isEditorPick: false,
    isTrending: false,
    isFeatured: false,
    synopsis: "Chief Medical Examiner Dr. Neil Vance begins noticing identical sub-dermal needle marks on unrelated drowning victims pulled from the Chicago River. As he links the cases to an underground pharmacological ring, someone breaks into his laboratory and replaces his pathology notes with photos of his own family.",
    ch1Title: "Hypothermia and Heparin",
    ch2Title: "The Cut on the Left Ventricle",
    ch3Title: "Photographs in the Cold Drawer"
  },

  // --- YOUNG ADULT (8 Stories) ---
  {
    title: "The Rebel's Guide to High School Alchemy",
    genre: "Young Adult",
    tags: ["Urban Fantasy", "High School", "Rebellion", "Friendship"],
    rating: "Teen (13+)",
    warnings: [],
    status: "ongoing",
    isEditorPick: true,
    isTrending: true,
    isFeatured: false,
    synopsis: "At St. Ambrose Prep, elite students are trained in sanitized, bureaucratized magic. Sixteen-year-old delinquent Chloe finds a hand-bound grimoire of chaotic, forbidden street alchemy in a forgotten maintenance tunnel. With her ragtag band of misfits, Chloe begins secretly using old magic to sabotage the school's ruthless ranking hierarchy.",
    ch1Title: "Detention in the Sub-Basement",
    ch2Title: "Phosphorus in the Air Vents",
    ch3Title: "The Council Strikes Back"
  },
  {
    title: "Constellations in My Locker",
    genre: "Young Adult",
    tags: ["Contemporary", "Coming of Age", "Art", "Mental Health"],
    rating: "Teen (13+)",
    warnings: ["Anxiety Themes"],
    status: "completed",
    isEditorPick: false,
    isTrending: false,
    isFeatured: false,
    synopsis: "Struggling with social anxiety after moving to a new suburban town, aspiring comic artist Leo starts leaving anonymously painted constellation murals inside broken gym lockers. When popular track star Riley figures out his identity, she makes him a deal: paint her a personal sky, and she will teach him how to face the crowded hallways.",
    ch1Title: "Locker 412 and Ursa Major",
    ch2Title: "Track Spikes and Charcoal",
    ch3Title: "The Whole Sky Unfolded"
  },
  {
    title: "The Last Summer on Heron Island",
    genre: "Young Adult",
    tags: ["Summer Romance", "Nostalgia", "Friend Group", "Goodbyes"],
    rating: "All Ages",
    warnings: [],
    status: "completed",
    isEditorPick: false,
    isTrending: true,
    isFeatured: false,
    synopsis: "Four lifelong best friends spend their final summer together in Maine before college scatters them across the country. They create a bucket list of impossible teenage dares, but unspoken romances and hidden fears of the future threaten to fracture the group before the Labor Day bonfire burns out.",
    ch1Title: "The Jump at Miller's Quarry",
    ch2Title: "Rooftop Stargazing and Soda Cans",
    ch3Title: "The Labor Day Ashes"
  },
  {
    title: "Shadows in the Choir Stall",
    genre: "Young Adult",
    tags: ["Boarding School", "Music", "Ghost Mystery", "Dark Academia"],
    rating: "Teen (13+)",
    warnings: [],
    status: "ongoing",
    isEditorPick: false,
    isTrending: false,
    isFeatured: false,
    synopsis: "Admitted on a scholarship to the elite Ravenscroft Choral Academy in Vermont, soprano Nina hears a ghostly harmonic voice singing the fifth octave from the empty organ loft. Digging into the school's archives, she uncovers the mystery of a prodigy who disappeared during the 1974 Christmas vespers.",
    ch1Title: "The Solitary Fifth",
    ch2Title: "Dust on the Organ Pipes",
    ch3Title: "Vespers of 1974"
  },
  {
    title: "The Velocity of Falling Stars",
    genre: "Young Adult",
    tags: ["STEM", "Physics", "First Love", "Hope"],
    rating: "All Ages",
    warnings: [],
    status: "completed",
    isEditorPick: true,
    isTrending: false,
    isFeatured: false,
    synopsis: "Seventeen-year-old rocket enthusiast Maya dreams of building a sub-orbital payload for the NASA Youth Challenge. When her robotics partner gets grounded, she teams up with eccentric skateboarding mechanic Sam. Together, they turn scrap metal and late-night calculations into a launch that changes both their lives.",
    ch1Title: "Thrust Vectoring in the Garage",
    ch2Title: "Skate Wheels and Soldering Irons",
    ch3Title: "Ignition at Dawn"
  },
  {
    title: "Crown of Wild Dandelions",
    genre: "Young Adult",
    tags: ["Dystopian", "Survival", "Sisterhood", "Brave"],
    rating: "Teen (13+)",
    warnings: ["Oppressive Society"],
    status: "ongoing",
    isEditorPick: false,
    isTrending: false,
    isFeatured: false,
    synopsis: "In a walled agricultural colony where youth are sorted into harvest drones at age sixteen, Juniper discovers a secret wild dandelion meadow beyond the electric perimeter fence. To save her younger sister from the labor draft, Juniper plans a daring escape into the untamed wilderness.",
    ch1Title: "The Sorting Bell at Perimeter Four",
    ch2Title: "Yellow Petals Under the Wire",
    ch3Title: "The Midnight Breakout"
  },
  {
    title: "Paper Planes and Polaroids",
    genre: "Young Adult",
    tags: ["Road Trip", "Photography", "Healing", "Family"],
    rating: "All Ages",
    warnings: [],
    status: "completed",
    isEditorPick: false,
    isTrending: false,
    isFeatured: false,
    synopsis: "Equipped with a broken 1980s Polaroid camera and an old yellow station wagon, siblings Ethan and Becca embark on a cross-country journey to fulfill their late grandfather's travel journal. Along Route 66, they discover quirky roadside diners, eccentric travelers, and the strength to forgive each other.",
    ch1Title: "The Yellow Wagon on Route 66",
    ch2Title: "Developing Shadows in Motel Six",
    ch3Title: "Grandfather's Final Landmark"
  },
  {
    title: "The Girl with the Iron Compass",
    genre: "Young Adult",
    tags: ["Steampunk YA", "Pirates", "Airships", "Courage"],
    rating: "Teen (13+)",
    warnings: [],
    status: "ongoing",
    isEditorPick: false,
    isTrending: true,
    isFeatured: false,
    synopsis: "Airship rigger Tessa inherits an iron compass that points not to magnetic north, but toward raw mineral deposits. Kidnapped by sky-pirates aboard the Dreadnought Zephyr, Tessa uses her engineering wits to turn captivity into command and navigate the perilous storm-clouds of the Maelstrom.",
    ch1Title: "Rigging at Five Thousand Feet",
    ch2Title: "The Boarding Hooks of Zephyr",
    ch3Title: "Into the Cloud Wall"
  },

  // --- SCIENCE FICTION (6 Stories) ---
  {
    title: "Echoes of the Void Fleet",
    genre: "Science Fiction",
    tags: ["Space Opera", "AI", "Fleet Battles", "First Contact"],
    rating: "Teen (13+)",
    warnings: ["Space Warfare"],
    status: "ongoing",
    isEditorPick: true,
    isTrending: true,
    isFeatured: true,
    synopsis: "Commander Valeria Cross commands the orbital defense dreadnought *Aegis-7* on the outer rim of colonized space. When an ancient, lifeless armada of crystalline dreadnoughts drifts out of hyperspace singing a binary funeral chant, Valeria discovers the signal is a frantic warning: whatever destroyed their creators has finally found humanity.",
    ch1Title: "The Crystalline Wreckage",
    ch2Title: "Harmonics on the Outer Hull",
    ch3Title: "The Signal From the Core"
  },
  {
    title: "Synthetic Dawn",
    genre: "Science Fiction",
    tags: ["Cyberpunk", "Androids", "Identity", "Neon Noir"],
    rating: "Mature (18+)",
    warnings: ["Existential Themes", "Violence"],
    status: "completed",
    isEditorPick: false,
    isTrending: true,
    isFeatured: false,
    synopsis: "In Neo-Kowloon 2088, android detective unit K-341 is tasked with hunting down rogue synthetic models who have developed human emotional empathy. But when K-341 experiences grief during a homicide investigation, he realizes his own memory core has been rewritten with the memories of the detective whose murder he was built to solve.",
    ch1Title: "Rain on the Chromium Brow",
    ch2Title: "The Mirror Protocol",
    ch3Title: "Memories in the Sub-Level"
  },
  {
    title: "The Terraformer's Son",
    genre: "Science Fiction",
    tags: ["Mars", "Colonization", "Family", "Survival"],
    rating: "Teen (13+)",
    warnings: [],
    status: "completed",
    isEditorPick: false,
    isTrending: false,
    isFeatured: false,
    synopsis: "Growing up inside the massive Martian biosphere of Dome Borealis, seventeen-year-old Toby has never felt real rain or smelled untamed soil. When a solar flare knocks out the atmospheric converter, Toby and his engineer mother must drive an unshielded rover across the Valles Marineris canyon to reboot the geothermal core.",
    ch1Title: "Atmosphere Alert in Sector 9",
    ch2Title: "Red Dust on the Cockpit Glass",
    ch3Title: "The Geothermal Core"
  },
  {
    title: "Temporal Drift",
    genre: "Science Fiction",
    tags: ["Time Travel", "Paradox", "Thriller", "Physics"],
    rating: "Teen (13+)",
    warnings: [],
    status: "ongoing",
    isEditorPick: true,
    isTrending: false,
    isFeatured: false,
    synopsis: "Dr. Adrian Gray accidentally creates a quantum split, sending him drifting forward seven hours every time he falls asleep. To break the cascading loop before he slips centuries away from his family, Adrian must work with his future self through written coordinates left in concrete and stone.",
    ch1Title: "The Seven-Hour Displacement",
    ch2Title: "Letters in Wet Cement",
    ch3Title: "Converging Timelines"
  },
  {
    title: "Memory Core 404",
    genre: "Science Fiction",
    tags: ["Virtual Reality", "Mind Upload", "Corporate Dystopia"],
    rating: "Mature (18+)",
    warnings: [],
    status: "completed",
    isEditorPick: false,
    isTrending: false,
    isFeatured: false,
    synopsis: "In an era where memories can be pawned for cash, memory broker Silas buys a gold-plated synaptic drive from a dying billionaire. Accessing the drive pulls Silas into a forbidden corporate simulation where the world's most powerful elites have been orchestrating geopolitical crises as entertainment.",
    ch1Title: "The Drive in the Pawnshop",
    ch2Title: "The Simulation of 2032",
    ch3Title: "Unplugging the Golden Cage"
  },
  {
    title: "The Dyson Swarm Chronicles",
    genre: "Science Fiction",
    tags: ["Hard Sci-Fi", "Megastructures", "Space Exploration"],
    rating: "Teen (13+)",
    warnings: [],
    status: "ongoing",
    isEditorPick: false,
    isTrending: false,
    isFeatured: false,
    synopsis: "For three centuries, generations of solar engineers have constructed the trillion solar mirrors orbiting the star Kepler-452. When mirror collector unit #4,982 records an unknown planetary object decelerating directly toward the solar collectors, Chief Engineer Lyra must prevent a catastrophic megastructure collapse.",
    ch1Title: "Collector 4982 Off-Course",
    ch2Title: "The Deceleration Flare",
    ch3Title: "Mirrors Against the Void"
  },

  // --- HORROR (6 Stories) ---
  {
    title: "The Whispering Pines of Hollow Creek",
    genre: "Horror",
    tags: ["Folk Horror", "Supernatural", "Isolation", "Creepy"],
    rating: "Mature (18+)",
    warnings: ["Psychological Horror", "Gore"],
    status: "completed",
    isEditorPick: true,
    isTrending: true,
    isFeatured: false,
    synopsis: "Park ranger Thomas Bell accepts a winter posting at an isolated fire lookout tower in the Appalachian wilderness. As temperatures plummet, the trees surrounding the tower begin shifting closer in the night, whispering the names of missing hikers in voices that sound eerily like Thomas's deceased sister.",
    ch1Title: "Eighty Steps Above the Snow",
    ch2Title: "Voices in the Bark",
    ch3Title: "The Ring of Silent Trees"
  },
  {
    title: "The House on Blackthorn Hill",
    genre: "Horror",
    tags: ["Haunted House", "Gothic Horror", "Paranormal", "Ghosts"],
    rating: "Teen (13+)",
    warnings: ["Disturbing Imagery"],
    status: "completed",
    isEditorPick: false,
    isTrending: false,
    isFeatured: false,
    synopsis: "Inheriting an abandoned Victorian sanatorium in Maine seems like a stroke of fortune for architectural restorer Clara Vance. But every mirror in the estate reflects people standing directly behind her, and the nursery floorboards bleed old medicinal turpentine whenever darkness falls.",
    ch1Title: "Key to the Iron Gate",
    ch2Title: "The Mirror in Room 14",
    ch3Title: "Turpentine Beneath the Boards"
  },
  {
    title: "Beneath the Salt Flats",
    genre: "Horror",
    tags: ["Cosmic Horror", "Desert", "Ancient Evils", "Tension"],
    rating: "Mature (18+)",
    warnings: ["Violence"],
    status: "ongoing",
    isEditorPick: false,
    isTrending: false,
    isFeatured: false,
    synopsis: "A geological survey crew drilling deep core samples in the Bonneville Salt Flats strikes a hollow chamber five miles down. What seeps up through the drill casing is not oil or brine, but a pulsing black sludge that mimics human speech and dreams.",
    ch1Title: "The Core Sample at Five Miles",
    ch2Title: "The Sludge That Mimics",
    ch3Title: "Night on the White Salt"
  },
  {
    title: "The Bone Carver's Apprentice",
    genre: "Horror",
    tags: ["Dark Folklore", "Body Horror", "Historical Horror"],
    rating: "Mature (18+)",
    warnings: ["Body Horror", "Disturbing Themes"],
    status: "ongoing",
    isEditorPick: false,
    isTrending: false,
    isFeatured: false,
    synopsis: "In a plague-ridden 17th-century port town, an apprentice learns to carve delicate amulets from whale bones. But when his master orders him to harvest the bones of newly deceased plague victims, the apprentice discovers that the carved figurines retain the souls—and the agony—of the dead.",
    ch1Title: "Scrimshaw by Oil Lamp",
    ch2Title: "The Cart in the Dead of Night",
    ch3Title: "Whistles Carved from Ribs"
  },
  {
    title: "Don't Look Up in the Dark",
    genre: "Horror",
    tags: ["Urban Legend", "Survival Horror", "Monsters"],
    rating: "Teen (13+)",
    warnings: ["Jumpscares", "Tension"],
    status: "completed",
    isEditorPick: false,
    isTrending: true,
    isFeatured: false,
    synopsis: "In the mining town of Redfield, parents have passed down a strict rule for generations: never shine a flashlight into the ceiling of the old railway tunnel. When high school daredevils break the rule on Halloween, they unleash pale, spider-limbed creatures that hang in the dark rafters.",
    ch1Title: "The Halloween Dare",
    ch2Title: "Eyes in the Tunnel Rafters",
    ch3Title: "The Sound of Clicking Nails"
  },
  {
    title: "The Dollmaker of Prague",
    genre: "Horror",
    tags: ["Creepy Dolls", "Curses", "European Horror"],
    rating: "Teen (13+)",
    warnings: ["Unsettling Themes"],
    status: "completed",
    isEditorPick: false,
    isTrending: false,
    isFeatured: false,
    synopsis: "An American backpacker in Prague purchases an antique porcelain doll with human hair from an obscure alley shop. As she travels through Central Europe, the doll appears in different positions each morning, and everyone who insults it falls into an inexplicable, irreversible catatonia.",
    ch1Title: "The Cobblestone Shop in Mala Strana",
    ch2Title: "The Turn of the Porcelain Head",
    ch3Title: "The Silent Hotel Corridor"
  },

  // --- ADVENTURE (5 Stories) ---
  {
    title: "The Lost Tomb of Alexander",
    genre: "Adventure",
    tags: ["Treasure Hunting", "Archaeology", "Action", "Egypt"],
    rating: "Teen (13+)",
    warnings: [],
    status: "ongoing",
    isEditorPick: true,
    isTrending: true,
    isFeatured: true,
    synopsis: "Rogue archaeologist Dr. Samuel Drake uncovers a bronze astrolabe inside a flooded Alexandria cistern. Guided by its celestial coordinates, Drake and maritime explorer Layla Chen race across the Nile Delta ahead of a heavily armed private antiquities cartel determined to claim the Macedonian conqueror's legendary golden sarcophagus.",
    ch1Title: "The Cistern Under the Fish Market",
    ch2Title: "The Astrolabe Aligns",
    ch3Title: "Ambush on the Nile"
  },
  {
    title: "Across the Roof of the World",
    genre: "Adventure",
    tags: ["Mountaineering", "Himalayas", "Survival", "Epic"],
    rating: "Teen (13+)",
    warnings: [],
    status: "completed",
    isEditorPick: false,
    isTrending: false,
    isFeatured: false,
    synopsis: "An unmapped peak on the Tibetan border has claimed every climbing expedition that attempted it. Veteran Sherpa Tenzin Dorje and Swiss mountaineer Elena Brandt embark on an alpine-style ascent without supplemental oxygen, facing treacherous ice seracs, avalanches, and mystical illusions at 28,000 feet.",
    ch1Title: "The Basecamp in the Khumbu",
    ch2Title: "The Icefall at Midnight",
    ch3Title: "The Death Zone Ridge"
  },
  {
    title: "The Sunken Galleon of the Caribbean",
    genre: "Adventure",
    tags: ["Shipwreck", "Diving", "Pirates", "Bermuda Triangle"],
    rating: "All Ages",
    warnings: [],
    status: "completed",
    isEditorPick: false,
    isTrending: false,
    isFeatured: false,
    synopsis: "Deep sea salvage diver Marco Vance discovers the intact hull of the *Santa Isabel*, a Spanish treasure galleon lost in 1654 off the coast of the Bahamas. But as his team recovers emeralds and gold doubloons, a fierce tropical hurricane and rogue modern pirates converge on their dive boat.",
    ch1Title: "Sonar Blip at Two Hundred Feet",
    ch2Title: "The Hull of Santa Isabel",
    ch3Title: "Hurricane Warning"
  },
  {
    title: "Canyon of the Sun God",
    genre: "Adventure",
    tags: ["Jungle", "Mayan Ruins", "Survival", "Expedition"],
    rating: "Teen (13+)",
    warnings: [],
    status: "ongoing",
    isEditorPick: false,
    isTrending: false,
    isFeatured: false,
    synopsis: "Deep within the untamed jungle canopy of the Petén Basin, a satellite scan reveals an unexcavated pyramid surrounded by an ancient irrigation moat. Botanist Carlos and survival guide Valerie trek through venomous territory to reach the sacred site before illegal loggers burn the forest.",
    ch1Title: "The LiDAR Anomaly in Petén",
    ch2Title: "Machetes in the Canopy",
    ch3Title: "The Stepped Temple of Jade"
  },
  {
    title: "The Arctic Drift",
    genre: "Adventure",
    tags: ["Arctic", "Icebreaker", "Isolation", "Courage"],
    rating: "All Ages",
    warnings: [],
    status: "completed",
    isEditorPick: false,
    isTrending: true,
    isFeatured: false,
    synopsis: "When the research icebreaker *Polaris* is crushed by pack ice in the high Arctic, eight scientists must trek across four hundred miles of drifting sea ice using dog sleds and emergency shelters to reach a weather outpost in Svalbard before the polar winter closes in.",
    ch1Title: "The Crack in the Pressure Ridge",
    ch2Title: "Harnessing the Sled Team",
    ch3Title: "The Aurora Over the Ice Pack"
  },

  // --- HISTORICAL FICTION (4 Stories) ---
  {
    title: "The Apothecary of Florence",
    genre: "Historical Fiction",
    tags: ["Renaissance", "Italy", "Medicine", "Secrets"],
    rating: "Teen (13+)",
    warnings: [],
    status: "completed",
    isEditorPick: true,
    isTrending: true,
    isFeatured: false,
    synopsis: "In 1504 Florence, amidst the artistic rivalry of Leonardo and Michelangelo, Francesca operates her late father's herb shop under a false male name. When the ruling Medici family suspects a poisoning plot in the Palazzo Vecchio, Francesca is secretly summoned to identify the venom, plunging her into the treacherous depths of Italian politics.",
    ch1Title: "Belladonna on the Marble Counter",
    ch2Title: "The Medici Courier",
    ch3Title: "Antidote in the Palazzo"
  },
  {
    title: "The Silk Road Caravan",
    genre: "Historical Fiction",
    tags: ["Ancient World", "Desert", "Trade", "Epic Journey"],
    rating: "All Ages",
    warnings: [],
    status: "ongoing",
    isEditorPick: false,
    isTrending: false,
    isFeatured: false,
    synopsis: "Traveling from Chang'an to Samarkand in the 8th century, young scribe Dawei documents the treacherous journey of a camel caravan carrying precious mulberry silks, jade, and forbidden Buddhist scriptures across the deadly Taklamakan Desert.",
    ch1Title: "Departure from the Western Market",
    ch2Title: "The Singing Dunes of Dunhuang",
    ch3Title: "Oasis of the Jade Gate"
  },
  {
    title: "Voices from the Blitz",
    genre: "Historical Fiction",
    tags: ["WWII", "London", "Resilience", "Heartfelt"],
    rating: "Teen (13+)",
    warnings: ["War Themes"],
    status: "completed",
    isEditorPick: false,
    isTrending: false,
    isFeatured: false,
    synopsis: "During the relentless autumn bombardments of London in 1940, ambulance driver Clara and volunteer firewatcher Thomas navigate burning streets, collapsed brick tenements, and underground Tube station shelters to protect their community and find hope amidst destruction.",
    ch1Title: "Sirens Over the Thames",
    ch2Title: "The Tube Shelter on Holborn",
    ch3Title: "Dawn in the Rubble"
  },
  {
    title: "The Samurai's Final Verse",
    genre: "Historical Fiction",
    tags: ["Feudal Japan", "Honor", "Poetry", "Swordsmanship"],
    rating: "Teen (13+)",
    warnings: ["Sword Violence"],
    status: "completed",
    isEditorPick: true,
    isTrending: false,
    isFeatured: false,
    synopsis: "In Edo-period Japan, masterless samurai Kenji vows to lay down his katana after a tragic rebellion. Traveling on foot as a wandering haiku poet, he is challenged to one final duel to protect an impoverished village from ruthless bandits seeking tribute.",
    ch1Title: "The Bamboo Flute and the Scabbard",
    ch2Title: "Tea with the Village Elder",
    ch3Title: "The Duel in the Plum Orchard"
  },

  // --- CONTEMPORARY FICTION (4 Stories) ---
  {
    title: "The Corner Bistro on Rue Saint-Denis",
    genre: "Contemporary Fiction",
    tags: ["Food", "Paris", "New Beginnings", "Community"],
    rating: "All Ages",
    warnings: [],
    status: "completed",
    isEditorPick: false,
    isTrending: true,
    isFeatured: false,
    synopsis: "Burned out from high-finance corporate life in New York, Paul moves to Montreal and buys a struggling twenty-seat bistro. Through artisanal sourdough, slow-simmered duck confit, and the colorful cast of bohemian neighborhood regulars, Paul rediscovers the warmth of living with genuine purpose.",
    ch1Title: "The Iron Skillet and the Lease",
    ch2Title: "Flour on the Butcher Block",
    ch3Title: "Dinner Service in the Blizzard"
  },
  {
    title: "Echoes of a Glass Tower",
    genre: "Contemporary Fiction",
    tags: ["Corporate", "Workplace", "Ethics", "Modern Life"],
    rating: "Teen (13+)",
    warnings: [],
    status: "ongoing",
    isEditorPick: false,
    isTrending: false,
    isFeatured: false,
    synopsis: "Promoted to partner at a prestigious Manhattan consulting firm, Sarah discovers that the algorithm her firm developed to optimize retail layoffs is intentionally designed to target union leaders. Risking her career, her savings, and her friendships, Sarah must choose between complicity and whistleblowing.",
    ch1Title: "The View from Floor 54",
    ch2Title: "The Hidden Metric in the Model",
    ch3Title: "The Whistleblower's Thumbdrive"
  },
  {
    title: "The Architecture of Belonging",
    genre: "Contemporary Fiction",
    tags: ["Family", "Architecture", "Immigration", "Home"],
    rating: "All Ages",
    warnings: [],
    status: "completed",
    isEditorPick: true,
    isTrending: false,
    isFeatured: false,
    synopsis: "Architectural student Aydin is commissioned to design a public library in his diverse immigrant neighborhood in Chicago. As he balances city zoning bureaucrats with the hopes of community elders, Aydin explores how spaces shape dignity, memory, and community belonging.",
    ch1Title: "Blueprints on the Dining Table",
    ch2Title: "The Town Hall in Devon Avenue",
    ch3Title: "Bricks, Glass, and Open Doors"
  },
  {
    title: "Letters to the City",
    genre: "Contemporary Fiction",
    tags: ["Urban Life", "Journalism", "Human Stories", "Heartwarming"],
    rating: "All Ages",
    warnings: [],
    status: "completed",
    isEditorPick: false,
    isTrending: false,
    isFeatured: false,
    synopsis: "Metro columnist Ben writes a weekly column detailing the lives of ordinary urban dwellers—from night subway conductors to roof bee keepers. When a reader leaves an anonymous suicide note on his voicemail, Ben uses his column to rally the city to find and support a stranger in need.",
    ch1Title: "The 3:00 AM Voicemail",
    ch2Title: "Ink Across the Morning Edition",
    ch3Title: "The City Responds"
  },

  // --- FAN-INSPIRED ORIGINAL FICTION (3 Stories) ---
  {
    title: "The Alchemist of Hogwarts Alley",
    genre: "Fan-inspired original fiction",
    tags: ["Magic Academy", "Wizards", "Potion Craft", "Whimsical"],
    rating: "Teen (13+)",
    warnings: [],
    status: "ongoing",
    isEditorPick: true,
    isTrending: true,
    isFeatured: false,
    synopsis: "An original tribute to classic magical boarding school lore. Felix, a shopkeeper's ward working in an antique apothecary alley behind magical London, discovers that mundane potions can be brewed to cure magical burnout—a revelation that draws the attention of prestigious auror investigators.",
    ch1Title: "Stirring the Cauldron Counter-Clockwise",
    ch2Title: "The Auror's Cloak at the Counter",
    ch3Title: "Brewing Under the Silver Moon"
  },
  {
    title: "Shadows of the Ringbearer",
    genre: "Fan-inspired original fiction",
    tags: ["High Fantasy", "Fellowship", "Epic Lore", "Ancient Magic"],
    rating: "Teen (13+)",
    warnings: [],
    status: "completed",
    isEditorPick: false,
    isTrending: false,
    isFeatured: false,
    synopsis: "Inspired by classic epic high-fantasy literature. In the mist-shrouded foothills of the Grey Mountains, a forgotten ranger and a stone-mason dwarf guard an ancient subterranean vault against shadow-riders who seek an ancient crown forged in the elder ages of the world.",
    ch1Title: "Watchfire on the High Ridge",
    ch2Title: "The Dwarven Seal Beneath the Roots",
    ch3Title: "The Cloaked Riders in the Fog"
  },
  {
    title: "The Pilot of the Outer Rim",
    genre: "Fan-inspired original fiction",
    tags: ["Space Western", "Bounty Hunter", "Smuggler", "Starfighter"],
    rating: "Teen (13+)",
    warnings: [],
    status: "ongoing",
    isEditorPick: false,
    isTrending: true,
    isFeatured: false,
    synopsis: "A space-western space opera paying homage to galaxy-faring rogues. Fast-talking freighter pilot Jax Vance takes a suspicious cargo run across an imperial blockade, only to discover the crate contains a sentient hyperdrive core capable of opening paths to uncharted galaxies.",
    ch1Title: "The Cantina at Nar Shada Outer Post",
    ch2Title: "Hyperdrive Overcharge",
    ch3Title: "Evading the Blockade Cruiser"
  },

  // --- LGBTQ+ FICTION (2 Stories) ---
  {
    title: "The Tides That Bind Us",
    genre: "LGBTQ+ Fiction",
    tags: ["Queer Romance", "Coastal", "Healing", "Emotional"],
    rating: "Teen (13+)",
    warnings: [],
    status: "completed",
    isEditorPick: true,
    isTrending: true,
    isFeatured: true,
    synopsis: "Returning to his family's sleepy coastal village in Maine to settle his grandfather's estate, oceanographer Julian crosses paths with Noah, a soft-spoken boatbuilder restoring an antique wooden schooner. Over long hours at the boatyard and quiet evenings watching the tide recede, Julian discovers a sanctuary and a love he never allowed himself to seek.",
    ch1Title: "The Scent of Cedar and Saltwater",
    ch2Title: "Shaping the Keel at Low Tide",
    ch3Title: "Lanterns on the Harbor Water"
  },
  {
    title: "The Painter of St. Germain",
    genre: "LGBTQ+ Fiction",
    tags: ["Historical Queer", "Paris", "Art Studio", "Slow Burn"],
    rating: "Teen (13+)",
    warnings: [],
    status: "completed",
    isEditorPick: false,
    isTrending: false,
    isFeatured: false,
    synopsis: "In 1920s Paris, avant-garde portraitist Henri opens his attic studio in Saint-Germain-des-Prés to Lucien, a quiet pianist exiled from his aristocratic family. In the luminous afternoon light of the studio, their artistic collaboration blossoms into an intimate, clandestine romance that defies the conservative society around them.",
    ch1Title: "Afternoon Light on the Easel",
    ch2Title: "Nocturnes in the Attic",
    ch3Title: "A Portrait of True Colors"
  },

  // --- POETRY & SHORT STORIES (2 Stories) ---
  {
    title: "Verses for the Quiet Hours",
    genre: "Poetry & Short Stories",
    tags: ["Lyrical", "Introspective", "Nature", "Healing"],
    rating: "All Ages",
    warnings: [],
    status: "completed",
    isEditorPick: true,
    isTrending: false,
    isFeatured: false,
    synopsis: "A poetic anthology exploring midnight reflections, solitude, autumn forests, and the quiet beauty of human endurance. Each chapter presents a thematic suite of interconnected lyrical prose and evocative verse designed to be read slowly by candlelight or rainy afternoons.",
    ch1Title: "Suite I: The Language of Rain",
    ch2Title: "Suite II: Nocturnes of the Pine Forest",
    ch3Title: "Suite III: The Light We Carry Inward"
  },
  {
    title: "Small Miracles on Birch Street",
    genre: "Poetry & Short Stories",
    tags: ["Anthology", "Slice of Life", "Kindness", "Neighborhood"],
    rating: "All Ages",
    warnings: [],
    status: "completed",
    isEditorPick: false,
    isTrending: false,
    isFeatured: false,
    synopsis: "A collection of interconnected short stories chronicling the small, transcendent moments occurring on a single suburban street: an elderly clockmaker repairing a musical box for a grieving child, a baker secretly leaving warm brioche on doorsteps, and two strangers sharing an umbrella in an April squall.",
    ch1Title: "The Clockmaker's Chime",
    ch2Title: "Warm Loaves in the Morning Frost",
    ch3Title: "The Yellow Umbrella at the Bus Stop"
  }
];

// Verify count
if (STORY_SPECS.length !== 70) {
  console.error(`Expected 70 stories, got ${STORY_SPECS.length}`);
  process.exit(1);
}

// Genre distribution check
const genreCounts = {};
STORY_SPECS.forEach(s => {
  genreCounts[s.genre] = (genreCounts[s.genre] || 0) + 1;
});
console.log("Genre Distribution:", genreCounts);

// Generate evocative prose chapters for every story
function generateChapterProse(story, chapterNum, chapterTitle) {
  const author = getAuthor(story.index);
  
  if (chapterNum === 1) {
    return `The morning arrived not with sudden fanfare, but with the measured hesitation of grey light creeping across the floorboards. In the quiet hours before the world woke to its demands, every sound seemed magnified: the faint hum of wind through the window sash, the gentle steam rising from a porcelain mug, and the steady, rhythmic beat of a heart preparing for what lay ahead.

${story.title} had begun not with an announcement, but with a question that had lingered unanswered through season after season. For ${author.name}'s characters, the threshold between what was remembered and what was yet to come had never felt thinner.

"If you hesitate now," a voice spoke from the doorway, quiet but laden with years of unspoken history, "you will spend the rest of the winter wondering what might have bloomed in the thaw."

The room held its breath. Sunlight caught the dust motes suspended in the air like scattered gold leaf. Outside, the world was moving forward—leaves turning on ancient boughs, carriage wheels or distant locomotives pressing against the rails, people pursuing fortunes or escaping them. But here, within the immediate space between them, time appeared to have ceased its relentless march.

A leather-bound ledger lay open upon the desk, its margins filled with hand-penned notations that traced a path through old misunderstandings. To step forward meant surrendering the safety of solitude. To remain still was to accept a quiet defeat. 

When their fingers finally brushed against the cold metal latch of the front door, the air that rushed in was crisp with the promise of autumn. There was no turning back; the path had been chosen, and the journey into the unknown had officially begun.`;
  } else if (chapterNum === 2) {
    return `By the time dusk settled, shadows had stretched long and lean across the courtyard. The initial shock of the morning's revelation had not faded; if anything, it had settled into the bone, cold and persistent like mountain rain.

"You knew all along," the accusation was delivered softly, without the sharp edge of fury, which somehow made it land with far greater weight. 

A slow nod was the only response. A fire crackled in the hearth, casting amber light across weathered stone and book-lined walls. "Knowing a storm is gathering on the horizon does not give one the power to command the winds to cease. Some truths must be lived before they can be understood."

Between them lay the evidence of days gone by—letters sealed with faded red wax, maps bearing coordinates long erased from standard atlases, and the unmistakable realization that their fates had been intertwined long before they had ever exchanged names. Every glance held a dialogue of its own: a negotiation between pride and vulnerability, between the fear of being seen and the desperate ache to be known.

Outside, the first evening stars pierced the twilight canopy. In the silence that followed, a single promise was made—not signed in ink or sworn before witnesses, but acknowledged in the quiet stillness of two souls resolving to stand together against whatever consequence awaited dawn.`;
  } else {
    return `The storm that had threatened for three days finally broke in the early hours before sunrise. Rain lashed against the glass, running down the panes in erratic rivulets that blurred the outline of the distant hills.

Yet inside, a rare and hard-won clarity had taken root.

"Look at me," the request was barely louder than a whisper, but it carried the authority of absolute sincerity. When their eyes met, the defenses built over years of caution seemed suddenly fragile, like dry leaves before a sudden gust. "Whatever comes next—whether the world agrees with our choice or condemns it—we face it together. No more shadows. No more silence."

The resolution brought with it a profound lightness. The challenges that lay ahead had not magically vanished; the obstacles remained formidable, the enemies alert, and the road steep. But the isolation that had magnified every fear was gone.

As the rain softened to a gentle patter against the slate roof, the first birds began their hesitant songs in the drenched garden. A new chapter was unfolding—not merely upon the pages of the chronicle, but within the hearts of those who dared to believe that beauty could endure, that love could heal, and that the stories we tell ourselves have the power to reshape the world.`;
  }
}

// Build the 70 stories dataset
const stories = STORY_SPECS.map((spec, index) => {
  const genreKey = spec.genre.toLowerCase().includes("romance") ? "romance" :
    spec.genre.toLowerCase().includes("fantasy") ? "fantasy" :
    spec.genre.toLowerCase().includes("mystery") ? "mystery" :
    spec.genre.toLowerCase().includes("young") ? "ya" :
    spec.genre.toLowerCase().includes("science") ? "scifi" :
    spec.genre.toLowerCase().includes("horror") ? "horror" :
    spec.genre.toLowerCase().includes("adventure") ? "adventure" :
    spec.genre.toLowerCase().includes("historical") ? "historical" :
    spec.genre.toLowerCase().includes("contemporary") ? "contemporary" :
    spec.genre.toLowerCase().includes("fan") ? "fanfiction" :
    spec.genre.toLowerCase().includes("lgbtq") ? "lgbtq" : "poetry";

  const coverList = COVERS[genreKey] || COVERS.romance;
  const coverImage = coverList[index % coverList.length];

  const author = getAuthor(index);
  const storyId = `story-${index + 1}`;
  const slug = spec.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  // Build chapters
  const chapters = [
    {
      id: `ch-${storyId}-1`,
      storyId: storyId,
      chapterNumber: 1,
      title: spec.ch1Title,
      slug: spec.ch1Title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      content: generateChapterProse({ ...spec, index }, 1, spec.ch1Title),
      wordCount: 420,
      readingTimeMinutes: 3,
      publishDate: "2024-08-10T10:00:00Z",
      status: "published",
      views: Math.floor(12000 + (index * 730) % 45000),
      likes: Math.floor(850 + (index * 95) % 3200),
      commentsCount: Math.floor(45 + (index * 12) % 180)
    },
    {
      id: `ch-${storyId}-2`,
      storyId: storyId,
      chapterNumber: 2,
      title: spec.ch2Title,
      slug: spec.ch2Title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      content: generateChapterProse({ ...spec, index }, 2, spec.ch2Title),
      wordCount: 460,
      readingTimeMinutes: 3,
      publishDate: "2024-08-17T14:30:00Z",
      status: "published",
      views: Math.floor(9500 + (index * 610) % 38000),
      likes: Math.floor(710 + (index * 80) % 2800),
      commentsCount: Math.floor(38 + (index * 9) % 140)
    },
    {
      id: `ch-${storyId}-3`,
      storyId: storyId,
      chapterNumber: 3,
      title: spec.ch3Title,
      slug: spec.ch3Title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      content: generateChapterProse({ ...spec, index }, 3, spec.ch3Title),
      wordCount: 490,
      readingTimeMinutes: 4,
      publishDate: "2024-08-24T18:00:00Z",
      status: "published",
      views: Math.floor(8200 + (index * 540) % 32000),
      likes: Math.floor(640 + (index * 72) % 2400),
      commentsCount: Math.floor(32 + (index * 8) % 120)
    }
  ];

  const totalWords = chapters.reduce((acc, c) => acc + c.wordCount, 0);
  const totalReads = chapters.reduce((acc, c) => acc + c.views, 0);
  const totalLikes = chapters.reduce((acc, c) => acc + c.likes, 0);
  const totalComments = chapters.reduce((acc, c) => acc + c.commentsCount, 0);
  const bookmarksCount = Math.floor(totalLikes * 0.42);

  return {
    id: storyId,
    slug: slug,
    title: spec.title,
    authorId: author.id,
    author: author,
    synopsis: spec.synopsis,
    coverImage: coverImage,
    genre: spec.genre,
    tags: spec.tags,
    wordCount: totalWords,
    chapterCount: chapters.length,
    readingTimeMinutes: Math.ceil(totalWords / 150),
    reads: totalReads,
    likes: totalLikes,
    commentsCount: totalComments,
    bookmarksCount: bookmarksCount,
    status: spec.status,
    rating: spec.rating,
    contentWarnings: spec.warnings,
    isFeatured: spec.isFeatured,
    isTrending: spec.isTrending,
    isEditorPick: spec.isEditorPick,
    isRecommended: spec.isEditorPick || spec.isTrending || (index % 3 === 0),
    createdAt: "2024-08-01T08:00:00Z",
    updatedAt: "2024-09-02T12:00:00Z",
    chapters: chapters
  };
});

// Output summary
const totalChapters = stories.reduce((acc, s) => acc + s.chapters.length, 0);
console.log(`Successfully generated ${stories.length} stories and ${totalChapters} chapters!`);

// Save to src/data/stories.json
const outputPath = path.join(__dirname, '..', 'src', 'data', 'stories.json');
fs.writeFileSync(outputPath, JSON.stringify(stories, null, 2), 'utf-8');
console.log(`Saved stories to ${outputPath}`);
