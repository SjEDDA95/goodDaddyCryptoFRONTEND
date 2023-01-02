import React from "react";

import { StyleSheet, View, Text, Pressable } from "react-native";

import { LinearGradient } from 'expo-linear-gradient';

// Import React Native Elements
import { Button, createTheme } from "@rneui/themed";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1A0596', 'transparent']}
        style={styles.background}
      >
      <Text style={styles.textTitle}>GOOD DADDY CRYPTO</Text>
      <Pressable
          style={styles.button}
          onPress={() => {
            navigation.navigate("Login")} // Sur le click sur le bouton GO !, on est envoyé à la page Login
          }
        >
          <Text style={{color:"white"}}>GO !</Text>
          </Pressable>
      </LinearGradient>
    </View>
  );
}

// Style CSS 🎨
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222121",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  textTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 50,
    marginTop: 250,
    textAlign: 'center',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 1000,
  },
  text: {
    color: "white",
    fontSize: 20,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    width:100,
    alignSelf:"center",
    borderRadius: 20,
    elevation: 3,
    backgroundColor: "#8E94F2",
    marginTop: 100
  },
});

// // Definition du theme ReactNativeElements avec ThemeProvider

// const theme = createTheme({
//   components: {
//     Button: {
//       raised: true,
//       alignItems: "center",
//       justifyContent: "center",
//       paddingVertical: 12,
//       paddingHorizontal: 32,
//       borderRadius: 4,
//       elevation: 3,
//       backgroundColor: "black",
//     },
//   },
// });
