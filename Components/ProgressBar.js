import React, { useEffect, useState, useRef } from 'react';
import { Text, View, StyleSheet, Animated } from 'react-native';
import Constants from 'expo-constants';
 
 
const ProgressBar = () => {
 return (
   <View style={styles.boxBarre}>
  <Text>
    Loading.....
  </Text>
  <View style={styles.progressBar}>
    <Animated.View style={[StyleSheet.absoluteFill,{backgroundColor: "grey", width: '50%'}]}/>
  </View>
  <Text>50%</Text> 
</View>

 );
}
 
export default ProgressBar;
 
const styles = StyleSheet.create({
  boxBarre: {
   flex: 1,
   flexDirection: "column", //column direction
   justifyContent: 'center',
   alignItems: 'center',
   paddingTop: Constants.statusBarHeight,
   backgroundColor: '#ecf0f1',
   padding: 8,
 },
  progressBar: {
   height: 20,
   flexDirection: "row",
   width: '100%',
   backgroundColor: 'white',
   borderColor: '#000',
   borderWidth: 2,
   borderRadius: 5
 }
});