import { ChargeStatus } from '../model/ChargeStatus.ts';
import { List, Text } from '@ant-design/react-native';
import React from 'react';

const ChargeStatusDataResultList = ({
  result,
}: {
  result: ChargeStatus;
}) => {
  return (
    <List style={{alignSelf: 'flex-start', width: '100%'}}>
      <List.Item>{result.chargestatus}</List.Item>
      <List.Item>{result.position}</List.Item>
      <List.Item>{result.bgtime}</List.Item>
      <List.Item>{result.duration}</List.Item>
      <List.Item>{result.quantity}</List.Item>
      <List.Item>{result.price}</List.Item>
      <List.Item>{result.price}</List.Item>
    </List>
  );
};
export default ChargeStatusDataResultList;
