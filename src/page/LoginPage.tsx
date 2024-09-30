import {
  Button,
  InputItem,
  List,
  Provider,
  Toast,
} from '@ant-design/react-native';
import { login } from '@creeper12356/altcampuslifeservice';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { BackHandler, View } from 'react-native';
import { NavigationProps } from './RootStackParamList';
const LoginPage = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigation = useNavigation<NavigationProps>();
  useEffect(() => {
    // 响应返回键按下，退出应用
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  const handleLogin = (username: string, password: string) => {
    login(username, password)
      .then(result => {
        console.log(JSON.stringify(result));
        Toast.success({ content: '登录成功！' });
        navigation.navigate('Charge');
      })
      .catch(e => {
        console.log(e)
        Toast.fail({ content: '登录失败！' + JSON.stringify(e) });
      });
  };

  return (
    <Provider>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}>
        <View
          style={{
            width: '85%',
            height: '80%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <List style={{ width: '100%' }}>
            <View
              style={{
                padding: 20,
                margin: 4,
                borderColor: 'grey',
                borderWidth: 1,
                borderRadius: 15,
              }}>
              <InputItem
                clear
                type="text"
                value={username}
                onChange={(value: string) => {
                  setUsername(value);
                }}
                placeholder={'账号'}
              />
              <InputItem
                clear
                type="password"
                value={password}
                onChange={(value: string) => {
                  setPassword(value);
                }}
                placeholder={'密码'}
              />
              <Button
                type="primary"
                onPress={() => {
                  handleLogin(username, password);
                }}>
                登录
              </Button>
            </View>
          </List>
        </View>
      </View>
    </Provider>
  );
};
export default LoginPage;
