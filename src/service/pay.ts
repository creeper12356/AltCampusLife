import { PREFIX, postOrderWithUserId } from "@creeper12356/altcampuslifeservice";

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