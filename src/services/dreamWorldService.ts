import type {
  DreamWorld,
  GenerateWorldParams,
  PaletteId,
  DreamPaletteConfig,
  WorldType,
  MoodType,
  WorldSize,
  ChatMessage,
} from '@/types/dreamWorld';

export const DREAM_PALETTES: Record<PaletteId, DreamPaletteConfig> = {
  'moon-milk': {
    id: 'moon-milk',
    name: 'Moon Milk',
    description: 'Pearly creams, soft silver, and pale lavender moonlight',
    primaryColor: '#7c3aed',
    accentColor: '#38bdf8',
    skyGradient: ['#1e1b4b', '#312e81', '#4c1d95'],
    terrainColor: '#1e1b4b',
    cardBg: '#faf5ff',
    glowColor: 'rgba(192, 132, 252, 0.4)',
  },
  'rose-nebula': {
    id: 'rose-nebula',
    name: 'Rose Nebula',
    description: 'Velvet berry, blush dust, and magenta starlight',
    primaryColor: '#a34063',
    accentColor: '#f472b6',
    skyGradient: ['#2e1065', '#581c87', '#831843'],
    terrainColor: '#3b0764',
    cardBg: '#fdf2f8',
    glowColor: 'rgba(244, 114, 182, 0.4)',
  },
  'midnight-velvet': {
    id: 'midnight-velvet',
    name: 'Midnight Velvet',
    description: 'Deep midnight navy, chocolate undertones, and amber lanterns',
    primaryColor: '#5c4033',
    accentColor: '#f59e0b',
    skyGradient: ['#0f172a', '#1e293b', '#211b31'],
    terrainColor: '#0b0f19',
    cardBg: '#f8fafc',
    glowColor: 'rgba(245, 158, 11, 0.4)',
  },
  'peach-stardust': {
    id: 'peach-stardust',
    name: 'Peach Stardust',
    description: 'Warm apricot gold, coral glow, and twilight amber',
    primaryColor: '#ea580c',
    accentColor: '#fbbf24',
    skyGradient: ['#2a1215', '#451a03', '#7c2d12'],
    terrainColor: '#1c1917',
    cardBg: '#fff7ed',
    glowColor: 'rgba(251, 191, 36, 0.4)',
  },
};

export const SURPRISE_PROMPTS: {
  prompt: string;
  worldType: WorldType;
  mood: MoodType;
  size: WorldSize;
  paletteId: PaletteId;
}[] = [
  {
    prompt: 'A gentle silver forest where fireflies carry tiny teacups and ancient cedar trees softly hum lullabies in three-part harmony.',
    worldType: 'moonlit-forest',
    mood: 'peaceful',
    size: 'little-universe',
    paletteId: 'moon-milk',
  },
  {
    prompt: 'A buoyant archipelago of marshmallow clouds drifting over sleepy towers, anchored by golden silk yarn.',
    worldType: 'cloud-city',
    mood: 'playful',
    size: 'tiny-dream',
    paletteId: 'rose-nebula',
  },
  {
    prompt: 'A tranquil ocean floor illuminated by bioluminescent anemones that whisper bedtime riddles to baby seahorses.',
    worldType: 'underwater-kingdom',
    mood: 'mysterious',
    size: 'endless-world',
    paletteId: 'midnight-velvet',
  },
  {
    prompt: 'A spiral labyrinth of parchment archives where forgotten childhood nursery rhymes sleep between velvet bookmarks.',
    worldType: 'dream-library',
    mood: 'nostalgic',
    size: 'little-universe',
    paletteId: 'peach-stardust',
  },
  {
    prompt: 'An interstellar greenhouse floating through an asteroid ring, blooming with starfruit that tastes like sweet honeyed milk.',
    worldType: 'cosmic-garden',
    mood: 'cosmic',
    size: 'endless-world',
    paletteId: 'rose-nebula',
  },
  {
    prompt: 'A cozy candlelit nursery floating inside a giant antique pocket watch that ticks in soothing waltz time.',
    worldType: 'custom',
    mood: 'magical',
    size: 'tiny-dream',
    paletteId: 'midnight-velvet',
  },
];

