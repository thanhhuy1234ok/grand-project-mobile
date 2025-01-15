import CustomFlatList from "@/components/CustomFlatList/CustomFlatList";
import HeaderHome from "@/components/home/header.home";
import NotificationHome from "@/components/home/notification.home";
import SearchHome from "@/components/home/search.home";
import TopListHome from "@/components/home/top.list.home";
import React from "react";
import { StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";

const data = [
    { key: 1, name: "Tin tức", ref: "" },
]


const HomeTab = () => {
    return (
        <View style={styles.container}>
            <CustomFlatList
                data={data}
                style={styles.list}
                renderItem={({item}) => <NotificationHome name={item.name} />}
                HeaderComponent={<HeaderHome />}
                StickyElementComponent={<></>}
                // TopListElementComponent={<View style={styles.topList} />}
                TopListElementComponent={<TopListHome />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ecf0f1",
        // flex: 1,
        justifyContent: "center",
        overflow: "hidden",
        // padding: 8
    },
    header: {
        borderColor: "red",
        borderWidth: 5,
        height: 100,
        marginBottom: 6,
        width: "100%"
    },
    item: {
        borderColor: "green",
        borderWidth: 5,
        height: 200,
        marginBottom: 6,
        width: "100%"
    },
    list: {
        overflow: "hidden",
    },
    sticky: {
        backgroundColor: "#2555FF50",
        borderColor: "blue",
        borderWidth: 5,
        height: 100,
        marginBottom: 6,
        width: "100%"
    },
    topList: {
        borderColor: "orange",
        borderWidth: 5,
        minHeight: 100,
        marginBottom: 6,
        width: "100%"
    }
});


export default HomeTab;