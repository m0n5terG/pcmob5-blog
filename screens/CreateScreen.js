import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Platform } from "react-native";
import InputForm from "../components/InputForm";
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_WHOAMI = "https://weihong1988.pythonanywhere.com/whoami";
const API_CREATEPOST = "https://weihong1988.pythonanywhere.com/create";

export default function CreateScreen({ navigation }) {
  const [Title, setTitle] = useState("");
  const [TitleError, setTitleError] = React.useState(false);

  const [imageData, setImageData] = useState(null);
  const [imageDataError, setImageDataError] = React.useState(false);

  const [Description, setDescription] = useState("");

  const [errorText, setErrorText] = useState("");
  const [isLoading, setIsLoading] = useState(true);


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

        const response = await axios.post(API_CREATEPOST, 
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
        await ImagePicker.requestCameraPermissionsAsync();
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      }
    })();
  }, []);

  const LaunchCamera = async () => {
    var cameraResponse = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (cameraResponse.cancelled) {
      return;
    }

    const FormattedImage = await ImageManipulator.manipulateAsync(
      cameraResponse.localUri || cameraResponse.uri,
      [{resize: { width: 300, height: 300, }}],
      {compress: 0.5, base64: true}
    );

    setImageData(FormattedImage.base64);
  };

  const LaunchGallery = async () => {
    var galleryResponse = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (galleryResponse.cancelled) {
      return;
    }

    const FormattedImage = await ImageManipulator.manipulateAsync(
      galleryResponse.localUri || galleryResponse.uri,
      [{resize: { width: 300, height: 300, }}],
      {compress: 0.5, base64: true}
    );

    setImageData(FormattedImage.base64);
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
});  