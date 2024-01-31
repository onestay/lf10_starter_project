import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QualificationService } from '../services/qualification.service';
import { Qualification } from '../model/Qualification';
import { Observable, map, of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import Fuse from 'fuse.js';

@Component({
  selector: 'app-qualification-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './qualification-list.component.html',
  styleUrl: './qualification-list.component.css',
})
export class QualificationListComponent implements OnInit {
  allQualifications: Observable<Qualification[]> = of([]);
  qualifications: Observable<Qualification[]> = of([]);
  editQualification: Qualification | undefined;

  constructor(private qualificationService: QualificationService) {}

  ngOnInit() {
    this.refreshQualifications();
    this.qualificationService.refresh.subscribe(() => {
      console.log('refresh');
      this.refreshQualifications();
    });
  }

  refreshQualifications() {
    this.allQualifications = this.qualificationService.getAllQualifications();
    this.qualificationService.qualificationFilter.subscribe((filter) => {
      this.qualifications = this.allQualifications.pipe(
        map((qualifications) => {
          return this.updateFilter(filter, qualifications);
        }),
      );
    });
  }
  updateFilter(filter: string, q: Qualification[]) {
    if (!filter) {
      return q;
    }

    const fuse = new Fuse(q, {
      keys: ['skill'],
    });

    return fuse.search(filter).map((result) => result.item);
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
