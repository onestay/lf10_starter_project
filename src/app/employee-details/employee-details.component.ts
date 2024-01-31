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
  isReadOnly: boolean = true;
  skillSet: string[] = ['Java', 'Python'];
  firstname: string = 'Jan-Okke';
  lastname: string = 'Rockmann';
  street: string = 'Straße 123';
  postcode: string = '28717';
  city: string = 'Bremen';
  phone: string = '12345678';

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
