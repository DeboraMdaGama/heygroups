import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, TextInput, TouchableOpacity, View, Keyboard } from "react-native";
import { styles } from "./styles";
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore'


import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

import { useIsFocused } from '@react-navigation/native';
import ChatsList from '../../components/ChatsList';

type IUser = FirebaseAuthTypes.User | null
type IThreads = FirebaseFirestoreTypes.DocumentData

export default function Search() {
    const isFocused = useIsFocused();
  
    const [chatName, setChatName] = useState('');
    const [user, setUser] = useState<IUser>(null)
    const [chats, setChats] = useState<IThreads[]>([]);
  
    useEffect(() => {
  
      const hasUser = auth().currentUser
      setUser(hasUser);
  
  
    }, [isFocused]);
  
  
    async function handleSearch(){
      if(chatName === '') return;
  
      const responseSearch = await firestore()
      .collection('Message_threads')
      .where('name', '>=', chatName)
      .where('name', '<=', chatName + '\uf8ff')
      .get()
      .then( (querySnapshot) => {
  
        const threads = querySnapshot.docs.map( documentSnapshot => {
          return{
            _id: documentSnapshot.id,
            name: '',
            lastMessage: { text: '' },
            ...documentSnapshot.data()
          }
        })
  
        setChats(threads);
  
        setChatName('');
        Keyboard.dismiss();
  
      })
  
    }
  
   return (
     <SafeAreaView style={styles.container}>
       <View style={styles.containerInput}>
        <TextInput
          placeholder="Digite o nome da sala."
          value={chatName}
          onChangeText={ (text) => setChatName(text) }
          style={styles.input}
        />
        <TouchableOpacity style={styles.buttonSearch} onPress={handleSearch}>
          <MaterialIcons name="search" size={30} color="#FFF" />
        </TouchableOpacity>
       </View>
  
       <FlatList
        showsVerticalScrollIndicator={false}
        data={chats}
        keyExtractor={ (item) => item._id}
        renderItem={ ({ item }) => <ChatsList data={item} userStatus={user} /> }
       />
     </SafeAreaView>
    );
}