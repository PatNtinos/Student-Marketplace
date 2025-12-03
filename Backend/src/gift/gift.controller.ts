import { Controller, Get, Post, Param, Body, Query, UseGuards, Request } from '@nestjs/common';
import { GiftService } from './gift.service';
import { Gift } from '../entities/gift.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Like } from 'typeorm';

@Controller('gifts')
export class GiftController {
  constructor(private readonly giftService: GiftService) {}

  @Get()
  findAll(
  @Query('title') title?: string,
  @Query('brand') brand?: string,
  @Query('category') category?: string,
  @Query('sort') sort?: string, // 'new' | 'ending'
  @Query('skip') skip = 0,
  @Query('take') take = 10,
) {
  return this.giftService.findAll({
    title,
    brand,
    category,
    sort,
    skip: Number(skip),
    take: Number(take),
  });
}

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Gift> {
    return this.giftService.findOne(id);
  }

  @Post()
  create(@Body() data: Partial<Gift>): Promise<Gift> {
    return this.giftService.create(data);
  }

  @Post(':id/claim')
  @UseGuards(JwtAuthGuard)
  async claimGift(@Param('id') id: number, @Request() req) {
  return this.giftService.claimGift(id, req.user.userId);
}
}
