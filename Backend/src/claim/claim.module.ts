import { Module } from '@nestjs/common';
import { ClaimService } from './claim.service';
import { ClaimController } from './claim.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Claim } from 'src/entities/claim.entity';
import { Gift } from 'src/entities/gift.entity';
import { Student } from 'src/entities/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Claim, Gift, Student])],
  controllers: [ClaimController],
  providers: [ClaimService],
})
export class ClaimModule {}
