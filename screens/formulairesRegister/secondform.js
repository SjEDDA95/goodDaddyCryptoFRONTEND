import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { LinearGradient } from 'expo-linear-gradient';


// React Redux
import { connect } from "react-redux";

// SÉPARATEUR LIGNE

const Separator = () => <View style={styles.separator} />;

const secondform = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#1A0596', 'transparent']}
        style={styles.background}
      >
      {/* // Go back button */}
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
            onPress={() => console.log(props.navigation.navigate("FirstForm"))}
          >
            <Icon style={{ color: "white" }} name="chevron-left" size={20} />
            <Text style={{ color: "white" }}> RETOUR </Text>
          </TouchableOpacity>
        </View>
      {/* // End go back button */}

      <View style={styles.page}>
        <View>
          <Text style={styles.profilRisque}>
            Détermination de ton profil de risque
          </Text>
          <Separator />
          <Text style={styles.title}>
            Es-tu prêt à accepter des pertes de ton investissement initial ?
          </Text>
          <Separator />
        </View>
        {/* Debut liste de choix  */}
        <View>
          {/* Choix 1 */}
          <TouchableOpacity>
            <Text
              style={styles.answer}
              onPress={() => {
                props.addAnswer(1, 2);
                props.navigation.navigate("ThirdForm");
              }}
            >
              Je ne suis pas à l'aise avec cela{" "}
            </Text>
          </TouchableOpacity>
          {/* Choix 2 */}
          <TouchableOpacity>
            <Text
              style={styles.answer}
              onPress={() => {
                props.addAnswer(2, 2);
                props.navigation.navigate("ThirdForm");
              }}
            >
              Pas sûr(e)
            </Text>
          </TouchableOpacity>
          {/* Choix 3 */}
          <TouchableOpacity>
            <Text
              style={styles.answer}
              onPress={() => {
                props.addAnswer(3, 2);
                props.navigation.navigate("ThirdForm");
              }}
            >
              Je ne veux pas perdre la moitié de mon capital
            </Text>
          </TouchableOpacity>
          {/* Choix 4 */}
          <TouchableOpacity>
            <Text
              style={styles.answer}
              onPress={() => {
                props.addAnswer(3, 2);
                props.navigation.navigate("ThirdForm");
              }}
            >
              Je suis ok avec celà !
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
    marginVertical : 10,
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

export default connect(null, mapDispatchToProps)(secondform);
