import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect } from "react";
import { Alert, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MainStackNavigation from "../src/components/MainStackNavigation";

const App = () => {
    return (
        <NavigationContainer>
            <StatusBar backgroundColor={"transparent"} translucent={true} />

            <MainStackNavigation />
        </NavigationContainer>
    );
};

export default App;