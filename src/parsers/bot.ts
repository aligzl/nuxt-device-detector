import { BotInfo, BotPattern, MatchResult } from '../types';
import { BOTS } from '../regexes/bots';
import { BOT_CATEGORIES } from '../constants';

export class BotParser {
  private static matchUserAgent(userAgent: string, regex: string): MatchResult | null {
    try {
      const matches = userAgent.match(new RegExp(regex, 'i'));
      if (!matches) return null;
      return { regex, matches };
    } catch {
      return null;
    }
  }

  public static parse(userAgent: string): BotInfo | null {
    for (const bot of BOTS) {
      const match = this.matchUserAgent(userAgent, bot.regex);
      if (!match) continue;

      return {
        name: bot.name || 'Unknown Bot',
        category: bot.category || BOT_CATEGORIES.CRAWLER,
        url: bot.url,
        producer: bot.producer ? {
          name: bot.producer.name || 'Unknown Producer',
          url: bot.producer.url
        } : undefined
      };
    }

    return null;
  }

  public static isBot(userAgent: string): boolean {
    return Boolean(this.parse(userAgent));
  }
}