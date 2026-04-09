import { Component, computed, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AssetService } from '../asset.service';
import { Button } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { catchError, take, throwError } from 'rxjs';

@Component({
  selector: 'app-add-asset',
  standalone: true,
  imports: [ReactiveFormsModule, Button, FloatLabel, InputText],
  templateUrl: './add-asset.component.html',
  styleUrl: './add-asset.component.scss',
})
export class AddAssetComponent {
  readonly dynamicDialogRef = inject(DynamicDialogRef);
  readonly config = inject(DynamicDialogConfig);
  readonly assetService = inject(AssetService);
  readonly data = this.config.data;
  readonly isEditMode = computed(() => !!this.data?._id);
  readonly formGroup = new FormGroup({
    assetName: new FormControl<string>(this.config.data?.name ?? '', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    assetType: new FormControl<string>(this.config.data?.type ?? '', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    assetIconUrl: new FormControl<string>(this.config.data?.iconUrl ?? '', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  addAsset(): void {
    if (this.formGroup.invalid) {
      return;
    }

    const { assetName, assetType, assetIconUrl } = this.formGroup.getRawValue();

    const asset = {
      name: assetName,
      type: assetType,
      iconUrl: assetIconUrl,
    };

    const request$ = this.isEditMode()
      ? this.assetService.editAsset({ ...asset, _id: this.data._id })
      : this.assetService.createNewAsset(asset);

    request$
      .pipe(
        take(1),
        catchError((error) => throwError(error))
      )
      .subscribe(() => this.dynamicDialogRef.close(asset));
  }

  cancelAddingAsset(): void {
    this.dynamicDialogRef.close();
  }
}
