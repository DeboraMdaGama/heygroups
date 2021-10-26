import React, { useState } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import {
  TouchableOpacity,
  Alert,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { styles } from "./styles";

interface IModalData {
  setVisibity: () => void;
  setUpdateChats: () => void;
}

export default function ModalNewChat({
  setVisibity,
  setUpdateChats,
}: IModalData) {
  const [chatName, setChatName] = useState("");
  const user = auth().currentUser;

  function handleCreateChat() {
    if (chatName === "") {
      Alert.alert("Preencha todos os dados", "Você deixou campos em branco");
      return;
    }
    firestore()
      .collection("Message_threads")
      .get()
      .then((snapshot) => {
        let myChats = 0;

        snapshot.docs.map((docItem) => {
          if (docItem.data().owner === user?.uid) {
            myChats += 1;
          }
          return myChats;
        });

        if (myChats >= 4) {
          Alert.alert(
            "Algo deu errado",
            // eslint-disable-next-line comma-dangle
            "Você atingiu o limite de grupos por usuário"
          );
        } else {
          createChat();
        }
      });
  }
  function createChat() {
    firestore()
      .collection("Message_threads")
      .add({
        name: chatName,
        owner: String(user?.uid),
        lastMessage: {
          text: `Grupo ${chatName} criado com sucesso`,
          createdAt: firestore.FieldValue.serverTimestamp(),
        },
      })
      .then((docRef) => {
        docRef
          .collection("Messages")
          .add({
            text: `Grupo ${chatName} criado com sucesso`,
            createdAt: firestore.FieldValue.serverTimestamp(),
            system: true,
          })
          .then(() => {
            setVisibity();
            setUpdateChats();
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={setVisibity}>
        <View style={styles.contentView} />
      </TouchableWithoutFeedback>
      <View style={styles.content}>
        <Text style={styles.title}>Criar um novo Chat?</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={chatName}
          onChangeText={(value) => setChatName(value)}
        />
        <TouchableOpacity
          style={styles.createChatButton}
          onPress={() => handleCreateChat()}
        >
          <Text style={styles.createChatButtonText}>Criar Chat</Text>
        </TouchableOpacity>
        <TouchableWithoutFeedback onPress={setVisibity}>
          <Text style={styles.createChatButtonText}>Voltar</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}
