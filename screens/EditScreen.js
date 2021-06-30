import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { commonStyles } from "../styles/commonStyles";

export default function EditScreen({ navigation }) {
  return (
    <View style={commonStyles.container}>
      <Text>Edit Screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Show")}>
          <Text style={styles.navText}>to show</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
