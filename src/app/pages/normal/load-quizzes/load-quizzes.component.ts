import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuizzesService } from 'src/app/services/quizzes.service';

@Component({
  selector: 'app-load-quizzes',
  templateUrl: './load-quizzes.component.html',
  styleUrls: ['./load-quizzes.component.css'],
})
export class LoadQuizzesComponent implements OnInit {
  catId = 0;
  quizzes: any;
  quizzesC: any;

  constructor(
    private _quiz: QuizzesService,
    private _snack: MatSnackBar,
    private _active: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._active.params.subscribe((params: any) => {
      this.catId = params.catId;
      if (this.catId == 0) {
        // load all the Quizz
        this._quiz.getAllQuizzes().subscribe({
          next: (quiz: any) => {
            this.quizzes = quiz;
          },
          error: (error) => {
            this._snack.open('Something went wrong', 'close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: ['red-snack'],
            });
          },
        });
      } else {
        // load quiz by categoryId
        this._quiz.getActiveQuizByCategory(this.catId).subscribe({
          next: (quiz: any) => {
            this.quizzesC = quiz;
          },
          error: (error) => {
            this._snack.open('Something went wrong', 'close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: ['red-snack'],
            });
          },
        });
      }
    });
  }
}
