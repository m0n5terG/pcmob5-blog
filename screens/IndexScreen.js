import React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { commonStyles } from "../styles/commonStyles";

export default function IndexScreen({ navigation }) {
  return (
    <View style={commonStyles.container}>
      <Text>Index Screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Post")}>
          <Text style={styles.navText}>Post</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
