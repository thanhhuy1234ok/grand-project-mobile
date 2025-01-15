import LoadingOverlay from "@/components/loading/overlay";
import { useCurrentApp } from "@/context/app.context";
import { callChangePassword, resendCodeAPI } from "@/utils/api";
// import { resendCodeAPI, verifyCodeAPI } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Keyboard, TouchableOpacity } from "react-native"
import OTPTextView from 'react-native-otp-textinput';
import Toast from "react-native-root-toast";

const styles = StyleSheet.create({
    container: {
        paddingVertical: 30,
        paddingHorizontal: 20,
    },
    heading: {
        fontSize: 25,
        fontWeight: "600",
        marginVertical: 20
    }
})

interface IVerifyPageProps {
    oldPassword: string;
    password: string;
    confirmPassword: string;
}
const VerifyPage = () => {
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const otpRef = useRef<OTPTextView>(null);
    const [code, setCode] = useState<string>("");
    const { changePasswordData } = useCurrentApp();
    const { email, changePassword } = useLocalSearchParams();

    const [countdown, setCountdown] = useState(60); // Thời gian đếm ngược (60 giây)
    const [isCounting, setIsCounting] = useState(false);
    const [passwordData, setPasswordData] = useState<IVerifyPageProps | null>(changePasswordData);


    // useEffect để đếm ngược thời gian
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isCounting && countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        } else if (countdown === 0) {
            setIsCounting(false);
        }

        return () => clearInterval(timer); // Dọn dẹp interval khi component unmount
    }, [isCounting, countdown]);

    const verifyCode = async () => {
        console.log(passwordData);
        const data = {
            code,
            password: passwordData?.password,
            confirmPassword: passwordData?.confirmPassword,
            oldPassword: passwordData?.oldPassword
        }
        console.log(data);
        //call api
        Keyboard.dismiss();
        setIsSubmit(true);
        const res = await callChangePassword(data);
        setIsSubmit(false);

        //clear input
        console.log(changePassword);
        if (res.data) {
            //success
            otpRef?.current?.clear();
            Toast.show("Đổi mật khẩu thành công", {
                duration: Toast.durations.LONG,
                textColor: "white",
                backgroundColor: APP_COLOR.BLUE_NEW,
                opacity: 1
            });

            if (changePassword) {
                router.replace("/(tabs)")
            }

        } else {
            Toast.show(res.message as string, {
                duration: Toast.durations.LONG,
                textColor: "white",
                backgroundColor: APP_COLOR.BLUE_NEW,
                opacity: 1
            });
        }
    }

    useEffect(() => {
        if (code && code.length === 5) {
            verifyCode()
        }
    }, [code])

    const handleResendCode = async () => {
        setCountdown(60); // Reset đếm ngược về 60 giây
        setIsCounting(true);
        // Thực hiện logic gửi lại mã xác nhận ở đây
        console.log("Gửi lại mã xác nhận");
        otpRef?.current?.clear();
        //call api

        const res = await resendCodeAPI(email as string);
        const m = res.data ? "Resend code thành công" : res.message;
        Toast.show(m as string, {
            duration: Toast.durations.LONG,
            textColor: "white",
            backgroundColor: APP_COLOR.BLUE_NEW,
            opacity: 1
        });
    }
    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.heading}> Xác thực tài khoản</Text>
                <Text style={{ marginVertical: 10 }}>Vui lòng nhập mã xác nhận đã được gửi tới địa chỉ demomailok1234@gmail.com</Text>
                <View style={{ marginVertical: 20 }}>
                    <OTPTextView
                        ref={otpRef}
                        handleTextChange={setCode}
                        autoFocus
                        inputCount={5}
                        inputCellLength={1}
                        tintColor={APP_COLOR.BLUE_NEW}
                        textInputStyle={{
                            borderWidth: 1,
                            borderColor: APP_COLOR.GREY,
                            borderBottomWidth: 1,
                            borderRadius: 5,
                            // @ts-ignore:next-line
                            color: APP_COLOR.BLUE_NEW
                        }}
                    />
                </View>
                <View style={{ flexDirection: "row", marginVertical: 10 }}>
                    <Text >Không nhận được mã xác nhận,</Text>
                    {isCounting ? (
                        <Text style={{ color: "grey", marginLeft: 5 }}>
                            Gửi lại sau {countdown}s
                        </Text>
                    ) : (
                        <TouchableOpacity onPress={handleResendCode}>
                            <Text
                                style={{
                                    textDecorationLine: "underline",
                                    color: "#007BFF",
                                    marginLeft: 5,
                                }}
                            >
                                gửi lại
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            {isSubmit && <LoadingOverlay />}
        </View>
    )
}

export default VerifyPage;