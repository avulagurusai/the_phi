# Requirements Document

## 1. Application Overview

- **Application Name**: Pip's Dream Atelier: The Interactive Midnight Nursery & Dream World Engine
- **Description**: An official interactive multi-page storybook, invention workshop, 3D character sanctuary, AI-powered dreamcraft engine, and administrator maintenance console for Pip, The Skull Baby (Junior Dream Engineer at the Midnight Nursery, haX.baby). The application features a portfolio showcase, rich tactile interactive tools (Lullaby synth, flashlight reveal mask, dream delivery routes, falling dream mini-game), animated flip-page lore, an interactive 3D WebGL sanctuary with dynamic glowing eye tracking, an AI Dream World Builder, a live persistent guestbook, and an Admin Maintenance Console with comprehensive repository source code backup and security probing tools.
- **Design & Color Palette System**: haX.baby signature palette comprising Cream (`#FFF8F1`), Berry (`#A34063`), Chocolate (`#5C4033`), Soft Blush (`#F4DCE4`), and Midnight (`#211B31`).

## 2. Target Users & Core Scenarios

- **Target Audience**: Digital storytellers, web art enthusiasts, hackathon visitors, and system administrators seeking interactive storybooks, procedural world-building, real-time AI dream consultations, and developer maintenance utilities.
- **Core Scenarios**:
  - Exploring Pip's nursery hero stage, launcher cards, and 3-Tier achievement matrix across mobile and desktop viewports.
  - Generating procedural dreamscapes via natural language prompts, inspecting waypoint lore, and exporting structured JSON world files.
  - Playing multi-tone melodies on the Web Audio Lullaby synthesizer and uncovering hidden dream layers using the flashlight cursor illumination mask.
  - Playing the Catch Falling Dreams mini-game and tracking dream delivery flight paths.
  - Flipping through illustrated narrative chapters in an interactive storybook using keyboard or touch gestures.
  - Interacting with a 3D WebGL character model of Pip featuring orbit controls, dynamic head tilting, glowing eye tracking, and nightcap physics.
  - Submitting persistent bedtime notes and reading community messages stored via backend persistence.
  - Initiating simulated voice and text consultations with the floating AI Dream Specialist.
  - Accessing the Admin Panel (`/admin` and `/admin/maintenance`) directly via route to inspect system authentication status, generate complete multi-directory application source code ZIP backups (including all project folders, binary public assets, configs, documentation, tasks, and backend schemas), and run live security probe diagnostics against backend endpoints.

## 3. Page Structure & Functional Specifications

### 3.1 Information Architecture & Routing Structure

```
Pip's Dream Atelier (Multi-Page Web Application)
├── Global Navigation & Mood System
│   ├── Route Navigation Links (Home, Atelier, Workshop, Storybook, Sanctuary, Guestbook)
│   ├── Mood Switcher (Day / Night / Dream-time)
│   ├── Global Audio Toggle & Sparkle Trail Toggle
│   └── Floating AI Dream Specialist Widget
├── 1. Home Page (`/`)
│   ├── Hero Interactive Character Stage
│   ├── 3-Tier Achievement Matrix Showcase
│   └── Feature Module Launchers
├── 2. World Atelier (`/atelier`)
│   ├── AI Dream World Builder Console
│   ├── Interactive SVG Dreamscape Canvas & Waypoint Atlas
│   ├── Ask Pip Contextual Chatbot
│   └── Dream Archive & JSON Export Vault
├── 3. Invention Workshop (`/workshop`)
│   ├── Lullaby Lab Web Audio Synthesizer
│   ├── Flashlight / Nightlight Dark-Layer Illumination Mask
│   ├── Dream Delivery Flight Route Dispatcher
│   └── Mini-Game: Catch Falling Dreams & Stardust Rattle
├── 4. Interactive Storybook (`/storybook`)
│   └── Page-Turn Flip Animated Storybook
├── 5. 3D Skull Baby Sanctuary (`/sanctuary`)
│   └── 3D WebGL Model with Real-Time Glowing Eye Tracking & Physics
├── 6. Live Guestbook (`/guestbook`)
│   ├── Returning Visitor Greeting Banner
│   ├── Bedtime Note Submission Form
│   ├── Live Public Message Board
│   └── Bedtime AI Companion Chat
├── 7. Admin Panel & Maintenance (`/admin`, `/admin/maintenance` - Direct Route Access)
│   ├── Admin Navigation & Breadcrumb Header
│   ├── Session & Security Overview Card (Role & Clearance Badge)
│   ├── Complete Multi-Directory Source Code Backup Downloader
│   └── Live Backend Security Probe Console
└── Secret Easter Egg Modal
    └── Dream Master Certificate & Starlight Effect
```

