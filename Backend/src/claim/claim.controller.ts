import { Controller, Post, Param, UseGuards, Req } from '@nestjs/common';
import { ClaimService } from './claim.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('claim')
export class ClaimController {
  constructor(private readonly claimService: ClaimService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':giftId')
  claim(@Param('giftId') giftId: number, @Req() req) {
    const studentId = req.user.sub;
    return this.claimService.claimGift(studentId, giftId);
  }
}
