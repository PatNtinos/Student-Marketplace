import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Gift {
  id: number;
  title: string;
  brandName: string;
  category: string;
  quantity: number;
  image: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class GiftService {

  private apiUrl = 'http://localhost:3000/gifts';

  constructor(private http: HttpClient) {}

  getGifts(filters: {
  title?: string;
  brand?: string;
  category?: string;
  sort?: string;
  skip?: number;
  take?: number;
} = {}): Observable<Gift[]> {
  let params = new HttpParams();
  Object.keys(filters).forEach(key => {
    const value = (filters as any)[key];
    if (value !== undefined && value !== null && value !== '') {
      params = params.set(key, String(value));
    }
  });

  return this.http.get<Gift[]>(this.apiUrl, { params });
}

  getGiftById(id: number): Observable<Gift> {
    return this.http.get<Gift>(`${this.apiUrl}/${id}`);
  }

  claimGift(id: number, token: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/${id}/claim`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
}
