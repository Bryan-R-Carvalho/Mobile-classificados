import { StatusBar } from 'expo-status-bar';
import { Component } from 'react';
import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Inicio from './pages/inicio';
import { TextInput, Button } from 'react-native-paper';

const Stack = createNativeStackNavigator();

/*export default class App extends Component {
  state = {
    email: '',
    senha: ''
  }

  autenticar = () => {
    if (this.state.email ==="admin" && this.state.senha==="admin") {
      alert("Login efetuado com sucesso")
    }else {
      alert("Erro de usuário ou senha")
    }
  }
*/
function HomeScreen({ navigation }) {
  return (

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image
        style={styles.image}
        source={require('./images/classificados.jpg')} />
      <Text style={{ marginTop: 25, fontWeight: "650", fontSize: 22 }}>Acesse a sua conta</Text>
      <TextInput style={{ marginTop: 15, }}
        activeOutlineColor='black'
        outlineColor='gray'
        mode='outlined'
        //value={this.state.login}
        //onChangeText={texto => this.setState ({login: texto})}
        label="E-mail"
      />
      <TextInput style={{ marginTop: 2, marginBottom: 15 }}
        activeOutlineColor='black'
        outlineColor='gray'
        mode='outlined'
        //value={this.state.senha}
        //onChangeText={texto => this.setState ({senha: texto})}
        secureTextEntry="true"
        label="Senha"
      />
      <Text style={{ marginBottom: 15, fontWeight: "300", fontSize: 13 }}>Esqueceu sua senha?</Text>
      <Button
        icon="lock"
        mode="contained"
        color="black"
        onPress={() => navigation.push('Inicio')}>
        Entrar
      </Button>
      <Text style={{ marginTop: 15, fontWeight: "300", fontSize: 16 }}>Não tem uma conta? Cadastre-se</Text>
      <StatusBar style="auto" />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Login" component={HomeScreen} />
        <Stack.Screen name="Inicio" component={Inicio} />
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
    paddingTop: 50,
  },
  image: {
    width: 240,
    height: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 50,
  },
});

class DisplayAnImage extends Component {
  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }
}


