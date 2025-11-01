# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Commander Cube Toolkit is a Next.js web application that helps Commander Cube designers analyze their cubes. It fetches cube data from Cube Cobra and card details from Scryfall, then analyzes commander options and color identities for draft configurations.

Live site: https://commander-cube-toolkit.vercel.app/

## Commands

### Development

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues automatically
npm run type-check   # Run TypeScript type checking without emitting files
```

## Architecture

### Application Flow

The app follows a multi-step wizard pattern implemented in `src/components/CubeListForm/CubeListForm.tsx`:

1. **Step 1: Cube List Input** - User provides a Cube Cobra ID
2. **Step 2: Fetch Card Data** - Fetches card details from Scryfall API
3. **Step 3: Draft Configuration** - Configure player count, packs per player, cards per pack, and custom rules
4. **Step 4: Type Analysis** - Analyzes commanders by type (legendary creatures, partners, planeswalkers, etc.)
5. **Step 5: Color Analysis** - Analyzes color identity distribution of commanders

State is persisted to localStorage to survive page refreshes.

### Key Components

- **CubeListForm** (`src/components/CubeListForm/CubeListForm.tsx`): Main orchestrator component managing the wizard flow
- **FetchCardDataStep** (`src/components/FetchCardDataStep/FetchCardDataStep.tsx`): Handles Scryfall data fetching
- **AnalysisStep** (`src/components/Analysis/TypeAnalysisStep.tsx`): Analyzes commander types
- **ColourAnalysisStep** (`src/components/Analysis/ColourAnalysisStep.tsx`): Analyzes color identity distribution
- **DraftConfigControlPanel** (`src/components/DraftConfigControlPanel/DraftConfigControlPanel.tsx`): Draft configuration UI

### Core Utilities

#### MTG Scripting Toolkit (`src/utils/mtg-scripting-toolkit/`)

An embedded toolkit (credit: ahmattox) for interacting with MTG APIs:

- **Scryfall integration** (`scryfall/`):

  - `fetchCollection()`: Fetches card data from Scryfall API
  - Type definitions for Scryfall card objects

- **Cube Cobra integration** (`cube-cobra/`):
  - `fetchCubeList(cubeID)`: Fetches card names from a Cube Cobra cube
  - `fetchCube(cubeID)`: Fetches full cube JSON with Scryfall IDs
  - `cubeIDFromLink(link)`: Extracts cube ID from Cube Cobra URL

#### Analysis Functions (`src/utils/analysis.ts`)

Search functions that filter cards by commander-relevant criteria:

- `searchLegendaryCreatures()`: Finds legendary creatures
- `searchPartners()`: Finds cards with Partner ability
- `searchPlaneswalkerCommanders()`: Finds planeswalkers that can be commanders
- `searchUniquePartnerPairings()`: Generates all unique Partner pairings
- `searchPartnerWithPairings()`: Finds "Partner with" pairs
- `searchUniqueFriendsForeverPairings()`: Finds Friends Forever pairs
- `searchDoctorCompanionPairings()`: Finds Doctor/Companion pairs
- `searchBackgroundPairings()`: Finds Background pairs

#### Custom Analysis (`src/utils/customAnalysis.ts`)

Implements custom rules like "all monocolored legendary creatures have Partner":

- `searchCustomPartnerRule()`: Generates pairings with custom partner rules
- `searchAllPartnerRule()`: Generates pairings if all legendaries had Partner

#### Color Identity (`src/utils/colours.ts`)

Functions for analyzing and displaying color identities:

- `queryColourIdentities()`: Gets color identities for card names
- `queryPairingColourIdentities()`: Merges color identities for pairings
- `analyseColourIdentities()`: Counts occurrences of each color identity
- `ciNicknameDictionary`: Maps color combinations to guild/shard names (e.g., "WU" → "Azorius")

#### Helpers (`src/utils/helpers.ts`)

- `getUniquePairs()`: Generates all unique pairings from an array
- `getPairs()`: Generates all pairings between two arrays
- `probabilityBothInSubset()`: Calculates probability of both Partner With cards appearing in a draft pool

### Data Flow

1. User enters Cube Cobra ID → `fetchCubeList()` retrieves card names
2. Card names → `fetchCollection()` retrieves full Scryfall card objects
3. Card data + draft config → Analysis functions filter and count commanders
4. Results → UI components display statistics, probabilities, and card lists

### TypeScript Configuration

- Path alias: `@/*` maps to `./src/*`
- Target: ES2019
- Strict mode enabled
- Module resolution: bundler (Next.js)

### Styling

Uses Material-UI (MUI) v6 with:

- Emotion for CSS-in-JS
- Theme with dark mode support
- Roboto font family
- MUI X Charts for data visualization

### External APIs

- **Cube Cobra API**: `https://cubecobra.com/cube/api/cubelist/{cubeID}` for card lists
- **Scryfall API**: For detailed card data including oracle text, type lines, keywords, color identity
