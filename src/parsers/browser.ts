// src/parsers/browser.ts
import { ClientInfo, MatchResult, BrowserPattern, BrowserEngine } from '../types';
import { BROWSERS } from '../regexes/browsers';
import { CLIENT_TYPES } from '../constants';

export class BrowserParser {
  private static readonly DEFAULT_BROWSER: ClientInfo = {
    type: CLIENT_TYPES.BROWSER,
    name: 'Unknown Browser',
    version: '',
    engine: '',
    engineVersion: ''
  };

  private static cleanVersion(version: string): string {
    return version
      .replace(/[_+]/g, '.')
      .replace(/\.+/g, '.')
      .replace(/^\.+|\.+$/g, '')
      .replace(/^\s+|\s+$/g, '');
  }

  private static matchUserAgent(userAgent: string, regex: string): MatchResult | null {
    try {
      const matches = userAgent.match(new RegExp(regex, 'i'));
      if (!matches) return null;
      return { regex, matches };
    } catch {
      return null;
    }
  }

  private static getEngineVersion(userAgent: string, engineName: string): string {
    const engineRegexMap: Record<string, RegExp> = {
      'Blink': /Blink\/([^\s]+)/i,
      'WebKit': /WebKit\/([^\s]+)/i,
      'Gecko': /Gecko\/([^\s]+)/i,
      'Trident': /Trident\/([^\s]+)/i,
      'Goanna': /Goanna\/([^\s]+)/i,
      'Presto': /Presto\/([^\s]+)/i,
    };

    const regex = engineRegexMap[engineName];
    if (!regex) return '';

    const match = userAgent.match(regex);
    return match ? this.cleanVersion(match[1]) : '';
  }

  private static formatVersion(version: string, matches: RegExpMatchArray): string {
    let formattedVersion = version;
    for (let i = 1; i <= 9; i++) {
      formattedVersion = formattedVersion.replace(`$${i}`, matches[i] || '');
    }
    return this.cleanVersion(formattedVersion);
  }

  private static determineEngine(browser: BrowserPattern, version: string): string {
    if (!browser.engine) return '';
    
    // String engine tanımı
    if (typeof browser.engine === 'string') {
      return browser.engine;
    }

    // Complex engine tanımı
    const engineDef = browser.engine as BrowserEngine;
    
    // Version'a göre engine kontrolü
    if (engineDef.versions && version) {
      const majorVersion = version.split('.')[0];
      const versionMapping = engineDef.versions[majorVersion];
      
      // Eğer bu version için özel bir engine tanımı varsa onu kullan
      if (versionMapping) {
        return versionMapping;
      }
    }

    // Default engine'e geri dön
    return engineDef.default;
  }

  private static findEngine(browser: BrowserPattern, version: string, userAgent: string): { name: string; version: string } {
    const engineName = this.determineEngine(browser, version);
    return {
      name: engineName,
      version: engineName ? this.getEngineVersion(userAgent, engineName) : ''
    };
  }

  public static parse(userAgent: string): ClientInfo {
    if (!userAgent) return this.DEFAULT_BROWSER;

    userAgent = userAgent.trim();

    for (const browser of BROWSERS) {
      const match = this.matchUserAgent(userAgent, browser.regex);
      if (!match) continue;

      // Version tespiti
      const version = browser.version 
        ? this.formatVersion(browser.version, match.matches)
        : '';

      // Engine tespiti
      const engine = this.findEngine(browser, version, userAgent);

      return {
        type: CLIENT_TYPES.BROWSER,
        name: browser.name,
        version: version,
        engine: engine.name,
        engineVersion: engine.version
      };
    }

    return this.DEFAULT_BROWSER;
  }

  public static isRealBrowser(userAgent: string): boolean {
    return this.parse(userAgent).name !== 'Unknown Browser';
  }
}