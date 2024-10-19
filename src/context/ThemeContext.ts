import { createContext } from "react";

/**
 * ThemeContext: 
 * 全局主题设置
 */
export const ThemeContext = createContext<{
    theme: object,
    setTheme: (theme: object) => void
}>({
    theme: {},
    setTheme: (theme) => { },
});