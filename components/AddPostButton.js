import React from 'react';
import { FAB } from 'react-native-paper';

const AddPostButton = ({ onPress }) => (
    <FAB
      styles={{backgroundColor: 'blue'}}
      small
      icon='plus'
      onPress={onPress}
      position='bottomRight'
    />
);
