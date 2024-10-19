import { createContext } from "react";

/**
 * 全局风格设置
 */
export const StylesContext = createContext<{
    styles: object,
    setStyles: (styles: object) => void }>(
    {
        styles: {},
        setStyles: (styles) => {},
    }
);