import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AssetService } from '../asset.service';

@Component({
  selector: 'app-add-asset',
  imports: [ReactiveFormsModule],
  templateUrl: './add-asset.component.html',
  styleUrl: './add-asset.component.scss',
})
export class AddAssetComponent implements OnInit {
  router = inject(Router);
  assetService = inject(AssetService);

  formGroup: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      assetName: new FormControl(''),
      assetType: new FormControl(''),
    });
  }

  onAddAsset(): void {
    this.assetService.sendDataToDB(
      this.formGroup.getRawValue().assetName,
      this.formGroup.getRawValue().assetType
    ).subscribe();
    this.assetService.setData(this.formGroup.getRawValue());
    this.router.navigate(['/show-summary']);
  }

  navigateToTable(): void {
    this.router.navigate(['/table']);
  }

  navigateToCounter(): void {
    this.router.navigate(['/counter']);
  }

  navigateToAddProdUser(): void {
    this.router.navigate(['/addproduser']);
  }

  navigateToShowProdUsers(): void {
    this.router.navigate(['/showprodusers']);
  }
}
