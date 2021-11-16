import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Pay from "../Pay";
import User from "../screen/setting/User"
import Subscribe from "../screen/setting/Subscribe"
import Notification from "../screen/setting/Notification"
import Qna from "../screen/setting/Qna"
import Faq from "../screen/setting/Faq"
import Notice from "../screen/setting/Notice"
import Version from "../screen/setting/Version"
import TabNavigation from "./TabNavigation";
import Leave from "../screen/setting/Leave";

const Stack = createStackNavigator();

const MainStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Main"
    >
      <Stack.Screen
        name="Main"
        component={TabNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Pay"
        component={Pay}
        options={{ headerShown: false, presentation: 'modal' }}
      />
      <Stack.Screen
        name="Leave"
        component={Leave}
        options={{
          cardStyleInterpolator: ({ index, current, next, layouts: { screen } }) => {
            const translateX = current.progress.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [screen.width, 0, 0],
            });

            const opacity = next?.progress.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [1, 0, 0],
            });

            return { cardStyle: { opacity, transform: [{ translateX }] } };
          },
          title: "계정 탈퇴",
          headerTitleAlign: "center",
          headerStyle: {
            elevation: 0, // remove shadow on Android
            shadowOpacity: 0, // remove shadow on iOS
            borderBottomWidth: 0, // Just in case.
            backgroundColor: "#141212",
          },
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 24,
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="User"
        component={User}
        options={{
          cardStyleInterpolator: ({ index, current, next, layouts: { screen } }) => {
            const translateX = current.progress.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [screen.width, 0, 0],
            });

            const opacity = next?.progress.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [1, 0, 0],
            });

            return { cardStyle: { opacity, transform: [{ translateX }] } };
          },
          title: "내 정보",
          headerTitleAlign: "center",
          headerStyle: {
            elevation: 0, // remove shadow on Android
            shadowOpacity: 0, // remove shadow on iOS
            borderBottomWidth: 0, // Just in case.
            backgroundColor: "#141212",
          },
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 24,
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="Subscribe"
        component={Subscribe}
        options={{
          cardStyleInterpolator: ({ index, current, next, layouts: { screen } }) => {
            const translateX = current.progress.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [screen.width, 0, 0],
            });

            const opacity = next?.progress.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [1, 0, 0],
            });

            return { cardStyle: { opacity, transform: [{ translateX }] } };
          },
        }}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{
          cardStyleInterpolator: ({ index, current, next, layouts: { screen } }) => {
            const translateX = current.progress.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [screen.width, 0, 0],
            });

            const opacity = next?.progress.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [1, 0, 0],
            });

            return { cardStyle: { opacity, transform: [{ translateX }] } };
          },
          title: "알림 설정",
          headerTitleAlign: "center",
          headerStyle: {
            elevation: 0, // remove shadow on Android
            shadowOpacity: 0, // remove shadow on iOS
            borderBottomWidth: 0, // Just in case.
            backgroundColor: "#141212",
          },
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 24,
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="Qna"
        component={Qna}
        options={{
          cardStyleInterpolator: ({ index, current, next, layouts: { screen } }) => {
            const translateX = current.progress.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [screen.width, 0, 0],
            });

            const opacity = next?.progress.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [1, 0, 0],
            });

            return { cardStyle: { opacity, transform: [{ translateX }] } };
          },
        }}
      />
      <Stack.Screen
        name="Faq"
        component={Faq}
        options={{
          cardStyleInterpolator: ({ index, current, next, layouts: { screen } }) => {
            const translateX = current.progress.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [screen.width, 0, 0],
            });

            const opacity = next?.progress.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [1, 0, 0],
            });

            return { cardStyle: { opacity, transform: [{ translateX }] } };
          },
        }}
      />
      <Stack.Screen
        name="Notice"
        component={Notice}
        options={{
          cardStyleInterpolator: ({ index, current, next, layouts: { screen } }) => {
            const translateX = current.progress.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [screen.width, 0, 0],
            });

            const opacity = next?.progress.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [1, 0, 0],
            });

            return { cardStyle: { opacity, transform: [{ translateX }] } };
          },
          title: "공지사항",
          headerTitleAlign: "center",
          headerStyle: {
            elevation: 0, // remove shadow on Android
            shadowOpacity: 0, // remove shadow on iOS
            borderBottomWidth: 0, // Just in case.
            backgroundColor: "#141212",
          },
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 24,
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="Version"
        component={Version}
        options={{
          cardStyleInterpolator: ({ index, current, next, layouts: { screen } }) => {
            const translateX = current.progress.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [screen.width, 0, 0],
            });

            const opacity = next?.progress.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [1, 0, 0],
            });

            return { cardStyle: { opacity, transform: [{ translateX }] } };
          },
          headerStyle: {
            elevation: 0, // remove shadow on Android
            shadowOpacity: 0, // remove shadow on iOS
            borderBottomWidth: 0, // Just in case.
            backgroundColor: "#141212",
          },
          headerTitleStyle: {
            color: '#141212',
          },
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigation;
