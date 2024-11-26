import { OsInfo, MatchResult } from '../types';
import { OPERATING_SYSTEMS } from '../regexes/operatingSystems';

export class OperatingSystemParser {
  private static matchUserAgent(userAgent: string, regex: string): MatchResult | null {
    try {
      const matches = userAgent.match(new RegExp(regex, 'i'));
      if (!matches) return null;
      return { regex, matches };
    } catch {
      return null;
    }
  }

  private static formatVersion(version: string | Record<string, string>, matches: RegExpMatchArray): string {
    if (typeof version === 'string') {
      let formattedVersion = version;
      for (let i = 1; i <= 9; i++) {
        formattedVersion = formattedVersion.replace('$' + i, matches[i] || '');
      }
      return formattedVersion.replace(/_/g, '.');
    }

    const matchedVersion = matches[1];
    return version[matchedVersion] || matchedVersion;
  }

  public static parse(userAgent: string): OsInfo {
    const defaultOs: OsInfo = {
      name: 'unknown',
      short_name: 'unknown',
      version: '',
      platform: '',
      family: ''
    };

    for (const os of OPERATING_SYSTEMS) {
      const match = this.matchUserAgent(userAgent, os.regex);
      if (!match) continue;

      return {
        name: os.name,
        short_name: os.name.toLowerCase(),
        version: os.version ? this.formatVersion(os.version, match.matches) : '',
        platform: os.name.toLowerCase(),
        family: os.name
      };
    }

    return defaultOs;
  }
}