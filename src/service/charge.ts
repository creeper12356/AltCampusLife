import { CHARGE_URL, postOrder, postOrderWithUserId } from "@creeper12356/altcampuslifeservice";

export const doCharge = async (qrcode: number) => {
  const doChargeResult = await postOrderWithUserId(CHARGE_URL, {
    ordertype: 'docharge',
    qrcode: qrcode,
    origin: 'cloud',
  });
  return doChargeResult;
};

export const getChargeStatus = async () => {
  const getChargeStatusResult = await postOrderWithUserId(CHARGE_URL, {
    ordertype: 'chargestatus',
    origin: 'cloud',
  });
  return getChargeStatusResult;
};

export const getChargeList = async () => {
  const getChargeListResult = await postOrder(CHARGE_URL, {
    ordertype: 'getlist',
    origin: 'cloud',
  });
  return getChargeListResult;
};

export const getPriceInfo = async () => {
  const result = await postOrderWithUserId(CHARGE_URL, {
    ordertype: 'priceinfo',
    origin: 'cloud',
  });
  return result;
}

export const getChargeRecords = async (yy: string, mm: string) => {
  const result = await postOrderWithUserId(CHARGE_URL, {
    ordertype: 'chargerecords',
    origin: 'cloud',
    yy: yy,
    mm: mm,
  });
  return result;
}


