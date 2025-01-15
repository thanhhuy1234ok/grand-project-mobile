import { getScheduleTimeTableStudentAPI } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler";

const DayTimeTable = () => {
   const [scheduleData, setScheduleData] = useState<ISchedule[]>([]);

    useEffect(() => {
        // Fetch API
        fetchSchedule();
    }, []);

    const fetchSchedule = async () => {
        try {
            const res = await getScheduleTimeTableStudentAPI();
            if (res && res.data) {
                setScheduleData(res.data);
            }
        } catch (error) {
            console.error("Error fetching schedule:", error);
        }
    };
    const currentDay = dayjs().format("dddd"); // Lấy ngày hiện tại
    const todaySchedules = scheduleData.filter(schedule =>
        schedule.daysOfWeek.some(day => day.name === currentDay)
    );

    const renderSchedule = () => {
        return todaySchedules.map((item, index) => (
            <View key={index} style={styles.card}>
                <Text style={styles.subjectName}>{item.subject.name}</Text>
                <Text style={styles.detailText}>Giờ:{item.startTime} - {item.endTime}</Text>
                <Text style={styles.detailText}>Phòng: {item.room.name}</Text>
                <Text style={styles.detailText}>Giảng viên: {item.teacher.name}</Text>
            </View>
        ));
    };
    return (
        <View>
            <ScrollView style={styles.contentContainer}>
                {renderSchedule()}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        padding: 10,
    },
    card: {
        backgroundColor: APP_COLOR.WHITE,
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
        borderLeftWidth: 5, // Độ rộng của dải màu
        borderLeftColor: APP_COLOR.BLUE_NEW, // Màu sắc của dải
    },
    subjectName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
    },
    detailText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
});

export default DayTimeTable