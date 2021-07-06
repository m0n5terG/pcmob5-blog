import React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { commonStyles } from "../styles/commonStyles";
import { FAB } from 'react-native-paper';

export default function IndexScreen({ navigation }) {
  return (
    <View style={commonStyles.container}>
      <Text>Index Screen</Text>
      <View style={styles.button}>
      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={() => navigation.navigate("Post")}
      />
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: -160,
    right: 0,
    bottom: -150,
  },
  botton: {
    flex: 0.5,
    
  }
});
