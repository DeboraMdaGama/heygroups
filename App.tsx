import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import AuthProvider from './src/contexts/auth';
import Routes from './src/routes';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

declare global{
  namespace ReactNavigation{
    interface RootParamList{
      Home: undefined;
      Login:undefined;
      Messages:{thread:FirebaseFirestoreTypes.DocumentData};
      Search:undefined;
    }
  }
}

const App = () => {
  return (
    <NavigationContainer>
        <StatusBar backgroundColor='#222222' barStyle='light-content' translucent={false}/>
        <Routes/>
     
    </NavigationContainer>
  );
};


export default App;
