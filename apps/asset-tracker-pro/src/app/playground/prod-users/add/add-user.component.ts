import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { catchError, of } from 'rxjs';
import { emailValidator } from '../../validators/email.validator';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
})
export class AddUserComponent {
  private apiService = inject(ApiService);
  private router = inject(Router);
  addUserForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    email: new FormControl('', emailValidator()),
    born: new FormControl(''),
  });

  addNewUser(test: any) {
    this.addUserForm.markAllAsTouched();
    if (this.addUserForm.valid) {
      const newUser = test;

      this.apiService
        .addProdUser(
          newUser.name,
          this.addUserForm.get('surname')?.value,
          this.addUserForm.get('email')?.value,
          this.addUserForm.get('born')?.value
        )
        .pipe(
          catchError((error) => {
            console.error('Nie dodalismy errora');
            return of(false);
          })
        )
        .subscribe(() => this.router.navigate(['/']));
    }
  }
}
