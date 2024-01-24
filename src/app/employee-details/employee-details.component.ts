import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css',
})
export class EmployeeDetailsComponent {
  isReadOnly: boolean = false;
  skillSet: string[] = ['skill1', 'skill2'];
  firstname: string = '';
  lastname: string = '';
  street: string = '';
  postcode: string = '';
  city: string = '';
  phone: string = '';

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
