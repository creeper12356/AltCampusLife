import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
    Login: undefined;
    Charge: {
        qrcode: string;
    }
    Debug: undefined;
    Camera: undefined;
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;