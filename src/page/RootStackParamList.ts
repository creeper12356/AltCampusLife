import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type StackLoggedInParamList = {
    Charge: undefined;
    Debug: undefined;
    Camera: {updateQRCode: (qrcode: string) => void}
};
export type StackNotLoggedInParamList = {
    Login: undefined;
}

export type NavigationProps = NativeStackNavigationProp<StackLoggedInParamList>;