import Keycloak from 'keycloak-js';
import { environment } from '../../../environments/environment';

let keycloakInstance: Keycloak | null = null;

export function getKeycloakInstance(): Keycloak {
if (!keycloakInstance) {
    keycloakInstance = new Keycloak({
      url: environment.keycloak.url,
      realm: environment.keycloak.realm,
      clientId: environment.keycloak.clientId,
    });
  }
  return keycloakInstance;
}

export async function initializeKeycloak(): Promise<boolean> {
  const keycloak = getKeycloakInstance();

  try {
    const authenticated = await keycloak.init({
      onLoad: 'login-required',
      checkLoginIframe: false,
      pkceMethod: 'S256',
    });

    return authenticated;
  } catch (error) {
    return false;
  }
}
