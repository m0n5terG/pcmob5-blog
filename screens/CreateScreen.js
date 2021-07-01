import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Platform } from "react-native";
import InputForm from "../components/InputForm";
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API = "http://m0n5terg.pythonanywhere.com";
const API_CREATE = "/create";

export default function CreateScreen({ navigation }) {
  
  async function submitPost() {
    var ErrorFound = false;
    Keyboard.dismiss();

    if (Title == "") {
      setTitleError(true);
      setErrorText("Title cannot be blank");
      ErrorFound = true;
    }
    else
      setTitleError(false);

    if (imageData == null) {
      setImageDataError(true);
      setErrorText("Picture cannot be blank");
      ErrorFound = true;
    }
    else
      setImageDataError(false);

    if (!ErrorFound) {
      try {
        setIsLoading(true);

        const token = await AsyncStorage.getItem("token");

        const response = await axios.post(API_CREATE, 
          {
            Title,
            imageData,
            Description
          },
          {
          headers: { Authorization: `JWT ${token}` },
          }
        );

        setIsLoading(false);

        navigation.navigate('Index');
      } 
      catch (error) {
        setIsLoading(false);

        if (error.response) {
          if (error.response.status == 401)
            signOut();
          else
            console.log(error.response.data);
        } 
        else
          console.log(error);
      }
    }
  }

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <ScrollView style={{paddingHorizontal: 10}}>

      <Text style={styles.text}>Title</Text>
      <InputForm 
        onChangeText={(input) => setTitle(input)}/>
      <Text style={styles.text}>Description</Text>
      <InputForm
        onChangeText={(input) => setDescription(input)} />
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          style={styles.loginBtn}
          activeOpacity={0.8}
          onPress={() => setModalVisible(true)}>
          <Text style={{color: 'white'}}>Post</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loginBtn: {
    width: '50%',
    backgroundColor: '#0482f7',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: 'grey',
  },
  text: {
    padding: 10,
    fontSize: 16
  },
})
