import { CHARGE_URL, USER_URL, postOrderWithUserId } from "@creeper12356/altcampuslifeservice";

export const getAccountInfo = async () => {
  const result = await postOrderWithUserId(USER_URL, {
    ordertype: 'accountinfo',
    acid: 0,
    origin: 'cloud',
  });
  return result;
};

export const getJacount = async () => {
  const result = await postOrderWithUserId(CHARGE_URL, {
    ordertype: 'jacount',
    origin: 'cloud',

  });
  return result;
};
