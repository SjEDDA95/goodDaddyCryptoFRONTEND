import React, { useEffect, useState } from "react";

import { StyleSheet, View, Text, ScrollView, Image } from "react-native";

// React Redux
import { connect } from "react-redux";

import { LinearGradient } from "expo-linear-gradient";

function StrategiesScreen(props) {
  //initialisations des etats
  const [strategies, setStrategies] = useState([]);

  // *******RECUPERE LES STRATEGIES A L'INITIALISATION DU SCREEN************
  useEffect(() => {
    async function fetchData() {
      var rawResult = await fetch(
        `https://gooddaddybackend.herokuapp.com/investment/getStrategy?userToken=${props.userToken}`
      );
      var result = await rawResult.json();
      setStrategies(result.strategies);
    }
    fetchData();
  }, []);

  var strategiesList = strategies.map((strat, i) => {
    var assetLogo = "";
    if (strat.asset == "BTC") {
      assetLogo = require("../assets/Bitcoin.svg.png");
    } else if (strat.asset == "ETH") {
      assetLogo = require("../assets/Ethereum.png");
    }
    return (
      <View
        key={i}
        style={{
          flexDirection: "row",
          marginBottom: 100,
          borderColor: "white",
          borderRadius: 5,
          borderWidth: 2,
          padding: 30,
        }}
      >
        <Image style={styles.logo} source={assetLogo} />
        <Text
          style={{
            color: "#F433AB",
            textAlignVertical: "center",
            marginLeft: 30,
            fontSize:30,
            fontWeight:"bold",
          }}
        >
          {strat.amountPaid}€ {strat.frequency}
        </Text>
      </View>
    );
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient
        colors={["#1A0596", "transparent"]}
        style={styles.background}
      >
      <View
        style={{
          flex: 1,
          backgroundColor: "#222121",
          minWidth: 700,
          maxHeight: 50,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 30,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
          STRATEGIES
        </Text>
      </View>
        <View style={{marginTop: 100}}>{strategiesList}</View>
      </LinearGradient>
    </ScrollView>
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

export default connect(mapStateToProps, null)(StrategiesScreen);
