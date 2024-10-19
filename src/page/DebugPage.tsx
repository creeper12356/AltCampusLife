import { Button, Input, View } from "@ant-design/react-native";
import { useContext, useState } from "react";
import { Platform, SafeAreaView, Text } from "react-native";
import { doCharge, getChargeList, getChargeRecords, getPriceInfo } from "../service/charge";
// import Clipboard from "@react-native-community/clipboard";
import { RouteProp } from "@react-navigation/native";
import Alipay from '@uiw/react-native-alipay';
import { payApplyReturn, payApply as payapply } from "../service/pay";
import { getAccountInfo, getJacount, getMessage } from "../service/user";
import { messageOk } from "../utils/message";
import { NavigationProps, StackLoggedInParamList } from "./RootStackParamList";
import { UserInfoContext } from "../context/UserInfoContext";

const DebugPage = ({ navigation }: { route: RouteProp<StackLoggedInParamList>, navigation: NavigationProps }) => {
    const [qrcode, setQrcode] = useState<string>('');
    const { userInfo, setUserInfo } = useContext(UserInfoContext);


    const handleResponse = (result: any) => {
        let resultString = JSON.stringify(result);
        console.log(resultString);
        messageOk(resultString);
    }
    return (
        <SafeAreaView>
            <Text>Debug</Text>
            <Text>运行环境：{Platform.OS} {Platform.Version}</Text>
            <View>
                <Input
                    value={qrcode}
                    placeholder="qrcode"
                    onChange={(e) => {
                        setQrcode(e.nativeEvent.text);
                    }} />
                <Button type="primary" onPress={() => {
                    console.log(qrcode);
                    doCharge(Number(qrcode) ?? 0)
                        .then(handleResponse)
                        .catch(handleResponse);
                }}>docharge</Button>
            </View>
            <View>
                <Button type="primary" onPress={() => {
                    getAccountInfo()
                        .then(handleResponse)
                        .catch(handleResponse);

                }}>accountinfo</Button>
            </View>
            <View>
                <Button type="primary" onPress={() => {
                    getChargeList()
                        .then(handleResponse)
                        .catch(handleResponse);
                }}>getlist</Button>
            </View>
            <View>
                <Button type="primary" onPress={() => {
                    getJacount()
                        .then(handleResponse)
                        .catch(handleResponse);

                }}>jacount</Button>
            </View>
            <View>
                <Button type="primary" onPress={() => {
                    getPriceInfo()
                        .then(handleResponse)
                        .catch(handleResponse);
                }}>priceinfo</Button>
            </View>
            <View>
                <Button type="primary" onPress={() => {
                    getChargeRecords('2024', '05')
                        .then(handleResponse)
                        .catch(handleResponse);
                }}>chargerecords</Button>
            </View>
            <View>
                <Button type="primary" onPress={() => {
                    payapply(0.01)
                        .then(async (result) => {
                            // @ts-ignore
                            const payInfo = result.orderinfo;
                            let res = await Alipay.alipay(payInfo);
                            let res2 = await payApplyReturn(JSON.stringify(res));
                        }).catch(e => {
                            console.log(e);
                        })
                }}>pay</Button>
            </View>
            <View>
                <Button type="primary" onPress={() => {
                    getMessage(userInfo!.username, userInfo!.phone)
                        .then((result) => {
                            messageOk(JSON.stringify(result));
                        })
                        .catch(e => {
                            console.log(e);
                        });

                }}>getmessage</Button>
            </View>
        </SafeAreaView>);
}

export default DebugPage;