import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
// import { ScrollView } from "react-native-gesture-handler";

import { LinearGradient } from 'expo-linear-gradient';

// Import Icon FontAwesome
import Icon from "react-native-vector-icons/FontAwesome";

// React Redux
import { connect } from "react-redux";

// Import ProgressBar Component
import ProgressBar from "../../Components/ProgressBar";

// SÉPARATEUR LIGNE
const Separator = () => <View style={styles.separator} />;

const fourthform = (props) => {
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
            onPress={() => console.log(props.navigation.navigate("ThirdForm"))}
          >
            <Icon style={{ color: "white" }} name="chevron-left" size={20} />
            <Text style={{ color: "white" }}> RETOUR </Text>
          </TouchableOpacity>
        </View>
        {/* // End of GoBack Button */}
        <View style={{ flex: 5}}>
          <View>
            <Text style={styles.profilRisque}>
              Détermination de ton profil de risque
            </Text>
            <Separator />
            <Text style={styles.title}>
              Tu as investi 1000€ de capital pour débuter, puis tous les mois tu
              investis 150€. 6 mois après, le Bitcoin perd 40% de sa valeur en 1
              mois. Que fais-tu ?
            </Text>
            <Separator />
          </View>
          <ScrollView>
          {/* Debut liste de choix  */}
            {/* Choix 1 */}
              <TouchableOpacity>
                <Text
                  style={styles.answer}
                  onPress={() => {
                    props.addAnswer(1, 4);
                    props.navigation.navigate("FifthForm");
                  }}
                >
                  Tu vends tout !
                </Text>
              </TouchableOpacity>
              {/* Choix 2 */}
              <TouchableOpacity>
                <Text
                  style={styles.answer}
                  onPress={() => {
                    props.addAnswer(2, 4);
                    props.navigation.navigate("FifthForm");
                  }}
                >
                  Tu vends 50% de ton portefeuille pour te protéger
                </Text>
              </TouchableOpacity>
              {/* Choix 3 */}
              <TouchableOpacity>
                <Text
                  style={styles.answer}
                  onPress={() => {
                    props.addAnswer(3, 4);
                    props.navigation.navigate("FifthForm");
                  }}
                >
                  Tu ne vends pas, mais tu mets en pause des investissements
                  récurrents en attendant une nouvelle hausse du marché.
                </Text>
              </TouchableOpacity>
              {/* Choix 4 */}
              <TouchableOpacity>
                <Text
                  style={styles.answer}
                  onPress={() => {
                    props.addAnswer(4, 4);
                    props.navigation.navigate("FifthForm");
                  }}
                >
                  Tu conserves ton investissement et tu poursuis mensuellement ton
                  investissement récurrent
                </Text>
              </TouchableOpacity>
              <View style={{height:300}}>
              </View>
              </ScrollView>
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
    marginLeft:20,
    marginRight:20,
  },
  answer: {
    textAlign: "center",
    marginVertical: 5,
    fontSize: 16,
    backgroundColor: "#8E94F2",
    borderRadius: 12,
    marginTop: 8,
    color: "white",
    padding: 10,
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
export default connect(null, mapDispatchToProps)(fourthform);