### 3.2 Global Header, Mood Theme & Persistent AI Call Widget

- **Global Navigation Bar**:
  - Persistent top navigation with active route indicators for public routes: Home (`/`), Atelier (`/atelier`), Workshop (`/workshop`), Storybook (`/storybook`), Sanctuary (`/sanctuary`), and Guestbook (`/guestbook`).
  - Admin navigation links are hidden from public navigation headers and mobile drawers to keep internal tools discrete from standard visitors.
  - Audio master mute toggle and sparkle particle trail toggle.
- **Mood Switcher**:
  - Toggles global themes (Day / Night / Dream-time) altering palettes, lighting, and avatar styling.
- **Floating AI Dream Specialist Widget**:
  - Persistent bottom-corner trigger on all routes with call duration timer, waveform visualizer, voice input, quick prompt chips, and speech synthesis output.

### 3.3 Home Page (`/`)

- **Hero Stage & Quick Launchers**:
  - **Interactive Character Stage**: 2D animated Pip avatar tracking cursor and touch movements.
  - **Feature Module Launchers**: Routing cards leading to primary sections without bulky orientation guide blocks.
  - **3-Tier Achievement Matrix**: Roadmap showcasing milestones across Tier 1 (Portfolio), Tier 2 (Standout Tools), and Tier 3 (3D WebGL, Live Backend & Admin System).

### 3.4 World Atelier (`/atelier`)

- **AI Dream World Builder Console**: Prompt inputs and parameters (World Type, Mood, Size, Palette) with structured generation output and procedural fallback.
- **Interactive SVG Canvas & Atlas**: Layered dreamscape map with animated flight paths and synchronized waypoint lore inspection.
- **Ask Pip Chat & Archive Vault**: Contextual chat and local storage archive supporting world load, rename, `.json` export, and deletion.

### 3.5 Invention Workshop (`/workshop`)

- **Lullaby Lab Synthesizer**: Web Audio multi-tone keyboard with selectable waveforms and preset melodies.
- **Flashlight Illumination Mask**: Dark-screen canvas where cursor/touch acts as a glowing lantern revealing hidden dream layers, with lantern color temperature selectors.
- **Dream Delivery Route Dispatcher**: Interactive animated delivery route map.
- **Mini-Game**: Catch Falling Dreams basket collection game with score tracking and stardust rattle effects.

### 3.6 Interactive Storybook (`/storybook`)

- **Flip-Page Storybook Interface**: Illustrated origin narrative with smooth page-turn flip animations supporting swipe, click, and arrow key navigation.

### 3.7 3D Skull Baby Sanctuary (`/sanctuary`)

- **Interactive 3D WebGL Character Model**:
  - Real-time 3D rendered Pip model with orbit controls and idle tassel physics.
  - Real-time cursor-following glowing skull pupils, emissive socket glow, dynamic dilation, and natural blinking.
  - Interactive animation triggers (Wave, Nod, Starlight Float, Sleep Mode).

### 3.8 Live Guestbook (`/guestbook`)

