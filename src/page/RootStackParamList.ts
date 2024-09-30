import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
    Login: undefined;
    Charge: undefined;
    Debug: undefined;
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;