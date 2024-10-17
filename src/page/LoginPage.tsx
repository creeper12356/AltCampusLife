import {
  Button,
  Icon,
  Input,
  List
} from '@ant-design/react-native';
import { login } from '@creeper12356/altcampuslifeservice';
import React, { useContext, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { LoggedInContext } from '../context/LoggedInContext';
import { StylesContext } from '../context/StylesContext';
import { messageDuration, messageError, messageOk } from '../utils/message';

const LoginPage = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { setLoggedIn } = useContext(LoggedInContext);
  const { styles, setStyles } = useContext(StylesContext);

  const handleLogin = (username: string, password: string) => {
    login(username, password)
      .then(result => {
        messageOk('登录成功！');
        setTimeout(() => {
          setLoggedIn(true);
        }, messageDuration * 1000);
      })
      .catch(e => {
        messageError(e);
      });
  };

  return (
    <View style={{
      alignItems: 'stretch',
      justifyContent: 'center',
      flex: 1,
      paddingHorizontal: '10%',
      gap: '20%',
      // @ts-ignore
      ...styles.global
    }}>
      <Image
        style={{ width: 100, height: 100, alignSelf: 'center' }}
        source={{
          uri: 'https://gitee.com/creeper12356/AltCampusLife/releases/download/v1.0.1/ic_launcher.png',
        }}
      />
      <Text style={{ alignSelf: 'center', fontSize: 20 }}>AltCampusLife</Text>
      <List>
        <View style={{ display: 'flex', gap: '20%' }}>
          <List.Item style={{borderRadius: 10}}>
            <Input
              allowClear={{ clearIcon: <Icon name="close-circle" /> }}
              type="text"
              value={username}
              onChangeText={(value: string) => {
                setUsername(value);
              }}
              placeholder={'账号'}
            />
          </List.Item>
          <List.Item style={{borderRadius: 10}}>
            <Input
              allowClear={{ clearIcon: <Icon name="close-circle" /> }}
              type="password"
              value={password}
              onChangeText={(value: string) => {
                setPassword(value);
              }}
              placeholder={'密码'}
            />
          </List.Item>
        </View>
      </List>

      <Button
        style={{ marginHorizontal: '20%', marginTop: '5%' }}
        type="primary"
        onPress={() => {
          handleLogin(username, password);
        }}>
        登录
      </Button>
      <Text style={{ marginTop: '20%' }}>注：现阶段您可以使用 东晟校园生活 的账号密码登录，以后会开放用户注册功能。:)</Text>
    </View>
  );
};
export default LoginPage;
