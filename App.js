import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import SignInScreen from "./screens/SignInScreen";
import TabStack from "./components/TabStack";
import SignUpScreen from "./screens/SignUpScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Value } from "react-native-reanimated";

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState(false);

  async function loadToken() {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      setSignedIn(true);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadToken();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

   return (
    <NavigationContainer>
      {signedIn ? (
        <TabStack />
      ) : (
      <Stack.Navigator 
        mode="modal" 
        headerMode="none"
        initialRouteName="SignIn"
        >
        <Stack.Screen component={SignInScreen} name="SignIn" />
        <Stack.Screen component={SignUpScreen} name="SignUp" />
      </Stack.Navigator>
      )}
    </NavigationContainer>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
