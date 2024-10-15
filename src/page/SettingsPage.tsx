// @ts-nocheck
// 本文件中使用库rn-update-apk，用于Android版的自动更新。
// 该库没有typescript文件，因此使用@ts-nocheck禁用类型报错。

import { Form, List, Modal, Switch, View } from "@ant-design/react-native";
import { RouteProp } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { Linking, Platform, ScrollView, Text } from "react-native";
import * as Progress from 'react-native-progress';
import * as UpdateAPK from "rn-update-apk";
import { version } from '../../package.json';
import { StylesContext } from "../context/StylesContext";
import { messageError, messageOk } from "../utils/message";
import { NavigationProps, StackLoggedInParamList } from "./RootStackParamList";
import { ThemeContext } from "../context/ThemeContext";
import { darkAntdTheme, lightAntdTheme } from "../theme/default";
const SettingsPage = ({ navigation }: { route: RouteProp<StackLoggedInParamList>, navigation: NavigationProps }) => {
    const [updater, setUpdater] = useState(null);
    const [downloadProgress, setDownloadProgress] = useState<number>(0);
    const [isDownloading, setDownloading] = useState<boolean>(false);

    const { styles, setStyles } = useContext(StylesContext);
    const { theme, setTheme } = useContext(ThemeContext);

    useEffect(() => {
        setUpdater(new UpdateAPK.UpdateAPK({

            // [not used] iOS 使用App Store 的 app ID进行更新，此处只是一个例子，不是真实的app ID
            iosAppId: "xxx",

            // Android最新发行版的信息，格式：
            // {
            //     "versionName":"999.0.0",
            //     "versionCode": "998",
            //     "apkUrl":"https://gitee.com/creeper12356/AltCampusLife/releases/download/v1.0.1/altcampuslife_v_1_0_1.apk",
            //     "forceUpdate": false
            // }
            // Android App 的versionCode用于标示版本的新旧，位于文件android/app/build.gradle
            apkVersionUrl:
                "https://gitee.com/creeper12356/AltCampusLife/releases/download/v1.0.1/version.json",

            // The name of this 'fileProviderAuthority' is defined in AndroidManifest.xml. THEY MUST MATCH.
            // By default other modules like rn-fetch-blob define one (conveniently named the same as below)
            // but if you don't match the names you will get an odd-looking XML exception:
            // "Attempt to invoke virtual method 'android.content.res.XmlResourceParser ....' on a null object reference"
            fileProviderAuthority: "com.altcampuslife.provider",

            // This callback is called if there is a new version but it is not a forceUpdate.
            needUpdateApp: (performUpdate, whatsNew) => {
                Modal.alert(
                    "版本更新",
                    <View>
                        <Text style={{ fontSize: 15, color: 'black' }}>新版本已发布，您希望更新吗？</Text>
                        <Text>---what's new---</Text>
                        <Text>{whatsNew}</Text>
                    </View>,
                    [
                        { text: "取消", onPress: () => { } },
                        { text: "更新", onPress: () => performUpdate(true) }
                    ]

                )
            },

            // This will be called before the download/update where you defined forceUpdate: true in the version JSON
            forceUpdateApp: () => {
                messageError('暂时不支持强制更新');
            },

            // Called if the current version appears to be the most recent available
            notNeedUpdateApp: () => {
                messageOk('已经是最新版，无需更新');
            },

            // This is passed to react-native-fs as a callback
            downloadApkStart: () => {
                setDownloading(true);
            },

            // Called with 0-99 for progress during the download
            downloadApkProgress: progress => {
                console.log(`downloadApkProgress callback called - ${progress}%...`);
                // This is your opportunity to provide feedback to users on download progress
                // If you hae a state variable it is trivial to update the UI
                setDownloadProgress(progress);
            },

            // This is called prior to the update. If you throw it will abort the update
            downloadApkEnd: () => {
                setDownloading(false);
                setDownloadProgress(0);
            },

            // This is called if the fetch of the version or the APK fails, so should be generic
            onError: err => {
                setDownloading(false);
                setDownloadProgress(0);
                console.log("onError callback called", err);
                messageError(err);
            }
        }))
    }, []);

    const handleCheckUpdate = () => {
        if (!isDownloading) {
            updater.checkUpdate();
        }
    }
    // @ts-ignore
    return <ScrollView keyboardShouldPersistTaps="handled" style={styles.global}>
        {/* <Form
            renderHeader="外观"
        >
            <Form.Item
                label="夜间模式"
                name="isDarkMode"
                wrapperStyle={{ alignItems: 'flex-end' }}
                valuePropName="checked">
                <Switch onChange={(checked) => {
                    setTheme(checked ? darkAntdTheme : lightAntdTheme);
                }}/>
            </Form.Item>
        </Form> */}
        <List
            renderHeader="关于"
        >
            <List.Item extra={`v${version}`}>
                当前版本
            </List.Item>
            <List.Item onPress={() => {
                Linking.openURL('https://github.com/creeper12356/AltCampusLife');
            }}>
                源代码仓库
            </List.Item>
            {Platform.OS === 'android' ?
                <List.Item onPress={handleCheckUpdate}>
                    {isDownloading ? '下载apk进度...' : '检查更新'}
                </List.Item> : <></>
            }
            {Platform.OS === 'android' && isDownloading ?
                <List.Item>
                    <Progress.Bar progress={downloadProgress / 100} width={null} />
                    <Text>{downloadProgress} %</Text>
                </List.Item> : <></>
            }
        </List>
    </ScrollView>
};


export default SettingsPage;