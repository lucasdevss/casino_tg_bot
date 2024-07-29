import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BotModule } from './bot/bot.module';
import { I18nTranslateModule } from './i18n/i18n.module';
import { HealthModule } from './shared/health';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BotModule,
    I18nTranslateModule,
    HealthModule,
  ],
})
export class AppModule {}
