export type WorldType =
  | 'moonlit-forest'
  | 'cloud-city'
  | 'underwater-kingdom'
  | 'dream-library'
  | 'cosmic-garden'
  | 'custom';

export type MoodType =
  | 'peaceful'
  | 'magical'
  | 'mysterious'
  | 'playful'
  | 'nostalgic'
  | 'cosmic';

export type WorldSize =
  | 'tiny-dream'
  | 'little-universe'
  | 'endless-world';

export type PaletteId =
  | 'moon-milk'
  | 'rose-nebula'
  | 'midnight-velvet'
  | 'peach-stardust';

export interface LocationMarker {
  id: string;
  name: string;
  description: string;
  discovery: string;
  storySnippet: string;
  x: number; // 0 to 100 percentage
  y: number; // 0 to 100 percentage
  iconType: 'beacon' | 'shrine' | 'nest' | 'observatory' | 'archive' | 'garden';
}

export interface DreamPaletteConfig {
  id: PaletteId;
  name: string;
  description: string;
  primaryColor: string;
  accentColor: string;
  skyGradient: [string, string, string];
  terrainColor: string;
  cardBg: string;
  glowColor: string;
}

export interface DreamWorld {
  id: string;
  title: string;
  tagline: string;
  prompt: string;
  worldType: WorldType;
  mood: MoodType;
  size: WorldSize;
  paletteId: PaletteId;
  atmosphereAndLighting: string;
  description: string;
  locations: [LocationMarker, LocationMarker, LocationMarker];
  inhabitants: string[];
  hiddenDiscovery: string;
  worldStory: string;
  visualConfig: {
    skyGradient: [string, string, string];
    terrainColor: string;
    accentGlow: string;
    starDensity: number;
    floatingEntities: string[];
    canopyStyle: 'trees' | 'clouds' | 'coral' | 'books' | 'nebula' | 'crystal';
  };
  createdAt: string;
  version: number;
}

export interface ChatMessage {
  id: string;
  sender: 'pip' | 'user';
  text: string;
  timestamp: string;
  suggestedFollowUps?: string[];
}

export interface GenerateWorldParams {
  prompt: string;
  worldType: WorldType;
  mood: MoodType;
  size: WorldSize;
  paletteId: PaletteId;
}
