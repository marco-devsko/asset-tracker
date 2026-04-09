import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AssetModel } from '@asset-tracker-pro/libs';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  httpClient = inject(HttpClient);
  private apiUrl = environment.apiUrl+"/asset";

  createNewAsset(asset: Omit<AssetModel, '_id'>): Observable<AssetModel> {
    return this.httpClient.post<AssetModel>(`${this.apiUrl}`, {
      ...asset,
    });
  }

  getAllAssets(): Observable<AssetModel[]> {
    return this.httpClient.get<AssetModel[]>(`${this.apiUrl}/all`);
  }

  removeAsset(id: string) {
    return this.httpClient.delete<AssetModel>(`${this.apiUrl}/` + id);
  }

  editAsset(asset: Partial<AssetModel>) {
    return this.httpClient.put(`${this.apiUrl}/` + asset._id, {
      name: asset.name,
      type: asset.type,
      iconUrl: asset.iconUrl,
    });

  }
}
