import React, { Component } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

const DATA = [
    {
      id: "1",
      title: "Data Strutuctures",
    },
    {
      id: "2",
      title: "STL",
    },
    {
      id: "3",
      title: "C++",
    },
    {
      id: "4",
      title: "Java",
    },
]

const Item = ({title}) => {
    return (
        <View style={styles.item}>
            <Text>{title}</Text>
        </View>
    )
}
  
class Buscar extends Component {
    constructor(props) {
    super(props);
        this.state = {
            loading: false,
            data: DATA,
            error: null,
            searchValue: "",
        };
    this.arrayholder = DATA;
}
    
    searchFunction = (text) => {
      const updatedData = this.arrayholder.filter((item) => {
        const item_data = `${item.title.toUpperCase()})`;
        const text_data = text.toUpperCase();
        return item_data.indexOf(text_data) > -1;
      });
      this.setState({ data: updatedData, searchValue: text });
    };
    
    render() {
      return (
        <View style={styles.container}>
          <SearchBar
            placeholder="Pesquisar..."
            lightTheme
            round
            value={this.state.searchValue}
            onChangeText={(text) => this.searchFunction(text)}
            autoCorrect={false}
          />
          <FlatList
            data={this.state.data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
          <Button onPress={() => navigation.push('Home')} title="Voltar" />
        </View>
      );
    }
  }
    
  export default Buscar
  
  const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        padding: 2,
    },
    item: {
        backgroundColor: "#f5f520",
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
  });