import DayTimeTable from "@/components/time-table/day.table";
import MonthTimeTable from "@/components/time-table/month.table";
import WeekTimeTable from "@/components/time-table/week.table";
import { APP_COLOR } from "@/utils/constant";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";


const SchedulePage = () => {
    const [selectedView, setSelectedView] = useState<string>('Ngày');
    const renderTimeTable = () => {
        switch (selectedView) {
            case 'Ngày':
                return <DayTimeTable />;
            case 'Tuần':
                return <WeekTimeTable selectedView={selectedView} />;
            case 'Tháng':
                return <MonthTimeTable selectedView={selectedView} />;
            default:
                return null;
        }
    };
    return (
        <>
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <Pressable
                        onPress={() => setSelectedView('Ngày')}
                        style={[styles.button, selectedView === 'Ngày' && styles.activeButton]}
                    >
                        <Text style={[styles.buttonText, selectedView === 'Ngày' && styles.activeText]}>Ngày</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => setSelectedView('Tuần')}
                        style={[styles.button, selectedView === 'Tuần' && styles.activeButton]}
                    >
                        <Text style={[styles.buttonText, selectedView === 'Tuần' && styles.activeText]}>Tuần</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => setSelectedView('Tháng')}
                        style={[styles.button, selectedView === 'Tháng' && styles.activeButton]}
                    >
                        <Text style={[styles.buttonText, selectedView === 'Tháng' && styles.activeText]}>Tháng</Text>
                    </Pressable>
                </View>

                {renderTimeTable()}
            </View>

        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 10,
        paddingVertical:10,
        paddingHorizontal:5,
        backgroundColor: APP_COLOR.CULTURED,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10,
        marginBottom: 20,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#ddd',
        borderRadius: 5,
    },
    activeButton: {
        backgroundColor: APP_COLOR.BLUE_NEW,
        color:APP_COLOR.WHITE
    },
    activeText: {
        color: '#fff', 
    },
    buttonText: {
        color: '#000',
        fontWeight: 'bold',
    },
});

export default SchedulePage;