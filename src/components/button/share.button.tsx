import { ActivityIndicator, Pressable, StyleProp, StyleSheet, Text, TextStyle, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { APP_COLOR } from "utils/constant";
import { ReactNode } from "react";

const styles = StyleSheet.create({
    btnContainer: {
        // borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        backgroundColor: APP_COLOR.BLUE_NEW
    },
    text: {
        textTransform: "uppercase",
    }
})
interface IProps {
    title?: string;
    onPress: () => void;
    textStyle?: StyleProp<TextStyle>
    pressStyle?: StyleProp<TextStyle>
    btnStyle?: StyleProp<TextStyle>
    icon?: ReactNode,
    loading?: boolean
}
const ShareButton = (props: IProps) => {
    const { title, onPress, textStyle, pressStyle, btnStyle, icon, loading = false } = props;
    return (
        <Pressable
            style={({ pressed }) => ([{
                opacity: pressed === true || loading ? 0.5 : 1,
                alignSelf: "flex-start", //fit-content
            }, pressStyle])}
            onPress={onPress}
            disabled={loading}
        >
            <View style={[styles.btnContainer, btnStyle]}>
                {loading && <ActivityIndicator
                    color={APP_COLOR.BLACK}
                />}
                {icon}
                {title && <Text style={textStyle}>{title}</Text>}
            </View>
        </Pressable>
    )
}

export default ShareButton;