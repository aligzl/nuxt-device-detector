// src/module.ts
import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit';
import { fileURLToPath } from 'url';

export interface ModuleOptions {
  skipBotDetection?: boolean;
  cache?: boolean;
  versionTruncation?: 0 | 1 | 2 | 3;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-device-detector',
    configKey: 'deviceDetector',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  defaults: {
    skipBotDetection: false,
    cache: true,
    versionTruncation: 1
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

    // Plugin'i ekle
    addPlugin(resolver.resolve('./runtime/plugin'));

    // Composable'ı ekle
    nuxt.hook('components:dirs', (dirs) => {
      dirs.push({
        path: resolver.resolve('./runtime/composables'),
        prefix: 'device'
      });
    });

    // Server API'yi ekle
    nuxt.hook('nitro:config', (nitroConfig) => {
      nitroConfig.handlers = nitroConfig.handlers || [];
      nitroConfig.handlers.push({
        route: '/api/device-detect',
        handler: resolver.resolve('./runtime/server/api/device-detect')
      });
    });

    // Runtime config'e options'ları ekle
    nuxt.options.runtimeConfig.public.deviceDetector = options;
  }
});