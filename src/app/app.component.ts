import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QualificationListComponent } from './qualification-list/qualification-list.component';
import { UserService } from './user.service';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { NgbModal, NgbNav, NgbNavItem, NgbNavLink } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './componenets/navbar/navbar.component';
import { FilterComponent } from './componenets/filter/filter.component';
import { QualificationService } from './services/qualification.service';
import { AddQualificationComponent } from './add-qualification/add-qualification.component';

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
    QualificationListComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  selectedTab: string = 'employees';
  loggedIn: boolean = false;
  constructor(
    private modalService : NgbModal,
    private userService: UserService,
    private route: ActivatedRoute,
    private qual: QualificationService,
  ) {}
  async ngOnInit() {
    await this.userService.login();
    this.userService.loggedIn.subscribe((res) => {
      console.log('logged in: ', res);
      this.loggedIn = res;
    });
  }
  openPopUp():void{
    if(this.getButtonTitle() == 'Qualification'){
      this.modalService.open(AddQualificationComponent);
    }
  }

  getButtonTitle() {
    return window.location.pathname === '/' ? 'Employee' : 'Qualification';
  }

  logout() {
    this.userService.logout();
  }
  title = 'lf10StarterNew';
}
