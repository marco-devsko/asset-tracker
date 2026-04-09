import { Component, inject, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { AssetService } from '../asset.service';
import { Observable } from 'rxjs';
import { AssetModel } from '@asset-tracker-pro/libs';
import { Button } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddAssetComponent } from '../add-asset/add-asset.component';
import { IconFieldModule } from 'primeng/iconfield';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-show-assets',
  standalone: true,
  imports: [TableModule, Button, IconFieldModule],
  templateUrl: './show-assets.component.html',
  styleUrl: './show-assets.component.scss',
  providers: [DialogService],
})
export class ShowAssetsComponent {
  assetService = inject(AssetService);
  dialogService = inject(DialogService);
  assets: Observable<AssetModel[]> = this.assetService.getAllAssets();
  allAssets = rxResource({
    params: () => this.refreshTable(),
    stream: () => {
      return this.assetService.getAllAssets();
    },
  });

  refreshTable = signal(Date.now());
  addAssetRef: DynamicDialogRef<AddAssetComponent> | null = null;

  manageAsset(asset?: AssetModel) {
    this.addAssetRef = this.dialogService.open(AddAssetComponent, {
      header: asset ? 'Edit asset' : 'Add new asset',
      modal: true,
      width: '20vw',
      closable: true,
      dismissableMask: true,
      data: asset,
    });

    this.addAssetRef?.onClose.subscribe((data) => {
      if (data) {
        this.refreshTable.set(Date.now());
      }
    });
  }

  protected removeAsset(event: string) {
    this.assetService
      .removeAsset(event)
      .subscribe(() => this.refreshTable.set(Date.now()));
  }
}
