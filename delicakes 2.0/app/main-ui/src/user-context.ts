import { createContext } from "react";

export type User = {
  name: string;
  email: string;
};

export type UserContextValue = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const UserContext = createContext<UserContextValue | undefined>(undefined);
