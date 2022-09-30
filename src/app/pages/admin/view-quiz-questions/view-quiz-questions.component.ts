import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css'],
})
export class ViewQuizQuestionsComponent implements OnInit {
  id = 0;
  title = '';

  questions = [
    {
      quesId: 0,
      answer: 'string',
      content: 'string',
      image: 'string',
      option1: 'string',
      option2: 'string',
      option3: 'string',
      option4: 'string',

      quiz: {
        active: true,
        category: {
          cId: 0,
          description: 'string',
          tittle: 'string',
        },
        description: 'string',
        id: 0,
        maxMarks: 'string',
        noOfQuestion: 'string',
        tittle: 'string',
      },
    },
  ];

  constructor(
    private _active: ActivatedRoute,
    private _question: QuestionsService,
    private _snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.id = this._active.snapshot.params['id'];
    this.title = this._active.snapshot.params['title'];
    this._question.getQuestionByQuiz(this.id).subscribe({
      next: (data: any) => {
        this.questions = data;
      },
      error: (error) => {
        this._snack.open('Somwthing Went Wrong', 'close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['red-snack'],
        });
      },
    });
  }

  delete(id: number) {
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
        this._question.deleteQuestionById(id).subscribe({
          next: (data) => {
            this.ngOnInit();
            this._snack.open('Question Deleted', 'close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              panelClass: ['green-snack'],
            });
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
    });
  }
}
