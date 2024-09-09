import { View, Text, StyleSheet, FlatList, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import UseStorage from "../hooks/useStorage";
import { PasswordsItem } from "../components/PasswordsItem";
import { Ionicons } from "@expo/vector-icons";

export default function Passwords() {
  const [listPassword, setListPassword] = useState([]);

  const [visiblePassword, setVisiblePassword] = useState(true);

  const focused = useIsFocused();
  const { getItem, removeItem } = UseStorage();

  useEffect(() => {
    async function loadPasswords() {
      const passwords = await getItem("@pass");
      console.log(passwords);
      setListPassword(passwords);
    }
    loadPasswords();
  }, [focused]);

  async function hanldeDeletePassword(item) {
    Alert.alert(
      "Excluiir",
      "Você tem certeza de que deseja excluir esta senha?",
      [
        {
          text: "Cancelar",
        },
        {
          text: "Deletar",
          onPress: async () => {
            const passwords = await removeItem("@pass", item);
            setListPassword(passwords);
          },
        },
      ],
      { cancelable: true }
    );
  }
  return (
    <SafeAreaView styles={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Senhas</Text>
        <Pressable
          onPress={() => {
            setVisiblePassword(!visiblePassword);
            console.log(visiblePassword);
          }}
        >
          <Ionicons name={visiblePassword ? "eye" : "eye-off"} size={24} color="#fff" />
        </Pressable>
      </View>
      <View style={styles.content}>
        <FlatList
          style={{ paddingTop: 14 }}
          data={listPassword}
          keyExtractor={(item) => String(item)}
          renderItem={({ item }) => (
            <PasswordsItem
              data={item}
              visible={visiblePassword}
              removePassword={() => {
                hanldeDeletePassword(item);
              }}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#392de9",
    paddingTop: 58,
    paddingBottom: 14,
    paddingHorizontal: 14,
  },
  title: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  content: {
    paddingHorizontal: 14,
  },
});
