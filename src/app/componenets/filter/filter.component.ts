import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../employee.service';
import { QualificationService } from '../../services/qualification.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent {
  @Input() currentComponent: string = '';
  constructor(
    private employeeService: EmployeeService,
    private qualificationService: QualificationService,
  ) {}
  filterText: string = '';
  onFilterType(event: Event) {
    if (this.currentComponent === 'Employee') {
      this.employeeService.setEmployeeFilter(
        (event.target as HTMLInputElement).value,
      );
    } else if (this.currentComponent === 'Qualification') {
      this.qualificationService.setQualificationFilter(
        (event.target as HTMLInputElement).value,
      );
    }
  }
}
