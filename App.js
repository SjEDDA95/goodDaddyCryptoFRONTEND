import { StyleSheet, Text, View, Icon } from "react-native";

import { FontAwesome } from '@expo/vector-icons'; 

//import redux pour le story
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import token from "./reducers/token";
import answers from "./reducers/answers";
import salary from "./reducers/salary";

// Imports des screens
import HomeScreen from "./screens/HomeScreen";
import DashboardScreen from "./screens/DashBoardScreen";
import GuidesScreen from "./screens/GuidesScreen";
import StrategiesScreen from "./screens/StrategiesScreen";
import TransactionsScreen from "./screens/TransactionsScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

// Import des screens de Wallets
import WalletBtcScreen from "./screens/wallets/btcWalletScreen";
import WalletEthScreen from "./screens/wallets/ethWalletScreen";

// Imports des screens du formulaire
import FirstForm from "./screens/formulairesRegister/firstform";
import SecondForm from "./screens/formulairesRegister/secondform";
import ThirdForm from "./screens/formulairesRegister/thirdform";
import FourthForm from "./screens/formulairesRegister/fourthform";
import FifthForm from "./screens/formulairesRegister/fifthform";
import ResultForm from "./screens/formulairesRegister/resultform";
import StrategyProposal from "./screens/formulairesRegister/strategyproposal";
//Imports de la navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

//creation du store
const store = createStore(combineReducers({ token, answers, salary }));

// Création du composant BottomTabNavigator
const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;
          // Routes des éléments du menu en correspondance avec les icones FontAwesome
          if (route.name == "Strategies") {
            iconName = "clipboard";
          } else if (route.name == "Dashboard") {
            iconName = "bitcoin";
          } else if (route.name == "Guides") {
            iconName = "newspaper-o";
          } else if (route.name == "Transactions") {
            iconName = "plus-circle";
          }
          //Fonction de retour des icones de menu
          return <FontAwesome name={iconName} size={25} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#00b295",
        inactiveTintColor: "#f433ab",
        style: {
          backgroundColor: "#222121",
        },
      }}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Strategies" component={StrategiesScreen} />
      <Tab.Screen name="Transactions" component={TransactionsScreen} />
      <Tab.Screen name="Guides" component={GuidesScreen} />
    </Tab.Navigator>
  );
};
// Menu stack pour le menu Dashboard
function WalletStack(){
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WalletBtc"
        component={WalletBtcScreen}
        options={{ title: "Wallet Bitcoin" }}
      />
      <Stack.Screen
        name="WalletEth"
        component={WalletEthScreen}
        options={{ title: "Wallet Ethereum" }}
      />
    </Stack.Navigator>
  );
}

// on peut créer une page dans stratégie avec une fonction stratégie

// Début return fonction App
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Good Daddy Crypto" }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ title: "Register" }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: "Login" }}
          />
          <Stack.Screen
            name="FirstForm"
            component={FirstForm}
            options={{ title: "Premiere page formulaire" }}
          />
          <Stack.Screen
            name="SecondForm"
            component={SecondForm}
            options={{ title: "Deuxieme page formulaire" }}
          />
          <Stack.Screen
            name="ThirdForm"
            component={ThirdForm}
            options={{ title: "Troisieme page formulaire" }}
          />
          <Stack.Screen
            name="FourthForm"
            component={FourthForm}
            options={{ title: "Quatrieme page formulaire" }}
          />
          <Stack.Screen
            name="FifthForm"
            component={FifthForm}
            options={{ title: "Cinquieme page formulaire" }}
          />
          <Stack.Screen
            name="ResultForm"
            component={ResultForm}
            options={{ title: "Resultats formulaire" }}
          />
          <Stack.Screen
            name="StrategyProposal"
            component={StrategyProposal}
            options={{ title: "Proposition Strategie" }}
          />
          <Stack.Screen
            name="WalletBtc"
            component={WalletStack}
            options={{ title: "Wallet Bitcoin" }}
          />
          <Stack.Screen
            name="WalletEth"
            component={WalletStack}
            options={{ title: "Wallet Ethereum" }}
          />
          {/* <Stack.screen
            name="Guides"
            component={GuidesScreen}
            options={{ title: "Guides Débutant Crypto "}}
          /> */}
          <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

// Styles CSS🎨
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

