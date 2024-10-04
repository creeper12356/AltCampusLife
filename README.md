# AltCampusLife 
> 东晟校园生活开源优化版

![altcampuslife](https://github.com/user-attachments/assets/e73f16d8-121c-4a3f-8c86-881eefa9469b)


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
cd android/
# 将React Native代码打包到Android应用中
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
# 生成apk文件
./gradlew assembleRelease 
```
注：在Windows中，最后一步需要使用`./gradlew.bat`脚本，而不是`./gradlew`。
构建后的apk文件位于`android/app/build/outputs/apk/release`目录。

### iOS(TODO)
