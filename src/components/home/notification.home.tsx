import { FlatList, Image, StyleSheet, Text, View } from "react-native"
import demo from "@/assets/icon/images.png"
interface IProps {
    name: string
}

const NotificationHome = (props: IProps) => {
    const { name } = props
    const data = [{
        key: 1, image: demo, title: "Đã cập nhật phiếu thu tổng hợp", time: "2 giờ trước"
    },
    {
        key: 2, image: demo, title: "Đã cập nhật phiếu thu tổng hợp", time: "2 giờ trước"
    },

    {
        key: 3, image: demo, title: "Đã cập nhật phiếu thu tổng hợp", time: "2 giờ trước"
    },

    {
        key: 4, image: demo, title: "Đã cập nhật phiếu thu tổng hợp", time: "2 giờ trước"
    },
    ]
    return (
        <View style={styles.container}>
            <Text
                style={{
                    fontSize: 20,
                    fontWeight: "500",
                    color: "#000",
                    marginHorizontal: 10,
                    marginBottom: 10
                }}
            >{name}</Text>
            <FlatList
                data={data}
                horizontal
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={{
                        flexDirection: "column",
                        width: 200,
                        height: 170,
                        paddingVertical: 10,
                        marginHorizontal: 5,
                        backgroundColor: "#FFF",
                        borderRadius: 20
                    }}>
                        <Image source={item.image} style={{ width: 180, height: 100, objectFit: "fill", borderRadius: 20, marginHorizontal: 10 }} />
                        <View style={{ paddingHorizontal: 10 }}>
                            <Text>{item.title}</Text>
                            <Text style={{
                                fontSize: 12,
                                color: "#A9A9A9"
                            }}>{item.time}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // borderColor: "green",
        // borderWidth: 5,
        height: "auto",
        marginBottom: 10,
        width: "100%",
    }
})

export default NotificationHome