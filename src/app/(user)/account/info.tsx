import UserInfo from "@/components/account/user.info"
import { APP_COLOR } from "@/utils/constant"
import React from "react"
import { Text, View } from "react-native"

const InfoUser = () => {
    return (
        <View style={{ flex: 1, backgroundColor: APP_COLOR.BLUE_BTN }}>
            <UserInfo />
        </View>
    )
}

export default InfoUser