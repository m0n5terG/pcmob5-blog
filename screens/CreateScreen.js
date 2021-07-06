import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Keyboard } from "react-native";
import { AutoGrowTextInput } from 'react-native-auto-grow-textinput';
import ImageInput from '../components/ImageInput';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API = "http://m0n5terg.pythonanywhere.com";
const API_CREATE = "/create";


export default function CreateScreen({ navigation }) {
  const [image, setImage] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const scrollView = useRef();

  
  async function createPost() {
    console.log("--- Create Post ---");
    Keyboard.dismiss();
      try {
        setIsLoading(true);
  //      const token = await AsyncStorage.getItem("token");

        const response = await axios.post(API + API_CREATE, 
          {
            title,
            image,
            content
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

  const handleAdd = (uri) => {
    setImage([...image, uri]);
  };

  const handleRemove = (uri) => {
    setImage(image.filter((image) => image !== uri));
  };


  return (
    <View style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        ref={scrollView}
        horizontal
        onContentSizeChange={() => scrollView.current.scrollToEnd()}>
        <View style={styles.imageContainer}>
          {image.map((uri) => (
            <View key={uri} style={styles.image}>
              <ImageInput
                image={uri}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    <ScrollView style={{paddingHorizontal: 10}}>
      
      <Text style={styles.text}>Title</Text>
      <AutoGrowTextInput
            value={title}
            onChangeText={(input) => setTitle(input)}
            style={styles.textInput}
            placeholder={'Title'}
            placeholderTextColor='#66737C'
          />
      <Text style={styles.text}>Content</Text>
      <AutoGrowTextInput
            value={content}
            onChangeText={(input) => setContent(input)}
            style={styles.textInput}
            placeholder={'Content'}
            placeholderTextColor='#66737C'
            maxHeight={200}
            minHeight={45}
            enableScrollToCaret
          />
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          style={styles.loginBtn}
          activeOpacity={0.8}
          onPress={() => createPost()}>
          <Text style={{color: 'white'}}>Post</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    
  },
  ImageContainer: {
    flexDirection: 'row',
  },
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
    fontSize: 16,
    textAlign: 'center'
  },
  image: {
    marginRight: 10,
  },
});