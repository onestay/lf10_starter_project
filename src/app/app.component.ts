import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import {NgbNav, NgbNavItem, NgbNavLink } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, NgbNav, NgbNavItem, NgbNavLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private userService: UserService) {
    this.userService.login();
  }
  title = 'lf10StarterNew';
}
