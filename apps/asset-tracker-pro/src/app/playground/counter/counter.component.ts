import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { calculateSum, selectCounter } from '../userStore';
import { AsyncPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss',
})
export class CounterComponent {
  userStore = inject(Store);

  counter = this.userStore.select(selectCounter);

  form = new FormGroup({
    first: new FormControl(0),
    second: new FormControl(0),
  });

  calculate() {
    this.userStore.dispatch(
      calculateSum({
        a: Number(this.form.get('first')?.value),
        b: Number(this.form.get('second')?.value),
      })
    );
  }
}