export const INITIAL_FEATURED_WORLDS: Record<WorldType, DreamWorld> = {
  'moonlit-forest': {
    id: 'world-moonlit-forest',
    title: 'The Whispering Boughs of Somnia',
    tagline: 'Where ancient cedar trees tuck sleeping fireflies into mossy cradles',
    prompt: 'A gentle silver forest where fireflies carry tiny teacups and trees softly hum lullabies.',
    worldType: 'moonlit-forest',
    mood: 'peaceful',
    size: 'little-universe',
    paletteId: 'moon-milk',
    atmosphereAndLighting: 'Dappled silver moonlight filtering through bioluminescent willow branches; calm pine-scented breezes.',
    description: 'Deep in the Midnight Nursery’s outermost canopy lies the Whispering Boughs. Ancient cedar trees with hand-knitted woolen scarves act as nocturnal guardians, ensuring young dreamers fall asleep without fear.',
    locations: [
      {
        id: 'loc-1',
        name: 'The Teacup Glade',
        description: 'A circular hollow ringed by glow-moss where fireflies brew chamomile tea in silver thimbles.',
        discovery: 'A sterling pocket-watch teaspoon that stirs gentle dreams.',
        storySnippet: 'Pip once traded a polished silver rattle here for a thermos of moon-dew tea that kept the nursery warm for three seasons.',
        x: 24,
        y: 62,
        iconType: 'nest',
      },
      {
        id: 'loc-2',
        name: 'Harmonic Willow Spire',
        description: 'A colossal weeping willow whose drooping branches vibrate like silver harp strings in the wind.',
        discovery: 'A sleeping barn owl holding a hand-carved wooden tuning fork.',
        storySnippet: 'When midnight winds rise, the willow plays the Brahms Cradle lullaby in three perfectly harmonized octaves.',
        x: 52,
        y: 38,
        iconType: 'beacon',
      },
      {
        id: 'loc-3',
        name: 'Lantern Moss Hollow',
        description: 'A sheltered subterranean den where fallen acorns glow like bedside nightlights.',
        discovery: 'An illuminated diary filled with constellation bedtime recipes.',
        storySnippet: 'Baby dormice cuddle together here, using acorn caps as nightcaps just like Pip.',
        x: 82,
        y: 70,
        iconType: 'shrine',
      },
    ],
    inhabitants: ['Tea-Bearer Fireflies', 'Knitted-Scarf Cedar Elders', 'Sleepy Velvet Dormice', 'Silver-Winged Moth Couriers'],
    hiddenDiscovery: 'A buried music box cylinder made of pure starlight that only chimes when all nursery lamps are dimmed.',
    worldStory: 'Long before the midnight nursery clocks were built, the first lullaby blew through this forest. Pip discovered it while chasing an errant nightcap, and ever since, this grove has been the chief supply station for calming bedtime breezes.',
    visualConfig: {
      skyGradient: ['#1e1b4b', '#312e81', '#4c1d95'],
      terrainColor: '#1e1b4b',
      accentGlow: 'rgba(192, 132, 252, 0.4)',
      starDensity: 45,
      floatingEntities: ['Glowing firefly', 'Silver leaf', 'Lullaby note'],
      canopyStyle: 'trees',
    },
    createdAt: new Date().toISOString(),
    version: 1,
  },
  'cloud-city': {
    id: 'world-cloud-city',
    title: 'Cumulus Citadel of Zephyr',
    tagline: 'Floating pillow-castles anchored by spools of spun starlight',
    prompt: 'A buoyant archipelago of marshmallow clouds drifting over sleepy towers.',
    worldType: 'cloud-city',
    mood: 'playful',
    size: 'tiny-dream',
    paletteId: 'rose-nebula',
    atmosphereAndLighting: 'Soft cotton-candy twilight with warm peach rays catching billowing vapor terraces.',
    description: 'An aerial haven where weary cloud-weavers spin pillow cushions for restless dreamers below. The streets are woven from thick cotton candy that never melts.',
    locations: [
      {
        id: 'loc-1',
        name: 'Spun-Sugar Harbor',
        description: 'Where zephyr gondolas dock to unload bales of freshly carded dream wool.',
        discovery: 'A golden anchor braided from mother’s humming lullabies.',
        storySnippet: 'Pip moored his cloud-glider here on his second shift and accidentally fell asleep on a sugar crate.',
        x: 20,
        y: 45,
        iconType: 'beacon',
      },
      {
        id: 'loc-2',
        name: 'The Feathered Observatory',
        description: 'A glass dome atop the highest vapor peak tracking shooting stars before bedtime.',
        discovery: 'A brass star-catcher telescope calibrated to sleepy yawns.',
        storySnippet: 'Night watchmen peer down from this dome to spot baby cradles that need extra blanket tucks.',
        x: 58,
        y: 28,
        iconType: 'observatory',
      },
      {
        id: 'loc-3',
        name: 'Pillow-Weaver Looms',
        description: 'Giant wooden wheels spinning clouds into hypoallergenic dream mattresses.',
        discovery: 'A feather plucked from the mythical Midnight Goose of Peace.',
        storySnippet: 'Every pillow stamped with Pip’s skull-crest here is certified 100% nightmare-proof.',
        x: 80,
        y: 65,
        iconType: 'nest',
      },
    ],
    inhabitants: ['Bumble-Cloud Weavers', 'Feathered Courier Doves', 'Marshmallow Sprite Squires', 'Breeze Shepherds'],
    hiddenDiscovery: 'A secret trapdoor in the cloud floor revealing the upside-down star nursery below.',
    worldStory: 'Built during the First Great Yawn, the Cumulus Citadel catches high-altitude nightmares in silk nets, washing them in lavender rain until they turn into sweet afternoon naps.',
    visualConfig: {
      skyGradient: ['#2e1065', '#581c87', '#831843'],
      terrainColor: '#3b0764',
      accentGlow: 'rgba(244, 114, 182, 0.4)',
      starDensity: 35,
      floatingEntities: ['Marshmallow puff', 'Feather drift', 'Ribbon spark'],
      canopyStyle: 'clouds',
    },
    createdAt: new Date().toISOString(),
    version: 1,
  },
  'underwater-kingdom': {
    id: 'world-underwater-kingdom',
    title: 'The Abyssal Cradle of Coral',
    tagline: 'Warm bioluminescent trenches where sea-glass bells ring in slow motion',
    prompt: 'A tranquil ocean floor illuminated by bioluminescent anemones whispering bedtime riddles.',
    worldType: 'underwater-kingdom',
    mood: 'mysterious',
    size: 'endless-world',
    paletteId: 'midnight-velvet',
    atmosphereAndLighting: 'Gentle indigo currents dotted with teal and amber sea-fire; soothing muffled water chimes.',
    description: 'A subterranean lagoon where saltwater is warm as bathwater. Schools of glass minnows swim in formation to spell out sleepy bedtime blessings.',
    locations: [
      {
        id: 'loc-1',
        name: 'Nautilus Nursery Chamber',
        description: 'Giant spiral spiral-shells hollowed out into rocking cribs with silk kelp sheets.',
        discovery: 'A pearl that glows with the exact hue of warm morning tea.',
        storySnippet: 'Baby octopuses sleep eight arms folded over their chests, clutching tiny nightcaps.',
        x: 28,
        y: 58,
        iconType: 'shrine',
      },
      {
        id: 'loc-2',
        name: 'The Whispering Kelp Forest',
        description: 'Tall golden kelp fronds swaying in tidal rhythms, filtering out scary thoughts.',
        discovery: 'A silver tide-whistle carved by the first nursery cartographer.',
        storySnippet: 'When Pip swims through here, the fish mistake his shiny skull for a polished white sea-stone.',
        x: 55,
        y: 40,
        iconType: 'garden',
      },
      {
        id: 'loc-3',
        name: 'The Bioluminescent Trench',
        description: 'The deepest velvet crevasse where glowing angler lantern-fish guide sleepy voyagers.',
        discovery: 'A sunken treasure chest filled with soft stuffed teddy-sharks.',
        storySnippet: 'The lantern-fish use Pip’s nightlight formulas to keep their lures gentle and reassuring.',
        x: 84,
        y: 75,
        iconType: 'beacon',
      },
    ],
    inhabitants: ['Lantern-Carrier Anglers', 'Glass Minnow Choirs', 'Kelp-Weaving Turtles', 'Velvet Sea-Horses'],
    hiddenDiscovery: 'A submerged cathedral organ powered by thermal vent bubbles that plays whale lullabies.',
    worldStory: 'Tucked beneath the restless waves of the waking world, the Coral Cradle is where heavy eyelids go to sink into deep, weightless slumber.',
    visualConfig: {
      skyGradient: ['#0f172a', '#1e293b', '#211b31'],
      terrainColor: '#0b0f19',
      accentGlow: 'rgba(245, 158, 11, 0.4)',
      starDensity: 40,
      floatingEntities: ['Glowing bubble', 'Jellyfish drift', 'Sea-sparkle'],
      canopyStyle: 'coral',
    },
    createdAt: new Date().toISOString(),
    version: 1,
  },
  'dream-library': {
    id: 'world-dream-library',
    title: 'The Alexandria of Lost Reveries',
    tagline: 'Infinite towers of velvet-bound bedtime books that whisper when opened',
    prompt: 'A spiral labyrinth of parchment archives where forgotten nursery rhymes sleep.',
    worldType: 'dream-library',
    mood: 'nostalgic',
    size: 'little-universe',
    paletteId: 'peach-stardust',
    atmosphereAndLighting: 'Warm amber desk lamps, aroma of aged vanilla parchment and lavender dust.',
    description: 'A labyrinth of spiral wooden staircases and cedar bookshelves reaching toward an open skylight of swirling nebulae. Every story ever imagined by a sleepy child is cataloged here.',
    locations: [
      {
        id: 'loc-1',
        name: 'The Whispering Folio Atrium',
        description: 'A vaulted rotunda where parchment scrolls flutter down on velvet updrafts.',
        discovery: 'An illuminated manuscript titled "Pip’s Guide to Comforting the Crying".',
        storySnippet: 'Pages turn on their own when a reader nods off, saving the dream bookmark automatically.',
        x: 32,
        y: 48,
        iconType: 'archive',
      },
      {
        id: 'loc-2',
        name: 'Clockwork Book-Ladders',
        description: 'Brass wheeled ladders that glide across mile-high mahogany shelves to fetch sleepy tales.',
        discovery: 'A tiny golden key that unlocks the Chapter of Unending Morning Cocoa.',
        storySnippet: 'Pip likes to ride the ladders like a rollercoaster between the fairytale and astronomy sections.',
        x: 60,
        y: 35,
        iconType: 'beacon',
      },
      {
        id: 'loc-3',
        name: 'The Skylight Reading Nest',
        description: 'Plush velvet beanbags right beneath the glass cupola looking out into star nurseries.',
        discovery: 'A sleeping brass bookmark owl who tests readers on gentle trivia.',
        storySnippet: 'Curled up under an embroidered quilt here, no dream has ever ended in a cliffhanger.',
        x: 78,
        y: 68,
        iconType: 'nest',
      },
    ],
    inhabitants: ['Ink-Winged Moth Curators', 'Clockwork Librarian Gnomes', 'Parchment Origami Sparrows', 'Velvet Bookworms'],
    hiddenDiscovery: 'A secret mezzanine shelf holding the draft for the very next dream you will dream tonight.',
    worldStory: 'Every night, Pip files new dream delivery receipts here so that children never forget the imaginary friends they played with in the dark.',
    visualConfig: {
      skyGradient: ['#2a1215', '#451a03', '#7c2d12'],
      terrainColor: '#1c1917',
      accentGlow: 'rgba(251, 191, 36, 0.4)',
      starDensity: 50,
      floatingEntities: ['Floating book', 'Parchment leaf', 'Amber spark'],
      canopyStyle: 'books',
    },
    createdAt: new Date().toISOString(),
    version: 1,
  },
  'cosmic-garden': {
    id: 'world-cosmic-garden',
    title: 'The Astral Nursery Arboretum',
    tagline: 'Terraced comet-beds blooming with starfruit and lullaby geodes',
    prompt: 'An interstellar greenhouse floating through an asteroid ring, blooming with starfruit.',
    worldType: 'cosmic-garden',
    mood: 'cosmic',
    size: 'endless-world',
    paletteId: 'rose-nebula',
    atmosphereAndLighting: 'Prismatic starlight refracted through crystalline greenhouse glass, aurora borealis mist.',
    description: 'An orbital botanical sanctuary anchored inside a hollowed amethyst geode. Stems of stardust vines produce soft chime-blossoms that ring when touched.',
    locations: [
      {
        id: 'loc-1',
        name: 'Geode Bloom Terraces',
        description: 'Step-tiered stone planters filled with soil made of crushed meteor sugar.',
        discovery: 'A ripe starfruit that tastes like warm honeyed milk.',
        storySnippet: 'Pip harvests the juice of these fruits to polish his lucky nightcap star until it glints.',
        x: 25,
        y: 42,
        iconType: 'garden',
      },
      {
        id: 'loc-2',
        name: 'The Nebula Waterwheel',
        description: 'A slow-turning crystal wheel scooping purple cosmic dust to irrigate the slumber lilies.',
        discovery: 'A glass vial containing concentrated comet lullaby mist.',
        storySnippet: 'The turning wheel emits a low 432Hz hum that puts even rowdy toddler planets to sleep.',
        x: 58,
        y: 52,
        iconType: 'beacon',
      },
      {
        id: 'loc-3',
        name: 'Aurora Prism Conservatory',
        description: 'A vaulted glass solarium where northern lights are sorted by warmth and softness.',
        discovery: 'A spectrum lens that lets you view dreams in 72 brand-new bedtime colors.',
        storySnippet: 'Pip stored his personal dream glider here during the solar wind storm of Shift 2.',
        x: 82,
        y: 32,
        iconType: 'observatory',
      },
    ],
    inhabitants: ['Stardust Honeybees', 'Comet-Tending Gardeners', 'Prism-Winged Dragonfly Drones', 'Amethyst Sloth Sages'],
    hiddenDiscovery: 'A seed pod from the very first star that was ever planted in the cosmos.',
    worldStory: 'The Arboretum supplies Midnight Nursery with raw starlight seeds. When planted in the mind before sleep, they blossom into joyful morning waking thoughts.',
    visualConfig: {
      skyGradient: ['#2e1065', '#581c87', '#831843'],
      terrainColor: '#3b0764',
      accentGlow: 'rgba(244, 114, 182, 0.4)',
      starDensity: 60,
      floatingEntities: ['Stardust seed', 'Aurora prism', 'Glider spark'],
      canopyStyle: 'nebula',
    },
    createdAt: new Date().toISOString(),
    version: 1,
  },
  'custom': {
    id: 'world-custom-nursery',
    title: 'The Clockwork Cradle of Lost Hours',
    tagline: 'A floating nursery inside an antique grandfather watch that ticks in waltz time',
    prompt: 'A cozy candlelit nursery floating inside a giant antique pocket watch.',
    worldType: 'custom',
    mood: 'magical',
    size: 'tiny-dream',
    paletteId: 'midnight-velvet',
    atmosphereAndLighting: 'Gleaming brass gears, warm amber candlelight, soothing rhythmic pendulum ticks.',
    description: 'Hidden inside the main escapement wheel of the Midnight Nursery clock tower, this secret micro-sanctuary pauses all hurry and anxiety.',
    locations: [
      {
        id: 'loc-1',
        name: 'The Escapement Cradle',
        description: 'A velvet hammock hung between two interlocking brass ruby-bearing gear teeth.',
        discovery: 'A winding key crafted from pure moonstone.',
        storySnippet: 'Every swing of the gear rocks the hammock exactly 1.2 inches to the left and right.',
        x: 28,
        y: 55,
        iconType: 'shrine',
      },
      {
        id: 'loc-2',
        name: 'Minute Hand Bridge',
        description: 'A long filigreed steel bridge arching across the clock face looking out at the stars.',
        discovery: 'A carved bell hammer that rings only once every century for nap time.',
        storySnippet: 'Pip walks this bridge at 11:59 PM every shift to salute the incoming dream delivery team.',
        x: 62,
        y: 36,
        iconType: 'beacon',
      },
      {
        id: 'loc-3',
        name: 'The Balance-Spring Observatory',
        description: 'A coiled spiral spring that breathes in and out like a sleeping chest.',
        discovery: 'A velvet pouch holding seconds that were saved up from happy childhood days.',
        storySnippet: 'Resting against the balance spring instantly regulates your heartbeat to sweet peaceful rest.',
        x: 82,
        y: 64,
        iconType: 'observatory',
      },
    ],
    inhabitants: ['Clockwork Bell-Chimers', 'Brass Moth Watchmakers', 'Ruby-Bearing Beetle Apprentices', 'Pendulum Swifts'],
    hiddenDiscovery: 'The 13th hour gear, an impossible time zone where dreams can last as long as you want.',
    worldStory: 'Time doesn’t run out in Pip’s clockwork cradle—it slows down to a gentle honey drip, letting dreamers rest without ever looking at tomorrow’s alarm.',
    visualConfig: {
      skyGradient: ['#0f172a', '#1e293b', '#211b31'],
      terrainColor: '#0b0f19',
      accentGlow: 'rgba(245, 158, 11, 0.4)',
      starDensity: 40,
      floatingEntities: ['Brass cog', 'Tiny tick-mark', 'Golden spark'],
      canopyStyle: 'crystal',
    },
    createdAt: new Date().toISOString(),
    version: 1,
  },
};

