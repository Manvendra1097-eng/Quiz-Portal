import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizzesService } from 'src/app/services/quizzes.service';

@Component({
  selector: 'app-add-quizzes',
  templateUrl: './add-quizzes.component.html',
  styleUrls: ['./add-quizzes.component.css'],
})
export class AddQuizzesComponent implements OnInit {
  color = 'primary';

  category: any = [];
  quizz = {
    active: true,
    cId: '',
    description: '',
    maxMarks: '',
    noOfQuestion: '',
    tittle: '',
  };
  constructor(
    private _category: CategoryService,
    private _quizz: QuizzesService,
    private _snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this._category.getAllCategory().subscribe({
      next: (data) => {
        this.category = data;
        console.log(this.category);
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

  addForm(form: NgForm) {
    if (this.quizz.tittle.trim() == '' || this.quizz.tittle == null) {
      this._snack.open('Title is Required', 'close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['red-snack'],
      });
      return;
    }

    if (this.quizz.cId == '' || this.quizz.cId == null) {
      this._snack.open('Category is Required', 'close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['red-snack'],
      });
      return;
    }

    this._quizz.addQuizz(this.quizz).subscribe({
      next: (data: any) => {
        this.quizz = data;
        form.reset();
        this._snack.open('Quiz Added Successfully', 'close', {
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
