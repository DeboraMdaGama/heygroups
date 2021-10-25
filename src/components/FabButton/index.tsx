import React from "react";
import { styles } from "./styles";

import { TouchableOpacity,Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function FabButton({setVisibity,userStatus}:any){
    const navigation = useNavigation()
    function handleNavigation(){
        userStatus ? setVisibity() : navigation.navigate('Login')
    }
    return(
        <TouchableOpacity style={styles.editButton} onPress={handleNavigation} activeOpacity={0.9}>
            <Text style={styles.editButtonText}>+</Text>
        </TouchableOpacity>
    )
}