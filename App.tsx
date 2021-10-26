import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StatusBar } from "react-native";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import Routes from "./src/routes";

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined;
      Login: undefined;
      Search: undefined;
      Messages: { thread: FirebaseFirestoreTypes.DocumentData };
    }
  }
}

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar
        backgroundColor="#222222"
        barStyle="light-content"
        translucent={false}
      />
      <Routes />
    </NavigationContainer>
  );
};

export default App;
