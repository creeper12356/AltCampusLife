import React, {useEffect, useState} from 'react';
import ChargePage from './page/ChargePage.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginPage from './page/LoginPage.tsx';
import { Text } from '@ant-design/react-native';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const [userId, setUserId] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    AsyncStorage.getItem('userId')
      .then(res => {
        if (typeof res === 'string') {
          console.log('read userid from db: ' + res);
          setUserId(Number(res));
          setLoading(false);
        }
      })
      .catch(e => {
        console.log(e);
      });
  }, []);
  useEffect(() => {
    console.log('write userid to db.');
    AsyncStorage.setItem('userId', userId.toString())
      .catch(e => { console.log(e); });
  }, [userId]);
  if (loading) {
    return <Text>loading</Text>;
  } else {
    return (
      <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Charge" component={ChargePage} />
            <Stack.Screen
              name="Login"
              component={LoginPage}
              options={{headerLeft: () => <></> }}
            />
          </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
