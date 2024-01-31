import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QualificationService } from '../services/qualification.service';
import { Qualification } from '../model/Qualification';
import { Observable, of } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-qualification-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './qualification-list.component.html',
  styleUrl: './qualification-list.component.css',
})
export class QualificationListComponent implements OnInit {
  qualifications: Observable<Qualification[]> = of([]);
  editQualification: Qualification | undefined;

  constructor(private qualificationService: QualificationService) {}

  ngOnInit() {
    this.qualifications = this.qualificationService.getAllQualifications();
  }

  toEdit(qualification: Qualification): boolean {
    if (!this.editQualification) {
      return false;
    } else if (this.editQualification !== qualification) {
      return false;
    } else {
      return true;
    }
  }

  onEdit(qualification: Qualification) {
    this.editQualification = qualification;
  }

  onSave(qualification: Qualification) {
    let updateStatus: boolean | undefined;
    this.qualificationService
      .updateQualification(qualification.id, qualification.skill)
      .subscribe((qualificationStatus) => {
        updateStatus = qualificationStatus;
        console.log(updateStatus);
        if (updateStatus) {
          this.editQualification = undefined;
        } else {
          return;
        }
      });
  }

  onDelete(qualification: Qualification) {
    console.log('Qualification with the id: ' + qualification.id + ' deleted');
    // this.qualificationService.deleteQualification(qualification.id);
  }
}
