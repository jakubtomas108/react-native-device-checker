import { useNavigation } from "@react-navigation/core";
import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { api } from "../lib";
import { useStore } from "../store";

export const Login = observer(() => {
  const [email, setEmail] = useState("gandalf.the.grey@etnetera.cz");
  const [password, setPassword] = useState("wh1tew1zard");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { navigate } = useNavigation();
  const store = useStore();

  const signIn = async () => {
    setError("");

    if (!email) return setError("Invalid email");
    if (!password) return setError("Invalid password");

    setLoading(true);

    const res = await api.post("https://js-test-api.etnetera.cz/api/v1/login", {
      login: email,
      password,
    });

    if (res.error) {
      setError(res.error);
      setLoading(false);
      return;
    }

    store.setUser(res);
    await AsyncStorage.setItem("user", JSON.stringify(res));
    setLoading(false);

    // @ts-ignore
    navigate("DeviceList");
  };

  useEffect(() => {
    (async () => {
      const user = await AsyncStorage.getItem("user");

      if (user) {
        store.setUser(JSON.parse(user));

        // @ts-ignore
        navigate("DeviceList");
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in to Device Checker</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />

      <Text style={styles.label}>Password</Text>
      <TextInput
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      {!!error && <Text style={styles.error}>{error}</Text>}

      <Button disabled={loading} title="Sign in" onPress={signIn} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 16,
  },
  input: {
    height: 38,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 16,
    width: "100%",
    textAlign: "center",
    marginBottom: 24,
  },
  label: {
    fontWeight: "bold",
    fontSize: 12,
    marginBottom: 6,
    alignSelf: "flex-start",
  },
  error: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 12,
    textAlign: "center",
  },
});
