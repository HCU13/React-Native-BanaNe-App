import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import colors from '../../Styles/colors'

const Button = ({text, onPress, loading, theme = 'primary'}) => {
  return (
    <TouchableOpacity
      disabled={loading}
      style={styles[theme].container}
      onPress={onPress}>
      {loading ? (
        <ActivityIndicator color={'white'} />
      ) : (
        <View style={styles[theme].button_container}>
        <Text style={styles[theme].title}>{text}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const base_style = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  button_container:{
    flexDirection:'row',
    alignItems:'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 17,
    color: 'white',
  },
})

const styles = {
  primary: StyleSheet.create({
    ...base_style,
    container: {
      ...base_style.container,
      backgroundColor:colors.darkgreen,
    },
    title: {
      ...base_style.title,
      color: 'white',
    },
  }),
  secondary: StyleSheet.create({
    ...base_style,
    container: {
      ...base_style.container,
      backgroundColor:'white',
      borderWidth:1,
      borderColor:colors.darkgreen,
    },
    title: {
      ...base_style.title,
      color: colors.darkgreen,
    },
  })
}
