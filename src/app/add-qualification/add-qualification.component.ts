import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { QualificationService } from '../services/qualification.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-qualification',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-qualification.component.html',
  styleUrl: './add-qualification.component.css',
})
export class AddQualificationComponent {
  ;
  qulificaionName:string ='';
  constructor(private qualificationService: QualificationService,protected activeModal :NgbActiveModal){
  }

  addQualification(): void{
    if(this.qulificaionName != '')
      this.qualificationService.createNewQualification(this.qulificaionName).subscribe();
  }

}
