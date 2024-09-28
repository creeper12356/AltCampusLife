import {ChargeStatusDataResult} from './ChargeStatusDataResult.ts';

export interface ChargeStatusInfo {
  state: string;
  note: string;
  data: {result1: ChargeStatusDataResult[]};
}
