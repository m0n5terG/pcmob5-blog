import React from "react";
import Icon from "react-native-vector-icons";
import AccountScreen from "../screens/AccountScreen";
import IndexScreen from "../screens/IndexScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function BlogStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Index"
        component={IndexScreen}
        options={{ headerLeft: null }}
      />
    </Stack.Navigator>
  );
}

export default function TabStack() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Blog") {
            iconName = focused ? "ios-images" : "ios-image";
          } else if (route.name === "Account") {
            iconName = focused ? "ios-person" : "ios-people";
          }

          // You can return any component that you like here!
          return (
            <Icon name={iconName} type="Ionicons" size={size} color={color} />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Blog" component={BlogStack} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
};
