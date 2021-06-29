import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
    <Stack.Navigator>
        <Stack.Screen 
          mode="modal" 
          headerMode="none"
          initialRouteName={signedIn ? "Account" : "SignIn"}
        >
        <Stack.Screen component={AccountScreen} name="Account" />
        <Stack.Screen component={SignInScreen} name="SignIn" />
        <Stack.Screen component={SignUpScreen} name="SignUp" />
        </Stack.Screen>
    </Stack.Navigator>
}

