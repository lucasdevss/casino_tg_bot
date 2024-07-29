import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { I18nTranslations } from './generated/i18n.generated';

@Injectable()
export class I18nTranslateService {
  constructor(private readonly i18nService: I18nService<I18nTranslations>) {}

  async getMainMenuText(lang: string): Promise<string> {
    return await this.i18nService.t('common.main_menu', { lang });
  }

  async getHelpText(lang: string): Promise<string> {
    return await this.i18nService.t('common.help', { lang });
  }

  async getPlayButtonText(lang: string): Promise<string> {
    return await this.i18nService.t('common.buttons.play', { lang });
  }

  async getCommunityButtonText(lang: string): Promise<string> {
    return await this.i18nService.t('common.buttons.community', { lang });
  }
}
