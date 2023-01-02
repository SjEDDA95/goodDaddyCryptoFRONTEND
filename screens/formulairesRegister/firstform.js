import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  SafeAreaView,
  TouchableOpacity,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Constants from "expo-constants";

import { LinearGradient } from "expo-linear-gradient";

// React Redux
import { connect } from "react-redux";

import ProgressBar from "../../Components/ProgressBar";

const Separator = () => <View style={styles.separator} />;

const firstform = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#1A0596", "transparent"]}
        style={styles.background}
      >
        {/* // Bouton Go Back */}
        <View style={styles.buttonReturn}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              height: 40,
              width: 100,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
              elevation: 3,
              backgroundColor: "#8E94F2",
              marginLeft: 10,
            }}
            onPress={() => console.log(props.navigation.navigate("Login"))}
          >
            <Icon style={{ color: "white" }} name="chevron-left" size={20} />
            <Text style={{ color: "white" }}> RETOUR </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.page}>
          <View>
            <Text style={styles.profilRisque}>
              Détermination de ton profil de risque
            </Text>
            <Separator />
            <Text style={styles.title}>
              Quel est ton niveau en connaissances Crypto ?
            </Text>
            <Separator />
          </View>
          <View>
            <TouchableOpacity>
              <Text
                onPress={() => {
                  props.addAnswer(1, 1);
                  props.navigation.navigate("SecondForm");
                  // props.navigation.navigate("BottomNavigator", { screen: "Strategies" });
                }}
                style={styles.answer}
              >
                Je n'y connais rien
              </Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text
                onPress={() => {
                  props.addAnswer(2, 1);
                  props.navigation.navigate("SecondForm");
                }}
                style={styles.answer}
              >
                Débutant
              </Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text
                onPress={() => {
                  props.addAnswer(3, 1);
                  props.navigation.navigate("SecondForm");
                }}
                style={styles.answer}
              >
                Intermediaire
              </Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text
                onPress={() => {
                  props.addAnswer(4, 1);
                  props.navigation.navigate("SecondForm");
                }}
                style={styles.answer}
              >
                Confirmé
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

// Styles CSS🎨
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222121",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 1000,
  },
  profilRisque: {
    fontSize: 28,
    textAlign: "center",
    color: "white",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
    marginVertical: 8,
  },
  answer: {
    textAlign: "center",
    marginVertical: 5,
    fontSize: 22,
    backgroundColor: "#8E94F2",
    borderRadius: 12,
    marginTop: 30,
    color: "white",
    paddingTop: 10,
    paddingBottom: 10,
    marginVertical: 10,
    marginHorizontal: 65,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  page: {
    flex: 5,
  },
  buttonReturn: {
    flex: 1,
    justifyContent: "center",
  },
});

function mapDispatchToProps(dispatch) {
  return {
    addAnswer: function (answer, questionNumber) {
      dispatch({
        type: "addAnswer",
        answer: answer,
        questionNumber: questionNumber,
      });
    },
  };
}

export default connect(null, mapDispatchToProps)(firstform);