- **Visitor Greeting**: Local visitor memory displaying personalized returning welcome messages.
- **Persistent Message Board**: Submission form (nickname, message, stamp) and real-time public message feed stored in backend database.
- **Bedtime AI Chat**: In-page bedtime consultation dialogue.

### 3.9 Admin Panel & Maintenance (`/admin`, `/admin/maintenance`)

- **Admin Navigation & Breadcrumb Header**:
  - Accessible via direct URL routing for authorized users.
  - Breadcrumb navigation: Admin Panel / Settings / Developer Tools & Maintenance.
  - Admin Clearance indicator badge (`Admin Clearance` vs. `Restricted Access`).
- **Session & Security Overview**:
  - Displays active account email, assigned role, and permission grant status (`source_code.download`).
  - Non-admin warning notification explaining that admin credentials are required for protected operations.
- **Complete Multi-Directory Source Code Backup Downloader**:
  - Automated packaging of the complete application repository file tree including:
    - Application source tree: `src/` (components, pages, hooks, contexts, utils, services, types, styling assets).
    - Public directory with binary assets: `public/` (including binary media and image assets preserved via binary/base64 handling).
    - Documentation & specifications: `docs/` and root `README.md`.
    - Backend & serverless resources: `supabase/` and `edge-functions/` directories.
    - Tasks and planning directory: `tasks/` directory.
    - Root project configuration files: `package.json`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `tsconfig.check.json`, `vite.config.ts`, `vitest.config.ts`, `tailwind.config.js`, `postcss.config.js`, `index.html`, `biome.json`, `components.json`, `sgconfig.yml`, `pnpm-workspace.yaml`, `.gitignore`, and `.env.example`.
  - Full directory preservation maintaining all folder structures and nested subdirectories exactly as organized in the repository.
  - Sanitization rules strictly exclude all live secrets, `.env` / `.env.local` / `.env.production` files, private credentials, `node_modules`, and non-application skill directories (retaining `.env.example`).
  - Multi-state download action button reflecting explicit state transitions: Normal (`Download Source Code`), Preparing (`Preparing ZIP…`), Downloading (`Downloading…`), Success (`Source code backup downloaded.`), and Error (`Unable to create source-code backup.`).
  - Authenticated stream trigger passing session access token to `/api/admin/source-code/download` and initiating browser file download.
- **Live Backend Security Probe Console**:
  - Test probe triggering live HTTP request to `/api/admin/source-code/download`.
  - Displays server HTTP status code badge (200 OK, 401 Unauthorized, 403 Forbidden) and raw server response text.

### 3.10 Easter Egg

- **Dream Master Certificate Modal**: Triggered by clicking Pip's nightcap 5 consecutive times on any page.

## 4. Business Rules & Core Logic

1. **Public Navigation Isolation**: Public navigation components (header, drawer, and footer menus) must not render direct links to `/admin` or `/admin/maintenance`, while direct route access remains intact.
2. **Authentication & Session Tokens**: Global `AuthProvider` wraps the application, exposing `getAccessToken` for authenticated session token retrieval across admin utilities.
3. **Admin Permission Verification**: Admin access for source code downloading requires `role === 'admin'` or the presence of `source_code.download` in user permissions.
4. **Comprehensive Source Code Archive Packaging Lifecycle**:
   - Initiating download transitions button state to `preparing` and obtains session token.
   - Requests `/api/admin/source-code/download` with `Authorization: Bearer <token>`.
   - Packaging engine traverses and bundles every project directory (`src/`, `public/`, `docs/`, `supabase/`, `edge-functions/`, `tasks/`) and root configuration files (`package.json`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `tsconfig.check.json`, `vite.config.ts`, `vitest.config.ts`, `tailwind.config.js`, `postcss.config.js`, `index.html`, `README.md`, `biome.json`, `components.json`, `sgconfig.yml`, `pnpm-workspace.yaml`, `.gitignore`, `.env.example`) into a single ZIP archive.
   - Binary assets (e.g., images and audio files within `public/` and `src/`) are packaged with binary integrity preserved.
   - Packaging strictly filters out live `.env*` files, private credentials, `node_modules`, and non-application skill directories while preserving `.env.example`.
   - On HTTP 200, extracts filename from `Content-Disposition`, converts binary stream to blob, triggers browser download, and displays success state for 4 seconds.
   - On HTTP 401, 403, or failure, renders error state with descriptive toast notification before resetting.
