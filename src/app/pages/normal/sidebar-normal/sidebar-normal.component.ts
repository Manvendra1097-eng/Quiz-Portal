import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-sidebar-normal',
  templateUrl: './sidebar-normal.component.html',
  styleUrls: ['./sidebar-normal.component.css'],
})
export class SidebarNormalComponent implements OnInit {
  category: any;
  constructor(
    private _category: CategoryService,
    private _snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this._category.getAllCategory().subscribe({
      next: (data) => {
        this.category = data;
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
}
