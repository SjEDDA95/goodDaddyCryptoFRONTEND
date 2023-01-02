import React, { useEffect, useState } from "react";

import {
  StyleSheet,
  View,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
// Import React Native Elements
import { Text, Card, Button, Image } from "@rneui/themed";
// React Redux
import { connect } from "react-redux";
//  Linear Gradient 
import { LinearGradient } from "expo-linear-gradient";
// AXIOS pour requette API
import axios from "axios";

// Import du composant affichage du chart
import AssetChart from "../../Components/AssetChart";

//// **********DEBUT CREATION DU COMPOSANT***********
const btcWallet = (props) => {
  // Declaration variable d'etat pour afficher le current price
  const [showprice, setShowPrice] = useState(0);

  // Declaration variable d'etat pour récupérer le prix en fonction de la période d'intervalle sellectionnée
  const [getPricePeriod, setPricePeriod] = useState(null);

  const [operations, setOperations] = useState([]);
  const [totalInvestmentAsset, setTotalInvestmentAsset] = useState(0);
  const [totalInvestmentEuro, setTotalInvestmentEuro] = useState(0);
  // Declaration de variables
  const assetName = "Bitcoin";
  const assetSymbol = "BTC";
  const cryptoAssetId = "bitcoin";
  const assetLogo =
    "https://s3.eu-central-1.amazonaws.com/bbxt-static-icons/type-id/png_16/f231d7382689406f9a50dde841418c64.png";


  useEffect(() => {
    // ********Fonction pour récupérer le prix d'un asset avec API Coingecko***********
    async function getCryptoPriceData() {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoAssetId}&vs_currencies=eur`
        );

        // Retour de la fonction
        console.log("typeof response", typeof response.data.bitcoin.eur);

        setShowPrice(response.data.bitcoin.eur);
      } catch (err) {
        console.log(err);
      }
    }
    async function getOperations() {
      var rawResult = await fetch(
        `https://gooddaddybackend.herokuapp.com/operation/getOperation?userToken=${props.userToken}`
      );
      var result = await rawResult.json();
      setOperations(result.operations);
      var totalAsset = 0;
      var totalEuro = 0;
      for (let i = 0; i < result.operations.length; i++) {
        if (result.operations[i].typeOperation == "CREDIT") {
          totalAsset += result.operations[i].amountOfToken;
          totalEuro += result.operations[i].amountPaid;
        } else if (result.operations[i].typeOperation == "DEBIT") {
          totalAsset -= result.operations[i].amountOfToken;
          totalEuro -= result.operations[i].amountPaid;
        } else {
          console.log("Type operation inconnu");
        }
      }
      setTotalInvestmentAsset(totalAsset);
      setTotalInvestmentEuro(totalEuro);
    }
    getOperations()
    getCryptoPriceData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#1A0596", "transparent"]}
        style={styles.background}
      >
        <View style={{ minWidth: 300, marginTop: 100 }}>
          <Card
            containerStyle={{ backgroundColor: "#222121", borderRadius: 10 }}
          >
            <Card.Title style={{ color: "white", fontSize: 20 }}>
              Prix actuel du {assetName}
            </Card.Title>
            <Image source={{ assetLogo }} />
            <Card.Divider />
            {/*//get current Price of asset with API */}
            <Text
              style={{
                alignSelf: "center",
                color: "#E335DC",
                fontSize: 25,
                fontWeight: "bold",
              }}
            >
              1 {assetSymbol} = {showprice} €
            </Text>
          </Card>
        </View>
        {/* // Insert du graphique ici 
      Le graphique doit afficher l'évolution du portefeuille dans le temps en fonction de amount of token et price$*/}
        <AssetChart CryptoAssetID="bitcoin" IntervalDays={7} />
        {/* // Ici information sur la valeur du portefeuille */}
        <View>
          <Card
            containerStyle={{ backgroundColor: "#222121", borderRadius: 10 }}
          >
            <Card.Title style={{ color: "white", fontSize: 20 }}>
              Valeur de ton portefeuille {assetName}
            </Card.Title>
            <Card.Divider />
            <View style={{ alignItems: "center" }}>
              <Text
                style={{ color: "#00B295", fontSize: 25, fontWeight: "bold" }}
              >
                {totalInvestmentAsset * showprice} €
              </Text>
              <Text
                style={{ color: "#00B295", fontSize: 25, fontWeight: "bold" }}
              >
                {totalInvestmentAsset} {assetSymbol}
              </Text>
            </View>
          </Card>
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
  },
  buttonReturn: {
    flex: 2,
    justifyContent: "center",
  },
  page: {
    flex: 4,
  },

  logo: {
    width: 50,
    height: 50,
  },
  background: {
    flex: 6,
    resizeMode: "cover",
    alignItems: "center",
    minWidth: 500,
  },
});

function mapStateToProps(state) {
  return { userToken: state.token };
}

export default connect(mapStateToProps, null)(btcWallet);
