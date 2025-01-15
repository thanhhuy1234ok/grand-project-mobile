import { ErrorBoundaryProps, Stack } from "expo-router";
import { RootSiblingParent } from 'react-native-root-siblings';
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppProvider from "context/app.context";
import { Button, Text, View } from "react-native";
import { APP_COLOR } from "@/utils/constant";

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, paddingHorizontal: 10, gap: 15 }}>
                <View style={{
                    backgroundColor: "#333", padding: 10,
                    borderRadius: 3, gap: 10
                }}>
                    <Text style={{ color: "red", fontSize: 20 }}>
                        Something went wrong
                    </Text>
                    <Text style={{ color: "#fff" }}>{error.message}</Text>
                </View>
                <Button title="Try Again ?" onPress={retry} />
            </View>
        </SafeAreaView>
    );
}

const RootLayout = () => {
    return (
        <GestureHandlerRootView>
            <RootSiblingParent>
                <AppProvider>
                    {/* <SafeAreaView style={{ flex: 1 }}> */}
                    <Stack
                        screenOptions={{
                            headerStyle: {
                                backgroundColor: APP_COLOR.BLUE_BTN,
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            }, 
                        }}
                    >
                        <Stack.Screen
                            name="(tabs)"
                            options={{ headerShown: false }}
                        />

                        <Stack.Screen
                            name="index"
                            options={{ headerShown: false }}
                        />

                        <Stack.Screen
                            name="(auth)/login"
                            options={{
                                headerTitle: "Đăng nhập",
                                headerShown: false
                            }}
                        />
                        <Stack.Screen
                            name="(user)/account/info"
                            options={{
                                headerTitle: "Thông tin sinh viên",
                                headerBackTitle: "Back",
                                headerTitleAlign: "center",

                            }}
                        />

                        <Stack.Screen
                            name="(user)/account/changepassword"
                            options={{
                                headerTitle: "Cập nhật mật khẩu",
                                headerBackTitle: "Back",
                                headerTitleAlign: "center",

                            }}
                        />

                        <Stack.Screen
                            name="(user)/score/score"
                            options={{
                                headerTitle: "Kết quả học tập",
                                headerBackTitle: "Back",
                                headerTitleAlign: "center",

                            }}
                        />
                        <Stack.Screen
                            name="(auth)/verify"
                            options={{
                                headerTitle: "Cập nhật mật khẩu",
                                headerBackTitle: "Back",
                            }}
                        />
                        <Stack.Screen
                            name='(user)/attendance/scanattendance'
                            options={{
                                headerTitle: "Mã QR Điểm danh",
                                headerBackTitle: "Back",
                            }}
                        />
                        <Stack.Screen
                            name="(auth)/request.password"
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="(auth)/forgot.password"
                            options={{ headerShown: false }}
                        />

                        <Stack.Screen
                            name="(setting)/customer.setting"
                            options={{
                                headerTitle: "Tùy chỉnh tính năng",
                                headerBackTitle: "Back",
                            }}
                        />
                    </Stack>

                   
                    {/* </SafeAreaView> */}
                </AppProvider>
            </RootSiblingParent>
        </GestureHandlerRootView>
    )
}

export default RootLayout;