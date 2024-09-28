import { LOGIN_URL, postOrder, USER_URL } from "./common.ts";
import { LoginInfo } from "../model/LoginInfo.ts";

export const getUserInfo = async (userId: number) => {
  const userInfo = await postOrder(USER_URL, {
    ordertype: 'accountinfo',
    userid: userId,
    acid: 0,
    origin: 'cloud',
  });
  // @ts-ignore
  return userInfo.data.result1[0];
};

export const login = async (
  username: string,
  password: string,
): Promise<LoginInfo> => {
  const loginResult = await postOrder(LOGIN_URL, {
    ordertype: 'login',
    phone: username,
    logpass: password,
  });
  // @ts-ignore
  if (loginResult.state !== '1') {
    throw loginResult;
  }
  return loginResult as LoginInfo;
};
