// 7 Wonders Base Game card data — derived from age_cards.tsv (rows where source = "Base").
// 80 unique cards: Age I (27), Age II (23), Age III (30 incl. 10 guilds).
//
// Corrections vs. raw TSV (per user):
//   - Age I military shields normalized to 1 each (Barracks, Guard Tower, Stockade).
//   - "Seiege Workshop" → "Siege Workshop" (typo).
//
// Player-count parsing (`players` is the raw TSV addedAt list):
//   - Each value = a copy added at that player count threshold.
//   - "3, 5" → 1 copy at 3-4p, 2 copies at 5-7p.
//   - "4"    → 1 copy at 4-7p (absent at 3p).
//   - Guilds use isGuild:true and always display in the grid regardless of player count.
//
// `icon` is always an array. Multi-entry arrays render as icon1 / icon2 / …
// `icon: null` means the icon design is still TBD (renderer should show nothing or
// a placeholder for now). This applies to: Marketplace, East/West Trading Post,
// Vineyard, Bazaar, Haven, Lighthouse, Ludus, Arena, Chamber of Commerce.

const CARDS = [
  // =================================================================
  // AGE I — 27 cards
  // =================================================================

  // ---------- Brown / Raw Materials (10) ----------
  { name: "Lumber Yard", slug: "lumber-yard", age: 1, color: "brown", cost: [],       chainsTo: [], chainsFrom: [], players: [3,4],     copies: {3:1,4:2,5:2,6:2,7:2}, vp: null, military: null, icon: ["wood"],         summary: "Produces 1 Wood." },
  { name: "Stone Pit",   slug: "stone-pit",   age: 1, color: "brown", cost: [],       chainsTo: [], chainsFrom: [], players: [3,5],     copies: {3:1,4:1,5:2,6:2,7:2}, vp: null, military: null, icon: ["stone"],        summary: "Produces 1 Stone." },
  { name: "Clay Pool",   slug: "clay-pool",   age: 1, color: "brown", cost: [],       chainsTo: [], chainsFrom: [], players: [3,5],     copies: {3:1,4:1,5:2,6:2,7:2}, vp: null, military: null, icon: ["clay"],         summary: "Produces 1 Clay." },
  { name: "Ore Vein",    slug: "ore-vein",    age: 1, color: "brown", cost: [],       chainsTo: [], chainsFrom: [], players: [3,4],     copies: {3:1,4:2,5:2,6:2,7:2}, vp: null, military: null, icon: ["ore"],          summary: "Produces 1 Ore." },
  { name: "Clay Pit",    slug: "clay-pit",    age: 1, color: "brown", cost: ["coin"], chainsTo: [], chainsFrom: [], players: [3],       copies: {3:1,4:1,5:1,6:1,7:1}, vp: null, military: null, icon: ["clay","ore"],   summary: "Produces 1 Clay or 1 Ore (your choice each turn)." },
  { name: "Timber Yard", slug: "timber-yard", age: 1, color: "brown", cost: ["coin"], chainsTo: [], chainsFrom: [], players: [3],       copies: {3:1,4:1,5:1,6:1,7:1}, vp: null, military: null, icon: ["wood","stone"], summary: "Produces 1 Wood or 1 Stone (your choice each turn)." },
  { name: "Excavation",  slug: "excavation",  age: 1, color: "brown", cost: ["coin"], chainsTo: [], chainsFrom: [], players: [4],       copies: {4:1,5:1,6:1,7:1},     vp: null, military: null, icon: ["stone","clay"], summary: "Produces 1 Stone or 1 Clay (your choice each turn)." },
  { name: "Forest Cave", slug: "forest-cave", age: 1, color: "brown", cost: ["coin"], chainsTo: [], chainsFrom: [], players: [5],       copies: {5:1,6:1,7:1},         vp: null, military: null, icon: ["wood","ore"],   summary: "Produces 1 Wood or 1 Ore (your choice each turn)." },
  { name: "Tree Farm",   slug: "tree-farm",   age: 1, color: "brown", cost: ["coin"], chainsTo: [], chainsFrom: [], players: [6],       copies: {6:1,7:1},             vp: null, military: null, icon: ["wood","clay"],  summary: "Produces 1 Wood or 1 Clay (your choice each turn)." },
  { name: "Mine",        slug: "mine",        age: 1, color: "brown", cost: ["coin"], chainsTo: [], chainsFrom: [], players: [6],       copies: {6:1,7:1},             vp: null, military: null, icon: ["stone","ore"],  summary: "Produces 1 Stone or 1 Ore (your choice each turn)." },

  // ---------- Grey / Manufactured Goods (3) ----------
  { name: "Glassworks", slug: "glassworks-1", age: 1, color: "grey", cost: [], chainsTo: [], chainsFrom: [], players: [3,6], copies: {3:1,4:1,5:1,6:2,7:2}, vp: null, military: null, icon: ["glass"],   summary: "Produces 1 Glass." },
  { name: "Loom",       slug: "loom-1",       age: 1, color: "grey", cost: [], chainsTo: [], chainsFrom: [], players: [3,6], copies: {3:1,4:1,5:1,6:2,7:2}, vp: null, military: null, icon: ["loom"],    summary: "Produces 1 Loom." },
  { name: "Press",      slug: "press-1",      age: 1, color: "grey", cost: [], chainsTo: [], chainsFrom: [], players: [3,6], copies: {3:1,4:1,5:1,6:2,7:2}, vp: null, military: null, icon: ["papyrus"], summary: "Produces 1 Papyrus." },

  // ---------- Blue / Civic (4) ----------
  { name: "Altar",   slug: "altar",   age: 1, color: "blue", cost: [],        chainsTo: ["Pantheon"], chainsFrom: [], players: [3,5], copies: {3:1,4:1,5:2,6:2,7:2}, vp: 3, military: null, icon: ["vp"], summary: "3 Victory Points." },
  { name: "Baths",   slug: "baths",   age: 1, color: "blue", cost: ["stone"], chainsTo: ["Aqueduct"], chainsFrom: [], players: [3,7], copies: {3:1,4:1,5:1,6:1,7:2}, vp: 3, military: null, icon: ["vp"], summary: "3 Victory Points." },
  { name: "Theater", slug: "theater", age: 1, color: "blue", cost: [],        chainsTo: ["Gardens"],  chainsFrom: [], players: [3,6], copies: {3:1,4:1,5:1,6:2,7:2}, vp: 3, military: null, icon: ["vp"], summary: "3 Victory Points." },
  { name: "Well",    slug: "well",    age: 1, color: "blue", cost: [],        chainsTo: ["Statue"],   chainsFrom: [], players: [4,7], copies: {3:0,4:1,5:1,6:1,7:2}, vp: 3, military: null, icon: ["vp"], summary: "3 Victory Points." },

  // ---------- Yellow / Commercial (4) ----------
  { name: "East Trading Post", slug: "east-trading-post", age: 1, color: "yellow", cost: [], chainsTo: ["Forum"],       chainsFrom: [], players: [3,7],   copies: {3:1,4:1,5:1,6:1,7:2}, vp: null, military: null, icon: null, summary: "1 coin discount when buying raw materials from the neighbor on your left." },
  { name: "West Trading Post", slug: "west-trading-post", age: 1, color: "yellow", cost: [], chainsTo: ["Forum"],       chainsFrom: [], players: [3,7],   copies: {3:1,4:1,5:1,6:1,7:2}, vp: null, military: null, icon: null, summary: "1 coin discount when buying raw materials from the neighbor on your right." },
  { name: "Marketplace",       slug: "marketplace",       age: 1, color: "yellow", cost: [], chainsTo: ["Caravansery"], chainsFrom: [], players: [3,6],   copies: {3:1,4:1,5:1,6:2,7:2}, vp: null, military: null, icon: null, summary: "1 coin discount when buying manufactured goods from either neighbor." },
  { name: "Tavern",            slug: "tavern",            age: 1, color: "yellow", cost: [], chainsTo: [],              chainsFrom: [], players: [4,5,7], copies: {3:0,4:1,5:2,6:2,7:3}, vp: null, military: null, icon: ["coin"], summary: "Gain 5 coins on play." },

  // ---------- Red / Military (3) — all 1 shield per user note ----------
  { name: "Barracks",    slug: "barracks",    age: 1, color: "red", cost: ["ore"],  chainsTo: [], chainsFrom: [], players: [3,5], copies: {3:1,4:1,5:2,6:2,7:2}, vp: null, military: 1, icon: ["shield"], summary: "1 Shield (military strength)." },
  { name: "Guard Tower", slug: "guard-tower", age: 1, color: "red", cost: ["clay"], chainsTo: [], chainsFrom: [], players: [3,4], copies: {3:1,4:2,5:2,6:2,7:2}, vp: null, military: 1, icon: ["shield"], summary: "1 Shield (military strength)." },
  { name: "Stockade",    slug: "stockade",    age: 1, color: "red", cost: ["wood"], chainsTo: [], chainsFrom: [], players: [3,7], copies: {3:1,4:1,5:1,6:1,7:2}, vp: null, military: 1, icon: ["shield"], summary: "1 Shield (military strength)." },

  // ---------- Green / Science (3) ----------
  { name: "Apothecary",  slug: "apothecary",  age: 1, color: "green", cost: ["loom"],    chainsTo: ["Stables","Dispensary"],       chainsFrom: [], players: [3,5], copies: {3:1,4:1,5:2,6:2,7:2}, vp: null, military: null, icon: ["compass"], summary: "1 Compass science symbol." },
  { name: "Scriptorium", slug: "scriptorium", age: 1, color: "green", cost: ["papyrus"], chainsTo: ["Courthouse","Library"],       chainsFrom: [], players: [3,4], copies: {3:1,4:2,5:2,6:2,7:2}, vp: null, military: null, icon: ["tablet"],  summary: "1 Tablet science symbol." },
  { name: "Workshop",    slug: "workshop",    age: 1, color: "green", cost: ["glass"],   chainsTo: ["Archery Range","Laboratory"], chainsFrom: [], players: [3,7], copies: {3:1,4:1,5:1,6:1,7:2}, vp: null, military: null, icon: ["gear"],    summary: "1 Gear science symbol." },


  // =================================================================
  // AGE II — 23 cards
  // =================================================================

  // ---------- Brown / Raw Materials (4) ----------
  { name: "Brickyard", slug: "brickyard", age: 2, color: "brown", cost: ["coin"], chainsTo: [], chainsFrom: [], players: [3,4], copies: {3:1,4:2,5:2,6:2,7:2}, vp: null, military: null, icon: ["clay"],  summary: "Produces 2 Clay." },
  { name: "Foundry",   slug: "foundry",   age: 2, color: "brown", cost: ["coin"], chainsTo: [], chainsFrom: [], players: [3,4], copies: {3:1,4:2,5:2,6:2,7:2}, vp: null, military: null, icon: ["ore"],   summary: "Produces 2 Ore." },
  { name: "Quarry",    slug: "quarry",    age: 2, color: "brown", cost: ["coin"], chainsTo: [], chainsFrom: [], players: [3,4], copies: {3:1,4:2,5:2,6:2,7:2}, vp: null, military: null, icon: ["stone"], summary: "Produces 2 Stone." },
  { name: "Sawmill",   slug: "sawmill",   age: 2, color: "brown", cost: ["coin"], chainsTo: [], chainsFrom: [], players: [3,4], copies: {3:1,4:2,5:2,6:2,7:2}, vp: null, military: null, icon: ["wood"],  summary: "Produces 2 Wood." },

  // ---------- Grey / Manufactured Goods (3) ----------
  { name: "Glassworks", slug: "glassworks-2", age: 2, color: "grey", cost: [], chainsTo: [], chainsFrom: [], players: [3,5], copies: {3:1,4:1,5:2,6:2,7:2}, vp: null, military: null, icon: ["glass"],   summary: "Produces 1 Glass." },
  { name: "Loom",       slug: "loom-2",       age: 2, color: "grey", cost: [], chainsTo: [], chainsFrom: [], players: [3,5], copies: {3:1,4:1,5:2,6:2,7:2}, vp: null, military: null, icon: ["loom"],    summary: "Produces 1 Loom." },
  { name: "Press",      slug: "press-2",      age: 2, color: "grey", cost: [], chainsTo: [], chainsFrom: [], players: [3,5], copies: {3:1,4:1,5:2,6:2,7:2}, vp: null, military: null, icon: ["papyrus"], summary: "Produces 1 Papyrus." },

  // ---------- Blue / Civic (4) ----------
  { name: "Aqueduct",   slug: "aqueduct",   age: 2, color: "blue", cost: ["stone","stone","stone"], chainsTo: [],            chainsFrom: ["Baths"],       players: [3,7], copies: {3:1,4:1,5:1,6:1,7:2}, vp: 5, military: null, icon: ["vp"], summary: "5 Victory Points." },
  { name: "Courthouse", slug: "courthouse", age: 2, color: "blue", cost: ["clay","clay","loom"],    chainsTo: [],            chainsFrom: ["Scriptorium"], players: [3,5], copies: {3:1,4:1,5:2,6:2,7:2}, vp: 4, military: null, icon: ["vp"], summary: "4 Victory Points." },
  { name: "Statue",     slug: "statue",     age: 2, color: "blue", cost: ["ore","ore","wood"],      chainsTo: [],            chainsFrom: ["Well"],        players: [3,7], copies: {3:1,4:1,5:1,6:1,7:2}, vp: 4, military: null, icon: ["vp"], summary: "4 Victory Points." },
  { name: "Temple",     slug: "temple",     age: 2, color: "blue", cost: ["wood","clay","glass"],   chainsTo: [],            chainsFrom: [],              players: [3,6], copies: {3:1,4:1,5:1,6:2,7:2}, vp: 4, military: null, icon: ["vp"], summary: "4 Victory Points." },

  // ---------- Yellow / Commercial (4) ----------
  { name: "Bazaar",      slug: "bazaar",      age: 2, color: "yellow", cost: [],              chainsTo: [],            chainsFrom: [],                                          players: [4,7],   copies: {3:0,4:1,5:1,6:1,7:2}, vp: null, military: null, icon: null,                              summary: "Gain 2 coins for each grey card in your and both neighbors' cities." },
  { name: "Caravansery", slug: "caravansery", age: 2, color: "yellow", cost: ["wood","wood"], chainsTo: ["Lighthouse"], chainsFrom: ["Marketplace"],                            players: [3,5,6], copies: {3:1,4:1,5:2,6:3,7:3}, vp: null, military: null, icon: ["wood","stone","clay","ore"],     summary: "Produces 1 Wood, Stone, Clay, or Ore (your choice each turn)." },
  { name: "Forum",       slug: "forum",       age: 2, color: "yellow", cost: ["clay","clay"], chainsTo: ["Haven"],      chainsFrom: ["East Trading Post","West Trading Post"], players: [3,6,7], copies: {3:1,4:1,5:1,6:2,7:3}, vp: null, military: null, icon: ["glass","loom","papyrus"],        summary: "Produces 1 Glass, Loom, or Papyrus (your choice each turn)." },
  { name: "Vineyard",    slug: "vineyard",    age: 2, color: "yellow", cost: [],              chainsTo: [],            chainsFrom: [],                                          players: [3,6],   copies: {3:1,4:1,5:1,6:2,7:2}, vp: null, military: null, icon: null,                              summary: "Gain 1 coin for each brown card in your and both neighbors' cities." },

  // ---------- Red / Military (4) ----------
  { name: "Archery Range",   slug: "archery-range",   age: 2, color: "red", cost: ["wood","wood","ore"], chainsTo: [],                  chainsFrom: ["Workshop"],   players: [3,6],   copies: {3:1,4:1,5:1,6:2,7:2}, vp: null, military: 2, icon: ["shield"], summary: "2 Shields." },
  { name: "Stables",         slug: "stables",         age: 2, color: "red", cost: ["wood","ore","clay"], chainsTo: [],                  chainsFrom: ["Apothecary"], players: [3,5],   copies: {3:1,4:1,5:2,6:2,7:2}, vp: null, military: 2, icon: ["shield"], summary: "2 Shields." },
  { name: "Training Ground", slug: "training-ground", age: 2, color: "red", cost: ["ore","ore","wood"], chainsTo: ["Circus"],          chainsFrom: [],              players: [4,6,7], copies: {3:0,4:1,5:1,6:2,7:3}, vp: null, military: 2, icon: ["shield"], summary: "2 Shields." },
  { name: "Walls",           slug: "walls",           age: 2, color: "red", cost: ["stone","stone","stone"], chainsTo: ["Fortifications"], chainsFrom: [],         players: [3,7],   copies: {3:1,4:1,5:1,6:1,7:2}, vp: null, military: 2, icon: ["shield"], summary: "2 Shields." },

  // ---------- Green / Science (4) ----------
  { name: "Dispensary", slug: "dispensary", age: 2, color: "green", cost: ["ore","ore","glass"],     chainsTo: ["Arena","Lodge"],                 chainsFrom: ["Apothecary"],  players: [3,4], copies: {3:1,4:2,5:2,6:2,7:2}, vp: null, military: null, icon: ["compass"], summary: "1 Compass science symbol." },
  { name: "Laboratory", slug: "laboratory", age: 2, color: "green", cost: ["clay","clay","papyrus"], chainsTo: ["Observatory","Siege Workshop"], chainsFrom: ["Workshop"],    players: [3,5], copies: {3:1,4:1,5:2,6:2,7:2}, vp: null, military: null, icon: ["gear"],    summary: "1 Gear science symbol." },
  { name: "Library",    slug: "library",    age: 2, color: "green", cost: ["stone","stone","loom"],  chainsTo: ["Senate","University"],          chainsFrom: ["Scriptorium"], players: [3,6], copies: {3:1,4:1,5:1,6:2,7:2}, vp: null, military: null, icon: ["tablet"],  summary: "1 Tablet science symbol." },
  { name: "School",     slug: "school",     age: 2, color: "green", cost: ["wood","papyrus"],        chainsTo: ["Academy","Study"],              chainsFrom: [],              players: [3,7], copies: {3:1,4:1,5:1,6:1,7:2}, vp: null, military: null, icon: ["tablet"],  summary: "1 Tablet science symbol." },


  // =================================================================
  // AGE III — 30 cards (incl. 10 Guilds)
  // =================================================================

  // ---------- Blue / Civic (5) ----------
  { name: "Gardens",   slug: "gardens",   age: 3, color: "blue", cost: ["clay","clay","wood"],                                  chainsTo: [], chainsFrom: ["Theater"], players: [3,4], copies: {3:1,4:2,5:2,6:2,7:2}, vp: 5, military: null, icon: ["vp"], summary: "5 Victory Points." },
  { name: "Palace",    slug: "palace",    age: 3, color: "blue", cost: ["wood","stone","ore","clay","glass","papyrus","loom"], chainsTo: [], chainsFrom: [],          players: [3,7], copies: {3:1,4:1,5:1,6:1,7:2}, vp: 8, military: null, icon: ["vp"], summary: "8 Victory Points." },
  { name: "Pantheon",  slug: "pantheon",  age: 3, color: "blue", cost: ["clay","clay","ore","glass","papyrus","loom"],         chainsTo: [], chainsFrom: ["Altar"],   players: [3,6], copies: {3:1,4:1,5:1,6:2,7:2}, vp: 7, military: null, icon: ["vp"], summary: "7 Victory Points." },
  { name: "Senate",    slug: "senate",    age: 3, color: "blue", cost: ["wood","wood","stone","ore"],                          chainsTo: [], chainsFrom: ["Library"], players: [3,5], copies: {3:1,4:1,5:2,6:2,7:2}, vp: 6, military: null, icon: ["vp"], summary: "6 Victory Points." },
  { name: "Town Hall", slug: "town-hall", age: 3, color: "blue", cost: ["stone","stone","ore","glass"],                        chainsTo: [], chainsFrom: [],          players: [3,6], copies: {3:1,4:1,5:1,6:2,7:2}, vp: 7, military: null, icon: ["vp"], summary: "7 Victory Points." },

  // ---------- Yellow / Commercial (5) — icons TBD ----------
  { name: "Arena",               slug: "arena",               age: 3, color: "yellow", cost: ["stone","stone","ore"], chainsTo: [], chainsFrom: ["Dispensary"],   players: [3,5],   copies: {3:1,4:1,5:2,6:2,7:2}, vp: null, military: null, icon: null, summary: "3 coins + 1 VP for each Wonder stage you've built." },
  { name: "Chamber of Commerce", slug: "chamber-of-commerce", age: 3, color: "yellow", cost: ["clay","clay","papyrus"], chainsTo: [], chainsFrom: [],            players: [4,6],   copies: {3:0,4:1,5:1,6:2,7:2}, vp: null, military: null, icon: null, summary: "2 coins + 2 VP for each grey card in your city." },
  { name: "Haven",               slug: "haven",               age: 3, color: "yellow", cost: ["wood","ore","loom"],     chainsTo: [], chainsFrom: ["Forum"],      players: [3,4],   copies: {3:1,4:2,5:2,6:2,7:2}, vp: null, military: null, icon: null, summary: "1 coin + 1 VP for each brown card in your city." },
  { name: "Lighthouse",          slug: "lighthouse",          age: 3, color: "yellow", cost: ["stone","glass"],         chainsTo: [], chainsFrom: ["Caravansery"], players: [3,6],   copies: {3:1,4:1,5:1,6:2,7:2}, vp: null, military: null, icon: null, summary: "1 coin + 1 VP for each yellow card in your city." },
  { name: "Ludus",               slug: "ludus",               age: 3, color: "yellow", cost: ["stone","ore"],           chainsTo: [], chainsFrom: [],              players: [5,7],   copies: {3:0,4:0,5:1,6:1,7:2}, vp: null, military: null, icon: null, summary: "3 coins + 1 VP for each red card in your city." },

  // ---------- Red / Military (5) ----------
  { name: "Arsenal",        slug: "arsenal",        age: 3, color: "red", cost: ["wood","wood","ore","loom"],     chainsTo: [], chainsFrom: [],                  players: [3,5],     copies: {3:1,4:1,5:2,6:2,7:2}, vp: null, military: 3, icon: ["shield"], summary: "3 Shields." },
  { name: "Castrum",        slug: "castrum",        age: 3, color: "red", cost: ["clay","clay","wood","papyrus"], chainsTo: [], chainsFrom: [],                  players: [4,7],     copies: {3:0,4:1,5:1,6:1,7:2}, vp: null, military: 3, icon: ["shield"], summary: "3 Shields." },
  { name: "Circus",         slug: "circus",         age: 3, color: "red", cost: ["stone","stone","stone","ore"],   chainsTo: [], chainsFrom: ["Training Ground"], players: [4,6],   copies: {3:0,4:1,5:1,6:2,7:2}, vp: null, military: 3, icon: ["shield"], summary: "3 Shields." },
  { name: "Fortifications", slug: "fortifications", age: 3, color: "red", cost: ["ore","ore","ore","clay"],        chainsTo: [], chainsFrom: ["Walls"],          players: [3,7],     copies: {3:1,4:1,5:1,6:1,7:2}, vp: null, military: 3, icon: ["shield"], summary: "3 Shields." },
  { name: "Siege Workshop", slug: "siege-workshop", age: 3, color: "red", cost: ["clay","clay","clay","wood"],     chainsTo: [], chainsFrom: ["Laboratory"],     players: [3,5],     copies: {3:1,4:1,5:2,6:2,7:2}, vp: null, military: 3, icon: ["shield"], summary: "3 Shields." },

  // ---------- Green / Science (5) ----------
  { name: "Academy",    slug: "academy",    age: 3, color: "green", cost: ["stone","stone","stone","glass"], chainsTo: [], chainsFrom: ["School"],     players: [3,7], copies: {3:1,4:1,5:1,6:1,7:2}, vp: null, military: null, icon: ["compass"], summary: "1 Compass science symbol." },
  { name: "Lodge",      slug: "lodge",      age: 3, color: "green", cost: ["clay","clay","papyrus","loom"],  chainsTo: [], chainsFrom: ["Dispensary"], players: [3,6], copies: {3:1,4:1,5:1,6:2,7:2}, vp: null, military: null, icon: ["compass"], summary: "1 Compass science symbol." },
  { name: "Observatory", slug: "observatory", age: 3, color: "green", cost: ["ore","ore","glass","loom"],    chainsTo: [], chainsFrom: ["Laboratory"], players: [3,7], copies: {3:1,4:1,5:1,6:1,7:2}, vp: null, military: null, icon: ["gear"],    summary: "1 Gear science symbol." },
  { name: "Study",      slug: "study",      age: 3, color: "green", cost: ["wood","papyrus","loom"],         chainsTo: [], chainsFrom: ["School"],     players: [3,5], copies: {3:1,4:1,5:2,6:2,7:2}, vp: null, military: null, icon: ["gear"],    summary: "1 Gear science symbol." },
  { name: "University", slug: "university", age: 3, color: "green", cost: ["wood","wood","glass","papyrus"], chainsTo: [], chainsFrom: ["Library"],    players: [3,4], copies: {3:1,4:2,5:2,6:2,7:2}, vp: null, military: null, icon: ["tablet"],  summary: "1 Tablet science symbol." },

  // ---------- Purple / Guilds (10) — always displayed regardless of player count ----------
  { name: "Builders Guild",      slug: "builders-guild",      age: 3, color: "purple", cost: ["stone","stone","stone","clay","clay","glass"],     chainsTo: [], chainsFrom: [], players: [3,4,5,6,7], copies: {3:1,4:1,5:1,6:1,7:1}, vp: null, military: null, icon: ["vp"],                       isGuild: true, summary: "End: 1 VP per Wonder stage built in your and both neighbors' cities." },
  { name: "Craftsmens Guild",    slug: "craftsmens-guild",    age: 3, color: "purple", cost: ["stone","stone","ore","ore"],                       chainsTo: [], chainsFrom: [], players: [3,4,5,6,7], copies: {3:1,4:1,5:1,6:1,7:1}, vp: null, military: null, icon: ["vp"],                       isGuild: true, summary: "End: 2 VP per grey card in both neighbors' cities." },
  { name: "Decorators Guild",    slug: "decorators-guild",    age: 3, color: "purple", cost: ["ore","ore","stone","loom"],                        chainsTo: [], chainsFrom: [], players: [3,4,5,6,7], copies: {3:1,4:1,5:1,6:1,7:1}, vp: null, military: null, icon: ["vp"],                       isGuild: true, summary: "End: 7 VP if all your Wonder stages are built." },
  { name: "Magistrates Guild",   slug: "magistrates-guild",   age: 3, color: "purple", cost: ["wood","wood","wood","stone","loom"],               chainsTo: [], chainsFrom: [], players: [3,4,5,6,7], copies: {3:1,4:1,5:1,6:1,7:1}, vp: null, military: null, icon: ["vp"],                       isGuild: true, summary: "End: 1 VP per blue card in both neighbors' cities." },
  { name: "Philosophers Guild",  slug: "philosophers-guild",  age: 3, color: "purple", cost: ["clay","clay","clay","papyrus","loom"],             chainsTo: [], chainsFrom: [], players: [3,4,5,6,7], copies: {3:1,4:1,5:1,6:1,7:1}, vp: null, military: null, icon: ["vp"],                       isGuild: true, summary: "End: 1 VP per green card in both neighbors' cities." },
  { name: "Scientists Guild",    slug: "scientists-guild",    age: 3, color: "purple", cost: ["wood","wood","ore","ore","papyrus"],               chainsTo: [], chainsFrom: [], players: [3,4,5,6,7], copies: {3:1,4:1,5:1,6:1,7:1}, vp: null, military: null, icon: ["compass","tablet","gear"], isGuild: true, summary: "Counts as a Compass, Tablet, or Gear (your choice at scoring)." },
  { name: "Shipowners Guild",    slug: "shipowners-guild",    age: 3, color: "purple", cost: ["wood","wood","wood","glass","papyrus"],            chainsTo: [], chainsFrom: [], players: [3,4,5,6,7], copies: {3:1,4:1,5:1,6:1,7:1}, vp: null, military: null, icon: ["vp"],                       isGuild: true, summary: "End: 1 VP per brown, grey, and purple card in your own city." },
  { name: "Spies Guild",         slug: "spies-guild",         age: 3, color: "purple", cost: ["clay","clay","clay","glass"],                      chainsTo: [], chainsFrom: [], players: [3,4,5,6,7], copies: {3:1,4:1,5:1,6:1,7:1}, vp: null, military: null, icon: ["vp"],                       isGuild: true, summary: "End: 1 VP per red card in both neighbors' cities." },
  { name: "Traders Guild",       slug: "traders-guild",       age: 3, color: "purple", cost: ["glass","papyrus","loom"],                          chainsTo: [], chainsFrom: [], players: [3,4,5,6,7], copies: {3:1,4:1,5:1,6:1,7:1}, vp: null, military: null, icon: ["vp"],                       isGuild: true, summary: "End: 1 VP per yellow card in both neighbors' cities." },
  { name: "Workers Guild",       slug: "workers-guild",       age: 3, color: "purple", cost: ["ore","ore","wood","stone","clay"],                 chainsTo: [], chainsFrom: [], players: [3,4,5,6,7], copies: {3:1,4:1,5:1,6:1,7:1}, vp: null, military: null, icon: ["vp"],                       isGuild: true, summary: "End: 1 VP per brown card in both neighbors' cities." },
];
