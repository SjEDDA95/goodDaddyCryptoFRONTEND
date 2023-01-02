import React, { useEffect, useState } from "react";

import { Card, Paragraph } from "react-native-paper";

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
  Modal
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

const guidesProposal = (props) => {
  // INITIALISATION DES ETATS
  const [guide, setGuide] = useState([]);

  // FONCTION POUR RECUPERER L'ENSEMBLE DES ARTICLES DE GUIDES
  var getGuide = async () => {
    var rawResult = await fetch( // fait une requete au backend à une URL précise
      "https://gooddaddybackend.herokuapp.com/guide/getGuide"
    );
    var result = await rawResult.json();
    setGuide(result.guides);
  };

  useEffect(() => {
    getGuide();
  }, []);

  let guideToDisplay = guide.map((guide, i) => {
    return (
      <Pressable key={i}>
        <Card
          style={{
            backgroundColor: "#222121",
            marginTop: 20,
            borderRadius: 10,
            borderColor: "white",
            borderWidth: 0.2,
          }}
        >
          <Card.Title
            title={
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "#E335DC",
                }}
              >
                {guide.title}
              </Text>
            }
          />
          <View
            style={{
              height: 1,
              width: "50%",
              backgroundColor: "white",
              marginLeft: "10%",
              marginBottom: 10,
            }}
          ></View>
          <Card.Content>
            <Paragraph style={{ color: "white" }}>
              {guide.content.slice(0, 80) + "..."}
            </Paragraph>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 20,
              }}
            >
              <Text style={{ color: "#00B295", fontStyle: "italic" }}>
                Auteur: {guide.author}
              </Text>
              <Text style={{ color: "#00B295", fontStyle: "italic" }}>
                Publié le:{" "}
                {new Date(guide.dateRelease).toLocaleDateString("fr")}
              </Text>
            </View>
          </Card.Content>
          {/* <Card.Cover source={guide.image} /> */}
        </Card>
      </Pressable>
    );
  });

  return (
    <SafeAreaView style={styles.container}>
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
            marginBottom: 10,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
            GUIDES
          </Text>
        </View>
        
        <ScrollView style={{ flex: 5 }}>
          <View style={{ width: 350 }}>{guideToDisplay}</View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

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
    fontSize: "50",
  },

  text: {
    color: "white",
    fontSize: "20",
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  background: {
    flex: 6,
    resizeMode: "cover",
    alignItems: "center",
    minWidth: "100%",
  },
  modalView: {
    margin: 20,
    backgroundColor:"#222121",
    borderRadius: 20,
    borderColor:'white',
    borderWidth:0.5,
    padding: 50,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
});

export default guidesProposal;
