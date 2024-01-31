import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Qualification } from '../model/Qualification';
import { UpdateEmployee } from '../model/UpdateEmployee';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SearchQualificationComponent } from '../search-qualification/search-qualification.component';
import { from } from 'rxjs';
import { CreateEmployee } from '../model/CreateEmployee';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css',
})
export class EmployeeDetailsComponent {
  @Output() close = new EventEmitter();
  @Input() isReadOnly: boolean = true;
  @Input() isDeleteConfirm: boolean = false;
  skillSet: Qualification[] = [];
  firstname: string | undefined;
  lastname: string | undefined;
  street: string | undefined;
  postcode: string | undefined;
  city: string | undefined;
  phone: string | undefined;
  id: number | undefined;

  constructor(
    private employeeService: EmployeeService,
    protected modalService: NgbModal,
  ) {
    if (this.isDeleteConfirm && !this.isReadOnly) {
      console.error("isDeleteConfirm and not readOnly doesn't work!!!");
    }
    this.employeeService.currentEmployee.subscribe((e) => {
      if (typeof e?.skillSet !== 'undefined' && typeof e !== 'undefined') {
        this.skillSet = this.skillSet.concat(e.skillSet);
      }
      this.firstname = e?.firstName;
      this.lastname = e?.lastName;
      this.street = e?.street;
      this.postcode = e?.postcode;
      this.city = e?.city;
      this.phone = e?.phone;
      this.id = e?.id;
    });
  }

  addSkill(): void {
    const modalRef = this.modalService.open(SearchQualificationComponent, {
      backdrop: false,
    });
    from(modalRef.result).subscribe(
      (qualification) => {
        this.skillSet.push(qualification);
      },
      () => {},
    );

    console.log('Adding skill.');
  }

  cancel(): void {
    this.close.emit();
    console.log('cancelling');
  }
  update() {
    const updatedEmployee: UpdateEmployee = {
      city: this.city,
      firstName: this.firstname,
      lastName: this.lastname,
      phone: this.phone,
      postcode: this.postcode,
      street: this.street,
      skillSet: this.skillSet.map((s) => s.id),
    };
    if (typeof this.id === 'undefined') {
      console.error('id is undefined');
      return;
    }
    this.employeeService
      .updateEmployeeById(this.id, updatedEmployee)
      .subscribe(() => this.close.emit());
  }

  create() {
    const createEmployee: CreateEmployee = {
      city: this.city,
      firstName: this.firstname,
      lastName: this.lastname,
      phone: this.phone,
      postcode: this.postcode,
      street: this.street,
      skillSet: this.skillSet.map((s) => s.id),
    };

    this.employeeService
      .createEmployee(createEmployee)
      .subscribe(() => this.close.emit());
  }
  save(): void {
    if (typeof this.id === 'undefined') {
      this.create();
    } else {
      this.update();
    }
  }

  delete() {
    if (typeof this.id === 'undefined') {
      console.error('id is undefined');
      return;
    }
    this.employeeService
      .deleteEmployeeById(this.id)
      .subscribe(() => this.close.emit());
  }

  getTitle() {
    if (this.isDeleteConfirm) {
      return `Confirm Delete of ${this.lastname}, ${this.firstname}`;
    }
    if (!this.id && !this.isReadOnly) {
      return 'Create a new Employee';
    }
    if (this.id && !this.isReadOnly) {
      return `Edit details of ${this.lastname}, ${this.firstname}`;
    }

    return `Details of ${this.lastname}, ${this.firstname}`;
  }

  removeSkill(qualification: Qualification) {
    this.skillSet = this.skillSet.filter(
      (skill) => skill.id !== qualification.id,
    );
  }
}
