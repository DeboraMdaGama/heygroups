import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Search from "../pages/Search";
import Messages from "../pages/Messages";

const Stack = createStackNavigator();

export default function AppRoutes() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: "Faça Login",
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#222222",

            borderBottomColor: "#bcccdc",
            borderBottomWidth: 1,
          },
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          title: "Procurando algum grupo?",
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#222222",

            borderBottomColor: "#bcccdc",
            borderBottomWidth: 1,
          },
        }}
      />
      <Stack.Screen
        name="Messages"
        component={Messages}
        options={{
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#222222",

            borderBottomColor: "#bcccdc",
            borderBottomWidth: 1,
          },
        }}
      />
    </Stack.Navigator>
  );
}
