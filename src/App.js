import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect } from "react";
import { Alert, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MainStackNavigation from "../src/components/MainStackNavigation";
import { fcmService } from "./services/FCMService";
import { localNotificationService } from "./services/LocalNotificationService";

const App = () => {
    useEffect(() => {
        fcmService.registerAppWithFCM();
        fcmService.register(onRegister, onNotification, onOpenNotification);
        localNotificationService.configure(onOpenNotification);

        function onRegister(token) {
            console.log('[App] onRegister : token : ', token);
        }

        function onNotification(notify) {
            console.log('[App] onNotification : notify : ', notify);
            const options = {
                soundName: 'default',
                playSound: true,
            };
            localNotificationService.showNotification(
                0,
                notify.title,
                notify.body,
                notify,
                options,
            );
        }

        function onOpenNotification(notify) {
            console.log('[App] onOpenNotification : notify : ', notify);
        }

        return () => {
            console.log('[App] unRegister');
            fcmService.unRegister();
            localNotificationService.unRegister();
        };
    }, []);

    return (
        <NavigationContainer>
            <StatusBar backgroundColor={"transparent"} translucent={true} />

            <MainStackNavigation />
        </NavigationContainer>
    );
};

export default App;