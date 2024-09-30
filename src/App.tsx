import { Button } from '@ant-design/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ChargePage from './page/ChargePage.tsx';
import DebugPage from './page/DebugPage.tsx';
import LoginPage from './page/LoginPage.tsx';
import { RootStackParamList } from './page/RootStackParamList.ts';
import { logout } from '@creeper12356/altcampuslifeservice';
import Camera from './page/Camera.tsx';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{ headerLeft: () => <></> }}
        />
        <Stack.Screen
          name="Charge"
          component={ChargePage}
          options={({ navigation }) => ({
            headerLeft: () => (
              <Button
                type="primary"
                onPress={() => {
                  navigation.navigate('Debug');
                }}>
                调试
              </Button>
            ),
            headerRight: () => {
              return (
                <Button
                  type="primary"
                  onPress={() => {
                    logout();
                    navigation.navigate('Login');
                  }}>
                  登出
                </Button>
              );
            }
          })
          }
        />
        <Stack.Screen name="Debug" component={DebugPage} />
        <Stack.Screen name="Camera" component={Camera} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
