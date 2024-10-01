/* reference blog: https://blog.csdn.net/m0_72030630/article/details/130866595 */
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Button, Easing, StyleSheet, Text, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { NavigationProps, StackLoggedInParamList } from './RootStackParamList';
import { RouteProp } from '@react-navigation/native';

export default function CameraPage({route, navigation}: {route: RouteProp<StackLoggedInParamList>,navigation: NavigationProps}) {
    const [flash, setFlash] = useState(false);
    const moveAnim = useRef(new Animated.Value(-2)).current;

    /** 扫描框动画*/
    const startAnimation = () => {
        Animated.sequence([
            Animated.timing(moveAnim, {
                toValue: 200,
                duration: 1500,
                easing: Easing.linear,
                useNativeDriver: false,
            }),
            Animated.timing(moveAnim, {
                toValue: -1,
                duration: 1500,
                easing: Easing.linear,
                useNativeDriver: false,
            }),
        ]).start(() => startAnimation());
    };

    // 开始调用一次
    useEffect(() => {
        startAnimation();
    }, []);

    return (
        <>
            <View style={styles.container}>
                <RNCamera
                    captureAudio={false}
                    autoFocus={RNCamera.Constants.AutoFocus.on}
                    style={[styles.preview]}
                    type={RNCamera.Constants.Type.back}
                    flashMode={
                        flash
                            ? RNCamera.Constants.FlashMode.torch
                            : RNCamera.Constants.FlashMode.off
                    }
                    onBarCodeRead={({data}) => {
                        route.params?.updateQRCode(data.slice(-8));
                        navigation.navigate('Charge');
                    }}

                    //此处是类型，即相机可以识别的码类型
                    barCodeTypes={[
                        RNCamera.Constants.BarCodeType.qr,
                        RNCamera.Constants.BarCodeType.code128,
                        RNCamera.Constants.BarCodeType.code39,
                        RNCamera.Constants.BarCodeType.code93,
                        RNCamera.Constants.BarCodeType.ean13,
                        RNCamera.Constants.BarCodeType.ean8,
                        RNCamera.Constants.BarCodeType.pdf417,
                        RNCamera.Constants.BarCodeType.upc_e,
                        RNCamera.Constants.BarCodeType.interleaved2of5,
                        RNCamera.Constants.BarCodeType.itf14,
                        RNCamera.Constants.BarCodeType.aztec,
                        RNCamera.Constants.BarCodeType.datamatrix,
                    ]}>
                    <View
                        style={{
                            width: 500,
                            height: 220,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                        }}
                    />

                    <View style={[{ flexDirection: 'row' }]}>
                        <View
                            style={{
                                backgroundColor: 'rgba(0,0,0,0.5)',
                                height: 200,
                                width: 200,
                            }}
                        />
                        <View style={{ width: 200, height: 200 }}>
                            <Animated.View
                                style={[styles.border, { transform: [{ translateY: moveAnim }] }]}
                            />
                        </View>
                        <View
                            style={{
                                backgroundColor: 'rgba(0,0,0,0.5)',
                                height: 200,
                                width: 200,
                            }}
                        />
                    </View>

                    <View
                        style={{
                            flex: 1,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            width: 500,
                            alignItems: 'center',
                        }}>
                        <Text style={styles.rectangleText}>
                            将二维码放入框内，即可自动扫描
                        </Text>
                        <Button
                            onPress={() => {
                                setFlash(!flash);
                            }}
                            title={(flash ? '关闭' : '打开') + '闪光灯'}
                        />
                    </View>
                </RNCamera>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    preview: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rectangleContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    rectangle: {
        height: 200,
        width: 200,
        borderWidth: 1,
        borderColor: '#fcb602',
        backgroundColor: 'transparent',
        borderRadius: 10,
    },
    rectangleText: {
        flex: 0,
        color: '#fff',
        marginTop: 10,
    },
    border: {
        flex: 0,
        width: 196,
        height: 2,
        backgroundColor: '#fcb602',
        borderRadius: 50,
    },
});
