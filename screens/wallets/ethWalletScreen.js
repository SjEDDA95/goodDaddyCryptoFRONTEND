import React, { useEffect, useState } from "react";

import { StyleSheet, View, SafeAreaView, TouchableOpacity } from "react-native";
// Import React Native Elements
import { Text, Card, Button, Image } from "@rneui/themed";

// Import de la fonction GetCrypto Current Price
// import {getCryptoPriceData} from '../../services/GetCryptoPriceService';

// Icones
import Icon from "react-native-vector-icons/FontAwesome";
// React Redux
import { connect } from "react-redux";

// AXIOS pour requette API
import axios from "axios";

const ethWallet = (props) => {
  // Declaration variable d'etat pour afficher le prix

  const [showprice, setShowPrice] = useState(0);

  // Declaration de variables
  const assetName = "Ethereum";
  const assetSymbol = "ETH";
  const cryptoAssetId = "ethereum";
  const assetLogo =
    "https://s3.eu-central-1.amazonaws.com/bbxt-static-icons/type-id/png_16/f231d7382689406f9a50dde841418c64.png";

  // Use effect
  useEffect(() => {
    // Fonction pour récupérer le prix d'un asset avec API Coingecko
    async function getCryptoPriceData() {
      try {
        // This is where the api call will go
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoAssetId}&vs_currencies=eur`
        );
        // Retour de la fonction
        console.log("typeof response", typeof response.data.ethereum.eur);

        setShowPrice(response.data.ethereum.eur);
      } catch (err) {
        console.log(err);
      }
    }
    getCryptoPriceData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <Text>Wallet {assetName}</Text>
      </View>
      <Card>
        <Card.Title>Prix actuel du {assetName}</Card.Title>
        <Image source={{ assetLogo }} />
        <Card.Divider />
        {/*//get current Price of asset with API */}
        <Text>
          1 {assetSymbol} = {showprice} €
        </Text>
      </Card>
      {/* // Insert du graphique ici 
      Le graphique doit afficher l'évolution du portefeuille dans le temps en fonction de amount of token et price$*/}
      <AssetChart CryptoAssetID="bitcoin" IntervalDays={7} />
      {/* // Ici information sur la valeur du portefeuille */}
      <View>
        <Card>
          <Text>Valeur de ton portefeuille {assetName}</Text>
          <Text>800 €</Text>
          <Text>soit 0,051 {assetSymbol}</Text>
        </Card>
      </View>
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
    marginHorizontal: 16,
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
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

export default ethWallet;
