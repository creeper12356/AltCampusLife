import { createContext } from "react";
import { ViewStyle, StyleProp } from "react-native";
export const StylesContext = createContext<{
    styles: object,
    setStyles: (styles: object) => void }>(
    {
        styles: {},
        setStyles: (styles) => {},
    }
);