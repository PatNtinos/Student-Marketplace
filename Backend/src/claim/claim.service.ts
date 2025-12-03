import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Claim } from 'src/entities/claim.entity';
import { Repository } from 'typeorm';
import { Gift } from 'src/entities/gift.entity';
import { Student } from 'src/entities/student.entity';

@Injectable()
export class ClaimService {
  constructor(
    @InjectRepository(Claim)
    private claimRepo: Repository<Claim>,

    @InjectRepository(Gift)
    private giftRepo: Repository<Gift>,

    @InjectRepository(Student)
    private studentRepo: Repository<Student>,
  ) {}

  async claimGift(studentId: number, giftId: number) {
    const student = await this.studentRepo.findOne({ where: { id: studentId } });
    const gift = await this.giftRepo.findOne({ where: { id: giftId } });

    if (!student) throw new BadRequestException('Student not found');
    if (!gift) throw new BadRequestException('Gift not found');

    if (gift.quantity <= 0) {
      throw new BadRequestException('Gift is out of stock');
    }

    // Check if already claimed
    const alreadyClaimed = await this.claimRepo.findOne({
      where: { student: { id: studentId }, gift: { id: giftId } },
    });

    if (alreadyClaimed) {
      throw new BadRequestException('You have already claimed this gift');
    }

    // Create claim
    const claim = this.claimRepo.create({
      student,
      gift,
    });

    // Decrease stock
    gift.quantity--;

    await this.giftRepo.save(gift);
    return this.claimRepo.save(claim);
  }
}
