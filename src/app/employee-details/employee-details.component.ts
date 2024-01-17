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
  skillSet: string[] = ["skill1", "skill2"];
  addingSkill: boolean = false;
  firstname: string = "";
  lastname: string = "";
  street: string = "";
  postcode: number | undefined;
  city: string = "";
  phone: number | undefined;
  skillSetTemp: string = "";

  addSkill(): void {
    console.log("Adding skill.");
    this.addingSkill = true;
  }

  cancelAddingSkill(): void {
    this.skillSetTemp = "";
    this.addingSkill = false;
  }

  saveAddingSkill(): void {
    this.skillSet.push(this.skillSetTemp);
    this.skillSetTemp = "";
    this.addingSkill = false;
  }

  cancel() : void {
    console.log("cancelling");
  }

  save(): void {
    console.log("saving");
  }
}
