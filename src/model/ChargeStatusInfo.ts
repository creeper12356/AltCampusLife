import {ChargeStatusDataResult} from './ChargeStatusDataResult';

export interface ChargeStatusInfo {
  state: string;
  note: string;
  data: {result1: ChargeStatusDataResult[]};
}
