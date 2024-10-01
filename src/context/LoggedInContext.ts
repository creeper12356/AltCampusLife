import { createContext } from "react";

export const LoggedInContext = createContext({
    isLoggedIn: false,
    setLoggedIn: (loggedIn: boolean) => {
    }
});