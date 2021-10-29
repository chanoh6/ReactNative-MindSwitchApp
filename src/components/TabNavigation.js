import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Meet from "../Meet";
import Settings from "../Settings";
import Home from "../Home";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { color } from "react-native-reanimated";

const TabIcon = ({ name, size, color }) => {
  return <MaterialCommunityIcons name={name} size={size} color={color} />;
};

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: (props) => {
          let name = "";
          if (route.name === "Home") name = "home";
          else if (route.name === "Meet") name = "video";
          else name = "cog";
          return TabIcon({ ...props, name });
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#fff",
        tabBarStyle: { backgroundColor: "#141212" },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Meet"
        component={Meet}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          title: "Setting",
          headerTitleAlign: "center",
          headerStyle: {
            elevation: 0, // remove shadow on Android
            shadowOpacity: 0, // remove shadow on iOS
            borderBottomWidth: 0, // Just in case.
            backgroundColor: "#141212",
          },
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 32,
          },
          headerTintColor: "#fff",
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
