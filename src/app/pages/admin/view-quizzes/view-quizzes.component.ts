import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { QuizzesService } from 'src/app/services/quizzes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css'],
})
export class ViewQuizzesComponent implements OnInit {
  quizzes: any = {
    content: [],
  };

  constructor(private _quizzes: QuizzesService, private _snack: MatSnackBar) {}

  ngOnInit(): void {
    this._quizzes.getAllQuizzes().subscribe({
      next: (data) => {
        this.quizzes = data;
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

  deleteQuiz(id: number) {
    // confirm
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#673ab7',
      cancelButtonColor: '#d33',
      iconColor: '#673ab7',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // delete
        this._quizzes.deleteQuizz(id).subscribe({
          next: (data) => {
            this.ngOnInit();
            this._snack.open('Quiz Deleted', 'close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: ['green-snack'],
            });
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
    });
  }
}
