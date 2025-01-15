import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, Pressable } from "react-native"
import { AntDesign } from "@expo/vector-icons";
import { APP_COLOR } from "@/utils/constant";
import React from "react";
import { getScheduleTimeTableStudentAPI } from "@/utils/api";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { router } from "expo-router";
dayjs.extend(customParseFormat);
const SubjectToday = () => {
    const [scheduleData, setScheduleData] = React.useState<ISchedule[]>([]);

    React.useEffect(() => {
        // Fetch API
        fetchSchedule();
    }, []);
    const fetchSchedule = async () => {
        const res = await getScheduleTimeTableStudentAPI();

        if (res && res.data) {
            const data = await res.data

            setScheduleData(data);
        }
    };

    const currentDay = dayjs().format('dddd');
    const todaySchedules = scheduleData.filter(schedule =>
        schedule.daysOfWeek.some(day => day.name === currentDay)
    );

    const renderItem = (item: ISchedule) => {
        const now = dayjs();
        const currentTime = dayjs(now.format('HH:mm:ss'), 'HH:mm:ss');
        const startTime = dayjs(item.startTime, 'HH:mm:ss');
        const endTime = dayjs(item.endTime, 'HH:mm:ss');

        const isDisabled = false;
        // const isDisabled = currentTime.isBefore(startTime) || currentTime.isAfter(endTime);

        return (
            <Pressable
                style={({ pressed }) => [
                    styles.itemContainer,
                    isDisabled && styles.disabledItem, // Thêm kiểu cho trạng thái isDisabled
                    pressed && !isDisabled && styles.pressedItem, // Hiệu ứng khi nhấn
                ]}

                onPress={() => 
                    router.replace({
                        pathname: "/(user)/attendance/scanattendance",
                        params: { scheduleId: item.id }
                    })
                }
                disabled={isDisabled}
            >
                <Text style={styles.subject}>Môn học: {item.subject?.name}</Text>
                <Text style={styles.teacher}>Giáo viên: {item.teacher?.name}</Text>
                <Text style={styles.time}>
                    Giờ học: {item.startTime} - {item.endTime}
                </Text>
                {isDisabled && (
                    <Text style={styles.disabledText}>Không trong thời gian học</Text>
                )}
            </Pressable>
        )
    };
    return (
        <View style={styles.container}>

            {todaySchedules.length > 0 ?
                (
                    <FlatList
                        data={todaySchedules}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => renderItem(item)}
                    />
                ) : (
                    <>
                        <AntDesign name="frowno" size={64} color={APP_COLOR.GREY} style={styles.icon} />
                        <Text style={styles.title}>Không có dữ liệu!</Text>
                    </>
                )}

        </View>
    )
}

const styles = StyleSheet.create({
    // Container chính
    container: {
        flex: 1,
        backgroundColor: APP_COLOR.CULTURED, 
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    pressedItem: {
        backgroundColor: "#f0f0f0",
    },
    icon: {
        marginBottom: 20,
    },
    title: {
        fontSize: 22, // Font lớn hơn để dễ nhìn
        fontWeight: "600", // Font chữ trung bình
        textAlign: "center",
        color: "#4f4f4f", // Màu xám đậm
        opacity: 0.8,
    },

    // Container của danh sách
    container_render: {
        flex: 1,
        backgroundColor: "#ffffff", // Màu nền trắng cho nội dung
        padding: 16,
    },

    // Item card
    itemContainer: {
        padding: 20, // Tăng khoảng cách bên trong
        marginVertical: 12, // Khoảng cách giữa các item
        backgroundColor: "#ffffff", // Màu nền trắng cho card
        borderRadius: 15, // Bo góc nhiều hơn
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 }, // Đổ bóng xuống dưới
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5, // Hiệu ứng nổi trên Android
        borderWidth: 1, // Viền nhẹ
        borderColor: "#dcdcdc", // Màu viền xám nhạt
        width: "100%", 
        alignSelf: "center", 
    },

    // Môn học
    subject: {
        fontSize: 20, 
        fontWeight: "bold", 
        color: "#2b2d42", 
        marginBottom: 10, 
    },

    // Giáo viên
    teacher: {
        fontSize: 16, 
        color: "#6c757d", 
        marginBottom: 6,
    },

    // Giờ học
    time: {
        fontSize: 16,
        color: "#007bff", 
        fontWeight: "500",
    },
    disabledItem: {
        backgroundColor: "#f8f9fa", 
        borderColor: "#e0e0e0",
    },
    disabledText: {
        fontSize: 14,
        color: "#ff6f61",
        marginTop: 8,
        fontWeight: "bold",
    },
});



export default SubjectToday;