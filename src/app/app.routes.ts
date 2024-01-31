import { Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { QualificationListComponent } from './qualification-list/qualification-list.component';

export const routes: Routes = [
  {
    path: '',
    component: EmployeeListComponent,
    title: 'Employee List',
  },
  {
    path: 'qualifications',
    component: QualificationListComponent,
    title: 'Qualification List',
  },
];
