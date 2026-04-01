import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { ApiService, User } from './services/api.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DynamicLengthValidator } from './validators/dynamic-length.validator';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [ReactiveFormsModule, ScrollingModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  private apiService = inject(ApiService);
  formGroup: FormGroup = new FormGroup(
    {
      userFilter: new FormControl(''),
      minLength: new FormControl(0, [Validators.min(1)]),
    },
    { validators: [DynamicLengthValidator()] }
  );

  page = signal(0);
  pageSize = 50;
  total = computed(() => this.userResource.value()?.totalItems || 0);
  users = computed(() => this.allUsers());
  loading = computed(() => this.userResource.isLoading());
  error = computed(() => this.userResource.error());

  allUsers = signal<User[]>([]);

  userResource = rxResource({
    params: () => {
      if (
        this.formGroupSignalStatus() === 'INVALID' &&
        this.formGroup.get('userFilter')!.touched
      ) {
        return undefined;
      }
      return { page: this.page(), searchPhrase: this.filterSignal() };
    },
    stream: (loaderParams) => {
      return this.apiService.getAllUsers(
        loaderParams.params.page,
        this.pageSize,
        loaderParams.params.searchPhrase
      );
    },
  });

  private filterSignalStatus = toSignal(
    this.formGroup.get('userFilter')!.statusChanges
  );
  private formGroupSignalStatus = toSignal(this.formGroup.statusChanges);

  private filterSignal = toSignal(
    this.formGroup
      .get('userFilter')!
      .valueChanges.pipe(debounceTime(300), distinctUntilChanged()),
    { initialValue: '' }
  );

  constructor() {
    effect(() => {
      const newUsers = this.userResource.value()?.items;
      if (newUsers) {
        this.allUsers.update((curr) => [...curr, ...newUsers]);
      }
    });
  }

  filteredUsers = computed(() => {
    const filter = this.filterSignal().toLowerCase();
    const users = this.users();
    if (!filter) return users;
    return users.filter((user) => user.name.toLowerCase().includes(filter));
  });

  onScroll(index: number): void {
    const threshold = this.filteredUsers().length - 10;
    const hasMore = this.filteredUsers().length < this.total();

    if (index >= threshold && !this.loading() && hasMore) {
      this.page.update((p) => p + 1);
    }
  }

  loadMoreData(): void {
    this.page.update((p) => p + 1);
  }
}
