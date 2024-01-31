import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QualificationService } from '../services/qualification.service';
import { FormsModule } from '@angular/forms';
import { Qualification } from '../model/Qualification';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { map } from 'rxjs/internal/operators/map';
import Fuse from 'fuse.js';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-search-qualification',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-qualification.component.html',
  styleUrl: './search-qualification.component.css',
})
export class SearchQualificationComponent implements OnInit {
  allQualifications: Observable<Qualification[]> = of([]);
  qualifications: Observable<Qualification[]> = of([]);
  searchFor: string = '';
  constructor(
    private qualificationService: QualificationService,
    private activeModal: NgbActiveModal,
  ) {}

  ngOnInit(): void {
    this.allQualifications = this.qualificationService.getAllQualifications();
    this.onFilterType();
  }

  onFilterType() {
    this.qualifications = this.allQualifications.pipe(
      map((qualifications) => {
        if (!this.searchFor) {
          return qualifications;
        }
        const fuse = new Fuse(qualifications, {
          keys: ['skill'],
        });
        return fuse.search(this.searchFor).map((result) => result.item);
      }),
    );
  }

  selectQualification(qualification: Qualification) {
    this.activeModal.close(qualification);
  }

  dismiss() {
    this.activeModal.dismiss();
  }
}
