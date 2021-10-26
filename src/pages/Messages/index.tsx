import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  FlatList,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import auth from "@react-native-firebase/auth";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";

import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import MessagesList from "../../components/MessagesList";
import { styles } from "./styles";

type IChatMessages = FirebaseFirestoreTypes.DocumentData;

type RouteProps = {
  Messages: { thread: FirebaseFirestoreTypes.DocumentData };
};

type IMessageProps = StackScreenProps<RouteProps, "Messages">;

export default function Messages({ route }: IMessageProps) {
  const [newMessage, setNewMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<IChatMessages[]>([]);
  const navigation = useNavigation();

  const { thread } = route?.params;
  const user = auth()?.currentUser;

  useEffect(() => {
    navigation.setOptions({
      title: route.params.thread.name,
    });

    const newMessagesListener = firestore()
      .collection("Message_threads")
      .doc(thread._id)
      .collection("Messages")
      .orderBy("createdAt", "desc")
      .onSnapshot((documentSnapshot) => {
        const messages = documentSnapshot.docs.map((doc) => {
          const firebaseData = doc.data();

          const data = {
            _id: doc.id,
            text: "",
            createdAt: firestore.FieldValue.serverTimestamp(),
            ...firebaseData,
            user,
          };

          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user.displayName,
            };
          }

          return data;
        });
        setChatMessages(messages);
      });

    return () => newMessagesListener();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSendMessage() {
    if (newMessage === "") return;

    await firestore()
      .collection("Message_threads")
      .doc(thread._id)
      .collection("Messages")
      .add({
        text: newMessage,
        createdAt: firestore.FieldValue.serverTimestamp(),
        user: {
          _id: user?.uid,
          displayName: user?.displayName,
        },
      });

    await firestore()
      .collection("Message_threads")
      .doc(thread._id)
      .set(
        {
          lastMessage: {
            text: newMessage,
            createdAt: firestore.FieldValue.serverTimestamp(),
          },
        },
        {
          merge: true,
          // eslint-disable-next-line comma-dangle
        }
      );

    setNewMessage("");
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.content}
        showsVerticalScrollIndicator={false}
        data={chatMessages}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <MessagesList data={item} />}
        inverted={true}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.content}
        keyboardVerticalOffset={100}
      >
        <View style={styles.containerInput}>
          <View style={styles.mainContainerInput}>
            <TextInput
              placeholder="Sua mensagem..."
              style={styles.textInput}
              value={newMessage}
              onChangeText={(text) => setNewMessage(text)}
              multiline={true}
              autoCorrect={false}
            />
          </View>

          <TouchableOpacity onPress={() => handleSendMessage()}>
            <View style={styles.buttonContainer}>
              <Feather name="send" size={26} color="#FFF" />
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
