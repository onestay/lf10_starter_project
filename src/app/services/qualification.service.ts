import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Qualification } from '../model/Qualification';
import { Observable } from 'rxjs';
import { Employee } from '../model/Employee';

@Injectable({
  providedIn: 'root',
})
export class QualificationService {
  url: string = 'http://localhost:8089/qualifications';
  token: string =
    'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzUFQ0dldiNno5MnlQWk1EWnBqT1U0RjFVN0lwNi1ELUlqQWVGczJPbGU0In0.eyJleHAiOjE3MDU1NzI2NzksImlhdCI6MTcwNTU2OTA3OSwianRpIjoiMTA4ZDczNWItZjU5Zi00NmI1LWFjNWUtMjNmYjhmZDZmZmM2IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5zenV0LmRldi9hdXRoL3JlYWxtcy9zenV0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjU1NDZjZDIxLTk4NTQtNDMyZi1hNDY3LTRkZTNlZWRmNTg4OSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImVtcGxveWVlLW1hbmFnZW1lbnQtc2VydmljZSIsInNlc3Npb25fc3RhdGUiOiIxZDM4ZWMwNi01Zjc2LTRkZGYtOGZlMi02Mzk4NmY3Zjc3NWYiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsicHJvZHVjdF9vd25lciIsIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1zenV0IiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InVzZXIifQ.eGNyNxwp3H69XETsmmylICKaQfWVH0Ifex0aes-2l6O-T41LCrL9-vrLDVv4_NYXkirbV7eT_crt2TzPyiBqd6jm8xdXU8pWjUOp6l7QUtnWXi7H5Szf-E6GHEsuXIXnufNSeLc5wme9UPZy86f_fkuS1ATO1oGrrq1ly_A5b82zvJU8trVwfChkk2vLGta6mkuPcPtzH5jMcGURVLVp3ZKolusnORicBib4q4MBlQ1xt-ZHRpbzIOvsVqmhWJy2niECB5xLEBiJz1mGw8j7JNeq9einiTaPezbjoiOZB3RAJGLbTlHFVpd6NX1B7YSzmYlmJJjxb9YJG0EhDFVMYQ';
  constructor(private httpClient: HttpClient) {}

  public getAllQualifications(): Qualification[] {
    const qualifications: Qualification[] = [];
    this.getQualificationObservable(this.url).subscribe((q) => {
      qualifications.push(q as Qualification);
    });
    return qualifications;
  }

  public getEmployeesByQualificationID(id: number): Employee[] {
    let employees: Employee[] = [];
    this.getQualificationObservable(
      this.url + '/' + id + '/employees',
    ).subscribe((e) => {
      employees.push(e as Employee);
    });
    return employees;
  }

  private getQualificationObservable(url: string): Observable<unknown> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    return this.httpClient.get(url, { headers });
  }
}
