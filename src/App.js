import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect } from "react";
import { Alert } from "react-native";
import MainStackNavigation from "../src/components/MainStackNavigation";
import messaging from '@react-native-firebase/messaging';

const App = () => {
    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
        });

        return unsubscribe;
    }, []);

    return (
        <NavigationContainer>
            <StatusBar backgroundColor={"transparent"} translucent={true} />

            <MainStackNavigation />
        </NavigationContainer>
    );
};

export default App;