import { useCurrentApp } from "@/context/app.context";
import { View, Text, Pressable, Alert, Image } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import avatar from "@/assets/avatar/avatar.jpg"
import { APP_COLOR, hexToRGBA } from "@/utils/constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
const AccountPage = () => {
    const { appState } = useCurrentApp();
    // const baseImage = `${getURLBaseBackend()}/images/avatar`;
    const insets = useSafeAreaInsets();

    const handleLogout = () => {
        Alert.alert('Đăng xuất', 'Bạn chắc chắn đăng xuất người dùng ?', [
            {
                text: 'Hủy',
                style: 'cancel',
            },
            {
                text: 'Xác nhận',
                onPress: async () => {
                    await AsyncStorage.removeItem("access_token");
                    router.replace("/(auth)/login");
                }
            },
        ]);
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={{
                paddingTop: insets.top + 20,
                paddingHorizontal: 20,
                paddingBottom: 20,
                backgroundColor: APP_COLOR.BLUE_BTN,
                flexDirection: "row",
                gap: 20,
                alignItems: "center"
            }}>
                <Image
                    style={{
                        height: 60,
                        width: 60,
                        borderRadius: 30,
                    }}
                    // source={{ uri: `${baseImage}/${appState?.user.avatar}` }}\
                    source={avatar}
                />
                <View>
                    <Text style={{ color: "white", fontSize: 20 }}>
                        {appState?.user.name}
                    </Text>
                    <Text style={{ color: "white", fontSize: 20 }}>MSSV: {appState?.user.id}</Text>
                </View>

            </View>

            <Pressable
                onPress={() => router.navigate("/(user)/account/info")}
                style={{
                    paddingVertical: 15,
                    paddingHorizontal: 10,
                    borderBottomColor: "#eee",
                    borderBottomWidth: 1,
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                <View style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center"
                }}>
                    <View style={{
                        borderRadius: 50,
                        width: 30,
                        height: 30,
                        alignItems: "center",
                        backgroundColor: hexToRGBA(APP_COLOR.BLUE_BTN, 0.2),
                        justifyContent: "center",
                    }}>
                        <AntDesign name="idcard" size={17} color={APP_COLOR.BLUE_BTN} />
                    </View>

                    <Text>Thông tin người dùng</Text>
                </View>

                <MaterialIcons name="navigate-next" size={24} color="grey" />
            </Pressable>

            <Pressable
                onPress={() => router.navigate("/(user)/account/changepassword")}
                style={{
                    paddingVertical: 15,
                    paddingHorizontal: 10,
                    borderBottomColor: "#eee",
                    borderBottomWidth: 1,
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                <View style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center"
                }}>
                    <View style={{
                        borderRadius: 50,
                        width: 30,
                        height: 30,
                        alignItems: "center",
                        backgroundColor: APP_COLOR.GREY,
                        justifyContent: "center"
                    }}>
                        <MaterialIcons name="password" size={17} color="green" />
                    </View>

                    <Text>Thay đổi mật khẩu</Text>
                </View>

                <MaterialIcons name="navigate-next" size={24} color="grey" />
            </Pressable>

            <Pressable style={{
                paddingVertical: 15,
                paddingHorizontal: 10,
                borderBottomColor: "#eee",
                borderBottomWidth: 1,
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center"
            }}>
                <View style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center"
                }}>
                    <View style={{
                        borderRadius: 50,
                        width: 30,
                        height: 30,
                        alignItems: "center",
                        backgroundColor: APP_COLOR.GREY,
                        justifyContent: "center"
                    }}>
                        <MaterialIcons name="language" size={17} color="green" />
                    </View>

                    <Text>Ngôn ngữ</Text>
                </View>

                <MaterialIcons name="navigate-next" size={24} color="grey" />
            </Pressable>

            <Pressable style={{
                paddingVertical: 15,
                paddingHorizontal: 10,
                borderBottomColor: "#eee",
                borderBottomWidth: 1,
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center"
            }}>
                <View style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center"
                }}>
                    <View style={{
                        borderRadius: 50,
                        width: 30,
                        height: 30,
                        alignItems: "center",
                        backgroundColor: APP_COLOR.GREY,
                        justifyContent: "center"
                    }}>
                        <MaterialIcons name="info-outline" size={17} color="green" />
                    </View>

                    <Text>Về ứng dụng</Text>
                </View>

                <MaterialIcons name="navigate-next" size={24} color="grey" />
            </Pressable>
            <Pressable
                onPress={handleLogout}
                style={({ pressed }) => ({
                    opacity: pressed === true ? 0.5 : 1,
                    paddingVertical: 15,
                    paddingHorizontal: 10,
                    borderBottomColor: "#eee",
                    borderBottomWidth: 1,
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "center"
                })}>

                <View style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center"
                }}>
                    <View style={{
                        borderRadius: 50,
                        width: 30,
                        height: 30,
                        alignItems: "center",
                        backgroundColor: hexToRGBA(APP_COLOR.RED, 0.2),
                        justifyContent: "center"
                    }}>
                        <AntDesign name="logout" size={17} color={APP_COLOR.RED} />
                    </View>

                    <Text>Đăng xuất</Text>
                </View>

                <MaterialIcons name="navigate-next" size={24} color="grey" />
            </Pressable>

            <View style={{
                flex: 1, justifyContent: "flex-end",
                gap: 10,
                paddingBottom: 15
            }}>
                <Text style={{ textAlign: "center", color: APP_COLOR.GREY }}>
                    Version 1.0
                </Text>
            </View>

        </View>
    )
}
export default AccountPage;