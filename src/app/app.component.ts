import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QualificationListComponent } from './qualification-list/qualification-list.component';
import { UserService } from './user.service';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { NgbNav, NgbNavItem, NgbNavLink } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './componenets/navbar/navbar.component';
import { FilterComponent } from './componenets/filter/filter.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    NgbNav,
    NgbNavItem,
    NgbNavLink,
    NavbarComponent,
    FilterComponent,
    QualificationListComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  selectedTab: string = 'employees';
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
  ) {
    this.userService.login();
  }

  getButtonTitle() {
    console.log(this.selectedTab);
    return window.location.pathname === '/' ? 'Employee' : 'Qualification';
  }
  title = 'lf10StarterNew';
}
