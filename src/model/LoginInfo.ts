import {LoginDataResult} from './LoginDataResult.ts';

export interface LoginInfo {
  state: string;
  note: string;
  data: {result1: LoginDataResult[]};
}
