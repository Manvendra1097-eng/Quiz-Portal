import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  category = {
    tittle: '',
    description: '',
  };
  show: boolean = false;
  constructor(
    private _category: CategoryService,
    private _snack: MatSnackBar
  ) {}

  ngOnInit(): void {}

  addCategory(form: NgForm) {
    if (this.category.tittle == '' || this.category.tittle == null) {
      this._snack.open('Title Required 😠', 'close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['red-snack'],
      });
      return;
    }

    if (this.category.description == '' || this.category.description == null) {
      this._snack.open('Description Required 😠', 'close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['red-snack'],
      });
      return;
    }

    this._category.addCategory(this.category).subscribe({
      next: (data) => {
        this.show = true;
        form.reset();
      },
      error: (error) => {
        this._snack.open('Something went wrong', 'close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
    });
  }

  showA() {
    this.show = false;
  }
}
