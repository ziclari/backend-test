import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { TruckModule } from './truck/truck.module';
import { LocationModule } from './location/location.module';
import { OrderModule } from './order/order.module';
import databaseConfig from './config/database-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(databaseConfig().database.url, {
      dbName: databaseConfig().database.name,
    }),
    UserModule,
    AuthModule,
    TruckModule,
    LocationModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
