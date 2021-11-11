import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { observer } from "mobx-react";

import { api } from "../lib";
import { useStore } from "../store";
import { Device as IDevice } from "../types";

import { Device } from "../components/Device";

const systemOptions = ["-", "iOS", "Android", "Windows"];
const vendorOptions = [
  "-",
  "SAMSUNG",
  "APPLE",
  "ASUS",
  "LENOVO",
  "HUAWEI",
  "XIAOMI",
  "LG",
  "VODAFONE",
  "MOTOROLA",
  "ACER",
  "ANDROID",
];

export const DeviceList = observer(() => {
  const [loading, setLoading] = useState(true);
  const [originalList, setOriginalList] = useState<IDevice[]>([]);
  const [visibleList, setVisibleList] = useState<IDevice[]>([]);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    system: "-",
    vendor: "-",
    onlyAvailable: false,
  });

  const store = useStore();

  const fetchDeviceList = async () => {
    const res = await api.get("https://js-test-api.etnetera.cz/api/v1/phones", {
      headers: { "Auth-Token": store.user.token },
    });

    if (res.error) {
      setError(res.error);
      setLoading(false);
      return;
    }

    setOriginalList(res);
    setVisibleList(res);
    setLoading(false);
  };

  const setSystemFilter = (value: string) => {
    setFilters({
      ...filters,
      system: value,
      onlyAvailable: filters.onlyAvailable && false,
    });

    if (value !== "-") {
      setVisibleList(
        originalList.filter(
          (device) => device.os?.toLowerCase() === value.toLowerCase()
        )
      );
    } else {
      setVisibleList(
        filters.vendor !== "-"
          ? originalList.filter(
              (device) =>
                device.vendor?.toLowerCase() === filters.vendor.toLowerCase()
            )
          : originalList
      );
    }
  };

  const setVendorFilter = (value: string) => {
    setFilters({
      ...filters,
      vendor: value,
      onlyAvailable: filters.onlyAvailable && false,
    });

    if (value !== "-") {
      setVisibleList(
        originalList.filter(
          (device) => device.vendor?.toLowerCase() === value.toLowerCase()
        )
      );
    } else {
      setVisibleList(
        filters.system !== "-"
          ? originalList.filter(
              (device) =>
                device.os?.toLowerCase() === filters.system.toLowerCase()
            )
          : originalList
      );
    }
  };

  const filterOnlyAvailable = () => {
    setFilters({ ...filters, onlyAvailable: !filters.onlyAvailable });

    setVisibleList(
      filters.onlyAvailable
        ? originalList
        : visibleList.filter((i) => !i.borrowed)
    );
  };

  useEffect(() => {
    fetchDeviceList();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {!!error && <Text style={styles.error}>{error}</Text>}

      <View style={styles.checkboxWrapper} onTouchEnd={filterOnlyAvailable}>
        <View
          style={[
            styles.checkbox,
            filters.onlyAvailable && styles.checkboxChecked,
          ]}
        />
        <Text style={styles.title}>Only available</Text>
      </View>

      <Text style={styles.title}>System</Text>

      <Picker selectedValue={filters.system} onValueChange={setSystemFilter}>
        {systemOptions.map((item) => (
          <Picker.Item key={item} label={item} value={item} />
        ))}
      </Picker>

      <Text style={styles.title}>Vendor</Text>

      <Picker selectedValue={filters.vendor} onValueChange={setVendorFilter}>
        {vendorOptions.map((item) => (
          <Picker.Item key={item} label={item} value={item} />
        ))}
      </Picker>

      {visibleList.length > 0 ? (
        visibleList.map((item) => <Device key={item.id} {...item} />)
      ) : (
        <Text style={styles.title}>List is empty</Text>
      )}
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 12,
  },
  error: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 12,
    textAlign: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 16,
  },
  checkboxWrapper: {
    flexDirection: "row",
    marginTop: 18,
    marginBottom: 18,
    justifyContent: "center",
  },
  checkbox: {
    borderRadius: 1000,
    width: 24,
    height: 24,
    borderWidth: 1,
    marginRight: 18,
  },
  checkboxChecked: {
    backgroundColor: "lightgreen",
  },
});
