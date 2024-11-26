// src/types/index.ts
// Genel tipler
export interface MatchResult {
  regex: string;
  matches: RegExpMatchArray;
}

// Browser ile ilgili tipler
export interface EngineVersions {
  [key: string]: string | undefined;
}

export interface BrowserEngine {
  default: string;
  versions?: EngineVersions;
}

export interface BrowserPattern {
  regex: string;
  name: string;
  version?: string;
  engine?: string | BrowserEngine;
}

export interface ClientInfo {
  type: string;
  name: string;
  version: string;
  engine: string;
  engineVersion: string;
}

// OS ile ilgili tipler
export interface OsVersion {
  [key: string]: string;
}

export interface OsPattern {
  regex: string;
  name: string;
  version?: string | OsVersion;
}

export interface OsInfo {
  name: string;
  short_name: string;
  version: string;
  platform: string;
  family: string;
}

// Device ile ilgili tipler
export interface DeviceModel {
  regex: string;
  model: string;
  device?: string;
}

export interface DeviceData {
  regex: string;
  device: string;
  model?: string;
  models?: DeviceModel[];
}

export interface DeviceBrands {
  [key: string]: DeviceData;
}

export interface DeviceInfo {
  type: string;
  brand: string;
  model: string;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

// Bot ile ilgili tipler
export interface BotProducer {
  name: string;
  url?: string;
}

export interface BotInfo {
  name: string;
  category: string;
  url?: string;
  producer?: BotProducer;
}

export interface BotPattern {
  regex: string;
  name: string;
  category: string;
  url?: string;
  producer?: BotProducer;
}

// Vendor ile ilgili tipler
export interface VendorFragment {
  name: string;
  regex: string;
}

// Version Helper
export interface VersionMatch {
  major: string;
  minor: string;
  patch: string;
  build: string;
}

// Parser Interface
export interface Parser<T> {
  parse(userAgent: string): T;
}

// Final Result
export interface DeviceDetectorResult {
  os: OsInfo;
  client: ClientInfo;
  device: DeviceInfo;
  bot: BotInfo | null;
}

// Constants Types
export interface DeviceTypes {
  DESKTOP: 'desktop';
  SMARTPHONE: 'smartphone';
  TABLET: 'tablet';
  FEATURE_PHONE: 'feature phone';
  CONSOLE: 'console';
  TV: 'tv';
  CAR_BROWSER: 'car browser';
  SMART_DISPLAY: 'smart display';
  CAMERA: 'camera';
  PORTABLE_MEDIA_PLAYER: 'portable media player';
  PHABLET: 'phablet';
}

export interface ClientTypes {
  BROWSER: 'browser';
  MOBILE_APP: 'mobile app';
  LIBRARY: 'library';
  MEDIA_PLAYER: 'media player';
  FEED_READER: 'feed reader';
  PIR: 'pim';
}

export interface BotCategories {
  SEARCH_BOT: 'Search bot';
  SOCIAL_MEDIA_BOT: 'Social Media Agent';
  CRAWLER: 'Crawler';
  SECURITY_CHECKER: 'Security Checker';
}

// Browser Groups/Families
export interface BrowserFamilies {
  CHROME: 'Chrome';
  FIREFOX: 'Firefox';
  SAFARI: 'Safari';
  EDGE: 'Edge';
  IE: 'Internet Explorer';
  OPERA: 'Opera';
}

// OS Families
export interface OsFamilies {
  ANDROID: 'Android';
  IOS: 'iOS';
  WINDOWS: 'Windows';
  LINUX: 'Linux';
  MAC_OS: 'Mac OS';
  CHROME_OS: 'Chrome OS';
  FIREFOX_OS: 'Firefox OS';
}

// Device Models Types
export type ModelType = {
  regex: string;
  model: string;
  device?: string;
  brand?: string;
}

// Cache Types (opsiyonel)
export interface CacheItem<T> {
  value: T;
  expires: number;
}

export interface CacheOptions {
  ttl: number;
  maxSize?: number;
}

// Configuration Types
export interface DeviceDetectorOptions {
  skipBotDetection?: boolean;
  cache?: boolean;
  cacheOptions?: CacheOptions;
  versionTruncation?: 0 | 1 | 2 | 3;
}

// Helper Types
export type Brand<K, T> = K & { __brand: T };
export type UserAgent = Brand<string, 'UserAgent'>;
export type Version = Brand<string, 'Version'>;

// Utils
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Modify<T, R> = Omit<T, keyof R> & R;