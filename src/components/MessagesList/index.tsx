import React, { useMemo } from "react";
import auth from "@react-native-firebase/auth";
import { Text, View } from "react-native";
import { styles } from "./styles";

export default function MessagesList({ data }: any) {
  const user = auth().currentUser;

  const isMyMessage = useMemo(() => {
    return data?.user?._id === user?.uid;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.content,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            backgroundColor: isMyMessage ? "#0c5506" : "#101010",
            marginLeft: isMyMessage ? 40 : 0,
            marginRight: isMyMessage ? 0 : 40,
          },
        ]}
      >
        {!isMyMessage && !data?.system && (
          <Text style={styles.title}>{data?.user?.displayName}</Text>
        )}

        <Text style={styles.lastMessage}>{data.text}</Text>
      </View>
    </View>
  );
}
