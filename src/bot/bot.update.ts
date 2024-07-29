import { ConfigService } from '@nestjs/config';
import { Ctx, Help, On, Start, Update } from 'nestjs-telegraf';
import { DEFAULT_LANGUAGE } from 'src/constants/language';
import { Context, Markup } from 'telegraf';
import { I18nTranslateService } from '../i18n/i18n.service';
import { Logger } from '@nestjs/common';

@Update()
export class BotUpdate {
  private readonly logger: Logger = new Logger(BotUpdate.name);
  constructor(
    private readonly config: ConfigService,
    private readonly i18nService: I18nTranslateService,
  ) {}

  @Start()
  async onStart(@Ctx() ctx: Context) {
    const user = ctx.from;
    if (user.is_bot) {
      // TODO: block chat\bot
      this.logger.warn('User cannot be bot');
      throw new Error();
    }
    await this.sendStart(ctx);
  }

  @Help()
  async onHelp(@Ctx() ctx: Context) {
    await this.sendHelp(ctx);
  }

  @On('text')
  async onText(@Ctx() ctx: Context) {
    await this.sendStart(ctx);
  }

  async sendStart(ctx: Context) {
    const webAppUrl = this.config.get<string>('TELEGRAM_WEB_APP_URL');
    const communityUrl = this.config.get<string>('TELEGRAM_COMMUNITY_URL');
    const lang = DEFAULT_LANGUAGE;

    const [message, playButtonText, communityButtonText] = await Promise.all([
      this.i18nService.getMainMenuText(lang),
      this.i18nService.getPlayButtonText(lang),
      this.i18nService.getCommunityButtonText(lang),
    ]);

    return ctx.replyWithPhoto(
      { source: './assets/images/logo.png' },
      {
        caption: message,
        ...Markup.inlineKeyboard(
          [
            Markup.button.webApp(playButtonText, webAppUrl),
            Markup.button.url(communityButtonText, communityUrl),
          ],
          { columns: 1 },
        ),
      },
    );
  }

  async sendHelp(ctx: Context) {
    const lang = ctx.from.language_code || DEFAULT_LANGUAGE;

    const message = await this.i18nService.getHelpText(lang);

    return ctx.reply(message);
  }
}
