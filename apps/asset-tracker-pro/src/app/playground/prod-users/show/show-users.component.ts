import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-show-users',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './show-users.component.html',
  styleUrl: './show-users.component.scss',
})
export class ShowUsersComponent {
  private apiService = inject(ApiService);

  prodUsersRxJs = this.apiService.getAllProdUsers();

  prodUsersSignals = rxResource({
    stream: () => {
      return this.apiService.getAllProdUsers();
    },
  });
}
