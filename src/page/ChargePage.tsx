import { Button, Icon, Input, InputItem, List, Text } from '@ant-design/react-native';
import { RouteProp } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from 'react';
import { AppState, PermissionsAndroid, SafeAreaView, View } from 'react-native';
import { AccountInfoDataResult } from '../model/AccountInfoDataResult.ts';
import { ChargeStatusDataResult } from '../model/ChargeStatusDataResult.ts';
import { doCharge, getChargeStatus } from '../service/charge.ts';
import { handleDoPay } from '../service/pay.ts';
import { getAccountInfo } from '../service/user.ts';
import { messageError, messageOk } from '../utils/message.ts';
import { NavigationProps, StackLoggedInParamList } from './RootStackParamList.ts';
import { StylesContext } from '../context/StylesContext.ts';

const ChargePage = ({ navigation }: { route: RouteProp<StackLoggedInParamList>, navigation: NavigationProps }) => {
  const [chargeStatusDataResult, setChargeStatusDataResult] =
    useState<ChargeStatusDataResult | null>(null);
  const [accountInfo, setAccountInfo] = useState<AccountInfoDataResult | null>(null);
  const [qrcode, setQRCode] = useState('');
  const [payMoneyStr, setPayMoneyStr] = useState<string>('');

  const { styles, setStyles } = useContext(StylesContext);

  const refreshChargeStatus = () => {
    getChargeStatus()
      .then(result => {
        // @ts-ignore
        setChargeStatusDataResult(result.data.result1[0] as ChargeStatusDataResult);
      })
      .catch(e => {
        console.log(e);
        setChargeStatusDataResult(null);
      });
  };
  const refreshAccountInfo = () => {
    getAccountInfo()
      .then(result => {
        //@ts-ignore
        setAccountInfo(result.data.result1[0] as AccountInfoDataResult);
      })
      .catch(e => {
        console.log(e);
        setAccountInfo(null);
      })
  };

  const refreshPageStatus = () => {
    refreshChargeStatus();
    refreshAccountInfo();
  }

  useEffect(() => {
    const unsubscribeNavigation = navigation.addListener('focus', refreshPageStatus);
    const appStateListener = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        refreshPageStatus();
      }
    });

    return () => {
      unsubscribeNavigation();
      appStateListener.remove();
    }
  }, []);

  const handleDoChargeClicked = () => {
    if (chargeStatusDataResult != null) {
      return;
    }
    doCharge(Number(qrcode))
      .then(result => {
        // @ts-ignore
        messageOk(result.note);
        refreshChargeStatus();
      })
      .catch(e => {
        messageError(e);
      });
  };
  const handleScanClicked = async () => {
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
  };
  const handleDoPayClicked = () => {
    console.log(payMoneyStr);
    let payMoney = Number(payMoneyStr);
    if (isNaN(payMoney) || payMoney <= 0) {
      setPayMoneyStr('');
      messageError('请输入合法的金额！');
      return;
    }
    handleDoPay(payMoney)
      .then(result => {
        // @ts-ignore
        messageOk(result.note);
      })
      .catch(e => {
        messageError(e);
      })
      .finally(() => {
        refreshAccountInfo();
      })
  }
  return (
    // @ts-ignore
    <SafeAreaView style={{ justifyContent: 'space-between', flex: 1, ...styles.global }}>
      <View>
        <List renderHeader="充电">
          <List.Item>
            <Input
              allowClear={{ clearIcon: <Icon name="close-circle" /> }}
              autoFocus={false}
              type="number"
              onChangeText={(text) => {
                setQRCode(text);
              }}
              value={qrcode}
              placeholder="输入序列号后8位"
            />
          </List.Item>
          <List.Item>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
              <Button type="primary" onPress={handleDoChargeClicked}>
                <Icon name="thunderbolt" />

                {/* @ts-ignore */}
                <Text style={styles.buttonText}>{chargeStatusDataResult == null ? '充电' : '充电中'}</Text>
              </Button>
              <Button type="primary" onPress={handleScanClicked}>
                <Icon name="scan" />

                {/* @ts-ignore */}
                <Text style={styles.buttonText}>扫码</Text>
              </Button>
            </View>
          </List.Item>
        </List>
        <List renderHeader="充值">
          <List.Item>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              {/* @ts-ignore */}
              <Icon style={styles.balanceIcon} name='wallet' />

              {/* @ts-ignore */}
              <Text style={styles.balanceText}>{accountInfo?.acbalance}</Text>
            </View>
          </List.Item>
          <List.Item>
            <Input
              allowClear={{ clearIcon: <Icon name="close-circle" /> }}
              type="number"
              onChangeText={(text) => {
                setPayMoneyStr(text);
              }}
              value={payMoneyStr}
              placeholder="输入充值金额"
            />
          </List.Item>
          <List.Item>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
              <Button type='ghost' onPress={() => { setPayMoneyStr('1.5'); }}>1.5</Button>
              <Button type='ghost' onPress={() => { setPayMoneyStr('3.0'); }}>3.0</Button>
              <Button type='ghost' onPress={() => { setPayMoneyStr('6.0'); }}>6.0</Button>
              <Button type='ghost' onPress={() => { setPayMoneyStr('15.0'); }}>15.0</Button>
            </View>
          </List.Item>
          <List.Item>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
              <Button type="primary" onPress={handleDoPayClicked}>
                <Icon name="alipay-circle" />

                {/* @ts-ignore */}
                <Text style={styles.buttonText}>充值</Text>
              </Button>
            </View>
          </List.Item>
        </List>
      </View>
      <Button type='ghost' onPress={() => {
        navigation.navigate('Settings');
      }}>设置</Button>
    </SafeAreaView>);
};
export default ChargePage;
