import { StatusBar } from "expo-status-bar";
import { StyleSheet, Image, View, Text, TouchableOpacity, Modal } from "react-native";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import Slider from "@react-native-community/slider";
import ModalPassword from "../components/modal/ModalPassword";

export default function Home() {
  const [size, setSize] = useState(4);
  const [passwordValue, setPasswordValue] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [checkboxLowercase, setCheckboxLowercase] = useState(true);
  const [checkboxUppercase, setCheckboxUppercase] = useState(false);
  const [checkboxNumbres, setCheckboxNumbres] = useState(false);
  const [checkboxSpecialCharacter, setCheckboxSpecialCharacter] = useState(false);

  const charsetLowercase = "abcdefghijklmnopqrstuvwxyz";
  const charsetUppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const charsetNumbres = "1234567890";
  const charsetSpecialCharacter = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";

  function generate() {
    let charset = "";
    if (checkboxLowercase) {
      charset += charsetLowercase;
    }
    if (checkboxUppercase) {
      charset += charsetUppercase;
    }
    if (checkboxNumbres) {
      charset += charsetNumbres;
    }
    if (checkboxSpecialCharacter) {
      charset += charsetSpecialCharacter;
    }

    let password = "";
    for (let i = 0, n = charset.length; i < size; i++) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }
    setPasswordValue(password);

    setModalVisible(true);
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo.png")} />
      <View style={styles.checkbox}>
        <Checkbox
          value={checkboxLowercase}
          onValueChange={setCheckboxLowercase}
          color={checkboxLowercase ? "#4630EB" : undefined}
        />
        <Text style={{ paddingLeft: 10, fontWeight: "bold" }}>Minusculas</Text>
      </View>

      <View style={styles.checkbox}>
        <Checkbox
          value={checkboxUppercase}
          onValueChange={setCheckboxUppercase}
          color={checkboxUppercase ? "#4630EB" : undefined}
        />
        <Text style={{ paddingLeft: 10, fontWeight: "bold" }}>Maiusculas</Text>
      </View>

      <View style={styles.checkbox}>
        <Checkbox
          value={checkboxNumbres}
          onValueChange={setCheckboxNumbres}
          color={checkboxNumbres ? "#4630EB" : undefined}
        />
        <Text style={{ paddingLeft: 10, fontWeight: "bold" }}>Numeros</Text>
      </View>

      <View style={styles.checkbox}>
        <Checkbox
          value={checkboxSpecialCharacter}
          onValueChange={setCheckboxSpecialCharacter}
          color={checkboxSpecialCharacter ? "#4630EB" : undefined}
        />
        <Text style={{ paddingLeft: 10, fontWeight: "bold" }}>Caracteres Especiais</Text>
      </View>

      <Text style={styles.title}>{size} caracteres</Text>
      <View style={styles.area}>
        <Slider
          style={{ height: 50 }}
          minimumValue={4}
          maximumValue={20}
          maximumTrackTintColor="#ff0000"
          minimumTrackTintColor="#000"
          thumbTintColor="#392de9"
          onValueChange={(value) => {
            setSize(value.toFixed(0));
          }}
        ></Slider>
      </View>
      <TouchableOpacity style={styles.button} onPress={generate}>
        <Text style={styles.buttonText}>Gerar Senha</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <ModalPassword
          password={passwordValue}
          handleClose={() => {
            setModalVisible(false);
          }}
        />
      </Modal>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f3ff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    marginBottom: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
  },
  area: {
    marginTop: 14,
    marginBottom: 14,
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 6,
  },
  button: {
    backgroundColor: "#392de9",
    width: "80%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 18,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 20,
  },
  checkbox: {
    // backgroundColor: "#555",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    margin: 5,
    paddingLeft: 40,
  },
});
