import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { commonStyles } from "../styles/commonStyles";

export default function CreateScreen({ navigation }) {
  return (
    <View style={commonStyles.container}>
      <Text>Create Screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Edit")}>
          <Text style={styles.navText}>Edit</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