5. **Security Probe Execution**: Test probe passes active token headers (if available) to verify backend route enforcement without initiating file saving.
6. **Multi-Page Route Synchronization**: Route transitions preserve active mood theme, global audio settings, and ongoing AI call state.
7. **3D Eye Tracking Coordinates**: Normalized cursor coordinates are constrained within spherical eye socket boundaries.
8. **Visitor Recognition Lifecycle**: First-time visitors receive a local token; returning visits display stored nicknames.
9. **Guestbook Validation**: Requires non-empty name and message (maximum 200 characters) before persistent backend storage.

## 5. Exceptions & Edge Cases

| Trigger Condition | Expected Behavior |
|---|---|
| Non-admin user attempts source code backup | Button disabled; if triggered, backend returns 403 and toast alerts administrator clearance required |
| Unauthenticated user accesses Maintenance Page | Session card indicates unauthenticated state; download prompts login requirement |
| Network error during source code download | Button shows `Unable to create source-code backup.` error state and resets after 4 seconds |
| Missing or corrupted binary asset during archive creation | Packaging engine skips corrupt binary stream or logs fallback without failing the entire ZIP generation process |
| AI generation service unavailable | Automatically falls back to procedural generator without breaking UI |
| WebGL unsupported by client browser | Displays 2D fallback interactive character illustration |
| Cursor moves outside viewport on Sanctuary | Pupils smoothly return to resting forward gaze |
| Backend database connection unavailable on Guestbook | Displays cached entries with offline notification banner |

## 6. Acceptance Criteria

1. Public navigation bar and mobile drawer render links only for public routes (`/`, `/atelier`, `/workshop`, `/storybook`, `/sanctuary`, `/guestbook`), omitting visible Admin links.
2. Direct URL navigation to `/admin` and `/admin/maintenance` resolves successfully to the Admin Maintenance Console.
3. `/admin` and `/admin/maintenance` render the System Tools & Maintenance interface including Breadcrumb, Security Status Card, Source Code Backup Card, and Security Probe Console without any mock role switching controls.
4. Source Code Backup button implements exact state transitions (`Download Source Code`, `Preparing ZIP…`, `Downloading…`, `Source code backup downloaded.`, `Unable to create source-code backup.`) and packages every project directory and file (`src/`, `public/`, `docs/`, `supabase/`, `edge-functions/`, `tasks/`, and root configs: `package.json`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `tsconfig.check.json`, `vite.config.ts`, `vitest.config.ts`, `tailwind.config.js`, `postcss.config.js`, `index.html`, `README.md`, `biome.json`, `components.json`, `sgconfig.yml`, `pnpm-workspace.yaml`, `.gitignore`, `.env.example`) with complete folder hierarchy intact when authorized.
5. Binary assets (such as images in `public/`) are packaged correctly into the ZIP without corruption.
6. Bundled source code ZIP strictly excludes all live `.env*` files, private keys, `node_modules`, and non-application skill directories while retaining `.env.example`.
7. Live Security Probe button sends an HTTP GET request to `/api/admin/source-code/download` and renders live status codes (200, 401, 403, 500) and response details.
8. AuthProvider supplies `getAccessToken` and manages active user role and permission states.
9. World Atelier, Invention Workshop, Storybook, 3D Sanctuary, and Live Guestbook maintain their full functional capabilities alongside Admin features.

## 7. Out of Scope for MVP

- Public user registration or open signup flows.
- In-browser source code editing or remote terminal execution.
- Multi-user collaborative dream editing canvas.
- Paid marketplace for custom 3D assets.