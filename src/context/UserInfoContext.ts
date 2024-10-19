import { createContext } from "react";
import { UserInfo } from "../model/UserInfo";

/**
 * UserInfoContext
 * 全局用户信息，
 * 是否为空表示是否登录，
 * 所有UserInfo的修改都将被持久化（通过AsyncStorage）
 */
export const UserInfoContext = createContext<{
    userInfo: UserInfo | null,
    setUserInfo: (userInfo: UserInfo | null) => void,
}>({
    userInfo: null,
    setUserInfo: (userInfo) => { },
});