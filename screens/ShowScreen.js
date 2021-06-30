import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { commonStyles } from "../styles/commonStyles";

export default function ShowScreen({ navigation }) {
  return (
    <View style={commonStyles.container}>
      <Text>Show Screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Edit")}>
          <Text style={styles.navText}>Edit post</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Post")}>
          <Text style={styles.navText}>New post</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
