import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getAllCategory() {
    return this.http.get(`${baseUrl}/category/`);
  }

  // Add categories
  addCategory(category: { tittle: string; description: string }) {
    return this.http.post(`${baseUrl}/category/`, category);
  }
}
