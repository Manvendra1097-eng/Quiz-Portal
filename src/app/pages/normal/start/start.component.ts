import { DOCUMENT, LocationStrategy } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { QuestionsService } from 'src/app/services/questions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
})
export class StartComponent implements OnInit {
  quizId = 0;
  questions: any;
  isSubmit = false;

  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;

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
    this.priventBack();
    this.disableRightClick();
    this._login.loginStatus.next(true);
    this.quizId = this._active.snapshot.params['quizId'];
    this._question.getQuestionByQuizForTest(this.quizId).subscribe({
      next: (data) => {
        this.questions = data;
        this.timer = this.questions.length * 2 * 60; // second
        this.questions.forEach((element: any) => {
          element['givenAnswer'] = '';
        });
        this.startTimer();
      },
      error: (error) => {
        this._snack.open('Something went Wrong', 'close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['red-snack'],
        });
      },
    });
  }

  priventBack() {
    history.pushState(null, '', location.href);
    this._locationStrategy.onPopState(() => {
      history.pushState(null, '', location.href);
    });
  }
  // disabling right click
  disableRightClick() {
    this.document.addEventListener('contextmenu', (event) =>
      event.preventDefault()
    );
  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit the Quiz?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#673ab7',
      cancelButtonColor: '#d33',
      iconColor: '#673ab7',
      confirmButtonText: 'Yes,Submit Quiz',
    }).then((start) => {
      if (start.isConfirmed) {
        this.evaluateQuiz();
      }
    });
  }

  evaluateQuiz() {
    // calculation
    this.isSubmit = true;
    let marksSingle = this.questions[0].quiz.maxMarks / this.questions.length;
    this.questions.forEach((q: any) => {
      if (q.givenAnswer == q.answer) {
        this.correctAnswers++;
        this.attempted++;
        this.marksGot += marksSingle;
      } else if (q.givenAnswer.trim() == '') {
        this.attempted++;
      }
    });
  }

  startTimer() {
    let t = window.setInterval(() => {
      if (this.timer <= 0) {
        this.evaluateQuiz();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  getFormatedTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} min: ${ss} sec`;
  }
}
