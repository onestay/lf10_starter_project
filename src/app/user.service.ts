import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from './auth.config';
import { BehaviorSubject, filter } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  loggedIn = new BehaviorSubject(false);
  constructor(
    private oauthService: OAuthService,
    private router: Router,
  ) {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.events
      .pipe(filter((e) => e.type === 'token_received'))
      .subscribe(() => {
        this.loggedIn.next(true);
      });
    if (this.oauthService.hasValidAccessToken()) {
      this.loggedIn.next(true);
    }
  }

  async getAccessToken() {
    const refreshToken = await this.oauthService.refreshToken();
    if (refreshToken.expires_in <= 0) {
      this.oauthService.logOut();
    }
    if (Date.now() >= this.oauthService.getAccessTokenExpiration()) {
      console.log('refreshing token');
      const tokenResponse = await this.oauthService.refreshToken();
      return tokenResponse.access_token;
    }
    return this.oauthService.getAccessToken();
  }

  async login() {
    await this.oauthService.loadDiscoveryDocumentAndLogin();
  }

  logout() {
    this.oauthService.logOut();
  }
}
