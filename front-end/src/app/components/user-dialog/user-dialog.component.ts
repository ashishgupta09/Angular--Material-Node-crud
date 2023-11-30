import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';
import { MatSelectModule } from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule,MatButtonModule, MatSelectModule],
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
})
export class UserDialogComponent {
  formBuilder = inject(FormBuilder);

  form: FormGroup;
  operation = 'add'

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: User,
    public dialogRef: MatDialogRef<UserDialogComponent>,
  ) {
  
    this.form = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', [Validators.required]],
    });
    if (data) {
      this.operation = 'edit'
      this.form.patchValue(data)
    }
  }

  onSaveUser(form: FormGroup): void {
    if (form.valid) {
      const user: User = { ...form.value };
      this.dialogRef.close({operation: this.operation, data: user}); 
    }
  }
}
