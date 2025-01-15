

import ShareInput from "@/components/input/share.input";
import { useCurrentApp } from "@/context/app.context";
import { APP_COLOR } from "@/utils/constant";
import { Formik } from "formik";
import {
    View, Text, StyleSheet, Image, Platform,
    KeyboardAvoidingView,
    ScrollView,
    Pressable
} from "react-native"
import avatar from '@/assets/avatar/avatar.jpg'
import { useEffect, useState } from "react";
import { detailUserAPI } from "@/utils/api";
import ShareInfoRow from "../input/share.text";
import dayjs from "dayjs";

const styles = StyleSheet.create({
    container: {
        // paddingHorizontal: 15,
        paddingTop: 60,
        flex: 1,
    },
    infoContainer: {
        paddingHorizontal: 15,
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
})
const UserInfo = () => {
    const { appState, setAppState } = useCurrentApp();
    const [dataUser, setDataUser] = useState<IUserTable>()
    const backend = Platform.OS === "android"
        ? process.env.EXPO_PUBLIC_ANDROID_API_URL
        : process.env.EXPO_PUBLIC_IOS_API_URL;

    const baseImage = `${backend}/images/avatar`;

    const fetchUserData = async (id: number) => {
        const response = await detailUserAPI(id)
        setDataUser(response.data)
    }

    useEffect(() => {
        if (appState?.user.id) {
            fetchUserData(+appState?.user.id);
        }
    }, [appState?.user?.id]);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{ flex: 1 }}
        >
            <View style={styles.container}>
                <View style={{
                    alignItems: "center",
                    gap: 5,
                    borderTopStartRadius: 20,
                    borderTopRightRadius: 20,
                    backgroundColor: APP_COLOR.WHITE,
                    height: "21%"
                    // position: 'relative'
                }}>
                    <Image
                        style={{
                            height: 150, width: 150, borderRadius: 550,
                            position: "absolute",
                            top: -60
                        }}
                        // source={{ uri: `${baseImage}/${appState?.user.avatar}` }}
                        source={avatar}
                    />
                    <Text style={{
                        fontSize: 24,
                        fontWeight: "bold",
                        marginTop: 110
                    }}>{appState?.user.name}</Text>
                </View>
                <View style={{ flex: 1, paddingTop: 20, gap: 20, backgroundColor: APP_COLOR.WHITE, }}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                        removeClippedSubviews={true}
                        style={{
                            flex: 1
                        }}
                    >
                        <View style={styles.infoContainer}>
                            {/* <ShareInfoRow title='Trạng thái' value={dataUser.status} bold /> */}
                            <ShareInfoRow title='MSSV' value={dataUser?.id} />
                            {/* <ShareInfoRow title='Khoa' value={dataUser?.major.name} /> */}
                            <ShareInfoRow title='Lớp' value={dataUser?.class.name} />
                            <ShareInfoRow title='Khóa học' value={dataUser?.yearOfAdmission?.startYear} />
                            <ShareInfoRow title='Ngành' value={dataUser?.major.name} bold />
                            {/* <ShareInfoRow title='Chuyên ngành' value={dataUser.chuyenNganh} bold /> */}
                            <ShareInfoRow title='Ngày sinh' value={dayjs(dataUser?.date_of_birth).format("DD-MM-YYYY")} />
                            <ShareInfoRow title='Giới tính' value={dataUser?.gender} />
                        </View>
                    </ScrollView>
                </View>
            </View>

        </KeyboardAvoidingView>
    )
}

export default UserInfo;