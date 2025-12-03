import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../entities/student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  findAll(): Promise<Student[]> {
    return this.studentRepository.find();
  }

 async findOne(id: number): Promise<Student> {                          
    const student = await this.studentRepository.findOneBy({ id });
    if (!student) {                                                   // Check if student exists
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return student;
  }

  create(studentData: Partial<Student>): Promise<Student> {
    const student = this.studentRepository.create(studentData);
    return this.studentRepository.save(student);
  }
}
