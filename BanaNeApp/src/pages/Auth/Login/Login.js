import {NavigatorIOS, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import colors from '../../../Styles/colors';
import {Formik} from 'formik';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const initialFormValues = {
  usermail: '',
  password: '',
};

const Login = ({navigation}) => {
  function handleSignUp() {
    navigation.navigate('SignPage');
  }
  async function handleFormSubmit(formValues) {
    try {
      auth().signInWithEmailAndPassword(
        formValues.usermail,
        formValues.password,
      );
    } catch (error) {
      showMessage({
        message: error.code,
        type: 'danger',
      });
    }
  }

  return (
    
    <View style={styles.container}>
      <Text style={styles.header}>bana ne ?</Text>
      <Formik initialValues={initialFormValues} onSubmit={handleFormSubmit}>
        {({values, handleChange, handleSubmit}) => (
          <>
            <Input
              onType={handleChange('usermail')}
              value={values.usermail}
              placeholder="e-posta giriniz ..."
            />
            <Input
              onType={handleChange('password')}
              value={values.password}
              placeholder="Şifrenizi giriniz ..."
              isSecure
            />
            <Button
              text={'Giriş Yap'}
              onPress={handleSubmit}
            />
          </>
        )}
      </Formik>
      <Button text={'Kayıt Ol'} theme="secondary" onPress={handleSignUp} />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    color: colors.darkgreen,
    margin: 10,
    fontSize: 100,
    paddingLeft: 75,
  },
});
