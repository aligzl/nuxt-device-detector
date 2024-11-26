// src/runtime/composables/useDevice.ts
import { ref, computed } from 'vue';
import type { DeviceDetectorResult } from 'cloudflare-device-detector';

export const useDevice = () => {
  const deviceInfo = ref<DeviceDetectorResult | null>(null);

  // SSR için
  if (process.server) {
    const { req } = useRequestEvent();
    const userAgent = req.headers['user-agent'] || '';
    deviceInfo.value = $deviceDetector.parse(userAgent);
  }
  // Client için
  else {
    onMounted(() => {
      deviceInfo.value = $deviceDetector.parse(navigator.userAgent);
    });
  }

  return {
    ...toRefs(deviceInfo),
    isMobile: computed(() => deviceInfo.value?.device.isMobile ?? false),
    isTablet: computed(() => deviceInfo.value?.device.isTablet ?? false),
    isDesktop: computed(() => deviceInfo.value?.device.isDesktop ?? true),
    isBot: computed(() => deviceInfo.value?.bot !== null),
    deviceType: computed(() => deviceInfo.value?.device.type ?? 'desktop'),
    browserName: computed(() => deviceInfo.value?.client.name ?? 'unknown'),
    osName: computed(() => deviceInfo.value?.os.name ?? 'unknown')
  };
};