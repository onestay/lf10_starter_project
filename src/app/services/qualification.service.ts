import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Qualification } from '../model/Qualification';
import { Observable, catchError, map, of } from 'rxjs';
import { Employee } from '../model/Employee';

@Injectable({
  providedIn: 'root',
})
export class QualificationService {
  url: string = '/backend/qualifications';
  constructor(private httpClient: HttpClient) {}

  public getAllQualifications(): Observable<Qualification[]> {
    return this.getQualificationObservable(this.url);
  }

  public getEmployeesByQualificationID(id: number): Observable<Employee[]> {
    // eslint-disable-next-line prefer-const
    return this.getQualificationObservable(this.url + '/' + id + '/employees');
  }

  public updateQualification(targetId: number, skillUpdate: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = { skill: skillUpdate };
    this.httpClient.put(this.url + '/' + targetId, body, { headers }).subscribe(
      (response) => {
        console.log('PUT request successful:', response);
      },
      (error) => {
        console.error('PUT request failed:', error);
      },
    );
  }

  public createNewQualification(skillUpdate: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = { skill: skillUpdate };
    return this.httpClient.post(this.url, body, { headers });
  }

  public deleteQualification(targetId: number): Observable<boolean> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.httpClient
      .delete(this.url + '/' + targetId, { headers, observe: 'response' })
      .pipe(
        map((res) => {
          return res.status === 204;
        }),
        catchError(() => of(false)),
      );
  }

  private getQualificationObservable(url: string): Observable<Qualification[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.httpClient.get<Qualification[]>(url, { headers }).pipe(
      map((q) => {
        return q;
      }),
    );
  }
}
