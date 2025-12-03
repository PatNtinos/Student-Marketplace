import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from './student/student.module';
import { GiftModule } from './gift/gift.module';
import { ClaimModule } from './claim/claim.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [  
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'passwd',
    database: 'student_marketplace',
    autoLoadEntities: true,
    synchronize: true,
  }),
    StudentModule,
    GiftModule,
    ClaimModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
