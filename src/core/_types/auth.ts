import { ReactNode } from "react";

export interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthContextType {
  logout: () => void;
  token?: string | undefined;
  user?: any;
  loading: boolean;
}
