import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../employee.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent {
  constructor(private employeeService: EmployeeService) {}
  filterText: string = '';
  onFilterType(event: Event) {
    console.log('called');
    this.employeeService.setEmployeeFilter(
      (event.target as HTMLInputElement).value,
    );
  }
}
