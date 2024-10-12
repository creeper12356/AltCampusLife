import { Button } from '@ant-design/react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import CameraPage from './page/CameraPage.tsx';
import ChargePage from './page/ChargePage.tsx';
import DebugPage from './page/DebugPage.tsx';
import LoginPage from './page/LoginPage.tsx';
import { NavigationProps, StackLoggedInParamList, StackNotLoggedInParamList } from './page/RootStackParamList.ts';
import { LoggedInContext } from './context/LoggedInContext.ts';
import { NavigationContainer } from '@react-navigation/native';
import altcampusservice from '@creeper12356/altcampuslifeservice';
import SettingsPage from './page/SettingsPage.tsx';
const StackLoggedIn = createNativeStackNavigator<StackLoggedInParamList>();
const StackNotLoggedIn = createNativeStackNavigator<StackNotLoggedInParamList>();

function App(): React.JSX.Element {
  const [isLoggedIn, setLoggedIn] = useState(true);
  // note: 设置isDebugMode为true开启调试页面
  const [isDebugMode, _] = useState(false);
  useEffect(() => {
    altcampusservice.isLoggedIn()
      .then(bl => {
        setLoggedIn(bl);
      });
  }, [])
  const pagesLoggedIn = (
    <StackLoggedIn.Navigator>
      <StackLoggedIn.Screen
        name="Charge"
        component={ChargePage}
        options={({ navigation }: { navigation: NavigationProps }) => ({
          headerLeft: () => isDebugMode ? (
            <Button
              type="primary"
              onPress={() => {
                navigation.navigate('Debug');
              }}>
              调试
            </Button>
          ) : <></>,
          headerRight: () => {
            return (
              <Button
                type="primary"
                onPress={() => {
                  altcampusservice.logout();
                  setLoggedIn(false);
                }}>
                登出
              </Button>
            );
          }
        })
        }
      />
      <StackLoggedIn.Screen name="Debug" component={DebugPage} />
      <StackLoggedIn.Screen name="Camera" component={CameraPage} />
      <StackLoggedIn.Screen name="Settings" component={SettingsPage} />
    </StackLoggedIn.Navigator>
  );
  const pagesNotLoggedIn = (
    <StackNotLoggedIn.Navigator>
      <StackNotLoggedIn.Screen
        name="Login"
        component={LoginPage}
        options={{ headerLeft: () => <></> }}
      />
    </StackNotLoggedIn.Navigator>
  );
  return <LoggedInContext.Provider value={{
    isLoggedIn: isLoggedIn,
    setLoggedIn: setLoggedIn
  }}>
    <NavigationContainer>
      {isLoggedIn ? pagesLoggedIn : pagesNotLoggedIn}
    </NavigationContainer>
  </LoggedInContext.Provider>
}

export default App;
