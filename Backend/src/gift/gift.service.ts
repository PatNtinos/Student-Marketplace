import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gift } from '../entities/gift.entity';
import { Student } from '../entities/student.entity';
import { Claim } from '../entities/claim.entity';

@Injectable()
export class GiftService {
  constructor(
    @InjectRepository(Gift)
    private giftRepository: Repository<Gift>,

    @InjectRepository(Student)
    private studentRepository: Repository<Student>,

    @InjectRepository(Claim)
    private claimRepository: Repository<Claim>,
  ) {}

  async findAll(filters: {
  title?: string;
  brand?: string;
  category?: string;
  sort?: string;
  skip?: number;
  take?: number;
}): Promise<Gift[]> {
  const { title, brand, category, sort, skip, take } = filters;

  const query = this.giftRepository.createQueryBuilder('gift');

  if (title) {
    query.andWhere('gift.title LIKE :title', { title: `%${title}%` });
  }

  if (brand) {
    query.andWhere('gift.brandName LIKE :brand', { brand: `%${brand}%` });
  }

  if (category) {
    query.andWhere('gift.category = :category', { category });
  }

  if (sort === 'new') {
    query.orderBy('gift.createdAt', 'DESC');  // newest first
  } else if (sort === 'ending') {
    query.orderBy('gift.quantity', 'ASC');    // running out
  }

  if (skip) query.skip(skip ?? 0);
  if (take) query.take(take ?? 10);

  return query.getMany();
}


  async findOne(id: number): Promise<Gift> {
    const gift = await this.giftRepository.findOneBy({ id });
    if (!gift) {                                                            // Check if gift exists
      throw new NotFoundException(`Gift with id ${id} not found`);
    }

    return gift;
  }

  async claimGift(giftId: number, studentId: number) {
  const gift = await this.giftRepository.findOne({
    where: { id: giftId },
  });

  if (!gift) throw new NotFoundException('Gift not found');
  if (gift.quantity <= 0) throw new BadRequestException('Gift is out of stock');

  const student = await this.studentRepository.findOne({
    where: { id: studentId },
  });

  if (!student) throw new NotFoundException('Student not found');

  // Check if already claimed
  const existingClaim = await this.claimRepository.findOne({
    where: {
      student: { id: studentId },
      gift: { id: giftId },
    },
    relations: ['student', 'gift'],
  });

  if (existingClaim) {
    throw new BadRequestException('You have already claimed this gift');
  }

  // Create claim
  const claim = this.claimRepository.create({
    student,
    gift,
  });

  gift.quantity -= 1;

  await this.claimRepository.save(claim);
  await this.giftRepository.save(gift);

  return { message: 'Gift claimed successfully' };
}


  create(data: Partial<Gift>): Promise<Gift> {
    const gift = this.giftRepository.create(data);
    return this.giftRepository.save(gift);
  }
}
