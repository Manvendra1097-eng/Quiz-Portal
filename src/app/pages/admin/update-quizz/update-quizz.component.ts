import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizzesService } from 'src/app/services/quizzes.service';

@Component({
  selector: 'app-update-quizz',
  templateUrl: './update-quizz.component.html',
  styleUrls: ['./update-quizz.component.css'],
})
export class UpdateQuizzComponent implements OnInit {
  id: number = 0;
  color = 'primary';

  category: any = [];
  quizz = {
    active: true,
    category: {
      cId: '',
    },
    description: '',
    maxMarks: '',
    noOfQuestion: '',
    tittle: '',
  };

  constructor(
    private _quiz: QuizzesService,
    private _active: ActivatedRoute,
    private _snack: MatSnackBar,
    private _category: CategoryService,
    private _route: Router
  ) {}

  ngOnInit(): void {
    this.id = this._active.snapshot.params['id'];

    this._category.getAllCategory().subscribe({
      next: (data) => {
        this.category = data;
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

    this._quiz.getQuizById(this.id).subscribe({
      next: (data: any) => {
        this.quizz = data;
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

  update(form: NgForm) {
    if (this.quizz.tittle.trim() == '' || this.quizz.tittle == null) {
      this._snack.open('Title is Required', 'close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['red-snack'],
      });
      return;
    }

    if (this.quizz.category.cId == '' || this.quizz.category.cId == null) {
      this._snack.open('Category is Required', 'close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['red-snack'],
      });
      return;
    }

    this._quiz.updateQuiz(this.quizz).subscribe({
      next: (data: any) => {
        this.quizz = data;
        this._route.navigate(['admin/quizz']);
        this._snack.open('Quiz Updated Successfully', 'close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['green-snack'],
        });
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
}
