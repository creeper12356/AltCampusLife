import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect } from 'react';
import { UserContext } from '../lib/context.ts';
const PrivateLayout = ({children}: {children: React.ReactNode}) => {
  const {userId} = useContext(UserContext);
  const navigation = useNavigation();
  useEffect(() => {
    if (userId === 0) {
      console.log('unauthorized');
      navigation.navigate('Login');
    }
  }, [navigation, userId]);

  return <>{children}</>;
};
export default PrivateLayout;
