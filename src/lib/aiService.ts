import { createParser } from 'eventsource-parser';
import type { DreamWorld, GenerateWorldParams, LocationMarker } from '@/types/dreamWorld';
import { DREAM_PALETTES, generateProceduralDreamWorld } from '@/services/dreamWorldService';

// Supabase endpoint for deployed Edge Function
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://nctvffwvqhgcadinnppb.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jdHZmZnd2cWhnY2FkaW5ucHBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIzMTEwMjEsImV4cCI6MjEwNzg4NzAyMX0.lV64TgOMZythkg7kVTjuBWVXwbcq0H5io2FlGKW-rJY';

export interface ChatContentMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

/**
 * Stream conversational completion from Gemini 2.5 Flash via our Edge Function.
 */
export async function streamAICall(
  contents: ChatContentMessage[],
  onChunk: (chunk: string) => void,
  signal?: AbortSignal
): Promise<string> {
  const endpoint = `${SUPABASE_URL}/functions/v1/large-language-model`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ contents }),
    signal: signal || AbortSignal.timeout(60_000),
  });

  if (!response.ok) {
    throw new Error(`Edge function returned ${response.status}`);
  }

  if (!response.body) {
    throw new Error('No response body from AI service');
  }

  let accumulated = '';
  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');

  const parser = createParser({
    onEvent(event) {
      if (event.data === '[DONE]') return;
      try {
        const parsed = JSON.parse(event.data);
        const text = parsed?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          accumulated += text;
          onChunk(text);
        }
      } catch {
        // Skip partial JSON frame
      }
    },
  });

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    parser.feed(decoder.decode(value, { stream: true }));
  }

  return accumulated;
}

/**
 * Real AI Dream World Generation via Gemini 2.5 Flash
 */
