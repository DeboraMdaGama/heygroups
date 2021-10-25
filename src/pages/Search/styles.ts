import React from "react";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        flex:1,        
        backgroundColor:'#202225',
        paddingHorizontal:5
      },
      containerInput:{
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginVertical: 14,
      },
      input:{
        backgroundColor:'#bcccdc',
        marginLeft: 10,
        height: 50,
        width: '80%',
        borderRadius: 4,
        padding: 5,
        fontSize:18
      },
      buttonSearch:{
        backgroundColor: '#102a43',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        width: '15%',
        marginLeft: 5,
        marginRight: 10,
      }
})