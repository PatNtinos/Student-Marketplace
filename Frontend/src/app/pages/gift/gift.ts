import { Component, OnInit } from '@angular/core';
import { GiftService, Gift } from '../../pages/gift/gift.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { AuthService, User } from '../../auth/auth.service';
import { MatGridListModule } from '@angular/material/grid-list';



type CategoryKey = 'food' | 'education' | 'technology' | 'games';

@Component({
  selector: 'app-gifts',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule, 
    MatGridListModule
  ],
  templateUrl: './gift.html',
  styleUrls: ['./gift.css'],
})
export class GiftComponent implements OnInit {

  gifts: Gift[] = [];
  filteredGifts: Gift[] = [];
  currentUser: User | null = null;

  searchText: string = '';   

  filter = {
    food: false,
    education: false,
    technology: false,
    games: false
  };
  

  constructor(private giftService: GiftService, private authService: AuthService) {}

  ngOnInit() {
    this.loadGifts();
    this.loadUser();
  }

  loadGifts() {
    this.giftService.getGifts().subscribe({
      next: (data) => {
        this.gifts = data;
        this.filteredGifts = data;  
      },
      error: (err) => console.error(err)
    });
  }


  applyFilters() {
    this.filteredGifts = this.gifts.filter(gift => {


      const anyFilterActive =
        this.filter.food ||
        this.filter.education ||
        this.filter.technology ||
        this.filter.games;

        const categoryKey = gift.category.toLowerCase() as CategoryKey;

      const categoryCheck =
        !anyFilterActive ||
         this.filter[categoryKey] === true;


      const searchCheck =
        !this.searchText ||
        gift.title.toLowerCase().includes(this.searchText.toLowerCase());

      return categoryCheck && searchCheck;
    });
  }


  getSelectedCategories(): string {
    const selected: string[] = [];
    if (this.filter.food) selected.push('Food');
    if (this.filter.education) selected.push('Education');
    if (this.filter.technology) selected.push('Technology');
    if (this.filter.games) selected.push('Games');
    return selected.join(',');
  }


  loadUser() {
    this.authService.getCurrentUser().subscribe({
      next: (user) => (this.currentUser = user),
      error: (err) => console.error('Could not load user', err),
    });
  }

  claimGift(gift: Gift) {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('You must be logged in to claim a gift.');
    return;
  }

  this.giftService.claimGift(gift.id, token).subscribe({
    next: (res) => {
      alert(res.message); 
      gift.quantity -= 1; 
    },
    error: (err) => {
      console.error(err);
      alert(err.error?.message || 'Could not claim the gift.');
    }
  });
}

}
