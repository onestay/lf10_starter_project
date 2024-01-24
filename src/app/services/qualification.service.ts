import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Qualification } from '../model/Qualification';
import { Observable, map } from 'rxjs';
import { Employee } from '../model/Employee';

@Injectable({
  providedIn: 'root',
})
export class QualificationService {
  url: string = 'http://localhost:8089/qualifications';
  token: string =
    'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzUFQ0dldiNno5MnlQWk1EWnBqT1U0RjFVN0lwNi1ELUlqQWVGczJPbGU0In0.eyJleHAiOjE3MDYwODY2NjMsImlhdCI6MTcwNjA4MzA2MywianRpIjoiNGZkZmRmZmYtM2UyMC00NzhkLWIyZjktYmRkYTQwNDBjYTllIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5zenV0LmRldi9hdXRoL3JlYWxtcy9zenV0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjU1NDZjZDIxLTk4NTQtNDMyZi1hNDY3LTRkZTNlZWRmNTg4OSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImVtcGxveWVlLW1hbmFnZW1lbnQtc2VydmljZSIsInNlc3Npb25fc3RhdGUiOiJkZDg3MDVmMS1hNTg2LTQ0YmEtOGE2Ni1mOGZjOTBjZDMxMjIiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsicHJvZHVjdF9vd25lciIsIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1zenV0IiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InVzZXIifQ.Zqfv739YV_fnph1M8lTik7VQdIH5hPvvQ3yV3RQzymc245BrXYjuq0ITKmBKPaNah3PMOlT_BMIjKkRQ5EkH_ZwZdumWkQeaPG4yqdKeiKxZd_OR5_683CkvlHk_dWxPBfyufyBl325ki9zPo_NxLf0ETGbCimoXOWJnE0cauEHweuHlNTcys25qCMfAJi3SM3bornGNQ3Ez8-P-EqbeYRkxn9jlcvZTIC8xWAIQoslnebpOJ2N698PBU_GROOvBgFHSfHioYkOI1LYmCLCdj5LhcGXAarHW7yPH338nm5BrtPBU4epbTK33AfusBPLMBVJVXMq8c5NTQGE2jEvjtQ';
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
      Authorization: `Bearer ${this.token}`,
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
      Authorization: `Bearer ${this.token}`,
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
      Authorization: `Bearer ${this.token}`,
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
      Authorization: `Bearer ${this.token}`,
    });

    return this.httpClient.get<Qualification[]>(url, { headers }).pipe(
      map((q) => {
        return q;
      }),
    );
  }
}
