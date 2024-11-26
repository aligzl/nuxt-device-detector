# Cloudflare Device Detector

Lightweight and fast device detector that works with Cloudflare Workers and Edge Runtime.

## Features

- 🚀 Works in Edge Runtime
- 💪 TypeScript support
- 🔍 Accurate device detection
- 🤖 Bot detection
- 🌐 Browser detection
- 📱 Device detection
- 💻 OS detection
- ⚡ Zero dependencies
- 🔒 Type safe

## Installation

### Standalone Version
```bash
npm install cloudflare-device-detector
```

### Nuxt Module
```bash
npm install nuxt-device-detector
```

## Usage

### Standalone
```typescript
import { DeviceDetector } from 'cloudflare-device-detector';

const detector = new DeviceDetector();
const result = detector.parse(userAgent);
```

### Nuxt Module
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['nuxt-device-detector']
})

// In your component
const { isMobile, browserName, osName } = useDevice();
```

## License
MIT