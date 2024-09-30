import { Provider, Button, InputItem, Input, View, Toast } from "@ant-design/react-native";
import { useState } from "react";
import { SafeAreaView, Text } from "react-native";
import { doCharge, getChargeList, getChargeRecords, getPriceInfo } from "../service/charge";
// import Clipboard from "@react-native-community/clipboard";
import { getJacount, getUserInfo, register } from "../service/user";

const DebugPage = () => {
    const [qrcode, setQrcode] = useState<string>('');

    const handleResponse = (result: any) => {
        let resultString = JSON.stringify(result);
        console.log(resultString);
        Toast.info({ content: resultString, duration: 0.5 });
        // Clipboard.setString(resultString);
    }
    return (
        <Provider>
            <SafeAreaView>
                <Text>Debug</Text>
                <View>
                    <Input
                        value={qrcode}
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
                        getUserInfo()
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
                        getChargeRecords()
                            .then(handleResponse)
                            .catch(handleResponse);
                    }}>chargerecords</Button>
                </View>

                <View>
                    <Button type="primary" onPress={() => {
                        register()
                            .then(handleResponse)
                            .catch(handleResponse);
                    }}>register</Button>
                </View>

            </SafeAreaView>
        </Provider>);
}

export default DebugPage;