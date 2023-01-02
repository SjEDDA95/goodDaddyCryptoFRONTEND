import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Pressable
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

// Import React Native Elements
import { Input } from "@rneui/themed";
import { Button } from "@rneui/base";
import Icon from "react-native-vector-icons/FontAwesome";
// React Redux
import { connect } from "react-redux";

// **********Initialisation des etats pour le formulaire******
function RegisterScreen(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [telephone, setTelephone] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userToken, setUserToken] = useState("");

  // Declaration de la fonction Submit Register
  var submitRegister = async function (props) {
    var result = await fetch(
      "https://gooddaddybackend.herokuapp.com/users/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `firstName=${firstName}&lastName=${lastName}&telephone=${telephone}&email=${email}&password=${password}`,
      }
    );
    var response = await result.json();
    setUserToken(response.userToken);
  };

  useEffect(() => {
    props.addToken(userToken);
  }, [userToken]);

  // Return the JSX
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <LinearGradient
          colors={["#1A0596", "transparent"]}
          style={styles.background}
        >
          {/* // Button go back */}
          <View style={styles.buttonReturn}>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                height: 40,
                width: 100,
                alignItems: "center",
                justifyContent:"center",
                borderRadius: 20,
                elevation: 3,
                backgroundColor: "#8E94F2",
                marginLeft:10
              }}
              onPress={() => console.log(props.navigation.navigate("Login"))}
            >
              <Icon style={{ color: "white" }} name="chevron-left" size={20} />
              <Text style={{ color: "white" }}> RETOUR </Text>
            </TouchableOpacity>

            {/* // Bandeau titre */}
          </View>
          <View >
            <Text style={styles.textTitle}>GOOD DADDY CRYPTO</Text>
            <Input
              placeholder="Nom"
              containerStyle="{{marginBottom: 25, width: '70%', }}"
              onChangeText={(value) => setLastName(value)}
              value={lastName}
              style={{ color: "white",marginTop: 30 }}
            />
            <Input
              placeholder="Prenom"
              containerStyle="{{marginBottom: 25, width: '70%', }}"
              onChangeText={(value) => setFirstName(value)}
              value={firstName}
              style={{ color: "white" }}
            />
            <Input
              placeholder="telephone"
              containerStyle="{{marginBottom: 25, width: '70%', }}"
              keyboardType="numeric"
              onChangeText={(value) => setTelephone(value)}
              value={telephone}
              style={{ color: "white" }}
            />
            <Input
              placeholder="email"
              containerStyle="{{marginBottom: 25, width: '70%', }}"
              keyboardType="email-address"
              onChangeText={(value) => setEmail(value)}
              style={{ color: "white" }}
              value={email}
            />
            <Input
              placeholder="Mot de passe"
              containerStyle="{{marginBottom: 25, width: '70%', }}"
              secureTextEntry={true}
              onChangeText={(value) => setPassword(value)}
              value={password}
              style={{ color: "white" }}
            />
          </View>
          <Pressable
            style={styles.button}
            onPress={() => {
              submitRegister();
              props.navigation.navigate("FirstForm");
            }}
          >
            <Text style={{ color: "white" }}>REGISTER</Text>
          </Pressable>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
}

// Style CSS 🎨
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222121",
    color: "white",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 1000,
  },
  textTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 50,
    textAlign: "center",
  },

  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 60,
    marginBottom: "10%",
  },

  input: {
    backgroundColor: "white",
    color: "green",
  },

  text: {
    color: "white",
    fontSize: "20",
  },

  buttonReturn: {
    flex: 1,
    marginTop:70,
    marginBottom:20,
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    width: 150,
    alignSelf: "center",
    borderRadius: 20,
    elevation: 3,
    backgroundColor: "#8E94F2",
    marginTop: 20,
  },
});
// REDUX

function mapDispatchToProps(dispatch) {
  return {
    addToken: function (token) {
      dispatch({ type: "addToken", token: token });
    },
  };
}

export default connect(null, mapDispatchToProps)(RegisterScreen);
