import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  constructor(private http: HttpClient) {}

  // get question by quiz
  getQuestionByQuiz(id: number) {
    return this.http.get(`${baseUrl}/question/quiz/all/${id}`);
  }

  // get question by quiz for Test
  getQuestionByQuizForTest(id: number) {
    return this.http.get(`${baseUrl}/question/quiz/${id}`);
  }

  // Add Question
  addQuestion(question: any) {
    return this.http.post(`${baseUrl}/question/`, question);
  }

  // get question  by Id
  getQuestionById(id: number) {
    return this.http.get(`${baseUrl}/question/${id}`);
  }

  // Update Question
  updateQuestion(question: any) {
    return this.http.put(`${baseUrl}/question/`, question);
  }

  // delete question  by Id
  deleteQuestionById(id: number) {
    return this.http.delete(`${baseUrl}/question/${id}`);
  }
}
