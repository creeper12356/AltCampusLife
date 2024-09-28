import { CHARGE_URL, postOrder } from "./common.ts";
// import ChargePileInfo from '../model/ChargePileInfo.ts';
import { ChargeStatusInfo } from "../model/ChargeStatusInfo.ts";

export const doCharge = async (qrcode: number, userId: number) => {
  const doChargeResult = await postOrder(CHARGE_URL, {
    ordertype: 'docharge',
    userid: userId,
    qrcode: qrcode,
    origin: 'cloud',
  });
  // @ts-ignore
  if (doChargeResult.state !== '1') {
    throw doChargeResult;
  }
  return doChargeResult;
};

export const getChargeStatus = async (
  userId: number,
): Promise<ChargeStatusInfo> => {
  const getChargeStatusResult = await postOrder(CHARGE_URL, {
    ordertype: 'chargestatus',
    userid: userId,
    origin: 'cloud',
  });
  console.log(JSON.stringify(getChargeStatusResult));
  return getChargeStatusResult as ChargeStatusInfo;
};

export const getChargeList = async () => {
  const getChargeListResult = await postOrder(CHARGE_URL, {
    ordertype: 'getlist',
    origin: 'cloud',
  });
  return getChargeListResult;
};
// export const getChargePileList = async (
//   rid: number,
// ): Promise<ChargePileInfo[]> => {
//   const getChargePileListResult = await postOrder(CHARGE_URL, {
//     ordertype: 'getsublist',
//     origin: 'cloud',
//     rid: rid,
//   });
//   // @ts-ignore
//   return getChargePileListResult.data.result1 as ChargePileInfo[];
// };
