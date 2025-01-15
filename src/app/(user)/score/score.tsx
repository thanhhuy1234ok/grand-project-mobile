import { showAllListScoreStudentAPI } from "@/utils/api";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";



const ScoreBySemester = () => {
    const [dataScoreUser, setDataScoreUser] = useState<IScoreSemester[]>([])
    const fetchDataStudent = async () => {
        const res = await showAllListScoreStudentAPI();
        if (res.data) {
            setDataScoreUser(res.data ?? [])
        }
    }
    useEffect(() => {
        fetchDataStudent();
    }, [])

    const renderScores = (scores: IScore[]) => (
        <View style={styles.scoresContainer}>
            <View style={styles.headerRow}>
                <Text style={styles.header}>Môn học</Text>
                <Text style={styles.header}>Chuyên cần</Text>
                <Text style={styles.header}>Giữa kỳ</Text>
                <Text style={styles.header}>Cuối kỳ</Text>
            </View>
            {scores.map((score, index) => (
                <View key={index} style={styles.scoreRow}>
                    <Text style={styles.cell}>{score.subject?.name}</Text>
                    <Text style={styles.cell}>{score.attendanceScore}</Text>
                    <Text style={styles.cell}>{score.midtermScore}</Text>
                    <Text style={styles.cell}>{score.finalScore}</Text>
                </View>
            ))}
        </View>
    );

    const renderItem = ({ item }: { item: IScoreSemester }) => (
        <View style={styles.semesterContainer}>
            <Text style={styles.semesterName}>{item.semesterName}</Text>
            {renderScores(item.scores)}
        </View>
    );

    return (
        <FlatList
            data={dataScoreUser}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
        />
    );
};

export default ScoreBySemester;

const styles = StyleSheet.create({
    listContainer: {
        padding: 10,
    },
    semesterContainer: {
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        padding: 10,
    },
    semesterName: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    scoresContainer: {
        marginTop: 10,
    },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        paddingBottom: 5,
        marginBottom: 5,
    },
    header: {
        flex: 1,
        fontWeight: "bold",
        textAlign: "center",
    },
    scoreRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
    },
    cell: {
        flex: 1,
        textAlign: "center",
    },
});
