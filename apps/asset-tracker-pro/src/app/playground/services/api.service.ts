import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface UserResponse {
  items: User[];
  totalItems: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface ProdUsers {
  id: number;
  name: string;
  surname: string;
  email: string;
  born: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private httpClient = inject(HttpClient);

  getAllUsers(
    page: number,
    size: number,
    searchPhrase: string
  ): Observable<UserResponse> {
    console.log('Szukam: ', searchPhrase);
    const params = new HttpParams().set('page', page).set('size', size);
    return this.httpClient.get<UserResponse>(
      'http://localhost:3000/api/users',
      {
        params,
      }
    );
  }

  calculateSum(a: number, b: number): Observable<number> {
    const params = new HttpParams().set('a', a).set('b', b);
    return this.httpClient.get<number>('http://localhost:3000/api/calculate', {
      params,
    });
  }

  addProdUser(
    name: string,
    surname: string,
    email: string,
    born: string
  ): Observable<boolean> {
    console.log('Szukam: ', name);
    const params = new HttpParams()
      .set('name', name)
      .set('surname', surname)
      .set('email', email)
      .set('born', born);

    return this.httpClient.post<boolean>(
      'http://localhost:3000/api/addproduser',
      {},
      { params }
    );
  }

  getAllProdUsers(): Observable<ProdUsers[]> {
    return this.httpClient.get<ProdUsers[]>('http://localhost:3000/api/allprodusers');
  }
}