export async function generateAIDreamWorld(
  params: GenerateWorldParams
): Promise<DreamWorld> {
  const { prompt, worldType, mood, size, paletteId } = params;
  const palette = DREAM_PALETTES[paletteId] || DREAM_PALETTES['moon-milk'];

  const systemPrompt = `You are Pip's master Dreamcraft Engine at Midnight Nursery.
The user wants to generate a complete, magical, bedtime-safe dreamscape.
Parameters:
- User Seed / Prompt: "${prompt || 'A tranquil nocturnal realm of wonder'}"
- World Archetype: "${worldType}"
- Mood: "${mood}"
- Size: "${size}"
- Color Palette: "${palette.name}" (${palette.description})

Respond ONLY with a valid JSON object matching this exact schema, without markdown code fences:
{
  "title": "Evocative World Name (3-6 words)",
  "tagline": "Poetic one-sentence summary",
  "atmosphereAndLighting": "Sensory, peaceful description of light and ambiance",
  "description": "2-3 sentences about the realm's wonder and safety for sleep",
  "locations": [
    {
      "name": "Location 1 Name",
      "description": "Atmospheric description",
      "discovery": "A soothing hidden artifact or secret",
      "storySnippet": "A whimsical tale of Pip's encounter here",
      "x": 25,
      "y": 60,
      "iconType": "beacon"
    },
    {
      "name": "Location 2 Name",
      "description": "Atmospheric description",
      "discovery": "A soothing hidden artifact or secret",
      "storySnippet": "A whimsical tale of Pip's encounter here",
      "x": 55,
      "y": 35,
      "iconType": "observatory"
    },
    {
      "name": "Location 3 Name",
      "description": "Atmospheric description",
      "discovery": "A soothing hidden artifact or secret",
      "storySnippet": "A whimsical tale of Pip's encounter here",
      "x": 80,
      "y": 65,
      "iconType": "shrine"
    }
  ],
  "inhabitants": ["Creature 1", "Creature 2", "Creature 3", "Creature 4"],
  "hiddenDiscovery": "The central magical wonder of this dream world",
  "worldStory": "A comforting 3-4 sentence bedtime mythology of how this dream was formed."
}`;

  try {
    let fullResponse = '';
    await streamAICall(
      [
        {
          role: 'user',
          parts: [{ text: systemPrompt }],
        },
      ],
      (chunk) => {
        fullResponse += chunk;
      }
    );

    // Clean JSON response (strip ```json if present)
    const jsonStr = fullResponse
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/, '')
      .trim();

    const data = JSON.parse(jsonStr);

    const locations: [LocationMarker, LocationMarker, LocationMarker] = [
      {
        id: `loc-ai-1-${Date.now()}`,
        name: data.locations?.[0]?.name || 'Starlight Beacon',
        description: data.locations?.[0]?.description || 'A shimmering beacon of quiet peace.',
        discovery: data.locations?.[0]?.discovery || 'A golden star-compass.',
        storySnippet: data.locations?.[0]?.storySnippet || 'Pip mapped this point on his first night shift.',
        x: Number(data.locations?.[0]?.x) || 25,
        y: Number(data.locations?.[0]?.y) || 60,
        iconType: data.locations?.[0]?.iconType || 'beacon',
      },
      {
        id: `loc-ai-2-${Date.now()}`,
        name: data.locations?.[1]?.name || 'The Whispering Spire',
        description: data.locations?.[1]?.description || 'A celestial observatory catching bedtime wishes.',
        discovery: data.locations?.[1]?.discovery || 'A silver telescope tuned to dreams.',
        storySnippet: data.locations?.[1]?.storySnippet || 'Here Pip listens for distant yawns.',
        x: Number(data.locations?.[1]?.x) || 55,
        y: Number(data.locations?.[1]?.y) || 35,
        iconType: data.locations?.[1]?.iconType || 'observatory',
      },
      {
        id: `loc-ai-3-${Date.now()}`,
        name: data.locations?.[2]?.name || 'Lullaby Glade',
        description: data.locations?.[2]?.description || 'A mossy haven where gentle breezes hum.',
        discovery: data.locations?.[2]?.discovery || 'A glowing nightcap acorn.',
        storySnippet: data.locations?.[2]?.storySnippet || 'Little creatures gather here to rest safely.',
        x: Number(data.locations?.[2]?.x) || 80,
        y: Number(data.locations?.[2]?.y) || 65,
        iconType: data.locations?.[2]?.iconType || 'nest',
      },
    ];

    return {
      id: `world-ai-${Date.now()}`,
      title: data.title || `The Dream of ${prompt.slice(0, 24)}`,
      tagline: data.tagline || `${mood.toUpperCase()} • ${size.replace('-', ' ').toUpperCase()}`,
      prompt: prompt || 'Synthesized by AI Dream Engine',
      worldType,
      mood,
      size,
      paletteId,
      atmosphereAndLighting: data.atmosphereAndLighting || palette.description,
      description: data.description || 'An AI-crafted dream sanctuary certified 100% cozy with zero nightmares.',
      locations,
      inhabitants: Array.isArray(data.inhabitants) && data.inhabitants.length > 0
        ? data.inhabitants
        : ['Sleepy Moth Couriers', 'Velvet Dormice', 'Starlight Sprites'],
      hiddenDiscovery: data.hiddenDiscovery || 'An ancient music box cylinder playing the harmony of dawn.',
      worldStory: data.worldStory || 'Formed in the starry loom of Midnight Nursery to cradle restless sleepers into quiet peace.',
      visualConfig: {
        skyGradient: palette.skyGradient,
        terrainColor: palette.terrainColor,
        accentGlow: palette.glowColor,
        starDensity: size === 'endless-world' ? 65 : size === 'little-universe' ? 45 : 30,
        floatingEntities: ['Glowing firefly', 'Stardust spark', 'Lullaby note'],
        canopyStyle: worldType === 'cloud-city' ? 'clouds' : worldType === 'underwater-kingdom' ? 'coral' : worldType === 'dream-library' ? 'books' : worldType === 'cosmic-garden' ? 'nebula' : 'trees',
      },
      createdAt: new Date().toISOString(),
      version: 2,
    };
  } catch (error) {
    console.warn('Real AI generation fell back to resilient procedural synthesis:', error);
    // Graceful procedural synthesis fallback with zero user downtime
    return generateProceduralDreamWorld(params);
  }
}
