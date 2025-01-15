import { getScheduleTimeTableStudentAPI } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import dayjs from "dayjs";
import * as React from "react";
import { Dimensions, Text, View, Image, Pressable } from "react-native";
import Carousel, {
    ICarouselInstance,
} from "react-native-reanimated-carousel";
import iconSchedule from "@/assets/icon/Education.png";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Easing } from 'react-native-reanimated';
import { router } from "expo-router";

const { width,height } = Dimensions.get("window");

function BannerHome() {
    const ref = React.useRef<ICarouselInstance>(null);
    const [scheduleData, setScheduleData] = React.useState<ISchedule[]>([]);

    React.useEffect(() => {
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
    return (
        <View style={{ flex: 1, marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ 
                flexDirection:"row",
                justifyContent: 'space-between', 
                alignItems: 'center', 
                backgroundColor: '#FFF',
                width: width-25, 
                height: 100,
                borderRadius:10,
                }}>
                <Image source={iconSchedule} style={{ width: 80, height: 80, margin:10 }} />
                {todaySchedules.length > 0 ? (
                <Carousel
                    ref={ref}
                    width={width-200}
                    height={100}
                    data={todaySchedules}
                    vertical
                    autoPlayInterval={5000}
                    autoPlay={true}
                    renderItem={({ item, index }) => (
                        <View
                             key={index}
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                padding: 10,
                            }}
                        >
                            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                                {item.subject.name}
                            </Text>
                            <Text style={{ fontSize: 10, color: APP_COLOR.BLUE_NEW, fontWeight: "bold" }}>
                                Thời gian: {item.startTime} - {item.endTime}
                            </Text>
                            <Text style={{ fontSize: 10, color: APP_COLOR.BLUE_NEW, fontWeight: "bold" }}>
                                Phòng: {item.room.name}
                            </Text>
                        </View>
                    )}
                />
            ) : (
                <View style={{
                    width: width - 200,
                    height: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#FFF',
                }}>
                            <Text style={{ fontSize: 18, color: APP_COLOR.BLUE_NEW, fontWeight: 'bold' }}>
                        Không có buổi học nào hôm nay.
                    </Text>
                </View>
            )}
                <Pressable
                    onPress={() => router.navigate("/(tabs)/schedule")}
                >
                    <MaterialCommunityIcons name="arrow-right" size={24} color={APP_COLOR.BLUE_BTN} style={{ marginRight: 10, }} />
                </Pressable>
            </View>
           
        </View>
    );
}

export default BannerHome;
