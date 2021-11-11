import { observer } from "mobx-react";
import React from "react";
import { View, StyleSheet, Image, Text, Button } from "react-native";

import { Device as IDevice } from "../types";

export const Device = observer((props: IDevice) => {
  const { id, code, os, osVersion, image, borrowed, model, vendor } = props;

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          source={{
            uri:
              image ||
              "https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101028/112815904-no-image-available-icon-flat-vector-illustration.jpg?ver=6",
          }}
          style={styles.image}
        />
        {!!borrowed && (
          <View style={styles.borrowedWrapper}>
            <Text style={styles.borrowedText}>
              Borrowed by {borrowed.user.name}
            </Text>
            <Text style={styles.borrowedText}>
              {new Date(borrowed.date).toLocaleDateString()}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.deviceInfo}>
        <Text style={styles.deviceTitle}>{model}</Text>
        <Text style={styles.subTitle}>
          {vendor} / {os} - {osVersion}
        </Text>
        <View style={styles.btnWrapper}>
          <Button
            title={!!borrowed ? "Return" : "Borrow"}
            color={!!borrowed ? "gray" : "orange"}
            onPress={() => {}}
          />
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    height: "auto",
    width: "100%",
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
  },
  deviceInfo: {
    padding: 8,
  },
  deviceTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 12,
  },
  subTitle: {
    fontSize: 16,
    color: "gray",
  },
  btnWrapper: {
    marginTop: 24,
  },
  imageWrapper: {
    position: "relative",
  },
  borrowedWrapper: {
    backgroundColor: "rgba(0,0,0,0.4)",
    position: "absolute",
    bottom: 0,
    height: 50,
    width: "100%",
    justifyContent: "center",
    padding: 12,
  },
  borrowedText: {
    color: "white",
  },
});
