import { APP_COLOR } from "@/utils/constant";
import { Tabs } from "expo-router";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import { View } from "react-native";
const TabLayout = () => {

    const getIcons = (routeName: string, focused: boolean, size: number) => {
        if (routeName === "index") {
            return (
                <Feather name="home" size={size} color={focused ? APP_COLOR.BLUE_BTN : APP_COLOR.GREY} />
            )
        }
        if (routeName === "schedule") {
            return (
                <AntDesign
                    name="calendar"
                    size={size}
                    color={focused ? APP_COLOR.BLUE_BTN : APP_COLOR.GREY}
                />
            )
        }

        if (routeName === "attendance") {
            return (
                <MaterialIcons name="edit-note" size={size} color={focused ? APP_COLOR.BLUE_BTN : APP_COLOR.GREY} />
            )
        }

        if (routeName === "account") {
            return (
                focused ?
                    <MaterialCommunityIcons name="account" size={size} color={APP_COLOR.BLUE_BTN} />
                    :
                    <MaterialCommunityIcons name="account-outline" size={size} color={APP_COLOR.GREY} />
            )
        }

        return (
            <View>
            </View>
        )
    }
    return (
        <Tabs
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    return getIcons(route.name, focused, size);
                },
                // headerShown: false,
                tabBarLabelStyle: { paddingBottom: 3 },
                tabBarActiveTintColor: APP_COLOR.BLUE_BTN,
                headerTintColor: APP_COLOR.WHITE,
                headerTitleAlign: "center",
                headerStyle: {
                    backgroundColor: APP_COLOR.BLUE_BTN,
                },
            })}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    headerShown: false
                }}
            />

            <Tabs.Screen
                name="schedule"
                options={{
                    title: "Lịch học",
                    headerTitle: "Lịch học",

                }}
            />

            <Tabs.Screen
                name="attendance"
                options={{ title: "Điểm danh" }}
            />

            <Tabs.Screen
                name="account"
                options={{
                    title: "Cá nhân",
                    headerShown: false
                }}
            />
        </Tabs>
    )
}

export default TabLayout;