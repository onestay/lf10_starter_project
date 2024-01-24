import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map, of } from 'rxjs';
import { Employee } from '../model/Employee';
import { EmployeeService } from '../employee.service';
import Fuse from 'fuse.js';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent implements OnInit {
  allEmployees: Observable<Employee[]> = of([]);
  employees: Observable<Employee[]> = of([]);
  constructor(private employeeService: EmployeeService) {}
  ngOnInit(): void {
    this.allEmployees = this.employeeService.getAllEmployees();
    this.employeeService.employeeFilter$.subscribe((filter) => {
      this.employees = this.allEmployees.pipe(
        map((employees) => {
          if (!filter) {
            return employees;
          }
          const fuse = new Fuse(employees, {
            keys: ['firstName', 'lastName'],
          });

          return fuse.search(filter).map((result) => result.item);
        }),
      );
    });
  }
}
