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

    const renderItem = (item: any) => (
        <View style={[styles.card, item.isHighlighted && styles.highlightedCard]}>
            <Text style={styles.subjectName}>{item.subjectName}</Text>
            <Text style={styles.info}>Tiết: {item.lesson}</Text>
            <Text style={styles.info}>Giờ: {item.time}</Text>
            <Text style={styles.info}>Phòng: {item.roomName}</Text>
            <Text style={styles.info}>Giảng viên: {item.teacherName}</Text>
        </View>
    );

    const currentDay = dayjs().format('YYYY-MM-DD');
    return (
        <View style={styles.container}>
            <Agenda
                items={items}
                selected={currentDay}
                renderItem={(item: any) => renderItem(item)}
                renderEmptyDate={() => (
                    <View style={styles.emptyDate}>
                        <Text>Không có lịch học</Text>
                    </View>
                )}
                theme={{
                    agendaDayTextColor: '#333',
                    agendaDayNumColor: '#333',
                    agendaTodayColor: '#0056b3',
                    agendaKnobColor: '#0056b3',
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    highlightedCard: {
        backgroundColor: '#f8d7fc',
    },
    subjectName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0056b3',
        marginBottom: 5,
    },
    info: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
    },
    button: {
        marginTop: 10,
        backgroundColor: '#0056b3',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    emptyDate: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
        backgroundColor: '#f0f0f0',
        margin: 10,
        borderRadius: 8,
    },
    emptyText: {
        fontSize: 14,
        color: '#999',
    },
});