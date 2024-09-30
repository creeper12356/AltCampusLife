import { CHARGE_URL, LOGIN_URL, USER_URL, getCurrentUserId, postOrderWithUserId } from "@creeper12356/altcampuslifeservice";

export const getUserInfo = async () => {
  const userInfo = await postOrderWithUserId(USER_URL, {
    ordertype: 'accountinfo',
    acid: 0,
    origin: 'cloud',
  });
  console.log(userInfo);
  console.log(await getCurrentUserId())
  return userInfo;
  // // @ts-ignore
  // return userInfo.data.result1[0];
};

export const getJacount = async () => {
  const result = await postOrderWithUserId(CHARGE_URL, {
    ordertype: 'jacount',
    origin: 'cloud',

  });
  return result;
};

export const register = async () => {
  const result = await postOrderWithUserId(LOGIN_URL, {
    ordertype: 'register',
    phone: '18950071508',
    logpass: '12345678',
    verificationcode: '7895',
  });
  return result;
};