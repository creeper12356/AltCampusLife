import {
  Button,
  Icon,
  Input,
  InputItem,
  List
} from '@ant-design/react-native';
import { login } from '@creeper12356/altcampuslifeservice';
import React, { useContext, useState } from 'react';
import { View } from 'react-native';
import { LoggedInContext } from '../context/LoggedInContext';
import { messageDuration, messageError, messageOk } from '../utils/message';
import { StylesContext } from '../context/StylesContext';

const LoginPage = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { setLoggedIn } = useContext(LoggedInContext);
  const {styles, setStyles} = useContext(StylesContext);

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
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        // @ts-ignore
        ...styles.global,
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
            <Input
              allowClear={{clearIcon: <Icon name="close-circle" />}}
              type="text"
              value={username}
              onChangeText={(value: string) => {
                setUsername(value);
              }}
              placeholder={'账号'}
            />
            <Input
              allowClear={{clearIcon: <Icon name="close-circle" />}}
              type="password"
              value={password}
              onChangeText={(value: string) => {
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
  );
};
export default LoginPage;
