import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizzesService } from 'src/app/services/quizzes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css'],
})
export class InstructionsComponent implements OnInit {
  quizId: number = 0;
  quizz: any;
  constructor(
    private _active: ActivatedRoute,
    private _quiz: QuizzesService,
    private _route: Router
  ) {}

  ngOnInit(): void {
    this.quizId = this._active.snapshot.params['quizId'];
    this._quiz.getQuizById(this.quizId).subscribe({
      next: (data) => {
        this.quizz = data;
      },
    });
  }

  startQuiz() {
    Swal.fire({
      title: 'Are you sure, want to start the Quiz?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#673ab7',
      cancelButtonColor: '#d33',
      iconColor: '#673ab7',
      confirmButtonText: 'Ok,Start Quiz',
    }).then((start) => {
      if (start.isConfirmed) {
        this._route.navigate(['/start/' + this.quizz.id]);
      }
    });
  }
}
