import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Pressable
} from "react-native";

import { LinearGradient } from 'expo-linear-gradient';

import { Text, Card, Button, Image } from "@rneui/themed";

import Icon from "react-native-vector-icons/FontAwesome";
// React Redux
import { connect } from "react-redux";

const resultform = (props) => {
  const [profilInvestor, setProfilInvestor] = useState("");

  const submitTypeInvestor = async () => {
    console.log(props.userToken)
    var rawResult = await fetch(
      "https://gooddaddybackend.herokuapp.com/users/setTypeInvestor",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `userToken=${props.userToken}&typeInvestor=${profilInvestor}`,
      }
    );
    var result = await rawResult.json();
    console.log(result);
  };

  // Pourquoi un useeffect ici ? 
  useEffect(() => {
    console.log(props.answers)
    var answersTab = props.answers;
    var note = 0;
    for (let i = 0; i < answersTab.length; i++) {
      if(i==0){
        if (answersTab[i] == 1) {
          note += 0;
        }
        else if (answersTab[i] == 2) {
          note += 10;
        }else if (answersTab[i] == 3) {
          note += 30;
        }else if (answersTab[i] == 4) {
          note += 40;
        }
      }
      else if(i==1){
        if (answersTab[i] == 1) {
          note += 0;
        }
        else if (answersTab[i] == 2) {
          note += 10;
        }else if (answersTab[i] == 3) {
          note += 30;
        }else if (answersTab[i] == 4) {
          note += 40;
        }

      }
      else if(i==2){
        if (answersTab[i] == 1) {
          note += 10;
        }
        else if (answersTab[i] == 2) {
          note += 20;
        }else if (answersTab[i] == 3) {
          note += 30;
        }else if (answersTab[i] == 4) {
          note += 40;
        }

      }
      else if(i==3){
        if (answersTab[i] == 1) {
          note += 0;
        }
        else if (answersTab[i] == 2) {
          note += 10;
        }else if (answersTab[i] == 3) {
          note += 20;
        }else if (answersTab[i] == 4) {
          note += 30;
        }

      }
      else {
        console.log('erreur : trop de questions')
      }
    }
    note = note / 40;
    console.log("La note du user est de : " + note)
    if (Math.round(note) == 1 || Math.round(note) == 0 ) {
      setProfilInvestor("INVESTISSEUR DEBUTANT");
    }
    if (Math.round(note) == 2) {
      setProfilInvestor("INVESTISSEUR DEBUTANT PLUS");
    }
    if (Math.round(note) == 3) {
      setProfilInvestor("INVESTISSEUR INTERMEDIAIRE");
    }
    if (Math.round(note) == 4) {
      setProfilInvestor("INVESTISSEUR CONFIRME");
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#1A0596', 'transparent']}
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
            onPress={() => {console.log(props.navigation.navigate("FifthForm"));}}
          >
            <Icon style={{ color: "white" }} name="chevron-left" size={20} />
            <Text style={{ color: "white" }}> RETOUR </Text>
          </TouchableOpacity>
        </View>
      <View style={styles.page}>
        <View>
          <Text style={styles.profilRisque}>Ton profil correspond à :</Text>
        </View>

        <View style={{ marginTop: 80 }}>
          <Text style={styles.title}>{profilInvestor}</Text>
        </View>
        <View style={{ marginTop: 50, marginHorizontal: 40 }}>
          <Pressable
            style={styles.button}
            onPress={() => {
              props.navigation.navigate("StrategyProposal");
            submitTypeInvestor(profilInvestor);
            }}
          >
            <Text style={{ color: "white" }}>CE PROFIL ME CONVIENT</Text>
          </Pressable>
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
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 1000,
  },
  profilRisque: {
    fontSize: 28,
    textAlign: "center",
    color: "white",
    marginTop: 80,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
    marginVertical: 8,
  },
  page: {
    flex: 5,
  },
  buttonReturn: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    width: 250,
    alignSelf: "center",
    borderRadius: 20,
    elevation: 3,
    backgroundColor: "#8E94F2",
    marginTop: 20,
  },

});

function mapStateToProps(state) {
  return { userToken: state.token, answers: state.answers };
}
export default connect(mapStateToProps, null)(resultform);
