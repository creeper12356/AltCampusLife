import { createContext } from "react";

export const ThemeContext = createContext<{
    theme: object,
    setTheme: (theme: object) => void
}>({
    theme: {},
    setTheme: (theme) => { },
});