import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
import { observer } from "mobx-react";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { useStore } from "../store";
import { User } from "../types";

export const Header = observer(() => {
  const { navigate } = useNavigation();
  const store = useStore();

  const signOut = async () => {
    store.user = null as unknown as User;
    await AsyncStorage.removeItem("user");

    // @ts-ignore
    navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>DeviceChecker</Text>
      {store.user && (
        <View style={{ alignItems: "flex-end" }}>
          {store.user.type === "admin" && <Text>Create new device</Text>}
          <Text onPress={signOut}>Sign out</Text>
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    height: 120,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    paddingTop: 48,
  },
  logo: {
    fontSize: 22,
  },
});
