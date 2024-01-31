import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Qualification } from '../model/Qualification';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { Employee } from '../model/Employee';

@Injectable({
  providedIn: 'root',
})
export class QualificationService {
  qualificationFilter: BehaviorSubject<string> = new BehaviorSubject<string>(
    '',
  );
  refresh: BehaviorSubject<string> = new BehaviorSubject('');
  url: string = '/backend/qualifications';
  constructor(private httpClient: HttpClient) {}

  public setQualificationFilter(filter: string) {
    this.qualificationFilter.next(filter.trim());
  }

  public getAllQualifications(): Observable<Qualification[]> {
    const obsArray: Observable<Qualification[]> =
      this.getQualificationObservable(this.url);
    return obsArray.pipe(
      map((qualifications: Qualification[]) => {
        // Sorting the array based on the 'id' property
        return qualifications.sort((a, b) => a.id - b.id);
      }),
    );
  }

  public getEmployeesByQualificationID(id: number): Observable<Employee[]> {
    // eslint-disable-next-line prefer-const
    return this.getQualificationObservable(this.url + '/' + id + '/employees');
  }

  public updateQualification(
    targetId: number,
    skillUpdate: string,
  ): Observable<boolean> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = { skill: skillUpdate };
    return this.httpClient
      .put(this.url + '/' + targetId, body, { headers, observe: 'response' })
      .pipe(
        map((res) => {
          return res.status === 200;
        }),
        catchError(() => of(false)),
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
