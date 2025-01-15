import { StyleSheet, Text, View } from "react-native";

interface IProps {
    title: string;
    value?: string | number;
    bold?: boolean
}

const ShareInfoRow = (props: IProps) => {
    const { title, value, bold } = props
    return (
        <View style={styles.row} >
            <Text style={styles.titleText}>{title}</Text>
            <Text style={[styles.valueText, bold && styles.boldText]}>{value}</Text>
        </View>
    );
}

export default ShareInfoRow


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    header: {
        backgroundColor: "#007AFF",
        paddingVertical: 15,
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFFFFF",
    },
    avatarContainer: {
        alignItems: "center",
        marginVertical: 20,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    name: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 10,
        color: "#333",
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#EDEDED",
        paddingVertical: 10,
    },
    titleText: {
        fontSize: 16,
        color: "#999",
    },
    valueText: {
        fontSize: 16,
        color: "#333",
    },
    boldText: {
        fontWeight: "bold",
    },
});