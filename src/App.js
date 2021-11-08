import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect } from "react";
import { Alert } from "react-native";
import MainStackNavigation from "../src/components/MainStackNavigation";
import messaging from '@react-native-firebase/messaging';

const App = () => {
    return (
        <NavigationContainer>
            <StatusBar backgroundColor={"transparent"} translucent={true} />

            <MainStackNavigation />
        </NavigationContainer>
    );
};

export default App;