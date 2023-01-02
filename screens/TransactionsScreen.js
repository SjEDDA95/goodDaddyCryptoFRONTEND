import React, { useState, useEffect } from "react";
// Import de librairie ui-neumorphism

import {
  Button,
  StyleSheet,
  View,
  Text,
  Modal,
  Pressable,
  TextInput,
  SafeAreaView,
  ScrollView,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { Dropdown } from "react-native-element-dropdown";
import { Card } from "@rneui/themed";
import DateTimePicker from "@react-native-community/datetimepicker";
import { connect } from "react-redux";

function TransactionsScreen(props) {
  // ETAT POUR STOCKER LES OPERATIONS
  const [operations, setOperations] = useState([]);
  //ETATS POUR CHAMPS SAISIE D'UNE NOUVELLE OPERATION/AFFICHER LA MODALE
  const [modalVisible, setModalVisible] = useState(false);
  const [amountOfToken, setAmountOfToken] = useState("");
  const [amountPaid, setAmountPaid] = useState("");

  // ETATS POUR DATE PICKER
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  //ETATS POUR DROPDOWN POUR CHOISIR ASSETS
  const [asset, setAsset] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const dataDropdown = [
    { label: "Bitcoin", value: "BTC" },
    { label: "Ethereum", value: "ETH" },
  ];
  //ETATS POUR DROPDOWN POUR CHOISIR TYPE OPERATION
  const [typeOperation, setTypeOperation] = useState(null);
  const [isFocus2, setIsFocus2] = useState(false);
  const dataDropdown2 = [
    { label: "Debit", value: "DEBIT" },
    { label: "Credit", value: "CREDIT" },
  ];

  // ***********RECUPERE LES OPERATIONS A L'INITIALISATION DU SCREEN**********
  useEffect(() => {
    getOperations();
  }, []);

  async function getOperations() {
    var rawResult = await fetch(
      `https://gooddaddybackend.herokuapp.com/operation/getOperation?userToken=${props.userToken}`
    );
    var result = await rawResult.json();
    setOperations(result.operations);
  }
  //AFFICHAGE DES OPERATIONS VIA UN TABLEAU DE CARDS
  var operationsList = operations.map((ope, i) => {
    var dateOpe = new Date(ope.date).toLocaleDateString("fr");
    return (
      <Card key={i} containerStyle={ope.typeOperation =="CREDIT" ? { backgroundColor: "#222121", borderRadius:10, borderColor:"#E335DC"} : { backgroundColor: "#222121", borderRadius:10, borderColor:"#00B295"}}>
        <View
          style={{
            flexDirection: "column",
          }}
        >
          <Text style={{color:'white'}}>Date : {dateOpe}</Text>
          <Text style={ope.typeOperation =="CREDIT" ? {color:"#E335DC"} : {color: "#00B295"}}>Type : {ope.typeOperation}</Text>
          <Text style={{color:'white'}}>
            Asset : {ope.asset}
          </Text>
          <Text style={{color:'white'}}>
            Quantité tokens echangés : {ope.amountOfToken} 
          </Text>
          <Text style={{color:'white'}}>
            Quantité euros echangés: {ope.amountPaid} €
          </Text>
        </View>
      </Card>
    );
  });

  const addOperation = async () => {
    var dateOpe = date.setUTCHours(0, 0, 0, 0);
    dateOpe = new Date(dateOpe).toISOString();
    var rawResult = await fetch(
      "https://gooddaddybackend.herokuapp.com/operation/addOperation",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `userToken=${props.userToken}&date=${dateOpe}&typeOperation=${typeOperation}&amountOfToken=${amountOfToken}&amountPaid=${amountPaid}&asset=${asset}`,
      }
    );
    var result = await rawResult.json();
    getOperations();
  };

  // ********FONCTIONS POUR LE DATE PICKER*************
  
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };
  const showMode = (currentMode) => {
    if (Platform.OS === "android") {
      setShow(false);
    }
    setMode(currentMode);
  };
  const showDatepicker = () => {
    showMode("date");
    setShow(true);
  };

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
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
            OPERATIONS
          </Text>
        </View>
        <Modal
          animationType="slide"
          style={styles.centeredView}
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View>
                <Pressable
                  onPress={showDatepicker}
                  style={styles.button}
                ><Text style={styles.textStyle}>{date.toLocaleDateString("fr")}</Text></Pressable>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    onChange={onChange}
                  />
                )}
              </View>
              <Dropdown
                style={[styles.dropdown, isFocus2 && { borderColor: "blue" }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={dataDropdown2}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus2 ? "Type operation" : "..."}
                value={typeOperation}
                onFocus={() => setIsFocus2(true)}
                onBlur={() => setIsFocus2(false)}
                onChange={(item) => {
                  setTypeOperation(item.value);
                  setIsFocus2(false);
                }}
              />
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={dataDropdown}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? "Choisir un asset" : "..."}
                value={asset}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setAsset(item.value);
                  setIsFocus(false);
                }}
              />
              <TextInput
                style={styles.input}
                onChangeText={setAmountOfToken}
                value={amountOfToken.toString()}
                placeholder="Quantité de tokens échangés"
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                onChangeText={setAmountPaid}
                value={amountPaid.toString()}
                placeholder="Quantité d'euros échangés"
                keyboardType="numeric"
              />
              <Pressable
                style={styles.buttonConfirmer}
                onPress={() => {
                  if (
                    (asset != null) &
                    (amountOfToken != "") &
                    (amountPaid != "") &
                    (typeOperation != null)
                  ) {
                    setModalVisible(!modalVisible);
                    addOperation();
                    setAsset(null);
                    setDate(new Date());
                    setAmountOfToken("");
                    setAmountPaid("");
                    setTypeOperation(null);
                  }
                }}
              >
                <Text style={styles.textStyle}>CONFIRMER</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <ScrollView>{operationsList}</ScrollView>
        <Pressable
          style={styles.button}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Text style={{color:"white"}}>AJOUTER UNE OPERATION</Text>
        </Pressable>
      </LinearGradient>
    </SafeAreaView>
  );
}
// Styles CSS 🖼
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222121",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: "#8E94F2",
    marginBottom: 20
  },
  buttonConfirmer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    paddingHorizontal: 45,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: "#8E94F2",
    marginTop: 20
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
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    height: 40,
    width:180,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor:'white'
  },
  dropdown: {
    height: 50,
    width: 180,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor:"white",
    marginBottom:12
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  background: {
    flex: 6,
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 500,
  },
});

function mapStateToProps(state) {
  return { userToken: state.token };
}

export default connect(mapStateToProps, null)(TransactionsScreen);
