import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';

const Input = ({placeholder, onType, value, iconName,isSecure}) => {
  return (
    <View style={styles.container}>
      <TextInput
      autoCapitalize='none'
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onType}
        value={value}
        secureTextEntry={isSecure}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    padding: 1,
    margin: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
  },
});
