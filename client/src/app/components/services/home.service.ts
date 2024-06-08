import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {


  constructor(private http: HttpClient) { }

  public getAllCloths(): Observable<any> {
    return this.http.get('/cloth');
  }

  public getProductById(productId: number): Observable<any> {
    return this.http.get(`/cloth/${productId}`);
  }

  public getByQuery(query: string, page: number): Observable<any> {
    return this.http.get(`/cloth/search?query=${query}&page=${page}`);
  }

  public getByQueryAndSize(query: string, page: number, size: number): Observable<any> {
    return this.http.get(`/cloth/search?query=${query}&page=${page}&size=${size}`);
  }

}
