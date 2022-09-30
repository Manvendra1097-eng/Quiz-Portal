import { validateVerticalPosition } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-quiz-questions',
  templateUrl: './add-quiz-questions.component.html',
  styleUrls: ['./add-quiz-questions.component.css'],
})
export class AddQuizQuestionsComponent implements OnInit {
  public Editor = ClassicEditor;

  question = {
    answer: '',
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    quiz: {
      id: 0,
    },
  };

  constructor(
    private _active: ActivatedRoute,
    private _snack: MatSnackBar,
    private _question: QuestionsService
  ) {}

  ngOnInit(): void {
    this.question.quiz.id = this._active.snapshot.params['id'];
  }

  addQuestion(form: NgForm) {
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

    this._question.addQuestion(this.question).subscribe({
      next: (data) => {
        this._snack.open('Question Added', 'close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['green-snack'],
        });
        form.reset();
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
}
