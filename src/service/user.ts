import { USER_URL, postOrderWithUserId } from "@creeper12356/altcampuslifeservice";

export const getUserInfo = async () => {
  const userInfo = await postOrderWithUserId(USER_URL, {
    ordertype: 'accountinfo',
    acid: 0,
    origin: 'cloud',
  });
  // @ts-ignore
  return userInfo.data.result1[0];
};
