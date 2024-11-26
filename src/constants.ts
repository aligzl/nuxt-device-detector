// src/constants.ts
export const DEVICE_TYPES = {
  DESKTOP: 'desktop',
  SMARTPHONE: 'smartphone',
  TABLET: 'tablet',
  FEATURE_PHONE: 'feature phone',
  CONSOLE: 'console',
  TV: 'tv',
  CAR_BROWSER: 'car browser',
  SMART_DISPLAY: 'smart display',
  CAMERA: 'camera',
  PORTABLE_MEDIA_PLAYER: 'portable media player',
  PHABLET: 'phablet'
} as const;

export const CLIENT_TYPES = {
  BROWSER: 'browser',
  MOBILE_APP: 'mobile app',
  LIBRARY: 'library',
  MEDIA_PLAYER: 'media player',
  FEED_READER: 'feed reader',
  PIR: 'pim'
} as const;

export const OS_FAMILIES = {
  ANDROID: 'Android',
  IOS: 'iOS',
  WINDOWS: 'Windows',
  LINUX: 'Linux',
  MAC_OS: 'Mac OS',
  CHROME_OS: 'Chrome OS',
  FIREFOX_OS: 'Firefox OS',
} as const;

export const BROWSER_FAMILIES = {
  CHROME: 'Chrome',
  FIREFOX: 'Firefox',
  SAFARI: 'Safari',
  EDGE: 'Edge',
  IE: 'Internet Explorer',
  OPERA: 'Opera'
} as const;

export const BOT_CATEGORIES = {
  SEARCH_BOT: 'Search bot',
  SOCIAL_MEDIA_BOT: 'Social Media Agent',
  CRAWLER: 'Crawler',
  SECURITY_CHECKER: 'Security Checker'
} as const;