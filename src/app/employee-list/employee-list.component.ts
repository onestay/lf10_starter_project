import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Employee } from '../Employee';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent {
  bearer =
    'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzUFQ0dldiNno5MnlQWk1EWnBqT1U0RjFVN0lwNi1ELUlqQWVGczJPbGU0In0.eyJleHAiOjE3MDQ4ODU1OTEsImlhdCI6MTcwNDg4MTk5MSwianRpIjoiMGRkN2Q5MDMtNGQ0ZC00MzI5LTk1NDgtNjUyMTgzNmM2Yzk1IiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5zenV0LmRldi9hdXRoL3JlYWxtcy9zenV0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjU1NDZjZDIxLTk4NTQtNDMyZi1hNDY3LTRkZTNlZWRmNTg4OSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImVtcGxveWVlLW1hbmFnZW1lbnQtc2VydmljZSIsInNlc3Npb25fc3RhdGUiOiIyM2RlNDVkMy00ZGY3LTRmNDYtYWJhMS1kOTU0MTA5MTg1M2IiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbInByb2R1Y3Rfb3duZXIiLCJvZmZsaW5lX2FjY2VzcyIsImRlZmF1bHQtcm9sZXMtc3p1dCIsInVtYV9hdXRob3JpemF0aW9uIiwidXNlciJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ1c2VyIn0.DM9qkhbGkB_XPzRHp14zUrRZtJxfxpM4ED6R-mKz9TP5MOU6K0jbbuFOCPFXrQHAau5R9i79zv286yL_UHMgDPfgzBSoPMfAot83Yy-gKY88nYhok3lGIgMd3nP7szMFb1jaAbeR7_txp_s464IM6zXfT88mRiCaaETxRDiLFZ9Z_vDq8t1VjmbvZRl8TxR2SgR-JluUa_Movzc_Vf3z7UUP-lWNyHIJ_8Pll3qkh0gCF2yJWX-ZPknTfvqOs_dsLhLkFfd93srLG3wKO29DXyhWtigT-RnQxfNupfWwhCvN1cun2_Cmh2zcvHjfsXAPv7AmWlVAHmkcxsz-wMNScw';
  a = 'b';
  employees$: Observable<Employee[]>;

  constructor(private http: HttpClient) {
    this.employees$ = of([]);
    this.fetchData();
  }

  fetchData() {
    this.employees$ = this.http.get<Employee[]>('/backend', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearer}`),
    });
  }
}
