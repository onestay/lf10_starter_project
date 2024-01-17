import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Qualification } from '../model/Qualification';

@Injectable({
  providedIn: 'root',
})
export class QualificationService {
  url: string = 'http://localhost:8089/qualifications';
  token: string =
    'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzUFQ0dldiNno5MnlQWk1EWnBqT1U0RjFVN0lwNi1ELUlqQWVGczJPbGU0In0.eyJleHAiOjE3MDU0ODgyNjAsImlhdCI6MTcwNTQ4NDY2MCwianRpIjoiMGZkYjE4OWEtMDc1MS00ODRiLWE5NmEtZjYxNTVlODhhYzMyIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5zenV0LmRldi9hdXRoL3JlYWxtcy9zenV0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjU1NDZjZDIxLTk4NTQtNDMyZi1hNDY3LTRkZTNlZWRmNTg4OSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImVtcGxveWVlLW1hbmFnZW1lbnQtc2VydmljZSIsInNlc3Npb25fc3RhdGUiOiIzNTAxMmM5ZC1hMWQyLTQzMzItYjIwYS0yODZkMDBiNTZlNzMiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbInByb2R1Y3Rfb3duZXIiLCJvZmZsaW5lX2FjY2VzcyIsImRlZmF1bHQtcm9sZXMtc3p1dCIsInVtYV9hdXRob3JpemF0aW9uIiwidXNlciJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ1c2VyIn0.ehATKNniWD2Cwhc23DmmqMIpO6AjlJIjXjwsoTrL-elQiSpy1xD-wpcqMaWAi3XwtydergGwEgXLk-6XZhNS4RfBtLJvb0Ffpyur-nyB8OHZbAo6VLcxQjOUcEMt4k_MGHlNYYHuOU1n3bwqILkYOeUhu7AOVQVtQAhjrbBwZE-jOuacpWyjGLjHxUFwtGDx7IpEq9g-h3uJHRutSFRciAOU_4Q-aCLMEVNxSo83-6ErSqYgFWmCIIVo0BnGi79GDGgdDYqb-Lh0U-Pm6XlhDILZiSAS9XBtiMPvBx5zW3a7FogEZ7OmHiwAS4A2GnLT8taB7L8dg3J2BbOQ8C-OgA';
  constructor(private httpClient: HttpClient) {}

  public getAllQualifications(): Qualification[] {
    const qualifications: Qualification[] = [];
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });

    this.httpClient.get(this.url, { headers }).subscribe((q) => {
      qualifications.push(q as Qualification);
    });
    return qualifications;
  }
}
