import { useEffect, useState } from "react"
import { router, SplashScreen } from "expo-router"
import { getAccountAPI } from "@/utils/api"
import { useCurrentApp } from "@/context/app.context"
import AsyncStorage from "@react-native-async-storage/async-storage"
import React from "react"
import * as Notifications from 'expo-notifications';

const RootPage = () => {
    const { setAppState } = useCurrentApp()
    const [state, setState] = useState<any>()

    useEffect(() => {
        async function prepare() {
            try {
                // Pre-load fonts, make any API calls you need to do here
                const res = await getAccountAPI();

                Notifications.setNotificationHandler({
                    handleNotification: async () => ({
                        shouldShowAlert: true,
                        shouldPlaySound: true,
                        shouldSetBadge: false,

                    }),
                });
                if (res.data) {
                    //success
                    setAppState({
                        user: res.data.user,
                        access_token: await AsyncStorage.getItem("access_token")
                    })
                    router.replace("/(tabs)")
                } else {
                    //error
                    router.replace("/(auth)/login")
                }

            } catch (e) {
                setState(() => {
                    throw new Error("Không thể kểt nối với backend ...")
                })
                // console.warn(e);
            } finally {
                // Tell the application to render
                await SplashScreen.hideAsync();
            }
        }

        prepare();
    }, []);
    // if (true) {
    //     return (
    //         <Redirect href={"/(tabs)"}
    //     )
    // }

    return (
        <>

        </>
    )
}


export default RootPage
