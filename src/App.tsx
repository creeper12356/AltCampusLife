import { Button } from '@ant-design/react-native';
import { getCurrentUserId, logout } from '@creeper12356/altcampuslifeservice';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import CameraPage from './page/CameraPage.tsx';
import ChargePage from './page/ChargePage.tsx';
import DebugPage from './page/DebugPage.tsx';
import LoginPage from './page/LoginPage.tsx';
import { NavigationProps, StackLoggedInParamList, StackNotLoggedInParamList } from './page/RootStackParamList.ts';
import { LoggedInContext } from './context/LoggedInContext.ts';
import { NavigationContainer } from '@react-navigation/native';

const StackLoggedIn = createNativeStackNavigator<StackLoggedInParamList>();
const StackNotLoggedIn = createNativeStackNavigator<StackNotLoggedInParamList>();

function App(): React.JSX.Element {
  const [isLoggedIn, setLoggedIn] = useState(true);
  useEffect(() => {
    getCurrentUserId().then(userid => {
      setLoggedIn(userid !== 0);
    })
  }, [])
  const pagesLoggedIn = (
    <StackLoggedIn.Navigator>
      <StackLoggedIn.Screen
        name="Charge"
        component={ChargePage}
        options={({ navigation }: { navigation: NavigationProps }) => ({
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
