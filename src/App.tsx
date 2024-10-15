import { Button, Provider } from '@ant-design/react-native';
import altcampusservice from '@creeper12356/altcampuslifeservice';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { LoggedInContext } from './context/LoggedInContext.ts';
import { StylesContext } from './context/StylesContext.ts';
import { ThemeContext } from './context/ThemeContext.ts';
import CameraPage from './page/CameraPage.tsx';
import ChargePage from './page/ChargePage.tsx';
import DebugPage from './page/DebugPage.tsx';
import LoginPage from './page/LoginPage.tsx';
import { NavigationProps, StackLoggedInParamList, StackNotLoggedInParamList } from './page/RootStackParamList.ts';
import SettingsPage from './page/SettingsPage.tsx';
import { darkAntdTheme, lightAntdTheme } from './theme/default.tsx';

const StackLoggedIn = createNativeStackNavigator<StackLoggedInParamList>();
const StackNotLoggedIn = createNativeStackNavigator<StackNotLoggedInParamList>();

function App(): React.JSX.Element {
  const [isLoggedIn, setLoggedIn] = useState(true);
  const [theme, setTheme] = useState<object>(lightAntdTheme);
  const [styles, setStyles] = useState<object>({});

  const colorScheme = useColorScheme();

  useEffect(() => {
    // 当theme改变时，触发styles更新
    setStyles(StyleSheet.create({
      global: {
        // @ts-ignore
        backgroundColor: theme.fill_body
      },
      buttonText: {
        // @ts-ignore
        color: theme.color_text_base_inverse
      },
      balanceIcon: {
        // @ts-ignore
        color: theme.color_text_base,
      },
      balanceText: {
        fontSize: 30,
        // @ts-ignore
        color: theme.color_text_base,
      },
      headerStyle: {
        // @ts-ignore
        backgroundColor: theme.fill_base,
      }
    }));
  }, [theme]);

  useEffect(() => {
    setTheme(colorScheme === 'light' ? lightAntdTheme : darkAntdTheme);
  }, [colorScheme]);

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
          },
          // @ts-ignore
          headerStyle: styles.headerStyle,
          // @ts-ignore
          headerTintColor: theme.color_text_base,
          headerTitle: '充电'
        })
        }
      />
      <StackLoggedIn.Screen
        name="Debug"
        component={DebugPage}
        options={{
          headerTitle: '调试',
          // @ts-ignore
          headerStyle: styles.headerStyle,
          // @ts-ignore
          headerTintColor: theme.color_text_base,
        }}
      />
      <StackLoggedIn.Screen
        name="Camera"
        component={CameraPage}
        options={{
          headerTitle: '扫码',
          // @ts-ignore
          headerStyle: styles.headerStyle,
          // @ts-ignore
          headerTintColor: theme.color_text_base,
        }}
      />
      <StackLoggedIn.Screen
        name="Settings"
        component={SettingsPage}
        options={{
          headerTitle: '设置',
          // @ts-ignore
          headerStyle: styles.headerStyle,
          // @ts-ignore
          headerTintColor: theme.color_text_base,
        }}
      />
    </StackLoggedIn.Navigator>
  );
  const pagesNotLoggedIn = (
    <StackNotLoggedIn.Navigator>
      <StackNotLoggedIn.Screen
        name="Login"
        component={LoginPage}
        options={{
          headerTitle: '登录',
          // @ts-ignore
          headerStyle: styles.headerStyle,
          // @ts-ignore
          headerTintColor: theme.color_text_base,
        }}
      />
    </StackNotLoggedIn.Navigator>
  );
  return <ThemeContext.Provider value={{
    theme: theme,
    setTheme: setTheme
  }}>
    <StylesContext.Provider value={{
      styles: styles,
      setStyles: setStyles,
    }}>
      <LoggedInContext.Provider value={{
        isLoggedIn: isLoggedIn,
        setLoggedIn: setLoggedIn
      }}>
        <Provider theme={theme}>
          <NavigationContainer>
            {isLoggedIn ? pagesLoggedIn : pagesNotLoggedIn}
          </NavigationContainer>
        </Provider>
      </LoggedInContext.Provider>
    </StylesContext.Provider>
  </ThemeContext.Provider >
}

export default App;