// Procedural Dream World Generator
export function generateProceduralDreamWorld(params: GenerateWorldParams): DreamWorld {
  const { prompt, worldType, mood, size, paletteId } = params;
  const palette = DREAM_PALETTES[paletteId] || DREAM_PALETTES['moon-milk'];
  const baseSample = INITIAL_FEATURED_WORLDS[worldType] || INITIAL_FEATURED_WORLDS['moonlit-forest'];

  const cleanPrompt = prompt.trim();
  const titleWords = cleanPrompt.split(/\s+/).slice(0, 4).join(' ');
  const generatedTitle = cleanPrompt.length > 5
    ? `The Dream of ${titleWords.replace(/[.,!?;:]/g, '')}`
    : baseSample.title;

  const moodAdjectives: Record<MoodType, string> = {
    peaceful: 'calm, serene, and gently rocking',
    magical: 'sparkling, wondrous, and wrapped in warm enchantment',
    mysterious: 'shadowed in velvet indigo, filled with friendly curiosities',
    playful: 'bouncy, bright-eyed, and filled with giggling echoes',
    nostalgic: 'sweet as an old bedtime story, scented with lavender parchment',
    cosmic: 'infinite, bathed in starlight ribbons and gentle planetary hums',
  };

  const sizeDescriptions: Record<WorldSize, string> = {
    'tiny-dream': 'A cozy miniature sanctuary tucked inside a teacup or hollow acorn.',
    'little-universe': 'A vibrant territory spanning five floating hilltops and three starry streams.',
    'endless-world': 'An expansive nocturnal continent stretching into horizon-less nebulae.',
  };

  return {
    id: `world-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    title: generatedTitle,
    tagline: `${mood.toUpperCase()} • ${size.replace('-', ' ').toUpperCase()} • Crafted for ${cleanPrompt ? `"${cleanPrompt.slice(0, 35)}..."` : 'Sweet Slumber'}`,
    prompt: cleanPrompt || baseSample.prompt,
    worldType,
    mood,
    size,
    paletteId,
    atmosphereAndLighting: `${moodAdjectives[mood]}. ${palette.description}. Atmosphere notes: ${baseSample.atmosphereAndLighting}`,
    description: cleanPrompt
      ? `Inspired by the vision: "${cleanPrompt}". ${sizeDescriptions[size]} Pip and the Midnight Nursery team have engineered this realm with bedtime safety seals and zero nightmares.`
      : baseSample.description,
    locations: [
      {
        id: `loc-p1-${Date.now()}`,
        name: `${baseSample.locations[0].name}`,
        description: `${baseSample.locations[0].description} Infused with ${mood} vibrations.`,
        discovery: baseSample.locations[0].discovery,
        storySnippet: baseSample.locations[0].storySnippet,
        x: baseSample.locations[0].x,
        y: baseSample.locations[0].y,
        iconType: baseSample.locations[0].iconType,
      },
      {
        id: `loc-p2-${Date.now()}`,
        name: `${baseSample.locations[1].name}`,
        description: `${baseSample.locations[1].description}`,
        discovery: baseSample.locations[1].discovery,
        storySnippet: baseSample.locations[1].storySnippet,
        x: baseSample.locations[1].x,
        y: baseSample.locations[1].y,
        iconType: baseSample.locations[1].iconType,
      },
      {
        id: `loc-p3-${Date.now()}`,
        name: `${baseSample.locations[2].name}`,
        description: `${baseSample.locations[2].description}`,
        discovery: baseSample.locations[2].discovery,
        storySnippet: baseSample.locations[2].storySnippet,
        x: baseSample.locations[2].x,
        y: baseSample.locations[2].y,
        iconType: baseSample.locations[2].iconType,
      },
    ],
    inhabitants: [
      ...baseSample.inhabitants.slice(0, 3),
      `Stardust ${mood.charAt(0).toUpperCase() + mood.slice(1)} Sprites`,
    ],
    hiddenDiscovery: baseSample.hiddenDiscovery,
    worldStory: `When Pip received the dream beacon for "${cleanPrompt || generatedTitle}", he immediately set the Nursery looms to Shift 3. ${baseSample.worldStory}`,
    visualConfig: {
      skyGradient: palette.skyGradient,
      terrainColor: palette.terrainColor,
      accentGlow: palette.glowColor,
      starDensity: size === 'endless-world' ? 65 : size === 'little-universe' ? 45 : 30,
      floatingEntities: baseSample.visualConfig.floatingEntities,
      canopyStyle: baseSample.visualConfig.canopyStyle,
    },
    createdAt: new Date().toISOString(),
    version: 1,
  };
}

// Dream World Synthesis Service - Real AI with resilient procedural engine
export async function generateDreamWorldService(
  params: GenerateWorldParams
): Promise<{ world: DreamWorld; isAiGenerated: boolean }> {
  try {
    const { generateAIDreamWorld } = await import('@/lib/aiService');
    const world = await generateAIDreamWorld(params);
    return { world, isAiGenerated: true };
  } catch (err) {
    console.warn('Real AI generation fallback to local procedural engine:', err);
    await new Promise(resolve => setTimeout(resolve, 800));
    const world = generateProceduralDreamWorld(params);
    return { world, isAiGenerated: false };
  }
}

// "Ask Pip" In-Character Dialogue Service
export async function askPipAssistantService(
  currentWorld: DreamWorld,
  question: string,
  _history: ChatMessage[]
): Promise<ChatMessage> {
  await new Promise(resolve => setTimeout(resolve, 500));

  const q = question.toLowerCase();
  let text = '';
  let suggestedFollowUps: string[] = [];

  if (q.includes('inhabitant') || q.includes('who lives') || q.includes('creature') || q.includes('friend')) {
    text = `In ${currentWorld.title}, you'll frequently meet ${currentWorld.inhabitants.join(', ')}! They take shifts greeting travelers and tucking little dreamers in with warm lavender compresses. Would you like to hear about their night watch duties?`;
    suggestedFollowUps = [
      'Tell me about the hidden secret',
      'Where is the coziest location to sleep?',
      'How does Pip travel here?',
    ];
  } else if (q.includes('secret') || q.includes('discovery') || q.includes('hidden') || q.includes('mystery')) {
    text = `*Pip adjusts his starry nightcap quietly*... Shh, if you look closely behind ${currentWorld.locations[1].name}, you will find: ${currentWorld.hiddenDiscovery}! It only reveals itself when your heartbeat slows down to rest.`;
    suggestedFollowUps = [
      'Expand the backstory',
      'Who made this world?',
      'Suggest a new dream location',
    ];
  } else if (q.includes('story') || q.includes('lore') || q.includes('history') || q.includes('background')) {
    text = `${currentWorld.worldStory} Every night at Midnight Nursery, I double-check the route markers so nobody ever gets lost on the return flight to morning.`;
    suggestedFollowUps = [
      'What lives here?',
      'Can we add a new location?',
      'What should I dream tonight?',
    ];
  } else if (q.includes('where') || q.includes('location') || q.includes('place') || q.includes('visit')) {
    const loc = currentWorld.locations[0];
    text = `I recommend starting at **${loc.name}**! ${loc.description}. I always pack a spare thermos of chamomile tea when visiting because ${loc.storySnippet}`;
    suggestedFollowUps = [
      'Tell me about the other locations',
      'What is the secret discovery?',
      'How do I save this world?',
    ];
  } else if (q.includes('idea') || q.includes('suggest') || q.includes('new') || q.includes('what should i')) {
    text = `How about we dream up an addition? Let’s imagine a cozy teacup observatory anchored to ${currentWorld.locations[2].name}, where the clouds taste like vanilla custard and the stars play lullaby chords whenever you yawn!`;
    suggestedFollowUps = [
      'Invent a new creature for me',
      'Tell me a bedtime story',
      'Who is Pip?',
    ];
  } else {
    text = `Pip here at Midnight Nursery Shift 3! In ${currentWorld.title}, the atmosphere is ${currentWorld.atmosphereAndLighting.toLowerCase()}. Everything here is calibrated for deep, peaceful rest. What part of this realm would you like to explore next?`;
    suggestedFollowUps = [
      'Who lives in this world?',
      'What is the hidden secret?',
      'Tell me the world origin story',
    ];
  }

  return {
    id: `msg-${Date.now()}`,
    sender: 'pip',
    text,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    suggestedFollowUps,
  };
}

// Local Storage Dream World Archive Management
const ARCHIVE_STORAGE_KEY = 'pip_world_atelier_archive_v1';

export function getSavedDreamWorlds(): DreamWorld[] {
  try {
    const raw = localStorage.getItem(ARCHIVE_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveDreamWorldToArchive(world: DreamWorld): DreamWorld[] {
  try {
    const existing = getSavedDreamWorlds();
    const filtered = existing.filter(w => w.id !== world.id);
    const updated = [world, ...filtered].slice(0, 20);
    localStorage.setItem(ARCHIVE_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [world];
  }
}

export function renameSavedDreamWorld(id: string, newTitle: string): DreamWorld[] {
  try {
    const existing = getSavedDreamWorlds();
    const updated = existing.map(w => (w.id === id ? { ...w, title: newTitle.trim() } : w));
    localStorage.setItem(ARCHIVE_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function deleteSavedDreamWorld(id: string): DreamWorld[] {
  try {
    const existing = getSavedDreamWorlds();
    const updated = existing.filter(w => w.id !== id);
    localStorage.setItem(ARCHIVE_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function exportDreamWorldAsJSON(world: DreamWorld): void {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(world, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `${world.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_dream_world.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}
