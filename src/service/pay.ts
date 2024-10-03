import { PREFIX, postOrderWithUserId } from "@creeper12356/altcampuslifeservice";
import Alipay from '@uiw/react-native-alipay';

const PAY_URL = PREFIX + '/PayService';

export const payApply = async (money: number) => {
    const result = await postOrderWithUserId(PAY_URL, {
        ordertype: 'payapply',
        origin: 'cloud',
        paymoney: money,
        paytype: 1,
    });

    return result;
}

export const payApplyReturn = async (returnContent: string) => {
    const result = await postOrderWithUserId(PAY_URL, {
        ordertype: 'payapplyreturn',
        returncontent: returnContent,
    });
    return result;
}

export async function handleDoPay(payMoney: number) {
    const payApplyResult = await payApply(payMoney);
    //@ts-ignore
    const alipayResult = await Alipay.alipay(payApplyResult.data.result1[0].orderinfo);
    const payApplyReturnResult = await payApplyReturn(JSON.stringify(alipayResult));
    return payApplyReturnResult;
}