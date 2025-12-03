import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from '../entities/student.entity';
import * as bcrypt from 'bcrypt';
import { ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DeepPartial } from 'typeorm/browser/common/DeepPartial.js';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    private jwtService: JwtService,
  ) {}

  // Called by LocalStrategy
  async validateUser(username: string, password: string): Promise<any> {
    // Find student by username
    const student = await this.studentRepository.findOneBy({ username });
    if (!student) return null;

    // Compare password with hashed password
    if (!student.password) return null;
    const isPasswordValid = await bcrypt.compare(password, student.password);
    if (!isPasswordValid) return null;

    // Return user object without password
    const { password: _, ...result } = student;
    return result;
  }

  async register(studentData: Partial<Student>): Promise<any> {
  const { username, email, password } = studentData;
  if (!password) throw new ConflictException('Password is required');

  // Check if username or email already exists
  const existingStudent = await this.studentRepository.findOne({
    where: [{ username }, { email }],
  });
  if (existingStudent) {
    throw new ConflictException('Username or email already exists');
  }

  // Hash the password
  if (!password) throw new ConflictException('Password is required');
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create student
  const student = this.studentRepository.create({
  username,
  email,
  password: hashedPassword
} as DeepPartial<Student>);

  const savedStudent = await this.studentRepository.save(student);

  // Remove password from response
  const { password: _, ...result } = savedStudent;
  return result;
}

async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
