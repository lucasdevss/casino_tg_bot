import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';

@Injectable()
export class BotService implements OnApplicationBootstrap {
  private readonly logger = new Logger(this.constructor.name);

  constructor(@InjectBot() private bot: Telegraf<Context>) {}

  get botName(): string {
    return this.bot.botInfo.username;
  }

  async onApplicationBootstrap() {
    this.bot.telegram.getMe().then((r) => {
      this.logger.log(`Telegraf Bot started | @${r.username}`);
    });
  }
}
