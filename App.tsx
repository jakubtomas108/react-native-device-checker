import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { User } from "./types";
import { useStore } from "./store";

import { Header } from "./components/Header";
import { Login } from "./pages/Login";
import { DeviceList } from "./pages/DeviceList";

const Stack = createNativeStackNavigator();

const commonOptions = { header: () => <Header /> };

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={commonOptions} />
        <Stack.Screen
          name="DeviceList"
          component={DeviceList}
          options={commonOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
