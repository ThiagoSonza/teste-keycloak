import { createContext, useEffect, ReactNode, useState } from "react";
import {
  keycloak,
  keycloakProviderInitConfig,
} from "../constants/keycloak-config";
import Keycloak from "keycloak-js";

interface RouteContextType {
  logout: () => void;
  token?: string | undefined;
}

const defaultValue: RouteContextType = {
  logout: () => {},
};

interface RouteProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<RouteContextType>(defaultValue);

export const AuthProvider: React.FC<RouteProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string>();

  useEffect(() => {
    const initKeycloak = async () => {
      const tokenFromStorage = localStorage.getItem("token");
      const refreshTokenFromStorage = localStorage.getItem("refreshToken");
      const idTokenFromStorage = localStorage.getItem("idToken");

      try {
          const keycloak = new Keycloak({
            url: "https://keycloak-k8s.bemdev.com.br/",
            realm: "poc-keycloak",
            clientId: "bem-app-demo-users"
          });

          console.log(keycloak)

          const authenticated = await keycloak.init({
            ...keycloakProviderInitConfig,
            token: tokenFromStorage ?? undefined,
            refreshToken: refreshTokenFromStorage ?? undefined,
            idToken: idTokenFromStorage ?? undefined,
          });
          console.log(
            `User is ${authenticated ? "authenticated" : "not authenticated"}`
          );        

        // const authenticated = await keycloak.init({
        //   ...keycloakProviderInitConfig,
        //   token: tokenFromStorage ?? undefined,
        //   refreshToken: refreshTokenFromStorage ?? undefined,
        //   idToken: idTokenFromStorage ?? undefined,
        // });

        console.log("authenticated->>>", authenticated);

        if (!authenticated) {
          keycloak.login();
        } else {
          localStorage.setItem("token", keycloak?.token ?? "");
          localStorage.setItem("refreshToken", keycloak?.refreshToken ?? "");
          localStorage.setItem("idToken", keycloak?.idToken ?? "");
          localStorage.setItem(
            "username",
            keycloak.tokenParsed?.given_name
              ? keycloak.tokenParsed?.given_name
              : keycloak.tokenParsed?.preferred_username
          );

          setToken(keycloak?.token!);
        }
      } catch (error) {
        console.error("Falha ao inicializar:", error);
      }
    };

    initKeycloak();
  }, []);

  const logout = () => {
    console.log("logout");
    if (keycloak) {
      keycloak?.logout();
    }
  };

  return (
    <AuthContext.Provider value={{ logout }}>
      {token ? children : <></>}
    </AuthContext.Provider>
  );
};
