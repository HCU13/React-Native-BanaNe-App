import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './Auth/Login/Login';
import Sign from './Auth/Sign/Sign';
import FlashMessage from 'react-native-flash-message';
import Messages from '../pages/Messages/Messages';
import colors from '../Styles/colors';
import auth from '@react-native-firebase/auth';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();

const App = () => {
  const [userSession, setuserSession] = React.useState();

  React.useEffect(() => {
    auth().onAuthStateChanged(user => {
      setuserSession(!!user);
    });
  });
  const AuthStack = () => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="LoginPage" component={Login} />
        <Stack.Screen name="SignPage" component={Sign} />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!userSession ? (
          <Stack.Screen
            name="AuthStack"
            component={AuthStack}
            Options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen
            name="MessageScreen"
            component={Messages}
            options={{
              title: 'dertler',
              headerTintColor: colors.darkgreen,
              headerRight: () => (
                <Icon name="logout" size={30} color={colors.darkgreen} onPress={() => auth().signOut()}/>
              )
            }}
          />
        )}
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
