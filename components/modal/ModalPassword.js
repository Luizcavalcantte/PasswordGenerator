import { View, Text, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import * as Clipboard from "expo-clipboard";
import UseStorage from "../../hooks/useStorage";

export default function ModalPassword({ password, handleClose }) {
  const { saveItem } = UseStorage();
  console.log(saveItem);

  async function handleCopyPassword() {
    await Clipboard.setStringAsync(password);
    await saveItem("@pass", password);

    handleClose();
  }
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Senha Gerada</Text>

        <Pressable style={styles.innerPassword} onLongPress={handleCopyPassword}>
          <Text style={styles.text}>{password}</Text>
        </Pressable>

        <View style={styles.buttonArea}>
          <TouchableOpacity style={styles.button}>
            <Text onPress={handleClose} style={styles.buttonText}>
              Voltar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.buttonSave]} onPress={handleCopyPassword}>
            <Text style={styles.buttonSaveText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    backgroundColor: "#fff",
    width: "80%",
    paddingVertical: 24,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 24,
  },
  innerPassword: {
    backgroundColor: "#000",
    width: "80%",
    padding: 14,
    borderRadius: 8,
  },
  text: {
    color: "#fff",
    textAlign: "center",
  },
  buttonArea: {
    flexDirection: "row",
    width: "80%",
    marginTop: 8,
  },
  button: {
    flex: 1,
    alignItems: "center",
    marginVertical: 14,
    padding: 8,
  },
  buttonSave: {
    backgroundColor: "#392de9",
    borderRadius: 8,
  },
  buttonSaveText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
