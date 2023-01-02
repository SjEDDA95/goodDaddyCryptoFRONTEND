import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  View,
  Text,
  Button,
  ScrollView,
  Dimensions,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { connect } from "react-redux";


import axios from "axios";

export default AssetChart = (props) => {
  // Récupérer les valeures des variables par les props
  const { CryptoAssetID, IntervalDays } = props;
  // ******* Autre syntaxe équivalente à la déclaration ci dessus *****
  // const asset = props.asset
  // const days = props.days

  // **********Initialisation du UseEffet******
  // Use Effect for getPriceInterval
  useEffect(() => {
    // *********Get assetPrice by Period Interval**********
    // Requete de l'API avec AXIOS
    let cryptoAssetId='bitcoin';
    let IntervalDays = 7;
    async function getAssetPricesByInterval() {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${cryptoAssetId}/market_chart?vs_currency=eur&days=${IntervalDays}&interval=daily`
        );
        console.log("typeof response", typeof response.data.prices);
      } catch (error) {
        console.error(error);
      }
    }
    getAssetPricesByInterval();
  },[]
  );

  // ***************Preparation des datas du graph********

  // Initialisation du graph

  // Retour affichage du graphe



  // Render JSX
  return (
    <View>
      <LineChart
        data={{
          labels: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
          datasets: [
            {
              data: [
                22133.6, 22797.951, 22561.893, 22803.174617, 23363.1200714,
                22729.049408,
              ],
            },
          ],
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        yAxisLabel="€"
        yAxisSuffix=""
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#222121",
          backgroundGradientFrom: "#222121",
          backgroundGradientTo: "#1A0596",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 6,
          },
          propsForDots: {
            r: "7",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 50,
        }}
      />
    </View>
  );
};
