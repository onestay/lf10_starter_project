import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from './model/Employee';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { EmployeeQualification } from './model/EmployeeQualification';
import { UpdateEmployee } from './model/UpdateEmployee';
import { CreateEmployee } from './model/CreateEmployee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employeeFilterSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  public employeeFilter$: Observable<string> =
    this.employeeFilterSubject.asObservable();
  constructor(private http: HttpClient) {}

  setEmployeeFilter(filter: string) {
    this.employeeFilterSubject.next(filter.trim());
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>('/backend/employees');
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`/backend/employees/${id}`);
  }

  updateEmployeeById(
    id: number,
    employee: UpdateEmployee,
  ): Observable<Employee> {
    return this.http.put(`/backend/employees/${id}`, employee, {
      headers: { 'Content-Type': 'Application/json' },
    });
  }

  deleteEmployeeById(id: number): Observable<boolean> {
    return this.http
      .delete(`/backend/employees/${id}`, { observe: 'response' })
      .pipe(
        map((res) => res.status === 204),
        catchError(() => of(false)),
      );
  }

  createEmployee(createEmployee: CreateEmployee): Observable<Employee> {
    return this.http.post<Employee>('/backend/employees', createEmployee);
  }

  getEmployeeQualifications(id: number): Observable<EmployeeQualification> {
    return this.http.get<EmployeeQualification>(
      `/backend/employees/${id}/qualifications`,
    );
  }

  addEmployeeQualification(
    id: number,
    qualification: string,
  ): Observable<EmployeeQualification> {
    const qualificationObj = { skill: qualification };
    return this.http.post<EmployeeQualification>(
      `/backend/employees/${id}/qualifications`,
      qualificationObj,
    );
  }

  deleteEmployeeQualification(
    id: number,
    qualification: string,
  ): Observable<EmployeeQualification> {
    const qualificationObj = { skill: qualification };
    return this.http.request<EmployeeQualification>(
      'delete',
      `/backend/employees/${id}/qualifications`,
      { body: qualificationObj },
    );
  }
}
