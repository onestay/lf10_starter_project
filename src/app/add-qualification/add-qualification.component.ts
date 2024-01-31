import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QualificationService } from '../services/qualification.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-qualification',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './add-qualification.component.html',
  styleUrl: './add-qualification.component.css',
})
export class AddQualificationComponent {
  qulificaionName:string ='';
  constructor(private qualificationService: QualificationService){
  }

  addQualification(): void{
    if(this.qulificaionName != '')
      this.qualificationService.createNewQualification(this.qulificaionName);
  }

}
