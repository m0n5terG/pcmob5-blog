import React from 'react';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { AutoGrowTextInput } from 'react-native-auto-grow-textinput';

export default function TextInputForm() {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <AutoGrowTextInput placeholder={'Start Here'} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 25,
    flexDirection: 'row',
    padding: 15,
    marginVertical: 10,
  },
});