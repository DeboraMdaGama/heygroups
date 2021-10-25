import React from "react";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
   
    container:{
        flex:1,
        backgroundColor:'rgba(0,0,0,0.7)',
    },
    content:{
        flex:1,
        backgroundColor:'#202225',
        justifyContent:'flex-start',
        alignItems:'center',
    },
     title:{
        color:'#fff',
        fontSize:25,
        marginBottom:5,
        fontWeight:'bold',
        marginTop:40
    },
    input:{
        width:'80%',
        backgroundColor:'#bcccdc',
        padding:10,
        marginTop:10,
        borderRadius:7,
        fontSize:20
    },
    createChatButton:{
        width:'80%',
        backgroundColor:'#102a43',
        padding:10,
        marginVertical:10,
        borderRadius:7,
        justifyContent:'center',
        alignItems:'center',
    },
    createChatButtonText:{
        color:'#bcccdc',
        fontSize:20, 
        fontWeight:'bold',
    },
})