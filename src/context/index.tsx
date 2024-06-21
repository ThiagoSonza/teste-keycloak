import { createContext, useEffect, useState } from "react";
import {
  keycloak,
  keycloakProviderInitConfig,
} from "../constants/keycloak-config";
import { AuthContextType, AuthProviderProps } from "../core/_types/auth";
import { defaultValue } from "../constants/auth-provider";
import { ACCESS_TOKEN, REFRESH_TOKEN, USER } from "../constants/storage";

export const AuthContext = createContext<AuthContextType>(defaultValue);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string>();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initKeycloak = async () => {
      try {
        const authenticated = await keycloak.init(keycloakProviderInitConfig);

        if (!authenticated) {
          keycloak.login();
        } else {
          localStorage.setItem(ACCESS_TOKEN, keycloak?.token ?? "");
          localStorage.setItem(REFRESH_TOKEN, keycloak?.refreshToken ?? "");
          localStorage.setItem(USER, JSON.stringify(keycloak.tokenParsed));

          setToken(keycloak?.token);
          setUser(keycloak.tokenParsed as any);
        }
      } catch (error) {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        localStorage.removeItem(USER);

        setToken("");
        setUser(undefined);
      } finally {
        setLoading(false);
      }
    };

    initKeycloak();
  }, []);

  const logout = () => {
    setLoading(true);
    if (keycloak) {
      keycloak?.logout();
    }
  };

  return (
    <AuthContext.Provider value={{ logout, token, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
