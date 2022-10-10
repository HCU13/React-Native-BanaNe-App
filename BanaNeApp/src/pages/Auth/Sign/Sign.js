import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Input from '../../../components/Input/Input';
import Button from '../../../components/Button/Button';
import colors from '../../../Styles/colors';
import {Formik} from 'formik';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';

const initialFormValues = {
  usermail: '',
  password: '',
  repassword: '',
};

const Sign = ({navigation}) => {
  function handleLogin() {
    navigation.goBack();
  }
 async  function handleFormSubmit(formValues) {
    if (formValues.password != formValues.repassword) {
      showMessage({
        message: 'şifreler Uyuşmuyor',
        type: 'danger',
      });
      return;
    }
    try {
      await auth().createUserWithEmailAndPassword(
        formValues.usermail,
        formValues.password,
      );
      showMessage({
        message: 'Kullanıcı oluşturuldu',
        type: 'success',
      });
      navigation.navigate('LoginPage')
      
    } catch (error) {}
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
            <Input
              onType={handleChange('repassword')}
              value={values.repassword}
              placeholder="Şifrenizi tekrar giriniz ..."
              isSecure
            />
            <Button text={'Kayıt Ol'} onPress={handleSubmit} />
          </>
        )}
      </Formik>
      <Button text={'Geri'} theme="secondary" onPress={handleLogin} />
    </View>
  );
};

export default Sign;

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
