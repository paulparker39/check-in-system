import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, } from 'rxjs';

@Injectable({
  
  providedIn: 'root'
})
export class DeleteService {

  constructor(private http: HttpClient) { }

  deleteUser(pid: number): Observable<any> {
    return this.http.delete(`/api/registrations/${pid}`);

  }

}
