import React from "react";
import Icon from "react-native-vector-icons";
import AccountScreen from "../screens/AccountScreen";
import IndexScreen from "../screens/IndexScreen";
import CreateScreen from "../screens/CreateScreen";
import EditScreen from "../screens/EditScreen";
import ShowScreen from "../screens/ShowScreen";
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
      <Stack.Screen
        name="Post"
        component={CreateScreen}
        options={null} 
      />
      <Stack.Screen
        name="Edit"
        component={EditScreen}
        options={null} 
      />
      <Stack.Screen
        name="Show"
        component={ShowScreen}
        options={null} 
      />
    </Stack.Navigator>
  );
}

export default function TabStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Blog" component={BlogStack} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
};
