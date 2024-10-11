import { Toast } from "@ant-design/react-native";

export const messageDuration = 0.5;


export function messageError(e: any) {
    let errorStr: string = typeof (e) == 'string' ? e : '网络错误';
    Toast.fail({ content: errorStr, duration: messageDuration });
}

export function messageOk(okStr: string) {
    Toast.success({ content: okStr, duration: messageDuration });
}
