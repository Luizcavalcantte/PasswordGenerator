import React from "react";
import { Text, StyleSheet, Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export function PasswordsItem({ data, removePassword, visible }) {
  return (
    <View style={styles.container}>
      <Text style={{ color: "#fff" }}> {visible ? data : "******************************"}</Text>
      <Ionicons name="trash" size={24} color="#fff" onPress={removePassword} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    padding: 14,
    width: "100%",
    marginBottom: 14,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
