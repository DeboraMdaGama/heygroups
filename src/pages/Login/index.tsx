import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";

export default function Login() {
  const [openLogInScreen, setOpenLogInScreen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  function toggleLogin() {
    setOpenLogInScreen(!openLogInScreen);
    setEmail("");
    setName("");
    setPassword("");
  }
  function handleLogin() {
    if (email === "" || password === "") {
      Alert.alert("Preencha todos os dados", "Você deixou campos em branco");
      return;
    }
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
          console.log("Email inválido");
        }
      });
  }
  function handleSignUP() {
    if (email === "" || password === "" || name === "") {
      Alert.alert("Preencha todos os dados", "Você deixou campos em branco");
      return;
    }
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((snapshot) => {
        snapshot.user
          .updateProfile({
            displayName: name,
          })
          .then(() => {
            navigation.goBack();
          });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          console.log("Email já em uso");
        }
        if (error.code === "auth/invalid-email") {
          console.log("Email inválido");
        }
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {/* eslint-disable-next-line react-native/no-inline-styles */}
        Hey<Text style={{ color: "#fff" }}>Chat</Text>
      </Text>
      <Text style={styles.subtitle}>Ajude, colabore, faça networking</Text>

      {openLogInScreen && (
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={name}
          onChangeText={(value) => setName(value)}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="seu.email@email.com"
        value={email}
        onChangeText={(value) => setEmail(value)}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
        value={password}
        onChangeText={(value) => setPassword(value)}
        autoCapitalize="none"
      />

      <TouchableOpacity
        style={[
          styles.logInButton,
          // eslint-disable-next-line react-native/no-inline-styles
          { backgroundColor: openLogInScreen ? "#7a1b06" : "#102a43" },
        ]}
        onPress={openLogInScreen ? handleSignUP : handleLogin}
      >
        <Text style={styles.logInButtonText}>
          {openLogInScreen ? "Cadastrar" : "Acessar"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signUpButton}
        onPress={() => toggleLogin()}
      >
        <Text style={styles.signUpButtonText}>
          {openLogInScreen ? "Já tenho uma conta" : "Criar uma nova conta"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
