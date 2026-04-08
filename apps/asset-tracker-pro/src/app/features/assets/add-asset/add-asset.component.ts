import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AssetService } from '../asset.service';
import { Button } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';

@Component({
  selector: 'app-add-asset',
  standalone: true,
  imports: [ReactiveFormsModule, Button, FloatLabel, InputText],
  templateUrl: './add-asset.component.html',
  styleUrl: './add-asset.component.scss',
})
export class AddAssetComponent {
  dynamicDialogRef = inject(DynamicDialogRef);
  config = inject(DynamicDialogConfig);
  router = inject(Router);
  assetService = inject(AssetService);
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
    const { assetName, assetType, assetIconUrl } = this.formGroup.getRawValue();
    const isEditMode = !!this.config.data;

    if (this.formGroup.invalid) {
      return;
    }

    if (isEditMode) {
      const asset = {
        _id: this.config.data._id,
        name: assetName,
        type: assetType,
        iconUrl: assetIconUrl,
      };
      this.assetService
        .editAsset(asset)
        .subscribe(() => this.dynamicDialogRef.close(asset));
    } else {
      this.assetService
        .sendDataToDB(assetName, assetType, assetIconUrl)
        .subscribe(() =>
          this.dynamicDialogRef.close({ name: assetName, type: assetType, iconUrl: assetIconUrl }),
        );
    }
  }

  cancelAddingAsset(): void {
    this.dynamicDialogRef.close();
  }
}
