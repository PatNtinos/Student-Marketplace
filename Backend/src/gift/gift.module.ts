import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../entities/student.entity';
import { Claim } from '../entities/claim.entity';
import { Gift } from '../entities/gift.entity';
import { GiftService } from './gift.service';
import { GiftController } from './gift.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Gift, Student, Claim])],
  controllers: [GiftController],
  providers: [GiftService],
})
export class GiftModule {}
