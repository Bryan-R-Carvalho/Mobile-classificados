import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View, Button, FlatList,Image, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Categoria from './pages/categoria';
import Buscar from './pages/buscar';
import { Searchbar, Menu, Divider, Provier } from 'react-native-paper';

const Stack = createNativeStackNavigator();

function HomeScreen({navigation}) {
  return (
    <View style={{backgroundColor: 'black'}}>
      <View>
        <Searchbar style={{margin: '10px', flex: 1}} placeholder="Search"/>
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginVertical: '10px'}}>
        <Button onPress={() => navigation.push('Categoria')} title="Categorias" />
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const clickHandler = () => {
  alert('Botão Clicado');
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Buscar" component={Buscar} />
        <Stack.Screen name="Categoria" component={Categoria} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

