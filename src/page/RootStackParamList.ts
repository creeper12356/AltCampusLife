import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
    Login: undefined;
    Charge: undefined;
    Debug: undefined;
    Camera: {updateQRCode: (qrcode: string) => void}
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;