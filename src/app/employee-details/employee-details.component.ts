import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css',
})
export class EmployeeDetailsComponent {
  isReadOnly: boolean = true;
  skillSet: string[] | undefined;
  firstname: string | undefined;
  lastname: string | undefined;
  street: string | undefined;
  postcode: string | undefined;
  city: string | undefined;
  phone: string | undefined;

  constructor(private employeeService: EmployeeService) {
    this.employeeService.currentEmployee.subscribe((e) => {
      this.skillSet = e?.skillSet?.map(skill => skill.skill);
      this.firstname = e?.firstName;
      this.lastname = e?.lastName;
      this.street = e?.street;
      this.postcode = e?.postcode;
      this.city = e?.city;
      this.phone = e?.phone;
    });
  }

  addSkill(): void {
    console.log('Adding skill.');
  }

  cancel(): void {
    console.log('cancelling');
  }

  save(): void {
    console.log('saving');
  }
}
