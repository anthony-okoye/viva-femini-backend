import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';

let cachedApp: any = null;

async function bootstrap() {
  // Return cached app if it exists (for serverless warm starts)
  if (cachedApp) {
    return cachedApp;
  }

  const app = await NestFactory.create(AppModule);

  const frontendUrls = process.env.FRONTEND_URL 
    ? process.env.FRONTEND_URL.split(',').map(url => url.trim())
    : ['http://localhost:3000', 'https://viva-femini-frontend.vercel.app'];

  console.log('CORS enabled for origins:', frontendUrls);

  app.enableCors({
    origin: frontendUrls,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Accept',
      'X-Requested-With',
      'X-CSRF-Token',
      'Accept-Version',
      'Content-Length',
      'Content-MD5',
      'Date',
      'X-Api-Version',
    ],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  // Increase payload size limit for base64 images (10MB)
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));

  await app.init();

  cachedApp = app;
  return app;
}

// For local development
if (require.main === module) {
  bootstrap().then(app => {
    app.listen(process.env.PORT ?? 3050);
  });
}

// Export for Vercel serverless
export default bootstrap();
