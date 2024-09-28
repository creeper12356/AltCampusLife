import { createContext } from "react";

export const UserContext = createContext({
  userId: 28490,
  setUserId: (userId: number) => {},
});
