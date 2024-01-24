import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../model/Employee';
import { UserService } from '../user.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent {
  employees$: Observable<Employee[]>;

  constructor(
    private http: HttpClient,
    private userService: UserService,
  ) {
    console.log(this.userService.getAccessToken());
    this.employees$ = of([]);
    this.fetchData();
  }

  fetchData() {
    this.employees$ = this.http.get<Employee[]>('/backend', {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
}
