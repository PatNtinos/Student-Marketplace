import { Body, Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Student } from '../entities/student.entity';
import { UseGuards,Get ,Post, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() studentData: Partial<Student>) {
    return this.authService.register(studentData);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
    }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return req.user; 
  }
}
