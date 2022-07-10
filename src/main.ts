import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

(async function bootstrap(): Promise<void> {
  const { APP_PORT } = process.env;

  const app = await NestFactory.create(AppModule);

  await app.listen(APP_PORT, () =>
    console.log('🚀 Server is running on port %s! 📡', APP_PORT),
  );
})();
