import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map, of } from 'rxjs';
import { Employee } from '../model/Employee';
import { EmployeeService } from '../employee.service';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
import Fuse from 'fuse.js';
import { EllipsisPipe } from '../pipes/ellipsis.pipe';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, EmployeeDetailsComponent, EllipsisPipe],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent implements OnInit {
  allEmployees: Observable<Employee[]> = of([]);
  employees: Observable<Employee[]> = of([]);
  showingDetails: boolean = false;
  showingEdit: boolean = false;
  showingDelete: boolean = false;
  constructor(private employeeService: EmployeeService) {}
  ngOnInit(): void {
    this.allEmployees = this.employeeService.getAllEmployees();
    this.employeeService.employeeFilter$.subscribe((filter) => {
      console.log(filter);
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

  showDetails(e: Employee) {
    this.employeeService.updateEmployeeDetails(e);
    this.showingDetails = true;
  }

  hideDetails() {
    this.showingDetails = false;
    this.showingDelete = false;
  }

  showEdit(e: Employee) {
    this.employeeService.updateEmployeeDetails(e);
    this.showingEdit = true;
    console.log('edit');
  }

  hideEdit() {
    this.showingEdit = false;
    this.showingDetails = false;
    this.showingDelete = false;
  }

  delete(e: Employee) {
    this.employeeService.updateEmployeeDetails(e);
    this.showingDelete = true;
    this.showingDetails = true;
    console.log('delete');
  }

  qualificationsString(e: Employee) {
    return e.skillSet!.map((s) => s.skill).join(', ');
  }
}
