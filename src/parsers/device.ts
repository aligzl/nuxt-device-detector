// src/parsers/device.ts
import { DeviceInfo, DeviceBrands, MatchResult } from '../types';
import { MOBILES } from '../regexes/mobiles';
import { DEVICE_TYPES } from '../constants';

export class DeviceParser {
  private static readonly DEFAULT_DEVICE: DeviceInfo = {
    type: DEVICE_TYPES.DESKTOP,
    brand: '',
    model: '',
    isMobile: false,
    isTablet: false,
    isDesktop: true
  };

  private static matchUserAgent(userAgent: string, regex: string): MatchResult | null {
    try {
      const matches = userAgent.match(new RegExp(regex, 'i'));
      if (!matches) return null;
      return { regex, matches };
    } catch {
      return null;
    }
  }

  private static formatModel(model: string, matches: RegExpMatchArray): string {
    let formattedModel = model;
    for (let i = 1; i <= 9; i++) {
      formattedModel = formattedModel.replace(`$${i}`, matches[i] || '');
    }
    return formattedModel.trim();
  }

  public static parse(userAgent: string): DeviceInfo {
    if (!userAgent) return this.DEFAULT_DEVICE;

    const mobileBrands = MOBILES as unknown as DeviceBrands;
    
    // Her marka için kontrol
    for (const [brandName, brandData] of Object.entries(mobileBrands)) {
      // Marka regex kontrolü
      const brandMatch = this.matchUserAgent(userAgent, brandData.regex);
      if (!brandMatch) continue;

      // Eğer direkt model tanımı varsa
      if (brandData.model) {
        return {
          type: brandData.device || DEVICE_TYPES.SMARTPHONE,
          brand: brandName,
          model: brandData.model,
          isMobile: brandData.device === DEVICE_TYPES.SMARTPHONE,
          isTablet: brandData.device === DEVICE_TYPES.TABLET,
          isDesktop: false
        };
      }

      // Model listesi varsa
      if (brandData.models) {
        for (const model of brandData.models) {
          const modelMatch = this.matchUserAgent(userAgent, model.regex);
          if (!modelMatch) continue;

          return {
            type: model.device || brandData.device || DEVICE_TYPES.SMARTPHONE,
            brand: brandName,
            model: this.formatModel(model.model, modelMatch.matches),
            isMobile: (model.device || brandData.device) === DEVICE_TYPES.SMARTPHONE,
            isTablet: (model.device || brandData.device) === DEVICE_TYPES.TABLET,
            isDesktop: false
          };
        }
      }
    }

    return this.DEFAULT_DEVICE;
  }

  public static isTablet(userAgent: string): boolean {
    return this.parse(userAgent).isTablet;
  }

  public static isMobile(userAgent: string): boolean {
    return this.parse(userAgent).isMobile;
  }

  public static isDesktop(userAgent: string): boolean {
    return this.parse(userAgent).isDesktop;
  }
}