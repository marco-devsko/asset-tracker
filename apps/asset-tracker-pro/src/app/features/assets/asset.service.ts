import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  httpClient = inject(HttpClient);

  data: Record<string, string> = {};

  setData(data: Record<string, string>): void {
    this.data = data;
  }

  getData(): Record<string, string> {
    return this.data;
  }

  sendDataToDB(name: string, type: string) {
    return this.httpClient.post<any>('http://localhost:3000/api/asset', {
      name,
      type,
    });
  }
}
