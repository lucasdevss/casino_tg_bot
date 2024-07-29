import { Module } from '@nestjs/common';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';
import * as path from 'path';
import { DEFAULT_LANGUAGE } from 'src/constants/language';
import { I18nTranslateService } from './i18n.service';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: DEFAULT_LANGUAGE,
      loaderOptions: {
        path: path.join(__dirname, '/locales'),
        watch: true,
      },
      resolvers: [
        {
          use: QueryResolver,
          options: ['lang'],
        },
        AcceptLanguageResolver,
      ],
      typesOutputPath: 'src/i18n/generated/i18n.generated.ts',
    }),
  ],
  providers: [I18nTranslateService],
  exports: [I18nTranslateService],
})
export class I18nTranslateModule {}
