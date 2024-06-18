import Keycloak, { KeycloakConfig } from "keycloak-js";

const keycloakConfig = {
  "realm": "poc-keycloak",
  "auth-server-url": "https://keycloak-k8s.bemdev.com.br/",
  "ssl-required": "external",
  "resource": "bem-app-demo-users",
  "verify-token-audience": true,
  "credentials": {
    "secret": "NaYmldStI38S7MIeYUJnRHZyDsmCvK9A"
  },
  "confidential-port": 0,
  "policy-enforcer": {
    "credentials": {}
  }
};

export const keycloak = new Keycloak({
  url: keycloakConfig["auth-server-url"],
  realm: keycloakConfig["realm"],
  clientId: keycloakConfig["resource"],
});

export const keycloakProviderInitConfig: Keycloak.KeycloakInitOptions = {
  onLoad: "login-required",
  redirectUri: "https://oauth.pstmn.io/v1/callback",
  checkLoginIframe: false,
};

export const keyCloakConfig: KeycloakConfig = {
  url: keycloakConfig["auth-server-url"],
  realm: keycloakConfig["realm"],
  clientId: keycloakConfig["resource"],
};