import { getScheduleTimeTableStudentAPI } from '@/utils/api';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, SectionList } from 'react-native';
import { Calendar } from 'react-native-calendars';

interface TimeTableProps {
    selectedView: string;
}

interface ISectionItem {
    subjectName?: string;
    roomName?: string;
    time: string;
    teacherName: string;
}

interface ISection {
    title: string;
    date: string;
    data: ISectionItem[];
}

interface IFormattedItems {
    [date: string]: ISectionItem[];
}

interface IMarkedDates {
    [date: string]: {
        marked?: boolean;
        dotColor?: string;
        selected?: boolean;
        selectedColor?: string;
    };
}

const ITEM_HEIGHT = 100; // Approximate height of each event card, adjust based on actual styles
const HEADER_HEIGHT = 40; // Approximate height of section headers

const MonthTimeTable = ({ selectedView }: TimeTableProps) => {
    const currentDay = dayjs().format('YYYY-MM-DD');
    const [selectedDate, setSelectedDate] = useState<string>(currentDay);
    const [items, setItems] = useState<IFormattedItems>({});
    const [markedDates, setMarkedDates] = useState<IMarkedDates>({});
    const [loading, setLoading] = useState<boolean>(false);

    const sectionListRef = useRef<SectionList<ISectionItem>>(null); // Reference for SectionList

    const generateDateRange = (startDate: string, endDate: string): string[] => {
        const start = dayjs(startDate);
        const end = dayjs(endDate);
        const dates: string[] = [];
        let current = start;

        while (current.isBefore(end) || current.isSame(end)) {
            dates.push(current.format('YYYY-MM-DD'));
            current = current.add(1, 'day');
        }

        return dates;
    };

    // const fetchSchedule = async () => {
    //     setLoading(true);
    //     const res = await getScheduleTimeTableStudentAPI();

    //     if (res && res.data) {
    //         const data = res.data;
    //         const formattedItems = data.reduce((acc: IFormattedItems, schedule: any) => {
    //             const dateRange = generateDateRange(schedule.startDate, schedule.endDate);

    //             dateRange.forEach((date) => {
    //                 if (!acc[date]) {
    //                     acc[date] = [];
    //                 }

    //                 acc[date].push({
    //                     subjectName: schedule.subject.name,
    //                     roomName: schedule.room.name,
    //                     time: `${schedule.startTime} - ${schedule.endTime}`,
    //                     teacherName: schedule.teacher.name,
    //                 });
    //             });

    //             return acc;
    //         }, {});

    //         setItems(formattedItems);

    //         // Prepare marked dates
    //         const newMarkedDates = Object.keys(formattedItems).reduce((acc: IMarkedDates, date) => {
    //             acc[date] = { marked: true, dotColor: '#FFD700' };
    //             return acc;
    //         }, {});

    //         // Add the selected date styling
    //         newMarkedDates[currentDay] = {
    //             ...newMarkedDates[currentDay],
    //             selected: true,
    //             selectedColor: '#4285F4',
    //         };

    //         setMarkedDates(newMarkedDates);
    //     }
    //     setLoading(false);
    // };
    const fetchSchedule = async () => {
        setLoading(true);

        try {
            const res = await getScheduleTimeTableStudentAPI();

            if (res && res.data) {
                const data = res.data;

                // Transform data to Agenda format
                const formattedItems = data.reduce((acc: IFormattedItems, schedule: any) => {
                    const dateRange = generateDateRange(schedule.startDate, schedule.endDate);

                    dateRange.forEach((date) => {
                        const dayOfWeek = dayjs(date).day(); // Get the day of the week (0: Sunday, ..., 6: Saturday)

                        // Ensure the day matches `daysOfWeek` before adding
                        if (schedule.daysOfWeek.some((day: { id: number }) => day.id === dayOfWeek)) {
                            if (!acc[date]) {
                                acc[date] = [];
                            }

                            acc[date].push({
                                subjectName: schedule.subject.name,
                                roomName: schedule.room.name,
                                time: `${schedule.startTime} - ${schedule.endTime}`,
                                teacherName: schedule.teacher.name,
                            });
                        }
                    });

                    return acc;
                }, {});

                // Filter out dates without schedules
                const filteredItems = Object.keys(formattedItems)
                    .filter(date => formattedItems[date].length > 0)
                    .reduce((acc: IFormattedItems, date) => {
                        acc[date] = formattedItems[date];
                        return acc;
                    }, {});

                setItems(filteredItems);

                // Prepare marked dates only for dates with schedules
                const newMarkedDates = Object.keys(filteredItems).reduce((acc: IMarkedDates, date) => {
                    acc[date] = { marked: true, dotColor: '#FFD700' };
                    return acc;
                }, {});

                // Add the selected date styling
                newMarkedDates[currentDay] = {
                    ...newMarkedDates[currentDay],
                    selected: true,
                    selectedColor: '#4285F4',
                };

                setMarkedDates(newMarkedDates);
            }
        } catch (error) {
            console.error('Failed to fetch schedule:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSchedule();
    }, [selectedView]);

    const renderEvent = ({ item }: { item: ISectionItem }) => (
        <View style={styles.eventCard}>
            <Text style={styles.subject}>{item.subjectName}</Text>
            <Text style={styles.details}>Giờ: {item.time}</Text>
            <Text style={styles.details}>Phòng: {item.roomName}</Text>
            <Text style={styles.details}>Giảng viên: {item.teacherName}</Text>
        </View>
    );

    const sectionData: ISection[] = Object.keys(items).map((date) => ({
        title: dayjs(date).format('dddd, DD/MM/YYYY'),
        date,
        data: items[date],
    }));

    const handleDayPress = (day: any) => {
        const selected = day.dateString;

        // Update marked dates
        const newMarkedDates = {
            ...markedDates,
            [selectedDate]: { ...markedDates[selectedDate], selected: false },
            [selected]: { ...markedDates[selected], selected: true, selectedColor: '#4285F4' },
        };

        setMarkedDates(newMarkedDates);
        setSelectedDate(selected);

        // Scroll to the selected section
        const sectionIndex = sectionData.findIndex((section) => section.date === selected);
        if (sectionIndex !== -1) {
            sectionListRef.current?.scrollToLocation({
                sectionIndex,
                itemIndex: 0,
                animated: true,
            });
        }
    };

    return (
        <View style={styles.container}>
            <Calendar
                onDayPress={handleDayPress}
                markedDates={markedDates}
                theme={{
                    todayTextColor: '#FF0000',
                    arrowColor: '#4285F4',
                    selectedDayBackgroundColor: '#4285F4',
                }}
            />
            <View style={styles.eventList}>
                {loading ? (
                    <ActivityIndicator size="large" color="#4285F4" />
                ) : sectionData.length > 0 ? (
                    <SectionList
                        ref={sectionListRef}
                        sections={sectionData}
                        renderItem={renderEvent}
                        renderSectionHeader={({ section: { title } }) => (
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>{title}</Text>
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        stickySectionHeadersEnabled
                        getItemLayout={(data, index) => {
                            const sectionIndex = sectionData.findIndex((section) =>
                                section.data.some((_, i) => i === index)
                            );
                            const offset = sectionIndex * HEADER_HEIGHT + index * ITEM_HEIGHT;
                            return {
                                length: ITEM_HEIGHT,
                                offset,
                                index,
                            };
                        }}
                        onScrollToIndexFailed={(info) => {
                            sectionListRef.current?.scrollToLocation({
                                sectionIndex: info.highestMeasuredFrameIndex,
                                itemIndex: 0,
                                animated: true,
                            });
                        }}
                    />
                ) : (
                    <Text style={styles.noEvent}>Không có sự kiện nào</Text>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    eventList: {
        flex: 1,
        paddingHorizontal: 15,
    },
    sectionHeader: {
        backgroundColor: '#f4f4f4',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4285F4',
    },
    eventCard: {
        backgroundColor: '#f0f8ff',
        marginBottom: 10,
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    subject: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    details: {
        fontSize: 14,
        marginBottom: 3,
    },
    noEvent: {
        textAlign: 'center',
        color: '#555',
        fontSize: 14,
        marginTop: 20,
    },
});

export default MonthTimeTable;
