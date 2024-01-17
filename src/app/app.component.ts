import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AddQualificationComponent } from './add-qualification/add-qualification.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CommonModule, EmployeeListComponent, AddQualificationComponent]
})
export class AppComponent {
  title = 'lf10StarterNew';
}
