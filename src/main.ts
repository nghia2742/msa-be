import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: 'localhost:5000',
      package: 'product_service',
      protoPath: join(__dirname, './product.proto'),
    },
  });
  await app.listen();
  console.log(`
    🚀MSA Backend is running on port: 5000
    `)
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
