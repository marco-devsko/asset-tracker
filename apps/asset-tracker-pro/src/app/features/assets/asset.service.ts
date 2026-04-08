import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AssetModel } from '@asset-tracker-pro/libs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  httpClient = inject(HttpClient);

  sendDataToDB(name: string, type: string, iconUrl: string): Observable<AssetModel> {
    return this.httpClient.post<AssetModel>('http://localhost:3000/api/asset', {
      name,
      type,
      iconUrl,
    });
  }

  getAllAssets(): Observable<AssetModel[]> {
    return this.httpClient.get<AssetModel[]>(
      'http://localhost:3000/api/asset/all'
    );
  }

  removeAsset(id: string) {
    return this.httpClient.delete<AssetModel>('http://localhost:3000/api/asset/' + id);
  }

  editAsset(asset: Partial<AssetModel>) {
    return this.httpClient.put('http://localhost:3000/api/asset/' + asset._id, {
      name: asset.name,
      type: asset.type,
      iconUrl: asset.iconUrl,
    })

  }
}
