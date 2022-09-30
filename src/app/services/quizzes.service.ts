import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class QuizzesService {
  constructor(private http: HttpClient) {}

  getAllQuizzes() {
    return this.http.get(`${baseUrl}/quiz/`);
  }

  addQuizz(quizz: any) {
    return this.http.post(`${baseUrl}/quiz/`, quizz);
  }

  deleteQuizz(id: number) {
    return this.http.delete(`${baseUrl}/quiz/${id}`);
  }

  getQuizById(qId: number) {
    return this.http.get(`${baseUrl}/quiz/${qId}`);
  }

  updateQuiz(quiz: any) {
    return this.http.put(`${baseUrl}/quiz/`, quiz);
  }

  getActiveQuizByCategory(catId: any) {
    return this.http.get(`${baseUrl}/quiz/category/active/${catId}`);
  }
}
