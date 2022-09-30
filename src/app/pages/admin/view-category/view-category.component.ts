import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css'],
})
export class ViewCategoryComponent implements OnInit {
  constructor(
    private _category: CategoryService,
    private _snack: MatSnackBar
  ) {}

  categories: any = [];

  ngOnInit(): void {
    this._category.getAllCategory().subscribe({
      next: (data) => {
        this.categories = data;
        console.log(this.categories);
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
}
