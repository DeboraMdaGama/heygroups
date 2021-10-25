import React from "react";
import { styles } from "./styles";

import { TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

type IUser = FirebaseAuthTypes.User | null
interface IChatProps {
    data: FirebaseFirestoreTypes.DocumentData
    deleteChat?:()=>void
    userStatus?:IUser
}

export default function ChatsList({ data,deleteChat,userStatus}: IChatProps) {
    const navigation = useNavigation()

    function handleOpenChat() {
        if(userStatus){
            navigation.navigate('Messages', { thread:data })
        }else{
            navigation.navigate('Login')
        }
    }
    return (
        <TouchableOpacity style={styles.chatButton} 
            onPress={handleOpenChat} 
            onLongPress={()=>deleteChat && deleteChat()}
        >
            <Text style={styles.title} numberOfLines={1}>{data.name}</Text>
            <Text style={styles.lastMessage} numberOfLines={1}>{data.lastMessage.text}</Text>
        </TouchableOpacity>
        
    )
}