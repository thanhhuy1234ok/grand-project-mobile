import { Alert, Button, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native"
import bg from "@/assets/logo/image.png"
import { LinearGradient } from "expo-linear-gradient"
import { SafeAreaView } from "react-native-safe-area-context"
import ShareInput from "@/components/input/share.input"
import { useEffect, useState } from "react"
import ShareButton from "@/components/button/share.button"
import { Redirect, router } from "expo-router"
import Toast from "react-native-root-toast"
import { LoginAPI } from "@/utils/api"
import { APP_COLOR } from "@/utils/constant"
import { Formik } from "formik"
import { LoginSchema } from "@/utils/validate.schema"
import { useCurrentApp } from "@/context/app.context"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';
import * as Notifications from 'expo-notifications';
import Entypo from '@expo/vector-icons/Entypo';
import React from "react"
const LoginHome = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const { setAppState } = useCurrentApp()
    const [isBiometricSupported, setIsBiometricSupported] = useState<boolean>(false);

    const requestPermissions = async () => {
        const { status } = await Notifications.requestPermissionsAsync();
        console.log(status);
        if (status !== 'granted') {
            alert('Notification permissions not granted.');
        }
    };

    const handlerLogin = async (email: string, password: string) => {
        try {
            setLoading(true)
            const res = await LoginAPI(email, password)
            setLoading(false)
            if (res.data) {
                if(res.data.user.role?.name === "STUDENT") {
                    await AsyncStorage.setItem('access_token', res.data.access_token)
                    const storedEmail = await SecureStore.getItemAsync('userEmail');
                    const storedPassword = await SecureStore.getItemAsync('userPassword');
                    await requestPermissions()
                    if (storedEmail !== email || storedPassword !== password) {

                        await saveCredentials(email, password);
                        if (Platform.OS === 'android') {
                            await Notifications.setNotificationChannelAsync('new-emails', {
                                name: 'New Emails',
                                importance: Notifications.AndroidImportance.HIGH,
                                sound: 'mySoundFile', // Ensure this sound is properly configured
                            });
                        }

                        // Schedule notification
                        await Notifications.scheduleNotificationAsync({
                            content: {
                                title: "Thông báo lưu thông tin",
                                body: "Bạn đã lưu thông tin vào sinh trắc học thành công",
                                sound: true
                            },
                            trigger: {
                                seconds: 1,
                                // channelId: Platform.OS === 'android' ? 'new-emails' : undefined,
                            },
                        });
                    }

                    setAppState(res.data)
                    router.navigate("/(tabs)");
                }
                else{
                    const m = "Bạn không phải sinh viên"
                    Toast.show(m, {
                        duration: Toast.durations.LONG,
                        textColor: "white",
                        backgroundColor: APP_COLOR.ORANGE,
                        opacity: 1
                    });
                }
            }
            else {
                const m = Array.isArray(res.message)
                    ? res.message[0] : res.message;
                Toast.show(m, {
                    duration: Toast.durations.LONG,
                    textColor: "white",
                    backgroundColor: APP_COLOR.ORANGE,
                    opacity: 1
                });
            }
        } catch (error) {
            console.log(">>> Check error: ", error);

        }

    }
    const [hasCredentials, setHasCredentials] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            const compatible = await LocalAuthentication.hasHardwareAsync();
            setIsBiometricSupported(compatible);

            const email = await SecureStore.getItemAsync('userEmail');
            const password = await SecureStore.getItemAsync('userPassword');
            setHasCredentials(!!email && !!password);
        })();

    }, []);

    const saveCredentials = async (email: string, password: string) => {
        try {
            await SecureStore.setItemAsync('userEmail', email);
            await SecureStore.setItemAsync('userPassword', password);
            console.log('Thông báo', 'Tài khoản và mật khẩu đã được lưu.');
        } catch (error) {
            console.error('Lỗi khi lưu tài khoản và mật khẩu:', error);
        }
    };

    const handleBiometricLogin = async () => {
        if (!hasCredentials) {
            Alert.alert('Thông báo', 'Chưa lưu tài khoản và mật khẩu trong hệ thống.');
            return;
        }

        const isBiometricAvailable = await LocalAuthentication.isEnrolledAsync();

        if (!isBiometricAvailable) {
            Alert.alert('Thông báo', 'Thiết bị chưa đăng ký vân tay hoặc Face ID.');
            return;
        }

        const result = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Xác thực bằng vân tay hoặc Face ID',
            fallbackLabel: 'Nhập mật khẩu',
        });

        if (result.success) {
            const storedEmail = await SecureStore.getItemAsync('userEmail');
            const storedPassword = await SecureStore.getItemAsync('userPassword');
            const res = await LoginAPI(storedEmail!, storedPassword!)
            if (res.data) {
                await AsyncStorage.setItem('access_token', res.data.access_token)
                setAppState(res.data)
                router.navigate("/(tabs)");
            }
            else {
                const m = Array.isArray(res.message)
                    ? res.message[0] : res.message;
                Toast.show(m, {
                    duration: Toast.durations.LONG,
                    textColor: "white",
                    backgroundColor: APP_COLOR.BLUE_NEW,
                    opacity: 1
                });
            }
        } else {
            Alert.alert('Thất bại', 'Đăng nhập không thành công.');
        }
    };

    return (

        <SafeAreaView
            style={{
                flex: 1,
            }}>

            <View style={styles.container}>
                <ImageBackground
                    style={{
                        width: "100%",
                        height: 340,
                        position: "absolute",
                        top: 0,
                    }}
                    resizeMode="cover"
                    source={bg}
                />

                <Formik
                    initialValues={{ email: '', password: '' }}
                    // onSubmit={values => { console.log("email: ", values.email); }}
                    onSubmit={values => handlerLogin(values.email, values.password)}
                    validationSchema={LoginSchema}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors }) => (

                        <View style={styles.whiteSheet}>
                            <KeyboardAvoidingView
                                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                                style={{ flex: 1 }}
                            >
                                <ScrollView
                                    showsVerticalScrollIndicator={false}
                                >
                                    <Text style={styles.title}>Đăng nhập</Text>
                                    <ShareInput
                                        title="Tài khoản"
                                        value={values.email}
                                        onChangeText={handleChange("email")}
                                        onBlur={handleBlur('email')}
                                        error={errors.email}
                                        placeholder="Nhập tài khoản"
                                    />
                                    <ShareInput
                                        title="Mật khẩu"
                                        secureTextEntry={true}
                                        value={values.password}
                                        onChangeText={handleChange("password")}
                                        onBlur={handleBlur('password')}
                                        error={errors.password}
                                        placeholder="Nhập mật khẩu"
                                    />
                                     <View style={{ marginHorizontal:10, marginTop: 10 }}>
                                            <Text
                                                onPress={() => router.navigate("/(auth)/request.password")}
                                                style={{
                                                    // textAlign: "center",
                                                    color: APP_COLOR.BLUE_NEW
                                                }}>Quên mật khẩu ?</Text>
                                        </View>
                                    <View style={{
                                        flexDirection: "row",
                                        // justifyContent: "flex-start",
                                        // alignItems: "center",
                                        // marginHorizontal: 5
                                        width: "100%",
                                        gap: 24
                                    }}>
                                       
                                        <ShareButton
                                            title="Đăng nhập"
                                            loading={loading}
                                            onPress={handleSubmit as any}
                                            textStyle={{
                                                // textTransform: "uppercase",
                                                color: "#fff",
                                                paddingVertical: 5,
                                                fontWeight: "bold",
                                                fontSize: 16
                                            }}
                                            btnStyle={{
                                                justifyContent: "center",
                                                borderRadius: 8,
                                                paddingVertical: 10,
                                                backgroundColor: APP_COLOR.BLUE_BTN,
                                                marginTop: 30,
                                                marginHorizontal: 5,
                                                width: "105%"
                                            }}
                                            pressStyle={{ alignSelf: "stretch" }}
                                        />
                                        {isBiometricSupported && (
                                            <ShareButton
                                                title=""
                                                icon={<Entypo name="fingerprint" size={35} color={APP_COLOR.BLUE_BTN} />}
                                                onPress={handleBiometricLogin as any}
                                                btnStyle={{
                                                    justifyContent: "center",
                                                    borderRadius: 8,
                                                    paddingVertical: 9,
                                                    backgroundColor: APP_COLOR.WHITE,
                                                    marginTop: 30,
                                                    marginHorizontal: 5,
                                                    borderWidth: 1,
                                                    borderColor: APP_COLOR.BLUE_BTN,
                                                }}
                                            />
                                        )}
                                    </View>
                                </ScrollView>
                            </KeyboardAvoidingView>
                        </View>

                    )}
                </Formik>

            </View>
        </SafeAreaView>
    )
}


export default LoginHome

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    whiteSheet: {
        width: '100%',
        position: "absolute",
        bottom: 0,
        top: 200,
        backgroundColor: '#fff',
        borderTopLeftRadius: 60,
        paddingHorizontal: 30
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: APP_COLOR.BLACK,
        alignSelf: "center",
        paddingBottom: 24,
        marginTop: 30
    },
})