import { computed, Injectable, signal } from '@angular/core';
import Keycloak from 'keycloak-js';
import { getKeycloakInstance } from '../config/keycloak.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private keycloak: Keycloak;

  // Signals simples
  private _isAuthenticated = signal<boolean>(false);
  private _loading = signal<boolean>(false);
  private _username = signal<string>('');

  // Computed signals para UI
  readonly isAuthenticated = computed(() => this._isAuthenticated());
  readonly loading = computed(() => this._loading());
  readonly username = computed(() => this._username());

  constructor() {
    this.keycloak = getKeycloakInstance();
    this.setupEventListeners();
    this.updateAuthState();
  }

  private setupEventListeners(): void {
    // Configurar eventos de Keycloak
    this.keycloak.onAuthSuccess = () => {
      this.updateAuthState();
    };

    this.keycloak.onAuthError = (error) => {
    };

    this.keycloak.onAuthLogout = () => {
      this.clearAuthState();
    };

    this.keycloak.onTokenExpired = () => {
      this.keycloak.updateToken(30);
    };
  }

  private updateAuthState(): void {
    const authenticated = this.keycloak.authenticated || false;
    this._isAuthenticated.set(authenticated);

    if (authenticated) {
      const username = this.keycloak.tokenParsed?.["preferred_username"] ||
                      this.keycloak.tokenParsed?.["name"] ||
                      'Usuario';
      this._username.set(username);
    } else {
      this.clearAuthState();
    }
  }

  private clearAuthState(): void {
    this._isAuthenticated.set(false);
    this._username.set('');
  }

  async login(): Promise<void> {
    this._loading.set(true);
    try {
      await this.keycloak.login({
        redirectUri: window.location.origin,
      });
    } finally {
      this._loading.set(false);
    }
  }

  async logout(): Promise<void> {
    this._loading.set(true);
    try {
      await this.keycloak.logout({
        redirectUri: window.location.origin,
      });
    } finally {
      this._loading.set(false);
    }
  }

  getToken(): string | undefined {
    return this.keycloak.token;
  }

  // Método para compatibilidad con guard
  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  // Método para debug
  getKeycloakInfo(): any {
    return {
      authenticated: this.keycloak.authenticated,
      token: this.keycloak.token ? 'Presente' : 'Ausente',
      username: this.keycloak.tokenParsed?.["preferred_username"],
      realm: this.keycloak.realm,
      clientId: this.keycloak.clientId,
    };
  }
}
