import { useCurrentApp } from "@/context/app.context";
import { Image, Text, View } from "react-native"
import avatar from "@/assets/avatar/avatar.jpg"
import Ionicons from '@expo/vector-icons/Ionicons';
import { APP_COLOR, hexToRGBA } from "@/utils/constant";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const HeaderHome = () => {
    const { appState } = useCurrentApp()
    const insets = useSafeAreaInsets();
    return (
        <View style={{
            padding: 20,
            backgroundColor: APP_COLOR.BLUE_BTN,
            flexDirection: "row",
            gap: 20,
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop:50
        }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: 20,
            }}>

                <Image
                    source={avatar}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 25,
                    }}
                />
                <Text style={{
                    fontSize: 22,
                    fontWeight: 400,
                    color: APP_COLOR.WHITE,
                    maxWidth: 270,
                }}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    Xin chào, {appState?.user.name}
                </Text>
            </View>
            <View style={{
                borderRadius: 50,
                width: 40,
                height: 40,
                alignItems: "center",
                backgroundColor: hexToRGBA(APP_COLOR.WHITE, 0.2),
                justifyContent: "center",
            }} >
                <Ionicons name="notifications-sharp"
                    size={24}
                    color={APP_COLOR.WHITE}
                />
            </View>
        </View>
    )
}

export default HeaderHome;