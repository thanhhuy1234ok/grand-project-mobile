import { getScheduleTimeTableStudentAPI } from '@/utils/api';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Agenda } from 'react-native-calendars';

export default function TimeTable() {
    const [items, setItems] = useState();

    const generateDateRange = (startDate: string, endDate: string) => {
        const start = dayjs(startDate);
        const end = dayjs(endDate);
        const dates = [];
        let current = start;

        while (current.isBefore(end) || current.isSame(end)) {
            dates.push(current.format('YYYY-MM-DD'));
            current = current.add(1, 'day');
        }

        return dates;
    };
        React.useEffect(() => {
            // Fetch API
            fetchSchedule();
        }, []);
        const fetchSchedule = async () => {
            const res = await getScheduleTimeTableStudentAPI();
    
            if (res && res.data) {
                const data = await res.data
                // Transform data to Agenda format
                const formattedItems = data.reduce((acc: any, schedule: ISchedule) => {
                    const dateRange = generateDateRange(schedule.startDate, schedule.endDate);

                    dateRange.forEach(date => {
                        if (!acc[date]) {
                            acc[date] = [];
                        }

                        acc[date].push({
                            subjectName: `${schedule.subject.name}`,
                            roomName: `${schedule.room.name}`,
                            time: `${schedule.startTime} - ${schedule.endTime}`,
                            teacherName: `${schedule.teacher.name}`,
                        });
                    });

                    return acc;
                }, {});

                setItems(formattedItems);
            }
        };
    
        const currentDay = dayjs().format('YYYY-MM-DD');
    return (
        <View style={styles.container}>
            <Agenda
                items={items}
                selected={currentDay}
                renderItem={(item: any) => (
                    <View style={styles.item}>
                        <Text>Môn học: {item.subjectName}</Text>
                        <Text>Lớp:{item.roomName}</Text>
                        <Text>Thời gian: {item.time}</Text>
                        <Text>Giảng viên: {item.teacherName}</Text>
                    </View>
                )}
                renderEmptyDate={() => (
                    <View style={styles.emptyDate}>
                        <Text>Không có lịch học</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 10,
        marginVertical: 30,
        borderRadius: 5,
        justifyContent: 'center',
    },
    emptyDate: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
