import { Button, InputItem, List, Provider, Toast } from '@ant-design/react-native';
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import ChargeStatusDataResultList from '../component/ChargeStatusDataResultList.tsx';
import { ChargeStatusDataResult } from '../model/ChargeStatusDataResult.ts';
import { doCharge, getChargeStatus } from '../service/charge.ts';
import { logout } from '@creeper12356/altcampuslifeservice';

const ChargePage = () => {
  const [inputValue, setInputValue] = useState('');
  const [chargeStatusDataResult, setChargeStatusDataResult] =
    useState<ChargeStatusDataResult | null>(null);
  const navigation = useNavigation();
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
    setInputValue(numericValue);
  };
  const handleDoCharge = () => {
    doCharge(Number(inputValue))
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
        <Button type="primary" style={{ alignSelf: 'flex-end' }} onPress={() => {
          logout();
          navigation.navigate('Login');
        }}>登出</Button>
        <View style={{ height: '50%' }}>
          {chargeStatusDataResult != null && (
            <ChargeStatusDataResultList
              result={chargeStatusDataResult as ChargeStatusDataResult}
            />
          )}
        </View>
        <View style={{ height: '50%', justifyContent: 'flex-end' }}>
          <List>
            <InputItem
              clear
              autoFocus={false}
              type="number"
              onChangeText={handleChange}
              value={inputValue}
              placeholder="输入序列号后8位"
            />
            <Button type="primary" onPress={handleDoCharge}>
              {chargeStatusDataResult == null ? '充电' : '充电中'}
            </Button>
          </List>
        </View>
      </SafeAreaView>
    </Provider>);
};

// const styles = StyleSheet.create({
//   input: {
//     width: 250,
//     height: 50,
//     borderWidth: 2,
//     borderColor: "#3498db",
//     borderRadius: 10,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     fontSize: 18,
//     color: "#333",
//     backgroundColor: "#fff",
//   },
// });
export default ChargePage;
