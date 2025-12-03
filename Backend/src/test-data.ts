// src/test-data.ts
import { DataSource } from 'typeorm';
import { Student } from './entities/student.entity';
import { Gift } from './entities/gift.entity';
import * as bcrypt from 'bcrypt';

async function main() {
  const dataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'passwd', 
    database: 'student_marketplace', 
    entities: [Student, Gift],
    synchronize: true,
  });

  await dataSource.initialize();

  const studentRepo = dataSource.getRepository(Student);
  const giftRepo = dataSource.getRepository(Gift);

  const passwordHash = await bcrypt.hash('123456', 10);

  // Students
  const students = studentRepo.create([
    { username: 'ntinos3', email: 'ntinos3@example.com', password: passwordHash },
    { username: 'maria', email: 'maria@example.com', password: passwordHash },
    { username: 'alex', email: 'alex@example.com', password: passwordHash },
    { username: 'sophia', email: 'sophia@example.com', password: passwordHash },
  ]);
  await studentRepo.save(students);

  // Gifts
  const gifts = giftRepo.create([
    { 
      title: 'Public Coupon', brandName: 'Public', brandLogoUrl: 'https://example.com/public.png',
      imageUrl: 'https://example.com/public.jpg', category: 'Technology', quantity: 5,
      description: 'A public coupon for students', terms: 'Valid until 31/12',
      expiresAt: new Date('2025-12-31')
    },
    { 
      title: 'Movie Ticket', brandName: 'CinemaX', brandLogoUrl: 'https://example.com/cinemax.png',
      imageUrl: 'https://example.com/movie.jpg', category: 'Entertainment', quantity: 10,
      description: 'One free movie ticket', terms: 'Valid until 31/12',
      expiresAt: new Date('2025-12-31')
    },
    { 
      title: 'Free Lunch', brandName: 'Foodies', brandLogoUrl: 'https://example.com/foodies.png',
      imageUrl: 'https://example.com/lunch.jpg', category: 'Food', quantity: 7,
      description: 'Lunch for students', terms: 'Valid until 31/12',
      expiresAt: new Date('2025-12-31')
    },
    { 
      title: 'Gym Pass', brandName: 'FitClub', brandLogoUrl: 'https://example.com/fitclub.png',
      imageUrl: 'https://example.com/gym.jpg', category: 'Fitness', quantity: 3,
      description: 'One day free gym pass', terms: 'Valid until 31/12',
      expiresAt: new Date('2025-12-31')
    },
    { 
      title: 'Book Voucher', brandName: 'BookWorld', brandLogoUrl: 'https://example.com/bookworld.png',
      imageUrl: 'https://example.com/book.jpg', category: 'Education', quantity: 8,
      description: 'Voucher for books', terms: 'Valid until 31/12',
      expiresAt: new Date('2025-12-31')
    },
  ]);
  await giftRepo.save(gifts);

  console.log('Test data inserted!');
  await dataSource.destroy();
}

main();
