import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BaseResponse } from 'src/app/models/base-response.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  users:any;
  constructor(private http: UserService) {
  }

  userService = inject(UserService);
  dialog = inject(MatDialog);
  displayedColumns = ['position', 'firstname', 'lastname', 'username', 'email', 'gender', 'action'];
  users$: Observable<User[]> = this.userService.getAllUsers().pipe(map((response: BaseResponse) => <User[]>response.data));
 
  deleteUser(id: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      width:'300px',height:'150px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.userService.deleteUser(id).subscribe(
          (response) => {
            if (response.success) {
              this.users$ = this.userService.getAllUsers().pipe(map((response: BaseResponse) => <User[]>response.data))
            } else {
              console.error(`User deletion failed: ${response.message}`);
            }
          },
          (error) => {
            console.error(`Error deleting user: ${error.message}`);
          }
        );
      }
    });
  }

  openDialog(element: User | null) {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '40%',
      height: '85%',
      data: element
    });

    dialogRef.afterClosed().subscribe((result: {operation: string, data: User}) => {
      if (result.operation === 'add') {
        this.userService.createUser(result.data).subscribe((response) => {
          if (response.success) {
            this.users$ = this.userService.getAllUsers().pipe(map((response: BaseResponse) => <User[]>response.data))
          } else {
            console.error(`User addition failed: ${response.message}`);
          }
        });
      } else {
        this.userService.updateUser(element!.id, result.data).subscribe((response) => {
          if (response.success) {
            this.users$ = this.userService.getAllUsers().pipe(map((response: BaseResponse) => <User[]>response.data))
          } else {
            console.error(`User addition failed: ${response.message}`);
          }
        });

      }
    });
  }
}
