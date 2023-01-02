import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import { LinearGradient } from 'expo-linear-gradient';

import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";

// Import ProgressBar Component
import ProgressBar from "../../Components/ProgressBar";

// React Redux
import { connect } from "react-redux";

const Separator = () => <View style={styles.separator} />;

const ThirdForm = (props) => {
  // RETURN DU JSX
  return (
    <ScrollView contentContainerStyle={styles.container}>
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
            onPress={() => console.log(props.navigation.navigate("SecondForm"))}
          >
            <Icon style={{ color: "white" }} name="chevron-left" size={20} />
            <Text style={{ color: "white" }}> RETOUR </Text>
          </TouchableOpacity>
        </View>
      <View style={{ flex: 5 }}>
        <View>
          <Text style={styles.profilRisque}>
            Détermination de ton profil de risque
          </Text>
          <Separator />
          <Text style={styles.title}>
            Pour un investissement intial de 1000 €, quelle perte maximale
            peux-tu accepter ?
          </Text>
          <Separator />
        </View>
        {/* // Début du choix des checkBox et application de Flexbox*/}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          {/* Debut liste de choix  */}
          <View>
            {/* Choix 1 */}
            <TouchableOpacity>
              <Text
                style={styles.answer}
                onPress={() => {
                  props.addAnswer(1, 3);
                  props.navigation.navigate("FourthForm");
                }}
              >
                100€
              </Text>
            </TouchableOpacity>
            {/* Choix 2 */}
            <TouchableOpacity>
              <Text
                style={styles.answer}
                onPress={() => {
                  props.addAnswer(2, 3);
                  props.navigation.navigate("FourthForm");
                }}
              >
                200€{" "}
              </Text>
            </TouchableOpacity>
            {/* Choix 3 */}
            <TouchableOpacity>
              <Text
                style={styles.answer}
                onPress={() => {
                  props.addAnswer(3, 3);
                  props.navigation.navigate("FourthForm");
                }}
              >
                300€{" "}
              </Text>
            </TouchableOpacity>
            {/* Choix 4 */}
            <TouchableOpacity>
              <Text
                style={styles.answer}
                onPress={() => {
                  props.addAnswer(4, 3);
                  props.navigation.navigate("FourthForm");
                }}
              >
                400€{" "}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      </LinearGradient>
    </ScrollView>
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
    width:100,
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

// Fonction dispatch to Store
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

export default connect(null, mapDispatchToProps)(ThirdForm);
