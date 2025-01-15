import ChangePassword from "@/app/(user)/account/changepassword";
import ShareInput from "@/components/input/share.input";
import { useCurrentApp } from "@/context/app.context";
import { callChangePassword, resendCodeAPI } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import { UpdateUserPasswordSchema } from "@/utils/validate.schema";
import { router } from "expo-router";
import { Formik, FormikProps } from "formik";
import { useRef } from "react";
import {
    View, Text, Platform,
    KeyboardAvoidingView,
    ScrollView,
    Pressable
} from "react-native"
import Toast from "react-native-root-toast";


const UserPassword = () => {
    const formikRef = useRef<FormikProps<any>>(null);
    const { appState,setChangePasswordData } = useCurrentApp();

    const handleUpdatePassword = async (
        currentPassword: string,
        newPassword: string ,
        confirmPassword: string 
    ) => {

        setChangePasswordData({
            oldPassword: currentPassword,
            password: newPassword,
            confirmPassword: confirmPassword
        })
        await resendCodeAPI(appState?.user.email);
        router.replace({
            pathname: "/(auth)/verify",
            params: {
                changePassword: 1, 
              }

        })
        // const res = await callChangePassword({ oldPassword:currentPassword, password: newPassword,confirmPassword});
        // if (res.data) {
        //     Toast.show("Cập nhật mật khẩu thành công!", {
        //         duration: Toast.durations.LONG,
        //         textColor: "white",
        //         backgroundColor: APP_COLOR.BLUE_NEW,
        //         opacity: 1
        //     });

        //     formikRef?.current?.resetForm();

        // } else {
        //     const m = Array.isArray(res.message)
        //         ? res.message[0] : res.message;

        //     Toast.show(m, {
        //         duration: Toast.durations.LONG,
        //         textColor: "white",
        //         backgroundColor: APP_COLOR.BLUE_NEW,
        //         opacity: 1
        //     });
        // }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{ flex: 1 }}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={{
                    paddingHorizontal: 10, paddingTop: 20
                }}>

                    <Formik
                        innerRef={formikRef}
                        validationSchema={UpdateUserPasswordSchema}
                        initialValues={{
                            currentPassword: "",
                            newPassword: "",
                            confirmNewPassword: ""
                        }}
                        onSubmit={values => handleUpdatePassword(
                            values?.currentPassword ?? "",
                            values?.newPassword ?? "",
                            values?.confirmNewPassword ?? ""
                        )}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors,
                            touched, isValid, dirty,
                        }) => (
                            <View style={{ marginTop: 20, gap: 20 }}>
                                <ShareInput
                                    title="Mật khẩu hiện tại"
                                    secureTextEntry={true}
                                    onChangeText={handleChange('currentPassword')}
                                    onBlur={handleBlur('currentPassword')}
                                    value={values.currentPassword}
                                    error={errors.currentPassword}
                                    touched={touched.currentPassword}
                                />

                                <ShareInput
                                    title="Mật khẩu mới"
                                    secureTextEntry={true}
                                    onChangeText={handleChange('newPassword')}
                                    onBlur={handleBlur('newPassword')}
                                    value={values.newPassword}
                                    error={errors.newPassword}
                                    touched={touched.newPassword}
                                />

                                <ShareInput
                                    title="Xác nhận mật khẩu mới"
                                    secureTextEntry={true}
                                    onChangeText={handleChange('confirmNewPassword')}
                                    onBlur={handleBlur('confirmNewPassword')}
                                    value={values.confirmNewPassword}
                                    error={errors.confirmNewPassword}
                                    touched={touched.confirmNewPassword}
                                />

                                <Pressable
                                    disabled={!(isValid && dirty)}
                                    onPress={handleSubmit as any}
                                    style={({ pressed }) => ({
                                        opacity: pressed === true ? 0.5 : 1,
                                        backgroundColor: isValid && dirty ?
                                            APP_COLOR.BLUE_NEW  : APP_COLOR.GREY,
                                        padding: 10,
                                        marginTop: 10,
                                        borderRadius: 3
                                    })}
                                >
                                    <Text style={{
                                        textAlign: "center",
                                        color: isValid && dirty ? "white" : "grey"
                                    }}>Lưu thay đổi</Text>
                                </Pressable>
                            </View>
                        )}
                    </Formik>
                </View>
            </ScrollView>
        </KeyboardAvoidingView >
    )
}

export default UserPassword;