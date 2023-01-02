import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
// Icones
import Icon from "react-native-vector-icons/FontAwesome";
// React Redux
import { connect } from "react-redux";

import { LinearGradient } from "expo-linear-gradient";
// IMPORT DE REACT NATIVE PAPER POUR LA CARD

import { Card } from "react-native-paper";

const strategyProposal = (props) => {
  // INITIALISATION DES ETATS
  const [strategy, setStrategy] = useState([
    { amountPaid: 0, frequency: "null", asset: "BTC" },{amountPaid: 0, frequency: "null", asset: "BTC" },
  ]);

  // FONCTION POUR ENVOYER LA STRATEGIE EN BDD UNE FOIS VALIDEE PAR LE USER
  var addStrategy = async () => {
    for (let i = 0; i < strategy.length; i++) {
      var rawResult = await fetch(
        "https://gooddaddybackend.herokuapp.com/investment/addStrategy",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: `userToken=${props.userToken}&amountPaid=${strategy[i].amountPaid}&frequency=${strategy[i].frequency}&asset=${strategy[i].asset}`,
        }
      );
      var result = await rawResult.json();
    }
  };

  // FONCTION POUR RECUPERER LE TYPE INVESTISSEUR DU USER ET LANCER LE CALCUL DE L'INVESTISSEMENT
  var createStrategy = async () => {
    //initialise les variables
    var salary = props.salary;
    var frequency = "par mois";
    //recupere le type d'investisseur sur le back
    var rawResult = await fetch(
      `https://gooddaddybackend.herokuapp.com/users/getTypeInvestor?userToken=${props.userToken}`
    );
    var result = await rawResult.json();
    //creation de  la  strategie en fonction du type investisseur
    switch (result.typeInvestor) {
      case "INVESTISSEUR DEBUTANT":
        setStrategy([
          {
            amountPaid: (5 * salary) / 100,
            frequency: "par mois",
            asset: "BTC",
          },
        ]);
        console.log("cas 1");
        break;
      case "INVESTISSEUR DEBUTANT PLUS":
        setStrategy([
          {
            amountPaid: (10 * salary) / 100,
            frequency: "par mois",
            asset: "BTC",
          },
        ]);
        console.log("cas 2");
        break;
      case "INVESTISSEUR INTERMEDIAIRE":
        setStrategy([
          {
            amountPaid: (15 * salary) / 100,
            frequency: "par mois",
            asset: "BTC",
          },
          {
            amountPaid: (5 * salary) / 100,
            frequency: "par mois",
            asset: "ETH",
          },
        ]);
        console.log("cas 3");
        break;
      case "INVESTISSEUR CONFIRME":
        setStrategy([
          {
            amountPaid: (20 * salary) / 100,
            frequency: "par mois",
            asset: "BTC",
          },
          {
            amountPaid: (10 * salary) / 100,
            frequency: "par mois",
            asset: "ETH",
          },
        ]);
        break;
      default:
        console.log(`Auncun profil investisseur reconnu`);
    }
  };

  //APPEL FONCTION   A L'INITIALISATION DU COMPONENT
  useEffect(() => {
    createStrategy();
  }, []);

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
            onPress={() => console.log(props.navigation.navigate("ResultForm"))}
          >
            <Icon style={{ color: "white" }} name="chevron-left" size={20} />
            <Text style={{ color: "white" }}> RETOUR </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.page}>
          <View>
            <Text style={styles.profilRisque}>
              En fonction de ton profil de risque on te propose d'investir :
            </Text>
          </View>
          {/* SCROLLVIEW BITCOIN - ETHEREUM */}
          <ScrollView style={{maxHeight:400}}>
            <View
              style={{
                flexDirection: "row",
                marginTop: 70,
                marginLeft: 5,
                width: "80%",
                height: 120,
                alignSelf: "center",
              }}
            >
              <Card style={styles.card}>
                <View style={{ flexDirection: "row", marginTop: 20 }}>
                  <Image
                    style={styles.logo}
                    source={require("../../assets/Bitcoin.svg.png")}
                  />
                  <Text style={styles.paragraph}>
                    {strategy[0].amountPaid} € {strategy[0].frequency}
                  </Text>
                  <Text style={styles.paragraph}> en {strategy[0].asset}</Text>
                </View>
              </Card>
            </View>

            <View
              style={{
                flexDirection: "row",
                marginTop: 30,
                marginLeft: 5,
                width: "80%",
                height: 120,
                alignSelf: "center",
              }}
            >
              <Card style={styles.card}>
                <View style={{ flexDirection: "row", marginTop: 20 }}>
                  <Image
                    style={styles.logo}
                    source={require("../../assets/Ethereum.png")}
                  />
                  <Text style={styles.paragraph}>
                    {strategy[1].amountPaid} € {strategy[1].frequency}
                  </Text>
                  <Text style={styles.paragraph}>en {strategy[1].asset}</Text>
                </View>
              </Card>
            </View>
          </ScrollView>

          {/* <View style={{ flexDirection: "row", marginTop: 30, marginLeft: 50 }}>
          <Image
            style={styles.logo}
            source={require("../../assets/Bitcoin.svg.png")}
          /><Text style={{}}>BTC</Text>
          <Text
            style={{
              color: "black",
              textAlignVertical: "center",
              marginLeft: 30,
            }}
          >
            {strategy[0].amountPaid}e {strategy[0].frequency}
          </Text>
        </View> */}
          <View >
            <Pressable
              style={styles.button}
              onPress={() => {
                addStrategy();
                props.navigation.navigate("BottomNavigator", {
                  screen: "Dashboard",
                });
              }}
            >
              <Text style={{ color: "white" }}>ACCEPTER</Text>
            </Pressable>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

// Styles CSS 🖼
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222121",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  profilRisque: {
    fontSize: 28,
    textAlign: "center",
    color: "white",
    marginLeft: 10,
  },
  paragraph: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20,
    color: "white",
  },
  card: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#222121",
    borderRadius: 15,
    borderWidth: 0.2,
    borderColor: "white",
  },
  logo: {
    alignSelf: "center",
    width: 50,
    height: 50,
    justifyContent: "center",
    marginLeft:20
  },
  page: {
    flex: 5,
  },
  buttonReturn: {
    flex: 1,
    justifyContent: "center",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 1000,
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
  },
});

// Fonction REDUX
function mapStateToProps(state) {
  return { userToken: state.token, salary: state.salary };
}
export default connect(mapStateToProps, null)(strategyProposal);
