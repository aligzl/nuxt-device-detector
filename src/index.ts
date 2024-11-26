// src/index.ts
import { DeviceDetectorResult } from './types';
import { BotParser } from './parsers/bot';
import { BrowserParser } from './parsers/browser';
import { DeviceParser } from './parsers/device';
import { OperatingSystemParser } from './parsers/operatingSystem';

export class DeviceDetector {
  private userAgent: string;
  private skipBotDetection: boolean;

  constructor(options: { skipBotDetection?: boolean } = {}) {
    this.userAgent = '';
    this.skipBotDetection = options.skipBotDetection || false;
  }

  public parse(userAgent: string): DeviceDetectorResult {
    this.userAgent = userAgent.trim();

    // Bot tespiti (eğer skipBotDetection false ise)
    if (!this.skipBotDetection) {
      const bot = BotParser.parse(this.userAgent);
      if (bot) {
        return {
          os: {
            name: '',
            short_name: '',
            version: '',
            platform: '',
            family: ''
          },
          client: {
            type: 'bot',
            name: bot.name,
            version: '',
            engine: '',
            engineVersion: ''
          },
          device: {
            type: 'bot',
            brand: '',
            model: '',
            isMobile: false,
            isTablet: false,
            isDesktop: false
          },
          bot: bot
        };
      }
    }

    // Normal cihaz tespiti
    const device = DeviceParser.parse(this.userAgent);
    const os = OperatingSystemParser.parse(this.userAgent);
    const client = BrowserParser.parse(this.userAgent);

    return {
      os,
      client,
      device,
      bot: null
    };
  }

  public parseOs(userAgent: string) {
    return OperatingSystemParser.parse(userAgent);
  }

  public parseClient(userAgent: string) {
    return BrowserParser.parse(userAgent);
  }

  public parseDevice(userAgent: string) {
    return DeviceParser.parse(userAgent);
  }

  public parseBot(userAgent: string) {
    return BotParser.parse(userAgent);
  }
}

// // Nuxt composable
// export const useDevice = () => {
//   const deviceInfo = ref<DeviceDetectorResult | null>(null);

//   onMounted(() => {
//     const detector = new DeviceDetector();
//     deviceInfo.value = detector.parse(navigator.userAgent);
//   });

//   return {
//     ...toRefs(deviceInfo),
//     isMobile: computed(() => deviceInfo.value?.device.isMobile ?? false),
//     isTablet: computed(() => deviceInfo.value?.device.isTablet ?? false),
//     isDesktop: computed(() => deviceInfo.value?.device.isDesktop ?? true),
//     isBot: computed(() => deviceInfo.value?.bot !== null),
//     deviceBrand: computed(() => deviceInfo.value?.device.brand ?? ''),
//     deviceModel: computed(() => deviceInfo.value?.device.model ?? ''),
//     osName: computed(() => deviceInfo.value?.os.name ?? ''),
//     osVersion: computed(() => deviceInfo.value?.os.version ?? ''),
//     browserName: computed(() => deviceInfo.value?.client.name ?? ''),
//     browserVersion: computed(() => deviceInfo.value?.client.version ?? ''),
//     deviceType: computed(() => deviceInfo.value?.device.type ?? 'desktop'),
//   };
// };

// Server tarafı için helper
export const getDeviceInfo = (userAgent): DeviceDetectorResult => {
  
  const detector = new DeviceDetector();
  return detector.parse(userAgent);
};

// // Nuxt API endpoint örneği
// export default defineEventHandler((event) => {
//   const headers = getRequestHeaders(event);
//   return getDeviceInfo(headers);
// });