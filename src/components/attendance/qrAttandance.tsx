import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { scanAttendanceStudentAPI } from '@/utils/api';
import Toast from 'react-native-root-toast';
import { APP_COLOR } from '@/utils/constant';
import { router, useLocalSearchParams } from 'expo-router';
import { CameraType, CameraView, Camera } from 'expo-camera';

const QRScan = () => {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scanned, setScanned] = useState<boolean>(false);
    const [cameraType, setCameraType] = useState<CameraType>('back');
    const { scheduleId } = useLocalSearchParams();

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const checkData = (data: any) => {
        const checkData = JSON.parse(data);

        if (checkData.scheduleId != scheduleId) {
            return true;
        }
        return false;
    }
    const handleBarCodeScanned = async ({ data }: any) => {
        setScanned(true);
        try {
            if (checkData(data) === true) {
                const m = "QR không hợp lệ"
                Toast.show(m, {
                    duration: Toast.durations.LONG,
                    textColor: "white",
                    backgroundColor: APP_COLOR.ORANGE,
                    opacity: 1
                });
                setScanned(true)
            
            }else{
                const response = await scanAttendanceStudentAPI(data)
                console.log(response);
                if (response && response.data) {
                    const m = "Điểm danh thành công"
                    Toast.show(m, {
                        duration: Toast.durations.LONG,
                        textColor: "white",
                        backgroundColor: APP_COLOR.BLUE_NEW,
                        opacity: 1
                    });
                    router.navigate("/(tabs)");
                } else {
                    const m = Array.isArray(response.message)
                        ? response.message[0] : response.message;
                    Toast.show(m, {
                        duration: Toast.durations.LONG,
                        textColor: "white",
                        backgroundColor: APP_COLOR.ORANGE,
                        opacity: 1
                    });
                }
            }
           
        } catch (err) {
            console.error('Error sending QR data to backend:', err);
        }
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <CameraView
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                barcodeScannerSettings={{
                    barcodeTypes: ["qr"],
                }}
                facing={cameraType}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned && (
                <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
            )}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default QRScan;