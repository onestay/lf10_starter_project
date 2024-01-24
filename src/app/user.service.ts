import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from './auth.config';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private oauthService: OAuthService) {
    this.oauthService.configure(authCodeFlowConfig);
  }

  async getAccessToken() {
    if (Date.now() >= this.oauthService.getAccessTokenExpiration()) {
      console.log('refreshing token');
      const tokenResponse = await this.oauthService.refreshToken();
      return tokenResponse.access_token;
    }
    return this.oauthService.getAccessToken();
  }

  login() {
    this.oauthService.loadDiscoveryDocumentAndLogin();

    this.oauthService.events
      .pipe(filter((e) => e.type === 'token_received'))
      .subscribe(() => {
        this.oauthService.loadUserProfile();
        console.log(this.oauthService.getAccessToken());
      });
  }
}
