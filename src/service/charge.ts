import { CHARGE_URL, postOrder, postOrderWithUserId } from "@creeper12356/altcampuslifeservice";
import { ChargeStatusInfo } from "../model/ChargeStatusInfo";
import { LoginInfo } from "@creeper12356/altcampuslifeservice";

export const doCharge = async (qrcode: number) => {
  const doChargeResult = await postOrderWithUserId(CHARGE_URL, {
    ordertype: 'docharge',
    qrcode: qrcode,
    origin: 'cloud',
  }) as LoginInfo;
  if (doChargeResult.state !== '1') {
    throw doChargeResult;
  }
  return doChargeResult;
};

export const getChargeStatus = async (): Promise<ChargeStatusInfo> => {
  const getChargeStatusResult = await postOrderWithUserId(CHARGE_URL, {
    ordertype: 'chargestatus',
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
