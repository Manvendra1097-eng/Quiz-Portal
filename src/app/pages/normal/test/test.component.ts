import { LocationStrategy, DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  quizId = 0;
  questions: Array<any> = [];
  totalQuestions: number = 0;
  isSubmit = false;

  timer: any;

  constructor(
    private _locationStrategy: LocationStrategy,
    @Inject(DOCUMENT) private document: Document,
    private _active: ActivatedRoute,
    private _question: QuestionsService,
    private _snack: MatSnackBar,
    private _login: LoginService
  ) {}

  ngOnInit(): void {
    this._login.loginStatus.next(true);
    this.quizId = this._active.snapshot.params['quizId'];
  }
}
