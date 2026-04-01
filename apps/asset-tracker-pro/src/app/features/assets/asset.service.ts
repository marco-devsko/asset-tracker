import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AssetService {

  data: Record<string, string>  = {};

  setData(data: Record<string, string>): void {
    this.data = data;
  }

  getData(): Record<string, string> {
    return this.data;
  } 
  
}
