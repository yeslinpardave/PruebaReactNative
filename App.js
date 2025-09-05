/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import { useState,useEffect,useRef } from 'react';
import {  StyleSheet, View ,Animated} from 'react-native';
import { TextInput } from 'react-native';

function App({ label, value, onChangeText }) {
  const [isFocus,setIsFocus]=useState(false)
  const animated = useRef(new Animated.Value(value ? 1 : 0)).current;

  const focused=()=>{
    setIsFocus(true)
  }

   const blur=()=>{
    setIsFocus(false)
  }

   useEffect(() => {
    Animated.timing(animated, {
      toValue: isFocus || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false, // no se puede usar true porque animamos "top" y "fontSize"
    }).start();
  }, [isFocus, value,animated]); 

  const labelAnimatedStyle = {
    top: animated.interpolate({
      inputRange: [0, 1],
      outputRange: [18, -5], // posición vertical
    }),
    fontSize: animated.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12], // tamaño del texto
    }),
    color: animated.interpolate({
      inputRange: [0, 1],
      outputRange: ["#aaa", "#000"], // gris abajo, negro arriba
    }),
  };

return(
  <View style={styles.container}>
    <Animated.Text style={[styles.label, labelAnimatedStyle]}>
      correo electronico
    </Animated.Text>
  <TextInput
   style={isFocus ? styles.focus : styles.input} placeholder='Escribe tu correo electronico'
   placeholderTextColor='#47488bff'
   onChangeText={onChangeText}
   onFocus={focused}
   onBlur={blur}
   />
   
   

</View>
)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },
  input:{
    backgroundColor:'#141534',
    color:'#47488bff',
    width:'80%',
    placeholder:'white',
    borderRadius:15,
    paddingHorizontal:20,
    paddingVertical:20,
    fontSize:20
    
    
  },
  focus:{
    backgroundColor:'#141534',
    borderWidth:2,
    borderColor:'#955ADD',
    width:'80%',
    borderRadius:15,
    paddingHorizontal:20,
    paddingVertical:20,
    color:'white',
    placeholder:false
    
  },
  label: {
    position: "absolute",
    left: 10,
  },
});

export default App;
