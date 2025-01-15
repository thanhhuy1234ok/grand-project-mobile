import { Button, FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import BannerHome from "./banner.home";
import React, { ReactNode, useState } from "react";
import ShareButton from "../button/share.button";
import { APP_COLOR } from "@/utils/constant";
import { MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Href, router } from "expo-router";
const styles = StyleSheet.create({

})

const data1: { key: number; name: string; icon: ReactNode; router: string }[] = [
    { key: 1, name: "Xem điểm", icon: <AntDesign name="barschart" size={24} color={APP_COLOR.BLUE_NEW} />, router:"/(user)/score/score" },
    { key: 2, name: "Lịch học", icon: <AntDesign name="calendar" size={24} color={APP_COLOR.BLUE_NEW} />,router:"/schedule" },
    { key: 3, name: "Phiếu thu tổng hợp", icon:"", router:""},
    { key: 4, name: "Xem điểm", icon: "", router: "" },
    { key: 5, name: "thành tích", icon: "", router: "" },
    { key: 6, name: "Phiếu thu tổng hợp", icon: "", router: "" },
    { key: 7, name: "Xem điểm", icon: "", router: "" },
    { key: 8, name: "Tất cả", icon: "", router: "" },
    { key: 9, name: "Phiếu thu tổng hợp", icon: "", router: "" },
    { key: 10, name: "thành tích", icon: "", router: "" },
]

const TopListHome = () => {
    // const [data, setData] = useState(Array(8).fill(1));

    const addItem = () => {
        setData((prevData) => {
            const nextItem = data1.find((item) => !prevData.some((d) => d.key === item.key) && item.key !== 8);
            return nextItem
                ? [...prevData.filter((item) => item.key !== 8), nextItem, data1.find((item) => item.key === 8)!]
                : prevData;
        });
    };
    // Hàm xóa mục cuối cùng
    const removeItem = () => {
        setData((prevData) => {
            if (prevData.length === 0) {
                return prevData; // No items to remove, return as-is
            }

            const lastItem = prevData[prevData.length - 1];

            // If the last item is `key: 8`, remove the second-to-last item instead
            if (lastItem.key === 8) {
                return prevData.length > 1
                    ? [...prevData.slice(0, -2), lastItem] // Remove the second last and keep `key: 8`
                    : prevData; // Only `key: 8` remains, no change
            }

            // Otherwise, simply remove the last item
            return prevData.slice(0, -1);
        });
    };
    const [data, setData] = useState(data1.slice(0, 2));

    return (
        <View>
            <BannerHome />
            <View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20, padding: 10, alignItems: "center" }} >
                    <Text style={{ fontSize: 22, fontWeight: "400" }}>Chức năng</Text>
                    <View>
                        <ShareButton
                            title="Tùy chỉnh"
                            // onPress={() => router.navigate("/(setting)/customer.setting")}
                            onPress={() => removeItem()}
                            btnStyle={{
                                backgroundColor: APP_COLOR.WHITE,
                                paddingVertical: 5,
                            }}
                            icon={<MaterialIcons name="settings" />}
                        />
                    </View>
                </View>
                <FlatList
                    key={4}
                    contentContainerStyle={{ alignSelf: 'flex-start' }}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={data} // Use the updatedData array
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{ flexDirection: "column", padding: 10, marginHorizontal: 10, width: 80 }}>
                                <Pressable
                                    key={item.key}
                                    onPress={() => router.push(item.router as Href<string>)} 
                                >
                                    <View style={{
                                        padding: 20,
                                        width: 60,
                                        height: 60,
                                        alignItems: "center",
                                        borderRadius: 100,
                                        backgroundColor: APP_COLOR.WHITE,
                                    }}>
                                        <Text style={{
                                            textAlign: "center",
                                            color: APP_COLOR.BLUE_NEW,
                                            borderRadius: 100,
                                            width: 35,
                                            height: 35,
                                        }}>
                                            {item.icon}
                                        </Text>
                                    </View>
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            flexWrap: "wrap", // Enable wrapping for text
                                            marginTop: 5,
                                            fontSize: 12, // Adjust font size for better fit
                                        }}
                                    >
                                        {item.name}
                                    </Text>
                                </Pressable>
                            </View>
                        );
                    }}
                />
            </View>
        </View>
    )
}

export default TopListHome;