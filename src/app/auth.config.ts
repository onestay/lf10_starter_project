import { AuthConfig } from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
  issuer: 'https://keycloak.szut.dev/auth/realms/szut',
  redirectUri: 'http://localhost:4200/',
  clientId: 'employee-management-service',
  responseType: 'code',
  scope: 'openid profile email',
};
