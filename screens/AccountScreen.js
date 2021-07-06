import React, { useState, useEffect } from "react";
import { ActivityIndicator, Platform, StyleSheet, Text, View, Image, Button } from "react-native";
import { IconButton, Colors } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import SignInScreen from "./SignInScreen";

const API = "http://m0n5terg.pythonanywhere.com";
const API_WHOAMI = "/whoami";

export default function AccountScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  async function getUserProfile() {
    setLoading(true);
    console.log("---- Getting user profile ----");
    const token = await AsyncStorage.getItem("token");
    console.log(`Token is ${token}`);
    
    try {
      const response = await axios.get(API + API_WHOAMI, {
        headers: { Authorization: `JWT ${token}` },
      });
      console.log("Got user name!");
      setUsername(response.data.username);

      setLoading(false);

    } catch (error) {
      console.log("Error getting user profile");
      setLoading(false)
      if (error.response) {
        console.log(error.response.data);
        if (error.response.data.status_code === 401) {
          signOut();
        }        
      } else {
        console.log(error);
      }
      // We should probably go back to login screen?
    }
  }
  
  useEffect(() => {
    console.log("Setting up nav listener");
    // Check for when we come back to this screen
    const removeListener = navigation.addListener("focus", () => {
      console.log("Running nav listener");
      setUsername;
      getUserProfile();
    });
    getUserProfile();

    return removeListener;
  }, []);

  function signOut() {
    AsyncStorage.removeItem("token");
    AsyncStorage.getItem("token")
    .then(result => console.log(`Token: ${result}`))
    navigation.replace("SignIn");
    console.log("Signing Out")
    
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Account Screen</Text>
        <View style={{ alignSelf: "center" }}>
          <View style={styles.profileImage}>
            <Image
              source={profileImage ? { uri: profileImage }
              : require("../assets/tempAvatar.jpg")}
              style={styles.image}
              resizeMode='center'
            />
          </View>
        <View style={styles.camera}>
          <IconButton
            icon="camera"
            color={Colors.red500}
            size={40}
            style={styles.camera}
            onPress={null}
          />
        </View>
      </View>
        {loading ? <ActivityIndicator /> : <Text style={styles.name}>{username}</Text>}
      <Button
        title="Sign Out"
        onPress={signOut}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    fontSize: 40,
    alignSelf: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 170,
    height: 170,
    borderRadius: 100,
    
    overflow: "hidden"
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined
  },
  name: {
    fontSize: 30,
    alignSelf: "center",
    marginBottom: 40,
    marginTop: 20
  },
  camera: {
    position: "absolute",
    bottom: 0,
    right: 0,
    padding: 0,
    height: 50,
    width: 40,
    alignItems: "center",
    justifyContent: "center"
  }
  });