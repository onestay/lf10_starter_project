import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Qualification } from '../model/Qualification';
import { Observable, map } from 'rxjs';
import { Employee } from '../model/Employee';

@Injectable({
  providedIn: 'root',
})
export class QualificationService {
  url: string = '/backend/qualifications';
  constructor(private httpClient: HttpClient) {}

  public getAllQualifications(): Qualification[] {
    const qualifications: Qualification[] = [];
    this.getQualificationObservable(this.url).subscribe((q) => {
      q.forEach((w) => {
        qualifications.push(w);
      });
    });
    return qualifications;
  }

  public getEmployeesByQualificationID(id: number): Employee[] {
    // eslint-disable-next-line prefer-const
    let employees: Employee[] = [];
    this.getQualificationObservable(
      this.url + '/' + id + '/employees',
    ).subscribe((e) => {
      employees.push(e as Employee);
    });
    return employees;
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
    this.httpClient.post(this.url, body, { headers }).subscribe(
      (response) => {
        console.log('Post request successful:', response);
      },
      (error) => {
        console.error('Post request failed:', error);
      },
    );
  }

  public deleteQualification(targetId: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.httpClient.delete(this.url + '/' + targetId, { headers }).subscribe(
      (response) => {
        console.log('Delete request successful:', response);
      },
      (error) => {
        console.error('Delete request failed:', error);
      },
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
