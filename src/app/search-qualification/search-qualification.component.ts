import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-qualification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-qualification.component.html',
  styleUrl: './search-qualification.component.css',
})
export class SearchQualificationComponent {
  searchFor;
}
