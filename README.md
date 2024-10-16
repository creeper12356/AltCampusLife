# AltCampusLife 
> 东晟校园生活开源优化版

## 📝介绍
AltCampusLife是一个开源的电动车充电客户端App，与东晟校园生活完全兼容，支持Android, iOS（准备上架AppStore🍎）。

![ic_launcher](https://github.com/user-attachments/assets/b1cfe3a4-8e45-4ceb-a8eb-dfe4af9f2afc)

- 🤗集成扫码、充电、充值于一个页面，简单易用
- 📷支持扫码充电，且可开启闪光灯
- 🛜任何网络环境下均可使用，无需SJTU校园网
- 👨‍💻除了涉及服务端具体API的代码之外，完全开源，功能可拓展定制


## 📥安装
### Android
Android apk可以从 https://github.com/creeper12356/AltCampusLife/releases 下载
### iOS
根据苹果公司的相关规定，iOS只能安装来自AppStore的应用，然而上架AppStore需要开发者每年支付$99🤑，以开发者目前的经济状况无法支持🥺。
## ⚙从源代码运行
### Android
#### 环境配置
##### 安装Node.js
从[官网](https://nodejs.org/en/download/package-manager)下载Node.js并安装。
##### 安装Java Development Kit
JDK可以选择[OracleJDK](https://www.oracle.com/in/java/technologies/downloads/)或[OpenJDK](https://openjdk.org/)，React Native官方推荐JDK17。
##### 配置Android开发环境
配置Android开发环境需要安装[Android Studio](https://developer.android.com/studio)，安装了Android Studio之后需要下载安装：
- Android SDK
- Android SDK Platform
- Android NDK
- Android Virtual Device(AVD)
具体的配置过程因开发操作系统和版本而不同，具体教程可以参考: https://reactnative.dev/docs/set-up-your-environment#installing-dependencies

#### 调试运行
在项目根目录下执行：
```sh
npm i
npm start
```
执行`npm start`后会出现Metro的LOGO界面和四个选项：
```sh
i - run on iOS
a - run on Android
d - open Dev Menu
r - reload app
```
键入`a`后，如果环境配置正确，将启动Android虚拟机，并在虚拟机上运行应用。此外，Metro服务器支持对于JavaScript/TypeScript代码的热更新，即修改代码后保存即可生效，在虚拟机中看到修改代码后的结果。

#### 构建Android apk 
在项目根目录下执行以下命令以构建Android安装包（不含签名证书）
```sh
npm i
# 将React Native代码打包到Android应用中
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
# 生成apk文件
cd android/
./gradlew assembleRelease 
```
注：在Windows中，最后一步需要使用`./gradlew.bat`脚本，而不是`./gradlew`。
构建后的apk文件位于`android/app/build/outputs/apk/release`目录。

### iOS
**TODO**: 欢迎iOS编译成功的同学提出PR补充~

## 🎉致谢
向在本项目开发过程中提供支持的工具/软件表示感谢：
- [Visual Studio Code](https://code.visualstudio.com/)
- [JADX](https://github.com/skylot/jadx)
- [抓包精灵](https://github.com/huolizhuminh/NetWorkPacketCapture)
- [easyappicon](https://easyappicon.com/)
- [Apifox](https://apifox.com/)
- [HTML Color Picker](https://www.w3schools.com/colors/colors_picker.asp)
- ChatGPT & Copilot
- ...
