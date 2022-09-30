import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-update-quiz-question',
  templateUrl: './update-quiz-question.component.html',
  styleUrls: ['./update-quiz-question.component.css'],
})
export class UpdateQuizQuestionComponent implements OnInit {
  question = {
    quesId: 0,
    answer: '',
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    quiz: {
      id: 0,
      tittle: '',
    },
  };

  constructor(
    private _active: ActivatedRoute,
    private _question: QuestionsService,
    private _snack: MatSnackBar,
    private _route: Router
  ) {}

  ngOnInit(): void {
    this.question.quesId = this._active.snapshot.params['id'];
    this._question.getQuestionById(this.question.quesId).subscribe({
      next: (data: any) => {
        this.question = data;
      },
      error: (error) => {
        this._snack.open('Something Went Wrong', 'close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['red-snack'],
        });
      },
    });
  }

  updateQuestion(form: NgForm) {
    // ===================validate

    if (this.question.content == '' || this.question.content == null) {
      this._snack.open('Question Content Required 😠', 'close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['red-snack'],
      });
      return;
    }

    if (this.question.option1 == '' || this.question.option1 == null) {
      this._snack.open('Option1 Required 😠', 'close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['red-snack'],
      });
      return;
    }

    if (this.question.option2 == '' || this.question.option2 == null) {
      this._snack.open('Option2 Required 😠', 'close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['red-snack'],
      });
      return;
    }

    if (this.question.option3 == '' || this.question.option3 == null) {
      this._snack.open('Option3 Required 😠', 'close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['red-snack'],
      });
      return;
    }

    if (this.question.option4 == '' || this.question.option4 == null) {
      this._snack.open('Option4 Required 😠', 'close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['red-snack'],
      });
      return;
    }

    if (this.question.answer == '' || this.question.answer == null) {
      this._snack.open('Answer Required 😠', 'close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['red-snack'],
      });
      return;
    }

    //validate end ==========================

    this._question.updateQuestion(this.question).subscribe({
      next: (data) => {
        this._snack.open('Question Updated', 'close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['green-snack'],
        });
        this._route.navigate([
          '/admin/questions/' +
            this.question.quiz.id +
            '/' +
            this.question.quiz.tittle,
        ]);
      },
      error: (error) => {
        this._snack.open('Something Went Wrong', 'close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['red-snack'],
        });
      },
    });
  }
}
