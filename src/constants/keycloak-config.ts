import Keycloak from "keycloak-js";

const keycloakConfig = {
  realm: "poc-keycloak",
  "auth-server-url": "https://keycloak-k8s.bemdev.com.br/",
  "ssl-required": "external",
  resource: "bem-app-demo-users",
  "public-client": true,
  "verify-token-audience": true,
  "use-resource-role-mappings": true,
  "confidential-port": 0,
};

export const keycloak = new Keycloak({
  ...keycloakConfig,
  url: keycloakConfig["auth-server-url"],
  realm: keycloakConfig["realm"],
  clientId: keycloakConfig["resource"],
});

export const keycloakProviderInitConfig: Keycloak.KeycloakInitOptions = {
  onLoad: "login-required",
  redirectUri: "http://localhost:4006",
  checkLoginIframe: false,
  scope: "email openid profile documentos grupos-usuarios cargo-usuario",
  pkceMethod: "S256",
};
