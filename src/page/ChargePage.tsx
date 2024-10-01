import { Button, InputItem, List, Provider, Toast } from '@ant-design/react-native';
import { RouteProp, useFocusEffect, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from 'react';
import { PermissionsAndroid, SafeAreaView, View } from 'react-native';
import ChargeStatusDataResultList from '../component/ChargeStatusDataResultList.tsx';
import { ChargeStatusDataResult } from '../model/ChargeStatusDataResult.ts';
import { doCharge, getChargeStatus } from '../service/charge.ts';
import { NavigationProps, RootStackParamList } from './RootStackParamList.ts';

const ChargePage = ({ navigation }: { route: RouteProp<RootStackParamList>, navigation: NavigationProps }) => {
  const [chargeStatusDataResult, setChargeStatusDataResult] =
    useState<ChargeStatusDataResult | null>(null);
  const [qrcode, setQRCode] = useState('');
  const refreshChargeStatus = () => {
    console.log('refresh');
    getChargeStatus().then(result => {
      if (result.state === '1') {
        setChargeStatusDataResult(result.data.result1[0]);
      } else {
        setChargeStatusDataResult(null);
      }
    });
  };
  useEffect(() => {
    refreshChargeStatus();
  }, []);
  const handleChange = (text: string) => {
    // Allow only numbers
    const numericValue = text.replace(/[^0-9]/g, '');
    setQRCode(numericValue);
  };
  const handleDoCharge = () => {
    doCharge(Number(qrcode))
      .then(result => {
        Toast.info({ content: JSON.stringify(result) });
      })
      .catch(e => {
        Toast.fail({ content: JSON.stringify(e) });
      })
      .finally(() => {
        refreshChargeStatus();
      });
  };
  return (
    <Provider>
      <SafeAreaView>
        <View>
          {chargeStatusDataResult != null && (
            <ChargeStatusDataResultList
              result={chargeStatusDataResult as ChargeStatusDataResult}
            />
          )}
        </View>
        <View style={{ justifyContent: 'flex-end' }}>
          <List>
            <InputItem
              clear
              autoFocus={false}
              type="number"
              onChangeText={handleChange}
              value={qrcode}
              placeholder="输入序列号后8位"
            />
            <Button type="primary" onPress={handleDoCharge}>
              {chargeStatusDataResult == null ? '充电' : '充电中'}
            </Button>
          </List>
        </View>
        <Button onPress={async () => {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //跳转至扫码组件，即可开始扫码
            navigation.navigate('Camera', { updateQRCode: (qrcode: string) => { setQRCode(qrcode); } });
          } else {
            console.log('拒绝');
            return;
          }
        }}>扫码</Button>

      </SafeAreaView>
    </Provider>);
};
export default ChargePage;
