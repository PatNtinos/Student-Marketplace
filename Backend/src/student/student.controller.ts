import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from '../entities/student.entity';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  getAll(): Promise<Student[]> {
    return this.studentService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number): Promise<Student> {
    return this.studentService.findOne(id);
  }

  @Post()
  create(@Body() studentData: Partial<Student>): Promise<Student> {
    return this.studentService.create(studentData);
  }
}
