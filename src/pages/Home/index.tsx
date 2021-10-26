import { useNavigation, useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore, {
  FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FabButton from "../../components/FabButton";
import ChatsList from "../../components/ChatsList";
import ModalNewChat from "../../components/ModalNewChat";
import { styles } from "./styles";

type IUser = FirebaseAuthTypes.User | null;
type IThreads = FirebaseFirestoreTypes.DocumentData;

export default function Home() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState<IUser>(null);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [updateChats, setUpdateChats] = useState(false);
  const isFocused = useIsFocused();
  const [threads, setThreads] = useState<IThreads[]>([]);

  useEffect(() => {
    const hasUser = auth().currentUser;
    setUser(hasUser);
  }, [isFocused]);

  useEffect(() => {
    let isActive = true;

    function getChats() {
      firestore()
        .collection("Message_threads")
        .orderBy("lastMessage.createdAt", "desc")
        .limit(10)
        .get()
        .then((snapshot) => {
          const thread = snapshot.docs.map((documentSnapshot) => {
            return {
              _id: documentSnapshot.id,
              name: "",
              lastMessage: { text: "" },
              ...documentSnapshot.data(),
            };
          });

          if (isActive) {
            setThreads(thread);
            setLoading(false);
          }
        });
    }

    getChats();

    return () => {
      isActive = false;
    };
  }, [isFocused, updateChats]);

  function handleSignOut() {
    auth()
      .signOut()
      .then(() => {
        setUser(null);
        navigation.navigate("Login");
      })
      .catch(() => {
        console.log("nenhum usuario encontrado");
      });
  }

  function deleteChat(ownerId: string, chatId: string) {
    if (ownerId !== user?.uid) return;
    Alert.alert("Atenção!", "Você deseja deletar essa sala?", [
      {
        text: "Cancelar",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => handleDeleteChat(chatId),
      },
    ]);
  }

  async function handleDeleteChat(chatId: string) {
    await firestore().collection("Message_threads").doc(chatId).delete();

    setUpdateChats(!updateChats);
  }

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size={50} color="#e52246" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContainer}>
          {user && (
            <TouchableOpacity onPress={() => handleSignOut()}>
              <MaterialIcons name="arrow-back" size={28} color="#fff" />
            </TouchableOpacity>
          )}

          <Text style={styles.headerContent}>Chats</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Search")}>
          <MaterialIcons name="search" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size={50} color="#e52246" />
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.flatlist}
          data={threads}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ChatsList
              data={item}
              deleteChat={() => deleteChat(item.owner, item._id)}
              userStatus={user}
            />
          )}
        />
      )}
      <Modal visible={modalVisibility} animationType="fade" transparent={true}>
        <ModalNewChat
          setVisibity={() => setModalVisibility(false)}
          setUpdateChats={() => setUpdateChats(!updateChats)}
        />
      </Modal>
      <FabButton
        setVisibity={() => setModalVisibility(true)}
        userStatus={user}
      />
    </SafeAreaView>
  );
}
