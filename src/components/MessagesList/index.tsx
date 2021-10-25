import React, { useMemo } from "react";
import { styles } from "./styles";
import auth from '@react-native-firebase/auth'
import { Text,View } from "react-native";

export default function MessagesList({data}:any){
    const user = auth().currentUser

    const isMyMessage = useMemo(()=>{
        return data?.user?._id == user?.uid
    },[data])
    return(
            <View style={styles.container}>
                <View style={[styles.content,{
                    backgroundColor:isMyMessage?"#0c5506":'#101010',
                    marginLeft:isMyMessage?40:0,
                    marginRight:isMyMessage?0:40,
                }]}>
                {
                    !isMyMessage && !data?.system && <Text style={styles.title}  >{data?.user?.displayName}</Text>
                }    
                
               <Text style={styles.lastMessage}  >{data.text}</Text>
                </View>
            </View>
            
    )
}