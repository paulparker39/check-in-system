import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, switchMap, throwError, } from 'rxjs';
import { Checkin, CheckinRequest } from './user';


@Injectable({
  providedIn: 'root'
})
export class CheckinService {

  constructor(private http: HttpClient) { }

  getCheckins(): Observable<Checkin[]> {
    return this.http.get<Checkin[]>("/api/checkin");
  }

  checkinUser(pid: number): Observable<Checkin> {
    let errors: string[] = [];

    if (pid.toString().length !== 9) {
      errors.push(`Invalid PID: ${pid}`);
    }
    if (errors.length > 0) {
      return throwError(() => { return new Error(errors.join("\n")) });
    }

    const request: CheckinRequest = {
      pid: pid,
  };

    return this.http.post<Checkin>("/api/checkin", request);
  }
}